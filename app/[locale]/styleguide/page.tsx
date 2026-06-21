import { Metadata } from 'next'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Eyebrow } from '@/components/ui/eyebrow'

export const metadata: Metadata = {
  title: 'Design System | DXB TKTS',
  description: 'Design system and component library for DXB TKTS.',
  robots: 'noindex, nofollow',
}

export default function Styleguide() {
  return (
    <div className="space-y-16 py-12">
      {/* Colors */}
      <section className="max-w-7xl mx-auto px-6">
        <h2 className="font-cormorant text-3xl font-semibold mb-8 text-dxb-ink">Color Palette</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: 'Ink', color: 'bg-dxb-ink', hex: '#0E1B2C' },
            { name: 'Navy', color: 'bg-dxb-navy', hex: '#13294B' },
            { name: 'Gold', color: 'bg-dxb-gold', hex: '#B08D3F' },
            { name: 'Ivory', color: 'bg-dxb-ivory', hex: '#FBFAF7' },
            { name: 'Band', color: 'bg-dxb-band', hex: '#F3F1EC' },
            { name: 'Slate', color: 'bg-dxb-slate', hex: '#5A6B7B' },
            { name: 'White', color: 'bg-white border-2 border-gray-200', hex: '#FFFFFF' },
            { name: 'Gold Hover', color: 'bg-dxb-gold-hover', hex: '#8C6E2E' },
          ].map(col => (
            <div key={col.name}>
              <div className={`${col.color} w-full h-24 rounded mb-2`} />
              <p className="font-semibold text-sm text-dxb-ink">{col.name}</p>
              <p className="text-xs text-dxb-slate">{col.hex}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Typography */}
      <section className="max-w-7xl mx-auto px-6">
        <h2 className="font-cormorant text-3xl font-semibold mb-8 text-dxb-ink">Typography</h2>
        <div className="space-y-6">
          <div>
            <p className="text-xs font-semibold tracking-widest text-dxb-slate uppercase mb-2">Eyebrow / Label</p>
            <p className="text-xs font-semibold tracking-widest text-dxb-gold uppercase">Premium Luxury Concierge</p>
          </div>
          <div>
            <p className="text-xs font-semibold tracking-widest text-dxb-slate uppercase mb-2">H1 / Display (Cormorant, Light)</p>
            <h1 className="font-cormorant text-6xl font-light text-dxb-ink">Your Time Matters Most</h1>
          </div>
          <div>
            <p className="text-xs font-semibold tracking-widest text-dxb-slate uppercase mb-2">H2 / Section Heading</p>
            <h2 className="font-cormorant text-4xl font-semibold text-dxb-ink">Timeless Elegance</h2>
          </div>
          <div>
            <p className="text-xs font-semibold tracking-widest text-dxb-slate uppercase mb-2">H3 / Card Title</p>
            <h3 className="font-cormorant text-2xl font-semibold text-dxb-ink">Curated Excellence</h3>
          </div>
          <div>
            <p className="text-xs font-semibold tracking-widest text-dxb-slate uppercase mb-2">Body / Paragraph</p>
            <p className="text-base text-dxb-slate leading-relaxed">We anticipate what you need before you ask. Discreet, effortless, always available. Our concierge service is built on two decades of luxury expertise and a network of the world's finest partners.</p>
          </div>
        </div>
      </section>

      {/* Buttons */}
      <section className="max-w-7xl mx-auto px-6">
        <h2 className="font-cormorant text-3xl font-semibold mb-8 text-dxb-ink">Buttons</h2>
        <div className="space-y-8">
          {['primary', 'secondary', 'outline', 'ghost'].map(variant => (
            <div key={variant}>
              <p className="text-sm font-semibold text-dxb-slate mb-4 capitalize">{variant}</p>
              <div className="flex flex-wrap gap-4">
                {['sm', 'md', 'lg', 'xl'].map(size => (
                  <Button key={`${variant}-${size}`} variant={variant as any} size={size as any}>
                    Button {size}
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Cards */}
      <section className="max-w-7xl mx-auto px-6">
        <h2 className="font-cormorant text-3xl font-semibold mb-8 text-dxb-ink">Cards</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {['Dining', 'Travel', 'Lifestyle'].map(title => (
            <Card key={title}>
              <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>Exclusive access and curated experiences</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-dxb-slate">Seamless coordination of your most important moments, handled with discretion and excellence.</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Badges */}
      <section className="max-w-7xl mx-auto px-6">
        <h2 className="font-cormorant text-3xl font-semibold mb-8 text-dxb-ink">Badges</h2>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Badge variant="gold">Premium Member</Badge>
            <Badge variant="navy">VIP Access</Badge>
            <Badge variant="slate">24/7 Support</Badge>
            <Badge variant="outline">Apply Now</Badge>
          </div>
        </div>
      </section>

      {/* Form Elements */}
      <section className="max-w-7xl mx-auto px-6">
        <h2 className="font-cormorant text-3xl font-semibold mb-8 text-dxb-ink">Form Elements</h2>
        <div className="max-w-md space-y-6">
          <div>
            <Label htmlFor="email" className="mb-2">Email Address</Label>
            <Input id="email" type="email" placeholder="hello@example.com" />
          </div>
          <div>
            <Label htmlFor="message" className="mb-2">Message</Label>
            <textarea
              id="message"
              className="flex w-full rounded border border-dxb-band bg-white px-3 py-2 text-sm placeholder:text-dxb-slate/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dxb-gold min-h-32"
              placeholder="Tell us about yourself..."
            />
          </div>
        </div>
      </section>

      {/* Eyebrow Labels */}
      <section className="max-w-7xl mx-auto px-6 pb-12">
        <h2 className="font-cormorant text-3xl font-semibold mb-8 text-dxb-ink">Eyebrow Labels</h2>
        <div className="space-y-4">
          <Eyebrow>Luxury Concierge</Eyebrow>
          <Eyebrow>Premium Services</Eyebrow>
          <Eyebrow>Discretion Guaranteed</Eyebrow>
        </div>
      </section>
    </div>
  )
}
