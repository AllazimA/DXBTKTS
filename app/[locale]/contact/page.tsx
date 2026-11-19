import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { EnquiryForm } from '@/components/forms/enquiry-form'
import { Mail, Phone, MapPin } from 'lucide-react'
import type { Locale } from '@/i18n.config'
import { pageMetadata } from '@/lib/metadata'
import { site, whatsappLink } from '@/lib/site'
import { SocialLinks } from '@/components/layout/social-links'
import { WhatsAppIcon } from '@/components/ui/whatsapp-icon'

export async function generateMetadata({ params }: { params: { locale: Locale } }): Promise<Metadata> {
  return pageMetadata(params.locale, 'contact', '/contact')
}

export default async function Contact() {
  const t = await getTranslations('contact')
  const tx = await getTranslations('footerExtra')

  return (
    <>
      {/* Hero */}
      <section className="py-20 bg-gradient-to-b from-dxb-ivory to-dxb-band">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="block text-xs font-semibold tracking-[0.35em] text-dxb-gold uppercase mb-4">
            {t('eyebrow')}
          </span>
          <h1 className="font-cormorant text-5xl md:text-6xl font-light text-dxb-ink mb-6">
            {t('title')}
          </h1>
          <p className="text-lg text-dxb-slate max-w-2xl mx-auto">{t('sub')}</p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-dxb-ivory">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div>
              <h3 className="font-cormorant text-2xl font-semibold text-dxb-ink mb-8">
                {t('reachOut')}
              </h3>

              <div className="space-y-8">
                {/* Email */}
                <div className="flex gap-4">
                  <Mail className="w-6 h-6 text-dxb-gold flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-xs font-semibold tracking-widest text-dxb-gold uppercase mb-1">
                      {t('email')}
                    </p>
                    <a
                      href={`mailto:${site.email}`}
                      className="text-dxb-slate hover:text-dxb-gold transition"
                    >
                      {site.email}
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex gap-4">
                  <Phone className="w-6 h-6 text-dxb-gold flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-xs font-semibold tracking-widest text-dxb-gold uppercase mb-1">
                      {t('phone')}
                    </p>
                    <a
                      href={`tel:${site.whatsapp.e164}`}
                      className="text-dxb-slate hover:text-dxb-gold transition"
                      dir="ltr"
                    >
                      {site.whatsapp.display}
                    </a>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex gap-4">
                  <WhatsAppIcon className="w-6 h-6 text-[#25D366] flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-xs font-semibold tracking-widest text-dxb-gold uppercase mb-1">
                      {t('whatsapp')}
                    </p>
                    <a
                      href={whatsappLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-dxb-slate hover:text-dxb-gold transition"
                    >
                      {t('whatsappCta')}
                    </a>
                  </div>
                </div>

                {/* Location */}
                <div className="flex gap-4">
                  <MapPin className="w-6 h-6 text-dxb-gold flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-xs font-semibold tracking-widest text-dxb-gold uppercase mb-1">
                      {t('location')}
                    </p>
                    <p className="text-dxb-slate">{t('locationValue')}</p>
                  </div>
                </div>
              </div>

              {/* Social */}
              <div className="mt-10">
                <p className="text-xs font-semibold tracking-widest text-dxb-gold uppercase mb-3">{tx('follow')}</p>
                <SocialLinks tone="dark" comingSoonLabel={tx('socialSoon')} />
              </div>

              {/* Response Time */}
              <div className="mt-12 p-6 bg-dxb-band rounded">
                <p className="text-xs font-semibold tracking-widest text-dxb-gold uppercase mb-2">
                  {t('responseTime')}
                </p>
                <p className="text-sm text-dxb-slate">{t('responseCopy')}</p>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <EnquiryForm />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
