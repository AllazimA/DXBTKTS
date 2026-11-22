import { promises as fs } from 'fs'
import path from 'path'
import { priceItems } from '@/lib/catalogue/pricing'
import type { PlanItem } from '@/lib/catalogue/types'
import { queueForCrm } from '@/lib/crm-outbox'

/** Shared parsing and storage for plan requests (request-to-book and pay-now). */

export const PLAN_FILE = path.join(process.cwd(), 'data', 'plan-requests.jsonl')
export const PAYMENTS_FILE = path.join(process.cwd(), 'data', 'payments.jsonl')
const TIMES = new Set(['any', 'morning', 'afternoon', 'evening'])

export const str = (v: unknown, max: number) => (typeof v === 'string' && v.trim() ? v.trim().slice(0, max) : null)

export function reference() {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let out = ''
  for (let i = 0; i < 6; i++) out += alphabet[Math.floor(Math.random() * alphabet.length)]
  return `DXB-${out}`
}

export type ParsedPlan =
  | { ok: false; status: number; error: string; honeypot?: boolean }
  | {
      ok: true
      customer: { name: string; email: string; whatsapp: string; guests: number | null; hotel: string | null; notes: string | null }
      locale: string | null
      priced: ReturnType<typeof priceItems>['priced']
      total: number
    }

export function parsePlan(body: Record<string, unknown>): ParsedPlan {
  if (str(body.company_website, 200)) return { ok: false, status: 200, error: 'honeypot', honeypot: true }

  const name = str(body.name, 120)
  const email = str(body.email, 200)
  const whatsapp = str(body.whatsapp, 40)
  if (!name || !email || !whatsapp || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, status: 400, error: 'Missing or invalid contact details' }
  }
  const g = Number(body.guests)
  const guests = Number.isInteger(g) && g >= 1 && g <= 100 ? g : null
  if (body.consent !== true) return { ok: false, status: 400, error: 'Consent required' }

  const rawItems = Array.isArray(body.items) ? body.items.slice(0, 20) : []
  const items: PlanItem[] = rawItems.map((raw, i) => {
    const r = (raw ?? {}) as Record<string, unknown>
    const date = typeof r.date === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(r.date) ? r.date : ''
    const extras: Record<string, number> = {}
    if (r.extras && typeof r.extras === 'object') {
      for (const [k, v] of Object.entries(r.extras as Record<string, unknown>)) if (typeof v === 'number') extras[k.slice(0, 40)] = v
    }
    return {
      key: String(i),
      slug: String(r.slug ?? '').slice(0, 80),
      variantId: String(r.variantId ?? '').slice(0, 40),
      date,
      time: (TIMES.has(String(r.time)) ? r.time : 'any') as PlanItem['time'],
      qty: Number(r.qty) || 0,
      children: Number(r.children) || 0,
      extras,
    }
  })

  const { priced, total } = priceItems(items)
  if (!priced.length) return { ok: false, status: 400, error: 'Your plan is empty' }

  return {
    ok: true,
    customer: { name, email, whatsapp, guests, hotel: str(body.hotel, 160), notes: str(body.notes, 2000) },
    locale: str(body.locale, 5),
    priced,
    total,
  }
}

export function planRecord(ref: string, status: string, plan: Extract<ParsedPlan, { ok: true }>, extra: Record<string, unknown> = {}) {
  return {
    reference: ref,
    status,
    received_at: new Date().toISOString(),
    locale: plan.locale,
    customer: plan.customer,
    items: plan.priced.map(p => ({
      slug: p.product.slug,
      product: p.product.name.en,
      variant: p.variant.name.en,
      date: p.item.date || null,
      time: p.item.time,
      qty: p.item.qty,
      children: p.item.children,
      extras: p.item.extras,
      lines: p.lines,
      estimated_total_aed: p.total,
      price_verified: p.product.priceVerified,
    })),
    estimated_total_aed: plan.total,
    ...extra,
  }
}

/** Local development storage (JSON lines). Stage 3 moves this to the database. */
export async function appendJsonl(file: string, record: unknown) {
  try {
    await fs.appendFile(file, JSON.stringify(record) + '\n', 'utf8')
  } catch (error) {
    console.error('Could not persist record:', error)
  }
}

/** Queue a plan (request-to-book or pay-now) for the CRM as one experience request. */
export async function queuePlanForCrm(ref: string, mode: 'request' | 'pay_now', plan: Extract<ParsedPlan, { ok: true }>) {
  const lines = plan.priced.map(p => `• ${p.product.name.en} — ${p.variant.name.en}${p.item.date ? `, ${p.item.date} (${p.item.time})` : ', date to confirm'} · qty ${p.item.qty}${p.item.children ? ` + ${p.item.children} children` : ''} · AED ${p.total}`)
  const dates = plan.priced.map(p => p.item.date).filter(Boolean).sort()
  await queueForCrm({
    name: plan.customer.name,
    email: plan.customer.email,
    phone: plan.customer.whatsapp,
    interest: 'experience',
    interestLabel: mode === 'pay_now' ? `Plan ${ref} — paying online` : `Plan ${ref} — request to book`,
    message: [`Plan ${ref} (${mode === 'pay_now' ? 'Pay now started on the website' : 'sent as a request'}):`, ...lines, `Estimated total: AED ${plan.total}`, plan.customer.guests ? `Guests: ${plan.customer.guests}` : '', plan.customer.hotel ? `Hotel / area: ${plan.customer.hotel}` : '', plan.customer.notes ? `Notes: ${plan.customer.notes}` : ''].filter(Boolean).join('\n'),
    arrival: dates[0],
    guests: plan.customer.guests ? String(plan.customer.guests) : undefined,
    departure: dates.length > 1 ? dates[dates.length - 1] : undefined,
    locale: plan.locale ?? undefined,
    details: { planReference: ref, planMode: mode, estimatedTotalAed: String(plan.total), hotel: plan.customer.hotel ?? '', items: lines.join('\n') },
    source: mode === 'pay_now' ? 'website_pay_now' : 'website_plan_request',
    order: {
      reference: ref, mode, currency: 'AED', total: plan.total, guests: plan.customer.guests, hotel: plan.customer.hotel, notes: plan.customer.notes,
      lines: plan.priced.map(p => ({
        slug: p.product.slug, product: p.product.name.en, variant: p.variant.name.en, category: p.product.category ?? null, priceType: p.product.priceType,
        date: p.item.date || null, time: p.item.time ?? null, qty: p.item.qty, children: p.item.children, extras: p.item.extras,
        unitPrice: p.lines.find(l => l.label === 'base')?.unit ?? null, total: p.total, priceVerified: !!p.product.priceVerified,
      })),
    },
  })
}
