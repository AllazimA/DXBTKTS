'use client'

import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { site, whatsappLink } from '@/lib/site'
import { SocialLinks } from '@/components/layout/social-links'
import { WhatsAppIcon } from '@/components/ui/whatsapp-icon'

export function Footer() {
  const t = useTranslations('footer')
  const th = useTranslations('header')
  const tx = useTranslations('footerExtra')

  const columns = [
    {
      heading: t('columns.house'),
      links: [
        { href: '/about', label: t('columns.ourStory') },
        { href: '/experiences', label: t('columns.signatureServices') },
        { href: '/packages', label: tx('packages') },
        { href: '/tickets', label: tx('whatsOn') },
        { href: '/blog', label: tx('journal') },
        { href: '/contact', label: t('columns.contact') },
      ],
    },
    {
      heading: t('columns.membership'),
      links: [
        { href: '/services', label: t('columns.requestService') },
        { href: '/membership', label: t('columns.privateMembers') },
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
    <footer className="bg-dxb-ink text-white">
      {/* Gold hairline */}
      <div className="h-px bg-gradient-to-r from-transparent via-dxb-gold/60 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 pt-20 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          {/* Brand story */}
          <div className="lg:col-span-5">
            <Link href="/" className="inline-flex flex-col leading-none">
              <span className="font-cormorant text-3xl font-semibold tracking-wide">
                DXB <span className="text-dxb-gold">TKTS</span>
              </span>
              <span className="text-[10px] font-semibold tracking-[0.4em] uppercase text-white/50 mt-1.5">
                {t('tagline')}
              </span>
            </Link>
            <p className="mt-7 text-white/60 font-light leading-relaxed max-w-md">{t('story')}</p>
            <p className="mt-6 text-xs font-semibold tracking-[0.3em] uppercase text-dxb-gold">
              {t('appointment')}
            </p>
          </div>

          {/* Link columns */}
          <div className="lg:col-span-4 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {columns.map(col => (
              <div key={col.heading}>
                <h4 className="text-xs font-semibold tracking-[0.25em] uppercase text-white/40 mb-5">
                  {col.heading}
                </h4>
                <ul className="space-y-3">
                  {col.links.map(link => (
                    <li key={`${col.heading}-${link.label}`}>
                      <Link
                        href={link.href}
                        className="text-sm text-white/65 hover:text-dxb-gold transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-semibold tracking-[0.25em] uppercase text-white/40 mb-5">
              {t('reachUs')}
            </h4>
            <a
              href={`mailto:${site.email}`}
              className="block text-sm text-white/65 hover:text-dxb-gold transition-colors"
            >
              {t('contact')}
            </a>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-2 text-sm text-white/65 hover:text-dxb-gold transition-colors"
            >
              <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
              {t('whatsapp')}
            </a>
            <h4 className="mt-10 text-xs font-semibold tracking-[0.25em] uppercase text-white/40 mb-4">{tx('follow')}</h4>
            <SocialLinks tone="light" comingSoonLabel={tx('socialSoon')} />
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40 tracking-wide">{t('copyright')}</p>
          <p className="font-cormorant italic text-sm text-white/50">{t('quote')}</p>
        </div>
      </div>
    </footer>
  )
}
