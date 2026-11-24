import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { Users, Handshake, Plane, PartyPopper } from 'lucide-react'
import { CTABand } from '@/components/ui/cta-band'
import type { Locale } from '@/i18n.config'
import { pageMetadata } from '@/lib/metadata'
import { PageHero } from '@/components/brand/page-hero'
import { site } from '@/lib/site'
import { SectionHeading } from '@/components/brand/section-heading'

export async function generateMetadata({ params }: { params: { locale: Locale } }): Promise<Metadata> {
  return pageMetadata(params.locale, 'corporate', '/corporate')
}

const icons = [Handshake, Users, PartyPopper, Plane]

export default async function Corporate({ params }: { params: { locale: Locale } }) {
  const t = await getTranslations('corporatePage')
  const uses = t.raw('uses') as { title: string; copy: string }[]
  const process = t.raw('process') as string[]
  const accent = (chunks: React.ReactNode) => <span className="text-dxb-gold">{chunks}</span>

  return (
    <>
      <PageHero image={{ src: site.films.corporateMeeting.poster, alt: 'A DXB TKTS meeting with a corporate client above Downtown Dubai' }} film={site.films.corporateMeeting} label={t('eyebrow')} title={t('title')} lede={t('sub')} family="city-life" locale={params.locale} />

      <section className="py-16 md:py-20 bg-dxb-sand">
        <div className="max-w-7xl mx-auto px-5 sm:px-6">
          <SectionHeading index="01" label={t('eyebrow')} title={t.rich('usesHeading', { accent })} className="mb-12" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {uses.map((use, i) => {
              const Icon = icons[i % icons.length]
              return (
                <div key={use.title} className="bg-white dxb-cut p-8 md:p-10">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-dxb-sand mb-5">
                    <Icon className="w-6 h-6 text-dxb-cobalt" />
                  </div>
                  <h3 className="text-2xl md:text-[28px] font-extrabold tracking-[-0.02em] text-dxb-navy mb-3">{use.title}</h3>
                  <p className="text-dxb-slate leading-relaxed">{use.copy}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-5 sm:px-6">
          <SectionHeading index="02" title={t('processHeading')} className="mb-10" />
          <ol className="space-y-5">
            {process.map((step, i) => (
              <li key={step} className="flex gap-5 pb-5 border-b border-dxb-line last:border-b-0">
                <span className="dxb-data text-3xl font-semibold text-dxb-cobalt leading-none w-12 shrink-0" dir="ltr">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="text-dxb-ink/80 text-lg leading-relaxed">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <CTABand
        heading={t.rich('ctaHeading', { accent })}
        subheading={t('ctaSub')}
        ctaLabel={t('ctaPrimary')}
        ctaHref="/request"
      />
    </>
  )
}
