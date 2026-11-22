import Link from 'next/link'
import { useTranslations } from 'next-intl'

export default function NotFound() {
  const t = useTranslations('notFound')
  return (
    <section className="py-32 bg-dxb-ivory text-center">
      <div className="max-w-xl mx-auto px-6">
        <span className="text-xs font-semibold tracking-[0.35em] text-dxb-gold uppercase">404</span>
        <h1 className="font-cormorant text-5xl font-light text-dxb-ink mt-4 mb-4">{t('title')}</h1>
        <p className="text-dxb-slate mb-8">{t('copy')}</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/experiences" className="px-6 py-3 bg-dxb-gold text-white text-sm font-semibold">{t('experiences')}</Link>
          <Link href="/" className="px-6 py-3 border border-dxb-ink/20 text-dxb-ink text-sm font-semibold">{t('home')}</Link>
        </div>
      </div>
    </section>
  )
}
