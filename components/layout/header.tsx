'use client'

import { useTranslations, useLocale } from 'next-intl'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { locales, localeMeta, type Locale } from '@/i18n.config'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

export function Header() {
  const t = useTranslations('nav')
  const locale = useLocale() as Locale
  const pathname = usePathname()
  const [localeOpen, setLocaleOpen] = useState(false)

  const getLocalizedPath = (newLocale: Locale) => {
    const pathWithoutLocale = pathname.replace(`/${locale}`, '')
    return newLocale === 'en' ? pathWithoutLocale : `/${newLocale}${pathWithoutLocale}`
  }

  const navLinks = [
    { href: '/', label: t('home') },
    { href: '/services', label: t('services') },
    { href: '/membership', label: t('membership') },
    { href: '/corporate', label: t('corporate') },
    { href: '/about', label: t('about') },
    { href: '/contact', label: t('contact') },
  ]

  return (
    <header className="sticky top-0 z-50 bg-dxb-ivory border-b border-dxb-band">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="font-cormorant text-2xl font-semibold text-dxb-ink hover:text-dxb-gold transition-colors">
            DXB TKTS
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-dxb-slate hover:text-dxb-gold transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Locale Switcher & CTA */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <button
                onClick={() => setLocaleOpen(!localeOpen)}
                className="flex items-center gap-1 text-sm font-medium text-dxb-slate hover:text-dxb-gold transition-colors"
              >
                {localeMeta[locale].name}
                <ChevronDown className="w-4 h-4" />
              </button>

              {localeOpen && (
                <div className="absolute top-full right-0 mt-2 bg-white border border-dxb-band rounded shadow-lg">
                  {locales.map(l => (
                    <Link
                      key={l}
                      href={getLocalizedPath(l)}
                      className={`block px-4 py-2 text-sm ${
                        locale === l
                          ? 'bg-dxb-band text-dxb-gold font-medium'
                          : 'text-dxb-ink hover:bg-dxb-band'
                      } transition-colors`}
                      onClick={() => setLocaleOpen(false)}
                    >
                      {localeMeta[l].name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/contact"
              className="px-6 py-2 bg-dxb-gold text-white text-sm font-medium rounded hover:bg-dxb-gold-hover transition-colors"
            >
              Enquire
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
