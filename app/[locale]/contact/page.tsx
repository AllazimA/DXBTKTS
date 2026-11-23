import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { EnquiryForm } from '@/components/forms/enquiry-form'
import type { Locale } from '@/i18n.config'
import { pageMetadata } from '@/lib/metadata'
import { site, whatsappLink } from '@/lib/site'
import { SocialLinks } from '@/components/layout/social-links'
import { WhatsAppIcon } from '@/components/ui/whatsapp-icon'
import { BrandIcon, Perforation } from '@/components/brand'
import { PageHero, heroPrimary } from '@/components/brand/page-hero'
import { aiImage } from '@/lib/images'

export async function generateMetadata({ params }: { params: { locale: Locale } }): Promise<Metadata> {
  return pageMetadata(params.locale, 'contact', '/contact')
}

export default async function Contact() {
  const t = await getTranslations('contact')
  const tx = await getTranslations('footerExtra')

  const channels = [
    { icon: 'mail' as const, label: t('email'), value: site.email, href: `mailto:${site.email}`, ltr: true },
    { icon: 'phone' as const, label: t('phone'), value: site.whatsapp.display, href: `tel:${site.whatsapp.e164}`, ltr: true },
    { icon: 'chat' as const, label: t('whatsapp'), value: t('whatsappCta'), href: whatsappLink(), external: true },
    { icon: 'pickup' as const, label: t('location'), value: t('locationValue') },
  ]

  return (
    <>
      <PageHero image={aiImage('gallery-journey', 'arrival', 'Chauffeur waiting beside a car at the hotel entrance')} size="medium" label={t('eyebrow')} title={t('title')} lede={t('sub')}>
        <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className={heroPrimary}>
          <WhatsAppIcon className="w-5 h-5" />
          {t('whatsappCta')}
        </a>
      </PageHero>

      <section className="py-14 md:py-20 bg-dxb-sand">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Contact pass */}
          <aside className="lg:col-span-4 dxb-lift">
            <div className="bg-white dxb-cut">
              <div className="bg-dxb-navy text-white px-6 py-4">
                <h2 className="text-xl font-extrabold tracking-[-0.015em]">{t('reachOut')}</h2>
              </div>
              <ul className="divide-y divide-dxb-line">
                {channels.map(c => {
                  const body = (
                    <>
                      <span className="grid place-items-center w-10 h-10 shrink-0 bg-dxb-sand text-dxb-cobalt">
                        <BrandIcon name={c.icon} className="w-5 h-5" />
                      </span>
                      <span className="min-w-0">
                        <span className="block dxb-label text-[10.5px] text-dxb-muted">{c.label}</span>
                        <span className="block font-bold text-dxb-navy break-words" dir={c.ltr ? 'ltr' : undefined}>{c.value}</span>
                      </span>
                    </>
                  )
                  return (
                    <li key={c.label}>
                      {c.href ? (
                        <a href={c.href} {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className="flex items-center gap-4 px-6 py-4 hover:bg-dxb-sand/60 transition-colors">
                          {body}
                        </a>
                      ) : (
                        <div className="flex items-center gap-4 px-6 py-4">{body}</div>
                      )}
                    </li>
                  )
                })}
              </ul>
            </div>
            <div className="relative bg-white dxb-notch-top px-6 pt-5 pb-6">
              <Perforation className="absolute top-0 inset-x-3 text-dxb-navy" />
              <p className="dxb-label text-[10.5px] text-dxb-cobalt">{t('responseTime')}</p>
              <p className="mt-1 text-sm text-dxb-ink/80">{t('responseCopy')}</p>
              <p className="mt-5 dxb-label text-[10.5px] text-dxb-muted mb-3">{tx('follow')}</p>
              <SocialLinks tone="dark" comingSoonLabel={tx('socialSoon')} />
            </div>
          </aside>

          {/* Form */}
          <div className="lg:col-span-8">
            <EnquiryForm />
          </div>
        </div>
      </section>
    </>
  )
}
