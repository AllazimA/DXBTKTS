'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { Locale } from '@/i18n.config'
import { membership as m } from '@/content/membership'
import { MembershipCard, type CardFinish } from '@/components/membership/membership-card'
import { MembershipForm } from '@/components/forms/membership-form'

const OPTIONS: { id: CardFinish; name: string; arabicName: string; label: string }[] = [
  ...m.tiers.map(t => ({ id: t.id, name: t.name.en, arabicName: t.arabicName, label: m.cardLabel.en })),
  { id: 'majlis', name: 'Majlis', arabicName: m.majlis.arabicName, label: 'Account' },
]

/**
 * Apply section: the card on the left follows the tier chosen in the form.
 * Tier buttons elsewhere on the page link to #apply-<tier> to preselect it.
 */
export function MembershipApply({ locale, intro }: { locale: Locale; intro: React.ReactNode }) {
  const [tier, setTier] = useState<CardFinish>('pearl')
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fromHash = () => {
      const id = window.location.hash.replace('#apply-', '')
      if (window.location.hash.startsWith('#apply-') && OPTIONS.some(o => o.id === id)) {
        setTier(id as CardFinish)
        ref.current?.closest('section')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
    fromHash()
    window.addEventListener('hashchange', fromHash)
    return () => window.removeEventListener('hashchange', fromHash)
  }, [])

  const card = OPTIONS.find(o => o.id === tier)!

  return (
    <div ref={ref} className="grid grid-cols-1 lg:grid-cols-12 gap-12">
      <div className="lg:col-span-5">
        {intro}
        <div className="mt-10 max-w-[360px] [perspective:1200px]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={card.id}
              initial={{ opacity: 0, rotateY: -35, y: 12 }}
              animate={{ opacity: 1, rotateY: 0, y: 0 }}
              exit={{ opacity: 0, rotateY: 35, y: -8 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <MembershipCard finish={card.id} name={card.name} arabicName={card.arabicName} label={card.label} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <div className="lg:col-span-7">
        <MembershipForm locale={locale} tier={tier} onTierChange={setTier} />
      </div>
    </div>
  )
}
