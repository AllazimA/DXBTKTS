import { ArrowUpRight } from 'lucide-react'
import { PrefillButton } from '@/components/forms/prefill-button'

export type VenueCard = {
  slug: string
  name: string
  /** Two short facts shown under the name, e.g. cuisine and area. */
  facts: { label: string; value: string }[]
  why: string
  basis: string
  website: string | null
  canRequest?: boolean
}

/** Numbered editorial list of venues; each card fills the request form below it. */
export function VenueList({ venues, formId, field, requestLabel, websiteLabel, empty }: { venues: VenueCard[]; formId: string; field: string; requestLabel: string; websiteLabel: string; empty: string }) {
  if (!venues.length) return <p className="max-w-2xl text-lg text-dxb-slate leading-relaxed">{empty}</p>
  return (
    <ol className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-14">
      {venues.map((v, i) => (
        <li key={v.slug} id={v.slug} className="relative border-t border-dxb-ink/15 pt-8 scroll-mt-28">
          <div className="flex items-baseline gap-5">
            <span className="font-cormorant text-5xl leading-none text-dxb-gold/80 tabular-nums" aria-hidden="true">
              {String(i + 1).padStart(2, '0')}
            </span>
            <div className="min-w-0">
              <h3 className="font-cormorant text-3xl md:text-[2.1rem] leading-tight text-dxb-ink">{v.name}</h3>
              {v.basis && <p className="mt-2 text-[0.7rem] font-semibold tracking-[0.18em] uppercase text-dxb-gold">{v.basis}</p>}
            </div>
          </div>
          <dl className="mt-6 grid grid-cols-2 gap-4 text-sm">
            {v.facts.filter(f => f.value).map(f => (
              <div key={f.label}>
                <dt className="text-[0.68rem] font-semibold tracking-[0.2em] uppercase text-dxb-slate/70">{f.label}</dt>
                <dd className="mt-1 text-dxb-ink">{f.value}</dd>
              </div>
            ))}
          </dl>
          {v.why && <p className="mt-5 text-dxb-slate leading-relaxed">{v.why}</p>}
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
            {v.canRequest !== false && (
              <PrefillButton formId={formId} values={{ [field]: v.name }} className="inline-flex items-center px-6 py-3 bg-dxb-ink text-white text-xs font-semibold tracking-[0.16em] uppercase hover:bg-dxb-clay transition-colors">
                {requestLabel}
              </PrefillButton>
            )}
            {v.website && (
              <a href={v.website} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm text-dxb-slate underline underline-offset-4 hover:text-dxb-gold">
                {websiteLabel}
                <ArrowUpRight className="w-3.5 h-3.5 rtl:-scale-x-100" aria-hidden="true" />
              </a>
            )}
          </div>
        </li>
      ))}
    </ol>
  )
}
