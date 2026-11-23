'use client'

import { useEffect, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
import { products, categories } from '@/data/catalogue'
import { MonoLabel } from '@/components/brand'
import { Reveal } from '@/components/brand/reveal'

/**
 * A single editorial statement that lights up word by word as it scrolls
 * through the screen, then the house in numbers (all counted, none invented).
 */
export function Manifesto() {
  const t = useTranslations('manifesto')
  const stats = [
    { n: String(products.length), label: t('stats.experiences') },
    { n: String(categories.length).padStart(2, '0'), label: t('stats.categories') },
    { n: '03', label: t('stats.languages') },
    { n: '01', label: t('stats.team') },
  ]
  const words = t('statement').split(/\s+/)
  const ref = useRef<HTMLParagraphElement>(null)
  // 0 → nothing lit, 1 → every word lit. Starts fully lit so the text is
  // readable without JavaScript or with reduced motion.
  const [progress, setProgress] = useState(1)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const el = ref.current
    if (!el) return
    let raf = 0
    const update = () => {
      raf = 0
      const r = el.getBoundingClientRect()
      const vh = window.innerHeight
      // lights from when the block's top reaches 85% of the screen until its bottom reaches 45%
      const start = vh * 0.85
      const end = vh * 0.45
      const p = (start - r.top) / (start - end + r.height)
      setProgress(Math.max(0, Math.min(1, p)))
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  const lit = progress * words.length

  return (
    <section className="bg-dxb-sand pt-24 md:pt-40 pb-20 md:pb-28">
      <div className="max-w-7xl mx-auto px-5 sm:px-6">
        <Reveal>
          <MonoLabel parts={['DXB TKTS', t('label')]} className="text-dxb-cobalt" />
        </Reveal>
        <p
          ref={ref}
          className="mt-8 font-display text-[36px] leading-[1.04] sm:text-5xl lg:text-[76px] text-dxb-navy tracking-[-0.035em] max-w-[20ch]"
        >
          {words.map((w, i) => (
            <span
              key={i}
              className="transition-opacity duration-300"
              style={{ opacity: Math.max(0.14, Math.min(1, lit - i + 0.5)) }}
            >
              {w}{' '}
            </span>
          ))}
        </p>
        <dl className="mt-20 md:mt-32 grid grid-cols-2 lg:grid-cols-4 gap-y-8">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={0.1 + i * 0.06} className="flex items-baseline gap-4 pe-6">
              <dd className="font-display text-5xl md:text-[64px] leading-none tracking-[-0.04em] text-dxb-navy order-1" dir="ltr">{s.n}</dd>
              <dt className="dxb-label text-[11px] text-dxb-muted order-2 max-w-[12ch]">{s.label}</dt>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  )
}
