import { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import { Hero } from '@/components/sections/hero'

export const metadata: Metadata = {
  title: 'DXB TKTS | Home',
  description: 'Premium luxury concierge and lifestyle management for HNWIs in Dubai.',
}

export default function Home() {
  const t = useTranslations()

  return (
    <>
      <Hero />
    </>
  )
}
