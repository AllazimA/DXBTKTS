'use client'

import { useState } from 'react'
import type { Locale } from '@/i18n.config'
import { membership as m } from '@/content/membership'
import type { CardFinish } from '@/components/membership/membership-card'

const field = 'mt-2 w-full h-12 bg-white border border-dxb-line px-4 text-[15px] normal-case tracking-normal font-sans text-dxb-ink focus:outline-none focus:border-dxb-cobalt focus:ring-2 focus:ring-dxb-cobalt/20'
const label = 'block dxb-label text-[11px] text-dxb-muted'

export function MembershipForm({ locale, tier, onTierChange }: { locale: Locale; tier?: string; onTierChange?: (id: CardFinish) => void }) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')
  const f = m.form

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    setStatus('sending')
    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.get('name'),
          email: data.get('email'),
          phone: data.get('whatsapp'),
          contact_method: 'whatsapp',
          interest: `Membership — ${data.get('level')}`,
          message: [`Residence: ${data.get('residence')}`, data.get('message') || ''].filter(Boolean).join('\n'),
          referral_source: 'membership_page',
          company_website: data.get('company_website'),
          page: window.location.pathname,
          locale,
        }),
      })
      if (!res.ok) throw new Error()
      setStatus('done')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'done') {
    return <p className="font-display text-3xl text-dxb-navy leading-snug">{f.success[locale]}</p>
  }

  return (
    <form onSubmit={submit} className="relative space-y-7">
      <input type="text" name="company_website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 opacity-0" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
        <label className={label}>
          {f.name[locale]} *
          <input name="name" required autoComplete="name" className={field} />
        </label>
        <label className={label}>
          {f.email[locale]} *
          <input name="email" type="email" required autoComplete="email" dir="ltr" className={field} />
        </label>
        <label className={label}>
          {f.whatsapp[locale]} *
          <input name="whatsapp" type="tel" required autoComplete="tel" dir="ltr" className={field} />
        </label>
        <label className={label}>
          {f.residence[locale]}
          <select name="residence" className={field}>
            {f.residenceOptions[locale].map(o => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </label>
      </div>
      <fieldset>
        <legend className={label}>{f.level[locale]}</legend>
        <div className="mt-3 flex flex-wrap gap-3">
          {[...m.tiers.map(t => ({ id: t.id as CardFinish, name: t.name })), { id: 'majlis' as CardFinish, name: m.majlis.name }].map(t => (
            <label key={t.id} className="cursor-pointer">
              <input
                type="radio"
                name="level"
                value={t.name.en}
                {...(tier ? { checked: tier === t.id, onChange: () => onTierChange?.(t.id) } : { defaultChecked: t.id === 'pearl' })}
                className="peer sr-only"
              />
              <span className="inline-flex items-center h-10 px-4 border-2 border-dxb-line text-sm font-semibold normal-case tracking-normal font-sans text-dxb-navy peer-checked:border-dxb-cobalt peer-checked:bg-dxb-cobalt peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-dxb-cobalt transition-colors">
                {t.name[locale]}
              </span>
            </label>
          ))}
        </div>
      </fieldset>
      <label className={label}>
        {f.message[locale]}
        <textarea name="message" rows={3} className={`${field} !h-auto py-3`} />
      </label>
      <label className="flex items-start gap-3 text-sm text-dxb-ink/75">
        <input type="checkbox" required className="mt-1 accent-[#2F3DF0]" />
        {f.consent[locale]}
      </label>
      {status === 'error' && <p className="text-sm text-dxb-red">{f.error[locale]}</p>}
      <button type="submit" disabled={status === 'sending'} className="inline-flex items-center justify-center h-14 px-10 bg-dxb-orange text-dxb-ink text-base font-bold dxb-cut dxb-cut-sm hover:bg-dxb-orange-hover transition-colors disabled:opacity-60">
        {status === 'sending' ? f.sending[locale] : f.submit[locale]}
      </button>
    </form>
  )
}
