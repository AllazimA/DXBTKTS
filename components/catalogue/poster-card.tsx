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
import { productHref } from './product-card'

/**
 * Tall, image-led card for showcases: the photograph carries the story, the
 * name sits on it, and a slim torn stub holds the price.
 */
export function PosterCard({ product, index }: { product: Product; index?: number }) {
  const locale = useLocale() as Locale
  const t = useTranslations('catalogue')
  const price = fromPrice(product)
  const fam = FAMILY[familyOf(product.category)]
  const category = getCategory(product.category)

  return (
    <Link href={productHref(product)} className="group block dxb-lift">
      <div className="relative aspect-[3/4] overflow-hidden bg-dxb-navy dxb-cut dxb-cut-lg">
        <SceneImage
          image={productImage(product.slug, product.image, product.name[locale])}
          sizes="(max-width: 640px) 85vw, (max-width: 1024px) 45vw, 30vw"
          className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.06]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dxb-ink via-dxb-ink/20 to-transparent" />
        <div className="absolute top-4 inset-x-4 flex items-center justify-between">
          <span className="inline-flex items-center gap-2 dxb-glass px-2.5 h-7 dxb-label text-[10.5px] text-white">
            <span className={`h-2 w-2 ${fam.bg}`} aria-hidden="true" />
            {category?.name[locale]}
          </span>
          {index !== undefined && <span className="dxb-label text-[11px] text-white/70 me-6" dir="ltr">{String(index + 1).padStart(2, '0')}</span>}
        </div>
        <div className="absolute bottom-0 inset-x-0 p-6 text-white">
          <h3 className="text-[26px] md:text-[30px] font-extrabold leading-[1.05] tracking-[-0.025em]">{product.name[locale]}</h3>
          <p className="mt-2 text-[15px] text-white/75 leading-relaxed line-clamp-2 max-h-0 opacity-0 group-hover:max-h-16 group-hover:opacity-100 transition-all duration-500">
            {product.tagline[locale]}
          </p>
        </div>
      </div>
      <div className="relative bg-white dxb-notch-top px-6 py-4 flex items-center justify-between gap-3">
        <Perforation className="absolute top-0 inset-x-3 text-dxb-navy" />
        <span className="min-w-0">
          <span className="block dxb-label text-[10px] text-dxb-muted">{price === null ? product.duration[locale] : t('from')}</span>
          <span className="block dxb-data text-lg font-semibold text-dxb-navy truncate">{price === null ? t('onRequest') : formatAED(price, locale)}</span>
        </span>
        <span className="grid place-items-center w-10 h-10 shrink-0 bg-dxb-navy text-white transition-colors group-hover:bg-dxb-orange group-hover:text-dxb-ink">
          <BrandIcon name="arrow" className="w-4 h-4 rtl:rotate-180" />
        </span>
      </div>
    </Link>
  )
}
