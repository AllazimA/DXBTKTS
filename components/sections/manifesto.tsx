import { useTranslations } from 'next-intl'
import { products, categories } from '@/data/catalogue'
import { MonoLabel } from '@/components/brand'
import { Reveal } from '@/components/brand/reveal'

/** A single editorial statement, then the house in numbers (all counted, none invented). */
export function Manifesto() {
  const t = useTranslations('manifesto')
  const stats = [
    { n: String(products.length), label: t('stats.experiences') },
    { n: String(categories.length).padStart(2, '0'), label: t('stats.categories') },
    { n: '03', label: t('stats.languages') },
    { n: '01', label: t('stats.team') },
  ]
  return (
    <section className="bg-dxb-sand pt-20 md:pt-32 pb-20 md:pb-28">
      <div className="max-w-7xl mx-auto px-5 sm:px-6">
        <Reveal>
          <MonoLabel parts={['DXB TKTS', t('label')]} className="text-dxb-cobalt" />
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mt-8 font-display text-[34px] leading-[1.06] sm:text-5xl lg:text-[68px] text-dxb-navy tracking-[-0.03em] max-w-[22ch]">
            {t('statement')}
          </p>
        </Reveal>
        <dl className="mt-16 md:mt-24 grid grid-cols-2 lg:grid-cols-4 border-t-2 border-dxb-navy">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={0.1 + i * 0.06} className="py-6 md:py-8 pe-6 border-b border-dxb-line lg:border-b-0 lg:border-e lg:last:border-e-0 lg:ps-6 lg:first:ps-0">
              <dt className="dxb-label text-[11px] text-dxb-muted">{s.label}</dt>
              <dd className="mt-2 dxb-data text-5xl md:text-6xl font-semibold text-dxb-navy" dir="ltr">{s.n}</dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  )
}
