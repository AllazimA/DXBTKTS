import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import type { Locale } from '@/i18n.config'
import { aiImage } from '@/lib/images'
import { absoluteUrl, alternatesFor, site } from '@/lib/site'
import { articles, formatDate, journalCategories, journalCopy as c, readingMinutes } from '@/content/journal'

type Props = { params: { locale: Locale; slug: string } }

export function generateStaticParams() {
  return articles.map(a => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const a = articles.find(x => x.slug === params.slug)
  if (!a) return {}
  const path = `/blog/${a.slug}`
  const title = `${a.title[params.locale]} | ${site.name}`
  const description = a.excerpt[params.locale]
  const alt = alternatesFor(params.locale, path)
  const img = aiImage(a.image.slot, a.image.fallback, a.image.alt)
  return {
    title: { absolute: title },
    description,
    // Bodies are English: French/Arabic pages point search engines at the English original.
    alternates: { ...alt, canonical: absoluteUrl('en', path) },
    openGraph: { title, description, url: absoluteUrl(params.locale, path), siteName: site.name, type: 'article', publishedTime: a.published, images: img.src ? [{ url: img.src }] : undefined },
    twitter: { card: 'summary_large_image', title, description },
  }
}

export default function ArticlePage({ params: { locale, slug } }: Props) {
  const a = articles.find(x => x.slug === slug)
  if (!a) notFound()
  const img = aiImage(a.image.slot, a.image.fallback, a.image.alt)
  const cat = journalCategories.find(k => k.slug === a.category)!
  const more = articles.filter(x => x.slug !== a.slug).slice(0, 3)
  const minutes = readingMinutes(a)

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: a.title.en,
      description: a.excerpt.en,
      datePublished: a.published,
      inLanguage: 'en',
      image: img.src ? [`${site.url}${img.src.startsWith('/') ? img.src : ''}`] : undefined,
      author: { '@type': 'Organization', name: site.name, url: site.url },
      publisher: { '@type': 'Organization', name: site.name, url: site.url },
      mainEntityOfPage: absoluteUrl('en', `/blog/${a.slug}`),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: site.name, item: absoluteUrl(locale, '/') },
        { '@type': 'ListItem', position: 2, name: c.eyebrow[locale], item: absoluteUrl(locale, '/blog') },
        { '@type': 'ListItem', position: 3, name: a.title[locale], item: absoluteUrl(locale, `/blog/${a.slug}`) },
      ],
    },
  ]

  return (
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <header className="relative min-h-[72vh] flex items-end bg-dxb-ink text-white overflow-hidden">
        {img.src && <Image src={img.src} alt={img.alt} fill priority sizes="100vw" className="object-cover" />}
        <div className="absolute inset-0 bg-gradient-to-t from-dxb-ink via-dxb-ink/55 to-dxb-ink/10" />
        <div className="relative w-full max-w-4xl mx-auto px-6 pt-32 pb-14 md:pb-20">
          <Link href="/blog" className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/70 hover:text-dxb-gold">
            <ArrowLeft className="w-4 h-4 rtl:rotate-180" /> {c.eyebrow[locale]}
          </Link>
          <p className="mt-8 text-[11px] font-semibold uppercase tracking-[0.25em] text-dxb-gold">{cat.name[locale]}</p>
          <h1 className="mt-4 font-cormorant font-light text-[2.6rem] leading-[1.05] md:text-6xl">{a.title[locale]}</h1>
          <p className="mt-6 max-w-2xl text-lg md:text-xl leading-relaxed text-white/80 font-light">{a.excerpt[locale]}</p>
          <p className="mt-6 text-xs text-white/60">
            {c.byline[locale]} · {formatDate(locale, a.published)} · {c.minRead[locale].replace('{n}', String(minutes))}
          </p>
        </div>
      </header>

      <div className="bg-dxb-ivory">
        <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
          {locale !== 'en' && <p className="mb-10 border border-dxb-gold/40 bg-white/60 px-5 py-4 text-sm text-dxb-slate">{c.englishOnly[locale]}</p>}
          <div lang="en" dir="ltr" className="text-start">
            {a.body.map((b, i) => {
              if ('h' in b) return <h2 key={i} className="mt-14 mb-5 font-cormorant text-3xl md:text-4xl text-dxb-ink">{b.h}</h2>
              if ('p' in b)
                return (
                  <p key={i} className={`mt-5 text-[18px] leading-[1.8] text-dxb-ink/85 ${i === 0 ? 'first-letter:font-cormorant first-letter:text-6xl first-letter:float-left first-letter:me-3 first-letter:leading-[0.85] first-letter:text-dxb-gold' : ''}`}>
                    {b.p}
                  </p>
                )
              if ('tip' in b)
                return (
                  <aside key={i} className="my-10 border-s-2 border-dxb-gold bg-white/70 px-6 py-5 font-cormorant text-xl md:text-2xl leading-snug text-dxb-ink italic">
                    {b.tip}
                  </aside>
                )
              return (
                <ul key={i} className="mt-6 space-y-3">
                  {b.list.map(li => (
                    <li key={li} className="flex gap-3 text-[17px] leading-[1.75] text-dxb-ink/85">
                      <span className="text-dxb-gold mt-0.5">—</span>
                      <span>{li}</span>
                    </li>
                  ))}
                </ul>
              )
            })}
          </div>
          <p className="mt-12 text-sm text-dxb-slate">{c.updatedNote[locale]}</p>

          <div className="mt-14 bg-dxb-ink text-white p-8 md:p-10">
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-dxb-gold">{c.takeItFurther[locale]}</p>
            <ul className="mt-5 space-y-3">
              {a.related.map(r => (
                <li key={r.href}>
                  <Link href={r.href} className="group inline-flex items-center gap-3 font-cormorant text-2xl hover:text-dxb-gold transition-colors">
                    {r.label[locale]} <ArrowRight className="w-5 h-5 rtl:rotate-180 transition-transform group-hover:translate-x-1" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <section className="bg-dxb-band">
        <div className="max-w-6xl mx-auto px-6 py-16 md:py-20">
          <h2 className="font-cormorant text-3xl md:text-4xl text-dxb-ink">{c.more[locale]}</h2>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
            {more.map(m => {
              const mi = aiImage(m.image.slot, m.image.fallback, m.image.alt)
              return (
                <Link key={m.slug} href={`/blog/${m.slug}`} className="group block">
                  <div className="relative aspect-[4/3] overflow-hidden bg-dxb-ivory">
                    {mi.src && <Image src={mi.src} alt={mi.alt} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.04]" />}
                  </div>
                  <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-dxb-gold">{journalCategories.find(k => k.slug === m.category)!.name[locale]}</p>
                  <h3 className="mt-2 font-cormorant text-2xl leading-tight text-dxb-ink group-hover:text-dxb-gold transition-colors">{m.title[locale]}</h3>
                </Link>
              )
            })}
          </div>
        </div>
      </section>
    </article>
  )
}
