import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import type { Locale } from '@/i18n.config'
import { categories, getCategory, productsIn } from '@/data/catalogue'
import { alternatesFor, site } from '@/lib/site'
import { CatalogueBrowser } from '@/components/catalogue/catalogue-browser'
import { CategoryChips, IndicativeNotice } from '@/components/catalogue/catalogue-header'
import { CTABand } from '@/components/ui/cta-band'
import { BrandIcon, Tear } from '@/components/brand'
import { CATEGORY_ICON, FAMILY, familyOf } from '@/lib/brand'
import { SceneImage } from '@/components/ui/scene-image'
import { categoryImage } from '@/lib/images'

type Props = { params: { locale: Locale; category: string } }

export function generateStaticParams() {
  return categories.map(c => ({ category: c.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = getCategory(params.category)
  if (!category) return {}
  const city = { en: 'Dubai', fr: 'Dubaï', ar: 'دبي' }[params.locale]
  const title = `${category.name[params.locale]} — ${city} | ${site.name}`
  const description = category.intro[params.locale]
  return {
    title: { absolute: title },
    description,
    alternates: alternatesFor(params.locale, `/experiences/${category.slug}`),
    openGraph: { title, description, siteName: site.name, type: 'website' },
  }
}

export default async function CategoryPage({ params: { locale, category: slug } }: Props) {
  const category = getCategory(slug)
  if (!category) notFound()
  const t = await getTranslations('catalogue')
  const list = productsIn(category.slug)
  const fam = FAMILY[familyOf(category.slug)]

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: t('hubEyebrow'), item: `${site.url}/experiences` },
      { '@type': 'ListItem', position: 2, name: category.name[locale], item: `${site.url}/experiences/${category.slug}` },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      {/* Opening in the category's colour family */}
      <section className={`${fam.bg} ${fam.text}`}>
        <div className="max-w-7xl mx-auto px-5 sm:px-6 py-10 md:py-14 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-7 order-2 lg:order-1">
            <nav className="dxb-label text-[11px] opacity-80 flex items-center flex-wrap" aria-label="Breadcrumb">
              <Link href="/experiences" className="hover:underline underline-offset-4">{t('hubEyebrow')}</Link>
              <Tear />
              <span>{fam.label[locale]}</span>
            </nav>
            <div className="mt-5 flex items-center gap-4">
              <BrandIcon name={CATEGORY_ICON[category.slug] ?? fam.icon} className="w-10 h-10 md:w-12 md:h-12" strokeWidth={1.75} />
            </div>
            <h1 className="mt-4 font-display text-[44px] leading-[0.98] sm:text-6xl lg:text-[72px] tracking-[-0.035em]">{category.name[locale]}</h1>
            <p className="mt-5 text-lg md:text-xl max-w-2xl leading-relaxed opacity-85">{category.intro[locale]}</p>
            <p className="mt-4 dxb-label opacity-75">{t('count', { count: list.length })}</p>
          </div>
          <div className="lg:col-span-5 order-1 lg:order-2">
            <div className="relative aspect-[16/10] lg:aspect-[4/3] overflow-hidden dxb-cut dxb-cut-lg bg-dxb-navy">
              <SceneImage image={categoryImage(category.slug, category.image, category.name[locale])} priority sizes="(max-width: 1024px) 100vw, 40vw" className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section className="pt-8 bg-dxb-sand">
        <div className="max-w-7xl mx-auto px-5 sm:px-6">
          <CategoryChips active={category.slug} />
          <div className="mt-5">
            <IndicativeNotice />
          </div>
        </div>
      </section>

      <section className="pt-8 pb-16 md:pb-20 bg-dxb-sand">
        <div className="max-w-7xl mx-auto px-5 sm:px-6">
          <CatalogueBrowser locale={locale} category={category.slug} />
        </div>
      </section>

      <CTABand heading={t('conciergeTitle')} subheading={t('conciergeCopy')} ctaLabel={t('conciergeCta')} ctaHref="/request" />
    </>
  )
}
