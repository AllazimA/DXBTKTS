import { Metadata } from 'next'
import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import { RequestForm } from '@/components/forms/request-form'
import { Clock, ShieldCheck, Sparkles } from 'lucide-react'
import type { Locale } from '@/i18n.config'
import { pageMetadata } from '@/lib/metadata'
import { whatsappLink } from '@/lib/site'
import { WhatsAppIcon } from '@/components/ui/whatsapp-icon'

export async function generateMetadata({ params }: { params: { locale: Locale } }): Promise<Metadata> {
  return pageMetadata(params.locale, 'request', '/request')
}

const icons = [Clock, ShieldCheck, Sparkles]

export default async function RequestPage() {
  const t = await getTranslations('request')
  const promises = t.raw('promises') as { title: string; copy: string }[]
  const accent = (chunks: React.ReactNode) => (
    <span className="italic text-dxb-gold">{chunks}</span>
  )

  return (
    <section className="relative bg-dxb-ink overflow-hidden">
      {/* Ambient backdrop */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=2400&auto=format&fit=crop"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dxb-ink/80 via-dxb-ink/95 to-dxb-ink" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-start">
          {/* Left: pitch */}
          <div className="lg:col-span-2 lg:sticky lg:top-32">
            <span className="text-xs font-semibold tracking-[0.35em] text-dxb-gold uppercase">
              {t('eyebrow')}
            </span>
            <h1 className="font-cormorant text-5xl md:text-6xl font-light text-white mt-6 mb-8 leading-[1.08]">
              {t.rich('title', { accent })}
            </h1>
            <p className="text-white/70 text-lg font-light leading-relaxed mb-12">{t('sub')}</p>

            <div className="space-y-8">
              {promises.map((p, i) => {
                const Icon = icons[i]
                return (
                  <div key={p.title} className="flex gap-5">
                    <Icon className="w-6 h-6 text-dxb-gold shrink-0 mt-1" />
                    <div>
                      <h3 className="font-cormorant text-2xl font-medium text-white mb-1">
                        {p.title}
                      </h3>
                      <p className="text-white/55 text-sm font-light leading-relaxed">{p.copy}</p>
                    </div>
                  </div>
                )
              })}
            </div>

            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-12 inline-flex items-center gap-3 text-sm font-semibold tracking-[0.2em] uppercase text-dxb-gold group"
            >
              <span className="h-px w-10 bg-dxb-gold transition-all duration-300 group-hover:w-16" />
              <WhatsAppIcon className="w-5 h-5 text-[#25D366]" />
              {t('whatsappCta')}
            </a>
          </div>

          {/* Right: form */}
          <div className="lg:col-span-3 border border-white/10 bg-white/[0.02] backdrop-blur-sm p-8 md:p-12">
            <RequestForm />
          </div>
        </div>
      </div>
    </section>
  )
}
