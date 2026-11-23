'use client'

import { useTranslations } from 'next-intl'
import { SectionHeading } from '@/components/brand/section-heading'
import { Reveal } from '@/components/brand/reveal'

/**
 * Three steps as an editorial timeline on sand: oversized outlined numerals,
 * one rule running through them, no boxes.
 */
export function HowItWorks() {
  const t = useTranslations('howItWorks')
  const steps = t.raw('steps') as { title: string; copy: string }[]
  const accent = (chunks: React.ReactNode) => <span className="text-dxb-cobalt">{chunks}</span>

  return (
    <section className="py-20 md:py-32 bg-dxb-sand text-dxb-navy overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-6">
        <SectionHeading index="03" label={t('eyebrow')} title={t.rich('title', { accent })} className="mb-14 md:mb-20" />
        <ol className="relative grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-10">
          {/* the rule that runs through the three steps */}
          <span aria-hidden className="hidden md:block absolute top-[150px] inset-x-0 h-px bg-dxb-navy/20" />
          {steps.map((step, i) => (
            <Reveal as="li" key={step.title} delay={i * 0.12} className="relative">
              <span
                aria-hidden
                dir="ltr"
                className="inline-block font-display text-[120px] md:text-[150px] leading-[0.8] tracking-[-0.06em] text-transparent [-webkit-text-stroke:1.5px_theme(colors.dxb.navy)] select-none"
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <span aria-hidden className="hidden md:block absolute top-[146px] start-0 w-2.5 h-2.5 rotate-45 bg-dxb-cobalt" />
              <span className="sr-only">{t('step')} {i + 1}</span>
              <h3 className="mt-8 md:mt-12 text-[28px] md:text-[34px] font-extrabold tracking-[-0.025em]">{step.title}</h3>
              <p className="mt-3 text-dxb-muted text-lg leading-relaxed max-w-[32ch]">{step.copy}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
