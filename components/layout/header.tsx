'use client'

import { useTranslations, useLocale } from 'next-intl'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { locales, localeMeta, type Locale } from '@/i18n.config'
import { ChevronDown, Menu, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { PlanButton } from '@/components/catalogue/plan-drawer'
import { Flag } from '@/components/ui/flag'
import { BrandIcon, Logo, TearText } from '@/components/brand'

export function Header() {
  const t = useTranslations('nav')
  const th = useTranslations('header')
  const locale = useLocale() as Locale
  const pathname = usePathname()
  const [localeOpen, setLocaleOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [diningOpen, setDiningOpen] = useState(false)
  // Pages that open with a full-bleed film or photo mark it with [data-hero-overlay];
  // the header then floats transparent over it until the visitor scrolls.
  const [overlay, setOverlay] = useState(false)
  const diningRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOverlay(Boolean(document.querySelector('[data-hero-overlay]')))
  }, [pathname])

  // Close the mobile menu on navigation
  useEffect(() => {
    setMenuOpen(false)
    setLocaleOpen(false)
    setDiningOpen(false)
  }, [pathname])

  // Close the Dining & Nightlife menu on an outside click or Escape
  useEffect(() => {
    if (!diningOpen) return
    const onDown = (e: MouseEvent) => { if (!diningRef.current?.contains(e.target as Node)) setDiningOpen(false) }
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setDiningOpen(false) }
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => { document.removeEventListener('mousedown', onDown); document.removeEventListener('keydown', onKey) }
  }, [diningOpen])

  const getLocalizedPath = (newLocale: Locale) => {
    const pathWithoutLocale = pathname.replace(new RegExp(`^/${locale}(?=/|$)`), '') || '/'
    // Always use an explicit prefix (also /en): the middleware then stores the
    // new language in the NEXT_LOCALE cookie and, for English, redirects to the
    // unprefixed URL. An unprefixed link would be sent back to the old language.
    return pathWithoutLocale === '/' ? `/${newLocale}` : `/${newLocale}${pathWithoutLocale}`
  }

  // Home is the wordmark; the desktop bar has no separate Home link, to make room for Dining & Nightlife.
  const navLinks = [
    { href: '/', label: t('home') },
    { href: '/about', label: t('about') },
    { href: '/experiences', label: t('experiences') },
    { href: '/services', label: t('services') },
    { href: '/dining', label: t('restaurants') },
    { href: '/nightlife', label: t('nightlife') },
    { href: '/tickets', label: t('tickets') },
    { href: '/membership', label: t('membership') },
    { href: '/blog', label: t('blog') },
    { href: '/contact', label: t('contact') },
  ]


  // Path without the locale prefix, for active-link matching
  const basePath = pathname.replace(new RegExp(`^/${locale}(?=/|$)`), '') || '/'
  const isActive = (href: string) =>
    href === '/' ? basePath === '/' : basePath === href || basePath.startsWith(`${href}/`)

  return (
    <header
      className={`sticky top-0 z-50 text-white transition-[background-color,box-shadow,backdrop-filter] duration-500 ${
        overlay && !scrolled && !menuOpen
          ? 'bg-gradient-to-b from-dxb-ink/70 to-transparent'
          : 'bg-dxb-navy/95 backdrop-blur-xl shadow-[0_14px_32px_-20px_rgba(10,14,42,0.8)]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6">
        <div
          className={`flex items-center justify-between gap-4 2xl:gap-8 transition-[height] duration-300 ${
            scrolled ? 'h-16' : 'h-[76px]'
          }`}
        >
          {/* Logo: approved T-Ticket lockup, reverse on navy */}
          <Link href="/" className="flex flex-col justify-center leading-none shrink-0" aria-label="DXB TKTS">
            <Logo tone="reverse" className={`transition-all duration-300 ${scrolled ? 'h-[22px]' : 'h-[26px]'}`} />
            <TearText
              text={th('tagline')}
              className={`dxb-label text-[10px] text-white/55 transition-all duration-300 overflow-hidden ${scrolled ? 'max-h-0 opacity-0 mt-0' : 'max-h-4 mt-2'}`}
            />
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden xl:flex items-center gap-5 2xl:gap-7">
            {navLinks.map(link => {
              if (link.href === '/' || link.href === '/nightlife') return null
              if (link.href === '/dining') {
                const active = isActive('/dining') || isActive('/nightlife')
                return (
                  <div key="dining" ref={diningRef} className="relative" onMouseEnter={() => setDiningOpen(true)} onMouseLeave={() => setDiningOpen(false)}>
                    <button
                      type="button"
                      onClick={() => setDiningOpen(o => !o)}
                      aria-expanded={diningOpen}
                      aria-haspopup="menu"
                      className={`group relative flex items-center gap-1 py-2 text-[14px] 2xl:text-[15px] font-semibold whitespace-nowrap transition-colors ${
                        active ? 'text-white' : 'text-white/75 hover:text-white'
                      }`}
                    >
                      <span className="2xl:hidden">{t('diningShort')}</span>
                      <span className="hidden 2xl:inline">{t('diningNightlife')}</span>
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${diningOpen ? 'rotate-180' : ''}`} />
                      <span className={`absolute -bottom-1 start-0 h-[3px] bg-dxb-orange transition-all duration-300 ${active ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                    </button>
                    {diningOpen && (
                      <div role="menu" className="absolute top-full start-0 pt-3 min-w-[13rem]">
                        <div className="bg-white text-dxb-ink dxb-cut dxb-cut-sm shadow-ticket-lg py-2">
                          {[{ href: '/dining', label: t('restaurants'), icon: 'dining' as const }, { href: '/nightlife', label: t('nightlife'), icon: 'nightlife' as const }].map(item => (
                            <Link
                              key={item.href}
                              href={item.href}
                              role="menuitem"
                              onClick={() => setDiningOpen(false)}
                              className={`flex items-center gap-3 px-5 py-2.5 text-[15px] font-semibold transition-colors ${isActive(item.href) ? 'text-dxb-cobalt' : 'text-dxb-ink hover:bg-dxb-sand'}`}
                            >
                              <BrandIcon name={item.icon} className="w-[18px] h-[18px] text-dxb-muted" />
                              {item.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )
              }
              const active = isActive(link.href)
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? 'page' : undefined}
                  className={`group relative py-2 text-[14px] 2xl:text-[15px] font-semibold whitespace-nowrap transition-colors ${
                    active ? 'text-white' : 'text-white/75 hover:text-white'
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-1 start-0 h-[3px] bg-dxb-orange transition-all duration-300 ${
                      active ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </Link>
              )
            })}
          </nav>

          <div className="flex items-center gap-3 sm:gap-4">
            {/* Locale switcher */}
            <div className="relative hidden sm:block">
              <button
                onClick={() => setLocaleOpen(!localeOpen)}
                aria-expanded={localeOpen}
                aria-haspopup="menu"
                aria-label={`Language: ${localeMeta[locale].name}`}
                className="flex items-center gap-1.5 text-white/80 hover:text-white transition-colors"
              >
                <Flag locale={locale} />
                <span className="dxb-label text-[12px]">{locale === 'ar' ? localeMeta[locale].name : locale}</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${localeOpen ? 'rotate-180' : ''}`} />
              </button>

              {localeOpen && (
                <div role="menu" className="absolute top-full end-0 mt-3 min-w-[11rem] bg-white text-dxb-ink dxb-cut dxb-cut-sm shadow-ticket-lg py-2">
                  {locales.map(l => (
                    <a
                      key={l}
                      href={getLocalizedPath(l)}
                      hrefLang={l}
                      lang={l}
                      role="menuitem"
                      aria-current={locale === l ? 'true' : undefined}
                      className={`flex items-center gap-3 px-5 py-2.5 text-sm transition-colors ${
                        locale === l ? 'text-dxb-cobalt font-semibold' : 'text-dxb-ink hover:bg-dxb-sand'
                      }`}
                      onClick={() => setLocaleOpen(false)}
                    >
                      <Flag locale={l} />
                      {localeMeta[l].name}
                    </a>
                  ))}
                </div>
              )}
            </div>

            <PlanButton className="text-white/85 hover:!text-dxb-orange" />

            <Link
              href="/request"
              className="hidden sm:inline-flex items-center gap-2 whitespace-nowrap h-11 px-5 bg-dxb-orange text-dxb-ink text-[14px] font-bold dxb-cut dxb-cut-sm transition-colors duration-200 hover:bg-dxb-orange-hover"
            >
              {th('enquire')}
            </Link>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="xl:hidden text-white/90 hover:text-dxb-orange transition-colors"
              aria-label={menuOpen ? th('closeMenu') : th('openMenu')}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="xl:hidden overflow-hidden border-t border-white/10 bg-dxb-navy max-h-[calc(100vh-64px)] overflow-y-auto"
          >
            <div className="px-5 sm:px-6 py-5 flex flex-col">
              {navLinks.map((link, i) => {
                const active = isActive(link.href)
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.035 * i, duration: 0.25 }}
                    className="border-b border-white/10 last:border-0"
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className={`flex items-center justify-between py-3.5 text-xl font-bold transition-colors ${
                        active ? 'text-dxb-orange' : 'text-white hover:text-dxb-orange'
                      }`}
                    >
                      {link.label}
                      <span className="dxb-label text-[11px] text-white/35" dir="ltr">{String(i + 1).padStart(2, '0')}</span>
                    </Link>
                  </motion.div>
                )
              })}
              <div className="mt-5 pt-5 border-t border-white/15 flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap gap-x-5 gap-y-2">
                  {locales.map(l => (
                    <a
                      key={l}
                      href={getLocalizedPath(l)}
                      hrefLang={l}
                      lang={l}
                      onClick={() => setMenuOpen(false)}
                      aria-current={locale === l ? 'true' : undefined}
                      className={`inline-flex items-center gap-2 text-sm ${
                        locale === l ? 'text-dxb-orange font-semibold' : 'text-white/65'
                      }`}
                    >
                      <Flag locale={l} />
                      {localeMeta[l].name}
                    </a>
                  ))}
                </div>
                <Link
                  href="/request"
                  onClick={() => setMenuOpen(false)}
                  className="inline-flex items-center h-11 px-5 bg-dxb-orange text-dxb-ink text-sm font-bold dxb-cut dxb-cut-sm"
                >
                  {th('enquire')}
                </Link>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
