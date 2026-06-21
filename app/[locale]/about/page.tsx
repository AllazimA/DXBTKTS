import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Eyebrow } from '@/components/ui/eyebrow'
import { CTABand } from '@/components/ui/cta-band'

export const metadata: Metadata = {
  title: 'About Us | DXB TKTS',
  description: 'Learn about DXB TKTS, our philosophy, and our commitment to excellence.',
}

export default function About() {
  return (
    <>
      {/* Hero */}
      <section className="py-20 bg-gradient-to-b from-dxb-ivory to-dxb-band">
        <div className="max-w-7xl mx-auto px-6">
          <Eyebrow className="mb-4">About Us</Eyebrow>
          <h1 className="font-cormorant text-5xl md:text-6xl font-light text-dxb-ink mb-6 max-w-3xl">
            Two Decades of Luxury Excellence
          </h1>
          <p className="text-lg text-dxb-slate max-w-2xl">
            DXB TKTS is built on 20+ years of experience serving the region's most discerning families, executives, and organizations.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 bg-dxb-ivory">
        <div className="max-w-3xl mx-auto px-6">
          <div className="space-y-8">
            <div>
              <Eyebrow className="mb-3">Our Philosophy</Eyebrow>
              <h2 className="font-cormorant text-4xl font-semibold text-dxb-ink mb-4">
                Anticipate, Don't React
              </h2>
              <p className="text-lg text-dxb-slate leading-relaxed">
                We don't wait for requests. We understand your world—your preferences, your priorities, your expectations. We study patterns. We build relationships. We prepare. When you need something, we've already thought three steps ahead.
              </p>
            </div>

            <div>
              <Eyebrow className="mb-3">Discretion is Sacred</Eyebrow>
              <h2 className="font-cormorant text-4xl font-semibold text-dxb-ink mb-4">
                Your Privacy, Our Responsibility
              </h2>
              <p className="text-lg text-dxb-slate leading-relaxed">
                What happens between you and DXB TKTS stays confidential. Period. Your preferences, your networks, your transactions—all protected with the same care we'd apply to our own families. We're bound by strict data protection protocols and an unwavering commitment to discretion.
              </p>
            </div>

            <div>
              <Eyebrow className="mb-3">Vetted Excellence</Eyebrow>
              <h2 className="font-cormorant text-4xl font-semibold text-dxb-ink mb-4">
                A Curated Network of 500+ Partners
              </h2>
              <p className="text-lg text-dxb-slate leading-relaxed">
                We don't settle for good. Every partner—every chef, hotel concierge, yacht broker, private jet operator, real estate agent—has been personally vetted. We've built relationships across Dubai, the region, and the world's most exclusive destinations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="py-20 bg-dxb-band">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-cormorant text-4xl font-semibold text-dxb-ink mb-12 text-center">
            Our Commitments
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                label: 'Anticipation',
                description: 'We don\'t react—we predict and prepare. Your needs are met before you express them.',
              },
              {
                label: 'Reliability',
                description: 'Response times are guaranteed. 24/7 support means we\'re always here, always ready.',
              },
              {
                label: 'Integrity',
                description: 'Your trust is everything. We operate with absolute honesty and unwavering discretion.',
              },
              {
                label: 'Quality',
                description: 'Only the best. Every experience, every introduction, every detail reflects our standards.',
              },
              {
                label: 'Access',
                description: 'We open doors. Exclusive, off-market, invitation-only—we get you there.',
              },
              {
                label: 'Elegance',
                description: 'Luxury is restraint. We handle the complex with understated grace.',
              },
            ].map(value => (
              <div key={value.label} className="text-center">
                <h3 className="font-cormorant text-2xl font-semibold text-dxb-ink mb-2">
                  {value.label}
                </h3>
                <p className="text-dxb-slate">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTABand
        heading="Join a Curated Circle"
        ctaLabel="Apply for Membership"
        ctaHref="/contact"
      />
    </>
  )
}
