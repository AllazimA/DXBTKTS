'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { BrandIcon } from '@/components/brand'
import { SectionHeading } from '@/components/brand/section-heading'
import { Reveal } from '@/components/brand/reveal'

const doors = [
  { href: '/experiences', img: '/images/ai/product-superyacht-charter.webp', alt: 'A superyacht off the Dubai coast' },
  { href: '/services', img: '/images/ai/page-services.webp', alt: 'A private concierge at work in Dubai' },
  { href: '/membership', img: '/images/ai/page-membership.webp', alt: 'A members’ evening above the city' },
] as const

/**
 * Three ways in — three tall photographic doors on the ink ground. The
 * photograph carries each door; the copy rises on hover (always shown on touch).
 */
export function Clientele() {
  const t = useTranslations('clientele')
  const tiers = t.raw('tiers') as { title: string; desc: string; cta: string }[]
  const accent = (chunks: React.ReactNode) => <span className="text-dxb-orange">{chunks}</span>

  return (
    <section className="py-20 md:py-28 bg-dxb-ink text-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-6">
        <SectionHeading index="07" label={t('eyebrow')} title={t.rich('title', { accent })} tone="dark" className="mb-12" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {tiers.map((tier, i) => {
            const door = doors[i]
            return (
              <Reveal key={tier.title} delay={i * 0.1}>
                <Link
                  href={door.href}
                  className="group relative block h-[440px] md:h-[600px] overflow-hidden dxb-cut bg-dxb-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-dxb-orange"
                >
                  <Image
                    src={door.img}
                    alt={door.alt}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition-transform duration-[1600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dxb-ink via-dxb-ink/45 to-dxb-ink/5 transition-opacity duration-700 group-hover:opacity-95" />

                  <span className="absolute top-6 start-6 dxb-label text-[11px] text-white/75" dir="ltr">
                    {String(i + 1).padStart(2, '0')} / 03
                  </span>

                  <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                    <h3 className="font-display text-[40px] md:text-[46px] leading-[0.95] tracking-[-0.035em]">{tier.title}</h3>
                    <div className="grid transition-[grid-template-rows] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] [grid-template-rows:1fr] md:[grid-template-rows:0fr] md:group-hover:[grid-template-rows:1fr] md:group-focus-visible:[grid-template-rows:1fr]">
                      <p className="overflow-hidden text-white/75 leading-relaxed max-w-[34ch]">
                        <span className="block pt-4">{tier.desc}</span>
                      </p>
                    </div>
                    <span className="mt-6 flex items-center justify-between border-t border-white/20 pt-4">
                      <span className="text-[15px] font-bold">{tier.cta}</span>
                      <span className="grid place-items-center w-10 h-10 bg-dxb-orange text-dxb-ink transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1">
                        <BrandIcon name="arrow" className="w-4 h-4 rtl:rotate-180" />
                      </span>
                    </span>
                  </div>
                </Link>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
