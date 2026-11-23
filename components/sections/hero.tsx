'use client'

import { useLocale, useTranslations } from 'next-intl'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { site, whatsappLink, localePath } from '@/lib/site'
import { heroImage, aiImage } from '@/lib/images'
import { WhatsAppIcon } from '@/components/ui/whatsapp-icon'
import { BrandIcon, MonoLabel, Perforation } from '@/components/brand'
import { FAMILY, type Family } from '@/lib/brand'
import { categories } from '@/data/catalogue'
import type { Locale } from '@/i18n.config'

/** The six colour families, each opening the page that best represents it. */
const FAMILY_LINKS: { family: Family; href: string }[] = [
  { family: 'days-out', href: '/experiences/attractions' },
  { family: 'events', href: '/tickets' },
  { family: 'desert-sky', href: '/experiences/desert' },
  { family: 'water', href: '/experiences/on-the-water' },
  { family: 'city-life', href: '/dining' },
  { family: 'signature', href: '/experiences/signature' },
]

/** Plays the hero film only when files are configured, motion is allowed and data saving is off. */
function useHeroVideo() {
  const [enabled, setEnabled] = useState(false)
  useEffect(() => {
    if (!site.heroVideo) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection
    const slow = conn?.saveData || (conn?.effectiveType && /2g|3g/.test(conn.effectiveType))
    setEnabled(!reduce && !slow)
  }, [])
  return enabled
}

