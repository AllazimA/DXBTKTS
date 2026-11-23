'use client'

import { useState } from 'react'
import { Check } from 'lucide-react'
import type { Locale } from '@/i18n.config'
import { usePlan } from '@/components/catalogue/plan-provider'
import type { PackageItem } from '@/data/packages'
import { packagesCopy as c } from '@/content/packages'

/** Adds every item of a package to the visitor's plan, then offers to open it. */
export function AddPackageButton({ items, locale, multiDay }: { items: PackageItem[]; locale: Locale; multiDay?: boolean }) {
  const plan = usePlan()
  const [date, setDate] = useState('')
  const [added, setAdded] = useState(false)
  const today = new Date().toISOString().slice(0, 10)

  return (
    <div>
      {!multiDay && (
        <label className="block text-xs font-medium tracking-[0.06em] font-mono uppercase text-dxb-slate">
          {c.date[locale]}
          <input type="date" min={today} value={date} onChange={e => setDate(e.target.value)} className="mt-2 w-full border border-dxb-band bg-white px-3 py-2.5 text-sm normal-case tracking-normal text-dxb-ink focus:outline-none focus:border-dxb-gold" />
          <span className="mt-1 block text-[11px] normal-case tracking-normal font-normal text-dxb-slate">{c.dateHint[locale]}</span>
        </label>
      )}
      <button
        type="button"
        onClick={() => {
          for (const it of items) plan.add({ ...it, date: date || it.date })
          setAdded(true)
          plan.setOpen(true)
        }}
        disabled={added}
        className="mt-5 w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-dxb-orange text-dxb-ink text-sm font-bold hover:bg-dxb-orange-hover disabled:opacity-80 transition-colors"
      >
        {added ? (
          <>
            <Check className="w-4 h-4" /> {c.added[locale]}
          </>
        ) : (
          c.add[locale]
        )}
      </button>
      {added && (
        <button type="button" onClick={() => plan.setOpen(true)} className="mt-2 w-full text-sm font-semibold text-dxb-ink underline underline-offset-4">
          {c.openPlan[locale]}
        </button>
      )}
    </div>
  )
}
