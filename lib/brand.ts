/**
 * DXB TKTS category families (brand guidelines Part 1, "Colour that tells you
 * what kind of day"). Six families, each with one fixed colour and a fixed
 * text colour so every pairing stays readable. Do not add colours here.
 */
import type { BrandIconName } from '@/components/brand/icon-paths'

export type Family = 'days-out' | 'events' | 'desert-sky' | 'water' | 'city-life' | 'signature'

export const FAMILY: Record<Family, { bg: string; text: string; chip: string; accent: string; label: { en: string; fr: string; ar: string }; icon: BrandIconName }> = {
  'days-out': { bg: 'bg-dxb-green', text: 'text-dxb-ink', chip: 'bg-dxb-green text-dxb-ink', accent: 'text-dxb-green', label: { en: 'Days out', fr: 'Sorties', ar: 'أيام ممتعة' }, icon: 'attractions' },
  events: { bg: 'bg-dxb-red', text: 'text-white', chip: 'bg-dxb-red text-white', accent: 'text-dxb-red', label: { en: 'Events & nights', fr: 'Événements & soirées', ar: 'فعاليات وسهرات' }, icon: 'events' },
  'desert-sky': { bg: 'bg-dxb-orange', text: 'text-dxb-ink', chip: 'bg-dxb-orange text-dxb-ink', accent: 'text-dxb-orange', label: { en: 'Desert & sky', fr: 'Désert & ciel', ar: 'الصحراء والسماء' }, icon: 'desert' },
  water: { bg: 'bg-dxb-cobalt', text: 'text-white', chip: 'bg-dxb-cobalt text-white', accent: 'text-dxb-cobalt', label: { en: 'On the water', fr: 'Sur l’eau', ar: 'على الماء' }, icon: 'water' },
  'city-life': { bg: 'bg-dxb-navy', text: 'text-white', chip: 'bg-dxb-navy text-white', accent: 'text-dxb-navy', label: { en: 'City life', fr: 'Vie urbaine', ar: 'حياة المدينة' }, icon: 'concierge' },
  signature: { bg: 'bg-dxb-ink', text: 'text-white', chip: 'bg-dxb-ink text-dxb-orange', accent: 'text-dxb-ink', label: { en: 'Signature', fr: 'Signature', ar: 'سيغنتشر' }, icon: 'signature' },
}

/** Site category slug → colour family. */
const CATEGORY_FAMILY: Record<string, Family> = {
  signature: 'signature',
  attractions: 'days-out',
  'day-trips': 'days-out',
  desert: 'desert-sky',
  sky: 'desert-sky',
  'on-the-water': 'water',
  shopping: 'city-life',
  lifestyle: 'city-life',
  transfers: 'city-life',
  dining: 'city-life',
  tickets: 'events',
  nightlife: 'events',
  events: 'events',
}

export function familyOf(category: string): Family {
  return CATEGORY_FAMILY[category] ?? 'city-life'
}

/** Brand icon per site category. */
export const CATEGORY_ICON: Record<string, BrandIconName> = {
  signature: 'signature',
  attractions: 'attractions',
  'day-trips': 'day-trips',
  desert: 'desert',
  sky: 'sky',
  'on-the-water': 'water',
  shopping: 'shopping',
  lifestyle: 'concierge',
  transfers: 'transfers',
  dining: 'dining',
  nightlife: 'nightlife',
  tickets: 'ticket',
}
