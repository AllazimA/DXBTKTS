import Image from 'next/image'
import React from 'react'
import { cn } from '@/lib/utils'
import { BackgroundFilm } from '@/components/ui/background-film'
import { BrandIcon, Tear } from './index'
import { FAMILY, type Family } from '@/lib/brand'
import type { Locale } from '@/i18n.config'

/**
 * Inner-page opening: navy ground, mono label, display headline and lede on
 * one side, the page photograph (or film) in a cut-corner frame on the other.
 */
export function PageHero({
  image,
  film,
  label,
  title,
  lede,
  family,
  locale,
  children,
  aside,
  className,
}: {
  image?: { src: string | null; alt: string }
  film?: { mp4: string; mobile?: string; poster?: string }
  label: string
  title: React.ReactNode
  lede?: React.ReactNode
  family?: Family
  locale?: Locale
  /** Actions under the lede */
  children?: React.ReactNode
  /** Replaces the photo frame (e.g. membership cards) */
  aside?: React.ReactNode
  className?: string
}) {
  const fam = family ? FAMILY[family] : null
  const hasMedia = Boolean(aside || image?.src)

  return (
    <section className={cn('relative bg-dxb-navy text-white overflow-hidden', className)}>
      <div
        className={cn(
          'relative max-w-7xl mx-auto px-5 sm:px-6 py-12 md:py-16 lg:py-20 grid grid-cols-1 gap-10 lg:gap-14 items-center',
          hasMedia && 'lg:grid-cols-12',
        )}
      >
        <div className={cn(hasMedia ? 'lg:col-span-6' : 'max-w-4xl', 'order-2 lg:order-1')}>
          <div className="flex flex-wrap items-center gap-3">
            {fam && locale && (
              <span className={cn('inline-flex items-center gap-1.5 h-7 px-2.5 dxb-label text-[11px] font-semibold', fam.chip)}>
                <BrandIcon name={fam.icon} className="w-3.5 h-3.5" />
                {fam.label[locale]}
              </span>
            )}
            <span className="dxb-label text-dxb-orange inline-flex items-center">
              DXB TKTS
              <Tear />
              {label}
            </span>
          </div>
          <h1 className="mt-6 font-display text-[44px] leading-[0.98] sm:text-6xl lg:text-[72px] tracking-[-0.035em] [font-stretch:110%] whitespace-pre-line">
            {title}
          </h1>
          {lede && <p className="mt-6 max-w-2xl text-lg md:text-xl leading-relaxed text-white/75">{lede}</p>}
          {children && <div className="mt-9 flex flex-col sm:flex-row flex-wrap gap-3">{children}</div>}
        </div>

        {hasMedia && (
          <div className="lg:col-span-6 order-1 lg:order-2">
            {aside ?? (
              <div className="relative aspect-[16/11] lg:aspect-[5/4] overflow-hidden dxb-cut dxb-cut-lg bg-dxb-ink">
                <Image src={image!.src!} alt={image!.alt} fill priority sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
                {film && <BackgroundFilm {...film} />}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}

/** Primary and secondary hero actions, sized for the navy ground. */
export const heroPrimary =
  'inline-flex items-center justify-center gap-2 h-14 px-7 whitespace-nowrap bg-dxb-orange text-dxb-ink font-bold dxb-cut transition-colors hover:bg-dxb-orange-hover'
export const heroSecondary =
  'inline-flex items-center justify-center gap-2.5 h-14 px-7 whitespace-nowrap border-2 border-white/40 text-white font-bold transition-colors hover:border-white hover:bg-white hover:text-dxb-navy'
