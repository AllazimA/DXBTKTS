'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { useLocale } from 'next-intl'
import { motion } from 'framer-motion'
import type { Locale } from '@/i18n.config'
import type { ServiceKind } from '@/lib/service-requests'
import { FORM_FIELDS, formCopy as c, type FieldSpec, type Option } from '@/content/service-forms'

const input =
  'mt-2 w-full bg-white/[0.04] border border-white/15 px-4 py-3.5 text-white placeholder:text-white/30 focus:outline-none focus:border-dxb-gold/70 focus:bg-white/[0.06] transition-colors'
const labelCls = 'block text-xs font-medium tracking-[0.06em] font-mono uppercase text-white/60'

type Props = {
  kind: ServiceKind
  /** Options for select fields whose list comes from the page (restaurants, venues, seat categories). */
  options?: Record<string, Option[]>
  /** Values sent without a visible field (e.g. the shopping experience being viewed). */
  hidden?: Record<string, string>
  /** Starting values for visible fields; ?field=value in the URL also prefills. */
  prefill?: Record<string, string>
  /** Fields to leave out on this page. */
  omit?: string[]
  /** Offer "Suggest one for me" on this select field. */
  suggestOn?: string
  /** Show the terms checkbox (sourcing). */
  requireTerms?: boolean
  /** Compact layout for a side panel: one column. */
  compact?: boolean
  id?: string
}

export function ServiceRequestForm({ kind, options = {}, hidden = {}, prefill = {}, omit = [], suggestOn, requireTerms, compact, id }: Props) {
  const locale = useLocale() as Locale
  const formRef = useRef<HTMLFormElement>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fields = useMemo(
    () => FORM_FIELDS[kind].filter(f => !omit.includes(f.key) && !(f.key in hidden)).map(f => (options[f.key] ? { ...f, options: options[f.key] } : f)).filter(f => f.type !== 'select' || (f.options?.length ?? 0) > 0 || f.key === suggestOn),
    [kind, omit, hidden, options, suggestOn],
  )

  // Prefill from props, then from the address bar (?restaurant=…&date=…), e.g. a card's "Request a table".
  useEffect(() => {
    const form = formRef.current
    if (!form) return
    const q = new URLSearchParams(window.location.search)
    for (const f of fields) {
      const v = q.get(f.key) ?? prefill[f.key]
      const el = form.elements.namedItem(f.key) as HTMLInputElement | HTMLSelectElement | null
      if (!v || !el || el.value) continue
      if (f.type === 'date' && !/^\d{4}-\d{2}-\d{2}$/.test(v)) continue
      if (el instanceof HTMLSelectElement && !Array.from(el.options).some(op => op.value === v)) continue
      el.value = v
    }
  }, [fields, prefill])

  // A card's "Request a table" button (PrefillButton) picks its venue here.
  useEffect(() => {
    const onPrefill = (e: Event) => {
      const { formId, values } = (e as CustomEvent<{ formId?: string; values?: Record<string, string> }>).detail ?? {}
      if (formId && formId !== id) return
      for (const [key, value] of Object.entries(values ?? {})) {
        const el = formRef.current?.elements.namedItem(key) as HTMLInputElement | HTMLSelectElement | null
        if (el && (!(el instanceof HTMLSelectElement) || Array.from(el.options).some(op => op.value === value))) el.value = value
      }
    }
    window.addEventListener('dxb:prefill', onPrefill)
    return () => window.removeEventListener('dxb:prefill', onPrefill)
  }, [id])

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    const fd = new FormData(e.currentTarget)
    const values: Record<string, string> = { ...hidden }
    for (const f of fields) {
      const v = String(fd.get(f.key) ?? '').trim()
      if (v) values[f.key] = v
    }
    if (suggestOn && values[suggestOn] === '__suggest') {
      values[suggestOn] = 'Please suggest one'
      values.recommendationWanted = 'yes'
    }
    if (requireTerms) values.termsAccepted = fd.get('termsAccepted') ? 'yes' : 'no'
    try {
      const res = await fetch('/api/service-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: kind,
          name: fd.get('name'),
          email: fd.get('email'),
          phone: fd.get('phone'),
          message: fd.get('message'),
          fields: values,
          company_website: fd.get('company_website'),
          page: window.location.pathname,
          locale,
        }),
      })
      if (res.ok) setSubmitted(true)
      else setError(c.error[locale])
    } catch {
      setError(c.error[locale])
    } finally {
      setIsLoading(false)
    }
  }

  if (submitted) {
    return (
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="border border-dxb-gold/50 bg-white/[0.03] p-10 text-center" role="status">
        <span className="text-xs font-medium tracking-[0.06em] text-dxb-gold font-mono uppercase">{c.successEyebrow[locale]}</span>
        <h3 className="font-display text-3xl md:text-4xl text-white mt-5 mb-4">{c.successTitle[locale]}</h3>
        <p className="text-white/65 font-light leading-relaxed max-w-md mx-auto">{c.successCopy[locale]}</p>
      </motion.div>
    )
  }

  const grid = compact ? 'grid grid-cols-1 gap-5' : 'grid grid-cols-1 sm:grid-cols-2 gap-6'
  const fid = (k: string) => `${id ?? kind}-${k}`

  return (
    <form ref={formRef} onSubmit={onSubmit} className="relative space-y-6 scroll-mt-28" id={id}>
      <input type="text" name="company_website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 opacity-0" />

      <div className={grid}>
        {fields.map(f => (
          <div key={f.key} className={!compact && f.wide ? 'sm:col-span-2' : undefined}>
            <label htmlFor={fid(f.key)} className={labelCls}>
              {f.label[locale]}
              {f.required && <span className="text-dxb-gold" aria-hidden="true"> *</span>}
            </label>
            <Field f={f} id={fid(f.key)} locale={locale} suggest={f.key === suggestOn} />
          </div>
        ))}
      </div>

      <div className={grid}>
        <div className={compact ? undefined : 'sm:col-span-2'}>
          <label htmlFor={fid('name')} className={labelCls}>{c.name[locale]}<span className="text-dxb-gold" aria-hidden="true"> *</span></label>
          <input id={fid('name')} name="name" type="text" required autoComplete="name" className={input} />
        </div>
        <div>
          <label htmlFor={fid('email')} className={labelCls}>{c.email[locale]}<span className="text-dxb-gold" aria-hidden="true"> *</span></label>
          <input id={fid('email')} name="email" type="email" required autoComplete="email" dir="ltr" className={input} />
        </div>
        <div>
          <label htmlFor={fid('phone')} className={labelCls}>{c.phone[locale]}<span className="text-dxb-gold" aria-hidden="true"> *</span></label>
          <input id={fid('phone')} name="phone" type="tel" required autoComplete="tel" dir="ltr" className={input} />
        </div>
        <div className={compact ? undefined : 'sm:col-span-2'}>
          <label htmlFor={fid('message')} className={labelCls}>{c.message[locale]}</label>
          <textarea id={fid('message')} name="message" rows={compact ? 3 : 4} className={input} />
        </div>
      </div>

      {requireTerms && (
        <label className="flex items-start gap-3 text-sm text-white/75 leading-relaxed cursor-pointer">
          <input type="checkbox" name="termsAccepted" required className="mt-1 h-4 w-4 accent-[#B08D3F] shrink-0" />
          <span>{c.termsLabel[locale]}</span>
        </label>
      )}

      {error && <p className="text-sm text-dxb-red/90" role="alert">{error}</p>}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full px-10 py-4 bg-dxb-orange text-dxb-ink text-sm font-bold transition-all duration-300 hover:bg-dxb-orange-hover hover:shadow-[0_0_40px_rgba(176,141,63,0.4)] disabled:opacity-60"
      >
        {isLoading ? c.sending[locale] : c.submit[locale]}
      </button>
      <p className="text-center text-xs text-white/40 tracking-wide">{c.assurance[locale]}</p>
    </form>
  )
}

