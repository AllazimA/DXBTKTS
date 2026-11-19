'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { whatsappLink } from '@/lib/site'

type Option = 'booking' | 'tailored' | 'membership' | 'general' | 'other'

function WhatsAppGlyph({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.87 9.87 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91A9.86 9.86 0 0 0 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24a8.2 8.2 0 0 1 8.23 8.25c0 4.54-3.7 8.23-8.24 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.16.04-.31-.02-.43-.06-.13-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.24 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.16-.48-.29Z" />
    </svg>
  )
}

/** Name of what the visitor is looking at, from the page title ("Name | DXB TKTS"). */
function pageContext() {
  if (typeof document === 'undefined') return ''
  const first = document.title.split('|')[0].trim()
  return first.startsWith('DXB TKTS') ? '' : first.replace(/\s+—\s+.*$/, '')
}

export function WhatsAppWidget() {
  const t = useTranslations('whatsapp')
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [context, setContext] = useState('')

  useEffect(() => {
    setOpen(false)
    // Wait a tick so the new page title is in place after navigation.
    const id = window.setTimeout(() => setContext(pageContext()), 300)
    return () => window.clearTimeout(id)
  }, [pathname])

  const path = pathname.replace(/^\/(ar|fr|en)(?=\/|$)/, '') || '/'
  const isProduct = /^\/experiences\/[^/]+\/[^/]+/.test(path)
  const order: Option[] = isProduct
    ? ['booking', 'tailored', 'general', 'membership', 'other']
    : path.startsWith('/membership')
      ? ['membership', 'general', 'tailored', 'other']
      : path.startsWith('/services') || path.startsWith('/request')
        ? ['tailored', 'general', 'membership', 'other']
        : path.startsWith('/tickets') || path.startsWith('/blog')
          ? ['general', 'tailored', 'booking', 'other']
          : ['general', 'booking', 'tailored', 'membership', 'other']

  const message = (o: Option) => {
    const base = t(`messages.${o}`)
    if (!context) return base
    if (o === 'booking' && isProduct) return `${base} — ${context}`
    if (o === 'general' || o === 'other' || o === 'tailored') return `${base} (${t('viewing')}: ${context})`
    return base
  }

  return (
    <div className="fixed bottom-5 end-5 z-[55] print:hidden" dir="auto">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            role="dialog"
            aria-label={t('title')}
            className="absolute bottom-16 end-0 w-[min(88vw,340px)] bg-dxb-ivory text-dxb-ink shadow-[0_30px_60px_-20px_rgba(14,27,44,0.45)] border border-dxb-band"
          >
            <div className="flex items-start justify-between gap-3 bg-dxb-ink text-white px-5 py-4">
              <div>
                <p className="font-cormorant text-2xl leading-tight">{t('title')}</p>
                <p className="text-xs text-white/60 mt-1">{t('subtitle')}</p>
              </div>
              <button type="button" onClick={() => setOpen(false)} aria-label={t('close')} className="p-1 text-white/70 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <ul className="p-2">
              {order.map(o => (
                <li key={o}>
                  <a
                    href={whatsappLink(message(o))}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setOpen(false)}
                    className="group flex items-center justify-between gap-3 px-3 py-3 hover:bg-white transition-colors"
                  >
                    <span>
                      <span className="block text-sm font-semibold">{t(`labels.${o}`)}</span>
                      {o === 'booking' && isProduct && context ? (
                        <span className="block text-xs text-dxb-slate mt-0.5 line-clamp-1">{context}</span>
                      ) : null}
                    </span>
                    <span className="text-dxb-gold transition-transform group-hover:translate-x-0.5 rtl:rotate-180">→</span>
                  </a>
                </li>
              ))}
            </ul>
            <p className="px-5 pb-4 text-[11px] text-dxb-slate">{t('note')}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        aria-expanded={open}
        aria-label={t('button')}
        className="group relative grid h-14 w-14 place-items-center rounded-full bg-dxb-ink text-[#E6CB8E] ring-1 ring-[#C9A45C]/50 shadow-[0_12px_30px_-8px_rgba(14,27,44,0.6)] transition-transform hover:scale-105"
      >
        {open ? <X className="w-6 h-6" /> : <WhatsAppGlyph />}
        <span className="pointer-events-none absolute -top-1 -end-1 h-3 w-3 rounded-full bg-[#25D366] ring-2 ring-dxb-ink" aria-hidden="true" />
      </button>
    </div>
  )
}
