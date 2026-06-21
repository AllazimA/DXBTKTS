import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Eyebrow } from '@/components/ui/eyebrow'
import { CTABand } from '@/components/ui/cta-band'
import { Users, TrendingUp, Heart, Briefcase } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Corporate Concierge | DXB TKTS',
  description: 'Executive lifestyle management programs for organizations and their leadership teams.',
}

const benefits = [
  {
    icon: Users,
    title: 'Executive Wellness',
    description: 'Comprehensive lifestyle support programs designed to boost executive productivity and well-being.',
  },
  {
    icon: TrendingUp,
    title: 'Talent Retention',
    description: 'Demonstrate care for your team. Premium concierge services are a powerful retention tool for top talent.',
  },
  {
    icon: Heart,
    title: 'Work-Life Balance',
    description: 'Help your team achieve equilibrium. When logistics are handled, focus returns to what matters.',
  },
  {
    icon: Briefcase,
    title: 'Duty of Care',
    description: 'Provide genuine support to your executives. Shows organizational values and strengthens loyalty.',
  },
]

export default function Corporate() {
  return (
    <>
      {/* Hero */}
      <section className="py-20 bg-gradient-to-b from-dxb-ivory to-dxb-band">
        <div className="max-w-7xl mx-auto px-6">
          <Eyebrow className="mb-4">Corporate Programs</Eyebrow>
          <h1 className="font-cormorant text-5xl md:text-6xl font-light text-dxb-ink mb-6 max-w-3xl">
            Executive Care, Scaled
          </h1>
          <p className="text-lg text-dxb-slate max-w-2xl">
            A comprehensive concierge program that empowers your executives and demonstrates organizational commitment to their success.
          </p>
        </div>
      </section>

      {/* Value Prop */}
      <section className="py-20 bg-dxb-ivory">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-cormorant text-4xl font-semibold text-dxb-ink mb-6">
                Why Leading Organizations Choose DXB TKTS
              </h2>
              <div className="space-y-4">
                <p className="text-dxb-slate leading-relaxed">
                  In competitive markets, top talent demands more than a salary. They expect a lifestyle that matches their position and effort. A corporate concierge program is a powerful statement.
                </p>
                <p className="text-dxb-slate leading-relaxed">
                  We handle the complex logistical demands so your executives can focus on strategy, innovation, and leadership. Result: productivity gains, retention improvements, and genuine organizational care.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { stat: '95%', label: 'Executive Satisfaction' },
                { stat: '30%', label: 'Retention Lift (avg)' },
                { stat: '20+', label: 'Years of Experience' },
                { stat: '500+', label: 'Vetted Partners' },
              ].map(item => (
                <div key={item.stat} className="text-center p-6 bg-dxb-band rounded">
                  <div className="font-cormorant text-3xl font-semibold text-dxb-gold mb-1">
                    {item.stat}
                  </div>
                  <p className="text-sm text-dxb-slate">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-dxb-band">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-cormorant text-4xl font-semibold text-dxb-ink mb-12 text-center">
            Key Benefits for Organizations
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map(benefit => {
              const Icon = benefit.icon
              return (
                <Card key={benefit.title}>
                  <CardHeader>
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-dxb-gold/10 mb-4">
                      <Icon className="w-6 h-6 text-dxb-gold" />
                    </div>
                    <CardTitle>{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-dxb-slate">{benefit.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Services Included */}
      <section className="py-20 bg-dxb-ivory">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-cormorant text-4xl font-semibold text-dxb-ink mb-12 text-center">
            Typical Corporate Program Includes
          </h2>

          <div className="space-y-6">
            {[
              'Executive travel coordination and planning',
              'Ground transportation and logistics management',
              'Dining reservations and event hosting',
              'Family support services (school coordination, relocations)',
              'Personal assistant services for executives',
              'Wellness and lifestyle management',
              'Real estate and property support',
              'Customized annual concierge budget (per executive or company)',
              'Dedicated account manager for C-suite',
              '24/7 emergency support and escalation line',
            ].map((service, i) => (
              <div key={i} className="flex gap-4 pb-4 border-b border-dxb-band last:border-b-0">
                <div className="text-dxb-gold font-semibold flex-shrink-0">✓</div>
                <p className="text-dxb-slate">{service}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Model */}
      <section className="py-20 bg-dxb-band">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="font-cormorant text-4xl font-semibold text-dxb-ink mb-6">
            Flexible Pricing Models
          </h2>
          <p className="text-dxb-slate mb-8 leading-relaxed">
            We tailor programs to your organization's needs. Options include per-executive retainers, annual enterprise programs, or customized hybrid models. Typically, programs range from AED 50,000 to AED 500,000+ annually, depending on scope and team size.
          </p>
          <p className="text-sm text-dxb-slate italic">
            Let's discuss what works for your organization.
          </p>
        </div>
      </section>

      {/* CTA */}
      <CTABand
        heading="Let's Talk About Your Team"
        subheading="Schedule a confidential consultation to discuss how we can elevate your executive support program."
        ctaLabel="Contact our Corporate Team"
        ctaHref="/contact"
      />
    </>
  )
}
