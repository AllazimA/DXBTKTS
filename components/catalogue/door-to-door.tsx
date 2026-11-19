'use client'

import { useState } from 'react'
import { Car, Check } from 'lucide-react'
import type { Locale } from '@/i18n.config'
import { getProduct } from '@/data/catalogue'
import { usePlan } from '@/components/catalogue/plan-provider'
import { formatAED } from '@/lib/catalogue/money'
import { addonsCopy as c } from '@/content/addons'

/** Opportunity 1: offer the private car (existing product and prices) next to any experience without transport. */
export function DoorToDoor({ locale }: { locale: Locale }) {
  const plan = usePlan()
  const car = getProduct('private-chauffeur')
  const [added, setAdded] = useState<string | null>(null)
  if (!car) return null
  const options = car.variants.filter(v => v.id === 'sedan-5' || v.id === 'suv-5')

  return (
    <div className="mt-4 border border-dxb-band bg-white p-5">
      <p className="flex items-center gap-2 font-cormorant text-xl text-dxb-ink">
        <Car className="w-5 h-5 text-dxb-gold" /> {c.doorTitle[locale]}
      </p>
      <p className="mt-1 text-xs text-dxb-slate leading-relaxed">{c.doorCopy[locale]}</p>
      <div className="mt-3 space-y-2">
        {options.map(v => (
          <button
            key={v.id}
            type="button"
            disabled={!!added}
            onClick={() => {
              plan.add({ slug: car.slug, variantId: v.id, date: '', time: 'any', qty: 1, children: 0, extras: {} })
              setAdded(v.id)
            }}
            className="w-full flex items-center justify-between gap-3 border border-dxb-ink/15 px-3 py-2.5 text-sm text-start hover:border-dxb-gold disabled:opacity-60 transition-colors"
          >
            <span>
              <span className="block font-semibold text-dxb-ink">{v.name[locale]}</span>
              <span className="block text-xs text-dxb-slate">{v.detail[locale]}</span>
            </span>
            <span className="whitespace-nowrap font-semibold text-dxb-ink">
              {added === v.id ? <Check className="w-4 h-4 text-dxb-gold" /> : formatAED(v.price, locale)}
            </span>
          </button>
        ))}
      </div>
      {added && (
        <button type="button" onClick={() => plan.setOpen(true)} className="mt-3 text-sm font-semibold text-dxb-ink underline underline-offset-4">
          {c.doorAdded[locale]}
        </button>
      )}
    </div>
  )
}
