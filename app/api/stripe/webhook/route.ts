import { NextRequest, NextResponse } from 'next/server'
import type Stripe from 'stripe'
import { stripeClient } from '@/lib/stripe'
import { recordPaidSession } from '@/lib/payments'

/**
 * Stripe webhook (checkout.session.completed). Needs STRIPE_WEBHOOK_SECRET;
 * locally: `stripe listen --forward-to localhost:3006/api/stripe/webhook`.
 */
export async function POST(request: NextRequest) {
  const stripe = stripeClient()
  const secret = process.env.STRIPE_WEBHOOK_SECRET
  if (!stripe || !secret) return NextResponse.json({ error: 'Webhook not configured' }, { status: 503 })

  const payload = await request.text()
  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(payload, request.headers.get('stripe-signature') ?? '', secret)
  } catch {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed' || event.type === 'checkout.session.async_payment_succeeded') {
    await recordPaidSession(event.data.object as Stripe.Checkout.Session, 'webhook')
  }
  return NextResponse.json({ received: true })
}
