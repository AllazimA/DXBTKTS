import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { ArrowRight } from 'lucide-react'
import { getProduct } from '@/data/catalogue'
import { ProductCard } from '@/components/catalogue/product-card'

const FEATURED = [
  'desert-safari-in-style',
  'private-dune-dinner',
  'superyacht-charter',
  'private-yacht-charter',
  'private-helicopter-charter',
  'private-dubai-city-tour',
]

export function PopularExperiences() {
  const t = useTranslations('home')
  const accent = (chunks: React.ReactNode) => <span className="italic text-dxb-gold">{chunks}</span>
  const list = FEATURED.map(getProduct).filter((p): p is NonNullable<typeof p> => Boolean(p))

  return (
    <section className="py-20 md:py-28 bg-dxb-ivory">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-semibold tracking-[0.35em] text-dxb-gold uppercase">{t('popularEyebrow')}</span>
            <h2 className="font-cormorant text-4xl md:text-5xl font-light text-dxb-ink mt-4">{t.rich('popularTitle', { accent })}</h2>
          </div>
          <Link href="/experiences" className="inline-flex items-center gap-2 text-sm font-semibold text-dxb-gold shrink-0">
            {t('popularCta')} <ArrowRight className="w-4 h-4 rtl:rotate-180" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {list.map(p => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </div>
    </section>
  )
}
