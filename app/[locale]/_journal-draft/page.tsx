import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import { articles, getArticleContent } from '@/data/journal'

export const metadata: Metadata = {
  title: 'The Journal | DXB TKTS Luxury Concierge Dubai',
  description:
    'Dispatches from the world of DXB TKTS — insider Dubai, curated experiences, and the art of living well.',
}

type Props = { params: { locale: string } }

export default async function BlogPage({ params: { locale } }: Props) {
  const t = await getTranslations('blog')
  const accent = (chunks: React.ReactNode) => (
    <span className="text-dxb-gold">{chunks}</span>
  )

  const localized = articles.map(a => ({
    slug: a.slug,
    img: a.img,
    alt: a.alt,
    ...getArticleContent(a, locale),
  }))
  const [featured, ...rest] = localized

  return (
    <>
      {/* Header */}
      <section className="pt-24 pb-16 bg-dxb-sand">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="text-xs font-medium tracking-[0.06em] text-dxb-gold font-mono uppercase">
            {t('eyebrow')}
          </span>
          <h1 className="font-display text-5xl md:text-7xl text-dxb-navy mt-6 mb-6">
            {t.rich('title', { accent })}
          </h1>
          <p className="text-lg text-dxb-slate font-light max-w-2xl mx-auto">{t('intro')}</p>
        </div>
      </section>

      {/* Featured story */}
      <section className="pb-20 bg-dxb-sand">
        <div className="max-w-7xl mx-auto px-6">
          <Link
            href={`/blog/${featured.slug}`}
            className="group grid grid-cols-1 lg:grid-cols-5 bg-dxb-navy overflow-hidden"
          >
            <div className="relative lg:col-span-3 aspect-[16/10] lg:aspect-auto lg:min-h-[28rem] overflow-hidden">
              <Image
                src={featured.img}
                alt={featured.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
            <div className="lg:col-span-2 p-10 md:p-14 flex flex-col justify-center">
              <span className="text-xs font-medium tracking-[0.06em] font-mono uppercase text-dxb-gold">
                {featured.category} · {featured.date} · {featured.readTime}
              </span>
              <h2 className="font-display text-3xl md:text-4xl text-white mt-5 mb-5 leading-tight">
                {featured.title}
              </h2>
              <p className="text-white/65 font-light leading-relaxed mb-8">{featured.excerpt}</p>
              <span className="inline-flex items-center gap-3 text-sm font-medium tracking-[0.06em] font-mono uppercase text-dxb-gold">
                <span className="h-px w-10 bg-dxb-orange transition-all duration-300 group-hover:w-16" />
                {t('continueReading')}
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* Story grid */}
      <section className="pb-28 bg-dxb-sand">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {rest.map(story => (
            <Link key={story.slug} href={`/blog/${story.slug}`} className="group block">
              <div className="relative aspect-[4/3] overflow-hidden bg-dxb-navy mb-6">
                <Image
                  src={story.img}
                  alt={story.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <span className="absolute top-0 start-0 h-0.5 w-0 bg-dxb-orange transition-all duration-500 group-hover:w-full" />
              </div>
              <span className="text-[11px] font-medium tracking-[0.06em] font-mono uppercase text-dxb-gold">
                {story.category} · {story.date} · {story.readTime}
              </span>
              <h3 className="font-display font-bold text-2xl text-dxb-navy mt-3 mb-3 leading-snug group-hover:text-dxb-gold transition-colors">
                {story.title}
              </h3>
              <p className="text-dxb-slate text-sm font-light leading-relaxed">{story.excerpt}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}
