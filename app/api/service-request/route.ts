import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'
import { clientIp, rateLimited } from '@/lib/rate-limit'
import { queueForCrm } from '@/lib/crm-outbox'
import { FIELD_LABEL, SERVICE_FIELDS, SERVICE_KINDS, SERVICE_LABEL, type ServiceKind } from '@/lib/service-requests'

/**
 * Service requests: shopping, sourcing, dining, nightlife, tickets.
 * Validated per type, kept in data/service-requests.jsonl (local log) and
 * queued for the DXB CRM, which creates the request in the right type.
 */
const FILE = path.join(process.cwd(), 'data', 'service-requests.jsonl')
const str = (v: unknown, max: number) => (typeof v === 'string' && v.trim() ? v.trim().slice(0, max) : typeof v === 'number' || typeof v === 'boolean' ? String(v).slice(0, max) : null)
const ISO = /^\d{4}-\d{2}-\d{2}$/

export async function POST(request: NextRequest) {
  if (rateLimited('service', clientIp(request.headers))) return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
  if (str(body.company_website, 200)) return NextResponse.json({ success: true })

  const kind = body.type as ServiceKind
  if (!SERVICE_KINDS.includes(kind)) return NextResponse.json({ error: 'Unknown request type' }, { status: 400 })
  const name = str(body.name, 120)
  const email = str(body.email, 200)
  const phone = str(body.phone, 40)
  if (!name || !email || !phone || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return NextResponse.json({ error: 'Missing or invalid contact details' }, { status: 400 })

  const raw = (body.fields ?? {}) as Record<string, unknown>
  const details: Record<string, string> = {}
  for (const key of SERVICE_FIELDS[kind]) {
    const v = str(raw[key], key === 'specifications' || key === 'itemsSought' || key === 'specialRequests' || key === 'restaurants' ? 2000 : 500)
    if (v) details[key] = v
  }
  if (kind === 'sourcing' && !details.productName) return NextResponse.json({ error: 'Tell us the product' }, { status: 400 })
  if (kind === 'sourcing' && details.termsAccepted !== 'yes') return NextResponse.json({ error: 'Please accept the sourcing terms' }, { status: 400 })
  if (details.date && !ISO.test(details.date)) delete details.date

  const what = details.productName ?? details.restaurant ?? details.venue ?? details.event ?? details.product ?? ''
  const label = `${SERVICE_LABEL[kind]}${what ? ` — ${what}` : ''}`
  const message = [`${label} (website request)`, ...Object.entries(details).map(([k, v]) => `${FIELD_LABEL[k] ?? k}: ${v}`), str(body.message, 3000) ? `Message: ${str(body.message, 3000)}` : ''].filter(Boolean).join('\n')

  const record = { type: kind, received_at: new Date().toISOString(), name, email, phone, locale: str(body.locale, 5), page: str(body.page, 200), details, message: str(body.message, 3000) }
  try {
    await fs.appendFile(FILE, JSON.stringify(record) + '\n', 'utf8')
  } catch (e) {
    console.error('Could not log service request:', e)
  }
  const id = await queueForCrm({
    name,
    email,
    phone,
    interest: kind,
    interestLabel: label,
    message,
    arrival: details.date,
    guests: details.partySize ?? details.tickets ?? details.guests,
    locale: record.locale ?? undefined,
    details,
    source: `website_${kind}`,
  })
  return NextResponse.json({ success: true, id })
}
