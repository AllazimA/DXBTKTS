import type { Metadata } from 'next'
import Image from 'next/image'
import { Check } from 'lucide-react'
import type { Locale } from '@/i18n.config'
import { pageMetadata } from '@/lib/metadata'
import { aiImage } from '@/lib/images'
import { membership as m } from '@/content/membership'
import { ChapterLabel } from '@/components/editorial/chapter-label'
import { MembershipCard } from '@/components/membership/membership-card'
import { MembershipApply } from '@/components/membership/membership-apply'
import { BrandIcon, Tear } from '@/components/brand'
import { heroPrimary, heroSecondary } from '@/components/brand/page-hero'

const BAND = aiImage('page-membership', 'eveningEvent', 'Members in a private lounge overlooking an evening concert in Dubai')

export async function generateMetadata({ params }: { params: { locale: Locale } }): Promise<Metadata> {
  return pageMetadata(params.locale, 'membership', '/membership')
}

export default function Membership({ params: { locale } }: { params: { locale: Locale } }) {
  const [oasis, pearl, najm] = m.tiers

  return (
    <>
      {/* Opening — copy left, fanned cards right */}
      <section className="relative bg-dxb-navy text-white overflow-hidden">
        <div aria-hidden className="absolute inset-0 dxb-pattern-navy opacity-40" />
        <div className="relative max-w-7xl mx-auto px-5 sm:px-6 py-14 md:py-20 grid grid-cols-1 lg:grid-cols-12 gap-14 items-center">
          <div className="lg:col-span-6">
            <span className="dxb-label text-dxb-orange inline-flex items-center">DXB TKTS<Tear />{m.eyebrow[locale]}</span>
            <h1 className="mt-6 font-display text-[44px] leading-[0.98] sm:text-6xl lg:text-[72px] tracking-[-0.035em] whitespace-pre-line">{m.title[locale]}</h1>
            <p className="mt-6 text-lg md:text-xl leading-relaxed text-white/75">{m.lede[locale]}</p>
            <p className="mt-6 flex items-start gap-2 text-[15px] text-white/85"><BrandIcon name="membership" className="w-5 h-5 text-dxb-orange" />{m.founding[locale]}</p>
            <a href="#apply" className={`mt-9 ${heroPrimary}`}>
              {m.apply[locale]}
            </a>
          </div>
          <div className="lg:col-span-6">
            <div className="relative mx-auto max-w-[520px] h-[300px] sm:h-[380px]" dir="ltr">
              {[oasis, pearl, najm].map((tier, i) => (
                <div
                  key={tier.id}
                  className="absolute left-1/2 top-1/2 w-[78%]"
                  style={{
                    transform: `translate(-50%, -50%) translate(${(i - 1) * 16}%, ${(i - 1) * 12}%) rotate(${(i - 1) * 7}deg)`,
                    zIndex: i + 1,
                  }}
                >
                  <MembershipCard finish={tier.id} name={tier.name.en} arabicName={tier.arabicName} label={m.cardLabel.en} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* The cards */}
      <section className="bg-dxb-sand">
        <div className="max-w-7xl mx-auto px-6 py-20 md:py-28">
          <ChapterLabel index="01" label={m.cardsLabel[locale]} />
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
            <h2 className="lg:col-span-5 font-display text-4xl md:text-5xl text-dxb-navy leading-tight">{m.cardsTitle[locale]}</h2>
            <p className="lg:col-span-7 text-lg leading-relaxed text-dxb-slate">{m.cardsCopy[locale]}</p>
          </div>
          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-10">
            {m.tiers.map(tier => (
              <div key={tier.id}>
                <MembershipCard finish={tier.id} name={tier.name.en} arabicName={tier.arabicName} label={m.cardLabel.en} />
                <div className="mt-6 flex items-baseline justify-between gap-4">
                  <h3 className="font-display text-3xl text-dxb-navy">{tier.name[locale]}</h3>
                  <span className="text-xs font-mono uppercase tracking-[0.06em] text-dxb-gold">{tier.fee[locale].split(' · ')[0]}</span>
                </div>
                <p className="mt-1 text-dxb-slate">{tier.tagline[locale]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Image band */}
      <section className="relative h-[42vh] min-h-[280px] md:h-[60vh] bg-dxb-navy">
        <Image src={BAND.src ?? ''} alt={BAND.alt} fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-dxb-ink/40 via-transparent to-dxb-ink/30" />
      </section>

      {/* Privileges */}
      <section className="bg-dxb-sand">
        <div className="max-w-6xl mx-auto px-6 py-20 md:py-28">
          <ChapterLabel index="02" label={m.privilegesLabel[locale]} />
          <h2 className="mt-8 font-display text-4xl md:text-6xl text-dxb-navy">{m.privilegesTitle[locale]}</h2>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-x-16">
            {m.privileges.map((p, i) => (
              <div key={p.title.en} className="border-t-2 border-dxb-navy py-8 grid grid-cols-[2.5rem_1fr] gap-4">
                <span className="dxb-data text-2xl font-semibold text-dxb-cobalt" dir="ltr">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3 className="font-display text-3xl md:text-4xl text-dxb-navy">{p.title[locale]}</h3>
                  <p className="mt-3 text-dxb-slate leading-relaxed">{p.copy[locale]}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Dubai season */}
      <section className="bg-dxb-navy text-white">
        <div className="max-w-6xl mx-auto px-6 py-20 md:py-28">
          <ChapterLabel index="03" label={m.seasonLabel[locale]} tone="light" />
          <h2 className="mt-8 font-display text-4xl md:text-6xl max-w-3xl">{m.seasonTitle[locale]}</h2>
          <ol className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-t border-white/15">
            {m.season.map(s => (
              <li key={s.when.en} className="border-b border-white/15 py-6 pe-6">
                <span className="text-[11px] font-medium font-mono uppercase tracking-[0.06em] text-dxb-gold">{s.when[locale]}</span>
                <p className="mt-2 font-display font-bold text-2xl leading-snug text-white/90">{s.what[locale]}</p>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-xs text-white/50">{m.seasonNote[locale]}</p>
        </div>
      </section>

      {/* Membership levels — cumulative */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-6 py-20 md:py-28">
          <ChapterLabel index="04" label={m.tiersLabel[locale]} />
          <h2 className="mt-8 font-display text-4xl md:text-6xl text-dxb-navy max-w-4xl">{m.tiersTitle[locale]}</h2>
          <p className="mt-4 text-dxb-slate">{m.tiersCopy[locale]}</p>
          <div className="mt-14 grid grid-cols-1 lg:grid-cols-3 gap-6">
            {m.tiers.map(tier => {
              const dark = tier.id === 'najm'
              const stripe = tier.id === 'oasis' ? 'bg-dxb-green' : tier.id === 'pearl' ? 'bg-dxb-cobalt' : 'bg-dxb-orange'
              return (
                <div
                  key={tier.id}
                  className={`relative flex flex-col p-7 md:p-8 dxb-cut ${dark ? 'bg-dxb-ink text-white' : tier.featured ? 'bg-white text-dxb-ink ring-2 ring-inset ring-dxb-cobalt' : 'bg-dxb-sand text-dxb-ink'}`}
                >
                  <span aria-hidden="true" className={`absolute top-0 inset-x-0 h-1.5 ${stripe}`} />
                  <MembershipCard finish={tier.id} name={tier.name.en} arabicName={tier.arabicName} label={m.cardLabel.en} />
                  <span className={`mt-8 text-[11px] font-medium font-mono uppercase tracking-[0.06em] ${dark ? 'text-dxb-orange' : 'text-dxb-cobalt'}`}>{tier.who[locale]}</span>
                  <h3 className="mt-3 font-display text-4xl">{tier.name[locale]}</h3>
                  <p className={`mt-1 ${dark ? 'text-white/70' : 'text-dxb-ink/80'}`}>{tier.tagline[locale]}</p>
                  <p className={`mt-2 text-sm ${dark ? 'text-white/50' : 'text-dxb-slate'}`}>{tier.fee[locale]}</p>

                  {tier.inherits[locale] && (
                    <p className={`mt-8 text-lg font-extrabold ${dark ? 'text-dxb-orange' : 'text-dxb-cobalt'}`}>{tier.inherits[locale]}…</p>
                  )}
                  <ul className={`${tier.inherits[locale] ? 'mt-4' : 'mt-8'} space-y-3 flex-1`}>
                    {tier.benefits[locale].map(b => (
                      <li key={b} className={`flex gap-3 text-sm leading-relaxed ${dark ? 'text-white/85' : 'text-dxb-ink/85'}`}>
                        <Check className={`w-4 h-4 mt-0.5 shrink-0 ${dark ? 'text-dxb-orange' : 'text-dxb-cobalt'}`} strokeWidth={2.5} />
                        {b}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={`#apply-${tier.id}`}
                    className={`mt-10 inline-flex items-center justify-center h-12 px-6 text-[15px] font-bold transition-colors ${
                      dark || tier.featured ? 'bg-dxb-orange text-dxb-ink hover:bg-dxb-orange-hover dxb-cut dxb-cut-sm' : 'border-2 border-dxb-navy text-dxb-navy hover:bg-dxb-navy hover:text-white'
                    }`}
                  >
                    {tier.cta[locale]}
                  </a>
                </div>
              )
            })}
          </div>

          {/* The Majlis Account */}
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-dxb-navy text-white dxb-cut dxb-cut-lg p-8 md:p-12">
            <div className="lg:col-span-4">
              <MembershipCard finish="majlis" name="Majlis" arabicName={m.majlis.arabicName} label="Account" />
            </div>
            <div className="lg:col-span-8">
              <span className="dxb-label text-dxb-orange">{m.majlis.who[locale]}</span>
              <h3 className="mt-3 font-display text-4xl">{m.majlis.name[locale]}</h3>
              <p className="mt-4 text-white/75 leading-relaxed">{m.majlis.copy[locale]}</p>
              <a href="#apply-majlis" className={`mt-8 ${heroSecondary}`}>
                {m.majlis.cta[locale]}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* What makes it different */}
      <section className="bg-dxb-sand">
        <div className="max-w-6xl mx-auto px-6 py-20 md:py-28">
          <ChapterLabel index="05" label={m.differentLabel[locale]} />
          <h2 className="mt-8 font-display text-4xl md:text-6xl text-dxb-navy max-w-3xl">{m.differentTitle[locale]}</h2>
          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-10">
            {m.different.map((d, i) => (
              <div key={d.title.en} className="border-t-2 border-dxb-navy pt-6">
                <span className="dxb-data text-2xl font-semibold text-dxb-cobalt" dir="ltr">{`0${i + 1}`}</span>
                <h3 className="mt-2 font-display text-3xl text-dxb-navy">{d.title[locale]}</h3>
                <p className="mt-3 text-dxb-slate leading-relaxed">{d.copy[locale]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* In plain terms */}
      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-6 py-20 md:py-24">
          <ChapterLabel index="06" label={m.plainLabel[locale]} />
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-10">
            {m.plain.map(p => (
              <div key={p.title.en}>
                <h3 className="font-display text-3xl text-dxb-navy">{p.title[locale]}</h3>
                <p className="mt-3 text-dxb-slate leading-relaxed">{p.copy[locale]}</p>
              </div>
            ))}
          </div>
          <p className="mt-12 text-[15px] text-dxb-ink border-s-4 border-dxb-orange ps-4">{m.noMembershipNeeded[locale]}</p>
        </div>
      </section>

      {/* Apply */}
      <section id="apply" className="bg-dxb-navy text-white scroll-mt-24">
        <div className="max-w-6xl mx-auto px-6 py-20 md:py-28">
          <MembershipApply
            locale={locale}
            intro={
              <>
                <ChapterLabel index="07" label={m.apply[locale]} tone="light" />
                <h2 className="mt-8 font-display text-4xl md:text-5xl">{m.formTitle[locale]}</h2>
                <p className="mt-6 text-white/70 leading-relaxed">{m.formCopy[locale]}</p>
                <p className="mt-4 text-sm text-dxb-orange">{m.foundingNote[locale]}</p>
              </>
            }
          />
        </div>
      </section>
    </>
  )
}
