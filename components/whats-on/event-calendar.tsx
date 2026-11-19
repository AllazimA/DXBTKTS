'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight, ChevronDown, MapPin } from 'lucide-react'
import type { Locale } from '@/i18n.config'
import { events, lastDay, sortKey, type CalendarEvent, type EventCategory, type Emirate } from '@/data/events'
import { whatsOn as c } from '@/content/whats-on'
import { whatsappLink } from '@/lib/site'
import { usePlan } from '@/components/catalogue/plan-provider'
import { getProduct } from '@/data/catalogue'
import { formatAED } from '@/lib/catalogue/money'
import { WhatsAppIcon } from '@/components/ui/whatsapp-icon'

const intlLocale: Record<Locale, string> = { en: 'en-GB', fr: 'fr-FR', ar: 'ar-AE-u-nu-latn' }
const CATEGORIES: EventCategory[] = ['entertainment', 'sport', 'culture', 'lifestyle', 'business']
const EMIRATES: Emirate[] = ['dubai', 'abu-dhabi', 'sharjah', 'uae']

const CATEGORY_TONE: Record<EventCategory, string> = {
  business: 'bg-dxb-sea',
  sport: 'bg-dxb-clay',
  culture: 'bg-dxb-gold',
  lifestyle: 'bg-[#8C4A5E]',
  entertainment: 'bg-[#5B4B8A]',
}

const d = (iso: string) => new Date(`${iso}T12:00:00Z`)

function fmt(locale: Locale, iso: string, opts: Intl.DateTimeFormatOptions) {
  return new Intl.DateTimeFormat(intlLocale[locale], { timeZone: 'UTC', ...opts }).format(d(iso))
}

function monthLabel(locale: Locale, ym: string) {
  return fmt(locale, `${ym}-01`, { month: 'long', year: 'numeric' })
}

/** Human date range, e.g. "4 Dec 2026 – 17 Jan 2027". */
function dateRange(locale: Locale, e: CalendarEvent) {
  if (!e.start) return c.tba[locale]
  const full: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: 'numeric' }
  if (!e.end || e.end === e.start) return fmt(locale, e.start, { weekday: 'short', ...full })
  const endText = e.endMonthOnly ? fmt(locale, e.end, { month: 'long', year: 'numeric' }) : fmt(locale, e.end, full)
  const sameYear = e.start.slice(0, 4) === e.end.slice(0, 4)
  const startText = fmt(locale, e.start, sameYear ? { day: 'numeric', month: 'short' } : full)
  return `${startText} – ${endText}`
}

/** Every YYYY-MM the event touches from `today` onwards. */
function monthsOf(e: CalendarEvent, today: string): string[] {
  if (!e.start) return [e.month!]
  const from = e.start > today ? e.start : today
  const to = e.end ?? e.start
  const out: string[] = []
  let [y, m] = from.slice(0, 7).split('-').map(Number)
  const [ty, tm] = to.slice(0, 7).split('-').map(Number)
  while (y < ty || (y === ty && m <= tm)) {
    out.push(`${y}-${String(m).padStart(2, '0')}`)
    m++
    if (m > 12) {
      m = 1
      y++
    }
  }
  return out
}

function DateBlock({ e, locale }: { e: CalendarEvent; locale: Locale }) {
  if (!e.start) {
    return (
      <div className="w-20 shrink-0 text-center">
        <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-dxb-slate">{fmt(locale, `${e.month}-01`, { month: 'short' })}</span>
        <span className="block font-cormorant text-2xl text-dxb-slate/70 mt-1">TBA</span>
      </div>
    )
  }
  return (
    <div className="w-20 shrink-0 text-center">
      <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-dxb-gold">{fmt(locale, e.start, { month: 'short' })}</span>
      <span className="block font-cormorant text-4xl leading-none text-dxb-ink mt-1" dir="ltr">
        {fmt('en', e.start, { day: 'numeric' })}
      </span>
      {e.end && e.end !== e.start && (
        <span className="block mt-1 text-[11px] text-dxb-slate" dir="ltr">
          – {e.endMonthOnly ? fmt(locale, e.end, { month: 'short' }) : fmt('en', e.end, { day: 'numeric' }) + (e.end.slice(5, 7) !== e.start.slice(5, 7) ? ' ' + fmt(locale, e.end, { month: 'short' }) : '')}
        </span>
      )}
    </div>
  )
}

function StatusBadge({ e, locale }: { e: CalendarEvent; locale: Locale }) {
  const tone =
    e.status === 'confirmed'
      ? 'border-dxb-sea/30 text-dxb-sea'
      : e.status === 'expected'
        ? 'border-dxb-gold/40 text-[#8A6A2B]'
        : 'border-dxb-ink/15 text-dxb-slate'
  return (
    <span className={`inline-flex items-center gap-1.5 border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] ${tone}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${e.status === 'confirmed' ? 'bg-dxb-sea' : e.status === 'expected' ? 'bg-dxb-gold' : 'bg-dxb-slate/50'}`} />
      {c.status[e.status][locale]}
    </span>
  )
}

