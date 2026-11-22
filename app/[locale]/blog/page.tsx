import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { Locale } from '@/i18n.config'
import { pageMetadata } from '@/lib/metadata'
import { aiImage } from '@/lib/images'
import { articles, formatDate, journalCategories, journalCopy as c, readingMinutes } from '@/content/journal'
import { ChapterLabel } from '@/components/editorial/chapter-label'
import { JournalIndex, type CardData } from '@/components/journal/journal-index'

export async function generateMetadata({ params }: { params: { locale: Locale } }): Promise<Metadata> {
  return pageMetadata(params.locale, 'journal', '/blog')
}

export default function JournalPage({ params: { locale } }: { params: { locale: Locale } }) {
  const sorted = [...articles].sort((a, b) => b.published.localeCompare(a.published))
  const featured = sorted.find(a => a.featured) ?? sorted[0]
  const fImg = aiImage(featured.image.slot, featured.image.fallback, featured.image.alt)
  const cards: CardData[] = sorted
    .filter(a => a.slug !== featured.slug)
    .map(a => {
      const img = aiImage(a.image.slot, a.image.fallback, a.image.alt)
      return { slug: a.slug, category: a.category, title: a.title[locale], excerpt: a.excerpt[locale], minutes: readingMinutes(a), date: formatDate(locale, a.published), image: { src: img.src, alt: img.alt } }
    })
  const catName = journalCategories.find(k => k.slug === featured.category)!.name[locale]

  return (
    <>
      <section className="bg-dxb-ink text-white">
        <div className="max-w-6xl mx-auto px-6 pt-28 md:pt-36 pb-14">
          <ChapterLabel label={c.eyebrow[locale]} tone="light" />
          <h1 className="mt-8 font-cormorant font-light text-[2.75rem] leading-[1.05] md:text-7xl whitespace-pre-line">{c.title[locale]}</h1>
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-white/75 font-light">{c.lede[locale]}</p>
        </div>

        {/* Featured story */}
        <div className="max-w-6xl mx-auto px-6 pb-20">
          <Link href={`/blog/${featured.slug}`} className="group grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center border-t border-white/15 pt-10">
            <div className="lg:col-span-7 relative aspect-[16/10] overflow-hidden bg-dxb-navy">
              {fImg.src && <Image src={fImg.src} alt={fImg.alt} fill priority sizes="(max-width: 1024px) 100vw, 60vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" />}
            </div>
            <div className="lg:col-span-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-dxb-gold">
                {c.featured[locale]} · {catName}
              </p>
              <h2 className="mt-4 font-cormorant text-4xl md:text-5xl leading-tight group-hover:text-dxb-gold transition-colors">{featured.title[locale]}</h2>
              <p className="mt-5 text-white/70 leading-relaxed">{featured.excerpt[locale]}</p>
              <p className="mt-5 text-xs text-white/50">
                {formatDate(locale, featured.published)} · {c.minRead[locale].replace('{n}', String(readingMinutes(featured)))}
              </p>
              <span className="mt-7 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-dxb-gold">
                {c.read[locale]} <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </span>
            </div>
          </Link>
        </div>
      </section>

      <JournalIndex locale={locale} cards={cards} />
    </>
  )
}
