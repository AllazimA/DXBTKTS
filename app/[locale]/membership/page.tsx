import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Eyebrow } from '@/components/ui/eyebrow'
import { CTABand } from '@/components/ui/cta-band'
import { Check } from 'lucide-react'

const tiers = [
  {
    name: 'Signature',
    priceDisplay: 'From AED 15,000 annually',
    tagline: 'Concierge at your fingertips',
    description: 'Perfect for individuals seeking premium concierge support.',
    features: [
      '24/7 concierge support via phone, WhatsApp, email',
      'Dining reservations and event coordination',
      'Travel planning and logistics',
      'Personal assistant services (up to 20 hours monthly)',
      'Access to curated experiences',
      '2-hour WhatsApp response SLA',
      '1 annual complimentary experience (AED 5,000 value)',
    ],
    cta: 'Learn More',
    ctaHref: '/contact',
    highlight: false,
  },
  {
    name: 'Privé',
    priceDisplay: 'On Application',
    tagline: 'Seamless luxury, elevated',
    description: 'For discerning individuals who demand excellence.',
    features: [
      'Everything in Signature, plus:',
      'Dedicated account manager (direct personal line)',
      'Unlimited lifestyle management and personal assistance',
      'Priority access to exclusive events and experiences',
      'Sommelier and dining concierge services',
      'Real estate introduction services',
      'AED 50,000 annual concierge credit',
      '30-minute WhatsApp response SLA',
      '2 annual curated experiences (AED 10,000 each)',
    ],
    cta: 'Apply Now',
    ctaHref: '/contact',
    highlight: true,
  },
  {
    name: 'Noir',
    priceDisplay: 'By Invitation Only',
    tagline: 'Uncompromising service for the uncompromising',
    description: 'For UHNWIs and family offices seeking bespoke concierge.',
    features: [
      'Everything in Privé, plus:',
      'White-glove, fully bespoke services',
      'Executive/family office integration',
      'Global travel coordination and private jet liaison',
      'Off-market real estate and investment introductions',
      'Vetted specialist network (medical, legal, tax, security)',
      'Unlimited concierge budget',
      'Immediate WhatsApp response SLA (24/7)',
      'Quarterly in-person strategy sessions',
      'Access to invitation-only global experiences',
    ],
    cta: 'By Referral',
    ctaHref: '/contact',
    highlight: false,
  },
]

export const metadata: Metadata = {
  title: 'Membership Tiers | DXB TKTS',
  description: 'Choose the membership tier that fits your lifestyle: Signature, Privé, or Noir.',
}

export default function Membership() {
  return (
    <>
      {/* Hero */}
      <section className="py-20 bg-gradient-to-b from-dxb-ivory to-dxb-band">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <Eyebrow className="mb-4 flex justify-center">Membership</Eyebrow>
          <h1 className="font-cormorant text-5xl md:text-6xl font-light text-dxb-ink mb-6">
            Three Levels of Excellence
          </h1>
          <p className="text-lg text-dxb-slate max-w-2xl mx-auto">
            Choose the tier that reflects your lifestyle and your expectations.
          </p>
        </div>
      </section>

      {/* Tiers */}
      <section className="py-20 bg-dxb-ivory">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {tiers.map(tier => (
              <div key={tier.name} className="relative">
                {tier.highlight && (
                  <div className="absolute -inset-0.5 bg-dxb-gold rounded blur opacity-20 -z-10" />
                )}
                <Card className={`h-full ${tier.highlight ? 'border-2 border-dxb-gold' : ''}`}>
                  <CardHeader>
                    {tier.highlight && (
                      <Badge variant="gold" className="w-fit mb-3">Recommended</Badge>
                    )}
                    <CardTitle className="text-2xl">{tier.name}</CardTitle>
                    <p className="text-dxb-gold font-semibold mt-2">{tier.priceDisplay}</p>
                    <Eyebrow className="mt-4 text-sm">{tier.tagline}</Eyebrow>
                    <p className="text-sm text-dxb-slate mt-2">{tier.description}</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 mb-6">
                      {tier.features.map((feature, i) => (
                        <li key={i} className="flex gap-3 text-sm">
                          {feature.startsWith('Everything') || feature.startsWith('All') ? (
                            <span className="text-dxb-gold font-semibold flex-shrink-0">→</span>
                          ) : (
                            <Check className="w-4 h-4 text-dxb-gold flex-shrink-0 mt-0.5" />
                          )}
                          <span className="text-dxb-slate">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button asChild variant={tier.highlight ? 'primary' : 'outline'} className="w-full">
                      <Link href={tier.ctaHref}>{tier.cta}</Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ or Additional Info */}
      <section className="py-20 bg-dxb-band">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="font-cormorant text-4xl font-semibold text-dxb-ink mb-6">Questions?</h2>
          <p className="text-dxb-slate mb-8">
            Our team is ready to discuss which membership tier best suits your lifestyle and needs. Contact us for a confidential consultation.
          </p>
          <Button asChild variant="primary" size="lg">
            <Link href="/contact">Get in Touch</Link>
          </Button>
        </div>
      </section>
    </>
  )
}
