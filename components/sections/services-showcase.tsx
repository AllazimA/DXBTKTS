'use client'

import { SceneImage } from '@/components/ui/scene-image'
import { aiImage } from '@/lib/images'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { Plane, Anchor, UtensilsCrossed, PartyPopper, Sun, Car, ArrowRight } from 'lucide-react'

const visuals = [
  { icon: Plane, image: aiImage('category-sky', 'burjAlArabAerial', 'Helicopter flying over Palm Jumeirah'), category: 'sky' },
  { icon: Anchor, image: aiImage('category-on-the-water', 'yacht', 'Private yacht anchored off the Dubai coast'), category: 'on-the-water' },
  { icon: UtensilsCrossed, image: aiImage('category-lifestyle', 'fineDining', 'Dinner table on a terrace above Dubai Marina'), category: 'lifestyle' },
  { icon: PartyPopper, image: aiImage('page-proposal', 'privateVilla', 'Proposal on a beachfront terrace at sunset'), category: 'signature' },
  { icon: Sun, image: aiImage('category-desert', 'desert', 'Riders on a dune ridge at sunset'), category: 'desert' },
  { icon: Car, image: aiImage('category-transfers', 'arrival', 'Chauffeur opening the door of a luxury car'), category: 'transfers' },
]

export function ServicesShowcase() {
  const t = useTranslations('showcase')
  const items = t.raw('items') as { title: string; desc: string }[]
  const accent = (chunks: React.ReactNode) => <span className="italic">{chunks}</span>

  return (
    <section className="py-24 md:py-32 bg-dxb-band">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-xs font-semibold tracking-[0.35em] text-dxb-gold uppercase">
            {t('eyebrow')}
          </span>
          <h2 className="font-cormorant text-4xl md:text-5xl font-light text-dxb-ink mt-6">
            {t.rich('title', { accent })}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((s, i) => {
            const visual = visuals[i]
            const Icon = visual.icon
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: (i % 3) * 0.12 }}
                viewport={{ once: true, margin: '-60px' }}
              >
                <Link href={visual.category ? `/experiences/${visual.category}` : '/request'} className="group block relative aspect-[4/5] overflow-hidden bg-dxb-ink">
                  <SceneImage image={visual.image} sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-700 ease-out group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-dxb-ink via-dxb-ink/20 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-95" />
                  <div className="absolute inset-x-0 bottom-0 p-8">
                    <Icon className="w-7 h-7 text-dxb-gold mb-4" />
                    <h3 className="font-cormorant text-3xl font-medium text-white mb-2">
                      {s.title}
                    </h3>
                    <p className="text-white/70 text-sm leading-relaxed max-h-0 opacity-0 overflow-hidden transition-all duration-500 group-hover:max-h-24 group-hover:opacity-100">
                      {s.desc}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-2 text-xs font-semibold tracking-[0.25em] uppercase text-dxb-gold opacity-0 translate-y-2 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                      {t('explore')} <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                    </span>
                  </div>
                  <span className="absolute top-0 start-0 h-0.5 w-0 bg-dxb-gold transition-all duration-500 group-hover:w-full" />
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
