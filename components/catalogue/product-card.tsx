import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import { Clock, Users } from 'lucide-react'
import type { Locale } from '@/i18n.config'
import type { Product } from '@/lib/catalogue/types'
import { fromPrice } from '@/data/catalogue'
import { formatAED } from '@/lib/catalogue/money'
import { productImage } from '@/lib/images'
import { SceneImage } from '@/components/ui/scene-image'

export function productHref(product: Product) {
  return `/experiences/${product.category}/${product.slug}`
}

export function ProductCard({ product }: { product: Product }) {
  const locale = useLocale() as Locale
  const t = useTranslations('catalogue')
  const price = fromPrice(product)

  return (
    <Link
      href={productHref(product)}
      className="group flex flex-col bg-white border border-dxb-band overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_-24px_rgba(14,27,44,0.35)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-dxb-ink">
        <SceneImage
          image={productImage(product.slug, product.image, product.name[locale])}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <span className="absolute top-3 start-3 bg-white/95 text-dxb-ink text-[11px] font-semibold px-2.5 py-1">
          {t(`confirmation.${product.confirmation}`)}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-cormorant text-2xl font-medium text-dxb-ink leading-tight">{product.name[locale]}</h3>
        <p className="mt-2 text-sm text-dxb-slate leading-relaxed line-clamp-2">{product.tagline[locale]}</p>
        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-xs text-dxb-slate">
          <span className="inline-flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" /> {product.duration[locale]}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5" /> {product.groupSize[locale]}
          </span>
        </div>
        <div className="mt-auto pt-5 flex items-end justify-between gap-3">
          <div>
            {price !== null && <span className="block text-[11px] uppercase tracking-wider text-dxb-slate">{t('from')}</span>}
            {price === null ? (
              <span className="text-lg font-semibold text-dxb-ink">{t('onRequest')}</span>
            ) : (
              <>
                <span className="text-lg font-semibold text-dxb-ink">{formatAED(price, locale)}</span>{' '}
                <span className="text-xs text-dxb-slate">{t(`priceType.${product.priceType}`)}</span>
              </>
            )}
          </div>
          {!product.priceVerified && (
            <span className="text-[10px] uppercase tracking-wider text-dxb-gold border border-dxb-gold/40 px-2 py-0.5 shrink-0">
              {t('indicative')}
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}
