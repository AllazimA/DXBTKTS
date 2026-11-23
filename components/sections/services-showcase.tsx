'use client'

import { SceneImage } from '@/components/ui/scene-image'
import { aiImage } from '@/lib/images'
import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import { BrandIcon } from '@/components/brand'
import { SectionHeading } from '@/components/brand/section-heading'
import { Reveal } from '@/components/brand/reveal'
import { CATEGORY_ICON, FAMILY, familyOf } from '@/lib/brand'
import type { Locale } from '@/i18n.config'

const visuals = [
  { image: aiImage('category-sky', 'burjAlArabAerial', 'Helicopter flying over Palm Jumeirah'), category: 'sky' },
  { image: aiImage('category-on-the-water', 'yacht', 'Private yacht anchored off the Dubai coast'), category: 'on-the-water' },
  { image: aiImage('category-lifestyle', 'fineDining', 'Dinner table on a terrace above Dubai Marina'), category: 'lifestyle' },
  { image: aiImage('page-proposal', 'privateVilla', 'Proposal on a beachfront terrace at sunset'), category: 'signature' },
  { image: aiImage('category-desert', 'desert', 'Riders on a dune ridge at sunset'), category: 'desert' },
  { image: aiImage('category-transfers', 'arrival', 'Chauffeur opening the door of a luxury car'), category: 'transfers' },
]

export function ServicesShowcase() {
  const t = useTranslations('showcase')
  const locale = useLocale() as Locale
  const items = t.raw('items') as { title: string; desc: string }[]
  const accent = (chunks: React.ReactNode) => <span className="text-dxb-cobalt">{chunks}</span>

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-6">
        <SectionHeading index="02" label={t('eyebrow')} title={t.rich('title', { accent })} className="mb-12" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
          {items.map((s, i) => {
            const visual = visuals[i]
            const fam = FAMILY[familyOf(visual.category)]
            return (
              <Reveal key={s.title} delay={(i % 3) * 0.08}>
                <Link href={`/experiences/${visual.category}`} className="group flex h-full flex-col dxb-cut dxb-cut-lg">
                  <div className="relative aspect-[4/3] overflow-hidden bg-dxb-navy">
                    <SceneImage image={visual.image} sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
                  </div>
                  <div className={`flex flex-1 flex-col p-5 md:p-6 ${fam.bg} ${fam.text}`}>
                    <span className="flex items-center justify-between gap-3">
                      <span className="inline-flex items-center gap-2 dxb-label text-[11px] opacity-85">
                        <BrandIcon name={CATEGORY_ICON[visual.category] ?? fam.icon} className="w-4 h-4" />
                        {fam.label[locale]}
                      </span>
                      <span className="dxb-label text-[11px] opacity-60" dir="ltr">{String(i + 1).padStart(2, '0')}</span>
                    </span>
                    <h3 className="mt-4 text-2xl md:text-[26px] font-extrabold tracking-[-0.02em] leading-tight">{s.title}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed opacity-85">{s.desc}</p>
                    <span className="mt-auto pt-5 inline-flex items-center gap-2 text-[15px] font-bold">
                      {t('explore')}
                      <BrandIcon name="arrow" className="w-4 h-4 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
