import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import { Clock, Users, ShieldCheck, Info } from 'lucide-react'
import type { Locale } from '@/i18n.config'
import { packages, getPackage } from '@/data/packages'
import { packagesCopy as c } from '@/content/packages'
import { getCategory } from '@/data/catalogue'
import { aiImage } from '@/lib/images'
import { formatAED } from '@/lib/catalogue/money'
import { packageLines, packageTotal } from '@/lib/catalogue/packages'
import { absoluteUrl, alternatesFor, site } from '@/lib/site'
import { SceneImage } from '@/components/ui/scene-image'
import { AddPackageButton } from '@/components/packages/add-package-button'
import { PackageCard } from '@/components/packages/package-card'

type Props = { params: { locale: Locale; slug: string } }

export function generateStaticParams() {
  return packages.map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = getPackage(params.slug)
  if (!p) return {}
  const title = `${p.name[params.locale]} — ${c.eyebrow[params.locale]} | ${site.name}`
  const description = p.tagline[params.locale]
  return { title: { absolute: title }, description, alternates: alternatesFor(params.locale, `/packages/${p.slug}`), openGraph: { title, description, siteName: site.name, type: 'website' } }
}

export default async function PackagePage({ params: { locale, slug } }: Props) {
  const p = getPackage(slug)
  if (!p) notFound()
  const t = await getTranslations('catalogue')
  const lines = packageLines(p)
  const total = packageTotal(p)
  const img = aiImage(p.image.slot, p.image.fallback, p.name[locale])
  const unverified = lines.some(l => !l.product.priceVerified)
  const more = packages.filter(x => x.slug !== p.slug && (x.theme === p.theme || x.suits.some(s => p.suits.includes(s)))).slice(0, 3)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: site.name, item: absoluteUrl(locale, '/') },
      { '@type': 'ListItem', position: 2, name: c.eyebrow[locale], item: absoluteUrl(locale, '/packages') },
      { '@type': 'ListItem', position: 3, name: p.name[locale], item: absoluteUrl(locale, `/packages/${p.slug}`) },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="bg-dxb-ivory pt-8 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <nav className="text-xs text-dxb-slate mb-6" aria-label="Breadcrumb">
            <Link href="/packages" className="hover:text-dxb-gold">{c.eyebrow[locale]}</Link>
            <span className="mx-2">/</span>
            <span className="text-dxb-ink">{p.name[locale]}</span>
          </nav>
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_400px] gap-10 lg:gap-14 items-start">
            <div className="min-w-0">
              <div className="relative aspect-[16/10] overflow-hidden bg-dxb-ink">
                <SceneImage image={img} sizes="(max-width: 1024px) 100vw, 60vw" priority className="object-cover" />
              </div>
              <span className="mt-8 inline-block text-[11px] font-semibold uppercase tracking-[0.25em] text-dxb-gold">{c.themes[p.theme][locale]}</span>
              <h1 className="font-cormorant text-4xl md:text-5xl font-light text-dxb-ink mt-2 leading-tight">{p.name[locale]}</h1>
              <p className="text-lg text-dxb-slate mt-3 leading-relaxed">{p.tagline[locale]}</p>
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-dxb-ink">
                <span className="inline-flex items-center gap-2"><Clock className="w-4 h-4 text-dxb-gold" /> {p.duration[locale]}</span>
                <span className="inline-flex items-center gap-2"><Users className="w-4 h-4 text-dxb-gold" /> {p.party[locale]}</span>
                <span className="inline-flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-dxb-gold" /> {p.booking === 'instant' ? c.instant[locale] : c.concierge[locale]}</span>
              </div>
              <p className="mt-8 text-dxb-slate text-lg leading-relaxed">{p.description[locale]}</p>

              <h2 className="mt-12 font-cormorant text-3xl text-dxb-ink">{c.howItRuns[locale]}</h2>
              <ol className="mt-5 space-y-3">
                {p.flow[locale].map((step, i) => (
                  <li key={step} className="flex gap-4 text-dxb-ink">
                    <span className="font-cormorant text-2xl leading-none text-dxb-gold w-7 shrink-0" dir="ltr">{i + 1}</span>
                    <span className="pt-0.5">{step}</span>
                  </li>
                ))}
              </ol>
              {p.note && (
                <p className="mt-8 flex gap-3 border-s-2 border-dxb-gold ps-4 text-sm text-dxb-slate">
                  <Info className="w-4 h-4 mt-0.5 shrink-0 text-dxb-gold" /> {p.note[locale]}
                </p>
              )}
            </div>

            <aside className="lg:sticky lg:top-28 bg-white border border-dxb-band p-6 md:p-7">
              <h2 className="text-xs font-semibold tracking-[0.2em] uppercase text-dxb-slate">{c.inThePackage[locale]}</h2>
              <ul className="mt-4 divide-y divide-dxb-band">
                {lines.map(l => {
                  const cat = getCategory(l.product.category)
                  return (
                    <li key={l.item.key} className="py-3 flex justify-between gap-4">
                      <div className="min-w-0">
                        <Link href={`/experiences/${cat?.slug}/${l.product.slug}`} className="text-sm font-semibold text-dxb-ink hover:text-dxb-gold">{l.product.name[locale]}</Link>
                        <p className="text-xs text-dxb-slate mt-0.5">{l.variant.name[locale]}</p>
                      </div>
                      <span className="text-sm text-dxb-ink whitespace-nowrap">{formatAED(l.total, locale)}</span>
                    </li>
                  )
                })}
              </ul>
              <div className="mt-4 flex items-baseline justify-between border-t border-dxb-ink/20 pt-4">
                <span className="text-sm text-dxb-slate">{c.from[locale]}</span>
                <span className="text-2xl font-semibold text-dxb-ink">{formatAED(total, locale)}</span>
              </div>
              <p className="mt-1 text-xs text-dxb-slate">{p.party[locale]}</p>
              {unverified && <p className="mt-2 text-xs text-dxb-gold">{t('indicativeNote')}</p>}
              <p className="mt-3 text-xs text-dxb-slate leading-relaxed">{c.sumNote[locale]}</p>
              <div className="mt-5">
                <AddPackageButton items={p.items} locale={locale} multiDay={p.multiDay} />
              </div>
              <p className="mt-5 text-xs text-dxb-slate">
                {c.tailor[locale]}{' '}
                <Link href="/request" className="font-semibold text-dxb-gold underline underline-offset-4">{c.tailorCta[locale]}</Link>
              </p>
            </aside>
          </div>
        </div>
      </section>

      {more.length > 0 && (
        <section className="py-16 bg-dxb-band">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="font-cormorant text-3xl md:text-4xl text-dxb-ink mb-8">{c.shelfTitle[locale]}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {more.map(x => (
                <PackageCard key={x.slug} pkg={x} locale={locale} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
