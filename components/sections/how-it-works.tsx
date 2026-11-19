'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'

export function HowItWorks() {
  const t = useTranslations('howItWorks')
  const steps = t.raw('steps') as { title: string; copy: string }[]
  const accent = (chunks: React.ReactNode) => (
    <span className="italic text-dxb-gold">{chunks}</span>
  )

  return (
    <section className="py-24 md:py-32 bg-dxb-ivory">
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

        <ol className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <motion.li
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: i * 0.12 }}
              viewport={{ once: true, margin: '-60px' }}
              className="relative bg-white border border-dxb-band p-10"
            >
              <span className="font-cormorant text-6xl font-light text-dxb-gold/60 leading-none" dir="ltr">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="font-cormorant text-3xl font-medium text-dxb-ink mt-4 mb-3">{step.title}</h3>
              <p className="text-dxb-slate leading-relaxed">{step.copy}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}
