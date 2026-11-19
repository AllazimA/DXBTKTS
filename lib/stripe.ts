import Stripe from 'stripe'

/** Server-side Stripe client, or null when no secret key is configured. */
export function stripeClient(): Stripe | null {
  const key = process.env.STRIPE_SECRET_KEY
  if (!key) return null
  return new Stripe(key, { appInfo: { name: 'DXB TKTS' } })
}

/** 'test' with sk_test_ keys (sandbox), 'live' with sk_live_ keys. */
export function stripeMode(): 'test' | 'live' | null {
  const key = process.env.STRIPE_SECRET_KEY ?? ''
  if (key.startsWith('sk_test_') || key.startsWith('rk_test_')) return 'test'
  if (key.startsWith('sk_live_') || key.startsWith('rk_live_')) return 'live'
  return null
}
