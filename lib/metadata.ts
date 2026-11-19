import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import type { Locale } from '@/i18n.config'
import { alternatesFor, absoluteUrl, site } from '@/lib/site'

const ogLocale: Record<Locale, string> = { en: 'en_US', ar: 'ar_AE', fr: 'fr_FR' }

export type PageKey =
  | 'home'
  | 'experiences'
  | 'services'
  | 'membership'
  | 'corporate'
  | 'about'
  | 'request'
  | 'contact'
  | 'privacy'
  | 'terms'
  | 'cookies'
  | 'whatsOn'
  | 'journal'
  | 'packages'

/** Localised title, description, canonical and hreflang for a page. */
export async function pageMetadata(locale: Locale, key: PageKey, path: string): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: `meta.${key}` })
  const title = t('title')
  const description = t('description')
  return {
    title: { absolute: title },
    description,
    alternates: alternatesFor(locale, path),
    openGraph: {
      title,
      description,
      url: absoluteUrl(locale, path),
      siteName: site.name,
      locale: ogLocale[locale],
      type: 'website',
    },
    twitter: { card: 'summary_large_image', title, description },
  }
}
