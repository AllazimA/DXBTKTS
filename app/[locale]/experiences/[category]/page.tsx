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
      <section className="pt-14 md:pt-16 pb-8 bg-gradient-to-b from-dxb-ivory to-dxb-band">
        <div className="max-w-7xl mx-auto px-6">
          <nav className="text-xs text-dxb-slate mb-4" aria-label="Breadcrumb">
            <Link href="/experiences" className="hover:text-dxb-gold">{t('hubEyebrow')}</Link>
            <span className="mx-2">/</span>
            <span className="text-dxb-ink">{category.name[locale]}</span>
          </nav>
          <h1 className="font-cormorant text-5xl md:text-6xl font-light text-dxb-ink mb-4">{category.name[locale]}</h1>
          <p className="text-lg text-dxb-slate max-w-2xl leading-relaxed mb-2">{category.intro[locale]}</p>
          <p className="text-sm text-dxb-slate mb-6">{t('count', { count: list.length })}</p>
          <IndicativeNotice />
          <div className="mt-8">
            <CategoryChips active={category.slug} />
          </div>
        </div>
      </section>

      <section className="py-14 bg-dxb-ivory">
        <div className="max-w-7xl mx-auto px-6">
          <CatalogueBrowser locale={locale} category={category.slug} />
        </div>
      </section>

      <CTABand heading={t('conciergeTitle')} subheading={t('conciergeCopy')} ctaLabel={t('conciergeCta')} ctaHref="/request" />
    </>
  )
}
