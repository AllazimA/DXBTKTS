import { Metadata } from 'next'
import { EnquiryForm } from '@/components/forms/enquiry-form'
import { Eyebrow } from '@/components/ui/eyebrow'
import { Mail, Phone, MapPin } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Contact Us | DXB TKTS',
  description: 'Get in touch with DXB TKTS. Request an invitation or learn more about our services.',
}

export default function Contact() {
  return (
    <>
      {/* Hero */}
      <section className="py-20 bg-gradient-to-b from-dxb-ivory to-dxb-band">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <Eyebrow className="mb-4 flex justify-center">Get in Touch</Eyebrow>
          <h1 className="font-cormorant text-5xl md:text-6xl font-light text-dxb-ink mb-6">
            Begin Your Journey
          </h1>
          <p className="text-lg text-dxb-slate max-w-2xl mx-auto">
            Contact us to learn more about membership or to discuss how we can serve your lifestyle needs.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-dxb-ivory">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div>
              <h3 className="font-cormorant text-2xl font-semibold text-dxb-ink mb-8">Reach Out</h3>

              <div className="space-y-8">
                {/* Email */}
                <div className="flex gap-4">
                  <Mail className="w-6 h-6 text-dxb-gold flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-xs font-semibold tracking-widest text-dxb-gold uppercase mb-1">Email</p>
                    <a href="mailto:hello@dxbtkts.com" className="text-dxb-slate hover:text-dxb-gold transition">
                      hello@dxbtkts.com
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex gap-4">
                  <Phone className="w-6 h-6 text-dxb-gold flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-xs font-semibold tracking-widest text-dxb-gold uppercase mb-1">Phone</p>
                    <a href="tel:+9714XXXXXXXX" className="text-dxb-slate hover:text-dxb-gold transition">
                      +971 4 XXX XXXX
                    </a>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex gap-4">
                  <Phone className="w-6 h-6 text-dxb-gold flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-xs font-semibold tracking-widest text-dxb-gold uppercase mb-1">WhatsApp</p>
                    <a
                      href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '971'}?text=Hi%20DXB%20TKTS`}
                      className="text-dxb-slate hover:text-dxb-gold transition"
                    >
                      Chat with us
                    </a>
                  </div>
                </div>

                {/* Location */}
                <div className="flex gap-4">
                  <MapPin className="w-6 h-6 text-dxb-gold flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-xs font-semibold tracking-widest text-dxb-gold uppercase mb-1">Location</p>
                    <p className="text-dxb-slate">
                      Dubai, UAE
                    </p>
                  </div>
                </div>
              </div>

              {/* Response Time */}
              <div className="mt-12 p-6 bg-dxb-band rounded">
                <p className="text-xs font-semibold tracking-widest text-dxb-gold uppercase mb-2">Response Time</p>
                <p className="text-sm text-dxb-slate">
                  We aim to respond to all enquiries within 24 hours. For urgent matters, please contact us via WhatsApp.
                </p>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <EnquiryForm />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
