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
import { BrandIcon } from '@/components/brand'
import { SectionHeading } from '@/components/brand/section-heading'
import { CATEGORY_ICON, FAMILY, familyOf } from '@/lib/brand'
import { PageHero } from '@/components/brand/page-hero'
import { site } from '@/lib/site'

export async function generateMetadata({ params }: { params: { locale: Locale } }): Promise<Metadata> {
  return pageMetadata(params.locale, 'experiences', '/experiences')
}

export default async function ExperiencesHub({ params: { locale } }: { params: { locale: Locale } }) {
  const t = await getTranslations('catalogue')
  const th = await getTranslations('home')
  const accent = (chunks: React.ReactNode) => <span className="text-dxb-orange">{chunks}</span>

  return (
    <>
      <PageHero image={{ src: site.films.experiencesBeach.poster, alt: 'A couple walking along a quiet UAE beach at sunset' }} film={site.films.experiencesBeach} label={t('hubEyebrow')} title={t.rich('hubTitle', { accent })} lede={t('hubSub')} />

      <section className="pt-10 bg-dxb-sand">
        <div className="max-w-7xl mx-auto px-5 sm:px-6">
          <CategoryChips />
          <div className="mt-5">
            <IndicativeNotice />
          </div>
        </div>
      </section>

      {/* Category tiles: tall photographs, the name set on the image */}
      <section className="pt-8 pb-20 bg-dxb-sand">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {categories.map((c, i) => {
            const from = categoryFromPrice(c.slug)
            const fam = FAMILY[familyOf(c.slug)]
            return (
              <Link
                key={c.slug}
                href={`/experiences/${c.slug}`}
                className={`group relative overflow-hidden bg-dxb-ink text-white dxb-cut dxb-cut-lg ${i === 0 ? 'sm:col-span-2 lg:col-span-2 lg:row-span-2 aspect-[4/5] sm:aspect-[16/10] lg:aspect-auto' : 'aspect-[4/5]'}`}
              >
                <SceneImage image={categoryImage(c.slug, c.image, c.name[locale])} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.06]" />
                <div className="absolute inset-0 bg-gradient-to-t from-dxb-ink via-dxb-ink/25 to-transparent" />
                <div className="absolute top-4 start-4 inline-flex items-center gap-2 dxb-glass h-8 px-3 dxb-label text-[11px]">
                  <span className={`h-2.5 w-2.5 ${fam.bg}`} aria-hidden="true" />
                  <BrandIcon name={CATEGORY_ICON[c.slug] ?? fam.icon} className="w-4 h-4" />
                  <span dir="ltr">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <div className="absolute bottom-0 inset-x-0 p-6 md:p-7 flex items-end justify-between gap-4">
                  <div>
                    <h2 className={`font-display tracking-[-0.035em] leading-[0.95] ${i === 0 ? 'text-5xl md:text-7xl' : 'text-[34px] md:text-4xl'}`}>{c.name[locale]}</h2>
                    {from !== null && (
                      <p className="mt-2 dxb-label text-[11px] text-white/75">
                        {t('from')} <span className="dxb-data text-dxb-orange">{formatAED(from, locale)}</span>
                      </p>
                    )}
                  </div>
                  <span className="grid place-items-center w-11 h-11 shrink-0 bg-white text-dxb-navy transition-colors group-hover:bg-dxb-orange group-hover:text-dxb-ink">
                    <BrandIcon name="arrow" className="w-5 h-5 rtl:rotate-180" />
                  </span>
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
