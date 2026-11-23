'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { aiImage } from '@/lib/images'
import { BrandIcon, BrandSymbol, MonoLabel } from '@/components/brand'
import { Reveal } from '@/components/brand/reveal'

const IMG = aiImage('section-philosophy', 'burjAlArabAerial').src ?? ''

export function Philosophy() {
  const t = useTranslations('philosophy')
  const accent = (chunks: React.ReactNode) => <span className="text-dxb-cobalt">{chunks}</span>

  return (
    <section className="py-20 md:py-28 bg-dxb-sand overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        <Reveal className="lg:col-span-6 relative pb-14 lg:pb-0">
          <div className="relative aspect-[4/5] overflow-hidden dxb-cut dxb-cut-lg bg-dxb-navy">
            <Image src={IMG} alt={t('imageAlt')} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
          </div>
          {/* Quote as a navy ticket stub */}
          <div className="absolute bottom-0 lg:-bottom-8 end-4 lg:-end-8 max-w-[19rem] bg-dxb-navy text-white dxb-cut p-6 md:p-7">
            <BrandSymbol className="h-6 text-dxb-orange" />
            <p className="mt-4 text-xl md:text-2xl font-extrabold leading-snug tracking-[-0.015em]">{t('quote')}</p>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-6">
          <MonoLabel parts={['04', t('eyebrow')]} className="text-dxb-cobalt" />
          <h2 className="font-display text-4xl md:text-5xl lg:text-[56px] text-dxb-navy mt-4 mb-7">{t.rich('title', { accent })}</h2>
          <div className="space-y-5 text-dxb-ink/80 leading-relaxed text-lg">
            <p>{t('p1')}</p>
            <p>{t('p2')}</p>
          </div>
          <Link href="/about" className="group mt-9 inline-flex items-center gap-2 h-12 px-6 border-2 border-dxb-navy text-dxb-navy font-bold transition-colors hover:bg-dxb-navy hover:text-white">
            {t('cta')}
            <BrandIcon name="arrow" className="w-4 h-4 transition-transform group-hover:translate-x-1 rtl:rotate-180" />
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
