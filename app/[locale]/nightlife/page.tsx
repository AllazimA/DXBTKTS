import type { Metadata } from 'next'
import type { Locale } from '@/i18n.config'
import { pageMetadata } from '@/lib/metadata'
import { aiImage } from '@/lib/images'
import { getNightlife } from '@/lib/curated'
import { nightlifePage as c } from '@/content/curated-pages'
import { CuratedHero, FormSection } from '@/components/curated/page-parts'
import { VenueList } from '@/components/curated/venue-list'
import { ServiceRequestForm } from '@/components/forms/service-request-form'

// The list is published from the DXB CRM at any time: read it on every request.
export const dynamic = 'force-dynamic'

const HERO = aiImage('gallery-night', 'dubaiSkyline', 'Guests in a private lounge above a live show, Dubai skyline behind')
const FORM_ID = 'night-request'

export async function generateMetadata({ params }: { params: { locale: Locale } }): Promise<Metadata> {
  return pageMetadata(params.locale, 'nightlife', '/nightlife')
}

export default async function NightlifePage({ params: { locale } }: { params: { locale: Locale } }) {
  const venues = await getNightlife(locale)
  return (
    <>
      <CuratedHero image={HERO} eyebrow={c.eyebrow[locale]} title={c.title[locale]} lede={c.lede[locale]} cta={c.request[locale]} ctaHref={`#${FORM_ID}`} />

      <section className="bg-dxb-ivory">
        <div className="max-w-6xl mx-auto px-6 py-20 md:py-28">
          <VenueList
            venues={venues.map(v => ({
              slug: v.slug,
              name: v.name,
              basis: v.basis,
              why: v.why,
              website: v.website,
              canRequest: v.canRequest,
              facts: [
                { label: c.kindOfNight[locale], value: v.kindOfNight },
                { label: c.area[locale], value: v.area },
                { label: c.bestFor[locale], value: v.bestFor },
              ],
            }))}
            formId={FORM_ID}
            field="venue"
            requestLabel={c.request[locale]}
            websiteLabel={c.website[locale]}
            empty={c.empty[locale]}
          />
        </div>
      </section>

      <FormSection id={FORM_ID} title={c.formTitle[locale]} copy={c.formCopy[locale]} note={c.honesty[locale]} whatsapp="WhatsApp">
        <ServiceRequestForm
          id={FORM_ID}
          kind="nightlife"
          suggestOn="venue"
          options={{ venue: venues.filter(x => x.canRequest).map(v => ({ value: v.name, label: { en: v.name, fr: v.name, ar: v.name } })) }}
        />
      </FormSection>
    </>
  )
}
