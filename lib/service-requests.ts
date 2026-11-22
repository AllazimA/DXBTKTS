import type { RequestType } from '@/lib/crm-outbox'

/**
 * Field keys per service request type. They match the DXB CRM request-type
 * fields (DXB-CRM lib/domain/services.ts), so the CRM files each answer
 * in its own field. `date` becomes the request date; `time` its time.
 */
export const SERVICE_FIELDS = {
  shopping: ['product', 'location', 'brands', 'productCategory', 'budget', 'date', 'time', 'duration', 'personalShopper', 'itemsSought', 'assistance', 'preferences', 'referenceLinks', 'guests'],
  sourcing: ['productName', 'brand', 'model', 'edition', 'specifications', 'colour', 'size', 'quantity', 'budget', 'releaseDate', 'neededBy', 'retailer', 'referenceUrl', 'brandNewOnly', 'alternativesOk', 'urgency', 'termsAccepted'],
  dining: ['restaurant', 'restaurants', 'date', 'time', 'partySize', 'occasion', 'specialRequests', 'recommendationWanted'],
  nightlife: ['venue', 'date', 'time', 'partySize', 'occasion', 'seating', 'budget', 'eventPreference', 'specialRequests', 'transport'],
  tickets: ['event', 'venue', 'date', 'time', 'ticketCategory', 'tickets', 'seating', 'budget', 'notes', 'dinnerAndShow'],
} as const satisfies Partial<Record<RequestType, readonly string[]>>

export type ServiceKind = keyof typeof SERVICE_FIELDS
export const SERVICE_KINDS = Object.keys(SERVICE_FIELDS) as ServiceKind[]

export const SERVICE_LABEL: Record<ServiceKind, string> = {
  shopping: 'Luxury shopping',
  sourcing: 'Limited-edition sourcing',
  dining: 'Restaurant reservation',
  nightlife: 'Nightlife reservation',
  tickets: 'Event tickets',
}

/** One readable summary line per answered field (goes into the CRM request message). */
export const FIELD_LABEL: Record<string, string> = {
  product: 'Experience', location: 'Location', brands: 'Brands or stores', productCategory: 'Product category', budget: 'Budget', date: 'Date', time: 'Time',
  duration: 'Duration', personalShopper: 'Personal shopper', itemsSought: 'Specific items', assistance: 'Assistance needed', preferences: 'Preferences', referenceLinks: 'Reference links',
  guests: 'Guests', productName: 'Product', brand: 'Brand', model: 'Model', edition: 'Edition', specifications: 'Specifications', colour: 'Colour', size: 'Size', quantity: 'Quantity',
  releaseDate: 'Release date', neededBy: 'Needed by', retailer: 'Preferred retailer / location', referenceUrl: 'Reference URL', brandNewOnly: 'Brand new only', alternativesOk: 'Alternatives acceptable',
  urgency: 'Urgency', termsAccepted: 'Sourcing terms accepted', restaurant: 'Restaurant', restaurants: 'Restaurants (trip)', partySize: 'Guests', occasion: 'Occasion', specialRequests: 'Special requests',
  recommendationWanted: 'Wants a recommendation', venue: 'Venue', seating: 'Table or entry', eventPreference: 'Event / DJ', transport: 'Transport', event: 'Event', ticketCategory: 'Ticket category',
  tickets: 'Tickets', notes: 'Notes', dinnerAndShow: 'Dinner and show',
}
