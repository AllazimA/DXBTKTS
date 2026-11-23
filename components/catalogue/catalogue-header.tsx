import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import type { Locale } from '@/i18n.config'
import { categories } from '@/data/catalogue'
import { BrandIcon } from '@/components/brand'
import { FAMILY, familyOf } from '@/lib/brand'

/** Category chips shared by the hub and category pages. */
export function CategoryChips({ active }: { active?: string }) {
  const locale = useLocale() as Locale
  const t = useTranslations('catalogue')
  const chip = (isActive: boolean) =>
    `shrink-0 inline-flex items-center gap-2 h-10 px-4 text-[14px] font-semibold transition-colors ${
      isActive ? 'bg-dxb-navy text-white' : 'bg-white text-dxb-navy hover:bg-dxb-navy/5'
    }`
  return (
    <nav aria-label="Categories" className="-mx-5 px-5 sm:-mx-6 sm:px-6 flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none]">
      <Link href="/experiences" className={chip(!active)}>
        {t('all')}
      </Link>
      {categories.map(c => {
        const fam = FAMILY[familyOf(c.slug)]
        const on = active === c.slug
        return (
          <Link key={c.slug} href={`/experiences/${c.slug}`} aria-current={on ? 'page' : undefined} className={on ? chip(false).replace('bg-white text-dxb-navy hover:bg-dxb-navy/5', fam.chip) : chip(false)}>
            <span className={`h-2.5 w-2.5 ${on ? 'bg-current' : fam.bg}`} aria-hidden="true" />
            {c.name[locale]}
          </Link>
        )
      })}
    </nav>
  )
}

export function IndicativeNotice() {
  const t = useTranslations('catalogue')
  return (
    <p className="inline-flex items-start gap-2 text-[13px] text-dxb-muted max-w-2xl">
      <BrandIcon name="info" className="w-4 h-4 mt-0.5 text-dxb-cobalt" />
      {t('indicativeNote')}
    </p>
  )
}
