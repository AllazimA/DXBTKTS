'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { Compass, Briefcase, Sparkles, ArrowRight } from 'lucide-react'

const visuals = [
  { icon: Compass, href: '/experiences' },
  { icon: Briefcase, href: '/services' },
  { icon: Sparkles, href: '/membership' },
]

export function Clientele() {
  const t = useTranslations('clientele')
  const tiers = t.raw('tiers') as { title: string; desc: string; cta: string }[]
  const accent = (chunks: React.ReactNode) => <span className="italic">{chunks}</span>

  return (
    <section className="py-24 md:py-32 bg-dxb-navy relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:32px_32px]" />
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((tier, i) => {
            const visual = visuals[i]
            const Icon = visual.icon
            return (
              <motion.div
                key={tier.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: i * 0.12 }}
                viewport={{ once: true, margin: '-60px' }}
                className="group relative border border-white/10 bg-white/[0.03] backdrop-blur-sm p-10 transition-all duration-500 hover:border-dxb-gold/50 hover:bg-white/[0.06] hover:-translate-y-2"
              >
                <Icon className="w-8 h-8 text-dxb-gold mb-6" />
                <h3 className="font-cormorant text-3xl font-medium text-white mb-4">{tier.title}</h3>
                <p className="text-white/60 leading-relaxed font-light mb-8">{tier.desc}</p>
                <Link
                  href={visual.href}
                  className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.25em] uppercase text-dxb-gold"
                >
                  {tier.cta}
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
                </Link>
                <span className="absolute bottom-0 start-0 h-0.5 w-0 bg-dxb-gold transition-all duration-500 group-hover:w-full" />
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
