import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import type { Locale } from '@/i18n.config'
import type { Product } from '@/lib/catalogue/types'
import { fromPrice, getCategory } from '@/data/catalogue'
import { formatAED } from '@/lib/catalogue/money'
import { productImage } from '@/lib/images'
import { SceneImage } from '@/components/ui/scene-image'
import { BrandIcon, Perforation } from '@/components/brand'
import { FAMILY, familyOf } from '@/lib/brand'

export function productHref(product: Product) {
  return `/experiences/${product.category}/${product.slug}`
}

/**
 * Experience card drawn as a ticket: cut corner, category chip in its family
 * colour, and a torn-off stub carrying the price in mono.
 */
export function ProductCard({ product }: { product: Product }) {
  const locale = useLocale() as Locale
  const t = useTranslations('catalogue')
  const price = fromPrice(product)
  const fam = FAMILY[familyOf(product.category)]
  const category = getCategory(product.category)

  return (
    <Link href={productHref(product)} className="group dxb-lift flex flex-col hover:-translate-y-1">
      <div className="flex flex-1 flex-col bg-white dxb-cut">
        <div className="relative aspect-[4/3] overflow-hidden bg-dxb-navy">
          <SceneImage
            image={productImage(product.slug, product.image, product.name[locale])}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dxb-ink/50 via-transparent to-dxb-ink/30" />
          <span className="absolute top-3 start-3 inline-flex items-center gap-2 h-7 px-2.5 dxb-glass dxb-label text-[10.5px] text-white">
            <span className={`h-2 w-2 ${fam.bg}`} aria-hidden="true" />
            {category?.name[locale] ?? fam.label[locale]}
          </span>
        </div>
        <div className="flex flex-1 flex-col px-5 pt-5 pb-4">
          <h3 className="text-[22px] font-extrabold leading-[1.12] tracking-[-0.025em] text-dxb-navy">{product.name[locale]}</h3>
          <p className="mt-2 text-[15px] text-dxb-muted leading-relaxed line-clamp-2">{product.tagline[locale]}</p>
          <div className="mt-auto pt-4 flex flex-wrap gap-x-4 gap-y-1.5 dxb-label text-[11px] text-dxb-muted">
            <span className="inline-flex items-center gap-1.5">
              <BrandIcon name="clock" className="w-3.5 h-3.5" /> {product.duration[locale]}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <BrandIcon name="guests" className="w-3.5 h-3.5" /> {product.groupSize[locale]}
            </span>
            <span className={`inline-flex items-center gap-1.5 ${product.confirmation === 'instant' ? 'text-dxb-cobalt' : ''}`}>
              <BrandIcon name={product.confirmation === 'instant' ? 'confirmed' : 'chat'} className="w-3.5 h-3.5" />
              {t(`confirmation.${product.confirmation}`)}
            </span>
          </div>
        </div>
      </div>
      <div className="relative bg-white dxb-notch-top px-5 pt-3.5 pb-4 flex items-end justify-between gap-3">
        <Perforation className="absolute top-0 inset-x-3 text-dxb-navy" />
        <div className="min-w-0">
          {price !== null && <span className="block dxb-label text-[10px] text-dxb-muted">{t('from')}</span>}
          {price === null ? (
            <span className="text-[17px] font-bold text-dxb-navy">{t('onRequest')}</span>
          ) : (
            <span className="flex items-baseline gap-1.5 flex-wrap">
              <span className="dxb-data text-[19px] font-semibold text-dxb-navy">{formatAED(price, locale)}</span>
              <span className="text-xs text-dxb-muted">{t(`priceType.${product.priceType}`)}</span>
            </span>
          )}
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {!product.priceVerified && (
            <span className="dxb-label text-[9.5px] text-dxb-muted border border-dxb-line px-1.5 py-0.5">{t('indicative')}</span>
          )}
          <span className="grid place-items-center w-9 h-9 bg-dxb-orange text-dxb-ink transition-transform duration-300 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5">
            <BrandIcon name="arrow" className="w-4 h-4 rtl:rotate-180" />
          </span>
        </div>
      </div>
    </Link>
  )
}
