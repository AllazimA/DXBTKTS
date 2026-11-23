import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { RequestForm } from '@/components/forms/request-form'
import type { Locale } from '@/i18n.config'
import { pageMetadata } from '@/lib/metadata'
import { whatsappLink } from '@/lib/site'
import { WhatsAppIcon } from '@/components/ui/whatsapp-icon'
import { BrandIcon, BrandSymbol, Tear } from '@/components/brand'
import { heroSecondary } from '@/components/brand/page-hero'

export async function generateMetadata({ params }: { params: { locale: Locale } }): Promise<Metadata> {
  return pageMetadata(params.locale, 'request', '/request')
}

const ICONS = ['chat', 'secure', 'confirmed'] as const

export default async function RequestPage() {
  const t = await getTranslations('request')
  const promises = t.raw('promises') as { title: string; copy: string }[]
  const accent = (chunks: React.ReactNode) => (
    <span className="text-dxb-orange">{chunks}</span>
  )

  return (
    <section className="relative bg-dxb-navy text-white overflow-hidden">

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 py-14 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left: pitch */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <span className="dxb-label text-dxb-orange inline-flex items-center">DXB TKTS<Tear />{t('eyebrow')}</span>
            <h1 className="mt-6 font-display text-[44px] leading-[0.98] sm:text-6xl tracking-[-0.035em]">{t.rich('title', { accent })}</h1>
            <p className="mt-6 text-white/75 text-lg leading-relaxed">{t('sub')}</p>

            <ul className="mt-10 border-t border-white/15">
              {promises.map((p, i) => (
                <li key={p.title} className="flex gap-4 py-5 border-b border-white/15">
                  <span className="grid place-items-center w-10 h-10 shrink-0 bg-white/10 text-dxb-orange">
                    <BrandIcon name={ICONS[i] ?? 'confirmed'} className="w-5 h-5" />
                  </span>
                  <div>
                    <h3 className="text-lg font-extrabold tracking-[-0.015em]">{p.title}</h3>
                    <p className="mt-1 text-white/65 text-[15px] leading-relaxed">{p.copy}</p>
                  </div>
                </li>
              ))}
            </ul>

            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className={`mt-10 ${heroSecondary}`}>
              <WhatsAppIcon className="w-5 h-5 text-[#25D366]" />
              {t('whatsappCta')}
            </a>
          </div>

          {/* Right: the request, as a boarding pass */}
          <div className="lg:col-span-7 dxb-lift">
            <div className="bg-white text-dxb-ink dxb-cut dxb-cut-lg">
              <div className="flex items-center justify-between gap-3 bg-dxb-orange dxb-cut dxb-cut-sm text-dxb-ink px-7 md:px-10 py-3.5">
                <span className="dxb-label text-[11px] inline-flex items-center"><BrandSymbol className="h-3.5 me-2" />DXB TKTS</span>
                <span className="dxb-label text-[11px]">{t('eyebrow')}</span>
              </div>
              <div className="p-7 md:p-10">
                <RequestForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
