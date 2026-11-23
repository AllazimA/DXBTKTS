import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'
import { clientIp, rateLimited } from '@/lib/rate-limit'
import { queueForCrm, type RequestType } from '@/lib/crm-outbox'
import { sendAck } from '@/lib/ack-email'
import { honeypotHit } from '@/lib/honeypot'

/**
 * Enquiry intake (request + contact forms).
 *
 * Stage 1: enquiries are appended to data/enquiries.jsonl and logged.
 * This is a local-development store only — on serverless hosting the file
 * write fails and the enquiry survives only in the logs. Stage 3 replaces
 * it with the database and owner/customer notifications.
 */

const ENQUIRIES_FILE = path.join(process.cwd(), 'data', 'enquiries.jsonl')

const LIMITS: Record<string, number> = {
  name: 120,
  email: 200,
  phone: 40,
  contact_method: 20,
  interest: 120,
  message: 4000,
  date: 40,
  referral_source: 80,
}

function clean(value: unknown, max: number) {
  if (typeof value !== 'string') return null
  const v = value.trim().slice(0, max)
  return v.length ? v : null
}

/** The service the customer picked (any language) → CRM request type. */
function requestTypeFor(interest: string): RequestType {
  const i = interest.toLowerCase()
  if (/ticket|billet|تذاكر/.test(i)) return 'tickets'
  if (/shopping|التسوق/.test(i)) return 'shopping'
  if (/sourcing|limited|édition|إصدار/.test(i)) return 'sourcing'
  if (/membership|adhésion|عضوية|العضوية/.test(i)) return 'membership'
  if (/chauffeur|airport|aéroport|transfer|السائق|المطار/.test(i)) return 'transfer'
  if (/celebration|célébration|événement|احتفال|مناسبة/.test(i)) return 'celebration'
  if (/corporate|group|entreprise|groupe|الشركات|مجموعة/.test(i)) return 'corporate'
  if (/dining|restaurant|dîner|مطاعم|عشاء/.test(i)) return 'dining'
  return 'experience'
}

export async function POST(request: NextRequest) {
  if (rateLimited('enquiry', clientIp(request.headers))) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
  }

  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  // Honeypot: real users never fill the hidden field (lib/honeypot.ts).
  if (await honeypotHit(body, 'enquiry')) {
    return NextResponse.json({ success: true }, { status: 200 })
  }

  const fields = Object.fromEntries(
    Object.entries(LIMITS).map(([key, max]) => [key, clean(body[key], max)]),
  ) as Record<string, string | null>

  const { name, email, phone, contact_method, interest } = fields
  if (!name || !email || !phone || !contact_method || !interest) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
  }

  const enquiry = {
    id: `enq_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    received_at: new Date().toISOString(),
    ...fields,
    page: clean(body.page, 200),
    locale: clean(body.locale, 5),
  }

  try {
    await fs.appendFile(ENQUIRIES_FILE, JSON.stringify(enquiry) + '\n', 'utf8')
  } catch (writeError) {
    console.error('Could not persist enquiry to file:', writeError)
  }
  console.log('Enquiry received:', enquiry.id)

  const ack = await sendAck({ to: email, name, locale: enquiry.locale, kind: 'enquiry',
    lines: [[interest, fields.date && /^\d{4}-\d{2}-\d{2}$/.test(fields.date) ? new Date(fields.date + 'T00:00:00Z').toLocaleDateString('en-GB', { timeZone: 'UTC', day: 'numeric', month: 'short', year: 'numeric' }) : null].filter(Boolean).join(' · '),
      ...(fields.message ? [`“${fields.message.length > 240 ? fields.message.slice(0, 240) + '…' : fields.message}”`] : [])] })
  await queueForCrm({
    ackEmail: ack,
    name,
    email,
    phone: phone ?? undefined,
    interest: requestTypeFor(interest),
    interestLabel: interest,
    message: fields.message ?? `${interest} — request from the website.`,
    arrival: fields.date && /^\d{4}-\d{2}-\d{2}$/.test(fields.date) ? fields.date : undefined,
    timing: fields.date ?? undefined,
    locale: enquiry.locale ?? undefined,
    details: { contactMethod: contact_method ?? '', page: enquiry.page ?? '', referralSource: fields.referral_source ?? '' },
    source: fields.referral_source ?? 'website',
  })

  return NextResponse.json({ success: true, id: enquiry.id }, { status: 200 })
}
