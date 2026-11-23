import type { Metadata } from 'next'
import Link from 'next/link'
import type { Locale } from '@/i18n.config'
import { pageMetadata } from '@/lib/metadata'
import { aiImage } from '@/lib/images'
import { whatsOn as c } from '@/content/whats-on'
import { LAST_REVIEWED } from '@/data/events'
import { EventCalendar } from '@/components/whats-on/event-calendar'
import { ShowsSection } from '@/components/curated/shows-section'
import { getEvents } from '@/lib/curated'
import { site } from '@/lib/site'
import { PageHero } from '@/components/brand/page-hero'

// Dubai Opera events are published from the DXB CRM at any time: read them on every request.
export const dynamic = 'force-dynamic'


export async function generateMetadata({ params }: { params: { locale: Locale } }): Promise<Metadata> {
  return pageMetadata(params.locale, 'whatsOn', '/tickets')
}

export default async function WhatsOnPage({ params: { locale } }: { params: { locale: Locale } }) {
  const events = await getEvents(locale)
  const reviewed = new Intl.DateTimeFormat(locale === 'ar' ? 'ar-AE-u-nu-latn' : locale === 'fr' ? 'fr-FR' : 'en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${LAST_REVIEWED}T12:00:00Z`))

  return (
    <>
      <PageHero image={{ src: site.films.ticketsGrandPrix.poster, alt: 'A night race at Yas Marina, Abu Dhabi' }} film={site.films.ticketsGrandPrix} family="events" locale={locale} label={c.eyebrow[locale]} title={c.title[locale]} lede={c.lede[locale]} />

      <EventCalendar locale={locale} initialToday={new Date().toISOString().slice(0, 10)} />

      <ShowsSection locale={locale} events={events} />

      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-6 py-16 md:py-20 grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-7">
            <h2 className="font-display text-4xl md:text-5xl text-dxb-navy">{c.planTitle[locale]}</h2>
            <p className="mt-4 text-dxb-slate text-lg leading-relaxed">{c.planCopy[locale]}</p>
            <Link href="/request" className="mt-8 inline-block px-8 py-4 bg-dxb-orange dxb-cut dxb-cut-sm text-dxb-ink text-sm font-bold hover:bg-dxb-orange-hover transition-colors">
              {c.planCta[locale]}
            </Link>
          </div>
          <div className="lg:col-span-5 text-sm text-dxb-slate leading-relaxed border-t lg:border-t-0 lg:border-s border-dxb-ink/15 pt-6 lg:pt-0 lg:ps-8">
            <p>{c.disclaimer[locale]}</p>
            <p className="mt-3 text-xs">
              {c.reviewed[locale]}: {reviewed}
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
