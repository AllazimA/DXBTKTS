import type { Metadata } from 'next'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
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
import { BrandIcon, Tear } from '@/components/brand'
import { SectionHeading } from '@/components/brand/section-heading'
import { CATEGORY_ICON, FAMILY, familyOf } from '@/lib/brand'
import { PageHero } from '@/components/brand/page-hero'
import { aiImage } from '@/lib/images'

export async function generateMetadata({ params }: { params: { locale: Locale } }): Promise<Metadata> {
  return pageMetadata(params.locale, 'experiences', '/experiences')
}

export default async function ExperiencesHub({ params: { locale } }: { params: { locale: Locale } }) {
  const t = await getTranslations('catalogue')
  const th = await getTranslations('home')
  const accent = (chunks: React.ReactNode) => <span className="text-dxb-orange">{chunks}</span>

  return (
    <>
      <PageHero image={aiImage('category-signature', 'dubaiSkyline', 'A private experience in the Dubai desert at golden hour')} label={t('hubEyebrow')} title={t.rich('hubTitle', { accent })} lede={t('hubSub')} />

      <section className="pt-10 bg-dxb-sand">
        <div className="max-w-7xl mx-auto px-5 sm:px-6">
          <CategoryChips />
          <div className="mt-5">
            <IndicativeNotice />
          </div>
        </div>
      </section>

      {/* Category tiles: cut-corner photo over a caption band in the family colour */}
      <section className="pt-4 pb-16 bg-dxb-sand">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {categories.map((c, i) => {
            const from = categoryFromPrice(c.slug)
            const fam = FAMILY[familyOf(c.slug)]
            return (
              <Link key={c.slug} href={`/experiences/${c.slug}`} className="group flex flex-col dxb-cut dxb-cut-lg">
                <div className="relative aspect-[16/10] overflow-hidden bg-dxb-navy">
                  <SceneImage image={categoryImage(c.slug, c.image, c.name[locale])} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className={`flex items-end justify-between gap-4 px-5 py-4 ${fam.bg} ${fam.text}`}>
                  <div className="min-w-0">
                    <span className="flex items-center gap-2 dxb-label text-[11px] opacity-80">
                      <BrandIcon name={CATEGORY_ICON[c.slug] ?? fam.icon} className="w-4 h-4" />
                      <span dir="ltr">{String(i + 1).padStart(2, '0')}</span>
                      {from !== null && (
                        <>
                          <Tear />
                          {t('from')} <span className="dxb-data">{formatAED(from, locale)}</span>
                        </>
                      )}
                    </span>
                    <h2 className="mt-1.5 text-2xl font-extrabold tracking-[-0.02em] leading-tight">{c.name[locale]}</h2>
                  </div>
                  <BrandIcon name="arrow" className="w-5 h-5 mb-1 shrink-0 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Packages shelf */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-6">
          <SectionHeading label={pc.shelfTitle[locale]} title={pc.shelfCopy[locale]} action={{ href: '/packages', label: pc.shelfCta[locale] }} />
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {['burj-khalifa-sunset-evening', 'palm-day-to-sunset', 'private-desert-evening'].map(slug => {
              const pkg = packages.find(x => x.slug === slug)!
              return <PackageCard key={slug} pkg={pkg} locale={locale} />
            })}
          </div>
        </div>
      </section>

      {/* Products by category, with audience filters */}
      <section className="py-16 md:py-20 bg-dxb-sand">
        <div className="max-w-7xl mx-auto px-5 sm:px-6">
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
