import Link from 'next/link'
import type { Locale } from '@/i18n.config'
import type { Package } from '@/data/packages'
import { packagesCopy as c } from '@/content/packages'
import { aiImage } from '@/lib/images'
import { formatAED } from '@/lib/catalogue/money'
import { packageTotal } from '@/lib/catalogue/packages'
import { SceneImage } from '@/components/ui/scene-image'

export function PackageCard({ pkg, locale }: { pkg: Package; locale: Locale }) {
  const img = aiImage(pkg.image.slot, pkg.image.fallback, pkg.name[locale])
  return (
    <Link href={`/packages/${pkg.slug}`} className="group flex flex-col bg-white border border-dxb-band hover:border-dxb-gold/60 transition-colors">
      <div className="relative aspect-[4/3] overflow-hidden bg-dxb-navy">
        <SceneImage image={img} sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
        <span className="absolute top-3 start-3 bg-white/95 px-2.5 py-1 text-[10px] font-medium font-mono uppercase tracking-[0.06em] text-dxb-ink">{c.themes[pkg.theme][locale]}</span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display font-bold text-2xl leading-tight text-dxb-navy group-hover:text-dxb-gold transition-colors">{pkg.name[locale]}</h3>
        <p className="mt-2 text-sm text-dxb-slate leading-relaxed flex-1">{pkg.tagline[locale]}</p>
        <div className="mt-5 flex items-end justify-between gap-3 border-t border-dxb-band pt-4">
          <div>
            <span className="block text-[11px] font-mono uppercase tracking-[0.06em] text-dxb-slate">{c.from[locale]}</span>
            <span className="text-lg font-semibold text-dxb-ink">{formatAED(packageTotal(pkg), locale)}</span>
            <span className="block text-xs text-dxb-slate">{pkg.party[locale]}</span>
          </div>
          <span className="text-[11px] text-end text-dxb-slate">
            {pkg.duration[locale]}
            <br />
            {pkg.booking === 'instant' ? c.instant[locale] : c.concierge[locale]}
          </span>
        </div>
      </div>
    </Link>
  )
}
