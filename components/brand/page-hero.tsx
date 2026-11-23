import Image from 'next/image'
import React from 'react'
import { cn } from '@/lib/utils'
import { BackgroundFilm } from '@/components/ui/background-film'
import { BrandIcon, Tear } from './index'
import { FAMILY, type Family } from '@/lib/brand'
import type { Locale } from '@/i18n.config'

/**
 * Inner-page opening: a full-bleed film or slowly drifting photograph under a
 * transparent header, with an oversized headline set low on the frame.
 * Without an image it falls back to a compact navy opening.
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
  size = 'tall',
  dim = false,
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
  /** Shown beside the copy on wide screens (e.g. membership cards) */
  aside?: React.ReactNode
  className?: string
  size?: 'tall' | 'medium'
  /** Extra shade for very bright films, so the headline stays legible */
  dim?: boolean
}) {
  const fam = family ? FAMILY[family] : null
  const cinematic = Boolean(image?.src)

  return (
    <section
      data-hero-overlay
      className={cn(
        'dxb-under-header relative overflow-hidden text-white',
        cinematic ? 'bg-dxb-ink' : 'bg-dxb-navy',
        cinematic && (size === 'tall' ? 'min-h-[88svh] md:min-h-[92svh]' : 'min-h-[68svh]'),
        'flex flex-col justify-end',
        className,
      )}
    >
      {cinematic ? (
        <>
          <div className="absolute inset-0 dxb-drift">
            <Image src={image!.src!} alt={image!.alt} fill priority sizes="100vw" className="object-cover" />
            {film && <BackgroundFilm {...film} />}
          </div>
          <div className="absolute inset-0 dxb-vignette" />
          {dim && <div className="absolute inset-0 bg-gradient-to-r from-dxb-ink/75 via-dxb-ink/45 to-dxb-ink/20 rtl:bg-gradient-to-l" />}
        </>
      ) : (
        <div aria-hidden className="absolute inset-y-0 end-0 w-1/2 dxb-pattern-navy opacity-20 hidden lg:block" />
      )}

      <div
        className={cn(
          'relative w-full max-w-7xl mx-auto px-5 sm:px-6 grid gap-10 items-end',
          cinematic ? 'pt-40 pb-14 md:pb-20' : 'pt-36 pb-14 md:pt-40 md:pb-20',
          aside && 'lg:grid-cols-12',
        )}
      >
        <div className={cn(aside ? 'lg:col-span-7' : 'max-w-5xl')}>
          <div className="dxb-rise flex flex-wrap items-center gap-3" style={{ animationDelay: '60ms' }}>
            {fam && locale && (
              <span className="inline-flex items-center gap-2 dxb-glass h-8 px-3 dxb-label text-[11px]">
                <span className={cn('h-2.5 w-2.5', fam.bg)} aria-hidden="true" />
                <BrandIcon name={fam.icon} className="w-4 h-4" />
                {fam.label[locale]}
              </span>
            )}
            <span className="dxb-label text-dxb-orange inline-flex items-center">
              DXB TKTS
              <Tear />
              {label}
            </span>
          </div>
          <h1 className="mt-6 font-display text-[48px] leading-[0.92] sm:text-7xl lg:text-[96px] tracking-[-0.045em] [font-stretch:110%] whitespace-pre-line">
            <span className="dxb-line">
              <span style={{ animationDelay: '140ms' }}>{title}</span>
            </span>
          </h1>
          {lede && (
            <p className="dxb-rise mt-6 max-w-2xl text-lg md:text-xl leading-relaxed text-white/80 font-light" style={{ animationDelay: '360ms' }}>
              {lede}
            </p>
          )}
          {children && (
            <div className="dxb-rise mt-9 flex flex-col sm:flex-row flex-wrap gap-3" style={{ animationDelay: '480ms' }}>
              {children}
            </div>
          )}
        </div>
        {aside && <div className="lg:col-span-5">{aside}</div>}
      </div>
    </section>
  )
}

/** Primary and secondary hero actions, sized for dark and cinematic grounds. */
export const heroPrimary =
  'group inline-flex items-center justify-center gap-2 h-14 px-7 whitespace-nowrap bg-dxb-orange text-dxb-ink font-bold dxb-cut transition-colors hover:bg-white'
export const heroSecondary =
  'inline-flex items-center justify-center gap-2.5 h-14 px-7 whitespace-nowrap dxb-glass text-white font-bold transition-colors hover:bg-white hover:text-dxb-navy'
