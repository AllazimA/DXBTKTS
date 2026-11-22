import { NextRequest, NextResponse } from 'next/server'
import { clientIp, rateLimited } from '@/lib/rate-limit'
import { appendJsonl, parsePlan, planLines, planRecord, PLAN_FILE, queuePlanForCrm, reference } from '@/lib/plan-request'
import { stripeClient, stripeMode } from '@/lib/stripe'
import { site } from '@/lib/site'

/**
 * Pay now: records the plan and opens a Stripe Checkout Session.
 * Amounts are recomputed from the catalogue on the server (AED, in fils).
 * Owner decision (2026-11-19): every catalogue price is payable, including
 * pre-launch indicative prices. All prices must be reviewed before switching
 * to live keys.
 */
export async function POST(request: NextRequest) {
  if (rateLimited('checkout', clientIp(request.headers))) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
  }
  const stripe = stripeClient()
  const mode = stripeMode()
  if (!stripe || !mode) return NextResponse.json({ error: 'Online payment is not available' }, { status: 503 })

  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
  const plan = parsePlan(body)
  if (!plan.ok) {
    if (plan.honeypot) return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
    return NextResponse.json({ error: plan.error }, { status: plan.status })
  }
  // Paying online books real dates: every experience needs one (flexible dates go through a request instead).
  if (plan.priced.some(p => !p.item.date)) return NextResponse.json({ error: 'Choose a date for each experience to pay online.' }, { status: 400 })

  const locale = ['en', 'fr', 'ar'].includes(plan.locale ?? '') ? plan.locale! : 'en'
  const origin = request.headers.get('origin') ?? site.url
  const ref = reference()

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      customer_email: plan.customer.email,
      client_reference_id: ref,
      locale: locale === 'fr' ? 'fr' : 'auto',
      line_items: plan.priced.map(p => ({
        quantity: 1,
        price_data: {
          currency: 'aed',
          unit_amount: Math.round(p.total * 100),
          product_data: {
            name: `${p.product.name.en} — ${p.variant.name.en}`,
            description: [
              p.item.date ? `Date: ${p.item.date}${p.item.time !== 'any' ? ` (${p.item.time})` : ''}` : 'Date to be confirmed',
              p.product.priceType === 'per_person' ? `Guests: ${p.item.qty}${p.item.children ? ` + ${p.item.children} children` : ''}` : `Quantity: ${p.item.qty}`,
            ].join(' · '),
          },
        },
      })),
      metadata: { reference: ref, source: 'plan_drawer', locale, name: plan.customer.name.slice(0, 100), summary: planLines(plan).join(' | ').slice(0, 480) },
      payment_intent_data: { metadata: { reference: ref }, description: `DXB TKTS ${ref}` },
      success_url: `${origin}/${locale}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/${locale}/checkout/cancelled?ref=${ref}`,
    })

    await appendJsonl(PLAN_FILE, planRecord(ref, 'awaiting_payment', plan, { payment: { provider: 'stripe', mode, session_id: session.id } }))
    await queuePlanForCrm(ref, 'pay_now', plan)
    console.log('Checkout started:', ref, `AED ${plan.total}`, mode)
    return NextResponse.json({ url: session.url, reference: ref })
  } catch (error) {
    console.error('Stripe checkout error:', error instanceof Error ? error.message : error)
    return NextResponse.json({ error: 'Payment could not be started' }, { status: 502 })
  }
}
