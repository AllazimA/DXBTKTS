import React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { BrandIcon, Tear } from './index'

/**
 * Section opener in the brand's editorial grid: a navy rule, a mono label
 * ("02 ⁞ SIGNATURE SERVICES"), a display headline and an optional intro or
 * link on the right. `tone="dark"` for navy/ink grounds.
 */
export function SectionHeading({
  index,
  label,
  title,
  intro,
  action,
  tone = 'light',
  align = 'split',
  className,
  as: H = 'h2',
}: {
  index?: string
  label?: React.ReactNode
  title: React.ReactNode
  intro?: React.ReactNode
  action?: { href: string; label: string; external?: boolean }
  tone?: 'light' | 'dark'
  align?: 'split' | 'center'
  className?: string
  as?: 'h1' | 'h2' | 'h3'
}) {
  const dark = tone === 'dark'
  const labelColour = dark ? 'text-dxb-orange' : 'text-dxb-cobalt'
  const titleColour = dark ? 'text-white' : 'text-dxb-navy'
  const introColour = dark ? 'text-white/70' : 'text-dxb-muted'
  const rule = dark ? 'border-white/20' : 'border-dxb-navy'

  const labelEl = (index || label) && (
    <span className={cn('dxb-label inline-flex items-center', labelColour)}>
      {index && <span dir="ltr">{index}</span>}
      {index && label && <Tear />}
      {label}
    </span>
  )

  const actionEl = action && (
    <Link
      href={action.href}
      {...(action.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={cn(
        'group inline-flex items-center gap-2 text-[15px] font-bold shrink-0 underline-offset-4 hover:underline',
        dark ? 'text-dxb-orange' : 'text-dxb-cobalt',
      )}
    >
      {action.label}
      <BrandIcon name="arrow" className="w-4 h-4 transition-transform group-hover:translate-x-0.5 rtl:rotate-180" />
    </Link>
  )

  if (align === 'center') {
    return (
      <div className={cn('text-center max-w-3xl mx-auto', className)}>
        {labelEl}
        <H className={cn('font-display text-4xl md:text-5xl lg:text-[56px] mt-4', titleColour)}>{title}</H>
        {intro && <p className={cn('mt-5 text-lg leading-relaxed', introColour)}>{intro}</p>}
        {actionEl && <div className="mt-6">{actionEl}</div>}
      </div>
    )
  }

  return (
    <div className={cn('border-t-2 pt-5', rule, className)}>
      <div className="grid md:grid-cols-12 gap-x-10 gap-y-4 items-end">
        <div className="md:col-span-7">
          {labelEl}
          <H className={cn('font-display text-4xl md:text-5xl lg:text-[56px] mt-3', titleColour)}>{title}</H>
        </div>
        {(intro || actionEl) && (
          <div className="md:col-span-5 md:pb-2 flex flex-col items-start gap-4">
            {intro && <p className={cn('text-base md:text-[17px] leading-relaxed', introColour)}>{intro}</p>}
            {actionEl}
          </div>
        )}
      </div>
    </div>
  )
}
