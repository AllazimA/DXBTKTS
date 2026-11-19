import type { Metadata } from 'next'
import type { Locale } from '@/i18n.config'
import { pageMetadata } from '@/lib/metadata'
import { aiImage } from '@/lib/images'
import { getRestaurants } from '@/lib/curated'
import { diningPage as c } from '@/content/curated-pages'
import { CuratedHero, FormSection } from '@/components/curated/page-parts'
import { VenueList } from '@/components/curated/venue-list'
import { ServiceRequestForm } from '@/components/forms/service-request-form'

// The list is published from the DXB CRM at any time: read it on every request.
export const dynamic = 'force-dynamic'

const HERO = aiImage('story-evening', 'fineDining', 'A dinner table on a terrace overlooking the Dubai skyline at night')
const FORM_ID = 'table-request'

export async function generateMetadata({ params }: { params: { locale: Locale } }): Promise<Metadata> {
  return pageMetadata(params.locale, 'dining', '/dining')
}

export default async function DiningPage({ params: { locale } }: { params: { locale: Locale } }) {
  const restaurants = await getRestaurants(locale)
  return (
    <>
      <CuratedHero image={HERO} eyebrow={c.eyebrow[locale]} title={c.title[locale]} lede={c.lede[locale]} cta={c.request[locale]} ctaHref={`#${FORM_ID}`} />

      <section className="bg-dxb-ivory">
        <div className="max-w-6xl mx-auto px-6 py-20 md:py-28">
          <VenueList
            venues={restaurants.map(r => ({
              slug: r.slug,
              name: r.name,
              basis: r.basis,
              why: r.why,
              website: r.website,
              canRequest: r.canRequest,
              facts: [
                { label: c.cuisine[locale], value: r.cuisine },
                { label: c.area[locale], value: r.area },
                { label: c.bestFor[locale], value: r.bestFor },
              ],
            }))}
            formId={FORM_ID}
            field="restaurant"
            requestLabel={c.request[locale]}
            websiteLabel={c.website[locale]}
            empty={c.empty[locale]}
          />
        </div>
      </section>

      <FormSection id={FORM_ID} title={c.formTitle[locale]} copy={c.formCopy[locale]} note={c.honesty[locale]} whatsapp="WhatsApp">
        <ServiceRequestForm
          id={FORM_ID}
          kind="dining"
          suggestOn="restaurant"
          options={{ restaurant: restaurants.filter(x => x.canRequest).map(r => ({ value: r.name, label: { en: r.name, fr: r.name, ar: r.name } })) }}
        />
      </FormSection>
    </>
  )
}
