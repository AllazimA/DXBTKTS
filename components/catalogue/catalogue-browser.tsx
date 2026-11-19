'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { Locale } from '@/i18n.config'
import type { Product } from '@/lib/catalogue/types'
import { categories, products as allProducts } from '@/data/catalogue'
import { ProductCard } from '@/components/catalogue/product-card'
import { filterCopy as c } from '@/content/addons'

type Filter = 'all' | 'families' | 'couples' | 'friends' | 'vip' | 'instant'
const FILTERS: Filter[] = ['all', 'families', 'couples', 'friends', 'vip', 'instant']

const match = (p: Product, f: Filter) => {
  if (f === 'all') return true
  if (f === 'instant') return p.confirmation === 'instant'
  if (f === 'friends') return !!p.suits?.some(s => s === 'friends' || s === 'groups')
  return !!p.suits?.includes(f)
}

/**
 * Audience filters across the catalogue (strategy report, section 7).
 * `category` set → one category's products; otherwise the whole catalogue,
 * grouped by category until a filter is chosen.
 */
export function CatalogueBrowser({ locale, category }: { locale: Locale; category?: string }) {
  const [filter, setFilter] = useState<Filter>('all')
  const scope = category ? allProducts.filter(p => p.category === category) : allProducts
  const counts = Object.fromEntries(FILTERS.map(f => [f, scope.filter(p => match(p, f)).length])) as Record<Filter, number>
  const list = scope.filter(p => match(p, filter))
  const grouped = !category && filter === 'all'

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2" role="group" aria-label={c.label[locale]}>
        <span className="me-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-dxb-slate">{c.label[locale]}</span>
        {FILTERS.filter(f => f === 'all' || counts[f] > 0).map(f => (
          <button
            key={f}
            type="button"
            aria-pressed={filter === f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 text-sm border transition-colors ${filter === f ? 'bg-dxb-ink text-white border-dxb-ink' : 'bg-white text-dxb-ink border-dxb-ink/15 hover:border-dxb-gold'}`}
          >
            {c[f][locale]} <span className="opacity-50 ms-1">{counts[f]}</span>
          </button>
        ))}
      </div>

      {grouped ? (
        <div className="mt-12 space-y-16">
          {categories.map(cat => {
            const items = allProducts.filter(p => p.category === cat.slug)
            if (!items.length) return null
            return (
              <div key={cat.slug}>
                <div className="flex items-end justify-between gap-4 mb-6">
                  <div>
                    <h2 className="font-cormorant text-3xl md:text-4xl text-dxb-ink">{cat.name[locale]}</h2>
                    <p className="text-dxb-slate mt-1 max-w-xl">{cat.intro[locale]}</p>
                  </div>
                  <Link href={`/experiences/${cat.slug}`} className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-dxb-gold shrink-0">
                    {c.explore[locale]} <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                  </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {items.map(p => (
                    <ProductCard key={p.slug} product={p} />
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="mt-8">
          <p className="text-sm text-dxb-slate" aria-live="polite">{c.results[locale].replace('{n}', String(list.length))}</p>
          {list.length ? (
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {list.map(p => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          ) : (
            <p className="mt-6 text-dxb-slate">{c.none[locale]}</p>
          )}
        </div>
      )}
    </div>
  )
}
