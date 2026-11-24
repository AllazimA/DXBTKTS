import type { Metadata } from 'next'
import type { Locale } from '@/i18n.config'
import { pageMetadata } from '@/lib/metadata'
import { packages, type Package } from '@/data/packages'
import { packagesCopy as c } from '@/content/packages'
import { PackageCard } from '@/components/packages/package-card'
import { IndicativeNotice } from '@/components/catalogue/catalogue-header'
import { PageHero } from '@/components/brand/page-hero'
import { site } from '@/lib/site'

const THEMES: Package['theme'][] = ['first-visit', 'downtown', 'palm', 'family', 'desert', 'romance']

export async function generateMetadata({ params }: { params: { locale: Locale } }): Promise<Metadata> {
  return pageMetadata(params.locale, 'packages', '/packages')
}

export default function PackagesPage({ params: { locale } }: { params: { locale: Locale } }) {
  return (
    <>
      <PageHero image={{ src: site.films.transfersArrival.poster, alt: 'A chauffeur opening the car door for a guest at a Dubai hotel' }} film={site.films.transfersArrival} label={c.eyebrow[locale]} title={c.title[locale]} lede={c.lede[locale]} />

      <section className="bg-dxb-sand">
        <div className="max-w-7xl mx-auto px-6 py-14 md:py-20">
          <IndicativeNotice />
          {THEMES.map(theme => {
            const list = packages.filter(p => p.theme === theme)
            if (!list.length) return null
            return (
              <div key={theme} className="mt-12 first:mt-6">
                <h2 className="font-display text-3xl md:text-4xl text-dxb-navy border-b border-dxb-ink/15 pb-3">{c.themes[theme][locale]}</h2>
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {list.map(p => (
                    <PackageCard key={p.slug} pkg={p} locale={locale} />
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </>
  )
}
