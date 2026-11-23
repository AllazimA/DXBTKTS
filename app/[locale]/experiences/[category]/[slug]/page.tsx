import { shareImage } from '@/lib/metadata'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import { Check, X, Info } from 'lucide-react'
import type { Locale } from '@/i18n.config'
import { getCategory, getProduct, products, fromPrice } from '@/data/catalogue'
import { formatAED } from '@/lib/catalogue/money'
import { productImage } from '@/lib/images'
import { alternatesFor, site, whatsappLink } from '@/lib/site'
import { BookingPanel } from '@/components/catalogue/booking-panel'
import { ProductCard } from '@/components/catalogue/product-card'
import { DoorToDoor } from '@/components/catalogue/door-to-door'
import { upgrades, TRANSPORT_INCLUDED } from '@/data/upgrades'
import { addonsCopy as ac } from '@/content/addons'
import { shoppingPanel as sp } from '@/content/curated-pages'
import { ServiceRequestForm } from '@/components/forms/service-request-form'
import { BrandIcon, Tear } from '@/components/brand'
import { SectionHeading } from '@/components/brand/section-heading'
import { familyOf } from '@/lib/brand'
import { PageHero, heroPrimary, heroSecondary } from '@/components/brand/page-hero'
import { WhatsAppIcon } from '@/components/ui/whatsapp-icon'

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
    openGraph: { title, description, siteName: site.name, type: 'website', images: [shareImage] },
  }
}

