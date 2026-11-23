'use client'

import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { site, whatsappLink } from '@/lib/site'
import { SocialLinks } from '@/components/layout/social-links'
import { WhatsAppIcon } from '@/components/ui/whatsapp-icon'
import { BrandIcon, Logo, Perforation, TearText } from '@/components/brand'

export function Footer() {
  const t = useTranslations('footer')
  const th = useTranslations('header')
  const tx = useTranslations('footerExtra')
  const th2 = useTranslations('hero')

  const columns = [
    {
      heading: t('columns.house'),
      links: [
        { href: '/about', label: t('columns.ourStory') },
        { href: '/experiences', label: t('columns.signatureServices') },
        { href: '/packages', label: tx('packages') },
        { href: '/tickets', label: tx('whatsOn') },
        { href: '/dining', label: tx('dining') },
        { href: '/nightlife', label: tx('nightlife') },
        { href: '/blog', label: tx('journal') },
        { href: '/contact', label: t('columns.contact') },
      ],
    },
    {
      heading: t('columns.membership'),
      links: [
        { href: '/services', label: t('columns.requestService') },
        { href: '/membership', label: t('columns.privateMembers') },
        { href: '/sourcing', label: tx('sourcing') },
        { href: '/request', label: th('enquire') },
      ],
    },
    {
      heading: t('columns.legal'),
      links: [
        { href: '/legal/privacy', label: t('columns.privacy') },
        { href: '/legal/terms', label: t('columns.terms') },
        { href: '/legal/cookies', label: t('columns.cookies') },
      ],
    },
  ]

  return (
    <footer className="relative bg-dxb-ink text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 pt-16 md:pt-24 pb-10">
        {/* Sign-off line */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 pb-14 md:pb-20 mb-14 border-b border-white/15">
          <p className="font-display text-5xl md:text-7xl lg:text-[96px] leading-[0.9] tracking-[-0.045em] max-w-[12ch]">{th2('headline')}</p>
          <Link href="/request" className="group inline-flex items-center gap-2 h-14 px-7 bg-dxb-orange text-dxb-ink font-bold dxb-cut self-start md:self-end transition-colors hover:bg-white">
            {th('enquire')}
            <BrandIcon name="arrow" className="w-5 h-5 transition-transform group-hover:translate-x-1 rtl:rotate-180" />
          </Link>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-14">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-block" aria-label="DXB TKTS">
              <Logo tone="reverse" className="h-9" />
            </Link>
            <TearText text={t('tagline')} className="mt-3 block dxb-label text-[11px] text-white/50" />
            <p className="mt-7 text-white/70 leading-relaxed max-w-md">{t('story')}</p>
            <TearText text={t('appointment')} className="mt-6 block dxb-label text-[12px] text-dxb-orange" />
          </div>

          {/* Link columns */}
          <div className="lg:col-span-5 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {columns.map(col => (
              <div key={col.heading}>
                <h4 className="dxb-label text-[11px] text-white/45 mb-5 pb-3 border-b border-white/15">{col.heading}</h4>
                <ul className="space-y-3">
                  {col.links.map(link => (
                    <li key={`${col.heading}-${link.label}`}>
                      <Link href={link.href} className="text-[15px] text-white/80 hover:text-dxb-orange transition-colors">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Contact as a small pass */}
          <div className="lg:col-span-3">
            <div className="bg-white text-dxb-ink dxb-cut p-6">
              <h4 className="dxb-label text-[11px] text-dxb-cobalt">{t('reachUs')}</h4>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex items-center gap-2.5 font-bold text-dxb-navy hover:text-dxb-cobalt transition-colors"
              >
                <WhatsAppIcon className="w-5 h-5 text-[#25D366]" />
                {t('whatsapp')}
              </a>
              <a href={`mailto:${site.email}`} className="mt-3 flex items-center gap-2.5 text-[15px] text-dxb-muted hover:text-dxb-cobalt transition-colors">
                <BrandIcon name="mail" className="w-5 h-5" />
                {t('contact')}
              </a>
              <Perforation className="my-5 text-dxb-navy" />
              <h4 className="dxb-label text-[11px] text-dxb-muted mb-3">{tx('follow')}</h4>
              <SocialLinks tone="dark" comingSoonLabel={tx('socialSoon')} />
            </div>
          </div>
        </div>

        <div className="border-t border-white/15 pt-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-[13px] text-white/50">{t('copyright')}</p>
          <p className="text-[15px] font-bold text-white/70">{t('quote')}</p>
        </div>
      </div>
      {/* Ghost signature */}
      <div aria-hidden className="max-w-7xl mx-auto px-5 sm:px-6 -mb-[2%] select-none pointer-events-none">
        <Logo tone="white" className="w-full h-auto opacity-[0.05]" title="" />
      </div>
    </footer>
  )
}
