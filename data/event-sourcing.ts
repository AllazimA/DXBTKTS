/**
 * INTERNAL — where we source tickets for each calendar event.
 * Used by the team when a ticket request comes in. Never import into a page
 * or client component; the website only shows "Request tickets".
 */

export const eventSourcing: Record<string, { provider: string; url: string }> = {
  'atif-aslam-2026': { provider: 'platinumlist', url: 'https://dubai.platinumlist.net/event-tickets/104859/atif-aslam' },
  'artbat-upperground-2026': { provider: 'platinumlist', url: 'https://dubai.platinumlist.net/event-tickets/108298/artbat-present-upperground-at-ushuaia-dubai-harbour-experience' },
  'rashed-al-majed-2026': { provider: 'platinumlist', url: 'https://dubai.platinumlist.net/event-tickets/109907/rashed-al-majed-live-in-dubai' },
  'cirque-de-cuisine-2026': { provider: 'platinumlist', url: 'https://dubai.platinumlist.net/event-tickets/109680/cirque-de-cuisine-night-brunch-at-atlantis-the-palm' },
  'winter-city-2026': { provider: 'platinumlist', url: 'https://dubai.platinumlist.net/event-tickets/winter-city' },
  'sole-dxb-2026': { provider: 'platinumlist', url: 'https://dubai.platinumlist.net/event-tickets/soledxb' },
  'elissa-abu-dhabi-2026': { provider: 'platinumlist', url: 'https://abu-dhabi.platinumlist.net/event-tickets/109770/elissa-live-in-abu-dhabi' },
  'max-amini-2026': { provider: 'platinumlist', url: 'https://dubai.platinumlist.net/event-tickets/109606/max-amini-at-dubai-opera' },
  'black-coffee-2026': { provider: 'platinumlist', url: 'https://dubai.platinumlist.net/event-tickets/109985/black-coffee-at-ushuaia-dubai-harbour-experience-in-dubai' },
  'katy-perry-nye-2026': { provider: 'platinumlist', url: 'https://dubai.platinumlist.net/event-tickets/108316/new-years-eve-under-the-stars-gala-dinner-featuring-katy-perry-in-dubai' },
  'argy-nye-2026': { provider: 'platinumlist', url: 'https://dubai.platinumlist.net/event-tickets/108451/argy-presents-neworld-new-years-eve-at-ushuaia-dubai-harbour-experience' },
  'diljit-dosanjh-2026': { provider: 'platinumlist', url: 'https://abu-dhabi.platinumlist.net/event-tickets/109618/diljit-dosanjh' },
  'richard-marx-2027': { provider: 'platinumlist', url: 'https://dubai.platinumlist.net/event-tickets/105069/richard-marx-live-at-coca-cola-arena-in-dubai' },
}
