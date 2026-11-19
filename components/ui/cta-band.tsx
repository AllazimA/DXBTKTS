'use client'

import React from 'react'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Button } from './button'

interface CTABandProps {
  heading?: React.ReactNode
  subheading?: React.ReactNode
  ctaLabel?: string
  ctaHref?: string
  secondaryCtaLabel?: string
  secondaryCtaHref?: string
  className?: string
}

const CTABandInner = React.forwardRef<HTMLDivElement, CTABandProps>(
  ({ className, heading, subheading, ctaLabel, ctaHref = '#', secondaryCtaLabel, secondaryCtaHref = '#' }, ref) => (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className={cn('relative bg-dxb-navy py-20 md:py-28 text-center text-white overflow-hidden', className)}
    >
      <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:32px_32px]" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-dxb-gold/50 to-transparent" />
      <div className="relative max-w-2xl mx-auto px-6">
        <CTAEyebrow />
        {heading && (
          <h2 className="font-cormorant text-4xl md:text-5xl font-light mb-4">
            {heading}
          </h2>
        )}
        {subheading && (
          <p className="text-lg text-gray-200 mb-8">
            {subheading}
          </p>
        )}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {ctaLabel && (
            <Button asChild variant="primary">
              <a href={ctaHref}>{ctaLabel}</a>
            </Button>
          )}
          {secondaryCtaLabel && (
            <Button asChild variant="secondary">
              <a href={secondaryCtaHref}>{secondaryCtaLabel}</a>
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  )
)
CTABandInner.displayName = 'CTABand'

function CTAEyebrow() {
  const t = useTranslations('ctaBand')
  return (
    <span className="block text-xs font-semibold tracking-[0.35em] text-dxb-gold uppercase mb-6">
      {t('eyebrow')}
    </span>
  )
}

const CTABand = CTABandInner

export { CTABand }
