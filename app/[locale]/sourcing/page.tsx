import type { Metadata } from 'next'
import type { Locale } from '@/i18n.config'
import { pageMetadata } from '@/lib/metadata'
import { aiImage } from '@/lib/images'
import { sourcingPage as c } from '@/content/curated-pages'
import { CuratedHero, FormSection } from '@/components/curated/page-parts'
import { ServiceRequestForm } from '@/components/forms/service-request-form'

const HERO = aiImage('page-shopping', 'privateVilla', 'A client examining a luxury watch with a specialist')
const FORM_ID = 'sourcing-request'

export async function generateMetadata({ params }: { params: { locale: Locale } }): Promise<Metadata> {
  return pageMetadata(params.locale, 'sourcing', '/sourcing')
}

export default function SourcingPage({ params: { locale } }: { params: { locale: Locale } }) {
  return (
    <>
      <CuratedHero image={HERO} family="city-life" locale={locale} eyebrow={c.eyebrow[locale]} title={c.title[locale]} lede={c.lede[locale]} cta={c.formTitle[locale]} ctaHref={`#${FORM_ID}`} />

      <section className="bg-dxb-sand">
        <div className="max-w-6xl mx-auto px-6 py-20 md:py-28 grid grid-cols-1 lg:grid-cols-12 gap-14">
          <div className="lg:col-span-6">
            <h2 className="font-display text-4xl md:text-5xl text-dxb-navy">{c.howTitle[locale]}</h2>
            <ol className="mt-10 space-y-6">
              {c.steps.map((s, i) => (
                <li key={i} className="flex items-baseline gap-5 border-t border-dxb-ink/10 pt-5">
                  <span className="font-display text-3xl text-dxb-gold tabular-nums w-10 shrink-0" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                  <span className="text-lg text-dxb-ink">{s[locale]}</span>
                </li>
              ))}
            </ol>
          </div>
          <div className="lg:col-span-6">
            <div className="bg-white p-8 md:p-10">
              <h2 className="font-display text-3xl text-dxb-navy">{c.termsTitle[locale]}</h2>
              <p className="mt-5 text-dxb-slate leading-relaxed">{c.terms[locale]}</p>
            </div>
          </div>
        </div>
      </section>

      <FormSection id={FORM_ID} title={c.formTitle[locale]} copy={c.formCopy[locale]} whatsapp="WhatsApp">
        <ServiceRequestForm id={FORM_ID} kind="sourcing" requireTerms />
      </FormSection>
    </>
  )
}
