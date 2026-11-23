'use client'

import { useMemo, useState } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { Check, Minus, Plus, Lock } from 'lucide-react'
import type { Locale } from '@/i18n.config'
import type { PlanItem, Product } from '@/lib/catalogue/types'
import { perPersonHint, priceItem } from '@/lib/catalogue/pricing'
import { approx, formatAED } from '@/lib/catalogue/money'
import { whatsappLink } from '@/lib/site'
import { usePlan } from './plan-provider'
import { WhatsAppIcon } from '@/components/ui/whatsapp-icon'
import { BrandSymbol, Perforation, Tear } from '@/components/brand'

function tomorrow() {
  const d = new Date()
  d.setDate(d.getDate() + 1)
  return d.toISOString().slice(0, 10)
}

function Stepper({ label, value, min, max, onChange, hint }: { label: string; value: number; min: number; max: number; onChange: (n: number) => void; hint?: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div>
        <span className="text-sm text-dxb-ink">{label}</span>
        {hint && <span className="block text-xs text-dxb-slate">{hint}</span>}
      </div>
      <div className="flex items-center border border-dxb-line bg-white" dir="ltr">
        <button type="button" aria-label={`− ${label}`} onClick={() => onChange(Math.max(min, value - 1))} disabled={value <= min} className="w-10 h-10 grid place-items-center text-dxb-ink disabled:opacity-30">
          <Minus className="w-4 h-4" />
        </button>
        <span className="w-10 text-center dxb-data text-[15px] font-semibold text-dxb-navy" aria-live="polite">{value}</span>
        <button type="button" aria-label={`+ ${label}`} onClick={() => onChange(Math.min(max, value + 1))} disabled={value >= max} className="w-10 h-10 grid place-items-center text-dxb-ink disabled:opacity-30">
          <Plus className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

/** Online payment shows only when a Stripe publishable key is configured. */
const PK = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? ''
const PAYMENTS = PK.startsWith('pk_test_') || PK.startsWith('pk_live_')

export function BookingPanel({ product }: { product: Product }) {
  const locale = useLocale() as Locale
  const t = useTranslations('catalogue')
  const plan = usePlan()
  const defaultVariant = product.variants.find(v => v.recommended) ?? product.variants[0]

  const [item, setItem] = useState<Omit<PlanItem, 'key'>>({
    slug: product.slug,
    variantId: defaultVariant.id,
    date: '',
    time: 'any',
    qty: product.priceType === 'per_person' ? Math.max(2, product.minQty) : product.minQty,
    children: 0,
    extras: {},
  })
  const [added, setAdded] = useState(false)
  const set = (patch: Partial<typeof item>) => {
    setAdded(false)
    setItem(prev => ({ ...prev, ...patch }))
  }

  const priced = useMemo(() => priceItem({ ...item, key: 'draft' }), [item])
  const variant = priced?.variant ?? defaultVariant
  const total = priced?.total ?? 0

  const whatsappMessage = [
    `Hi DXB TKTS — ${product.name.en}`,
    `${variant.name.en}`,
    item.date ? `Date: ${item.date} (${item.time})` : 'Date: flexible',
    product.priceType !== 'per_group' ? `Quantity: ${item.qty}${item.children ? ` + ${item.children} children` : ''}` : '',
    `Estimated total: AED ${total}`,
  ]
    .filter(Boolean)
    .join('\n')

  return (
    <div className="dxb-lift"><div className="bg-white dxb-cut">
      <div className="flex items-center justify-between gap-3 bg-dxb-navy text-white px-6 py-3">
        <span className="dxb-label text-[11px] text-dxb-orange inline-flex items-center"><BrandSymbol className="h-3.5 me-2" />DXB TKTS</span>
        <span className="dxb-label text-[11px] text-white/60">{product.confirmation === 'instant' ? t('confirmation.instant') : t('confirmation.on_request')}</span>
      </div>
      <div className="p-6 space-y-6">
        {/* Options */}
        <fieldset>
          <legend className="dxb-label text-[11px] text-dxb-muted mb-3">{t('options')}</legend>
          <div className="space-y-2">
            {product.variants.map(v => {
              const selected = v.id === item.variantId
              const hint = perPersonHint(product, v)
              return (
                <label key={v.id} className={`flex items-start gap-3 p-3 border-2 cursor-pointer transition-colors ${selected ? 'border-dxb-cobalt bg-dxb-cobalt/[0.04]' : 'border-dxb-line hover:border-dxb-navy/40'}`}>
                  <input type="radio" name="variant" value={v.id} checked={selected} onChange={() => set({ variantId: v.id })} className="mt-1 accent-[#2F3DF0]" />
                  <span className="flex-1">
                    <span className="flex flex-wrap items-center gap-2">
                      <span className="text-[15px] font-bold text-dxb-navy">{v.name[locale]}</span>
                      {v.recommended && <span className="dxb-label text-[9.5px] bg-dxb-orange text-dxb-ink px-1.5 py-0.5">{t('ourPick')}</span>}
                    </span>
                    <span className="block text-xs text-dxb-slate mt-0.5">{v.detail[locale]}</span>
                    {hint && <span className="block text-xs text-dxb-cobalt mt-0.5">{t('eachFor', { each: hint.each, people: hint.people })}</span>}
                  </span>
                  <span className="dxb-data text-sm font-semibold text-dxb-navy whitespace-nowrap">
                    {formatAED(v.price, locale)}
                    <span className="block font-sans text-[11px] font-normal text-dxb-muted text-end">{t(`priceType.${product.priceType}`)}</span>
                  </span>
                </label>
              )
            })}
          </div>
        </fieldset>

        {/* Date & time */}
        <div className="grid grid-cols-2 gap-3">
          <label className="block">
            <span className="dxb-label text-[11px] text-dxb-muted">{t('date')}</span>
            <input type="date" min={tomorrow()} value={item.date} onChange={e => set({ date: e.target.value })} className="mt-2 w-full h-11 border border-dxb-line px-3 dxb-data text-sm text-dxb-navy focus:outline-none focus:border-dxb-cobalt" />
          </label>
          <label className="block">
            <span className="dxb-label text-[11px] text-dxb-muted">{t('time')}</span>
            <select value={item.time} onChange={e => set({ time: e.target.value as PlanItem['time'] })} className="mt-2 w-full h-11 border border-dxb-line px-3 text-sm bg-white text-dxb-navy focus:outline-none focus:border-dxb-cobalt">
              {(['any', 'morning', 'afternoon', 'evening'] as const).map(o => (
                <option key={o} value={o}>
                  {t(`timeOptions.${o}`)}
                </option>
              ))}
            </select>
          </label>
        </div>

        {/* Quantities */}
        {product.priceType !== 'per_group' && (
          <div className="space-y-3">
            <Stepper
              label={t(`qty.${product.priceType}`)}
              value={item.qty}
              min={product.minQty}
              max={product.maxQty}
              onChange={n => set({ qty: n })}
              hint={product.priceType === 'per_hour' && product.minQty > 1 ? t('minHours', { min: product.minQty }) : undefined}
            />
            {product.priceType === 'per_person' && variant.childPrice !== undefined && (
              <Stepper label={t('children')} value={item.children} min={0} max={product.maxQty} onChange={n => set({ children: n })} hint={formatAED(variant.childPrice, locale)} />
            )}
          </div>
        )}

        {/* Extras */}
        {product.extras && product.extras.length > 0 && (
          <div>
            <p className="dxb-label text-[11px] text-dxb-muted mb-3">{t('extras')}</p>
            <div className="space-y-3">
              {product.extras.map(extra => (
                <Stepper
                  key={extra.id}
                  label={extra.name[locale]}
                  hint={extra.price === 0 ? t('free') : formatAED(extra.price, locale)}
                  value={item.extras[extra.id] ?? 0}
                  min={0}
                  max={extra.max}
                  onChange={n => set({ extras: { ...item.extras, [extra.id]: n } })}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Total + actions */}
      </div>
      <div className="relative dxb-notch-top bg-white px-6 pt-5 pb-6">
        <Perforation className="absolute top-0 inset-x-3 text-dxb-navy" />
        <div className="flex items-baseline justify-between gap-3">
          <span className="dxb-label text-[11px] text-dxb-muted">{t('total')}</span>
          <span className="dxb-data text-[26px] font-semibold text-dxb-navy">{formatAED(total, locale)}</span>
        </div>
        <p className="dxb-data text-xs text-dxb-muted text-end mt-1" dir="ltr">
          {t('approx')} {approx(total, locale).join(' · ')}
        </p>
        {!product.priceVerified && <p className="text-xs text-dxb-muted mt-2">{t('indicativeNote')}</p>}

        <button
          type="button"
          onClick={() => {
            plan.add(item)
            setAdded(true)
          }}
          className="mt-5 w-full inline-flex items-center justify-center gap-2 h-12 px-6 bg-dxb-orange text-dxb-ink text-[15px] font-bold hover:bg-dxb-orange-hover transition-colors"
        >
          {added ? (
            <>
              <Check className="w-4 h-4" /> {t('added')}
            </>
          ) : (
            t('addToPlan')
          )}
        </button>
        {PAYMENTS && (
          <button
            type="button"
            onClick={() => {
              if (!added) plan.add(item)
              setAdded(true)
              plan.setOpen(true)
              // Take the guest straight to the details + payment step in the drawer.
              window.setTimeout(() => {
                document.getElementById('plan-pay')?.scrollIntoView({ behavior: 'smooth', block: 'end' })
                ;(document.querySelector('[role="dialog"] input[name="name"]') as HTMLInputElement | null)?.focus({ preventScroll: true })
              }, 450)
            }}
            className="mt-2 w-full inline-flex items-center justify-center gap-2 h-12 px-6 bg-dxb-navy text-white text-[15px] font-bold hover:bg-dxb-ink transition-colors"
          >
            <Lock className="w-4 h-4" /> {t('payNow')} <Tear className="text-white/50" /> <span className="dxb-data">{formatAED(total, locale)}</span>
          </button>
        )}
        {added && (
          <button type="button" onClick={() => plan.setOpen(true)} className="mt-2 w-full text-sm font-semibold text-dxb-cobalt underline underline-offset-4">
            {t('viewPlan')}
          </button>
        )}
        <a
          href={whatsappLink(whatsappMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 w-full inline-flex items-center justify-center gap-2 h-12 px-6 border-2 border-dxb-line text-dxb-navy text-[15px] font-bold hover:border-dxb-navy transition-colors"
        >
          <WhatsAppIcon className="w-4 h-4 text-[#25D366]" /> {t('askWhatsApp')}
        </a>
        <p className="mt-4 text-xs text-dxb-muted leading-relaxed">{t('whatHappens')} {t('chargedInAED')}</p>
      </div>
    </div>
  )
}
