import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import { articles, getArticle, getArticleContent } from '@/data/journal'
import { CTABand } from '@/components/ui/cta-band'

type Props = {
  params: { slug: string; locale: string }
}

export function generateStaticParams() {
  return articles.map(a => ({ slug: a.slug }))
}

export function generateMetadata({ params }: Props): Metadata {
  const article = getArticle(params.slug)
  if (!article) return { title: 'The Journal | DXB TKTS' }
  const content = getArticleContent(article, params.locale)
  return {
    title: `${content.title} | DXB TKTS`,
    description: content.excerpt,
  }
}

export default async function ArticlePage({ params }: Props) {
  const article = getArticle(params.slug)
  if (!article) notFound()

  const t = await getTranslations('blog')
  const accent = (chunks: React.ReactNode) => (
    <span className="text-dxb-gold">{chunks}</span>
  )

  const content = getArticleContent(article, params.locale)
  const related = articles
    .filter(a => a.slug !== article.slug)
    .slice(0, 3)
    .map(a => ({ slug: a.slug, img: a.img, alt: a.alt, ...getArticleContent(a, params.locale) }))
  const midpoint = Math.ceil(content.body.length / 2)

  return (
    <>
      {/* Cinematic article header */}
      <section className="relative h-[60vh] min-h-[28rem] flex items-end overflow-hidden bg-dxb-navy">
        <Image
          src={article.img}
          alt={article.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dxb-ink via-dxb-ink/40 to-dxb-ink/20" />
        <div className="relative z-10 max-w-3xl mx-auto px-6 pb-16 text-center w-full">
          <span className="text-xs font-medium tracking-[0.06em] text-dxb-gold font-mono uppercase">
            {content.category} · {content.date} · {content.readTime}
          </span>
          <h1 className="font-display text-4xl md:text-6xl text-white mt-6 leading-[1.1]">
            {content.title}
          </h1>
        </div>
      </section>

      {/* Body */}
      <article className="py-20 md:py-28 bg-dxb-sand">
        <div className="max-w-2xl mx-auto px-6">
          <p className="font-display text-2xl md:text-3xl text-dxb-navy leading-snug mb-12">
            {content.excerpt}
          </p>

          <div className="space-y-7 text-dxb-slate text-lg font-light leading-[1.9]">
            {content.body.slice(0, midpoint).map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          {/* Pull quote */}
          <figure className="my-14 border-s-2 border-dxb-gold ps-8 py-2">
            <blockquote className="font-display text-3xl md:text-4xl text-dxb-navy leading-snug">
              {content.pullQuote}
            </blockquote>
          </figure>

          <div className="space-y-7 text-dxb-slate text-lg font-light leading-[1.9]">
            {content.body.slice(midpoint).map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          {/* Byline */}
          <div className="mt-16 pt-8 border-t border-dxb-band flex items-center justify-between gap-4 flex-wrap">
            <div>
              <p className="text-xs font-medium tracking-[0.06em] font-mono uppercase text-dxb-gold">
                {t('desk')}
              </p>
              <p className="text-sm text-dxb-slate mt-1">{t('deskLocation')}</p>
            </div>
            <Link
              href="/request"
              className="group inline-flex items-center gap-3 text-sm font-medium tracking-[0.06em] font-mono uppercase text-dxb-ink hover:text-dxb-gold transition-colors"
            >
              <span className="h-px w-10 bg-dxb-orange transition-all duration-300 group-hover:w-16" />
              {t('arrange')}
            </Link>
          </div>
        </div>
      </article>

      {/* More from the Journal */}
      <section className="pb-24 bg-dxb-sand">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-6 mb-12">
            <h2 className="font-display text-3xl md:text-4xl text-dxb-navy shrink-0">
              {t.rich('moreFrom', { accent })}
            </h2>
            <span className="h-px flex-1 bg-dxb-band" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {related.map(story => (
              <Link key={story.slug} href={`/blog/${story.slug}`} className="group block">
                <div className="relative aspect-[4/3] overflow-hidden bg-dxb-navy mb-5">
                  <Image
                    src={story.img}
                    alt={story.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  <span className="absolute top-0 start-0 h-0.5 w-0 bg-dxb-orange transition-all duration-500 group-hover:w-full" />
                </div>
                <span className="text-[11px] font-medium tracking-[0.06em] font-mono uppercase text-dxb-gold">
                  {story.category} · {story.date}
                </span>
                <h3 className="font-display font-bold text-2xl text-dxb-navy mt-2 leading-snug group-hover:text-dxb-gold transition-colors">
                  {story.title}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        heading={t.rich('ctaHeading', { accent })}
        subheading={t('ctaSub')}
        ctaLabel={t('ctaPrimary')}
        ctaHref="/request"
      />
    </>
  )
}
