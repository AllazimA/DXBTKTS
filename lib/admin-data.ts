import { promises as fs } from 'fs'
import path from 'path'

/** Reads the local JSON-lines stores (development storage until the database exists). */
async function readJsonl<T>(file: string): Promise<T[]> {
  try {
    const raw = await fs.readFile(path.join(process.cwd(), 'data', file), 'utf8')
    return raw
      .split('\n')
      .filter(Boolean)
      .flatMap(line => {
        try {
          return [JSON.parse(line) as T]
        } catch {
          return []
        }
      })
  } catch {
    return []
  }
}

export type PlanRecord = {
  reference: string
  status: string
  received_at: string
  locale: string | null
  customer: { name: string; email: string; whatsapp: string; hotel: string | null; notes: string | null }
  items: { slug: string; product: string; variant: string; date: string | null; time: string; qty: number; children: number; estimated_total_aed: number }[]
  estimated_total_aed: number
  payment?: { provider: string; mode: string; session_id: string }
}

export type PaymentRecord = { reference: string | null; session_id: string; amount_aed: number; livemode: boolean; paid_at: string; email: string | null }

export type EnquiryRecord = { id: string; received_at: string; name: string; email: string; phone: string; contact_method: string; interest: string; message: string | null; date: string | null; referral_source?: string; locale?: string }

export async function loadDesk() {
  const [plans, payments, enquiries] = await Promise.all([
    readJsonl<PlanRecord>('plan-requests.jsonl'),
    readJsonl<PaymentRecord>('payments.jsonl'),
    readJsonl<EnquiryRecord>('enquiries.jsonl'),
  ])
  const paid = new Map(payments.filter(p => p.reference).map(p => [p.reference!, p]))
  const bookings = plans
    .map(p => ({ ...p, paid: paid.get(p.reference) ?? null }))
    .sort((a, b) => b.received_at.localeCompare(a.received_at))
  return { bookings, payments, enquiries: enquiries.sort((a, b) => b.received_at.localeCompare(a.received_at)) }
}
