import { SceneImage } from '@/components/ui/scene-image'
import { aiImage } from '@/lib/images'
import { useTranslations } from 'next-intl'
import { BrandSymbol, MonoLabel } from '@/components/brand'

const scenes = [
  aiImage('gallery-icons', 'burjKhalifa', 'Dubai skyline from above at golden hour'),
  aiImage('gallery-water', 'yacht', 'Private yacht cruising through Dubai Marina'),
  aiImage('gallery-dunes', 'desert', 'Riders on a dune ridge at sunset'),
  aiImage('gallery-night', 'eveningEvent', 'Guests in a private lounge overlooking a concert'),
  aiImage('gallery-journey', 'arrival', 'Chauffeur waiting beside a Rolls-Royce'),
  aiImage('story-evening', 'fineDining', 'Dinner table above the Dubai skyline at night'),
]

/** An endless, slow film strip of Dubai — pauses on hover. */
export function Gallery() {
  const t = useTranslations('gallery')
  const tm = useTranslations('manifesto')
  const labels = t.raw('labels') as string[]
  const strip = [...scenes, ...scenes]
  return (
    <section className="bg-dxb-sand py-20 md:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 flex items-end justify-between gap-6 mb-10">
        <div>
          <MonoLabel parts={['08', t('eyebrow')]} className="text-dxb-cobalt" />
          <h2 className="mt-4 font-display text-4xl md:text-6xl text-dxb-navy tracking-[-0.035em]">{tm('marquee')}</h2>
        </div>
        <BrandSymbol className="hidden md:block h-14 text-dxb-navy" />
      </div>
      <div className="group relative" dir="ltr">
        <div className="flex w-max gap-4 md:gap-6 animate-[dxb-marquee_60s_linear_infinite] group-hover:[animation-play-state:paused]">
          {strip.map((img, i) => (
            <figure key={i} className={`relative shrink-0 overflow-hidden dxb-cut ${i % 2 ? 'w-[60vw] sm:w-[340px] aspect-[3/4]' : 'w-[78vw] sm:w-[460px] aspect-[4/3] self-end'}`}>
              <SceneImage image={img} sizes="460px" className="object-cover" />
              <figcaption className="absolute bottom-3 start-3 dxb-glass px-2.5 py-1 dxb-label text-[10.5px] text-white">{labels[i % labels.length]}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
