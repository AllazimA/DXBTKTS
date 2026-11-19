'use client'

import { useTranslations } from 'next-intl'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { site, whatsappLink } from '@/lib/site'
import { heroImage } from '@/lib/images'

const CHAPTERS = [
  { key: 'sand', href: '/experiences/desert' },
  { key: 'sea', href: '/experiences/on-the-water' },
  { key: 'sky', href: '/experiences/sky' },
  { key: 'city', href: '/experiences/transfers' },
] as const

/** Plays the hero film only when files are configured, motion is allowed and data saving is off. */
function useHeroVideo() {
  const [enabled, setEnabled] = useState(false)
  useEffect(() => {
    if (!site.heroVideo) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection
    const slow = conn?.saveData || (conn?.effectiveType && /2g|3g/.test(conn.effectiveType))
    setEnabled(!reduce && !slow)
  }, [])
  return enabled
}

export function Hero() {
  const t = useTranslations('hero')
  const videoEnabled = useHeroVideo()
  const hero = heroImage()
  const videoRef = useRef<HTMLVideoElement>(null)

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-dxb-ink">
      {/* Cinematic background: slow Ken Burns zoom */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.12 }}
        animate={{ scale: 1 }}
        transition={{ duration: 14, ease: 'easeOut' }}
      >
        <Image
          src={hero.src ?? ''}
          alt={hero.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>
      {videoEnabled && site.heroVideo && (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          poster={site.heroVideo.poster}
          aria-hidden="true"
        >
          <source src={site.heroVideo.mobile} media="(max-width: 767px)" type="video/mp4" />
          {site.heroVideo.webm && <source src={site.heroVideo.webm} type="video/webm" />}
          <source src={site.heroVideo.mp4} type="video/mp4" />
        </video>
      )}
      {/* Layered gradients for depth + legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-dxb-ink/60 via-dxb-ink/25 to-dxb-ink/85" />
      <div className="absolute inset-0 bg-gradient-to-r from-dxb-ink/35 via-transparent to-dxb-ink/35" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-24 pb-32">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8 flex items-center justify-center gap-4"
        >
          <span className="hidden sm:block h-px w-12 bg-dxb-gold/60" />
          <span className="text-xs font-semibold tracking-[0.35em] text-dxb-gold uppercase">
            {t('eyebrow')}
          </span>
          <span className="hidden sm:block h-px w-12 bg-dxb-gold/60" />
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.35 }}
          className="font-cormorant text-5xl md:text-7xl lg:text-8xl font-light text-white mb-8 leading-[1.05]"
        >
          {t('headline')}
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.55 }}
          className="text-lg md:text-xl text-white/75 max-w-2xl mx-auto mb-12 font-light leading-relaxed"
        >
          {t('subheading')}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.75 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/request"
            className="group relative px-10 py-4 bg-dxb-clay text-white font-medium tracking-wide overflow-hidden transition-all duration-300 hover:bg-dxb-clay-hover "
          >
            {t('cta')}
          </Link>
          <a
            href={whatsappLink()}
            className="px-10 py-4 border border-white/40 text-white font-medium tracking-wide transition-all duration-300 hover:border-dxb-gold hover:text-dxb-gold hover:bg-white/5"
          >
            {t('whatsapp')}
          </a>
        </motion.div>

        {/* Trust stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1 }}
          className="mt-16 pt-8 border-t border-white/15"
        >
          <nav aria-label={t('chaptersLabel')} className="grid grid-cols-4 gap-2 sm:gap-6 max-w-2xl mx-auto">
            {CHAPTERS.map(c => (
              <Link key={c.key} href={c.href} className="group text-center">
                <span className="block font-cormorant text-2xl sm:text-4xl font-light text-white transition-colors group-hover:text-dxb-gold">
                  {t(`chapters.${c.key}.title`)}
                </span>
                <span className="mt-1 block text-[10px] sm:text-[11px] font-semibold tracking-[0.18em] text-white/55 uppercase">
                  {t(`chapters.${c.key}.label`)}
                </span>
              </Link>
            ))}
          </nav>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ChevronDown className="w-6 h-6" />
      </motion.div>
    </section>
  )
}
