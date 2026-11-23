'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { BrandIcon, Perforation } from '@/components/brand'
import { SectionHeading } from '@/components/brand/section-heading'
import { Reveal } from '@/components/brand/reveal'

const visuals = [
  { icon: 'ticket', href: '/experiences' },
  { icon: 'concierge', href: '/services' },
  { icon: 'membership', href: '/membership' },
] as const

/** Three ways in — three white passes on the gulf-cobalt brand field. */
export function Clientele() {
  const t = useTranslations('clientele')
  const tiers = t.raw('tiers') as { title: string; desc: string; cta: string }[]
  const accent = (chunks: React.ReactNode) => <span className="text-dxb-orange">{chunks}</span>

  return (
    <section className="py-20 md:py-28 bg-dxb-cobalt text-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-6">
        <SectionHeading index="06" label={t('eyebrow')} title={t.rich('title', { accent })} tone="dark" className="mb-12" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tiers.map((tier, i) => {
            const visual = visuals[i]
            return (
              <Reveal key={tier.title} delay={i * 0.1} className="dxb-lift">
                <Link href={visual.href} className="group flex h-full flex-col">
                  <div className="flex-1 bg-white text-dxb-ink dxb-cut p-7 md:p-8">
                    <span className="grid place-items-center w-12 h-12 bg-dxb-sand text-dxb-cobalt">
                      <BrandIcon name={visual.icon} className="w-6 h-6" />
                    </span>
                    <h3 className="mt-6 text-2xl md:text-[28px] font-extrabold tracking-[-0.02em] text-dxb-navy">{tier.title}</h3>
                    <p className="mt-3 text-dxb-muted leading-relaxed">{tier.desc}</p>
                  </div>
                  <div className="relative bg-white dxb-notch-top px-7 md:px-8 py-4 flex items-center justify-between">
                    <Perforation className="absolute top-0 inset-x-3 text-dxb-navy" />
                    <span className="text-[15px] font-bold text-dxb-cobalt">{tier.cta}</span>
                    <span className="grid place-items-center w-9 h-9 bg-dxb-orange text-dxb-ink transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5">
                      <BrandIcon name="arrow" className="w-4 h-4 rtl:rotate-180" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
