'use client'

import { useLocale, useTranslations } from 'next-intl'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { site, whatsappLink, localePath } from '@/lib/site'
import { heroImage, aiImage } from '@/lib/images'
import { WhatsAppIcon } from '@/components/ui/whatsapp-icon'
import { BrandIcon, BrandSymbol, Perforation, Tear } from '@/components/brand'
import { categories } from '@/data/catalogue'
import { FilmVideo, useFilmsAllowed, type Film } from '@/components/ui/background-film'
import type { Locale } from '@/i18n.config'

/**
 * Homepage opening: a full-screen film that moves through four chapters of
 * Dubai — sea (the hero film), sand, sky and city (the dining film) — with
 * an oversized headline. Stills drift slowly; films play muted and looped.
 */
type Chapter = {
  key: 'sea' | 'sand' | 'sky' | 'city'
  href: string
  still: { src: string | null; alt: string }
  film?: { mp4: string; mobile?: string; poster?: string }
}

const DURATION = 8000

export function Hero() {
  const t = useTranslations('hero')
  const locale = useLocale() as Locale
  const motionOk = useFilmsAllowed()
  const hero = heroImage()

  const chapters: Chapter[] = [
    {
      key: 'sea',
      href: '/experiences/on-the-water',
      still: hero,
      film: site.heroVideo ? { mp4: site.heroVideo.mp4, mobile: site.heroVideo.mobile, poster: site.heroVideo.poster } : undefined,
    },
    { key: 'sand', href: '/experiences/desert', still: aiImage('gallery-dunes', 'desert', 'Riders on a dune ridge at sunset'), film: site.films.desertDunes },
    { key: 'sky', href: '/experiences/sky', still: aiImage('category-sky', 'burjAlArabAerial', 'Helicopter over Palm Jumeirah'), film: site.films.skyHelicopter },
    { key: 'city', href: '/dining', still: { src: site.films.diningTerrace.poster, alt: 'Dinner terrace above Dubai at dusk' }, film: site.films.diningTerrace },
  ]

  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  useEffect(() => {
    if (paused) return
    const id = window.setTimeout(() => setActive(a => (a + 1) % chapters.length), DURATION)
    return () => window.clearTimeout(id)
  }, [active, paused, chapters.length])

  // "Book Dubai, privately." → two lines, split after the comma.
  const headline = t('headline')
  const cut = headline.search(/[,،]\s/)
  const lines = cut > 0 ? [headline.slice(0, cut + 1), headline.slice(cut + 2)] : [headline]

  return (
    <>
      <section data-hero-overlay className="dxb-under-header relative h-[100svh] min-h-[640px] max-h-[1100px] bg-dxb-ink text-white overflow-hidden">
        {/* Chapter layers */}
        {chapters.map((c, i) => (
          <div
            key={c.key}
            aria-hidden={i !== active}
            className={`absolute inset-0 transition-opacity duration-[1400ms] ease-out ${i === active ? 'opacity-100' : 'opacity-0'}`}
          >
            <div key={i === active ? `on-${active}` : 'off'} className={`absolute inset-0 ${i === active ? 'dxb-drift' : ''}`}>
              {c.still.src && (
                <Image src={c.still.src} alt={c.still.alt} fill priority={i === 0} sizes="100vw" className="object-cover" />
              )}
              {c.film && (motionOk || (motionOk === null && i === 0)) && Math.abs(i - active) <= 1 && <HeroFilm film={c.film} playing={i === active} eager={i === 0} />}
            </div>
          </div>
        ))}
        <div className="absolute inset-0 dxb-vignette" />

        {/* Copy */}
        <div className="relative z-10 h-full max-w-7xl mx-auto px-5 sm:px-6 flex flex-col justify-end pb-32 md:pb-48 pt-28">
          <div className="dxb-rise inline-flex items-center gap-3 text-white/85" style={{ animationDelay: '100ms' }}>
            <BrandSymbol className="h-5 text-dxb-orange" />
            <span className="dxb-label text-[12px]">
              {t('places')
                .split('|')
                .map((p, i) => (
                  <span key={p}>
                    {i > 0 && <Tear />}
                    {p}
                  </span>
                ))}
            </span>
          </div>

          <h1 className="mt-6 font-display text-[60px] leading-[0.86] sm:text-[96px] lg:text-[124px] xl:text-[140px] tracking-[-0.045em] [font-stretch:112%] max-w-[12ch]">
            {lines.map((l, i) => (
              <span key={i} className="dxb-line">
                <span style={{ animationDelay: `${180 + i * 140}ms` }} className={i === 1 ? 'text-dxb-orange' : ''}>
                  {l}
                </span>
              </span>
            ))}
          </h1>

          <div className="mt-8 grid md:grid-cols-12 gap-6 items-end">
            <p className="dxb-rise md:col-span-6 lg:col-span-5 text-lg md:text-xl text-white/80 leading-relaxed font-light" style={{ animationDelay: '520ms' }}>
              {t('subheading')}
            </p>
            <div className="dxb-rise md:col-span-6 lg:col-span-7 flex flex-col sm:flex-row gap-3 md:justify-end" style={{ animationDelay: '640ms' }}>
              <Link
                href="/request"
                className="group inline-flex items-center justify-center gap-2 h-14 px-7 whitespace-nowrap bg-dxb-orange text-dxb-ink font-bold dxb-cut transition-colors hover:bg-white"
              >
                {t('cta')}
                <BrandIcon name="arrow" className="w-5 h-5 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
              </Link>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 h-14 px-7 whitespace-nowrap dxb-glass text-white font-bold transition-colors hover:bg-white hover:text-dxb-navy"
              >
                <WhatsAppIcon className="w-5 h-5 text-[#25D366]" />
                {t('whatsapp')}
              </a>
            </div>
          </div>
        </div>

        {/* Chapter rail */}
        <nav
          aria-label={t('chaptersLabel')}
          className="absolute z-10 bottom-0 inset-x-0 border-t border-white/15"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <ol className="max-w-7xl mx-auto px-5 sm:px-6 grid grid-cols-4">
            {chapters.map((c, i) => (
              <li key={c.key}>
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  aria-current={i === active}
                  className={`group relative w-full text-start pt-4 pb-5 md:pt-5 md:pb-16 pe-3 transition-colors ${i === active ? 'text-white' : 'text-white/50 hover:text-white/85'}`}
                >
                  <span className="absolute top-0 start-0 h-[2px] w-full bg-white/10 overflow-hidden">
                    {i === active && (
                      <span
                        key={`bar-${active}-${paused}`}
                        className="block h-full bg-dxb-orange origin-left rtl:origin-right"
                        style={{ animation: paused ? 'none' : `dxb-progress ${DURATION}ms linear both` }}
                      />
                    )}
                  </span>
                  <span className="dxb-label text-[11px] opacity-70" dir="ltr">{String(i + 1).padStart(2, '0')}</span>
                  <span className="block mt-1 text-base md:text-2xl font-extrabold tracking-[-0.02em]">{t(`chapters.${c.key}.title`)}</span>
                  <span className="hidden md:block text-sm text-white/60">{t(`chapters.${c.key}.label`)}</span>
                </button>
              </li>
            ))}
          </ol>
        </nav>
      </section>

      {/* The booking pass, straddling the bottom of the film */}
      <div className="relative z-20 bg-dxb-sand py-6 md:py-0 md:h-14">
        <div className="max-w-5xl mx-auto px-5 sm:px-6 md:-translate-y-1/2 dxb-lift">
          <HeroPlanner locale={locale} />
        </div>
      </div>
    </>
  )
}

