import { useId } from 'react'
import type { Locale } from '@/i18n.config'

/**
 * Language flags drawn as SVG (emoji flags do not render on Windows).
 * English → United Kingdom, Français → France, العربية → United Arab Emirates
 * (the site's home market). The language name is always shown next to the flag.
 */
export function Flag({ locale, className = 'h-3.5 w-5' }: { locale: Locale; className?: string }) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, '')
  const common = { className: `${className} shrink-0 rounded-[2px] ring-1 ring-black/10`, 'aria-hidden': true as const, preserveAspectRatio: 'xMidYMid slice' }
  if (locale === 'fr')
    return (
      <svg viewBox="0 0 3 2" {...common}>
        <rect width="1" height="2" fill="#002395" />
        <rect x="1" width="1" height="2" fill="#FFFFFF" />
        <rect x="2" width="1" height="2" fill="#ED2939" />
      </svg>
    )
  if (locale === 'ar')
    return (
      <svg viewBox="0 0 12 6" {...common}>
        <rect width="12" height="2" fill="#00732F" />
        <rect y="2" width="12" height="2" fill="#FFFFFF" />
        <rect y="4" width="12" height="2" fill="#000000" />
        <rect width="3" height="6" fill="#FF0000" />
      </svg>
    )
  return (
    <svg viewBox="0 0 60 30" {...common}>
      <clipPath id={`s${id}`}>
        <path d="M0,0 v30 h60 v-30 z" />
      </clipPath>
      <clipPath id={`t${id}`}>
        <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" />
      </clipPath>
      <g clipPath={`url(#s${id})`}>
        <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#FFFFFF" strokeWidth="6" />
        <path d="M0,0 L60,30 M60,0 L0,30" clipPath={`url(#t${id})`} stroke="#C8102E" strokeWidth="4" />
        <path d="M30,0 v30 M0,15 h60" stroke="#FFFFFF" strokeWidth="10" />
        <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
      </g>
    </svg>
  )
}
