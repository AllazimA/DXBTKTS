import type { Package } from '@/data/packages'
import { priceItems } from '@/lib/catalogue/pricing'

/** A package's price is always the live sum of its items (never stored). */
export function packageTotal(pkg: Package) {
  return priceItems(pkg.items.map((it, i) => ({ ...it, key: String(i) }))).total
}

export function packageLines(pkg: Package) {
  return priceItems(pkg.items.map((it, i) => ({ ...it, key: String(i) }))).priced
}
