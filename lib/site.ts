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
    // Owner's films, 2026-11-23 (720p masters in assets-originals/video).
    membershipCard: { mp4: '/videos/membership-welcome.mp4', mobile: '/videos/membership-welcome-mobile.mp4', poster: '/images/film-membership-welcome-poster.webp' }, // owner's corrected cut (2026-11-24): 'Welcome to DXB TKTS World', no glass
    nightlifeClub: { mp4: '/videos/nightlife-club.mp4', mobile: '/videos/nightlife-club-mobile.mp4', poster: '/images/film-nightlife-club-poster.webp' },
    celebrationProposal: { mp4: '/videos/celebration-proposal.mp4', mobile: '/videos/celebration-proposal-mobile.mp4', poster: '/images/film-celebration-proposal-poster.webp' },
    diningArrival: { mp4: '/videos/dining-arrival.mp4', mobile: '/videos/dining-arrival-mobile.mp4', poster: '/images/film-dining-arrival-poster.webp' },
    // Owner's films, round 3 (2026-11-23).
    conciergeFulfilling: { mp4: '/videos/concierge-fulfilling.mp4', mobile: '/videos/concierge-fulfilling-mobile.mp4', poster: '/images/film-concierge-fulfilling-poster.webp' },
    ticketsGrandPrix: { mp4: '/videos/tickets-grand-prix.mp4', mobile: '/videos/tickets-grand-prix-mobile.mp4', poster: '/images/film-tickets-grand-prix-poster.webp' }, // cropped: no F1 logo corner
    transfersArrival: { mp4: '/videos/transfers-arrival.mp4', mobile: '/videos/transfers-arrival-mobile.mp4', poster: '/images/film-transfers-arrival-poster.webp' },
    skyHelicopter: { mp4: '/videos/sky-helicopter.mp4', mobile: '/videos/sky-helicopter-mobile.mp4', poster: '/images/film-sky-helicopter-poster.webp' },
    desertDunes: { mp4: '/videos/desert-dunes.mp4', mobile: '/videos/desert-dunes-mobile.mp4', poster: '/images/film-desert-dunes-poster.webp' },
    // Owner's films, round 4 (2026-11-24).
    daytripsHatta: { mp4: '/videos/daytrips-hatta.mp4', mobile: '/videos/daytrips-hatta-mobile.mp4', poster: '/images/film-daytrips-hatta-poster.webp' },
    attractionsBurj: { mp4: '/videos/attractions-burj.mp4', mobile: '/videos/attractions-burj-mobile.mp4', poster: '/images/film-attractions-burj-poster.webp' },
    shoppingPersonal: { mp4: '/videos/shopping-personal.mp4', mobile: '/videos/shopping-personal-mobile.mp4', poster: '/images/film-shopping-personal-poster.webp' }, // trimmed + cropped: no designer shop signs
    corporateMeeting: { mp4: '/videos/corporate-meeting.mp4', mobile: '/videos/corporate-meeting-mobile.mp4', poster: '/images/film-corporate-meeting-poster.webp' },
    experiencesBeach: { mp4: '/videos/experiences-beach.mp4', mobile: '/videos/experiences-beach-mobile.mp4', poster: '/images/film-experiences-beach-poster.webp' },
    // First 3.4 s of the master only: the box's inner lid and welcome card carry garbled AI text.
    membershipBox: { mp4: '/videos/membership-box.mp4', mobile: '/videos/membership-box-mobile.mp4', poster: '/images/film-membership-box-poster.webp' },
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
