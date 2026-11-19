'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { X } from 'lucide-react'
import { site } from '@/lib/site'

const KEY = 'dxbtkts.comingSoon.dismissed'

/**
 * Pre-launch announcement. Turn off with `site.comingSoon.enabled = false`
 * in lib/site.ts. Visitors can close it for the rest of their visit.
 */
export function ComingSoonBanner() {
  const t = useTranslations('comingSoon')
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    try {
      if (window.sessionStorage.getItem(KEY) === '1') setHidden(true)
    } catch {
      // storage unavailable: show the banner
    }
  }, [])

  if (!site.comingSoon.enabled || hidden) return null

  return (
    <div className="relative bg-[linear-gradient(90deg,#0B1420,#14202F_50%,#0B1420)] text-white border-b border-[#C9A45C]/30">
      <div className="max-w-7xl mx-auto px-6 py-2.5 flex items-center justify-center gap-x-4 gap-y-1 flex-wrap text-center pe-12">
        <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-[#E6CB8E]">{t('label')}</span>
        <span className="font-cormorant text-lg leading-tight">{t('title')}</span>
        <span className="hidden md:inline text-xs text-white/65">{t('copy')}</span>
        <Link href="/experiences" className="text-xs font-semibold text-[#E6CB8E] underline underline-offset-4 hover:text-white">
          {t('cta')}
        </Link>
      </div>
      <button
        type="button"
        onClick={() => {
          setHidden(true)
          try {
            window.sessionStorage.setItem(KEY, '1')
          } catch {}
        }}
        aria-label={t('close')}
        className="absolute end-3 top-1/2 -translate-y-1/2 p-1.5 text-white/50 hover:text-white"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  )
}
