'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { whatsappLink } from '@/lib/site'
import { WhatsAppIcon } from '@/components/ui/whatsapp-icon'

type Option = 'booking' | 'tailored' | 'membership' | 'general' | 'other'

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
                <p className="flex items-center gap-2 font-cormorant text-2xl leading-tight"><WhatsAppIcon className="w-5 h-5 text-[#25D366]" />{t('title')}</p>
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
        className="group relative grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_10px_28px_-8px_rgba(0,0,0,0.45)] ring-4 ring-white/70 transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#128C7E]"
      >
        {open ? <X className="w-6 h-6" /> : <WhatsAppIcon className="w-7 h-7" />}
      </button>
    </div>
  )
}