function EventRow({ e, locale, open, onToggle, live }: { e: CalendarEvent; locale: Locale; open: boolean; onToggle: () => void; live: boolean }) {
  const help = c.helps[e.helps]
  const panelId = `event-${e.id}`
  return (
    <li id={`row-${e.id}`} className="border-b border-dxb-ink/10 scroll-mt-48">
      <button type="button" onClick={onToggle} aria-expanded={open} aria-controls={panelId} className="w-full flex items-start gap-4 sm:gap-6 py-6 text-start group">
        <DateBlock e={e} locale={locale} />
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`h-2 w-2 rounded-full ${CATEGORY_TONE[e.category]}`} aria-hidden="true" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-dxb-slate">{c.categories[e.category][locale]}</span>
            <StatusBadge e={e} locale={locale} />
            {live && <span className="bg-dxb-clay px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-white">{c.onNow[locale]}</span>}
            {e.ticketable && <span className="border border-dxb-clay/40 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-dxb-clay">{c.ticketsOnRequest[locale]}</span>}
          </div>
          <h3 className="mt-2 font-cormorant text-2xl md:text-3xl leading-tight text-dxb-ink group-hover:text-dxb-gold transition-colors">{e.name[locale]}</h3>
          <p className="mt-1 flex items-center gap-1.5 text-sm text-dxb-slate">
            <MapPin className="w-3.5 h-3.5 text-dxb-gold shrink-0" />
            <span className="truncate">{e.venue[locale]}</span>
            <span className="text-dxb-ink/25">·</span>
            <span className="shrink-0">{c.emirates[e.emirate][locale]}</span>
          </p>
        </div>
        <span className="hidden sm:inline-flex items-center gap-1.5 pt-2 text-xs font-semibold uppercase tracking-[0.16em] text-dxb-slate group-hover:text-dxb-gold">
          {open ? c.hide[locale] : c.details[locale]}
          <ChevronDown className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} />
        </span>
        <ChevronDown className={`sm:hidden mt-2 w-5 h-5 text-dxb-slate transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div id={panelId} className="pb-8 ps-0 sm:ps-[6.5rem] grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7">
            <p className="text-dxb-ink/85 leading-relaxed text-[17px]">{e.summary[locale]}</p>
            <dl className="mt-5 grid grid-cols-[5.5rem_1fr] gap-x-4 gap-y-2 text-sm">
              <dt className="text-[11px] font-semibold uppercase tracking-[0.2em] text-dxb-slate pt-0.5">{c.when[locale]}</dt>
              <dd className="text-dxb-ink">
                {e.start ? dateRange(locale, e) : monthLabel(locale, e.month!)}
                {e.dateNote && <span className="block text-dxb-slate mt-0.5">{e.dateNote[locale]}</span>}
              </dd>
              <dt className="text-[11px] font-semibold uppercase tracking-[0.2em] text-dxb-slate pt-0.5">{c.where[locale]}</dt>
              <dd className="text-dxb-ink">
                {e.venue[locale]} · {c.emirates[e.emirate][locale]}
              </dd>
            </dl>
            {e.ticketable && (
              <div className="mt-7 border border-dxb-gold/40 bg-white/70 p-5">
                <p className="text-sm text-dxb-ink/85 leading-relaxed">{c.ticketsNote[locale]}</p>
                <div className="mt-4 flex flex-wrap items-center gap-4">
                  <Link
                    href={`/request?service=tickets&event=${encodeURIComponent(e.name.en)}${e.start ? `&date=${e.start}` : ''}`}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-dxb-clay text-white text-xs font-semibold tracking-[0.14em] uppercase hover:bg-dxb-clay-hover transition-colors"
                  >
                    {c.requestTickets[locale]} <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                  </Link>
                  <a
                    href={whatsappLink(`${c.ticketsWhatsAppMessage[locale]} ${e.name[locale]} — ${e.start ? dateRange(locale, e) : monthLabel(locale, e.month!)}.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-dxb-ink underline underline-offset-4 hover:text-dxb-gold"
                  >
                    <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
                    {c.ticketsWhatsApp[locale]}
                  </a>
                </div>
                <EventEvening e={e} locale={locale} />
              </div>
            )}
            {e.website && (
              <>
                <a href={e.website} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 border-b border-dxb-ink pb-0.5 text-sm font-semibold text-dxb-ink hover:text-dxb-gold hover:border-dxb-gold">
                  {c.official[locale]} <ArrowUpRight className="w-4 h-4" />
                </a>
                <p className="mt-2 text-xs text-dxb-slate">{c.officialNote[locale]}</p>
              </>
            )}
          </div>
          <aside className="lg:col-span-5 self-start border-s-2 border-dxb-gold bg-white/70 px-6 py-5">
            <p className="text-sm text-dxb-ink/85 leading-relaxed">{help.copy[locale]}</p>
            <Link href={help.href} className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-dxb-clay">
              {help.cta[locale]} <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </Link>
          </aside>
        </div>
      )}
    </li>
  )
}

