import { Metadata } from 'next'
import { Eyebrow } from '@/components/ui/eyebrow'
import type { Locale } from '@/i18n.config'
import { pageMetadata } from '@/lib/metadata'

export async function generateMetadata({ params }: { params: { locale: Locale } }): Promise<Metadata> {
  return pageMetadata(params.locale, 'privacy', '/legal/privacy')
}

export default function Privacy() {
  return (
    <div className="py-12 md:py-16 bg-dxb-sand">
      <div className="max-w-3xl mx-auto px-5 sm:px-6 bg-white dxb-cut dxb-cut-lg py-10 md:py-14 md:px-14">
        <Eyebrow className="mb-4">Legal</Eyebrow>
        <h1 className="font-display text-4xl md:text-5xl text-dxb-navy mb-10 pb-6 border-b-2 border-dxb-navy">
          Privacy policy
        </h1>

        <div className="space-y-8 text-dxb-ink/80 leading-relaxed">
          <section>
            <h2 className="text-xl md:text-2xl font-extrabold tracking-[-0.015em] text-dxb-navy mb-3">
              Your privacy matters
            </h2>
            <p>
              At DXB TKTS, your privacy is paramount. This Privacy Policy explains how we collect, use, and protect your personal information.
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-extrabold tracking-[-0.015em] text-dxb-navy mb-3">
              Information we collect
            </h2>
            <p>
              When you contact us or make an enquiry, we collect information such as:
            </p>
            <ul className="list-disc list-inside space-y-2 mt-3">
              <li>Name, email, phone number, and contact preferences</li>
              <li>Lifestyle preferences and service interests</li>
              <li>Communication history and service requests</li>
              <li>Technical information (IP address, browser type, pages visited)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-extrabold tracking-[-0.015em] text-dxb-navy mb-3">
              How we use your information
            </h2>
            <p>
              We use your information to:
            </p>
            <ul className="list-disc list-inside space-y-2 mt-3">
              <li>Provide and improve our concierge services</li>
              <li>Communicate with you about your enquiry and bookings</li>
              <li>Process your enquiries and requests</li>
              <li>Enhance website functionality and user experience</li>
              <li>Comply with legal and regulatory requirements</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-extrabold tracking-[-0.015em] text-dxb-navy mb-3">
              Data protection
            </h2>
            <p>
              We employ industry-standard security measures to protect your personal information from unauthorized access, alteration, and disclosure.
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-extrabold tracking-[-0.015em] text-dxb-navy mb-3">
              Contact us
            </h2>
            <p>
              For privacy inquiries, please contact us at{' '}
              <a href="mailto:hello@dxbtkts.com" className="text-dxb-gold hover:text-dxb-gold-hover">
                hello@dxbtkts.com
              </a>
            </p>
          </section>

          <p className="text-sm text-dxb-slate/70 mt-12">
            Last updated: June 2024
          </p>
        </div>
      </div>
    </div>
  )
}
