import { promises as fs } from 'fs'
import path from 'path'
import { randomUUID, timingSafeEqual } from 'crypto'

/**
 * Website → DXB CRM outbox.
 *
 * Every request form queues one enquiry here. The CRM calls OUT to the website
 * (GET /api/crm/outbox, then POST /api/crm/outbox/ack) with
 * `Authorization: Bearer <CRM_SYNC_SECRET>`; the website never calls the CRM.
 * Shape = the DXB CRM's WebsiteEnquiry (DXB-CRM lib/server/mail/sync.ts) plus
 * `requestType` and structured `details`.
 *
 * Storage: one JSON file per enquiry in data/crm-outbox/ (local / single
 * server). On serverless hosting swap this module's three functions for
 * Vercel Blob — the API stays the same.
 */

export type RequestType = 'experience' | 'membership' | 'shopping' | 'sourcing' | 'dining' | 'nightlife' | 'tickets' | 'transfer' | 'celebration' | 'corporate'

export type OutboxEnquiry = {
  id: string
  receivedAt: string
  name: string
  email: string
  phone?: string
  /** CRM interest slug (DXB business pack): decides the request type, no guessing. */
  interest: RequestType
  /** Words the customer saw, e.g. "Luxury Shopping — Dubai Mall". */
  interestLabel?: string
  message: string
  timing?: string
  arrival?: string
  departure?: string
  guests?: string
  residence?: string
  locale?: string
  /** Typed form fields, keyed as the CRM request type's fields (strings only). */
  details?: Record<string, string>
  source?: string
  /** Structured basket (plan request / pay now): one line per product, prices recomputed on the server. */
  order?: OutboxOrder
}

export type OutboxOrderLine = {
  slug: string; product: string; variant: string; category: string | null; priceType: string
  date: string | null; time: string | null; qty: number; children: number; extras: Record<string, number>
  unitPrice: number | null; total: number; priceVerified: boolean
}
export type OutboxOrder = { reference: string; mode: 'request' | 'pay_now'; currency: string; total: number; lines: OutboxOrderLine[]; guests?: number | null; datesFlexible?: boolean; hotel?: string | null; notes?: string | null }

/** A verified online payment (Stripe webhook / success page). Separate outbox record, linked by order reference. */
export type OutboxPayment = {
  id: string; kind: 'payment'; receivedAt: string
  payment: { reference: string | null; provider: 'stripe'; sessionId: string; paymentIntent: string | null; amount: number; currency: string; email: string | null; livemode: boolean; paidAt: string; status: 'paid' }
}

const DIR = path.join(process.cwd(), 'data', 'crm-outbox')
export const ID_RE = /^[a-z0-9-]{8,64}$/

export function crmAuthorized(header: string | null): boolean {
  const expected = process.env.CRM_SYNC_SECRET || ''
  if (expected.length < 32) return false
  const m = /^Bearer\s+(.+)$/i.exec(header || '')
  if (!m) return false
  const a = Buffer.from(m[1].trim())
  const b = Buffer.from(expected)
  return a.length === b.length && timingSafeEqual(a, b)
}

const s = (v: unknown, max: number) => (typeof v === 'string' && v.trim() ? v.trim().slice(0, max) : undefined)

/** Queue one enquiry for the CRM. Never throws: a failed queue must not fail the customer's form. */
export async function queueForCrm(input: Omit<OutboxEnquiry, 'id' | 'receivedAt'> & { id?: string }) {
  const details: Record<string, string> = {}
  for (const [k, v] of Object.entries(input.details ?? {}).slice(0, 40)) {
    const val = typeof v === 'number' || typeof v === 'boolean' ? String(v) : s(v, 2000)
    if (val && /^[a-zA-Z][a-zA-Z0-9]{0,39}$/.test(k)) details[k] = val
  }
  const e: OutboxEnquiry = {
    id: input.id && ID_RE.test(input.id) ? input.id : randomUUID(),
    receivedAt: new Date().toISOString(),
    name: s(input.name, 200) ?? '',
    email: (s(input.email, 320) ?? '').toLowerCase(),
    phone: s(input.phone, 40),
    interest: input.interest,
    interestLabel: s(input.interestLabel, 160),
    message: (s(input.message, 8000) ?? '').slice(0, 8000) || `${input.interestLabel ?? 'Website request'} — see details.`,
    timing: s(input.timing, 120),
    arrival: s(input.arrival, 10),
    departure: s(input.departure, 10),
    guests: s(input.guests, 10),
    residence: s(input.residence, 80),
    locale: s(input.locale, 5),
    details,
    source: s(input.source, 80),
    ...(input.order ? { order: input.order } : {}),
  }
  try {
    await fs.mkdir(DIR, { recursive: true })
    await fs.writeFile(path.join(DIR, `${e.id}.json`), JSON.stringify(e), 'utf8')
  } catch (err) {
    console.error('[crm outbox] could not queue enquiry', e.id, err)
  }
  return e.id
}

/** Queue a verified payment for the CRM. The id is derived from the Stripe session, so a repeat never creates a second record. */
export async function queuePaymentForCrm(p: OutboxPayment['payment']) {
  const id = `pay-${p.sessionId.replace(/[^a-zA-Z0-9]/g, '').toLowerCase().slice(-40)}`
  const rec: OutboxPayment = { id, kind: 'payment', receivedAt: new Date().toISOString(), payment: p }
  try {
    await fs.mkdir(DIR, { recursive: true })
    await fs.writeFile(path.join(DIR, `${id}.json`), JSON.stringify(rec), { encoding: 'utf8', flag: 'wx' }).catch(e => { if ((e as NodeJS.ErrnoException).code !== 'EEXIST') throw e })
  } catch (err) {
    console.error('[crm outbox] could not queue payment', id, err)
  }
  return id
}

export async function listPending(limit = 50): Promise<(OutboxEnquiry | OutboxPayment)[]> {
  let files: string[] = []
  try {
    files = (await fs.readdir(DIR)).filter(f => f.endsWith('.json'))
  } catch {
    return []
  }
  const items = await Promise.all(
    files.map(async f => {
      try {
        return JSON.parse(await fs.readFile(path.join(DIR, f), 'utf8')) as OutboxEnquiry | OutboxPayment
      } catch {
        return null
      }
    }),
  )
  return items.filter((x): x is OutboxEnquiry | OutboxPayment => !!x).sort((a, b) => a.receivedAt.localeCompare(b.receivedAt)).slice(0, limit)
}

export async function removeImported(ids: string[]) {
  let removed = 0
  for (const id of ids) {
    if (!ID_RE.test(id)) continue
    try {
      await fs.unlink(path.join(DIR, `${id}.json`))
      removed++
    } catch {
      // already gone
    }
  }
  return removed
}
