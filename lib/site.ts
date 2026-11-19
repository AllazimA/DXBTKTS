import { locales, defaultLocale, type Locale } from '@/i18n.config'

/**
 * Single source of truth for DXB TKTS business details.
 * Legal entity, licence numbers and address are added here once the
 * company formation is complete (Roadmap Stage 0).
 */
export const site = {
  name: 'DXB TKTS',
  legalName: 'DXBTKTS',
  url: (process.env.NEXT_PUBLIC_SITE_URL || 'https://dxbtkts.com').replace(/\/$/, ''),
  city: 'Dubai',
  country: 'United Arab Emirates',
  email: 'hello@dxbtkts.com',
  /**
   * Hero film (DXB_TKTS_IMAGE_BRIEF.md §2). Leave null until the files exist
   * in public/videos; the hero then shows the still image only.
   */
  heroVideo: {
    mp4: '/videos/hero-loop.mp4', // 1080p, AI-generated for DXBTKTS
    mobile: '/videos/hero-loop-mobile.mp4', // 960×540
    poster: '/images/ai/hero-poster.webp',
  } as null | { mp4: string; webm?: string; mobile: string; poster: string },
  /** Page-hero films (AI-generated for DXBTKTS). */
  films: {
    diningTerrace: { mp4: '/videos/dining-terrace.mp4', mobile: '/videos/dining-terrace-mobile.mp4', poster: '/images/film-dining-terrace-poster.webp' },
    nightlifeLounge: { mp4: '/videos/nightlife-lounge.mp4', mobile: '/videos/nightlife-lounge-mobile.mp4', poster: '/images/film-nightlife-lounge-poster.webp' },
  },
  /** Pre-launch announcement bar. Set enabled: false on launch day. */
  comingSoon: { enabled: true },
  /**
   * Official social accounts. null = not created yet: the icon is shown
   * greyed out with "Coming soon" and is not a link. Paste the URL to activate.
   */
  social: {
    instagram: null,
    facebook: null,
    tiktok: null,
    youtube: null,
    linkedin: null,
  } as Record<'instagram' | 'facebook' | 'tiktok' | 'youtube' | 'linkedin', string | null>,
  /** WhatsApp Business number — change here only. */
  whatsapp: {
    display: '+971 50 808 8925',
    e164: '+971508088925',
    waNumber: '971508088925',
  },
} as const

export function whatsappLink(message = 'Hi DXB TKTS') {
  return `https://wa.me/${site.whatsapp.waNumber}?text=${encodeURIComponent(message)}`
}

/** Path for a locale under the `as-needed` prefix strategy (English has no prefix). */
export function localePath(locale: Locale, path: string) {
  const clean = path === '/' ? '' : path
  return locale === defaultLocale ? clean || '/' : `/${locale}${clean}`
}

export function absoluteUrl(locale: Locale, path: string) {
  const p = localePath(locale, path)
  return `${site.url}${p === '/' ? '' : p}`
}

/** Canonical + hreflang alternates for one page. */
export function alternatesFor(locale: Locale, path: string) {
  const languages: Record<string, string> = {}
  for (const l of locales) languages[l] = absoluteUrl(l, path)
  languages['x-default'] = absoluteUrl(defaultLocale, path)
  return { canonical: absoluteUrl(locale, path), languages }
}
