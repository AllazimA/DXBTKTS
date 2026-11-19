import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import type { Locale } from '@/i18n.config'
import { pageMetadata } from '@/lib/metadata'
import { aiImage } from '@/lib/images'
import { whatsOn as c } from '@/content/whats-on'
import { LAST_REVIEWED } from '@/data/events'
import { ChapterLabel } from '@/components/editorial/chapter-label'
import { EventCalendar } from '@/components/whats-on/event-calendar'

const HERO = aiImage('gallery-night', 'dubaiSkyline', 'Dubai skyline lit up at night')

export async function generateMetadata({ params }: { params: { locale: Locale } }): Promise<Metadata> {
  return pageMetadata(params.locale, 'whatsOn', '/tickets')
}

export default function WhatsOnPage({ params: { locale } }: { params: { locale: Locale } }) {
  const reviewed = new Intl.DateTimeFormat(locale === 'ar' ? 'ar-AE-u-nu-latn' : locale === 'fr' ? 'fr-FR' : 'en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${LAST_REVIEWED}T12:00:00Z`))

  return (
    <>
      <section className="relative min-h-[62vh] flex items-end bg-dxb-ink text-white overflow-hidden">
        <Image src={HERO.src ?? ''} alt={HERO.alt} fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-dxb-ink via-dxb-ink/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-dxb-ink via-dxb-ink/70 to-transparent rtl:bg-gradient-to-l" />
        <div className="relative w-full max-w-6xl mx-auto px-6 pt-32 pb-14 md:pb-20">
          <ChapterLabel label={c.eyebrow[locale]} tone="light" />
          <h1 className="mt-8 font-cormorant font-light text-[2.6rem] leading-[1.05] md:text-7xl whitespace-pre-line">{c.title[locale]}</h1>
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-white/80 font-light">{c.lede[locale]}</p>
        </div>
      </section>

      <EventCalendar locale={locale} initialToday={new Date().toISOString().slice(0, 10)} />

      <section className="bg-dxb-band">
        <div className="max-w-6xl mx-auto px-6 py-16 md:py-20 grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-7">
            <h2 className="font-cormorant text-4xl md:text-5xl font-light text-dxb-ink">{c.planTitle[locale]}</h2>
            <p className="mt-4 text-dxb-slate text-lg leading-relaxed">{c.planCopy[locale]}</p>
            <Link href="/request" className="mt-8 inline-block px-8 py-4 bg-dxb-clay text-white text-sm font-semibold tracking-[0.12em] uppercase hover:bg-dxb-clay-hover transition-colors">
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
