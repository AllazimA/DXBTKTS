import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'
import { clientIp, rateLimited } from '@/lib/rate-limit'

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

  // Honeypot: real users never fill the hidden "company_website" field.
  if (typeof body.company_website === 'string' && body.company_website.trim()) {
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

  return NextResponse.json({ success: true, id: enquiry.id }, { status: 200 })
}
