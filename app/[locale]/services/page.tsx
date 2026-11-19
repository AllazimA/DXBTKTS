import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, MapPin, Clock } from 'lucide-react'
import type { Locale } from '@/i18n.config'
import { pageMetadata } from '@/lib/metadata'
import { aiImage, type SceneImage } from '@/lib/images'
import { servicesPage as c, servicesDubai, servicesExtra as x } from '@/content/services'
import { ChapterLabel } from '@/components/editorial/chapter-label'
import { SceneImage as Picture } from '@/components/ui/scene-image'
import { site, whatsappLink } from '@/lib/site'
import { BackgroundFilm } from '@/components/ui/background-film'

const HERO = aiImage('page-services', 'fineDining', 'A DXB TKTS concierge meeting a client in Dubai')

/** Photo for each service (owner's AI imagery; falls back to registry images). */
const SERVICE_IMAGES: Record<string, SceneImage> = {
  'private-concierge': aiImage('section-philosophy', 'burjAlArabAerial', 'A lifestyle manager planning a stay with a client'),
  itineraries: aiImage('category-day-trips', 'grandMosque', 'A guide walking guests through old Dubai beside the Creek'),
  arrivals: aiImage('product-airport-transfer', 'arrival', 'Chauffeur waiting beside a luxury car for an arriving guest'),
  transport: aiImage('product-rolls-royce-chauffeur', 'dubaiSkyline', 'Chauffeur beside a Rolls-Royce at a Dubai hotel'),
  dining: aiImage('story-evening', 'fineDining', 'Dinner table overlooking the Dubai skyline at night'),
  occasions: aiImage('page-proposal', 'privateVilla', 'A proposal on a beachfront terrace at sunset'),
  shopping: aiImage('page-shopping', 'privateVilla', 'A personal shopper presenting pieces to a client'),
  access: aiImage('product-vip-event-hospitality', 'eveningEvent', 'Guests in a private hospitality suite above a racing circuit'),
  lifestyle: aiImage('product-private-chef-villa', 'privateVilla', 'A private chef preparing dinner at a family villa'),
}

export async function generateMetadata({ params }: { params: { locale: Locale } }): Promise<Metadata> {
  return pageMetadata(params.locale, 'services', '/services')
}

