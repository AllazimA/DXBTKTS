import Image from 'next/image'
import Link from 'next/link'
import { WhatsAppIcon } from '@/components/ui/whatsapp-icon'
import { whatsappLink } from '@/lib/site'
import { PageHero, heroPrimary, heroSecondary } from '@/components/brand/page-hero'
import { BrandSymbol } from '@/components/brand'
import { Unveil } from '@/components/brand/unveil'
import type { Family } from '@/lib/brand'
import type { Locale } from '@/i18n.config'

/** Opening used by the curated service pages (dining, nightlife, sourcing). */
export function CuratedHero({ image, film, eyebrow, title, lede, cta, ctaHref, family = 'city-life', locale }: { image: { src: string | null; alt: string }; film?: { mp4: string; mobile?: string; poster?: string }; eyebrow: string; title: string; lede: string; cta?: string; ctaHref?: string; family?: Family; locale?: Locale }) {
  return (
    <PageHero image={image} film={film} label={eyebrow} title={title} lede={lede} family={locale ? family : undefined} locale={locale}>
      {cta && ctaHref && (
        <a href={ctaHref} className={heroPrimary}>
          {cta}
        </a>
      )}
      <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className={heroSecondary}>
        <WhatsAppIcon className="w-5 h-5 text-[#25D366]" />
        WhatsApp
      </a>
    </PageHero>
  )
}

/** Dark band holding a request form, with its pitch on the left. */
export function FormSection({ id, title, copy, note, whatsapp, backdrop, children }: { id: string; title: string; copy: string; note?: string; whatsapp: string; backdrop?: string | null; children: React.ReactNode }) {
  return (
    <section id={`${id}-section`} className="relative bg-dxb-navy scroll-mt-20 overflow-hidden">
      {backdrop && (
        <>
          <Image src={backdrop} alt="" fill sizes="100vw" className="object-cover opacity-45" />
          <div className="absolute inset-0 bg-gradient-to-b from-dxb-ink/70 via-dxb-ink/80 to-dxb-ink" />
        </>
      )}
      <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-28 grid grid-cols-1 lg:grid-cols-5 gap-14 items-start">
        <div className="lg:col-span-2 lg:sticky lg:top-32">
          <h2 className="font-display text-4xl md:text-5xl text-white leading-[1.1]">{title}</h2>
          <p className="mt-6 text-white/70 text-lg font-light leading-relaxed">{copy}</p>
          {note && <p className="mt-6 text-sm text-white/60 leading-relaxed border-s-4 border-dxb-orange ps-4">{note}</p>}
          <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className={`mt-10 ${heroSecondary}`}>
            <WhatsAppIcon className="w-5 h-5 text-[#25D366]" />
            {whatsapp}
          </a>
        </div>
        <div className="lg:col-span-3 dxb-lift">
          <div className="relative bg-white text-dxb-ink dxb-cut dxb-cut-lg">
            <div className="flex items-center justify-between gap-3 bg-dxb-sand px-7 md:px-11 py-3.5">
              <span className="dxb-label text-[11px] text-dxb-navy inline-flex items-center"><BrandSymbol className="h-3.5 me-2 text-dxb-navy" />DXB TKTS</span>
              <span className="dxb-label text-[11px] text-dxb-muted">{title}</span>
            </div>
            <div className="p-7 md:p-11">{children}</div>
          </div>
        </div>
      </div>
    </section>
  )
}

/** Three tall photographs with a short line under each, between the opening and the list. */
export function MoodStrip({ items }: { items: { src: string | null; alt: string; caption: string }[] }) {
  const shown = items.filter(i => i.src)
  if (!shown.length) return null
  return (
    <section className="bg-dxb-sand">
      <div className="max-w-6xl mx-auto px-6 pt-20 md:pt-28">
        <ul className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
          {shown.map((i, n) => (
            <li key={i.src} className={n === 1 ? 'sm:mt-16' : ''}>
              <figure className="group">
                <Unveil delay={n * 140} className="relative aspect-[4/5] overflow-hidden bg-dxb-navy">
                  <div className="absolute inset-0">
                    <Image src={i.src!} alt={i.alt} fill sizes="(min-width: 1024px) 360px, (min-width: 640px) 33vw, 100vw" className="object-cover transition-transform duration-[1800ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]" />
                  </div>
                </Unveil>
                <figcaption className="mt-5 flex items-baseline gap-3 text-dxb-navy">
                  <span className="dxb-label text-[11px] text-dxb-cobalt" dir="ltr">{String(n + 1).padStart(2, '0')}</span>
                  <span className="font-display text-xl md:text-2xl tracking-[-0.02em]">{i.caption}</span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

const DINING_SECTIONS = [
  {
    key: 'dining',
    href: '/dining',
    img: '/images/ai/dining-hero.webp',
    title: { en: 'Restaurants', fr: 'Restaurants', ar: 'المطاعم' },
    line: { en: 'The tables we recommend', fr: 'Les tables que nous recommandons', ar: 'الطاولات التي نوصي بها' },
  },
  {
    key: 'nightlife',
    href: '/nightlife',
    img: '/images/ai/nightlife-hero.webp',
    title: { en: 'Nightlife', fr: 'Vie nocturne', ar: 'الحياة الليلية' },
    line: { en: 'Lounges, rooftops and late nights', fr: 'Lounges, rooftops et nuits tardives', ar: 'صالات وأسطح وسهرات متأخرة' },
  },
] as const

/**
 * The two sections of Dining & Nightlife, shown straight under the opening of
 * either page, so the header link needs no dropdown.
 */
export function DiningSections({ current, locale }: { current: 'dining' | 'nightlife'; locale: Locale }) {
  const l = (locale in DINING_SECTIONS[0].title ? locale : 'en') as 'en' | 'fr' | 'ar'
  return (
    <nav aria-label={locale === 'ar' ? 'المطاعم والحياة الليلية' : locale === 'fr' ? 'Restaurants et vie nocturne' : 'Dining & nightlife'} className="bg-dxb-ink text-white border-t border-white/10">
      <ol className="max-w-7xl mx-auto px-5 sm:px-6 grid grid-cols-2">
        {DINING_SECTIONS.map((s, i) => {
          const active = s.key === current
          return (
            <li key={s.key} className={i === 0 ? 'border-e border-white/10' : ''}>
              <Link
                href={s.href}
                aria-current={active ? 'page' : undefined}
                className={`group relative flex items-center gap-4 md:gap-6 py-5 md:py-7 ${i === 0 ? 'pe-4 md:pe-8' : 'ps-4 md:ps-8'} transition-colors ${active ? 'text-white' : 'text-white/55 hover:text-white'}`}
              >
                <span className={`absolute top-0 start-0 h-[2px] bg-dxb-orange transition-all duration-500 ${active ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                <span className="relative hidden sm:block shrink-0 w-20 h-14 md:w-28 md:h-[72px] overflow-hidden">
                  <Image src={s.img} alt="" fill sizes="112px" className={`object-cover transition-all duration-700 group-hover:scale-110 ${active ? '' : 'grayscale-[60%] opacity-70 group-hover:grayscale-0 group-hover:opacity-100'}`} />
                </span>
                <span className="min-w-0">
                  <span className="dxb-label text-[11px] opacity-70" dir="ltr">{String(i + 1).padStart(2, '0')}</span>
                  <span className="block mt-0.5 text-xl md:text-[28px] font-extrabold tracking-[-0.02em] leading-tight">{s.title[l]}</span>
                  <span className="hidden md:block text-sm text-white/55">{s.line[l]}</span>
                </span>
              </Link>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
