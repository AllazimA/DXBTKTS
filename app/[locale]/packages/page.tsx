import type { Metadata } from 'next'
import Image from 'next/image'
import type { Locale } from '@/i18n.config'
import { pageMetadata } from '@/lib/metadata'
import { aiImage } from '@/lib/images'
import { packages, type Package } from '@/data/packages'
import { packagesCopy as c } from '@/content/packages'
import { ChapterLabel } from '@/components/editorial/chapter-label'
import { PackageCard } from '@/components/packages/package-card'
import { IndicativeNotice } from '@/components/catalogue/catalogue-header'

const HERO = aiImage('gallery-icons', 'dubaiSkyline', 'Dubai skyline in the evening light')
const THEMES: Package['theme'][] = ['first-visit', 'downtown', 'palm', 'family', 'desert', 'romance']

export async function generateMetadata({ params }: { params: { locale: Locale } }): Promise<Metadata> {
  return pageMetadata(params.locale, 'packages', '/packages')
}

export default function PackagesPage({ params: { locale } }: { params: { locale: Locale } }) {
  return (
    <>
      <section className="relative min-h-[56vh] flex items-end bg-dxb-ink text-white overflow-hidden">
        {HERO.src && <Image src={HERO.src} alt={HERO.alt} fill priority sizes="100vw" className="object-cover" />}
        <div className="absolute inset-0 bg-gradient-to-t from-dxb-ink via-dxb-ink/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-dxb-ink via-dxb-ink/70 to-transparent rtl:bg-gradient-to-l" />
        <div className="relative w-full max-w-6xl mx-auto px-6 pt-32 pb-14 md:pb-20">
          <ChapterLabel label={c.eyebrow[locale]} tone="light" />
          <h1 className="mt-8 font-cormorant font-light text-[2.6rem] leading-[1.05] md:text-7xl whitespace-pre-line">{c.title[locale]}</h1>
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-white/80 font-light">{c.lede[locale]}</p>
        </div>
      </section>

      <section className="bg-dxb-ivory">
        <div className="max-w-7xl mx-auto px-6 py-14 md:py-20">
          <IndicativeNotice />
          {THEMES.map(theme => {
            const list = packages.filter(p => p.theme === theme)
            if (!list.length) return null
            return (
              <div key={theme} className="mt-12 first:mt-6">
                <h2 className="font-cormorant text-3xl md:text-4xl font-light text-dxb-ink border-b border-dxb-ink/15 pb-3">{c.themes[theme][locale]}</h2>
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {list.map(p => (
                    <PackageCard key={p.slug} pkg={p} locale={locale} />
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </>
  )
}
