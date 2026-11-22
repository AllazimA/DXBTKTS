'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { Globe2, UserRound, Wand2, ShieldCheck } from 'lucide-react'

const icons = [Globe2, UserRound, Wand2, ShieldCheck]

export function WhyChoose() {
  const t = useTranslations('whyChoose')
  const pillars = t.raw('pillars') as { title: string; copy: string }[]
  const accent = (chunks: React.ReactNode) => (
    <span className="italic text-dxb-gold">{chunks}</span>
  )

  return (
    <section className="py-24 md:py-32 bg-dxb-ink relative overflow-hidden">
      <div className="absolute top-0 right-1/4 w-[36rem] h-[36rem] bg-dxb-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative">
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
          <h2 className="font-cormorant text-4xl md:text-5xl font-light text-white mt-6">
            {t.rich('title', { accent })}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((p, i) => {
            const Icon = icons[i]
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                viewport={{ once: true, margin: '-60px' }}
                className="group relative border border-white/10 bg-white/[0.03] p-9 transition-all duration-500 hover:border-dxb-gold/50 hover:bg-white/[0.06] hover:-translate-y-2"
              >
                <Icon className="w-8 h-8 text-dxb-gold mb-6" />
                <h3 className="font-cormorant text-2xl font-medium text-white mb-3">{p.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed font-light">{p.copy}</p>
                <span className="absolute bottom-0 start-0 h-0.5 w-0 bg-dxb-gold transition-all duration-500 group-hover:w-full" />
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