function List({ items, icon }: { items: string[]; icon: 'check' | 'x' | 'info' }) {
  const Icon = icon === 'check' ? Check : icon === 'x' ? X : Info
  const colour = icon === 'check' ? 'text-dxb-cobalt' : icon === 'x' ? 'text-dxb-red' : 'text-dxb-muted'
  return (
    <ul className="space-y-2.5">
      {items.map(item => (
        <li key={item} className="flex gap-3 text-dxb-ink/80 leading-relaxed">
          <Icon className={`w-4 h-4 mt-1 shrink-0 ${colour}`} strokeWidth={2.5} />
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

  const fam = familyOf(category.slug)
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

      <PageHero
        size="medium"
        image={productImage(product.slug, product.image, product.name[locale])}
        family={fam}
        locale={locale}
        label={category.name[locale]}
        title={product.name[locale]}
        lede={product.tagline[locale]}
      >
        <a href="#book" className={heroPrimary}>
          {fromPrice(product) === null ? t('conciergeCta') : `${t('from')} ${formatAED(fromPrice(product)!, locale)}`}
          <BrandIcon name="arrow" className="w-5 h-5 rotate-90" />
        </a>
        <a href={whatsappLink(`Hello DXB TKTS, I'm interested in ${product.name.en}`)} target="_blank" rel="noopener noreferrer" className={heroSecondary}>
          <WhatsAppIcon className="w-5 h-5 text-[#25D366]" />
          WhatsApp
        </a>
      </PageHero>

      <section className="bg-dxb-sand pt-8 pb-16 md:pb-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-6">
          <nav className="dxb-label text-[11px] text-dxb-muted mb-6 flex flex-wrap items-center" aria-label="Breadcrumb">
            <Link href="/experiences" className="hover:text-dxb-cobalt">{t('hubEyebrow')}</Link>
            <Tear />
            <Link href={`/experiences/${category.slug}`} className="hover:text-dxb-cobalt">{category.name[locale]}</Link>
            <Tear />
            <span className="text-dxb-navy">{product.name[locale]}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_400px] gap-10 lg:gap-14 items-start">
            {/* Left: content */}
            <div className="min-w-0">
              {/* Data strip: the ticket's facts, in mono */}
              <div className="dxb-lift">
                <div className="bg-white dxb-stub-h [--stub-y:50%] grid grid-cols-1 sm:grid-cols-[1fr_1fr_1fr_auto] divide-y sm:divide-y-0 sm:divide-x divide-dxb-line rtl:divide-x-reverse">
                  {[
                    { icon: 'clock' as const, value: product.duration[locale] },
                    { icon: 'guests' as const, value: product.groupSize[locale] },
                    { icon: product.confirmation === 'instant' ? ('confirmed' as const) : ('chat' as const), value: t(`confirmation.${product.confirmation}`) },
                  ].map(d => (
                    <div key={d.icon} className="flex items-center gap-3 px-5 py-4">
                      <BrandIcon name={d.icon} className="w-5 h-5 text-dxb-cobalt" />
                      <span className="text-[14px] font-semibold text-dxb-navy leading-snug">{d.value}</span>
                    </div>
                  ))}
                  <div className="px-5 py-4 bg-dxb-navy text-white sm:min-w-[200px]">
                    <span className="block dxb-label text-[10px] text-white/60">{fromPrice(product) === null ? '' : t('from')}</span>
                    <span className="block dxb-data text-xl font-semibold text-dxb-orange">{fromPrice(product) === null ? t('onRequest') : formatAED(fromPrice(product)!, locale)}</span>
                    <span className="block text-[12px] text-white/65">
                      {t(`priceType.${product.priceType}`)}
                      {!product.priceVerified && <> <Tear /> {t('indicative')}</>}
                    </span>
                  </div>
                </div>
              </div>

              <p className="mt-9 text-dxb-ink/80 text-lg leading-relaxed">{product.description[locale]}</p>

              {(product.suits?.length || product.vip) && (
                <div className="mt-8 border-y border-dxb-line py-5 space-y-3">
                  {product.suits?.length ? (
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="dxb-label text-[11px] text-dxb-muted me-2">{t('idealFor')}</span>
                      {product.suits.map(s => (
                        <span key={s} className="h-8 inline-flex items-center px-3 text-[13px] font-semibold bg-white text-dxb-navy">{t(`suits.${s}`)}</span>
                      ))}
                    </div>
                  ) : null}
                  {product.vip && <p className="flex items-start gap-2 text-[15px] text-dxb-ink"><BrandIcon name="signature" className="w-4 h-4 mt-0.5 text-dxb-cobalt" /> {product.vip[locale]}</p>}
                </div>
              )}

              {stepUps.length > 0 && (
                <div className="mt-10 bg-white dxb-cut p-6 md:p-7">
                  <p className="dxb-label text-[11px] text-dxb-cobalt">{ac.stepUpTitle[locale]}</p>
                  <p className="mt-1 text-sm text-dxb-muted">{ac.stepUpCopy[locale]}</p>
                  <ul className="mt-4 divide-y divide-dxb-line">
                    {stepUps.map(u => (
                      <li key={u.slug}>
                        <Link href={`/experiences/${u.category}/${u.slug}`} className="group flex items-center justify-between gap-4 py-3">
                          <span className="min-w-0">
                            <span className="block text-lg font-extrabold tracking-[-0.015em] text-dxb-navy group-hover:text-dxb-cobalt">{u.name[locale]}</span>
                            <span className="block text-xs text-dxb-slate truncate">{u.tagline[locale]}</span>
                          </span>
                          <span className="dxb-data text-sm text-dxb-navy whitespace-nowrap">
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
                      <h2 className="text-[22px] font-extrabold tracking-[-0.015em] text-dxb-navy mb-4 pb-3 border-b-2 border-dxb-navy">{s.title}</h2>
                      <List items={s.items} icon={s.icon} />
                    </div>
                  ))}
              </div>

              {product.faq[locale].length > 0 && (
                <div className="mt-12">
                  <h2 className="text-[22px] font-extrabold tracking-[-0.015em] text-dxb-navy mb-2 pb-3 border-b-2 border-dxb-navy">{t('faq')}</h2>
                  <div className="divide-y divide-dxb-line border-b border-dxb-line">
                    {product.faq[locale].map(f => (
                      <details key={f.q} className="group py-4">
                        <summary className="cursor-pointer list-none flex justify-between gap-4 font-bold text-dxb-navy">
                          {f.q}
                          <span className="grid place-items-center w-6 h-6 shrink-0 bg-dxb-orange text-dxb-ink text-lg leading-none group-open:rotate-45 transition-transform">+</span>
                        </summary>
                        <p className="mt-3 text-dxb-ink/75 leading-relaxed">{f.a}</p>
                      </details>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-12 bg-dxb-cobalt text-white dxb-cut p-6 md:p-8 flex flex-col sm:flex-row sm:items-center gap-5 justify-between">
                <div>
                  <h2 className="text-2xl font-extrabold tracking-[-0.015em]">{t('conciergeTitle')}</h2>
                  <p className="text-white/80 mt-2">{t('conciergeCopy')}</p>
                </div>
                <Link href="/request" className="inline-flex items-center justify-center gap-2 h-12 px-6 shrink-0 bg-dxb-orange text-dxb-ink font-bold dxb-cut dxb-cut-sm hover:bg-dxb-orange-hover">
                  {t('conciergeCta')} <BrandIcon name="arrow" className="w-4 h-4 rtl:rotate-180" />
                </Link>
              </div>
            </div>

            {/* Right: booking panel */}
            <aside className="scroll-mt-24 lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto scrollbar-none lg:pb-6 lg:-mx-3 lg:px-3" id="book">
              {product.quoteOnly && product.category === 'shopping' ? (
                <div className="bg-white text-dxb-ink dxb-cut p-7 md:p-8">
                  <p className="dxb-label text-dxb-cobalt">{sp.bespoke[locale]}</p>
                  <h2 className="mt-3 text-3xl font-extrabold tracking-[-0.02em] text-dxb-navy">{sp.title[locale]}</h2>
                  <p className="mt-3 mb-7 text-dxb-muted text-sm leading-relaxed">{sp.copy[locale]}</p>
                  <ServiceRequestForm id="shopping-request" kind="shopping" compact hidden={{ product: product.name.en }} />
                  <Link href="/sourcing" className="mt-6 block text-sm font-semibold text-dxb-cobalt underline underline-offset-4">{sp.sourcingLink[locale]}</Link>
                </div>
              ) : product.quoteOnly ? (
                <div className="bg-dxb-navy text-white dxb-cut p-8">
                  <p className="text-3xl font-extrabold tracking-[-0.02em]">{t('onRequest')}</p>
                  <p className="mt-3 text-white/70">{t('conciergeCopy')}</p>
                  <Link
                    href={product.category === 'shopping' ? `/request?service=shopping&event=${encodeURIComponent(product.name.en)}` : '/request'}
                    className="mt-6 inline-flex items-center h-12 px-6 bg-dxb-orange text-dxb-ink font-bold dxb-cut dxb-cut-sm hover:bg-dxb-orange-hover"
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
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-5 sm:px-6">
            <SectionHeading title={t('related')} className="mb-10" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
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
