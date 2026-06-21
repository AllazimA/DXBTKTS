import { Metadata } from 'next'
import { Eyebrow } from '@/components/ui/eyebrow'

export const metadata: Metadata = {
  title: 'Terms of Service | DXB TKTS',
  description: 'DXB TKTS Terms of Service.',
}

export default function Terms() {
  return (
    <div className="py-16 bg-dxb-ivory">
      <div className="max-w-3xl mx-auto px-6">
        <Eyebrow className="mb-4">Legal</Eyebrow>
        <h1 className="font-cormorant text-5xl font-light text-dxb-ink mb-12">
          Terms of Service
        </h1>

        <div className="space-y-8 text-dxb-slate">
          <section>
            <h2 className="font-cormorant text-2xl font-semibold text-dxb-ink mb-4">
              Agreement to Terms
            </h2>
            <p>
              By accessing and using this website and our services, you accept and agree to be bound by the terms and provision of this agreement.
            </p>
          </section>

          <section>
            <h2 className="font-cormorant text-2xl font-semibold text-dxb-ink mb-4">
              Membership Terms
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Membership tiers are subject to application and approval</li>
              <li>Members agree to provide accurate information</li>
              <li>Services are provided as described in membership tier details</li>
              <li>DXB TKTS reserves the right to terminate membership for breach of terms</li>
            </ul>
          </section>

          <section>
            <h2 className="font-cormorant text-2xl font-semibold text-dxb-ink mb-4">
              Limitation of Liability
            </h2>
            <p>
              DXB TKTS shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the website or services.
            </p>
          </section>

          <section>
            <h2 className="font-cormorant text-2xl font-semibold text-dxb-ink mb-4">
              Governing Law
            </h2>
            <p>
              These terms are governed by the laws of the United Arab Emirates, without regard to its conflict of law principles.
            </p>
          </section>

          <section>
            <h2 className="font-cormorant text-2xl font-semibold text-dxb-ink mb-4">
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
