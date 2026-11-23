import React from 'react'
import { cn } from '@/lib/utils'
import { LOGO_SYMBOL, LOGO_VIEWBOX, LOGO_WORDMARK, SYMBOL_D, SYMBOL_TRANSFORM, SYMBOL_VIEWBOX } from './logo-paths'
import { brandIconPaths, type BrandIconName } from './icon-paths'

/**
 * DXB TKTS identity primitives (brand package v1.0, approved 22 Nov 2026).
 * Colours follow 01_Logo usage rules: on Navy/Ink use the light-orange symbol
 * with a white wordmark ("reverse"); on Sand/White use the Navy version.
 */

type LogoTone = 'reverse' | 'navy' | 'white' | 'ink'

const TONES: Record<LogoTone, { symbol: string; word: string }> = {
  reverse: { symbol: '#FAA61C', word: '#FFFFFF' },
  navy: { symbol: '#00354E', word: '#00354E' },
  white: { symbol: '#FFFFFF', word: '#FFFFFF' },
  ink: { symbol: '#0A0E2A', word: '#0A0E2A' },
}

export function Logo({ tone = 'navy', className, title = 'DXB TKTS' }: { tone?: LogoTone; className?: string; title?: string }) {
  const c = TONES[tone]
  return (
    <svg viewBox={LOGO_VIEWBOX} className={cn('block h-8 w-auto', className)} role="img" aria-label={title} style={{ direction: 'ltr' }}>
      <path fill={c.symbol} transform={LOGO_SYMBOL.transform ?? undefined} d={LOGO_SYMBOL.d} />
      <path fill={c.word} transform={LOGO_WORDMARK.transform ?? undefined} d={LOGO_WORDMARK.d} />
    </svg>
  )
}

/** The T-Ticket symbol alone. Colour comes from `currentColor`. */
export function BrandSymbol({ className, title }: { className?: string; title?: string }) {
  return (
    <svg
      viewBox={SYMBOL_VIEWBOX}
      className={cn('block h-6 w-auto', className)}
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <path fill="currentColor" transform={SYMBOL_TRANSFORM ?? undefined} d={SYMBOL_D} />
    </svg>
  )
}

/** One of the 36 brand icons (24 px grid, 2 px stroke). */
export function BrandIcon({ name, className, strokeWidth }: { name: BrandIconName; className?: string; strokeWidth?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth ?? 2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={cn('h-5 w-5 shrink-0', className)}
      dangerouslySetInnerHTML={{ __html: brandIconPaths[name] }}
    />
  )
}

/** The tear mark ⁞ — the only separator allowed in labels. */
export function Tear({ className }: { className?: string }) {
  return (
    <span aria-hidden="true" className={cn('dxb-tear', className)}>
      <i />
      <i />
      <i />
    </span>
  )
}

/** Mono label: "DUBAI ⁞ ABU DHABI ⁞ UAE". Pass parts to get tear separators. */
export function MonoLabel({
  parts,
  children,
  className,
  as: Tag = 'span',
}: {
  parts?: React.ReactNode[]
  children?: React.ReactNode
  className?: string
  as?: 'span' | 'div' | 'p'
}) {
  return (
    <Tag className={cn('dxb-label', className)}>
      {parts
        ? parts.map((p, i) => (
            <React.Fragment key={i}>
              {i > 0 && <Tear />}
              {p}
            </React.Fragment>
          ))
        : children}
    </Tag>
  )
}

/** Perforation line used between a ticket body and its stub. */
export function Perforation({ className, vertical = false }: { className?: string; vertical?: boolean }) {
  return <span aria-hidden="true" className={cn(vertical ? 'dxb-perf-v' : 'dxb-perf-h', className)} />
}

/** Renders text with "·" separators as tear marks: "Private Concierge · Dubai". */
export function TearText({ text, className }: { text: string; className?: string }) {
  const parts = text.split(/\s*[·|•]\s*/)
  return (
    <span className={className}>
      {parts.map((p, i) => (
        <React.Fragment key={i}>
          {i > 0 && <Tear />}
          {p}
        </React.Fragment>
      ))}
    </span>
  )
}
