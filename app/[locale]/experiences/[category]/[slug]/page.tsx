import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import { Check, X, Clock, Users, Info, ShieldCheck } from 'lucide-react'
import type { Locale } from '@/i18n.config'
import { getCategory, getProduct, products, fromPrice } from '@/data/catalogue'
import { formatAED } from '@/lib/catalogue/money'
import { productImage } from '@/lib/images'
import { alternatesFor, site } from '@/lib/site'
import { SceneImage } from '@/components/ui/scene-image'
import { BookingPanel } from '@/components/catalogue/booking-panel'
import { ProductCard } from '@/components/catalogue/product-card'
import { DoorToDoor } from '@/components/catalogue/door-to-door'
import { upgrades, TRANSPORT_INCLUDED } from '@/data/upgrades'
import { addonsCopy as ac } from '@/content/addons'
import { shoppingPanel as sp } from '@/content/curated-pages'
import { ServiceRequestForm } from '@/components/forms/service-request-form'

type Props = { params: { locale: Locale; category: string; slug: string } }

export function generateStaticParams() {
  return products.map(p => ({ category: p.category, slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = getProduct(params.slug)
  if (!product || product.category !== params.category) return {}
  const title = `${product.name[params.locale]} | ${site.name}`
  const description = product.tagline[params.locale]
  return {
    title: { absolute: title },
    description,
    alternates: alternatesFor(params.locale, `/experiences/${product.category}/${product.slug}`),
    openGraph: { title, description, siteName: site.name, type: 'website' },
  }
}

function List({ items, icon }: { items: string[]; icon: 'check' | 'x' | 'info' }) {
  const Icon = icon === 'check' ? Check : icon === 'x' ? X : Info
  const colour = icon === 'check' ? 'text-dxb-gold' : 'text-dxb-slate'
  return (
    <ul className="space-y-2.5">
      {items.map(item => (
        <li key={item} className="flex gap-3 text-dxb-slate leading-relaxed">
          <Icon className={`w-4 h-4 mt-1 shrink-0 ${colour}`} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

export default async function ProductPage({ params: { locale, category: categorySlug, slug } }: Props) {
  const product = getProduct(slug)
  if (!product || product.category !== categorySlug) notFound()
  const category = getCategory(product.category)!
  const t = await getTranslations('catalogue')
  const related = product.related.map(getProduct).filter((p): p is NonNullable<typeof p> => Boolean(p))

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: t('hubEyebrow'), item: `${site.url}/experiences` },
        { '@type': 'ListItem', position: 2, name: category.name[locale], item: `${site.url}/experiences/${category.slug}` },
        { '@type': 'ListItem', position: 3, name: product.name[locale], item: `${site.url}/experiences/${category.slug}/${product.slug}` },
      ],
    },
    ...(product.faq[locale].length
      ? [
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: product.faq[locale].map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
          },
        ]
      : []),
    // Product/Offer markup is added only once prices are backed by supplier
    // agreements (priceVerified), so search engines never show placeholders.
  ]

  const stepUps = (upgrades[product.slug] ?? []).map(slug => getProduct(slug)).filter((x): x is NonNullable<typeof x> => !!x)

  const sections: { title: string; items: string[]; icon: 'check' | 'x' | 'info' }[] = [
    { title: t('highlights'), items: product.highlights[locale], icon: 'check' },
    { title: t('included'), items: product.included[locale], icon: 'check' },
    { title: t('notIncluded'), items: product.notIncluded[locale], icon: 'x' },
    { title: t('goodToKnow'), items: product.goodToKnow[locale], icon: 'info' },
  ]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="bg-dxb-ivory pt-8 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <nav className="text-xs text-dxb-slate mb-6" aria-label="Breadcrumb">
            <Link href="/experiences" className="hover:text-dxb-gold">{t('hubEyebrow')}</Link>
            <span className="mx-2">/</span>
            <Link href={`/experiences/${category.slug}`} className="hover:text-dxb-gold">{category.name[locale]}</Link>
            <span className="mx-2">/</span>
            <span className="text-dxb-ink">{product.name[locale]}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_400px] gap-10 lg:gap-14 items-start">
            {/* Left: content */}
            <div className="min-w-0">
              <div className="relative aspect-[16/10] overflow-hidden bg-dxb-ink">
                <SceneImage image={productImage(product.slug, product.image, product.name[locale])} sizes="(max-width: 1024px) 100vw, 60vw" priority className="object-cover" />
              </div>

              <h1 className="font-cormorant text-4xl md:text-5xl font-light text-dxb-ink mt-8 leading-tight">{product.name[locale]}</h1>
              <p className="text-lg text-dxb-slate mt-3 leading-relaxed">{product.tagline[locale]}</p>

              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-dxb-ink">
                <span className="inline-flex items-center gap-2"><Clock className="w-4 h-4 text-dxb-gold" /> {product.duration[locale]}</span>
                <span className="inline-flex items-center gap-2"><Users className="w-4 h-4 text-dxb-gold" /> {product.groupSize[locale]}</span>
                <span className="inline-flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-dxb-gold" /> {t(`confirmation.${product.confirmation}`)}</span>
              </div>

              <p className="mt-6 text-dxb-ink">
                <span className="text-sm text-dxb-slate">{t('from')} </span>
                <span className="text-2xl font-semibold">{fromPrice(product) === null ? t('onRequest') : formatAED(fromPrice(product)!, locale)}</span>{' '}
                <span className="text-sm text-dxb-slate">{t(`priceType.${product.priceType}`)}</span>
                {!product.priceVerified && (
                  <span className="ms-3 align-middle text-[10px] uppercase tracking-wider text-dxb-gold border border-dxb-gold/40 px-2 py-0.5">{t('indicative')}</span>
                )}
              </p>

              <p className="mt-8 text-dxb-slate text-lg leading-relaxed">{product.description[locale]}</p>

              {(product.suits?.length || product.vip) && (
                <div className="mt-8 border-y border-dxb-band py-5 space-y-3">
                  {product.suits?.length ? (
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-dxb-slate me-2">{t('idealFor')}</span>
                      {product.suits.map(s => (
                        <span key={s} className="px-3 py-1 text-xs border border-dxb-ink/15 text-dxb-ink">{t(`suits.${s}`)}</span>
                      ))}
                    </div>
                  ) : null}
                  {product.vip && <p className="text-sm text-dxb-ink"><span className="text-dxb-gold">◆</span> {product.vip[locale]}</p>}
                </div>
              )}

              {stepUps.length > 0 && (
                <div className="mt-10 border border-dxb-gold/40 bg-white p-6">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-dxb-gold">{ac.stepUpTitle[locale]}</p>
                  <p className="mt-1 text-sm text-dxb-slate">{ac.stepUpCopy[locale]}</p>
                  <ul className="mt-4 divide-y divide-dxb-band">
                    {stepUps.map(u => (
                      <li key={u.slug}>
                        <Link href={`/experiences/${u.category}/${u.slug}`} className="group flex items-center justify-between gap-4 py-3">
                          <span className="min-w-0">
                            <span className="block font-cormorant text-xl text-dxb-ink group-hover:text-dxb-gold">{u.name[locale]}</span>
                            <span className="block text-xs text-dxb-slate truncate">{u.tagline[locale]}</span>
                          </span>
                          <span className="text-sm text-dxb-ink whitespace-nowrap">
                            {fromPrice(u) === null ? t('onRequest') : `${ac.from[locale]} ${formatAED(fromPrice(u)!, locale)}`}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-10">
                {sections
                  .filter(s => s.items.length)
                  .map(s => (
                    <div key={s.title}>
                      <h2 className="font-cormorant text-2xl text-dxb-ink mb-4">{s.title}</h2>
                      <List items={s.items} icon={s.icon} />
                    </div>
                  ))}
              </div>

              {product.faq[locale].length > 0 && (
                <div className="mt-12">
                  <h2 className="font-cormorant text-2xl text-dxb-ink mb-4">{t('faq')}</h2>
                  <div className="divide-y divide-dxb-band border-y border-dxb-band">
                    {product.faq[locale].map(f => (
                      <details key={f.q} className="group py-4">
                        <summary className="cursor-pointer list-none flex justify-between gap-4 font-semibold text-dxb-ink">
                          {f.q}
                          <span className="text-dxb-gold group-open:rotate-45 transition-transform">+</span>
                        </summary>
                        <p className="mt-3 text-dxb-slate leading-relaxed">{f.a}</p>
                      </details>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-12 bg-dxb-band p-6 md:p-8">
                <h2 className="font-cormorant text-2xl text-dxb-ink">{t('conciergeTitle')}</h2>
                <p className="text-dxb-slate mt-2 mb-4">{t('conciergeCopy')}</p>
                <Link href="/request" className="text-sm font-semibold text-dxb-gold underline underline-offset-4">{t('conciergeCta')}</Link>
              </div>
            </div>

            {/* Right: booking panel */}
            <aside className="lg:sticky lg:top-28" id="book">
              {product.quoteOnly && product.category === 'shopping' ? (
                <div className="bg-dxb-ink text-white p-7 md:p-8">
                  <p className="text-xs font-semibold tracking-[0.25em] uppercase text-dxb-gold">{sp.bespoke[locale]}</p>
                  <h2 className="mt-3 font-cormorant text-3xl">{sp.title[locale]}</h2>
                  <p className="mt-3 mb-7 text-white/70 text-sm leading-relaxed">{sp.copy[locale]}</p>
                  <ServiceRequestForm id="shopping-request" kind="shopping" compact hidden={{ product: product.name.en }} />
                  <Link href="/sourcing" className="mt-6 block text-sm text-dxb-gold underline underline-offset-4">{sp.sourcingLink[locale]}</Link>
                </div>
              ) : product.quoteOnly ? (
                <div className="bg-dxb-ink text-white p-8">
                  <p className="font-cormorant text-3xl">{t('onRequest')}</p>
                  <p className="mt-3 text-white/70">{t('conciergeCopy')}</p>
                  <Link
                    href={product.category === 'shopping' ? `/request?service=shopping&event=${encodeURIComponent(product.name.en)}` : '/request'}
                    className="mt-6 inline-block px-6 py-3 bg-dxb-clay text-white text-sm font-semibold uppercase tracking-[0.12em]"
                  >
                    {t('conciergeCta')}
                  </Link>
                </div>
              ) : (
                <>
                  <BookingPanel product={product} />
                  {product.category !== 'transfers' && !TRANSPORT_INCLUDED.has(product.slug) && <DoorToDoor locale={locale} />}
                </>
              )}
            </aside>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="py-16 bg-dxb-band">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="font-cormorant text-3xl md:text-4xl text-dxb-ink mb-8">{t('related')}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map(p => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
