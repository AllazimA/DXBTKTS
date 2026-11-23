'use client'

import { SceneImage } from '@/components/ui/scene-image'
import { aiImage } from '@/lib/images'
import { useTranslations } from 'next-intl'
import { MonoLabel, Tear } from '@/components/brand'
import { SectionHeading } from '@/components/brand/section-heading'
import { Reveal } from '@/components/brand/reveal'

const scenes = [
  { image: aiImage('gallery-icons', 'burjKhalifa', 'Dubai skyline from above at golden hour'), span: 'md:col-span-2 md:row-span-2', chip: 'bg-dxb-navy text-white' },
  { image: aiImage('gallery-water', 'yacht', 'Private yacht cruising through Dubai Marina'), span: '', chip: 'bg-dxb-cobalt text-white' },
  { image: aiImage('gallery-dunes', 'desert', 'Riders on a dune ridge at sunset'), span: '', chip: 'bg-dxb-orange text-dxb-ink' },
  { image: aiImage('gallery-night', 'eveningEvent', 'Guests in a private lounge overlooking a concert'), span: '', chip: 'bg-dxb-red text-white' },
  { image: aiImage('gallery-journey', 'arrival', 'Chauffeur waiting beside a Rolls-Royce'), span: '', chip: 'bg-dxb-ink text-dxb-orange' },
]

export function Gallery() {
  const t = useTranslations('gallery')
  const labels = t.raw('labels') as string[]
  const accent = (chunks: React.ReactNode) => <span className="text-dxb-cobalt">{chunks}</span>

  return (
    <section className="py-20 md:py-28 bg-dxb-sand">
      <div className="max-w-7xl mx-auto px-5 sm:px-6">
        <SectionHeading index="07" label={t('eyebrow')} title={t.rich('title', { accent })} action={{ href: '/request', label: t('cta') }} className="mb-12" />
        <div className="grid grid-cols-2 md:grid-cols-4 md:grid-rows-2 gap-3 md:gap-4 md:h-[42rem]">
          {scenes.map((scene, i) => (
            <Reveal
              key={scene.image.alt}
              delay={i * 0.06}
              className={`group relative overflow-hidden dxb-cut ${i === 0 ? 'col-span-2 aspect-[4/3] md:aspect-auto' : 'aspect-square md:aspect-auto'} ${scene.span}`}
            >
              <SceneImage image={scene.image} sizes="(max-width: 768px) 50vw, 25vw" className="object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
              <MonoLabel className={`absolute bottom-3 start-3 px-2.5 py-1.5 text-[11px] font-semibold ${scene.chip}`}>
                <span dir="ltr" className="opacity-70">{String(i + 1).padStart(2, '0')}</span>
                <Tear className="opacity-50" />
                {labels[i]}
              </MonoLabel>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
