'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { Locale } from '@/i18n.config'
import { journalCategories, journalCopy as c, type JournalCategory } from '@/content/journal'
import { Tear } from '@/components/brand'

export type CardData = {
  slug: string
  category: JournalCategory
  title: string
  excerpt: string
  minutes: number
  date: string
  image: { src?: string | null; alt: string }
}

export function JournalIndex({ locale, cards }: { locale: Locale; cards: CardData[] }) {
  const [active, setActive] = useState<JournalCategory | 'all'>('all')
  const counts = Object.fromEntries(journalCategories.map(k => [k.slug, cards.filter(a => a.category === k.slug).length]))
  const list = active === 'all' ? cards : cards.filter(a => a.category === active)
  const catName = (slug: JournalCategory) => journalCategories.find(k => k.slug === slug)!.name[locale]
  const chip = (on: boolean) =>
    `shrink-0 px-4 py-2 text-sm border transition-colors ${on ? 'bg-dxb-navy text-white border-dxb-ink' : 'bg-white/60 text-dxb-ink border-dxb-ink/15 hover:border-dxb-gold'}`

  return (
    <section className="bg-dxb-sand">
      <div className="max-w-6xl mx-auto px-6 py-14 md:py-20">
        <nav aria-label={c.all[locale]} className="flex gap-2 overflow-x-auto scrollbar-none pb-1">
          <button type="button" onClick={() => setActive('all')} className={chip(active === 'all')} aria-pressed={active === 'all'}>
            {c.all[locale]} <span className="opacity-50 ms-1">{cards.length}</span>
          </button>
          {journalCategories.map(k => (
            <button key={k.slug} type="button" onClick={() => setActive(k.slug)} className={chip(active === k.slug)} aria-pressed={active === k.slug}>
              {k.name[locale]} <span className="opacity-50 ms-1">{counts[k.slug]}</span>
            </button>
          ))}
        </nav>

        {list.length === 0 ? (
          <p className="mt-16 font-display font-bold text-2xl text-dxb-slate">{c.empty[locale]}</p>
        ) : (
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
            {list.map(a => (
              <article key={a.slug} className="group">
                <Link href={`/blog/${a.slug}`} className="block">
                  <div className="relative aspect-[4/3] overflow-hidden bg-white">
                    {a.image.src && (
                      <Image src={a.image.src} alt={a.image.alt} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
                    )}
                  </div>
                  <p className="mt-5 text-[11px] font-medium font-mono uppercase tracking-[0.06em] text-dxb-gold">{catName(a.category)}</p>
                  <h2 className="mt-2 font-display font-bold text-[1.7rem] leading-tight text-dxb-navy group-hover:text-dxb-gold transition-colors">{a.title}</h2>
                  <p className="mt-3 text-dxb-slate leading-relaxed line-clamp-3">{a.excerpt}</p>
                  <p className="mt-4 text-xs text-dxb-slate">
                    {a.date} <Tear /> {c.minRead[locale].replace('{n}', String(a.minutes))}
                  </p>
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
