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

export function Header() {
  const t = useTranslations('nav')
  const th = useTranslations('header')
  const locale = useLocale() as Locale
  const pathname = usePathname()
  const [localeOpen, setLocaleOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [diningOpen, setDiningOpen] = useState(false)
  const diningRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

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
    { href: '/membership', label: t('membership') },
    { href: '/tickets', label: t('tickets') },
    { href: '/dining', label: t('restaurants') },
    { href: '/nightlife', label: t('nightlife') },
    { href: '/blog', label: t('blog') },
    { href: '/contact', label: t('contact') },
  ]


  // Path without the locale prefix, for active-link matching
  const basePath = pathname.replace(new RegExp(`^/${locale}(?=/|$)`), '') || '/'
  const isActive = (href: string) =>
    href === '/' ? basePath === '/' : basePath === href || basePath.startsWith(`${href}/`)

  return (
    <header
      className={`sticky top-0 z-50 bg-dxb-ink/95 backdrop-blur-md border-b transition-all duration-500 ${
        scrolled ? 'border-dxb-gold/25 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.6)]' : 'border-white/10'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div
          className={`flex items-center justify-between gap-4 2xl:gap-8 transition-all duration-500 ${
            scrolled ? 'py-4' : 'py-6'
          }`}
        >
          {/* Wordmark */}
          <Link href="/" className="group flex flex-col leading-none shrink-0">
            <span className="font-cormorant text-3xl font-semibold tracking-wide text-white transition-colors group-hover:text-dxb-gold">
              DXB <span className="text-dxb-gold">TKTS</span>
            </span>
            <span className="text-[10px] font-semibold tracking-[0.42em] uppercase text-dxb-gold/80 mt-1.5">
              {th('tagline')}
            </span>
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden xl:flex items-center gap-3 2xl:gap-8">
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
                      className={`group relative flex items-center gap-1 py-1.5 text-[13px] 2xl:text-[14px] font-medium tracking-[0.1em] 2xl:tracking-[0.14em] uppercase whitespace-nowrap transition-colors ${
                        active ? 'text-dxb-gold' : 'text-white/90 hover:text-dxb-gold'
                      }`}
                    >
                      <span className="2xl:hidden">{t('diningShort')}</span>
                      <span className="hidden 2xl:inline">{t('diningNightlife')}</span>
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${diningOpen ? 'rotate-180' : ''}`} />
                      <span className={`absolute -bottom-0.5 left-0 h-[2px] bg-dxb-gold transition-all duration-300 ${active ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                    </button>
                    {diningOpen && (
                      <div role="menu" className="absolute top-full start-0 pt-3 min-w-[12rem]">
                        <div className="bg-dxb-ink border border-white/10 shadow-2xl">
                          {[{ href: '/dining', label: t('restaurants') }, { href: '/nightlife', label: t('nightlife') }].map(item => (
                            <Link
                              key={item.href}
                              href={item.href}
                              role="menuitem"
                              onClick={() => setDiningOpen(false)}
                              className={`block px-5 py-3 text-sm tracking-[0.08em] transition-colors ${isActive(item.href) ? 'text-dxb-gold bg-white/5' : 'text-white/75 hover:text-white hover:bg-white/5'}`}
                            >
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
                  className={`group relative py-1.5 text-[13px] 2xl:text-[14px] font-medium tracking-[0.1em] 2xl:tracking-[0.14em] uppercase whitespace-nowrap transition-colors ${
                    active ? 'text-dxb-gold' : 'text-white/90 hover:text-dxb-gold'
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-0.5 left-0 h-[2px] bg-dxb-gold transition-all duration-300 ${
                      active ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </Link>
              )
            })}
          </nav>

          <div className="flex items-center gap-3 2xl:gap-4">
            {/* Locale switcher */}
            <div className="relative hidden sm:block">
              <button
                onClick={() => setLocaleOpen(!localeOpen)}
                aria-expanded={localeOpen}
                aria-haspopup="menu"
                aria-label={`Language: ${localeMeta[locale].name}`}
                className="flex items-center gap-1.5 text-[15px] font-medium text-white/85 hover:text-dxb-gold transition-colors"
              >
                <Flag locale={locale} />
                <span className="2xl:hidden uppercase text-[13px] tracking-[0.12em]">{locale === 'ar' ? localeMeta[locale].name : locale}</span>
                <span className="hidden 2xl:inline">{localeMeta[locale].name}</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-300 ${localeOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {localeOpen && (
                <div role="menu" className="absolute top-full end-0 mt-3 min-w-[11rem] bg-dxb-ink border border-white/10 shadow-2xl">
                  {locales.map(l => (
                    <a
                      key={l}
                      href={getLocalizedPath(l)}
                      hrefLang={l}
                      lang={l}
                      role="menuitem"
                      aria-current={locale === l ? 'true' : undefined}
                      className={`flex items-center gap-3 px-5 py-2.5 text-sm transition-colors ${
                        locale === l
                          ? 'text-dxb-gold bg-white/5 font-medium'
                          : 'text-white/70 hover:text-white hover:bg-white/5'
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

            <Link
              href="/request"
              className="hidden sm:inline-block whitespace-nowrap px-4 2xl:px-7 py-3 bg-dxb-clay text-white text-[12px] font-semibold tracking-[0.14em] uppercase transition-all duration-300 hover:bg-dxb-clay-hover "
            >
              {th('enquire')}
            </Link>

            <PlanButton />

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="xl:hidden text-white/90 hover:text-dxb-gold transition-colors"
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
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="xl:hidden overflow-hidden border-t border-white/10 bg-dxb-ink/98"
          >
            <div className="px-6 py-6 flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.3 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="block py-3 font-cormorant text-2xl font-light text-white/85 hover:text-dxb-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
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
                        locale === l ? 'text-dxb-gold font-medium' : 'text-white/60'
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
                  className="px-5 py-2.5 bg-dxb-clay text-white text-xs font-semibold tracking-[0.15em] uppercase"
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