function HeroFilm({ film, playing, eager }: { film: Film; playing: boolean; eager?: boolean }) {
  return <FilmVideo film={film} playing={playing} eager={eager} />
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

  const field = 'block w-full bg-transparent text-base md:text-lg font-bold text-dxb-navy outline-none appearance-none'
  return (
    <form
      onSubmit={submit}
      className="dxb-stub bg-white text-dxb-ink [--stub-r:14px] [--stub-x:100%] md:[--stub-x:calc(100%_-_176px)] md:rtl:[--stub-x:176px]"
      aria-label={t('label')}
    >
      <div className="grid md:grid-cols-[1fr_176px]">
        <div className="grid grid-cols-2 md:grid-cols-[1.5fr_1fr_0.7fr] divide-x divide-dxb-line rtl:divide-x-reverse">
          <label className="col-span-2 md:col-span-1 px-6 py-5 border-b md:border-b-0 border-dxb-line cursor-pointer">
            <span className="dxb-label text-[10.5px] text-dxb-cobalt">{t('what')}</span>
            <select value={what} onChange={e => setWhat(e.target.value)} className={`${field} mt-1`}>
              <option value="">{t('anything')}</option>
              {categories.map(c => (
                <option key={c.slug} value={c.name.en}>
                  {c.name[locale]}
                </option>
              ))}
            </select>
          </label>
          <label className="px-6 py-5 cursor-pointer" onClick={() => dateRef.current?.showPicker?.()}>
            <span className="dxb-label text-[10.5px] text-dxb-cobalt">{t('when')}</span>
            <input ref={dateRef} type="date" min={today} value={when} onChange={e => setWhen(e.target.value)} className={`${field} dxb-data mt-1`} />
          </label>
          <label className="px-6 py-5 cursor-pointer">
            <span className="dxb-label text-[10.5px] text-dxb-cobalt">{t('guests')}</span>
            <input type="number" min={1} max={200} inputMode="numeric" value={guests} onChange={e => setGuests(e.target.value)} className={`${field} dxb-data mt-1`} />
          </label>
        </div>
        <div className="relative flex p-3 md:p-4">
          <Perforation vertical className="hidden md:block absolute inset-y-4 start-0 text-dxb-navy" />
          <button
            type="submit"
            className="group flex-1 inline-flex items-center justify-center gap-2 h-14 md:h-auto bg-dxb-orange text-dxb-ink font-bold text-base transition-colors hover:bg-dxb-navy hover:text-white"
          >
            {t('submit')}
            <BrandIcon name="arrow" className="w-5 h-5 transition-transform group-hover:translate-x-0.5 rtl:rotate-180" />
          </button>
        </div>
      </div>
    </form>
  )
}
