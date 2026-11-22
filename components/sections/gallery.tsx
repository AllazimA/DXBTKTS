'use client'

import { SceneImage } from '@/components/ui/scene-image'
import { aiImage } from '@/lib/images'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'

const scenes = [
  { image: aiImage('gallery-icons', 'burjKhalifa', 'Dubai skyline from above at golden hour'), span: 'md:col-span-2 md:row-span-2' },
  { image: aiImage('gallery-water', 'yacht', 'Private yacht cruising through Dubai Marina'), span: '' },
  { image: aiImage('gallery-dunes', 'desert', 'Riders on a dune ridge at sunset'), span: '' },
  { image: aiImage('gallery-night', 'eveningEvent', 'Guests in a private lounge overlooking a concert'), span: '' },
  { image: aiImage('gallery-journey', 'arrival', 'Chauffeur waiting beside a Rolls-Royce'), span: '' },
]

export function Gallery() {
  const t = useTranslations('gallery')
  const labels = t.raw('labels') as string[]
  const accent = (chunks: React.ReactNode) => (
    <span className="italic text-dxb-gold">{chunks}</span>
  )

  return (
    <section className="py-24 md:py-32 bg-dxb-ink relative overflow-hidden">
      <div className="absolute bottom-0 right-1/4 w-[36rem] h-[36rem] bg-dxb-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14"
        >
          <div>
            <span className="text-xs font-semibold tracking-[0.35em] text-dxb-gold uppercase">
              {t('eyebrow')}
            </span>
            <h2 className="font-cormorant text-4xl md:text-5xl font-light text-white mt-6">
              {t.rich('title', { accent })}
            </h2>
          </div>
          <Link
            href="/request"
            className="inline-flex items-center gap-3 text-sm font-semibold tracking-[0.2em] uppercase text-dxb-gold group shrink-0"
          >
            <span className="h-px w-10 bg-dxb-gold transition-all duration-300 group-hover:w-16" />
            {t('cta')}
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 md:h-[44rem]">
          {scenes.map((scene, i) => (
            <motion.div
              key={scene.image.alt}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              viewport={{ once: true, margin: '-60px' }}
              className={`group relative overflow-hidden aspect-[4/3] md:aspect-auto ${scene.span}`}
            >
              <SceneImage image={scene.image} sizes="(max-width: 768px) 100vw, 25vw" className="object-cover transition-transform duration-700 ease-out group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-dxb-ink/80 via-transparent to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-90" />
              <div className="absolute bottom-0 inset-x-0 p-6 translate-y-2 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                <span className="text-xs font-semibold tracking-[0.3em] uppercase text-dxb-gold">
                  {labels[i]}
                </span>
              </div>
              <span className="absolute inset-0 ring-1 ring-inset ring-white/10" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
