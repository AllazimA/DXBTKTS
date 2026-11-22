import { promises as fs } from 'fs'
import type Stripe from 'stripe'
import { appendJsonl, PAYMENTS_FILE } from '@/lib/plan-request'
import { queuePaymentForCrm } from '@/lib/crm-outbox'

/** Record a completed Checkout Session once (success page and webhook may both see it). */
export async function recordPaidSession(session: Stripe.Checkout.Session, via: 'success_page' | 'webhook') {
  if (session.payment_status !== 'paid') return
  // Tell the CRM (idempotent by session id — the success page and the webhook may both call this).
  await queuePaymentForCrm({
    reference: session.client_reference_id ?? session.metadata?.reference ?? null, provider: 'stripe', sessionId: session.id,
    paymentIntent: typeof session.payment_intent === 'string' ? session.payment_intent : session.payment_intent?.id ?? null,
    amount: (session.amount_total ?? 0) / 100, currency: (session.currency ?? 'aed').toUpperCase(),
    email: session.customer_details?.email ?? session.customer_email ?? null, livemode: session.livemode, paidAt: new Date().toISOString(), status: 'paid',
  })
  try {
    const existing = await fs.readFile(PAYMENTS_FILE, 'utf8')
    if (existing.includes(`"session_id":"${session.id}"`)) return
  } catch {
    // no file yet
  }
  await appendJsonl(PAYMENTS_FILE, {
    reference: session.client_reference_id ?? session.metadata?.reference ?? null,
    session_id: session.id,
    payment_intent: typeof session.payment_intent === 'string' ? session.payment_intent : session.payment_intent?.id ?? null,
    amount_aed: (session.amount_total ?? 0) / 100,
    currency: session.currency,
    email: session.customer_details?.email ?? session.customer_email ?? null,
    livemode: session.livemode,
    paid_at: new Date().toISOString(),
    recorded_via: via,
  })
}
