'use client'

import { useState } from 'react'
import type { Locale } from '@/i18n.config'
import { membership as m } from '@/content/membership'
import type { CardFinish } from '@/components/membership/membership-card'

const field = 'mt-2 w-full bg-transparent border-b border-white/25 px-0 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-dxb-gold'
const label = 'block text-[11px] font-medium font-mono uppercase tracking-[0.06em] text-white/55'

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
    return <p className="font-display text-3xl text-white leading-snug">{f.success[locale]}</p>
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
          <select name="residence" className={`${field} [&>option]:text-dxb-ink`}>
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
              <span className="inline-block px-4 py-2 border border-white/25 text-sm text-white/80 peer-checked:border-dxb-gold peer-checked:text-dxb-gold transition-colors">
                {t.name[locale]}
              </span>
            </label>
          ))}
        </div>
      </fieldset>
      <label className={label}>
        {f.message[locale]}
        <textarea name="message" rows={3} className={field} />
      </label>
      <label className="flex items-start gap-3 text-sm text-white/60">
        <input type="checkbox" required className="mt-1 accent-[#2F3DF0]" />
        {f.consent[locale]}
      </label>
      {status === 'error' && <p className="text-sm text-dxb-red">{f.error[locale]}</p>}
      <button type="submit" disabled={status === 'sending'} className="px-10 py-4 bg-dxb-orange text-dxb-ink text-sm font-bold hover:bg-white transition-colors disabled:opacity-60">
        {status === 'sending' ? f.sending[locale] : f.submit[locale]}
      </button>
    </form>
  )
}
