'use client'

import { HONEYPOT_FIELD } from '@/lib/honeypot-field'
import { BrandIcon, Perforation, Tear } from '@/components/brand'
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

const input = 'mt-1.5 w-full h-11 border border-dxb-line bg-white px-3 text-[15px] text-dxb-ink focus:outline-none focus:border-dxb-cobalt focus:ring-2 focus:ring-dxb-cobalt/20'

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
          [HONEYPOT_FIELD]: form.get(HONEYPOT_FIELD),
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
            className="absolute inset-y-0 end-0 w-full max-w-md bg-dxb-sand flex flex-col shadow-2xl"
          >
            <header className="flex items-center justify-between px-6 py-5 bg-dxb-navy text-white">
              <div>
                <h2 className="flex items-center gap-2.5 text-2xl font-extrabold tracking-[-0.02em]"><BrandIcon name="ticket" className="w-6 h-6 text-dxb-orange" />{tp('title')}</h2>
                {items.length > 0 && <p className="dxb-label text-[11px] text-white/60 mt-1">{tp('items', { count: items.length })}</p>}
              </div>
              <button type="button" onClick={() => setOpen(false)} aria-label={tp('close')} className="p-2 hover:text-dxb-orange">
                <X className="w-6 h-6" />
              </button>
            </header>

            <div className="flex-1 overflow-y-auto">
              {status === 'done' ? (
                <div className="p-8 text-center">
                  <CheckCircle2 className="w-12 h-12 text-dxb-cobalt mx-auto" />
                  <h3 className="font-display text-3xl text-dxb-navy mt-4">{tp('successTitle')}</h3>
                  <p className="text-dxb-slate mt-3 leading-relaxed">{tp('successCopy')}</p>
                  <p className="mt-5 text-sm text-dxb-ink">
                    {tp('reference')}: <span className="dxb-data font-semibold text-dxb-navy" dir="ltr">{reference}</span>
                  </p>
                </div>
              ) : priced.length === 0 ? (
                <div className="p-8 text-center">
                  <p className="text-dxb-slate leading-relaxed">{tp('empty')}</p>
                  <Link href="/experiences" onClick={() => setOpen(false)} className="inline-block mt-6 px-6 py-3 bg-dxb-orange dxb-cut dxb-cut-sm text-dxb-ink text-sm font-bold">
                    {tp('browse')}
                  </Link>
                </div>
              ) : (
                <>
                  <ul className="divide-y divide-dxb-line bg-white">
                    {priced.map(p => (
                      <li key={p.item.key} className="px-6 py-4">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <Link href={productHref(p.product)} onClick={() => setOpen(false)} className="font-bold text-dxb-navy hover:text-dxb-cobalt">
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
                                <CalendarDays className="w-3.5 h-3.5 text-dxb-cobalt" />
                                <span className="sr-only">{tp('pickDate')}</span>
                                <input type="date" min={tomorrow()} aria-label={`${tp('pickDate')} — ${p.product.name[locale]}`} value=""
                                  onChange={e => { update(p.item.key, { date: e.target.value }); setDatesError('') }}
                                  className="border border-dxb-cobalt/50 bg-white px-2 py-1 text-xs dxb-data focus:outline-none focus:border-dxb-cobalt" />
                                <span className="text-dxb-slate"><Tear />{t(`timeOptions.${p.item.time}`)}</span>
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
                            <p className="dxb-data font-semibold text-dxb-navy">{formatAED(p.total, locale)}</p>
                            <button type="button" onClick={() => remove(p.item.key)} className="mt-2 inline-flex items-center gap-1 text-xs text-dxb-slate hover:text-dxb-red">
                              <Trash2 className="w-3.5 h-3.5" /> {tp('remove')}
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <div className="relative px-6 py-4 bg-white dxb-notch-top">
                    <Perforation className="absolute top-0 inset-x-3 text-dxb-navy" />
                    <div className="flex items-baseline justify-between">
                      <span className="dxb-label text-[11px] text-dxb-muted">{t('total')}</span>
                      <span className="dxb-data text-2xl font-semibold text-dxb-navy">{formatAED(total, locale)}</span>
                    </div>
                    <p className="text-xs text-dxb-slate mt-2">{t('whatHappens')}</p>
                    {priced.some(p => !p.product.priceVerified) && <p className="text-xs text-dxb-muted mt-1">{t('indicativeNote')}</p>}
                  </div>

                  <form onSubmit={submit} className="relative px-6 py-6 space-y-4">
                    <input type="text" name={HONEYPOT_FIELD} data-1p-ignore data-lpignore="true" data-form-type="other" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 opacity-0" />
                    <h3 className="dxb-label text-[11px] text-dxb-cobalt">{tp('yourDetails')}</h3>
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
                      <textarea name="notes" rows={3} className={`${input} !h-auto py-2.5`} />
                    </label>
                    {undated > 0 && (
                      <label className="flex items-start gap-2 text-xs text-dxb-ink">
                        <input type="checkbox" checked={flexible} onChange={e => { setFlexible(e.target.checked); setDatesError('') }} className="mt-0.5 accent-[#2F3DF0]" />
                        {tp('datesFlexible')}
                      </label>
                    )}
                    {datesError && <p role="alert" className="text-sm text-dxb-red">{datesError === 'pay' ? tp('datesNeededPay') : tp('datesNeeded')}</p>}
                    <label className="flex items-start gap-2 text-xs text-dxb-slate">
                      <input name="consent" type="checkbox" required className="mt-0.5 accent-[#2F3DF0]" />
                      {tp('consent')}
                    </label>
                    {status === 'error' && <p className="text-sm text-dxb-red">{paying ? tp('payError') : tp('error')}</p>}
                    <button type="submit" value="request" disabled={status === 'sending'} className="w-full px-6 py-3.5 bg-dxb-orange dxb-cut dxb-cut-sm text-dxb-ink text-sm font-bold hover:bg-dxb-orange-hover disabled:opacity-60">
                      {status === 'sending' && !paying ? tp('sending') : tp('submit')}
                    </button>
                    {PAYMENTS && (
                      <div id="plan-pay" className="border border-dxb-ink/15 bg-dxb-sand p-4 scroll-mt-6">
                        <button type="submit" value="pay" disabled={status === 'sending'} className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-dxb-navy text-white text-sm font-bold hover:bg-dxb-navy disabled:opacity-60">
                          <Lock className="w-4 h-4" />
                          {status === 'sending' && paying ? tp('sending') : `${tp('payNow')} · ${formatAED(total, locale)}`}
                        </button>
                        <p className="mt-2 text-[11px] leading-relaxed text-dxb-slate">
                          {PAYMENTS === 'test' && <span className="me-1 inline-block bg-dxb-orange px-1.5 py-0.5 font-medium font-mono uppercase tracking-[0.06em] text-dxb-ink">{tp('payTest')}</span>}
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
      <BrandIcon name="ticket" className="w-6 h-6" strokeWidth={1.75} />
      {ready && items.length > 0 && (
        <span className="absolute -top-1.5 -end-2 min-w-[18px] h-[18px] px-1 rounded-full bg-dxb-orange text-dxb-ink text-[10px] font-bold grid place-items-center">{items.length}</span>
      )}
    </button>
  )
}
