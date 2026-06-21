'use client'

import React from 'react'
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

const CTABand = React.forwardRef<HTMLDivElement, CTABandProps>(
  ({ className, heading, subheading, ctaLabel, ctaHref = '#', secondaryCtaLabel, secondaryCtaHref = '#' }, ref) => (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className={cn('bg-dxb-navy py-16 text-center text-white', className)}
    >
      <div className="max-w-2xl mx-auto px-6">
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
CTABand.displayName = 'CTABand'

export { CTABand }
