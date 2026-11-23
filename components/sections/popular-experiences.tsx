import { useTranslations } from 'next-intl'
import { getProduct } from '@/data/catalogue'
import { ProductCard } from '@/components/catalogue/product-card'
import { SectionHeading } from '@/components/brand/section-heading'

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
  const accent = (chunks: React.ReactNode) => <span className="text-dxb-cobalt">{chunks}</span>
  const list = FEATURED.map(getProduct).filter((p): p is NonNullable<typeof p> => Boolean(p))

  return (
    <section className="pt-6 pb-20 md:pb-28 bg-dxb-sand">
      <div className="max-w-7xl mx-auto px-5 sm:px-6">
        <SectionHeading
          index="01"
          label={t('popularEyebrow')}
          title={t.rich('popularTitle', { accent })}
          action={{ href: '/experiences', label: t('popularCta') }}
          className="mb-10"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
          {list.map(p => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </div>
    </section>
  )
}
