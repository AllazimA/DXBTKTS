import type { Locale } from '@/i18n.config'
import type { images } from '@/lib/images'

export type L<T = string> = Record<Locale, T>
export type ImageKey = keyof typeof images

/** How the base price of a variant is counted. */
export type PriceType =
  | 'per_person' // × adults (+ children at childPrice)
  | 'per_group' // one price for the whole group
  | 'per_vehicle' // × vehicles
  | 'per_unit' // × units (buggies, jet skis…)
  | 'per_hour' // × hours (whole boat / car)

export type ConfirmationMode = 'instant' | 'on_request'

export type Suit = 'couples' | 'families' | 'friends' | 'vip' | 'groups'

export type Variant = {
  id: string
  name: L
  detail: L
  /** AED, VAT-inclusive display price */
  price: number
  /** AED per child (per_person only); omitted = no child rate */
  childPrice?: number
  /** People per unit/vehicle/boat, for the per-person translation */
  capacity?: number
  recommended?: boolean
}

export type Extra = {
  id: string
  name: L
  price: number
  per: 'booking' | 'person' | 'hour'
  max: number
}

export type Product = {
  slug: string
  category: CategorySlug
  image: ImageKey
  name: L
  tagline: L
  description: L
  duration: L
  groupSize: L
  priceType: PriceType
  confirmation: ConfirmationMode
  /** Minimum quantity (hours for per_hour, people for per_person, units otherwise) */
  minQty: number
  maxQty: number
  variants: Variant[]
  extras?: Extra[]
  highlights: L<string[]>
  included: L<string[]>
  notIncluded: L<string[]>
  goodToKnow: L<string[]>
  faq: L<{ q: string; a: string }[]>
  related: string[]
  /** Bespoke: no online price; the page shows a request panel instead. */
  quoteOnly?: boolean
  /** Who it is best for (shown as tags). */
  suits?: Suit[]
  /** How the experience can be made private / VIP. */
  vip?: L
  /**
   * false = placeholder price, not yet backed by a signed supplier rate
   * sheet. The site labels these prices "indicative". Set to true only
   * when a supplier agreement exists (Roadmap Stage 2 acceptance rule).
   */
  priceVerified: boolean
}

export type CategorySlug = 'signature' | 'on-the-water' | 'desert' | 'sky' | 'day-trips' | 'lifestyle' | 'shopping' | 'transfers' | 'attractions'

export type Category = {
  slug: CategorySlug
  image: ImageKey
  name: L
  intro: L
}

/** One line in the visitor's plan (basket). Prices are never stored here. */
export type PlanItem = {
  key: string
  slug: string
  variantId: string
  date: string // yyyy-mm-dd or ''
  time: 'any' | 'morning' | 'afternoon' | 'evening'
  qty: number
  children: number
  extras: Record<string, number>
}
