'use client'

import { useEffect, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'

const inputStyles =
  'mt-2 w-full bg-white/[0.04] border border-white/15 px-4 py-3.5 text-white placeholder:text-white/30 focus:outline-none focus:border-dxb-gold/70 focus:bg-white/[0.06] transition-colors'

const labelStyles = 'block text-xs font-medium tracking-[0.06em] font-mono uppercase text-white/60'

export function RequestForm() {
  const t = useTranslations('request.form')
  const serviceOptions = t.raw('serviceOptions') as string[]
  const contactOptions = t.raw('contactOptions') as Record<string, string>
  const accent = (chunks: React.ReactNode) => (
    <span className="text-dxb-gold">{chunks}</span>
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
          company_website: formData.get('company_website'),
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
        className="border border-dxb-gold/50 bg-white/[0.03] p-12 text-center"
      >
        <span className="text-xs font-medium tracking-[0.06em] text-dxb-gold font-mono uppercase">
          {t('successEyebrow')}
        </span>
        <h3 className="font-display text-4xl text-white mt-5 mb-4">
          {t.rich('successTitle', { accent })}
        </h3>
        <p className="text-white/65 font-light leading-relaxed max-w-md mx-auto">
          {t('successCopy')}
        </p>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="relative space-y-7">
          <input
            type="text"
            name="company_website"
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
          <select id="contact_method" name="contact_method" required className={`${inputStyles} [&>option]:text-dxb-ink`}>
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
          <select ref={serviceRef} id="service" name="service" required className={`${inputStyles} [&>option]:text-dxb-ink`}>
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
          <input ref={dateRef} id="date" name="date" type="date" className={`${inputStyles} [color-scheme:dark]`} />
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
          className={inputStyles}
        />
      </div>

      {error && <p className="text-sm text-dxb-red/90">{t('error')}</p>}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full px-10 py-4 bg-dxb-orange text-dxb-ink text-sm font-bold transition-all duration-300 hover:bg-dxb-orange-hover hover:shadow-[0_0_40px_rgba(176,141,63,0.4)] disabled:opacity-60"
      >
        {isLoading ? t('sending') : t('submit')}
      </button>

      <p className="text-center text-xs text-white/40 tracking-wide">{t('assurance')}</p>
    </form>
  )
}
