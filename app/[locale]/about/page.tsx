import type { Metadata } from 'next'
import Image from 'next/image'
import { Unveil } from '@/components/brand/unveil'
import Link from 'next/link'
import type { Locale } from '@/i18n.config'
import { pageMetadata } from '@/lib/metadata'
import { aiImage } from '@/lib/images'
import { about } from '@/content/about'
import { ChapterLabel } from '@/components/editorial/chapter-label'
import { BrandIcon, Tear } from '@/components/brand'
import { PageHero } from '@/components/brand/page-hero'

const STORY_IMAGE = aiImage('section-philosophy', 'burjAlArabAerial', 'A DXB TKTS lifestyle manager meeting a client in Dubai')

export async function generateMetadata({ params }: { params: { locale: Locale } }): Promise<Metadata> {
  return pageMetadata(params.locale, 'about', '/about')
}

export default function About({ params: { locale } }: { params: { locale: Locale } }) {
  return (
    <>
      {/* Opening */}
      <PageHero image={aiImage('section-philosophy', 'burjAlArabAerial', 'A DXB TKTS lifestyle manager meeting a guest in Dubai')} label={about.eyebrow[locale]} title={about.title[locale]} lede={about.lede[locale]} />

      {/* Story */}
      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-6 py-20 md:py-28 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-7">
            <ChapterLabel index="01" label={about.storyLabel[locale]} />
            <h2 className="mt-8 font-display text-4xl md:text-5xl text-dxb-navy leading-tight">{about.storyTitle[locale]}</h2>
            <div className="mt-8 space-y-6 text-lg leading-[1.8] text-dxb-ink/85">
              {about.story[locale].map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
          <div className="lg:col-span-5">
            <Unveil className="relative aspect-[4/5] overflow-hidden bg-dxb-navy dxb-cut dxb-cut-lg">
              <div className="absolute inset-0">
                <Image src={STORY_IMAGE.src ?? ''} alt={STORY_IMAGE.alt} fill sizes="(max-width: 1024px) 100vw, 40vw" className="object-cover" />
              </div>
            </Unveil>
          </div>
        </div>
      </section>

      {/* What we do */}
      <section className="bg-dxb-sand">
        <div className="max-w-6xl mx-auto px-6 py-20 md:py-24">
          <ChapterLabel index="02" label={about.pillarsLabel[locale]} />
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {about.pillars.map((p, i) => (
              <Link key={p.href} href={p.href} className="group dxb-lift flex">
                <div className="flex flex-col w-full bg-white dxb-cut p-7">
                  <span className="grid place-items-center w-12 h-12 bg-dxb-sand text-dxb-cobalt">
                    <BrandIcon name={(['ticket', 'concierge', 'membership'] as const)[i] ?? 'ticket'} className="w-6 h-6" />
                  </span>
                  <h3 className="mt-6 text-2xl md:text-[28px] font-extrabold tracking-[-0.02em] text-dxb-navy group-hover:text-dxb-cobalt transition-colors">{p.title[locale]}</h3>
                  <p className="mt-3 text-dxb-muted leading-relaxed flex-1">{p.copy[locale]}</p>
                  <span className="mt-6 grid place-items-center w-9 h-9 bg-dxb-orange text-dxb-ink transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5">
                    <BrandIcon name="arrow" className="w-4 h-4 rtl:rotate-180" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="bg-dxb-navy text-white">
        <div className="max-w-6xl mx-auto px-6 py-20 md:py-28">
          <ChapterLabel index="03" label={about.principlesLabel[locale]} tone="light" />
          <h2 className="mt-8 font-display text-4xl md:text-6xl max-w-3xl">{about.principlesTitle[locale]}</h2>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-14">
            {about.principles.map((p, i) => (
              <div key={i} className="border-t-2 border-white/25 pt-6">
                <span className="dxb-data text-2xl font-semibold text-dxb-orange" dir="ltr">{`0${i + 1}`}</span>
                <h3 className="mt-3 font-display text-3xl">{p.title[locale]}</h3>
                <p className="mt-3 text-white/70 leading-relaxed">{p.copy[locale]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder note — short, expertise only */}
      <section className="bg-white">
        <div className="max-w-5xl mx-auto px-6 py-20 md:py-24 grid grid-cols-1 md:grid-cols-[220px_1fr] gap-10 items-start">
          <div className="relative w-44 md:w-full aspect-[4/5] overflow-hidden bg-dxb-navy dxb-cut">
            <Image
              src="/images/founder/ahmed-allazim.jpg"
              alt={`${about.founderName}, ${about.founderRole[locale]} — DXB TKTS`}
              fill
              sizes="220px"
              className="object-cover object-top"
            />
          </div>
          <div>
            <ChapterLabel index="04" label={about.founderLabel[locale]} />
            <p className="mt-6 font-display text-2xl md:text-3xl leading-snug text-dxb-navy">{about.founderNote[locale]}</p>
            <p className="mt-6 dxb-label text-dxb-cobalt">
              {about.founderName} <Tear /> {about.founderRole[locale]}
            </p>
            <p className="mt-4 text-sm text-dxb-ink/80">{about.houses[locale]}</p>
            <p className="mt-1 text-xs text-dxb-slate">{about.housesNote[locale]}</p>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-dxb-sand">
        <div className="max-w-4xl mx-auto px-6 py-20 md:py-28 text-center">
          <ChapterLabel index="05" label={about.teamLabel[locale]} />
          <h2 className="mt-8 font-display text-4xl md:text-6xl text-dxb-navy">{about.teamTitle[locale]}</h2>
          <p className="mt-8 text-lg leading-relaxed text-dxb-slate">{about.teamCopy[locale]}</p>
          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/experiences" className="inline-flex items-center justify-center h-14 px-8 bg-dxb-orange text-dxb-ink font-bold dxb-cut hover:bg-dxb-orange-hover transition-colors">
              {about.ctaPrimary[locale]}
            </Link>
            <Link href="/request" className="inline-flex items-center justify-center h-14 px-8 border-2 border-dxb-navy text-dxb-navy font-bold hover:bg-dxb-navy hover:text-white transition-colors">
              {about.ctaSecondary[locale]}
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
