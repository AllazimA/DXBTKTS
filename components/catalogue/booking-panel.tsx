'use client'

import { useMemo, useState } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { Check, Minus, Plus,  Lock } from 'lucide-react'
import type { Locale } from '@/i18n.config'
import type { PlanItem, Product } from '@/lib/catalogue/types'
import { perPersonHint, priceItem } from '@/lib/catalogue/pricing'
import { approx, formatAED } from '@/lib/catalogue/money'
import { whatsappLink } from '@/lib/site'
import { usePlan } from './plan-provider'
import { WhatsAppIcon } from '@/components/ui/whatsapp-icon'

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
      <div className="flex items-center border border-dxb-band" dir="ltr">
        <button type="button" aria-label={`− ${label}`} onClick={() => onChange(Math.max(min, value - 1))} disabled={value <= min} className="w-10 h-10 grid place-items-center text-dxb-ink disabled:opacity-30">
          <Minus className="w-4 h-4" />
        </button>
        <span className="w-10 text-center text-sm font-semibold" aria-live="polite">{value}</span>
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
    <div className="bg-white border border-dxb-band shadow-[0_20px_60px_-30px_rgba(14,27,44,0.35)]">
      <div className="p-6 space-y-6">
        {/* Options */}
        <fieldset>
          <legend className="text-xs font-semibold tracking-[0.2em] uppercase text-dxb-slate mb-3">{t('options')}</legend>
          <div className="space-y-2">
            {product.variants.map(v => {
              const selected = v.id === item.variantId
              const hint = perPersonHint(product, v)
              return (
                <label key={v.id} className={`flex items-start gap-3 p-3 border cursor-pointer transition-colors ${selected ? 'border-dxb-gold bg-dxb-gold/5' : 'border-dxb-band hover:border-dxb-gold/50'}`}>
                  <input type="radio" name="variant" value={v.id} checked={selected} onChange={() => set({ variantId: v.id })} className="mt-1 accent-[#B08D3F]" />
                  <span className="flex-1">
                    <span className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-semibold text-dxb-ink">{v.name[locale]}</span>
                      {v.recommended && <span className="text-[10px] uppercase tracking-wider bg-dxb-ink text-white px-1.5 py-0.5">{t('ourPick')}</span>}
                    </span>
                    <span className="block text-xs text-dxb-slate mt-0.5">{v.detail[locale]}</span>
                    {hint && <span className="block text-xs text-dxb-gold mt-0.5">{t('eachFor', { each: hint.each, people: hint.people })}</span>}
                  </span>
                  <span className="text-sm font-semibold text-dxb-ink whitespace-nowrap">
                    {formatAED(v.price, locale)}
                    <span className="block text-[11px] font-normal text-dxb-slate text-end">{t(`priceType.${product.priceType}`)}</span>
                  </span>
                </label>
              )
            })}
          </div>
        </fieldset>

        {/* Date & time */}
        <div className="grid grid-cols-2 gap-3">
          <label className="block">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-dxb-slate">{t('date')}</span>
            <input type="date" min={tomorrow()} value={item.date} onChange={e => set({ date: e.target.value })} className="mt-2 w-full border border-dxb-band px-3 py-2.5 text-sm" />
          </label>
          <label className="block">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-dxb-slate">{t('time')}</span>
            <select value={item.time} onChange={e => set({ time: e.target.value as PlanItem['time'] })} className="mt-2 w-full border border-dxb-band px-3 py-2.5 text-sm bg-white">
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
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-dxb-slate mb-3">{t('extras')}</p>
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
      <div className="border-t border-dxb-band p-6 bg-dxb-ivory">
        <div className="flex items-baseline justify-between gap-3">
          <span className="text-sm text-dxb-slate">{t('total')}</span>
          <span className="text-2xl font-semibold text-dxb-ink">{formatAED(total, locale)}</span>
        </div>
        <p className="text-xs text-dxb-slate text-end mt-1" dir="ltr">
          {t('approx')} {approx(total, locale).join(' · ')}
        </p>
        {!product.priceVerified && <p className="text-xs text-dxb-gold mt-2">{t('indicativeNote')}</p>}

        <button
          type="button"
          onClick={() => {
            plan.add(item)
            setAdded(true)
          }}
          className="mt-5 w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-dxb-clay text-white text-sm font-semibold tracking-[0.12em] uppercase hover:bg-dxb-clay-hover transition-colors"
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
            className="mt-2 w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-dxb-ink text-white text-sm font-semibold tracking-[0.12em] uppercase hover:bg-dxb-navy transition-colors"
          >
            <Lock className="w-4 h-4" /> {t('payNow')} · {formatAED(total, locale)}
          </button>
        )}
        {added && (
          <button type="button" onClick={() => plan.setOpen(true)} className="mt-2 w-full text-sm font-semibold text-dxb-ink underline underline-offset-4">
            {t('viewPlan')}
          </button>
        )}
        <a
          href={whatsappLink(whatsappMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 w-full inline-flex items-center justify-center gap-2 px-6 py-3 border border-dxb-ink/20 text-dxb-ink text-sm font-semibold hover:border-dxb-gold hover:text-dxb-gold transition-colors"
        >
          <WhatsAppIcon className="w-4 h-4 text-[#25D366]" /> {t('askWhatsApp')}
        </a>
        <p className="mt-4 text-xs text-dxb-slate leading-relaxed">{t('whatHappens')} {t('chargedInAED')}</p>
      </div>
    </div>
  )
}
