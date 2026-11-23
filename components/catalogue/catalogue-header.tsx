import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import type { Locale } from '@/i18n.config'
import { categories } from '@/data/catalogue'

/** Category chips shared by the hub and category pages. */
export function CategoryChips({ active }: { active?: string }) {
  const locale = useLocale() as Locale
  const t = useTranslations('catalogue')
  const chip = (isActive: boolean) =>
    `shrink-0 px-4 py-2 text-sm border transition-colors ${
      isActive ? 'bg-dxb-navy text-white border-dxb-ink' : 'bg-white text-dxb-ink border-dxb-band hover:border-dxb-gold'
    }`
  return (
    <nav aria-label="Categories" className="-mx-6 px-6 flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none]">
      <Link href="/experiences" className={chip(!active)}>
        {t('all')}
      </Link>
      {categories.map(c => (
        <Link key={c.slug} href={`/experiences/${c.slug}`} className={chip(active === c.slug)}>
          {c.name[locale]}
        </Link>
      ))}
    </nav>
  )
}

export function IndicativeNotice() {
  const t = useTranslations('catalogue')
  return (
    <p className="text-xs text-dxb-slate border-s-2 border-dxb-gold ps-3 py-1 max-w-2xl">{t('indicativeNote')}</p>
  )
}
