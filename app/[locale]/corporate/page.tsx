import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { Users, Handshake, Plane, PartyPopper } from 'lucide-react'
import { Eyebrow } from '@/components/ui/eyebrow'
import { CTABand } from '@/components/ui/cta-band'
import type { Locale } from '@/i18n.config'
import { pageMetadata } from '@/lib/metadata'

export async function generateMetadata({ params }: { params: { locale: Locale } }): Promise<Metadata> {
  return pageMetadata(params.locale, 'corporate', '/corporate')
}

const icons = [Handshake, Users, PartyPopper, Plane]

export default async function Corporate() {
  const t = await getTranslations('corporatePage')
  const uses = t.raw('uses') as { title: string; copy: string }[]
  const process = t.raw('process') as string[]
  const accent = (chunks: React.ReactNode) => <span className="italic text-dxb-gold">{chunks}</span>

  return (
    <>
      <section className="py-20 md:py-28 bg-gradient-to-b from-dxb-ivory to-dxb-band">
        <div className="max-w-7xl mx-auto px-6">
          <Eyebrow className="mb-4">{t('eyebrow')}</Eyebrow>
          <h1 className="font-cormorant text-5xl md:text-6xl font-light text-dxb-ink mb-6 max-w-3xl">
            {t('title')}
          </h1>
          <p className="text-lg text-dxb-slate max-w-2xl leading-relaxed">{t('sub')}</p>
        </div>
      </section>

      <section className="py-20 bg-dxb-ivory">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-cormorant text-4xl font-light text-dxb-ink mb-12 text-center">
            {t.rich('usesHeading', { accent })}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {uses.map((use, i) => {
              const Icon = icons[i % icons.length]
              return (
                <div key={use.title} className="bg-white border border-dxb-band p-10">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-dxb-gold/10 mb-5">
                    <Icon className="w-6 h-6 text-dxb-gold" />
                  </div>
                  <h3 className="font-cormorant text-3xl font-medium text-dxb-ink mb-3">{use.title}</h3>
                  <p className="text-dxb-slate leading-relaxed">{use.copy}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-dxb-band">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-cormorant text-4xl font-light text-dxb-ink mb-10 text-center">
            {t('processHeading')}
          </h2>
          <ol className="space-y-5">
            {process.map((step, i) => (
              <li key={step} className="flex gap-5 pb-5 border-b border-dxb-ivory last:border-b-0">
                <span className="font-cormorant text-3xl text-dxb-gold leading-none w-10 shrink-0" dir="ltr">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="text-dxb-slate leading-relaxed">{step}</p>
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
