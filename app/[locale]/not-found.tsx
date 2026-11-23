import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { BrandSymbol, Perforation, Tear } from '@/components/brand'

/** 404 drawn as a void ticket. */
export default function NotFound() {
  const t = useTranslations('notFound')
  return (
    <section className="py-20 md:py-28 bg-dxb-sand">
      <div className="max-w-2xl mx-auto px-5 sm:px-6 dxb-lift">
        <div className="bg-white dxb-cut dxb-cut-lg">
          <div className="flex items-center justify-between bg-dxb-red text-white px-7 py-3">
            <span className="dxb-label text-[11px] inline-flex items-center"><BrandSymbol className="h-3.5 me-2" />DXB TKTS</span>
            <span className="dxb-label text-[11px] inline-flex items-center">Error<Tear />404</span>
          </div>
          <div className="px-7 md:px-10 py-10 text-center">
            <span className="dxb-data text-[88px] md:text-[120px] leading-none font-semibold text-dxb-navy" dir="ltr">404</span>
            <h1 className="font-display text-4xl md:text-5xl text-dxb-navy mt-4 mb-4">{t('title')}</h1>
            <p className="text-dxb-muted max-w-md mx-auto">{t('copy')}</p>
          </div>
        </div>
        <div className="relative bg-white dxb-notch-top px-7 md:px-10 pt-6 pb-8">
          <Perforation className="absolute top-0 inset-x-3 text-dxb-navy" />
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/experiences" className="inline-flex items-center justify-center h-12 px-6 bg-dxb-orange dxb-cut dxb-cut-sm text-dxb-ink font-bold hover:bg-dxb-orange-hover">{t('experiences')}</Link>
            <Link href="/" className="inline-flex items-center justify-center h-12 px-6 border-2 border-dxb-navy text-dxb-navy font-bold hover:bg-dxb-navy hover:text-white transition-colors">{t('home')}</Link>
          </div>
        </div>
      </div>
    </section>
  )
}
