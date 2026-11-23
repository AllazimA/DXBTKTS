'use client'

import { useRef } from 'react'
import { useTranslations } from 'next-intl'
import { getProduct } from '@/data/catalogue'
import { PosterCard } from '@/components/catalogue/poster-card'
import { SectionHeading } from '@/components/brand/section-heading'
import { BrandIcon } from '@/components/brand'

const FEATURED = [
  'desert-safari-in-style',
  'private-dune-dinner',
  'superyacht-charter',
  'private-helicopter-charter',
  'private-yacht-charter',
  'hot-air-balloon',
  'private-dubai-city-tour',
  'sunset-celebration-yacht',
]

/** The signature collection as a horizontal, snap-scrolling gallery of poster cards. */
export function PopularExperiences() {
  const t = useTranslations('home')
  const tm = useTranslations('manifesto')
  const accent = (chunks: React.ReactNode) => <span className="text-dxb-cobalt">{chunks}</span>
  const list = FEATURED.map(getProduct).filter((p): p is NonNullable<typeof p> => Boolean(p))
  const track = useRef<HTMLDivElement>(null)
  const nudge = (dir: 1 | -1) => {
    const el = track.current
    if (!el) return
    const rtl = getComputedStyle(el).direction === 'rtl'
    el.scrollBy({ left: dir * (rtl ? -1 : 1) * el.clientWidth * 0.8, behavior: 'smooth' })
  }

  return (
    <section className="bg-dxb-sand pb-20 md:pb-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-6">
        <SectionHeading index="01" label={t('popularEyebrow')} title={t.rich('popularTitle', { accent })} action={{ href: '/experiences', label: t('popularCta') }} />
        <div className="mt-8 flex items-center justify-between">
          <span className="dxb-label text-[11px] text-dxb-muted">{tm('carouselHint')}</span>
          <div className="flex gap-2">
            {([-1, 1] as const).map(d => (
              <button
                key={d}
                type="button"
                onClick={() => nudge(d)}
                aria-label={d === 1 ? 'Next' : 'Previous'}
                className="grid place-items-center w-12 h-12 border-2 border-dxb-navy text-dxb-navy transition-colors hover:bg-dxb-navy hover:text-white"
              >
                <BrandIcon name="arrow" className={`w-5 h-5 ${d === -1 ? 'rotate-180 rtl:rotate-0' : 'rtl:rotate-180'}`} />
              </button>
            ))}
          </div>
        </div>
      </div>
      <div
        ref={track}
        className="mt-6 flex gap-5 md:gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-none px-5 sm:px-6 xl:px-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))] pb-4"
      >
        {list.map((p, i) => (
          <div key={p.slug} className="snap-start shrink-0 w-[82vw] sm:w-[44vw] lg:w-[30vw] xl:w-[380px]">
            <PosterCard product={p} index={i} />
          </div>
        ))}
      </div>
    </section>
  )
}
