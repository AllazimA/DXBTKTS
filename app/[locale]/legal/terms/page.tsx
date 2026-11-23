import { Metadata } from 'next'
import { Eyebrow } from '@/components/ui/eyebrow'
import type { Locale } from '@/i18n.config'
import { pageMetadata } from '@/lib/metadata'

export async function generateMetadata({ params }: { params: { locale: Locale } }): Promise<Metadata> {
  return pageMetadata(params.locale, 'terms', '/legal/terms')
}

export default function Terms() {
  return (
    <div className="py-12 md:py-16 bg-dxb-sand">
      <div className="max-w-3xl mx-auto px-5 sm:px-6 bg-white dxb-cut dxb-cut-lg py-10 md:py-14 md:px-14">
        <Eyebrow className="mb-4">Legal</Eyebrow>
        <h1 className="font-display text-4xl md:text-5xl text-dxb-navy mb-10 pb-6 border-b-2 border-dxb-navy">
          Terms of service
        </h1>

        <div className="space-y-8 text-dxb-ink/80 leading-relaxed">
          <section>
            <h2 className="text-xl md:text-2xl font-extrabold tracking-[-0.015em] text-dxb-navy mb-3">
              Agreement to terms
            </h2>
            <p>
              By accessing and using this website and our services, you accept and agree to be bound by the terms and provision of this agreement.
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-extrabold tracking-[-0.015em] text-dxb-navy mb-3">
              Bookings and services
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Experiences are delivered by licensed partner operators in Dubai and the UAE</li>
              <li>You agree to provide accurate information when making an enquiry or booking</li>
              <li>Details, prices and cancellation terms are confirmed with you in writing before any payment</li>
              <li>Full booking conditions will be published before online bookings open</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-extrabold tracking-[-0.015em] text-dxb-navy mb-3">
              Limitation of liability
            </h2>
            <p>
              DXB TKTS shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the website or services.
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-extrabold tracking-[-0.015em] text-dxb-navy mb-3">
              Governing law
            </h2>
            <p>
              These terms are governed by the laws of the United Arab Emirates, without regard to its conflict of law principles.
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-extrabold tracking-[-0.015em] text-dxb-navy mb-3">
              Contact
            </h2>
            <p>
              For questions about these terms, contact{' '}
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