/** Event bundle: tickets + a table nearby + a private car (strategy report, opportunity 8). */
function EventEvening({ e, locale }: { e: CalendarEvent; locale: Locale }) {
  const plan = usePlan()
  const [added, setAdded] = useState(false)
  const car = getProduct('private-chauffeur')
  const variant = car?.variants.find(v => v.id === 'sedan-5')
  const date = e.start && e.start >= new Date().toISOString().slice(0, 10) ? e.start : ''
  return (
    <div className="mt-5 border-t border-dxb-gold/30 pt-4">
      <p className="font-cormorant text-xl text-dxb-ink">{c.eveningTitle[locale]}</p>
      <p className="mt-1 text-sm text-dxb-slate">{c.eveningCopy[locale]}</p>
      <div className="mt-3 flex flex-wrap items-center gap-4">
        <Link
          href={`/request?service=tickets&bundle=evening&event=${encodeURIComponent(e.name.en)}${e.start ? `&date=${e.start}` : ''}`}
          className="inline-flex items-center gap-2 border border-dxb-ink px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-dxb-ink hover:border-dxb-gold hover:text-dxb-gold"
        >
          {c.eveningCta[locale]} <ArrowRight className="w-4 h-4 rtl:rotate-180" />
        </Link>
        {car && variant && (
          <button
            type="button"
            disabled={added}
            onClick={() => {
              plan.add({ slug: car.slug, variantId: variant.id, date, time: 'evening', qty: 1, children: 0, extras: {} })
              setAdded(true)
              plan.setOpen(true)
            }}
            className="text-sm font-semibold text-dxb-ink underline underline-offset-4 hover:text-dxb-gold disabled:no-underline disabled:text-dxb-slate"
          >
            {added ? c.carAdded[locale] : `${c.addCar[locale]} · ${formatAED(variant.price, locale)}`}
          </button>
        )}
      </div>
    </div>
  )
}

