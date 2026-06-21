'use client'

import { useTranslations } from 'next-intl'
import Link from 'next/link'

export function Footer() {
  const t = useTranslations('footer')

  return (
    <footer className="bg-dxb-navy text-white mt-16">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company */}
          <div>
            <h4 className="font-cormorant text-lg font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-gray-300 hover:text-dxb-gold transition">About</Link></li>
              <li><Link href="#careers" className="text-gray-300 hover:text-dxb-gold transition">Careers</Link></li>
              <li><Link href="/contact" className="text-gray-300 hover:text-dxb-gold transition">Contact</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-cormorant text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li><Link href="/services" className="text-gray-300 hover:text-dxb-gold transition">All Services</Link></li>
              <li><Link href="/services/dining" className="text-gray-300 hover:text-dxb-gold transition">Dining</Link></li>
              <li><Link href="/services/travel" className="text-gray-300 hover:text-dxb-gold transition">Travel</Link></li>
            </ul>
          </div>

          {/* Membership */}
          <div>
            <h4 className="font-cormorant text-lg font-semibold mb-4">Membership</h4>
            <ul className="space-y-2">
              <li><Link href="/membership" className="text-gray-300 hover:text-dxb-gold transition">Tiers</Link></li>
              <li><Link href="/corporate" className="text-gray-300 hover:text-dxb-gold transition">Corporate</Link></li>
              <li><Link href="#faq" className="text-gray-300 hover:text-dxb-gold transition">FAQ</Link></li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-cormorant text-lg font-semibold mb-4">Connect</h4>
            <p className="text-gray-300 text-sm mb-4">{t('contact')}</p>
            <div className="flex gap-4">
              <a href="#" className="text-dxb-gold hover:text-white transition">
                LinkedIn
              </a>
              <a href="#" className="text-dxb-gold hover:text-white transition">
                Instagram
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-dxb-navy-light pt-8">
          <p className="text-center text-gray-300 text-sm">
            {t('copyright')}
          </p>
        </div>
      </div>
    </footer>
  )
}
