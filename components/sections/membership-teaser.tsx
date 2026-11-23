'use client'

import Link from 'next/link'
import { useRef } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { membership as m } from '@/content/membership'
import { MembershipCard } from '@/components/membership/membership-card'
import { BrandIcon, MonoLabel } from '@/components/brand'
import type { Locale } from '@/i18n.config'

/** Three cards floating in the dark; they tilt towards the pointer. */
export function MembershipTeaser() {
  const locale = useLocale() as Locale
  const t = useTranslations('manifesto')
  const stage = useRef<HTMLDivElement>(null)
  const [oasis, pearl, najm] = m.tiers

  const onMove = (e: React.PointerEvent) => {
    const el = stage.current
    if (!el || e.pointerType !== 'mouse') return
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    el.style.setProperty('--rx', `${(-y * 10).toFixed(2)}deg`)
    el.style.setProperty('--ry', `${(x * 14).toFixed(2)}deg`)
  }
  const reset = () => {
    stage.current?.style.setProperty('--rx', '0deg')
    stage.current?.style.setProperty('--ry', '0deg')
  }

  return (
    <section className="relative bg-dxb-ink text-white overflow-hidden">
      <div aria-hidden className="absolute -top-40 end-[-10%] w-[60rem] h-[60rem] rounded-full bg-dxb-cobalt/20 blur-[140px]" />
      <div aria-hidden className="absolute -bottom-48 start-[-10%] w-[44rem] h-[44rem] rounded-full bg-dxb-orange/10 blur-[140px]" />
      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 py-24 md:py-32 grid lg:grid-cols-12 gap-14 items-center">
        <div className="lg:col-span-5">
          <MonoLabel parts={['05', m.eyebrow[locale]]} className="text-dxb-orange" />
          <h2 className="mt-5 font-display text-5xl md:text-6xl lg:text-[72px] leading-[0.95] tracking-[-0.04em] whitespace-pre-line">{m.title[locale]}</h2>
          <p className="mt-6 text-lg text-white/75 leading-relaxed font-light">{m.lede[locale]}</p>
          <ul className="mt-8 border-t border-white/15">
            {m.tiers.map(tier => (
              <li key={tier.id} className="flex items-baseline justify-between gap-4 py-3.5 border-b border-white/15">
                <span className="text-xl font-extrabold tracking-[-0.02em]">{tier.name[locale]}</span>
                <span className="text-sm text-white/60 text-end">{tier.tagline[locale]}</span>
              </li>
            ))}
          </ul>
          <Link href="/membership" className="group mt-9 inline-flex items-center gap-2 h-14 px-7 bg-dxb-orange text-dxb-ink font-bold dxb-cut transition-colors hover:bg-white">
            {t('membershipCta')}
            <BrandIcon name="arrow" className="w-5 h-5 transition-transform group-hover:translate-x-1 rtl:rotate-180" />
          </Link>
        </div>
        <div className="lg:col-span-7" onPointerMove={onMove} onPointerLeave={reset}>
          <div
            ref={stage}
            dir="ltr"
            className="relative mx-auto max-w-[620px] h-[320px] sm:h-[440px] [perspective:1400px]"
          >
            <div className="absolute inset-0 transition-transform duration-300 ease-out [transform-style:preserve-3d] [transform:rotateX(var(--rx,0deg))_rotateY(var(--ry,0deg))]">
              {[oasis, pearl, najm].map((tier, i) => (
                <div
                  key={tier.id}
                  className="absolute left-1/2 top-1/2 w-[76%] drop-shadow-[0_40px_50px_rgba(0,0,0,0.55)]"
                  style={{
                    transform: `translate(-50%, -50%) translate3d(${(i - 1) * 17}%, ${(i - 1) * 13}%, ${i * 40}px) rotate(${(i - 1) * 7}deg)`,
                    zIndex: i + 1,
                  }}
                >
                  <MembershipCard finish={tier.id} name={tier.name.en} arabicName={tier.arabicName} label={m.cardLabel.en} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
