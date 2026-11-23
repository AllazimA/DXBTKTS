'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { Locale } from '@/i18n.config'
import type { Product } from '@/lib/catalogue/types'
import { categories, products as allProducts } from '@/data/catalogue'
import { ProductCard } from '@/components/catalogue/product-card'
import { filterCopy as c } from '@/content/addons'
import { BrandIcon } from '@/components/brand'
import { CATEGORY_ICON, FAMILY, familyOf } from '@/lib/brand'

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
        <span className="me-2 dxb-label text-[11px] text-dxb-muted">{c.label[locale]}</span>
        {FILTERS.filter(f => f === 'all' || counts[f] > 0).map(f => (
          <button
            key={f}
            type="button"
            aria-pressed={filter === f}
            onClick={() => setFilter(f)}
            className={`h-10 px-4 text-[14px] font-semibold transition-colors ${filter === f ? 'bg-dxb-navy text-white' : 'bg-white text-dxb-navy hover:bg-dxb-navy/5'}`}
          >
            {c[f][locale]} <span className="dxb-data text-[12px] opacity-60 ms-1">{counts[f]}</span>
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
                <div className="border-t-2 border-dxb-navy pt-4 flex items-end justify-between gap-4 mb-7">
                  <div>
                    <span className={`inline-flex items-center gap-1.5 h-7 px-2.5 dxb-label text-[10.5px] font-semibold ${FAMILY[familyOf(cat.slug)].chip}`}>
                      <BrandIcon name={CATEGORY_ICON[cat.slug] ?? 'ticket'} className="w-3.5 h-3.5" />
                      {FAMILY[familyOf(cat.slug)].label[locale]}
                    </span>
                    <h2 className="mt-3 font-display text-3xl md:text-[40px] text-dxb-navy">{cat.name[locale]}</h2>
                    <p className="text-dxb-muted mt-2 max-w-xl">{cat.intro[locale]}</p>
                  </div>
                  <Link href={`/experiences/${cat.slug}`} className="group hidden sm:inline-flex items-center gap-2 text-[15px] font-bold text-dxb-cobalt shrink-0 hover:underline underline-offset-4">
                    {c.explore[locale]} <BrandIcon name="arrow" className="w-4 h-4 rtl:rotate-180" />
                  </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
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
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
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
