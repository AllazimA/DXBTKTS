import { Metadata } from 'next'
import { Hero } from '@/components/sections/hero'
import { WhatWeDo } from '@/components/sections/what-we-do'
import { CTABand } from '@/components/ui/cta-band'

export const metadata: Metadata = {
  title: 'DXB TKTS | Home',
  description: 'Premium luxury concierge and lifestyle management for HNWIs in Dubai.',
}

export default function Home() {
  return (
    <>
      <Hero />
      <WhatWeDo />
      <CTABand
        heading="Experience DXB TKTS"
        subheading="Join the most discerning members in Dubai and beyond."
        ctaLabel="Request an Invitation"
        ctaHref="/contact"
      />
    </>
  )
}
