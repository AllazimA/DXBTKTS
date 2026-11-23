'use client'

import { HONEYPOT_FIELD } from '@/lib/honeypot-field'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useLocale } from 'next-intl'
import { motion } from 'framer-motion'
import type { Locale } from '@/i18n.config'
import type { ServiceKind } from '@/lib/service-requests'
import { FORM_FIELDS, formCopy as c, type FieldSpec, type Option } from '@/content/service-forms'
import { BrandIcon } from '@/components/brand'

const input =
  'mt-2 w-full h-12 bg-white border border-dxb-line px-4 text-[15px] text-dxb-ink placeholder:text-dxb-muted/60 focus:outline-none focus:border-dxb-cobalt focus:ring-2 focus:ring-dxb-cobalt/20 transition-colors'
const labelCls = 'block dxb-label text-[11px] text-dxb-muted'

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
          [HONEYPOT_FIELD]: fd.get(HONEYPOT_FIELD),
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
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="p-8 md:p-10 text-center" role="status">
        <span className="inline-flex items-center gap-2 dxb-label text-dxb-cobalt"><BrandIcon name="confirmed" className="w-5 h-5" />{c.successEyebrow[locale]}</span>
        <h3 className="font-display text-3xl md:text-4xl text-dxb-navy mt-5 mb-4">{c.successTitle[locale]}</h3>
        <p className="text-dxb-muted leading-relaxed max-w-md mx-auto">{c.successCopy[locale]}</p>
      </motion.div>
    )
  }

  const grid = compact ? 'grid grid-cols-1 gap-5' : 'grid grid-cols-1 sm:grid-cols-2 gap-6'
  const fid = (k: string) => `${id ?? kind}-${k}`

  return (
    <form ref={formRef} onSubmit={onSubmit} className="relative space-y-6 scroll-mt-28" id={id}>
      <input type="text" name={HONEYPOT_FIELD} data-1p-ignore data-lpignore="true" data-form-type="other" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 opacity-0" />

      <div className={grid}>
        {fields.map(f => (
          <div key={f.key} className={!compact && f.wide ? 'sm:col-span-2' : undefined}>
            <label htmlFor={fid(f.key)} className={labelCls}>
              {f.label[locale]}
              {f.required && <span className="text-dxb-red" aria-hidden="true"> *</span>}
            </label>
            <Field f={f} id={fid(f.key)} locale={locale} suggest={f.key === suggestOn} />
          </div>
        ))}
      </div>

      <div className={grid}>
        <div className={compact ? undefined : 'sm:col-span-2'}>
          <label htmlFor={fid('name')} className={labelCls}>{c.name[locale]}<span className="text-dxb-red" aria-hidden="true"> *</span></label>
          <input id={fid('name')} name="name" type="text" required autoComplete="name" className={input} />
        </div>
        <div>
          <label htmlFor={fid('email')} className={labelCls}>{c.email[locale]}<span className="text-dxb-red" aria-hidden="true"> *</span></label>
          <input id={fid('email')} name="email" type="email" required autoComplete="email" dir="ltr" className={input} />
        </div>
        <div>
          <label htmlFor={fid('phone')} className={labelCls}>{c.phone[locale]}<span className="text-dxb-red" aria-hidden="true"> *</span></label>
          <input id={fid('phone')} name="phone" type="tel" required autoComplete="tel" dir="ltr" className={input} />
        </div>
        <div className={compact ? undefined : 'sm:col-span-2'}>
          <label htmlFor={fid('message')} className={labelCls}>{c.message[locale]}</label>
          <textarea id={fid('message')} name="message" rows={compact ? 3 : 4} className={`${input} !h-auto py-3`} />
        </div>
      </div>

      {requireTerms && (
        <label className="flex items-start gap-3 text-sm text-dxb-ink/80 leading-relaxed cursor-pointer">
          <input type="checkbox" name="termsAccepted" required className="mt-1 h-4 w-4 accent-[#2F3DF0] shrink-0" />
          <span>{c.termsLabel[locale]}</span>
        </label>
      )}

      {error && <p className="text-sm text-dxb-red/90" role="alert">{error}</p>}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full inline-flex items-center justify-center h-14 px-10 bg-dxb-orange text-dxb-ink text-base font-bold dxb-cut dxb-cut-sm transition-colors hover:bg-dxb-orange-hover disabled:opacity-60"
      >
        {isLoading ? c.sending[locale] : c.submit[locale]}
      </button>
      <p className="text-center text-xs text-dxb-muted">{c.assurance[locale]}</p>
    </form>
  )
}

function Field({ f, id, locale, suggest }: { f: FieldSpec; id: string; locale: Locale; suggest: boolean }) {
  const common = { id, name: f.key, required: f.required, placeholder: f.placeholder?.[locale] }
  switch (f.type) {
    case 'textarea':
      return <textarea {...common} rows={3} className={`${input} !h-auto py-3`} />
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
      return <input {...common} type="date" min={new Date().toISOString().slice(0, 10)} className={`${input} dxb-data`} />
    case 'time':
      return <input {...common} type="time" step={900} className={`${input} dxb-data`} />
    case 'number':
      return <input {...common} type="number" inputMode="numeric" min={f.min} max={f.max} className={input} />
    case 'url':
      return <input {...common} type="url" dir="ltr" className={input} />
    default:
      return <input {...common} type="text" className={input} />
  }
}