export default function Services({ params: { locale } }: { params: { locale: Locale } }) {
  return (
    <>
      {/* Opening — copy over a full-bleed photograph */}
      <section className="relative min-h-[78vh] flex items-end bg-dxb-ink text-white overflow-hidden">
        <Image src={HERO.src ?? ''} alt={HERO.alt} fill priority sizes="100vw" className="object-cover" />
        <BackgroundFilm {...site.films.diningTerrace} />
        <div className="absolute inset-0 bg-gradient-to-t from-dxb-ink via-dxb-ink/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-dxb-ink via-dxb-ink/75 to-transparent rtl:bg-gradient-to-l" />
        <div className="relative w-full max-w-6xl mx-auto px-6 pt-32 pb-16 md:pb-24">
          <ChapterLabel label={c.eyebrow[locale]} tone="light" />
          <h1 className="mt-8 font-cormorant font-light text-[2.75rem] leading-[1.05] md:text-7xl whitespace-pre-line">{c.title[locale]}</h1>
          <p className="mt-8 max-w-3xl text-lg md:text-xl leading-relaxed text-white/80 font-light">{c.lede[locale]}</p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Link href="/request" className="px-8 py-4 bg-dxb-clay text-white text-sm font-semibold tracking-[0.12em] uppercase text-center hover:bg-dxb-clay-hover transition-colors">
              {c.cta[locale]}
            </Link>
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="px-8 py-4 border border-white/40 text-white text-sm font-semibold tracking-[0.12em] uppercase text-center hover:border-dxb-gold hover:text-dxb-gold transition-colors">
              WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Quick index */}
      <nav aria-label={c.eyebrow[locale]} className="bg-dxb-ivory border-b border-dxb-band">
        <div className="max-w-6xl mx-auto px-6 flex gap-6 overflow-x-auto scrollbar-none py-4 text-sm">
          {c.services.map((s, i) => (
            <a key={s.id} href={`#${s.id}`} className="shrink-0 text-dxb-slate hover:text-dxb-gold transition-colors">
              <span className="text-dxb-gold me-1.5" dir="ltr">{String(i + 1).padStart(2, '0')}</span>
              {s.title[locale]}
            </a>
          ))}
        </div>
      </nav>

      {/* Services — alternating editorial rows */}
      <section className="bg-dxb-ivory">
        <div className="max-w-6xl mx-auto px-6 py-16 md:py-24 space-y-20 md:space-y-28">
          {c.services.map((s, i) => {
            const flip = i % 2 === 1
            return (
              <article key={s.id} id={s.id} className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-14 items-center scroll-mt-32">
                <div className={`md:col-span-6 ${flip ? 'md:order-2' : ''}`}>
                  <div className="relative aspect-[4/3] overflow-hidden bg-dxb-band">
                    <Picture image={SERVICE_IMAGES[s.id]} sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition-transform duration-700 hover:scale-[1.03]" />
                  </div>
                </div>
                <div className={`md:col-span-6 ${flip ? 'md:order-1' : ''}`}>
                  <span className="font-cormorant text-2xl text-dxb-gold" dir="ltr">{String(i + 1).padStart(2, '0')}</span>
                  <h2 className="mt-2 font-cormorant text-4xl md:text-5xl font-light text-dxb-ink leading-tight">{s.title[locale]}</h2>
                  <p className="mt-5 text-lg leading-relaxed text-dxb-ink/85">{s.line[locale]}</p>

                  {servicesDubai[s.id] && (
                    <p className="mt-5 border-s-2 border-dxb-gold ps-4 text-dxb-slate leading-relaxed">
                      <span className="block text-[11px] font-semibold uppercase tracking-[0.25em] text-dxb-gold mb-1">{x.inDubai[locale]}</span>
                      {servicesDubai[s.id][locale]}
                    </p>
                  )}

                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-[7.5rem_1fr] gap-x-6 gap-y-2 text-sm">
                    <span className="uppercase tracking-[0.2em] text-[11px] font-semibold text-dxb-slate pt-0.5">{c.arrangesLabel[locale]}</span>
                    <ul className="space-y-1.5 text-dxb-slate">
                      {s.arranges[locale].map(a => (
                        <li key={a} className="flex gap-2"><span className="text-dxb-gold">—</span>{a}</li>
                      ))}
                    </ul>
                    <span className="uppercase tracking-[0.2em] text-[11px] font-semibold text-dxb-slate pt-4 sm:pt-0.5">{c.chargedLabel[locale]}</span>
                    <span className="text-dxb-ink">{s.charged[locale]}</span>
                  </div>
                  <div className="mt-7 flex flex-wrap gap-5">
                    <Link href="/request" className="inline-flex items-center gap-2 text-sm font-semibold text-dxb-clay">
                      {c.cta[locale]} <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                    </Link>
                    {s.link && (
                      <Link href={s.link.href} className="inline-flex items-center gap-2 text-sm font-semibold text-dxb-gold">
                        {s.link.label[locale]} <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                      </Link>
                    )}
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </section>

      {/* How we are paid */}
      <section className="bg-dxb-ink text-white">
        <div className="max-w-6xl mx-auto px-6 py-20 md:py-28">
          <ChapterLabel label={x.paidLabel[locale]} tone="light" />
          <h2 className="mt-8 font-cormorant font-light text-4xl md:text-6xl">{x.paidTitle[locale]}</h2>
          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-10">
            {x.paid.map((p, i) => (
              <div key={p.title.en} className="border-t border-white/15 pt-6">
                <span className="font-cormorant text-2xl text-dxb-gold" dir="ltr">{`0${i + 1}`}</span>
                <h3 className="mt-2 font-cormorant text-3xl">{p.title[locale]}</h3>
                <p className="mt-3 text-white/70 leading-relaxed">{p.copy[locale]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Where we work + hours + groups */}
      <section className="bg-dxb-band">
        <div className="max-w-6xl mx-auto px-6 py-20 md:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7">
            <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-dxb-slate">
              <MapPin className="w-4 h-4 text-dxb-gold" /> {x.areasLabel[locale]}
            </p>
            <ul className="mt-6 flex flex-wrap gap-3">
              {x.areas[locale].map(a => (
                <li key={a} className="px-4 py-2 bg-dxb-ivory border border-dxb-ink/10 text-sm text-dxb-ink">{a}</li>
              ))}
            </ul>
            <p className="mt-10 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-dxb-slate">
              <Clock className="w-4 h-4 text-dxb-gold" /> {x.hoursLabel[locale]}
            </p>
            <p className="mt-3 text-dxb-ink/85">{x.hours[locale]}</p>
          </div>
          <div className="lg:col-span-5 bg-white border border-dxb-band p-8">
            <h2 className="font-cormorant text-3xl text-dxb-ink">{c.groupsTitle[locale]}</h2>
            <p className="mt-2 text-dxb-slate">{c.groupsCopy[locale]}</p>
            <Link href="/corporate" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-dxb-gold">
              {c.groupsCta[locale]} <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-dxb-ivory">
        <div className="max-w-6xl mx-auto px-6 py-20 md:py-24">
          <ChapterLabel label={c.howTitle[locale]} />
          <ol className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-10">
            {c.how.map((h, i) => (
              <li key={i} className="border-t border-dxb-ink/15 pt-6">
                <span className="font-cormorant text-2xl text-dxb-gold" dir="ltr">{`0${i + 1}`}</span>
                <h3 className="mt-2 font-cormorant text-3xl text-dxb-ink">{h.title[locale]}</h3>
                <p className="mt-3 text-dxb-slate leading-relaxed">{h.copy[locale]}</p>
              </li>
            ))}
          </ol>
          <Link href="/request" className="mt-14 inline-block px-8 py-4 bg-dxb-clay text-white text-sm font-semibold tracking-[0.12em] uppercase hover:bg-dxb-clay-hover transition-colors">
            {c.cta[locale]}
          </Link>
        </div>
      </section>
    </>
  )
}
