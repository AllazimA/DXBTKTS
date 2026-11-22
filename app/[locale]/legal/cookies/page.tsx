import { Metadata } from 'next'
import { Eyebrow } from '@/components/ui/eyebrow'
import type { Locale } from '@/i18n.config'
import { pageMetadata } from '@/lib/metadata'

export async function generateMetadata({ params }: { params: { locale: Locale } }): Promise<Metadata> {
  return pageMetadata(params.locale, 'cookies', '/legal/cookies')
}

export default function Cookies() {
  return (
    <div className="py-16 bg-dxb-ivory">
      <div className="max-w-3xl mx-auto px-6">
        <Eyebrow className="mb-4">Legal</Eyebrow>
        <h1 className="font-cormorant text-5xl font-light text-dxb-ink mb-12">
          Cookie Policy
        </h1>

        <div className="space-y-8 text-dxb-slate">
          <section>
            <h2 className="font-cormorant text-2xl font-semibold text-dxb-ink mb-4">
              What Are Cookies?
            </h2>
            <p>
              Cookies are small data files stored on your browser that help us improve your experience and remember your preferences.
            </p>
          </section>

          <section>
            <h2 className="font-cormorant text-2xl font-semibold text-dxb-ink mb-4">
              Types of Cookies We Use
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>Session Cookies:</strong> Temporary cookies that expire when you close your browser</li>
              <li><strong>Persistent Cookies:</strong> Remain on your device to remember preferences</li>
              <li><strong>Analytics Cookies:</strong> Help us understand how you use our site</li>
              <li><strong>Security Cookies:</strong> Protect against fraudulent activity</li>
            </ul>
          </section>

          <section>
            <h2 className="font-cormorant text-2xl font-semibold text-dxb-ink mb-4">
              Managing Cookies
            </h2>
            <p>
              You can control cookie settings through your browser preferences. Most browsers allow you to refuse cookies or alert you when cookies are being set.
            </p>
          </section>

          <section>
            <h2 className="font-cormorant text-2xl font-semibold text-dxb-ink mb-4">
              Your Privacy
            </h2>
            <p>
              We use cookies only for legitimate business purposes and in compliance with privacy regulations. No sensitive personal information is stored in cookies.
            </p>
          </section>

          <section>
            <h2 className="font-cormorant text-2xl font-semibold text-dxb-ink mb-4">
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
