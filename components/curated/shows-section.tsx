import { ArrowUpRight } from 'lucide-react'
import type { Locale } from '@/i18n.config'
import type { CuratedEvent } from '@/lib/curated'
import { showsPage as c } from '@/content/curated-pages'
import { FormSection } from '@/components/curated/page-parts'
import { PrefillButton } from '@/components/forms/prefill-button'
import { ServiceRequestForm } from '@/components/forms/service-request-form'

const FORM_ID = 'show-request'
const LA_PERLE = 'La Perle by Dragone'

/** La Perle and the Dubai Opera selection (published from the DXB CRM), with one ticket request form. */
export function ShowsSection({ locale, events }: { locale: Locale; events: CuratedEvent[] }) {
  const fmt = new Intl.DateTimeFormat(locale === 'ar' ? 'ar-AE-u-nu-latn' : locale === 'fr' ? 'fr-FR' : 'en-GB', { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })
  const day = (d: string) => fmt.format(new Date(`${d}T12:00:00Z`))
  const seats = [
    { value: 'Best available', label: c.seatsBest },
    { value: 'Premium seats', label: c.seatsPremium },
    { value: 'VIP', label: c.seatsVip },
    { value: 'Not sure — advise me', label: c.seatsAdvise },
  ]
  return (
    <>
      {/* La Perle */}
      <section className="bg-dxb-ivory" id="la-perle">
        <div className="max-w-6xl mx-auto px-6 py-20 md:py-24 grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-7">
            <p className="text-xs font-semibold tracking-[0.3em] uppercase text-dxb-gold">{c.perleEyebrow[locale]}</p>
            <h2 className="mt-4 font-cormorant text-4xl md:text-6xl font-light text-dxb-ink">{c.perleTitle[locale]}</h2>
            <p className="mt-6 text-lg text-dxb-slate leading-relaxed">{c.perleCopy[locale]}</p>
            <p className="mt-4 text-sm text-dxb-slate/80 leading-relaxed">{c.perleNote[locale]}</p>
          </div>
          <div className="lg:col-span-5 lg:text-end">
            <PrefillButton formId={FORM_ID} values={{ event: LA_PERLE }} className="inline-block px-8 py-4 bg-dxb-clay text-white text-sm font-semibold tracking-[0.12em] uppercase hover:bg-dxb-clay-hover transition-colors">
              {c.request[locale]}
            </PrefillButton>
          </div>
        </div>
      </section>

      {/* Dubai Opera */}
      <section className="bg-dxb-band" id="dubai-opera">
        <div className="max-w-6xl mx-auto px-6 py-20 md:py-24">
          <p className="text-xs font-semibold tracking-[0.3em] uppercase text-dxb-gold">{c.operaEyebrow[locale]}</p>
          <h2 className="mt-4 font-cormorant text-4xl md:text-6xl font-light text-dxb-ink whitespace-pre-line">{c.operaTitle[locale]}</h2>
          <p className="mt-6 max-w-3xl text-lg text-dxb-slate leading-relaxed">{c.operaCopy[locale]}</p>
          {events.length === 0 ? (
            <p className="mt-10 max-w-2xl text-dxb-slate leading-relaxed border-s-2 border-dxb-gold/50 ps-5">{c.operaEmpty[locale]}</p>
          ) : (
            <ul className="mt-12 divide-y divide-dxb-ink/10 border-y border-dxb-ink/10">
              {events.map(e => (
                <li key={e.id} className="py-7 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-start">
                  <div className="md:col-span-3">
                    <p className="font-cormorant text-2xl text-dxb-ink">{day(e.date)}</p>
                    <p className="text-sm text-dxb-slate">
                      {e.time}
                      {e.endDate && e.endDate !== e.date ? ` – ${day(e.endDate)}` : ''}
                    </p>
                  </div>
                  <div className="md:col-span-6">
                    <h3 className="font-cormorant text-3xl text-dxb-ink leading-tight">{e.title}</h3>
                    {e.venue && <p className="mt-1 text-sm text-dxb-slate">{e.venue}</p>}
                    {e.description && <p className="mt-3 text-dxb-slate leading-relaxed">{e.description}</p>}
                    {e.ticketCategories && (
                      <p className="mt-3 text-sm text-dxb-slate">
                        <span className="font-semibold text-dxb-ink">{c.categories[locale]}:</span> {e.ticketCategories}
                      </p>
                    )}
                  </div>
                  <div className="md:col-span-3 flex flex-col items-start md:items-end gap-3">
                    <span className="text-[0.68rem] font-semibold tracking-[0.18em] uppercase text-dxb-gold">{c.status[e.status]?.[locale]}</span>
                    <PrefillButton formId={FORM_ID} values={{ event: e.title, date: e.date, ...(e.time ? { time: e.time } : {}) }} className="inline-block px-6 py-3 bg-dxb-ink text-white text-xs font-semibold tracking-[0.16em] uppercase hover:bg-dxb-clay transition-colors">
                      {c.request[locale]}
                    </PrefillButton>
                    {e.officialUrl && (
                      <a href={e.officialUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm text-dxb-slate underline underline-offset-4 hover:text-dxb-gold">
                        {c.official[locale]}
                        <ArrowUpRight className="w-3.5 h-3.5 rtl:-scale-x-100" aria-hidden="true" />
                      </a>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <FormSection id={FORM_ID} title={c.formTitle[locale]} copy={c.perleNote[locale]} note={c.detRule[locale]} whatsapp="WhatsApp">
        <ServiceRequestForm id={FORM_ID} kind="tickets" options={{ ticketCategory: seats.map(s => ({ value: s.value, label: s.label })) }} />
      </FormSection>
    </>
  )
}

