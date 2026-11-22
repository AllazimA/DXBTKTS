'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'

import { aiImage } from '@/lib/images'

const IMG = aiImage('section-philosophy', 'burjAlArabAerial').src ?? ''

export function Philosophy() {
  const t = useTranslations('philosophy')
  const accent = (chunks: React.ReactNode) => (
    <span className="italic text-dxb-gold">{chunks}</span>
  )

  return (
    <section className="py-24 md:py-32 bg-dxb-ivory overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Image with gold frame offset */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true, margin: '-100px' }}
          className="relative"
        >
          <div className="absolute -top-4 -start-4 w-full h-full border border-dxb-gold/40" />
          <div className="relative aspect-[4/5] overflow-hidden">
            <Image
              src={IMG}
              alt={t('imageAlt')}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
          <div className="absolute -bottom-8 -end-4 md:-end-8 bg-dxb-navy text-white px-8 py-6 max-w-xs shadow-2xl">
            <p className="font-cormorant text-2xl font-light italic leading-snug">{t('quote')}</p>
          </div>
        </motion.div>

        {/* Copy */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.15 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <span className="text-xs font-semibold tracking-[0.35em] text-dxb-gold uppercase">
            {t('eyebrow')}
          </span>
          <h2 className="font-cormorant text-4xl md:text-5xl font-light text-dxb-ink mt-6 mb-8 leading-tight">
            {t.rich('title', { accent })}
          </h2>
          <div className="space-y-5 text-dxb-slate leading-relaxed text-lg font-light">
            <p>{t('p1')}</p>
            <p>{t('p2')}</p>
          </div>
          <Link
            href="/about"
            className="inline-flex items-center gap-3 mt-10 text-sm font-semibold tracking-[0.2em] uppercase text-dxb-ink group"
          >
            <span className="h-px w-10 bg-dxb-gold transition-all duration-300 group-hover:w-16" />
            {t('cta')}
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
