'use client'

import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { motion } from 'framer-motion'

export function Hero() {
  const t = useTranslations('hero')

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-dxb-ivory to-dxb-band overflow-hidden pt-20">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-10 w-72 h-72 bg-dxb-gold/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 left-1/4 w-96 h-96 bg-dxb-navy/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Eyebrow label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <span className="text-xs font-semibold tracking-widest text-dxb-gold uppercase">
            Luxury Concierge & Lifestyle Management
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-cormorant text-5xl md:text-7xl font-light text-dxb-ink mb-6 leading-tight"
        >
          {t('headline')}
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-xl text-dxb-slate max-w-2xl mx-auto mb-12 font-light"
        >
          {t('subheading')}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/contact"
            className="px-8 py-3 bg-dxb-gold text-white font-medium rounded hover:bg-dxb-gold-hover transition-colors"
          >
            {t('cta')}
          </Link>
          <a
            href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '971'}?text=Hi%20DXB%20TKTS`}
            className="px-8 py-3 border-2 border-dxb-gold text-dxb-gold font-medium rounded hover:bg-dxb-gold hover:text-white transition-colors"
          >
            {t('whatsapp')}
          </a>
        </motion.div>

        {/* Trust stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 pt-12 border-t border-dxb-band flex flex-col sm:flex-row items-center justify-center gap-12"
        >
          <div className="text-center">
            <div className="font-cormorant text-3xl font-semibold text-dxb-navy mb-1">20+</div>
            <div className="text-xs font-semibold tracking-wider text-dxb-slate uppercase">Years of Luxury Service</div>
          </div>
          <div className="text-center">
            <div className="font-cormorant text-3xl font-semibold text-dxb-navy mb-1">500+</div>
            <div className="text-xs font-semibold tracking-wider text-dxb-slate uppercase">Vetted Partners</div>
          </div>
          <div className="text-center">
            <div className="font-cormorant text-3xl font-semibold text-dxb-navy mb-1">100%</div>
            <div className="text-xs font-semibold tracking-wider text-dxb-slate uppercase">Satisfaction Rate</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
