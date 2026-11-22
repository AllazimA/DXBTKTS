import type { Locale } from '@/i18n.config'

/**
 * AED is the only currency we charge in. Other currencies are shown as an
 * approximate guide for international visitors.
 * USD uses the official AED peg; EUR and GBP are rounded indicative rates —
 * review them monthly (or connect a rates feed in Stage 3).
 */
export const AED_PER = { USD: 3.6725, EUR: 4.25, GBP: 4.9 } as const
export const RATES_REVIEWED = '2026-11'

const numberLocale: Record<Locale, string> = { en: 'en-AE', fr: 'fr-FR', ar: 'ar-AE' }

export function formatAED(amount: number, locale: Locale) {
  const n = new Intl.NumberFormat(numberLocale[locale], { maximumFractionDigits: 0, numberingSystem: 'latn' }).format(amount)
  return locale === 'ar' ? `${n} درهم` : `AED ${n}`
}

export function approx(amount: number, locale: Locale) {
  const fmt = (v: number, currency: string) =>
    new Intl.NumberFormat(numberLocale[locale], { style: 'currency', currency, maximumFractionDigits: 0, numberingSystem: 'latn' }).format(v)
  return [fmt(amount / AED_PER.USD, 'USD'), fmt(amount / AED_PER.EUR, 'EUR'), fmt(amount / AED_PER.GBP, 'GBP')]
}
