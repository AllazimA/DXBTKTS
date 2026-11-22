import { promises as fs } from 'fs'
import path from 'path'
import type { Locale } from '@/i18n.config'
import { SEED_NIGHTLIFE, SEED_RESTAURANTS } from '@/data/curated-seed'

/**
 * Curated lists shown on /dining, /nightlife and /tickets.
 *
 * The DXB CRM owns them (Website listings) and publishes each list to POST /api/crm/content, which
 * writes data/published/<kind>.json. Pages read that file on every request, so a change in the CRM
 * shows without a rebuild. Until a list has been published, the built-in seed is shown.
 *
 * Published text is English; a field may carry French and Arabic versions as `<field>_fr` and
 * `<field>_ar`. A missing translation falls back to the English text.
 */

export const CURATED_KINDS = ['restaurant', 'nightlife', 'event'] as const
export type CuratedKind = (typeof CURATED_KINDS)[number]
export const PUBLISHED_DIR = path.join(process.cwd(), 'data', 'published')

export type Restaurant = { slug: string; name: string; cuisine: string; area: string; why: string; bestFor: string; basis: string; website: string | null; image: string | null; canRequest: boolean }
export type NightlifeVenue = { slug: string; name: string; kindOfNight: string; area: string; why: string; bestFor: string; music: string; dressCode: string; basis: string; website: string | null; image: string | null; canRequest: boolean }
export type CuratedEvent = {
  id: string
  title: string
  category: string
  date: string
  endDate: string | null
  time: string | null
  venue: string
  description: string
  ticketCategories: string
  priceReference: string
  status: 'on_sale' | 'few_left' | 'sold_out' | 'announced'
  officialUrl: string | null
  image: string | null
}

type Item = Record<string, unknown>
type Published = { items: Item[]; publishedAt: string | null }

async function readPublished(kind: CuratedKind): Promise<Published | null> {
  try {
    const raw = JSON.parse(await fs.readFile(path.join(PUBLISHED_DIR, `${kind}.json`), 'utf8'))
    if (!raw || !Array.isArray(raw.items)) return null
    return { items: raw.items as Item[], publishedAt: typeof raw.publishedAt === 'string' ? raw.publishedAt : null }
  } catch {
    return null
  }
}

const s = (v: unknown) => (typeof v === 'string' ? v.trim() : '')
/** The field in the reader's language, else English. */
const loc = (item: Item, field: string, locale: Locale) => (locale !== 'en' && s(item[`${field}_${locale}`])) || s(item[field])
const httpsUrl = (v: unknown) => (/^https:\/\/\S+$/.test(s(v)) ? s(v) : null)
/** Only images served by this site; anything else falls back to the page's own picture. */
const localImage = (v: unknown) => (/^\/images\/[\w./-]+$/.test(s(v)) && !s(v).includes('..') ? s(v) : null)
const slugOf = (item: Item, name: string) => s(item.slug) || name.toLowerCase().normalize('NFKD').replace(/[^\w\s-]/g, '').trim().replace(/\s+/g, '-')

export async function getRestaurants(locale: Locale): Promise<Restaurant[]> {
  const pub = await readPublished('restaurant')
  if (pub) {
    return pub.items
      .filter(i => s(i.name))
      .map(i => ({
        slug: slugOf(i, s(i.name)),
        name: s(i.name),
        cuisine: loc(i, 'cuisine', locale),
        area: loc(i, 'area', locale),
        why: loc(i, 'why', locale) || loc(i, 'description', locale),
        bestFor: loc(i, 'bestFor', locale),
        basis: loc(i, 'basis', locale),
        website: httpsUrl(i.website),
        image: localImage(i.image),
        canRequest: s(i.canRequest) !== 'no',
      }))
  }
  return SEED_RESTAURANTS.filter(r => r.active).map(r => ({
    slug: r.slug,
    name: r.name,
    cuisine: r.cuisine[locale],
    area: r.area,
    why: r.why[locale],
    bestFor: r.bestFor[locale],
    basis: r.basis[locale],
    website: r.website ?? null,
    image: null,
    canRequest: true,
  }))
}

export async function getNightlife(locale: Locale): Promise<NightlifeVenue[]> {
  const pub = await readPublished('nightlife')
  if (pub) {
    return pub.items
      .filter(i => s(i.name))
      .map(i => ({
        slug: slugOf(i, s(i.name)),
        name: s(i.name),
        kindOfNight: loc(i, 'kindOfNight', locale),
        area: loc(i, 'area', locale),
        why: loc(i, 'description', locale),
        bestFor: loc(i, 'bestFor', locale),
        music: loc(i, 'music', locale),
        dressCode: loc(i, 'dressCode', locale),
        basis: loc(i, 'basis', locale),
        website: httpsUrl(i.website),
        image: localImage(i.image),
        canRequest: s(i.canRequest) !== 'no',
      }))
  }
  return SEED_NIGHTLIFE.filter(v => v.active).map(v => ({
    slug: v.slug,
    name: v.name,
    kindOfNight: v.kindOfNight[locale],
    area: v.area,
    why: v.why[locale],
    bestFor: v.bestFor[locale],
    music: '',
    dressCode: '',
    basis: v.basis[locale],
    website: v.website ?? null,
    image: null,
    canRequest: true,
  }))
}

/** Today in Dubai (UTC+4), as YYYY-MM-DD. */
const dubaiToday = () => new Date(Date.now() + 4 * 3600e3).toISOString().slice(0, 10)
const STATUSES = ['on_sale', 'few_left', 'sold_out', 'announced'] as const
const ISO = /^\d{4}-\d{2}-\d{2}$/

/** Upcoming events the CRM has published (Dubai Opera and other shows). Past ones drop off on their own. */
export async function getEvents(locale: Locale): Promise<CuratedEvent[]> {
  const pub = await readPublished('event')
  if (!pub) return []
  const today = dubaiToday()
  return pub.items
    .filter(i => s(i.title) && ISO.test(s(i.date)))
    .map(i => {
      const status = s(i.status) as CuratedEvent['status']
      return {
        id: s(i.id) || slugOf(i, s(i.title)),
        title: loc(i, 'title', locale),
        category: s(i.category),
        date: s(i.date),
        endDate: ISO.test(s(i.endDate)) ? s(i.endDate) : null,
        time: /^\d{2}:\d{2}$/.test(s(i.time)) ? s(i.time) : null,
        venue: loc(i, 'venue', locale),
        description: loc(i, 'description', locale),
        ticketCategories: loc(i, 'ticketCategories', locale),
        priceReference: loc(i, 'priceReference', locale),
        status: STATUSES.includes(status) ? status : 'announced',
        officialUrl: httpsUrl(i.officialUrl),
        image: localImage(i.image),
      }
    })
    .filter(e => (e.endDate ?? e.date) >= today)
    .sort((a, b) => a.date.localeCompare(b.date) || (a.time ?? '').localeCompare(b.time ?? ''))
}