export function Hero() {
  const t = useTranslations('hero')
  const locale = useLocale() as Locale
  const videoEnabled = useHeroVideo()
  const hero = heroImage()
  const desert = aiImage('category-desert', 'dubaiSkyline', 'Desert dunes at golden hour')
  const events = aiImage('product-vip-event-hospitality', 'eveningEvent', 'Hospitality seats at a live event in Dubai')

  return (
    <section className="relative bg-dxb-sand overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 pt-6 md:pt-8 pb-14 md:pb-20">
        {/* Family chips: the six kinds of day, in their colours */}
        <nav style={{ animationDelay: '0ms' }} aria-label={t('chaptersLabel')} className="dxb-rise -mx-5 px-5 sm:mx-0 sm:px-0 overflow-x-auto scrollbar-none">
          <ul className="flex gap-2 w-max">
            {FAMILY_LINKS.map(({ family, href }) => {
              const f = FAMILY[family]
              return (
                <li key={family}>
                  <Link
                    href={href}
                    className={`inline-flex items-center gap-2 h-9 px-3.5 dxb-label text-[11px] font-semibold ${f.chip} transition-transform duration-200 hover:-translate-y-0.5`}
                  >
                    <BrandIcon name={f.icon} className="w-4 h-4" />
                    {f.label[locale]}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="mt-8 md:mt-12 grid lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Copy + planner */}
          <div className="lg:col-span-6 xl:col-span-5 flex flex-col">
            <div style={{ animationDelay: '50ms' }} className="dxb-rise">
              <MonoLabel parts={t('places').split('|')} className="text-dxb-cobalt" />
            </div>
            <h1
              style={{ animationDelay: '120ms' }}
              className="dxb-rise mt-5 font-display text-dxb-navy text-[52px] leading-[0.92] sm:text-7xl xl:text-[88px] tracking-[-0.04em] [font-stretch:112%]"
            >
              {t('headline')}
            </h1>
            <p style={{ animationDelay: '200ms' }} className="dxb-rise mt-6 text-lg md:text-xl text-dxb-ink/80 max-w-xl leading-relaxed">
              {t('subheading')}
            </p>

            <div style={{ animationDelay: '280ms' }} className="dxb-rise mt-8 flex flex-col sm:flex-row gap-3">
              <Link
                href="/request"
                className="inline-flex items-center justify-center gap-2 h-14 px-7 whitespace-nowrap bg-dxb-orange text-dxb-ink text-base font-bold dxb-cut transition-colors hover:bg-dxb-orange-hover"
              >
                {t('cta')}
                <BrandIcon name="arrow" className="w-5 h-5 rtl:rotate-180" />
              </Link>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 h-14 px-7 whitespace-nowrap border-2 border-dxb-navy text-dxb-navy text-base font-bold transition-colors hover:bg-dxb-navy hover:text-white"
              >
                <WhatsAppIcon className="w-5 h-5 text-[#25D366]" />
                {t('whatsapp')}
              </a>
            </div>

            <div style={{ animationDelay: '360ms' }} className="dxb-rise mt-auto pt-10 dxb-lift">
              <HeroPlanner locale={locale} />
            </div>
          </div>

          {/* Cut-corner frames: the film plus two families */}
          <div
            style={{ animationDelay: '150ms' }}
            className="dxb-rise lg:col-span-6 xl:col-span-7 grid grid-cols-2 sm:grid-cols-5 gap-3 min-h-[420px] sm:min-h-[520px] lg:min-h-[600px]"
          >
            <HeroFrame
              href="/experiences/on-the-water"
              family="water"
              label={t('chapters.sea.title')}
              title={t('chapters.sea.label')}
              className="col-span-2 sm:col-span-3 sm:row-span-2 min-h-[300px]"
            >
              <Image src={hero.src ?? ''} alt={hero.alt} fill priority sizes="(max-width: 1024px) 100vw, 40vw" className="object-cover" />
              {videoEnabled && site.heroVideo && (
                <video
                  className="absolute inset-0 h-full w-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="none"
                  poster={site.heroVideo.poster}
                  aria-hidden="true"
                >
                  <source src={site.heroVideo.mobile} media="(max-width: 767px)" type="video/mp4" />
                  {site.heroVideo.webm && <source src={site.heroVideo.webm} type="video/webm" />}
                  <source src={site.heroVideo.mp4} type="video/mp4" />
                </video>
              )}
            </HeroFrame>
            <HeroFrame
              href="/experiences/desert"
              family="desert-sky"
              label={t('chapters.sand.title')}
              title={t('chapters.sand.label')}
              className="sm:col-span-2 min-h-[220px]"
            >
              <Image src={desert.src ?? ''} alt={desert.alt} fill sizes="(max-width: 640px) 50vw, 25vw" className="object-cover" />
            </HeroFrame>
            <HeroFrame
              href="/tickets"
              family="events"
              label={FAMILY.events.label[locale]}
              title={t('ticketsFrame')}
              className="sm:col-span-2 min-h-[220px]"
            >
              <Image src={events.src ?? ''} alt={events.alt} fill sizes="(max-width: 640px) 50vw, 25vw" className="object-cover" />
            </HeroFrame>
          </div>
        </div>
      </div>
    </section>
  )
}

function HeroFrame({
  href,
  family,
  label,
  title,
  className = '',
  children,
}: {
  href: string
  family: Family
  label: string
  title: string
  className?: string
  children: React.ReactNode
}) {
  const caption = FAMILY[family]
  return (
    <Link href={href} className={`group relative flex flex-col dxb-cut dxb-cut-lg ${className}`}>
      <div className="relative flex-1 overflow-hidden bg-dxb-navy">
        <div className="absolute inset-0 transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]">{children}</div>
      </div>
      <div className={`flex items-end justify-between gap-3 px-4 py-3 ${caption.bg} ${caption.text}`}>
        <span>
          <span className="block dxb-label text-[11px] opacity-80">{label}</span>
          <span className="block text-lg md:text-xl font-extrabold tracking-[-0.02em] leading-tight">{title}</span>
        </span>
        <BrandIcon name="arrow" className="w-5 h-5 mb-0.5 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
      </div>
    </Link>
  )
}

/**
 * Ticket-stub planner: What / When / Guests → the request form, prefilled.
 * It never books or prices anything; it only starts a request.
 */
function HeroPlanner({ locale }: { locale: Locale }) {
  const t = useTranslations('hero.finder')
  const router = useRouter()
  const [what, setWhat] = useState('')
  const [when, setWhen] = useState('')
  const [guests, setGuests] = useState('2')
  const dateRef = useRef<HTMLInputElement>(null)
  const today = new Date().toISOString().slice(0, 10)

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const q = new URLSearchParams()
    if (what) q.set('interest', what)
    if (when) q.set('date', when)
    if (guests) q.set('guests', guests)
    router.push(`${localePath(locale, '/request')}?${q.toString()}`)
  }

  const field = 'block w-full bg-transparent text-[15px] font-semibold text-dxb-ink outline-none appearance-none'
  return (
    <form onSubmit={submit} className="dxb-stub bg-white text-dxb-ink [--stub-x:calc(100%_-_104px)] rtl:[--stub-x:104px]" aria-label={t('label')}>
      <div className="grid grid-cols-[1fr_auto] items-stretch">
        <div className="grid grid-cols-2 sm:grid-cols-[1.5fr_1fr_0.7fr] divide-x divide-dxb-line rtl:divide-x-reverse">
          <label className="col-span-2 sm:col-span-1 px-4 py-3 border-b sm:border-b-0 border-dxb-line cursor-pointer">
            <span className="dxb-label text-[10px] text-dxb-muted">{t('what')}</span>
            <select value={what} onChange={e => setWhat(e.target.value)} className={field}>
              <option value="">{t('anything')}</option>
              {categories.map(c => (
                <option key={c.slug} value={c.name.en}>
                  {c.name[locale]}
                </option>
              ))}
            </select>
          </label>
          <label className="px-4 py-3 cursor-pointer" onClick={() => dateRef.current?.showPicker?.()}>
            <span className="dxb-label text-[10px] text-dxb-muted">{t('when')}</span>
            <input ref={dateRef} type="date" min={today} value={when} onChange={e => setWhen(e.target.value)} className={`${field} dxb-data`} />
          </label>
          <label className="px-4 py-3 cursor-pointer">
            <span className="dxb-label text-[10px] text-dxb-muted">{t('guests')}</span>
            <input type="number" min={1} max={200} inputMode="numeric" value={guests} onChange={e => setGuests(e.target.value)} className={`${field} dxb-data`} />
          </label>
        </div>
        <div className="relative flex w-[104px]">
          <Perforation vertical className="absolute inset-y-3 start-0 text-dxb-navy" />
          <button type="submit" className="flex-1 m-2 ms-3 px-2 bg-dxb-orange text-dxb-ink font-bold text-[15px] transition-colors hover:bg-dxb-orange-hover">
            {t('submit')}
          </button>
        </div>
      </div>
    </form>
  )
}
