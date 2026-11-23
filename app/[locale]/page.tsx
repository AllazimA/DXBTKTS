import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { Hero } from '@/components/sections/hero'
import { PopularExperiences } from '@/components/sections/popular-experiences'
import { Philosophy } from '@/components/sections/philosophy'
import { ServicesShowcase } from '@/components/sections/services-showcase'
import { Experiences } from '@/components/sections/experiences'
import { Manifesto } from '@/components/sections/manifesto'
import { MembershipTeaser } from '@/components/sections/membership-teaser'
import { Clientele } from '@/components/sections/clientele'
import { HowItWorks } from '@/components/sections/how-it-works'
import { Gallery } from '@/components/sections/gallery'
import { CTABand } from '@/components/ui/cta-band'
import { site, whatsappLink } from '@/lib/site'
import type { Locale } from '@/i18n.config'
import { pageMetadata } from '@/lib/metadata'

export async function generateMetadata({ params }: { params: { locale: Locale } }): Promise<Metadata> {
  return pageMetadata(params.locale, 'home', '/')
}

export default async function Home() {
  const t = await getTranslations('home')
  const accent = (chunks: React.ReactNode) => (
    <span className="text-dxb-orange">{chunks}</span>
  )

  return (
    <>
      <Hero />
      <Manifesto />
      <PopularExperiences />
      <ServicesShowcase />
      <HowItWorks />
      <Experiences />
      <MembershipTeaser />
      <Philosophy />
      <Clientele />
      <Gallery />
      <CTABand
        heading={t.rich('ctaHeading', { accent })}
        subheading={t('ctaSub')}
        ctaLabel={t('ctaPrimary')}
        ctaHref="/request"
        secondaryCtaLabel={t('ctaSecondary')}
        secondaryCtaHref={whatsappLink()}
        film={site.films.nightlifeLounge}
      />
    </>
  )
}
