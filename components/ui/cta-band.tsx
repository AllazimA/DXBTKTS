'use client'

import React from 'react'
import { useTranslations } from 'next-intl'
import { cn } from '@/lib/utils'
import { BrandIcon, BrandSymbol, MonoLabel, Perforation } from '@/components/brand'
import { Reveal } from '@/components/brand/reveal'
import { WhatsAppIcon } from './whatsapp-icon'

interface CTABandProps {
  heading?: React.ReactNode
  subheading?: React.ReactNode
  ctaLabel?: string
  ctaHref?: string
  secondaryCtaLabel?: string
  secondaryCtaHref?: string
  className?: string
}

/**
 * Closing call to action: a large boarding-pass on the navy tear-pattern
 * ground. Primary action in light orange, secondary (usually WhatsApp) beside it.
 */
function CTABand({ className, heading, subheading, ctaLabel, ctaHref = '#', secondaryCtaLabel, secondaryCtaHref = '#' }: CTABandProps) {
  const t = useTranslations('ctaBand')
  const isWhatsApp = secondaryCtaHref.includes('wa.me')

  return (
    <section className={cn('relative dxb-pattern-navy py-16 md:py-24 text-white', className)}>
      <div className="max-w-6xl mx-auto px-5 sm:px-6">
        <Reveal className="dxb-lift">
          <div className="grid md:grid-cols-[1fr_auto] bg-dxb-navy dxb-stub [--stub-x:100%] md:[--stub-x:calc(100%_-_220px)] md:rtl:[--stub-x:220px] [--stub-r:16px] ring-1 ring-white/10">
            <div className="p-8 md:p-12">
              <MonoLabel className="text-dxb-orange">{t('eyebrow')}</MonoLabel>
              {heading && <h2 className="font-display text-4xl md:text-[56px] mt-4 text-white">{heading}</h2>}
              {subheading && <p className="mt-5 text-lg text-white/75 max-w-2xl leading-relaxed">{subheading}</p>}
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                {ctaLabel && (
                  <a href={ctaHref} className="inline-flex items-center justify-center gap-2 h-14 px-7 bg-dxb-orange text-dxb-ink font-bold dxb-cut transition-colors hover:bg-dxb-orange-hover">
                    {ctaLabel}
                    <BrandIcon name="arrow" className="w-5 h-5 rtl:rotate-180" />
                  </a>
                )}
                {secondaryCtaLabel && (
                  <a
                    href={secondaryCtaHref}
                    {...(isWhatsApp ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="inline-flex items-center justify-center gap-2.5 h-14 px-7 border-2 border-white/40 text-white font-bold transition-colors hover:border-white hover:bg-white hover:text-dxb-navy"
                  >
                    {isWhatsApp && <WhatsAppIcon className="w-5 h-5 text-[#25D366]" />}
                    {secondaryCtaLabel}
                  </a>
                )}
              </div>
            </div>
            <div className="relative hidden md:flex w-[220px] flex-col items-center justify-center gap-4 px-6">
              <Perforation vertical className="absolute inset-y-6 start-0 text-white" />
              <BrandSymbol className="h-20 text-dxb-orange" />
              <MonoLabel parts={['DXB', 'TKTS']} className="text-white/50 text-[11px]" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export { CTABand }
