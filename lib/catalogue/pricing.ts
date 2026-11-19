import { getProduct } from '@/data/catalogue'
import type { PlanItem, Product, Variant } from './types'

/**
 * Pricing is always recomputed from the catalogue — on the client for the
 * live total, and again on the server when a request is received — so a
 * price stored in the browser can never be trusted or charged.
 */

export type PricedLine = { label: 'base' | 'children' | 'extra'; id: string; qty: number; unit: number; amount: number }
export type PricedItem = {
  product: Product
  variant: Variant
  item: PlanItem
  lines: PricedLine[]
  total: number
}

const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, Math.round(n || 0)))

/** Normalise quantities so they respect product limits. */
export function normaliseItem(product: Product, item: PlanItem): PlanItem {
  const variant = product.variants.find(v => v.id === item.variantId) ?? product.variants[0]
  const qty = product.priceType === 'per_group' ? 1 : clamp(item.qty, product.minQty, product.maxQty)
  const children = product.priceType === 'per_person' && variant.childPrice !== undefined ? clamp(item.children, 0, product.maxQty) : 0
  const extras: Record<string, number> = {}
  for (const extra of product.extras ?? []) {
    const n = clamp(item.extras?.[extra.id] ?? 0, 0, extra.max)
    if (n > 0) extras[extra.id] = n
  }
  return { ...item, variantId: variant.id, qty, children, extras }
}

export function priceItem(raw: PlanItem): PricedItem | null {
  const product = getProduct(raw.slug)
  if (!product) return null
  const item = normaliseItem(product, raw)
  const variant = product.variants.find(v => v.id === item.variantId)!
  const lines: PricedLine[] = [{ label: 'base', id: variant.id, qty: item.qty, unit: variant.price, amount: variant.price * item.qty }]
  if (item.children > 0 && variant.childPrice !== undefined) {
    lines.push({ label: 'children', id: variant.id, qty: item.children, unit: variant.childPrice, amount: variant.childPrice * item.children })
  }
  for (const extra of product.extras ?? []) {
    const n = item.extras[extra.id]
    if (n) lines.push({ label: 'extra', id: extra.id, qty: n, unit: extra.price, amount: extra.price * n })
  }
  return { product, variant, item, lines, total: lines.reduce((s, l) => s + l.amount, 0) }
}

export function priceItems(items: PlanItem[]) {
  const priced = items.map(priceItem).filter((p): p is PricedItem => p !== null)
  return { priced, total: priced.reduce((s, p) => s + p.total, 0) }
}

/** Per-person translation for whole-unit prices, e.g. "AED 475 each for 2". */
export function perPersonHint(product: Product, variant: Variant) {
  if (!variant.capacity || variant.capacity < 2) return null
  if (product.priceType === 'per_person' || product.priceType === 'per_hour') return null
  return { each: Math.round(variant.price / variant.capacity), people: variant.capacity }
}
