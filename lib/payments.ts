import { promises as fs } from 'fs'
import type Stripe from 'stripe'
import { appendJsonl, PAYMENTS_FILE } from '@/lib/plan-request'
import { queuePaymentForCrm } from '@/lib/crm-outbox'
import { sendAck } from '@/lib/ack-email'

/** Record a completed Checkout Session once (success page and webhook may both see it). */
export async function recordPaidSession(session: Stripe.Checkout.Session, via: 'success_page' | 'webhook') {
  if (session.payment_status !== 'paid') return
  // Already recorded: do nothing. The success page is re-rendered whenever it is revisited or refreshed; queueing the
  // payment again after the CRM had collected it put it back in the outbox for good (found 2026-11-26).
  try {
    const existing = await fs.readFile(PAYMENTS_FILE, 'utf8')
    if (existing.includes(`"session_id":"${session.id}"`)) return
  } catch {
    // no file yet
  }
  // Tell the CRM (idempotent by session id — the success page and the webhook may both get here at the same moment).
  await queuePaymentForCrm({
    reference: session.client_reference_id ?? session.metadata?.reference ?? null, provider: 'stripe', sessionId: session.id,
    paymentIntent: typeof session.payment_intent === 'string' ? session.payment_intent : session.payment_intent?.id ?? null,
    amount: (session.amount_total ?? 0) / 100, currency: (session.currency ?? 'aed').toUpperCase(),
    email: session.customer_details?.email ?? session.customer_email ?? null, livemode: session.livemode, paidAt: new Date().toISOString(), status: 'paid',
  })
  // First time this payment is seen (the success page and the webhook may both call this): tell the guest.
  const to = session.customer_details?.email ?? session.customer_email ?? null
  if (to) await sendAck({ to, name: session.customer_details?.name ?? session.metadata?.name ?? '', locale: session.metadata?.locale ?? 'en',
    kind: 'pay', reference: session.client_reference_id ?? session.metadata?.reference ?? null, lines: session.metadata?.summary ? session.metadata.summary.split(' | ') : [],
    amount: { value: (session.amount_total ?? 0) / 100, currency: (session.currency ?? 'aed').toUpperCase(), test: !session.livemode } })
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
