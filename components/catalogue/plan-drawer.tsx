'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import { AnimatePresence, motion } from 'framer-motion'
import { X, Trash2, CalendarDays,  CheckCircle2, Lock } from 'lucide-react'
import type { Locale } from '@/i18n.config'
import { priceItems } from '@/lib/catalogue/pricing'
import { formatAED } from '@/lib/catalogue/money'
import { whatsappLink } from '@/lib/site'
import { usePlan } from './plan-provider'
import { productHref } from './product-card'
import { WhatsAppIcon } from '@/components/ui/whatsapp-icon'

const input = 'mt-1.5 w-full border border-dxb-band bg-white px-3 py-2.5 text-sm focus:outline-none focus:border-dxb-gold'

/** Online payment shows only when a Stripe publishable key is configured. */
const PK = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? ''
const PAYMENTS: 'test' | 'live' | null = PK.startsWith('pk_test_') ? 'test' : PK.startsWith('pk_live_') ? 'live' : null

function tomorrow() {
  const d = new Date()
  d.setDate(d.getDate() + 1)
  return d.toISOString().slice(0, 10)
}

export function PlanDrawer() {
  const { items, open, setOpen, remove, clear, update } = usePlan()
  const locale = useLocale() as Locale
  const t = useTranslations('catalogue')
  const tp = useTranslations('catalogue.plan')
  const { priced, total } = useMemo(() => priceItems(items), [items])
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')
  const [reference, setReference] = useState('')
  const [paying, setPaying] = useState(false)
  const [flexible, setFlexible] = useState(false)
  const [datesError, setDatesError] = useState<'' | 'request' | 'pay'>('')
  const undated = priced.filter(p => !p.item.date).length

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, setOpen])

  useEffect(() => {
    if (open && status === 'done' && items.length) setStatus('idle')
  }, [open, items.length, status])

  const whatsappMessage = [
    'Hi DXB TKTS — my plan:',
    ...priced.map(p => `• ${p.product.name.en} — ${p.variant.name.en}${p.item.date ? `, ${p.item.date} (${p.item.time})` : ''}, qty ${p.item.qty}${p.item.children ? ` + ${p.item.children} children` : ''} — AED ${p.total}`),
    `Estimated total: AED ${total}`,
  ].join('\n')

  // Per-person tickets already say how many people: start the guest count there (largest group in the plan).
  const guestsGuess = Math.max(0, ...priced.filter(p => p.product.priceType === 'per_person').map(p => p.item.qty + (p.item.children || 0)))

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const pay = ((e.nativeEvent as SubmitEvent).submitter as HTMLButtonElement | null)?.value === 'pay'
    // Every experience needs a date — or, for a request, the guest says the dates are flexible. Paying always needs dates.
    if (undated && (pay || !flexible)) { setDatesError(pay ? 'pay' : 'request'); return }
    setDatesError('')
    setStatus('sending')
    setPaying(pay)
    try {
      const res = await fetch(pay ? '/api/checkout' : '/api/plan-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.get('name'),
          email: form.get('email'),
          whatsapp: form.get('whatsapp'),
          hotel: form.get('hotel'),
          guests: Number(form.get('guests')) || null,
          notes: form.get('notes'),
          datesFlexible: undated > 0 && flexible,
          consent: form.get('consent') === 'on',
          company_website: form.get('company_website'),
          locale,
          items: items.map(({ key, ...rest }) => rest),
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      if (pay) {
        // Stripe-hosted payment page; the plan is cleared once payment is confirmed.
        window.location.assign(data.url)
        return
      }
      setReference(data.reference)
      setStatus('done')
      clear()
    } catch {
      setStatus('error')
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[60]" role="dialog" aria-modal="true" aria-label={tp('title')}>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-dxb-ink/60" onClick={() => setOpen(false)} />
          <motion.aside
            initial={{ x: locale === 'ar' ? '-100%' : '100%' }}
            animate={{ x: 0 }}
            exit={{ x: locale === 'ar' ? '-100%' : '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="absolute inset-y-0 end-0 w-full max-w-md bg-dxb-ivory flex flex-col shadow-2xl"
          >
            <header className="flex items-center justify-between px-6 py-5 bg-dxb-ink text-white">
              <div>
                <h2 className="font-cormorant text-3xl">{tp('title')}</h2>
                {items.length > 0 && <p className="text-xs text-white/60">{tp('items', { count: items.length })}</p>}
              </div>
              <button type="button" onClick={() => setOpen(false)} aria-label={tp('close')} className="p-2 hover:text-dxb-gold">
                <X className="w-6 h-6" />
              </button>
            </header>

            <div className="flex-1 overflow-y-auto">
              {status === 'done' ? (
                <div className="p-8 text-center">
                  <CheckCircle2 className="w-12 h-12 text-dxb-gold mx-auto" />
                  <h3 className="font-cormorant text-3xl text-dxb-ink mt-4">{tp('successTitle')}</h3>
                  <p className="text-dxb-slate mt-3 leading-relaxed">{tp('successCopy')}</p>
                  <p className="mt-5 text-sm text-dxb-ink">
                    {tp('reference')}: <span className="font-semibold" dir="ltr">{reference}</span>
                  </p>
                </div>
              ) : priced.length === 0 ? (
                <div className="p-8 text-center">
                  <p className="text-dxb-slate leading-relaxed">{tp('empty')}</p>
                  <Link href="/experiences" onClick={() => setOpen(false)} className="inline-block mt-6 px-6 py-3 bg-dxb-clay text-white text-sm font-semibold">
                    {tp('browse')}
                  </Link>
                </div>
              ) : (
                <>
                  <ul className="divide-y divide-dxb-band">
                    {priced.map(p => (
                      <li key={p.item.key} className="px-6 py-4">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <Link href={productHref(p.product)} onClick={() => setOpen(false)} className="font-semibold text-dxb-ink hover:text-dxb-gold">
                              {p.product.name[locale]}
                            </Link>
                            <p className="text-sm text-dxb-slate">{p.variant.name[locale]}</p>
                            {p.item.date ? (
                              <p className="text-xs text-dxb-slate mt-1 inline-flex items-center gap-1.5">
                                <CalendarDays className="w-3.5 h-3.5" />
                                {p.item.date} · {t(`timeOptions.${p.item.time}`)}
                              </p>
                            ) : (
                              // No date yet: pick it right here, so the request arrives complete.
                              <label className="mt-1.5 flex items-center gap-2 text-xs text-dxb-ink">
                                <CalendarDays className="w-3.5 h-3.5 text-dxb-gold" />
                                <span className="sr-only">{tp('pickDate')}</span>
                                <input type="date" min={tomorrow()} aria-label={`${tp('pickDate')} — ${p.product.name[locale]}`} value=""
                                  onChange={e => { update(p.item.key, { date: e.target.value }); setDatesError('') }}
                                  className="border border-dxb-gold/60 bg-white px-2 py-1 text-xs focus:outline-none focus:border-dxb-gold" />
                                <span className="text-dxb-slate">· {t(`timeOptions.${p.item.time}`)}</span>
                              </label>
                            )}
                            {p.product.priceType !== 'per_group' && (
                              <p className="text-xs text-dxb-slate">
                                {t(`qty.${p.product.priceType}`)}: {p.item.qty}
                                {p.item.children > 0 && ` · ${t('children')}: ${p.item.children}`}
                              </p>
                            )}
                          </div>
                          <div className="text-end shrink-0">
                            <p className="font-semibold text-dxb-ink">{formatAED(p.total, locale)}</p>
                            <button type="button" onClick={() => remove(p.item.key)} className="mt-2 inline-flex items-center gap-1 text-xs text-dxb-slate hover:text-red-700">
                              <Trash2 className="w-3.5 h-3.5" /> {tp('remove')}
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <div className="px-6 py-4 bg-white border-y border-dxb-band">
                    <div className="flex items-baseline justify-between">
                      <span className="text-sm text-dxb-slate">{t('total')}</span>
                      <span className="text-2xl font-semibold text-dxb-ink">{formatAED(total, locale)}</span>
                    </div>
                    <p className="text-xs text-dxb-slate mt-2">{t('whatHappens')}</p>
                    {priced.some(p => !p.product.priceVerified) && <p className="text-xs text-dxb-gold mt-1">{t('indicativeNote')}</p>}
                  </div>

                  <form onSubmit={submit} className="relative px-6 py-6 space-y-4">
                    <input type="text" name="company_website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 opacity-0" />
                    <h3 className="text-xs font-semibold tracking-[0.2em] uppercase text-dxb-slate">{tp('yourDetails')}</h3>
                    <label className="block text-sm text-dxb-ink">
                      {tp('name')} *
                      <input name="name" required autoComplete="name" className={input} />
                    </label>
                    <label className="block text-sm text-dxb-ink">
                      {tp('email')} *
                      <input name="email" type="email" required autoComplete="email" dir="ltr" className={input} />
                    </label>
                    <label className="block text-sm text-dxb-ink">
                      {tp('whatsapp')} *
                      <input name="whatsapp" type="tel" required autoComplete="tel" dir="ltr" placeholder="+44 7700 900000" className={input} />
                    </label>
                    <label className="block text-sm text-dxb-ink">
                      {tp('guests')} *
                      <input key={guestsGuess} name="guests" type="number" inputMode="numeric" min={1} max={100} required defaultValue={guestsGuess || undefined} dir="ltr" className={input} />
                      <span className="mt-1 block text-xs text-dxb-slate">{tp('guestsHint')}</span>
                    </label>
                    <label className="block text-sm text-dxb-ink">
                      {tp('hotel')}
                      <input name="hotel" className={input} />
                    </label>
                    <label className="block text-sm text-dxb-ink">
                      {tp('notes')}
                      <textarea name="notes" rows={3} className={input} />
                    </label>
                    {undated > 0 && (
                      <label className="flex items-start gap-2 text-xs text-dxb-ink">
                        <input type="checkbox" checked={flexible} onChange={e => { setFlexible(e.target.checked); setDatesError('') }} className="mt-0.5 accent-[#B08D3F]" />
                        {tp('datesFlexible')}
                      </label>
                    )}
                    {datesError && <p role="alert" className="text-sm text-red-700">{datesError === 'pay' ? tp('datesNeededPay') : tp('datesNeeded')}</p>}
                    <label className="flex items-start gap-2 text-xs text-dxb-slate">
                      <input name="consent" type="checkbox" required className="mt-0.5 accent-[#B08D3F]" />
                      {tp('consent')}
                    </label>
                    {status === 'error' && <p className="text-sm text-red-700">{paying ? tp('payError') : tp('error')}</p>}
                    <button type="submit" value="request" disabled={status === 'sending'} className="w-full px-6 py-3.5 bg-dxb-clay text-white text-sm font-semibold tracking-[0.12em] uppercase hover:bg-dxb-clay-hover disabled:opacity-60">
                      {status === 'sending' && !paying ? tp('sending') : tp('submit')}
                    </button>
                    {PAYMENTS && (
                      <div id="plan-pay" className="border border-dxb-ink/15 bg-dxb-ivory p-4 scroll-mt-6">
                        <button type="submit" value="pay" disabled={status === 'sending'} className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-dxb-ink text-white text-sm font-semibold tracking-[0.12em] uppercase hover:bg-dxb-navy disabled:opacity-60">
                          <Lock className="w-4 h-4" />
                          {status === 'sending' && paying ? tp('sending') : `${tp('payNow')} · ${formatAED(total, locale)}`}
                        </button>
                        <p className="mt-2 text-[11px] leading-relaxed text-dxb-slate">
                          {PAYMENTS === 'test' && <span className="me-1 inline-block bg-dxb-gold/15 px-1.5 py-0.5 font-semibold uppercase tracking-[0.12em] text-[#8A6A2B]">{tp('payTest')}</span>}
                          {tp('payNote')}
                        </p>
                      </div>
                    )}
                    <a href={whatsappLink(whatsappMessage)} target="_blank" rel="noopener noreferrer" className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 border border-dxb-ink/20 text-dxb-ink text-sm font-semibold hover:border-dxb-gold">
                      <WhatsAppIcon className="w-4 h-4 text-[#25D366]" /> {tp('whatsappInstead')}
                    </a>
                  </form>
                </>
              )}
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  )
}

export function PlanButton({ className = '' }: { className?: string }) {
  const { items, ready, setOpen } = usePlan()
  const t = useTranslations('nav')
  return (
    <button type="button" onClick={() => setOpen(true)} className={`relative inline-flex items-center gap-2 text-white/90 hover:text-dxb-gold transition-colors ${className}`} aria-label={t('plan')}>
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M4 5h16v14H4z" />
        <path d="M8 5V3m8 2V3M4 9h16M8 13h4m-4 3h7" />
      </svg>
      {ready && items.length > 0 && (
        <span className="absolute -top-1.5 -end-2 min-w-[18px] h-[18px] px-1 rounded-full bg-dxb-gold text-white text-[10px] font-bold grid place-items-center">{items.length}</span>
      )}
    </button>
  )
}
