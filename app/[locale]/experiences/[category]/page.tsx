import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import type { Locale } from '@/i18n.config'
import { categories, getCategory, productsIn } from '@/data/catalogue'
import { alternatesFor, site } from '@/lib/site'
import { CatalogueBrowser } from '@/components/catalogue/catalogue-browser'
import { CategoryChips, IndicativeNotice } from '@/components/catalogue/catalogue-header'
import { CTABand } from '@/components/ui/cta-band'
import { BrandIcon } from '@/components/brand'
import { familyOf } from '@/lib/brand'
import { categoryImage } from '@/lib/images'
import { PageHero, heroPrimary } from '@/components/brand/page-hero'
import type { Film } from '@/components/ui/background-film'

/** Category openings with a film (none repeats another page's opening). */
const CATEGORY_FILMS: Record<string, Film | undefined> = {
  'on-the-water': site.heroVideo ?? undefined,
  lifestyle: site.films.diningTerrace,
  signature: site.films.celebrationProposal,
}

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
      <PageHero
        image={categoryImage(category.slug, category.image, category.name[locale])}
        film={CATEGORY_FILMS[category.slug]}
        family={familyOf(category.slug)}
        locale={locale}
        label={t('hubEyebrow')}
        title={category.name[locale]}
        lede={category.intro[locale]}
      >
        <a href="#list" className={heroPrimary}>
          {t('count', { count: list.length })}
          <BrandIcon name="arrow" className="w-5 h-5 rotate-90" />
        </a>
      </PageHero>

      <section className="pt-8 bg-dxb-sand">
        <div className="max-w-7xl mx-auto px-5 sm:px-6">
          <CategoryChips active={category.slug} />
          <div className="mt-5">
            <IndicativeNotice />
          </div>
        </div>
      </section>

      <section id="list" className="pt-8 pb-16 md:pb-20 bg-dxb-sand scroll-mt-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-6">
          <CatalogueBrowser locale={locale} category={category.slug} />
        </div>
      </section>

      <CTABand heading={t('conciergeTitle')} subheading={t('conciergeCopy')} ctaLabel={t('conciergeCta')} ctaHref="/request" />
    </>
  )
}
