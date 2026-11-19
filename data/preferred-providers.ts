/**
 * INTERNAL — preferred providers DXB TKTS sources from.
 * Never import this into a page or client component: it must not appear on
 * the website or in the browser bundle. (Will move to the CRM later.)
 */

export type ProviderType = 'tickets' | 'yacht' | 'desert' | 'transport' | 'dining' | 'other'

export type Provider = {
  id: string
  name: string
  type: ProviderType
  website: string
  /** What we use them for. */
  scope: string
  /** Commercial terms (commission / net rates) once agreed — none recorded yet. */
  terms: string | null
  status: 'preferred' | 'approved' | 'to-review'
}

export const preferredProviders: Provider[] = [
  {
    id: 'platinumlist',
    name: 'Platinumlist',
    type: 'tickets',
    website: 'https://dubai.platinumlist.net',
    scope: 'Concerts, shows, nightlife, festivals and attractions across the UAE — main source for event ticket requests.',
    terms: null,
    status: 'preferred',
  },
]
