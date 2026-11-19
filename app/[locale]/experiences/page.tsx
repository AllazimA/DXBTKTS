import type { Metadata } from 'next'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import { ArrowRight } from 'lucide-react'
import type { Locale } from '@/i18n.config'
import { categories, categoryFromPrice } from '@/data/catalogue'
import { formatAED } from '@/lib/catalogue/money'
import { categoryImage } from '@/lib/images'
import { pageMetadata } from '@/lib/metadata'
import { SceneImage } from '@/components/ui/scene-image'
import { CatalogueBrowser } from '@/components/catalogue/catalogue-browser'
import { CategoryChips, IndicativeNotice } from '@/components/catalogue/catalogue-header'
import { HowItWorks } from '@/components/sections/how-it-works'
import { CTABand } from '@/components/ui/cta-band'
import { packages } from '@/data/packages'
import { packagesCopy as pc } from '@/content/packages'
import { PackageCard } from '@/components/packages/package-card'

export async function generateMetadata({ params }: { params: { locale: Locale } }): Promise<Metadata> {
  return pageMetadata(params.locale, 'experiences', '/experiences')
}

export default async function ExperiencesHub({ params: { locale } }: { params: { locale: Locale } }) {
  const t = await getTranslations('catalogue')
  const th = await getTranslations('home')
  const accent = (chunks: React.ReactNode) => <span className="italic text-dxb-gold">{chunks}</span>

  return (
    <>
      <section className="pt-16 md:pt-20 pb-10 bg-gradient-to-b from-dxb-ivory to-dxb-band">
        <div className="max-w-7xl mx-auto px-6">
          <span className="text-xs font-semibold tracking-[0.35em] text-dxb-gold uppercase">{t('hubEyebrow')}</span>
          <h1 className="font-cormorant text-5xl md:text-6xl font-light text-dxb-ink mt-4 mb-5">{t.rich('hubTitle', { accent })}</h1>
          <p className="text-lg text-dxb-slate max-w-2xl leading-relaxed mb-6">{t('hubSub')}</p>
          <IndicativeNotice />
          <div className="mt-8">
            <CategoryChips />
          </div>
        </div>
      </section>

      {/* Category tiles */}
      <section className="py-14 bg-dxb-band">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map(c => {
            const from = categoryFromPrice(c.slug)
            return (
              <Link key={c.slug} href={`/experiences/${c.slug}`} className="group relative aspect-[4/3] overflow-hidden bg-dxb-ink">
                <SceneImage image={categoryImage(c.slug, c.image, c.name[locale])} sizes="(max-width: 1024px) 50vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-dxb-ink/90 via-dxb-ink/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4 md:p-6">
                  <h2 className="font-cormorant text-2xl md:text-3xl text-white">{c.name[locale]}</h2>
                  {from !== null && (
                    <p className="text-xs md:text-sm text-white/75 mt-1">
                      {t('from')} {formatAED(from, locale)}
                    </p>
                  )}
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Packages shelf */}
      <section className="py-14 bg-dxb-ivory">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <span className="text-xs font-semibold tracking-[0.35em] text-dxb-gold uppercase">{pc.shelfTitle[locale]}</span>
              <p className="mt-3 font-cormorant text-3xl md:text-4xl text-dxb-ink max-w-2xl">{pc.shelfCopy[locale]}</p>
            </div>
            <Link href="/packages" className="inline-flex items-center gap-2 text-sm font-semibold text-dxb-clay">
              {pc.shelfCta[locale]} <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </Link>
          </div>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {['burj-khalifa-sunset-evening', 'palm-day-to-sunset', 'private-desert-evening'].map(slug => {
              const pkg = packages.find(x => x.slug === slug)!
              return <PackageCard key={slug} pkg={pkg} locale={locale} />
            })}
          </div>
        </div>
      </section>

      {/* Products by category, with audience filters */}
      <section className="py-16 bg-dxb-ivory">
        <div className="max-w-7xl mx-auto px-6">
          <CatalogueBrowser locale={locale} />
        </div>
      </section>

      <HowItWorks />
      <CTABand
        heading={th.rich('ctaHeading', { accent })}
        subheading={t('conciergeCopy')}
        ctaLabel={t('conciergeCta')}
        ctaHref="/request"
      />
    </>
  )
}
