import { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Eyebrow } from '@/components/ui/eyebrow'
import { CTABand } from '@/components/ui/cta-band'
import { ChefHat, Plane, Home, Car, Compass, Building2, Users } from 'lucide-react'

const services = [
  {
    icon: Users,
    slug: 'membership-concierge',
    title: 'Membership Concierge',
    tagline: 'The foundation of everything',
    description: 'From restaurant reservations to private event coordination, our core service solves the everyday with grace.',
  },
  {
    icon: ChefHat,
    slug: 'dining-access',
    title: 'Dining & Exclusive Access',
    tagline: 'Doors that don\'t open for everyone',
    description: 'Michelin-starred chefs, private clubs, invitation-only experiences. Direct access. No waitlists.',
  },
  {
    icon: Compass,
    slug: 'lifestyle-management',
    title: 'Lifestyle Management',
    tagline: 'One person who knows it all',
    description: 'From personal preferences to household coordination, we manage the details so you focus on what matters.',
  },
  {
    icon: Car,
    slug: 'airport-transport',
    title: 'VIP Airport & Ground Transport',
    tagline: 'Travel without the friction',
    description: 'Seamless journeys from door to destination. Private lounges, priority handling, bespoke routing.',
  },
  {
    icon: Plane,
    slug: 'luxury-travel',
    title: 'Luxury Travel & Experiences',
    tagline: 'Journeys curated for the extraordinary',
    description: 'We design travel that feels personal, not packaged. Private islands, insider access, unforgettable moments.',
  },
  {
    icon: Home,
    slug: 'real-estate',
    title: 'Real Estate & Property Services',
    tagline: 'Off-market opportunities',
    description: 'Access to properties before they hit the market, plus white-glove services for acquisition and management.',
  },
  {
    icon: Building2,
    slug: 'corporate-concierge',
    title: 'Corporate Concierge',
    tagline: 'Executive care, scaled',
    description: 'Retain and empower your leadership team with seamless lifestyle support across your organization.',
  },
]

export const metadata: Metadata = {
  title: 'Services | DXB TKTS',
  description: 'Explore our suite of luxury concierge services, from membership to corporate programs.',
}

export default function Services() {
  return (
    <>
      {/* Hero */}
      <section className="py-20 bg-gradient-to-b from-dxb-ivory to-dxb-band">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <Eyebrow className="mb-4 flex justify-center">Our Services</Eyebrow>
          <h1 className="font-cormorant text-5xl md:text-6xl font-light text-dxb-ink mb-6">
            Extraordinary Experiences
          </h1>
          <p className="text-lg text-dxb-slate max-w-2xl mx-auto">
            A comprehensive suite of services designed to simplify your life and elevate every moment.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-dxb-ivory">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map(service => {
              const Icon = service.icon
              return (
                <Link key={service.slug} href={`/services/${service.slug}`}>
                  <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader>
                      <div className="mb-4">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-dxb-gold/10">
                          <Icon className="w-6 h-6 text-dxb-gold" />
                        </div>
                      </div>
                      <Eyebrow className="mb-2">{service.tagline}</Eyebrow>
                      <CardTitle>{service.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>{service.description}</CardDescription>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTABand
        heading="Ready to Experience the Difference?"
        ctaLabel="Request an Invitation"
        ctaHref="/contact"
      />
    </>
  )
}
