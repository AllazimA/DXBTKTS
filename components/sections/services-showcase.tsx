'use client'

import { SceneImage } from '@/components/ui/scene-image'
import { aiImage } from '@/lib/images'
import { site } from '@/lib/site'
import Link from 'next/link'
import { Fragment, useEffect, useRef, useState } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { BackgroundFilm } from '@/components/ui/background-film'
import { BrandIcon, MonoLabel, Tear } from '@/components/brand'
import { CATEGORY_ICON, FAMILY, familyOf } from '@/lib/brand'
import type { Locale } from '@/i18n.config'

const visuals = [
  { image: aiImage('category-sky', 'burjAlArabAerial', 'Helicopter flying over Palm Jumeirah'), category: 'sky', film: site.films.skyHelicopter },
  { image: aiImage('category-on-the-water', 'yacht', 'Private yacht anchored off the Dubai coast'), category: 'on-the-water', film: site.heroVideo ?? undefined },
  { image: aiImage('category-lifestyle', 'fineDining', 'Dinner table on a terrace above Dubai Marina'), category: 'lifestyle', film: site.films.diningArrival },
  { image: aiImage('page-proposal', 'privateVilla', 'Proposal on a beachfront terrace at sunset'), category: 'signature', film: site.films.celebrationProposal },
  { image: aiImage('category-desert', 'desert', 'Riders on a dune ridge at sunset'), category: 'desert', film: site.films.desertDunes },
  { image: aiImage('category-transfers', 'arrival', 'Chauffeur opening the door of a luxury car'), category: 'transfers', film: site.films.transfersArrival },
]

/**
 * Six full-screen chapters that stack as you scroll: each panel is sticky,
 * so the next one slides over it like the next ticket in a book.
 */
export function ServicesShowcase() {
  const t = useTranslations('showcase')
  const locale = useLocale() as Locale
  const items = t.raw('items') as { title: string; desc: string }[]
  const accent = (chunks: React.ReactNode) => <span className="text-dxb-orange">{chunks}</span>

  // Scenes stack: once the next one has slid fully over, the one beneath is
  // hidden, so only scenes actually showing play their film.
  const panels = useRef<(HTMLDivElement | null)[]>([])
  const [showing, setShowing] = useState<boolean[]>(() => items.map(() => false))
  useEffect(() => {
    let raf = 0
    const update = () => {
      raf = 0
      const vh = window.innerHeight
      const tops = panels.current.map(el => (el ? el.getBoundingClientRect().top : Infinity))
      const next = tops.map((top, i) => top < vh && !(i + 1 < tops.length && tops[i + 1] <= 0))
      setShowing(prev => (prev.length === next.length && prev.every((v, i) => v === next[i]) ? prev : next))
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <section className="relative bg-dxb-ink text-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 pt-20 md:pt-28 pb-14 md:pb-20 grid md:grid-cols-12 gap-8 items-end">
        <div className="md:col-span-8">
          <MonoLabel parts={['02', t('eyebrow')]} className="text-dxb-orange" />
          <h2 className="mt-5 font-display text-5xl md:text-7xl lg:text-[88px] leading-[0.92] tracking-[-0.04em]">{t.rich('title', { accent })}</h2>
        </div>
        <p className="md:col-span-4 dxb-label text-[11px] text-white/50 md:text-end" dir="ltr">
          01 <Tear /> {String(items.length).padStart(2, '0')}
        </p>
      </div>

      {items.map((s, i) => {
        const v = visuals[i]
        const fam = FAMILY[familyOf(v.category)]
        return (
          <Fragment key={s.title}>
          {/* A transparent spacer lets each scene hold full-screen before the next slides over it. */}
          {i > 0 && <div aria-hidden className="h-[40svh]" />}
          <div ref={el => { panels.current[i] = el }} className="sticky top-0 h-[100svh] min-h-[560px] overflow-hidden" style={{ zIndex: i + 1 }}>
            <div className="absolute inset-0 bg-dxb-ink">
              <SceneImage image={v.image} sizes="100vw" className="object-cover" />
              {v.film && <BackgroundFilm {...v.film} playing={showing[i]} />}
            </div>
            <div className="absolute inset-0 dxb-vignette" />
            <div className="relative h-full max-w-7xl mx-auto px-5 sm:px-6 flex flex-col justify-end pb-14 md:pb-20">
              <div className="grid md:grid-cols-12 gap-6 items-end">
                <div className="md:col-span-8">
                  <span className="inline-flex items-center gap-2.5 dxb-glass h-9 px-3 dxb-label text-[11px]">
                    <span className={`h-2.5 w-2.5 ${fam.bg}`} aria-hidden="true" />
                    <BrandIcon name={CATEGORY_ICON[v.category] ?? fam.icon} className="w-4 h-4" />
                    {fam.label[locale]}
                  </span>
                  <h3 className="mt-5 font-display text-[52px] leading-[0.9] sm:text-7xl lg:text-[104px] tracking-[-0.045em]">{s.title}</h3>
                </div>
                <div className="md:col-span-4">
                  <p className="text-lg text-white/80 leading-relaxed font-light">{s.desc}</p>
                  <Link
                    href={`/experiences/${v.category}`}
                    className="group mt-6 inline-flex items-center gap-2 h-12 px-6 bg-white text-dxb-navy font-bold dxb-cut dxb-cut-sm transition-colors hover:bg-dxb-orange hover:text-dxb-ink"
                  >
                    {t('explore')}
                    <BrandIcon name="arrow" className="w-4 h-4 transition-transform group-hover:translate-x-1 rtl:rotate-180" />
                  </Link>
                </div>
              </div>
              <div className="mt-10 flex items-center gap-4 dxb-label text-[11px] text-white/55" dir="ltr">
                <span>{String(i + 1).padStart(2, '0')}</span>
                <span className="relative h-[2px] flex-1 bg-white/15">
                  <span className="absolute inset-y-0 start-0 bg-dxb-orange" style={{ width: `${((i + 1) / items.length) * 100}%` }} />
                </span>
                <span>{String(items.length).padStart(2, '0')}</span>
              </div>
            </div>
          </div>
          </Fragment>
        )
      })}
    </section>
  )
}
