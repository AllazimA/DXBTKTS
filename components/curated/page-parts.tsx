import Image from 'next/image'
import { WhatsAppIcon } from '@/components/ui/whatsapp-icon'
import { whatsappLink } from '@/lib/site'
import { PageHero, heroPrimary, heroSecondary } from '@/components/brand/page-hero'
import type { Family } from '@/lib/brand'
import type { Locale } from '@/i18n.config'

/** Opening used by the curated service pages (dining, nightlife, sourcing). */
export function CuratedHero({ image, film, eyebrow, title, lede, cta, ctaHref, family = 'city-life', locale }: { image: { src: string | null; alt: string }; film?: { mp4: string; mobile?: string; poster?: string }; eyebrow: string; title: string; lede: string; cta?: string; ctaHref?: string; family?: Family; locale?: Locale }) {
  return (
    <PageHero image={image} film={film} label={eyebrow} title={title} lede={lede} family={locale ? family : undefined} locale={locale}>
      {cta && ctaHref && (
        <a href={ctaHref} className={heroPrimary}>
          {cta}
        </a>
      )}
      <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className={heroSecondary}>
        <WhatsAppIcon className="w-5 h-5 text-[#25D366]" />
        WhatsApp
      </a>
    </PageHero>
  )
}

/** Dark band holding a request form, with its pitch on the left. */
export function FormSection({ id, title, copy, note, whatsapp, backdrop, children }: { id: string; title: string; copy: string; note?: string; whatsapp: string; backdrop?: string | null; children: React.ReactNode }) {
  return (
    <section id={`${id}-section`} className="relative bg-dxb-navy scroll-mt-20 overflow-hidden">
      {backdrop && (
        <>
          <Image src={backdrop} alt="" fill sizes="100vw" className="object-cover opacity-45" />
          <div className="absolute inset-0 bg-gradient-to-b from-dxb-ink/70 via-dxb-ink/80 to-dxb-ink" />
        </>
      )}
      <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-28 grid grid-cols-1 lg:grid-cols-5 gap-14 items-start">
        <div className="lg:col-span-2 lg:sticky lg:top-32">
          <h2 className="font-display text-4xl md:text-5xl text-white leading-[1.1]">{title}</h2>
          <p className="mt-6 text-white/70 text-lg font-light leading-relaxed">{copy}</p>
          {note && <p className="mt-6 text-sm text-white/60 leading-relaxed border-s-4 border-dxb-orange ps-4">{note}</p>}
          <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className={`mt-10 ${heroSecondary}`}>
            <WhatsAppIcon className="w-5 h-5 text-[#25D366]" />
            {whatsapp}
          </a>
        </div>
        <div className="lg:col-span-3 relative bg-dxb-ink/60 backdrop-blur-sm dxb-cut dxb-cut-lg p-7 md:p-11">
          <span aria-hidden="true" className="absolute top-0 inset-x-0 h-1.5 bg-dxb-orange" />
          {children}
        </div>
      </div>
    </section>
  )
}

/** Three tall photographs with a short line under each, between the opening and the list. */
export function MoodStrip({ items }: { items: { src: string | null; alt: string; caption: string }[] }) {
  const shown = items.filter(i => i.src)
  if (!shown.length) return null
  return (
    <section className="bg-dxb-sand">
      <div className="max-w-6xl mx-auto px-6 pt-20 md:pt-28">
        <ul className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
          {shown.map(i => (
            <li key={i.src}>
              <figure>
                <div className="relative aspect-[4/5] overflow-hidden bg-white">
                  <Image src={i.src!} alt={i.alt} fill sizes="(min-width: 1024px) 360px, (min-width: 640px) 33vw, 100vw" className="object-cover transition-transform duration-700 hover:scale-[1.03]" />
                </div>
                <figcaption className="mt-4 font-display font-bold text-xl text-dxb-navy">{i.caption}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
