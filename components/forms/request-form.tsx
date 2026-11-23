'use client'

import { HONEYPOT_FIELD } from '@/lib/honeypot-field'
import { useEffect, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { BrandIcon } from '@/components/brand'

const inputStyles =
  'mt-2 w-full h-12 bg-white border border-dxb-line px-4 text-[15px] text-dxb-ink placeholder:text-dxb-muted/60 focus:outline-none focus:border-dxb-cobalt focus:ring-2 focus:ring-dxb-cobalt/20 transition-colors'

const labelStyles = 'block dxb-label text-[11px] text-dxb-muted'

export function RequestForm() {
  const t = useTranslations('request.form')
  const serviceOptions = t.raw('serviceOptions') as string[]
  const contactOptions = t.raw('contactOptions') as Record<string, string>
  const accent = (chunks: React.ReactNode) => (
    <span className="text-dxb-cobalt">{chunks}</span>
  )

  const serviceRef = useRef<HTMLSelectElement>(null)
  const dateRef = useRef<HTMLInputElement>(null)
  const messageRef = useRef<HTMLTextAreaElement>(null)

  // Prefill from links such as /request?service=tickets&event=…&date=YYYY-MM-DD (What's On page).
  useEffect(() => {
    const q = new URLSearchParams(window.location.search)
    const kind = q.get('service')
    if ((kind === 'tickets' || kind === 'shopping') && serviceRef.current) {
      serviceRef.current.value = t(kind === 'tickets' ? 'ticketsOption' : 'shoppingOption')
      const event = q.get('event')
      if (event && messageRef.current && !messageRef.current.value) messageRef.current.value = t(kind === 'tickets' ? 'ticketsMessage' : 'shoppingMessage', { event }) + (kind === 'tickets' && q.get('bundle') === 'evening' ? t('eveningExtra') : '')
    }
    // From the homepage planner: /request?interest=Desert&guests=4&date=…
    const interest = q.get('interest')?.slice(0, 80)
    const guests = q.get('guests')?.replace(/\D/g, '').slice(0, 3)
    if ((interest || guests) && messageRef.current && !messageRef.current.value) {
      messageRef.current.value = t('plannerMessage', { interest: interest || '—', guests: guests || '—' })
    }
    const date = q.get('date')
    if (date && /^\d{4}-\d{2}-\d{2}$/.test(date) && dateRef.current) dateRef.current.value = date
  }, [t])

  const [isLoading, setIsLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError(false)

    try {
      const formData = new FormData(e.currentTarget)
      const response = await fetch('/api/enquiry', {
        method: 'POST',
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          phone: formData.get('phone'),
          contact_method: formData.get('contact_method'),
          interest: formData.get('service'),
          message: formData.get('message'),
          date: formData.get('date'),
          referral_source: 'request_page',
          [HONEYPOT_FIELD]: formData.get(HONEYPOT_FIELD),
          page: window.location.pathname,
          locale: document.documentElement.lang,
        }),
        headers: { 'Content-Type': 'application/json' },
      })

      if (response.ok) setSubmitted(true)
      else setError(true)
    } catch {
      setError(true)
    } finally {
      setIsLoading(false)
    }
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-10 md:p-12 text-center"
      >
        <span className="inline-flex items-center gap-2 dxb-label text-dxb-cobalt">
          <BrandIcon name="confirmed" className="w-5 h-5" />{t('successEyebrow')}
        </span>
        <h3 className="font-display text-4xl text-dxb-navy mt-5 mb-4">
          {t.rich('successTitle', { accent })}
        </h3>
        <p className="text-dxb-muted leading-relaxed max-w-md mx-auto">
          {t('successCopy')}
        </p>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="relative space-y-7">
          <input
            type="text"
            name={HONEYPOT_FIELD} data-1p-ignore data-lpignore="true" data-form-type="other"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="absolute -left-[9999px] h-0 w-0 opacity-0"
          />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className={labelStyles}>
            {t('name')}
          </label>
          <input id="name" name="name" type="text" required placeholder={t('namePlaceholder')} className={inputStyles} />
        </div>
        <div>
          <label htmlFor="phone" className={labelStyles}>
            {t('phone')}
          </label>
          <input id="phone" name="phone" type="tel" required placeholder={t('phonePlaceholder')} className={inputStyles} dir="ltr" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="email" className={labelStyles}>
            {t('email')}
          </label>
          <input id="email" name="email" type="email" required placeholder={t('emailPlaceholder')} className={inputStyles} dir="ltr" />
        </div>
        <div>
          <label htmlFor="contact_method" className={labelStyles}>
            {t('contactMethod')}
          </label>
          <select id="contact_method" name="contact_method" required className={inputStyles}>
            <option value="">{t('contactMethodPlaceholder')}</option>
            {Object.entries(contactOptions).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="service" className={labelStyles}>
            {t('service')}
          </label>
          <select ref={serviceRef} id="service" name="service" required className={inputStyles}>
            <option value="">{t('servicePlaceholder')}</option>
            {serviceOptions.map(s => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="date" className={labelStyles}>
            {t('date')}
          </label>
          <input ref={dateRef} id="date" name="date" type="date" className={`${inputStyles} dxb-data`} />
        </div>
      </div>

      <div>
        <label htmlFor="message" className={labelStyles}>
          {t('message')}
        </label>
        <textarea
          ref={messageRef}
          id="message"
          name="message"
          rows={5}
          placeholder={t('messagePlaceholder')}
          className={`${inputStyles} !h-auto py-3`}
        />
      </div>

      {error && <p className="text-sm text-dxb-red/90">{t('error')}</p>}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full inline-flex items-center justify-center gap-2 h-14 px-10 bg-dxb-orange text-dxb-ink text-base font-bold dxb-cut dxb-cut-sm transition-colors hover:bg-dxb-orange-hover disabled:opacity-60"
      >
        {isLoading ? t('sending') : t('submit')}
      </button>

      <p className="text-center text-xs text-dxb-muted">{t('assurance')}</p>
    </form>
  )
}
