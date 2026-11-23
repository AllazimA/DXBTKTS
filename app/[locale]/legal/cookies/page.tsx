import { Metadata } from 'next'
import { Eyebrow } from '@/components/ui/eyebrow'
import type { Locale } from '@/i18n.config'
import { pageMetadata } from '@/lib/metadata'

export async function generateMetadata({ params }: { params: { locale: Locale } }): Promise<Metadata> {
  return pageMetadata(params.locale, 'cookies', '/legal/cookies')
}

export default function Cookies() {
  return (
    <div className="py-12 md:py-16 bg-dxb-sand">
      <div className="max-w-3xl mx-auto px-5 sm:px-6 bg-white dxb-cut dxb-cut-lg py-10 md:py-14 md:px-14">
        <Eyebrow className="mb-4">Legal</Eyebrow>
        <h1 className="font-display text-4xl md:text-5xl text-dxb-navy mb-10 pb-6 border-b-2 border-dxb-navy">
          Cookie policy
        </h1>

        <div className="space-y-8 text-dxb-ink/80 leading-relaxed">
          <section>
            <h2 className="text-xl md:text-2xl font-extrabold tracking-[-0.015em] text-dxb-navy mb-3">
              What are cookies?
            </h2>
            <p>
              Cookies are small data files stored on your browser that help us improve your experience and remember your preferences.
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-extrabold tracking-[-0.015em] text-dxb-navy mb-3">
              Types of cookies we use
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>Session Cookies:</strong> Temporary cookies that expire when you close your browser</li>
              <li><strong>Persistent Cookies:</strong> Remain on your device to remember preferences</li>
              <li><strong>Analytics Cookies:</strong> Help us understand how you use our site</li>
              <li><strong>Security Cookies:</strong> Protect against fraudulent activity</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-extrabold tracking-[-0.015em] text-dxb-navy mb-3">
              Managing cookies
            </h2>
            <p>
              You can control cookie settings through your browser preferences. Most browsers allow you to refuse cookies or alert you when cookies are being set.
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-extrabold tracking-[-0.015em] text-dxb-navy mb-3">
              Your privacy
            </h2>
            <p>
              We use cookies only for legitimate business purposes and in compliance with privacy regulations. No sensitive personal information is stored in cookies.
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-extrabold tracking-[-0.015em] text-dxb-navy mb-3">
              Questions?
            </h2>
            <p>
              For questions about cookies, contact{' '}
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