export function EventCalendar({ locale, initialToday }: { locale: Locale; initialToday: string }) {
  // The page is pre-rendered; refresh "today" in the browser so finished events drop off.
  const [today, setToday] = useState(initialToday)
  useEffect(() => setToday(new Date().toISOString().slice(0, 10)), [])

  const [month, setMonth] = useState<string>('all')
  const [category, setCategory] = useState<EventCategory | 'all'>('all')
  const [emirate, setEmirate] = useState<Emirate | 'all'>('all')
  const [openId, setOpenId] = useState<string | null>(null)

  const upcoming = useMemo(() => events.filter(e => lastDay(e) >= today).sort((a, b) => sortKey(a).localeCompare(sortKey(b))), [today])
  const months = useMemo(() => Array.from(new Set(upcoming.flatMap(e => monthsOf(e, today)))).sort(), [upcoming, today])

  const isLive = (e: CalendarEvent) => !!e.start && e.start <= today && lastDay(e) >= today

  // Highlights: dated events, skipping season-long ones (Global Village, festivals over ~6 weeks).
  const nextUp = useMemo(
    () => upcoming.filter(e => e.status !== 'tba' && (d(lastDay(e)).getTime() - d(e.start!).getTime()) / 864e5 <= 45).slice(0, 3),
    [upcoming],
  )

  const filtered = upcoming.filter(
    e =>
      (category === 'all' || e.category === category) &&
      (emirate === 'all' || e.emirate === emirate) &&
      (month === 'all' || monthsOf(e, today).includes(month)),
  )

  // Group by the month the visitor would see the event in.
  const groups = useMemo(() => {
    const map = new Map<string, CalendarEvent[]>()
    for (const e of filtered) {
      const key = month !== 'all' ? month : monthsOf(e, today)[0]
      if (!map.has(key)) map.set(key, [])
      map.get(key)!.push(e)
    }
    return Array.from(map.entries()).sort(([a], [b]) => a.localeCompare(b))
  }, [filtered, month, today])

  const anyFilter = month !== 'all' || category !== 'all' || emirate !== 'all'
  const chip = (active: boolean) =>
    `shrink-0 px-4 py-2 text-sm border transition-colors ${active ? 'bg-dxb-ink text-white border-dxb-ink' : 'bg-white/60 text-dxb-ink border-dxb-ink/15 hover:border-dxb-gold'}`

  return (
    <>
      {/* Coming up */}
      <section className="bg-dxb-ivory">
        <div className="max-w-6xl mx-auto px-6 pt-16 md:pt-20">
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-dxb-gold">{c.nextUp[locale]}</p>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-5">
            {nextUp.map(e => (
              <button
                key={e.id}
                type="button"
                onClick={() => {
                  setMonth('all')
                  setCategory('all')
                  setEmirate('all')
                  setOpenId(e.id)
                  window.setTimeout(() => document.getElementById(`row-${e.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50)
                }}
                className="group relative text-start bg-dxb-ink text-white p-7 overflow-hidden"
              >
                <span className={`absolute top-0 start-0 h-1 w-full ${CATEGORY_TONE[e.category]}`} aria-hidden="true" />
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-dxb-gold">{c.categories[e.category][locale]}</span>
                  {isLive(e) && <span className="shrink-0 whitespace-nowrap bg-dxb-clay px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em]">{c.onNow[locale]}</span>}
                </div>
                <h3 className="mt-5 font-cormorant text-3xl leading-tight group-hover:text-dxb-gold transition-colors">{e.name[locale]}</h3>
                <p className="mt-3 text-sm text-white/70">{dateRange(locale, e)}</p>
                <p className="mt-1 text-sm text-white/50">{e.venue[locale]}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/70 group-hover:text-white">
                  {c.details[locale]} <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Filters + list */}
      <section className="bg-dxb-ivory">
        <div className="max-w-6xl mx-auto px-6 py-14 md:py-20">
          <div className="sticky top-[72px] z-20 -mx-6 px-6 py-4 bg-dxb-ivory/95 backdrop-blur border-b border-dxb-ink/10" role="group" aria-label={c.filters[locale]}>
            <div className="flex gap-2 overflow-x-auto scrollbar-none" aria-label={c.month[locale]}>
              <button type="button" onClick={() => setMonth('all')} className={chip(month === 'all')}>
                {c.allMonths[locale]}
              </button>
              {months.map(m => (
                <button key={m} type="button" onClick={() => setMonth(m)} className={chip(month === m)}>
                  {monthLabel(locale, m)}
                </button>
              ))}
            </div>
            <div className="mt-3 flex flex-col md:flex-row md:items-center gap-3 md:gap-6">
              <div className="flex gap-2 overflow-x-auto scrollbar-none" aria-label={c.category[locale]}>
                <button type="button" onClick={() => setCategory('all')} className={chip(category === 'all')}>
                  {c.all[locale]}
                </button>
                {CATEGORIES.map(k => (
                  <button key={k} type="button" onClick={() => setCategory(k)} className={chip(category === k)}>
                    <span className={`inline-block h-2 w-2 rounded-full me-2 ${CATEGORY_TONE[k]}`} aria-hidden="true" />
                    {c.categories[k][locale]}
                  </button>
                ))}
              </div>
              <label className="flex items-center gap-3 text-sm md:ms-auto">
                <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-dxb-slate">{c.emirate[locale]}</span>
                <select value={emirate} onChange={ev => setEmirate(ev.target.value as Emirate | 'all')} className="border border-dxb-ink/15 bg-white/60 px-3 py-2 text-sm text-dxb-ink focus:border-dxb-gold focus:outline-none">
                  <option value="all">{c.all[locale]}</option>
                  {EMIRATES.map(k => (
                    <option key={k} value={k}>
                      {c.emirates[k][locale]}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between text-sm text-dxb-slate" aria-live="polite">
            <span>{c.count[locale].replace('{n}', String(filtered.length))}</span>
            {anyFilter && (
              <button
                type="button"
                onClick={() => {
                  setMonth('all')
                  setCategory('all')
                  setEmirate('all')
                }}
                className="underline underline-offset-4 hover:text-dxb-gold"
              >
                {c.reset[locale]}
              </button>
            )}
          </div>

          {groups.length === 0 ? (
            <p className="mt-12 text-dxb-slate">{c.none[locale]}</p>
          ) : (
            groups.map(([ym, list]) => (
              <div key={ym} className="mt-12">
                <h2 className="font-cormorant text-3xl md:text-4xl font-light text-dxb-ink border-b border-dxb-ink pb-3">{monthLabel(locale, ym)}</h2>
                <ul>
                  {list.map(e => (
                    <EventRow key={e.id} e={e} locale={locale} live={isLive(e)} open={openId === e.id} onToggle={() => setOpenId(openId === e.id ? null : e.id)} />
                  ))}
                </ul>
              </div>
            ))
          )}
        </div>
      </section>
    </>
  )
}
