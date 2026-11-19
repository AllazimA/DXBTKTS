/**
 * Upgrade ladders: the natural "step up" from a product to a more private
 * or more special one already in the catalogue (strategy report, opportunity 3).
 * Variant-level upgrades (e.g. Burj Khalifa SKY 148) are shown by the booking
 * panel itself.
 */
export const upgrades: Record<string, string[]> = {
  'premium-desert-safari': ['private-desert-safari', 'desert-safari-in-style'],
  'private-desert-safari': ['private-dune-dinner', 'desert-safari-in-style'],
  'dune-buggy': ['private-desert-safari'],
  'desert-stargazing': ['private-dune-dinner'],
  'private-yacht-charter': ['sunset-celebration-yacht', 'superyacht-charter'],
  'sunset-celebration-yacht': ['superyacht-charter'],
  'dinner-yacht-for-two': ['superyacht-charter'],
  'jet-ski-burj-al-arab': ['private-yacht-charter'],
  'helicopter-tour': ['private-helicopter-charter'],
  'seaplane-flight': ['private-helicopter-charter'],
  'airport-transfer': ['rolls-royce-chauffeur'],
  'private-chauffeur': ['rolls-royce-chauffeur'],
  'luxury-car-rental': ['supercar-track-experience'],
  'old-dubai-heritage-walk': ['private-dubai-city-tour'],
  'museum-of-the-future': ['modern-dubai-architecture'],
  'beach-club-daybed': ['private-yacht-charter'],
}

/** Products that already include transport or offer their own transfer extra: no door-to-door offer. */
export const TRANSPORT_INCLUDED = new Set([
  'desert-safari-in-style',
  'private-dune-dinner',
  'rolls-royce-chauffeur',
  'private-desert-safari',
  'premium-desert-safari',
  'hot-air-balloon',
  'airport-transfer',
  'private-chauffeur',
  'abu-dhabi-day-trip',
  'desert-stargazing',
  'private-dubai-city-tour',
  'hatta-mountain-day',
  'luxury-car-rental',
  'private-chef-villa',
  'private-falconry-dawn',
  'dune-buggy',
  'desert-horse-riding',
  'theme-park-day',
])