function Field({ f, id, locale, suggest }: { f: FieldSpec; id: string; locale: Locale; suggest: boolean }) {
  const common = { id, name: f.key, required: f.required, placeholder: f.placeholder?.[locale] }
  switch (f.type) {
    case 'textarea':
      return <textarea {...common} rows={3} className={input} />
    case 'select':
      return (
        <select {...common} className={`${input} [&>option]:text-dxb-ink`} defaultValue="">
          <option value="">{c.choose[locale]}</option>
          {suggest && <option value="__suggest">{c.suggest[locale]}</option>}
          {f.options?.map(op => (
            <option key={op.value} value={op.value}>
              {op.label[locale]}
            </option>
          ))}
        </select>
      )
    case 'yesno':
      return (
        <select {...common} className={`${input} [&>option]:text-dxb-ink`} defaultValue="">
          <option value="">{c.choose[locale]}</option>
          <option value="Yes">{c.yes[locale]}</option>
          <option value="No">{c.no[locale]}</option>
        </select>
      )
    case 'date':
      return <input {...common} type="date" min={new Date().toISOString().slice(0, 10)} className={`${input} [color-scheme:dark]`} />
    case 'time':
      return <input {...common} type="time" step={900} className={`${input} [color-scheme:dark]`} />
    case 'number':
      return <input {...common} type="number" inputMode="numeric" min={f.min} max={f.max} className={input} />
    case 'url':
      return <input {...common} type="url" dir="ltr" className={input} />
    default:
      return <input {...common} type="text" className={input} />
  }
}
