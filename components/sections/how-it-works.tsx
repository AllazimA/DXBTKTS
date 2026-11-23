'use client'

import { useTranslations } from 'next-intl'
import { BrandIcon, Perforation } from '@/components/brand'
import { SectionHeading } from '@/components/brand/section-heading'
import { Reveal } from '@/components/brand/reveal'

const ICONS = ['search', 'confirmed', 'chat'] as const

/** Three steps drawn as three tickets on a navy ground. */
export function HowItWorks() {
  const t = useTranslations('howItWorks')
  const steps = t.raw('steps') as { title: string; copy: string }[]
  const accent = (chunks: React.ReactNode) => <span className="text-dxb-orange">{chunks}</span>

  return (
    <section className="py-20 md:py-28 bg-dxb-navy text-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-6">
        <SectionHeading index="03" label={t('eyebrow')} title={t.rich('title', { accent })} tone="dark" className="mb-12" />
        <ol className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <Reveal as="li" key={step.title} delay={i * 0.1} className="flex">
              <div className="flex w-full bg-white text-dxb-ink dxb-stub [--stub-x:78%] rtl:[--stub-x:22%]">
                <div className="flex-1 p-7 md:p-8">
                  <BrandIcon name={ICONS[i] ?? 'ticket'} className="w-7 h-7 text-dxb-cobalt" />
                  <h3 className="mt-6 text-2xl md:text-[28px] font-extrabold tracking-[-0.02em] text-dxb-navy">{step.title}</h3>
                  <p className="mt-3 text-dxb-muted leading-relaxed">{step.copy}</p>
                </div>
                <div className="relative w-[22%] flex items-center justify-center">
                  <Perforation vertical className="absolute inset-y-4 start-0 text-dxb-navy" />
                  <span className="flex flex-col items-center gap-1 text-dxb-navy" dir="ltr">
                    <span className="dxb-label text-[10px] text-dxb-muted">{t('step')}</span>
                    <span className="dxb-data text-4xl md:text-5xl font-semibold">{String(i + 1).padStart(2, '0')}</span>
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
