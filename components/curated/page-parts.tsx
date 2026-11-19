import Image from 'next/image'
import { ChapterLabel } from '@/components/editorial/chapter-label'
import { WhatsAppIcon } from '@/components/ui/whatsapp-icon'
import { whatsappLink } from '@/lib/site'
import { BackgroundFilm } from '@/components/ui/background-film'

/** Full-bleed photo opening used by the curated service pages. */
export function CuratedHero({ image, film, eyebrow, title, lede, cta, ctaHref }: { image: { src: string | null; alt: string }; film?: { mp4: string; mobile?: string; poster?: string }; eyebrow: string; title: string; lede: string; cta?: string; ctaHref?: string }) {
  return (
    <section className="relative min-h-[70vh] flex items-end bg-dxb-ink text-white overflow-hidden">
      {image.src && <Image src={image.src} alt={image.alt} fill priority sizes="100vw" className="object-cover" />}
      {film && <BackgroundFilm {...film} />}
      <div className="absolute inset-0 bg-gradient-to-t from-dxb-ink via-dxb-ink/45 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-dxb-ink via-dxb-ink/70 to-transparent rtl:bg-gradient-to-l" />
      <div className="relative w-full max-w-6xl mx-auto px-6 pt-32 pb-14 md:pb-20">
        <ChapterLabel label={eyebrow} tone="light" />
        <h1 className="mt-8 font-cormorant font-light text-[2.6rem] leading-[1.05] md:text-7xl whitespace-pre-line">{title}</h1>
        <p className="mt-7 max-w-2xl text-lg leading-relaxed text-white/80 font-light">{lede}</p>
        {cta && ctaHref && (
          <a href={ctaHref} className="mt-10 inline-block px-8 py-4 bg-dxb-clay text-white text-sm font-semibold tracking-[0.12em] uppercase hover:bg-dxb-clay-hover transition-colors">
            {cta}
          </a>
        )}
      </div>
    </section>
  )
}

/** Dark band holding a request form, with its pitch on the left. */
export function FormSection({ id, title, copy, note, whatsapp, backdrop, children }: { id: string; title: string; copy: string; note?: string; whatsapp: string; backdrop?: string | null; children: React.ReactNode }) {
  return (
    <section id={`${id}-section`} className="relative bg-dxb-ink scroll-mt-20 overflow-hidden">
      {backdrop && (
        <>
          <Image src={backdrop} alt="" fill sizes="100vw" className="object-cover opacity-45" />
          <div className="absolute inset-0 bg-gradient-to-b from-dxb-ink/70 via-dxb-ink/80 to-dxb-ink" />
        </>
      )}
      <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-28 grid grid-cols-1 lg:grid-cols-5 gap-14 items-start">
        <div className="lg:col-span-2 lg:sticky lg:top-32">
          <h2 className="font-cormorant text-4xl md:text-5xl font-light text-white leading-[1.1]">{title}</h2>
          <p className="mt-6 text-white/70 text-lg font-light leading-relaxed">{copy}</p>
          {note && <p className="mt-6 text-sm text-white/45 leading-relaxed border-s border-dxb-gold/40 ps-4">{note}</p>}
          <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="mt-10 inline-flex items-center gap-3 text-sm font-semibold tracking-[0.2em] uppercase text-dxb-gold group">
            <span className="h-px w-10 bg-dxb-gold transition-all duration-300 group-hover:w-16" />
            <WhatsAppIcon className="w-5 h-5 text-[#25D366]" />
            {whatsapp}
          </a>
        </div>
        <div className="lg:col-span-3 border border-white/10 bg-white/[0.02] p-7 md:p-11">{children}</div>
      </div>
    </section>
  )
}

/** Three tall photographs with a short line under each, between the opening and the list. */
export function MoodStrip({ items }: { items: { src: string | null; alt: string; caption: string }[] }) {
  const shown = items.filter(i => i.src)
  if (!shown.length) return null
  return (
    <section className="bg-dxb-ivory">
      <div className="max-w-6xl mx-auto px-6 pt-20 md:pt-28">
        <ul className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
          {shown.map(i => (
            <li key={i.src}>
              <figure>
                <div className="relative aspect-[4/5] overflow-hidden bg-dxb-band">
                  <Image src={i.src!} alt={i.alt} fill sizes="(min-width: 1024px) 360px, (min-width: 640px) 33vw, 100vw" className="object-cover transition-transform duration-700 hover:scale-[1.03]" />
                </div>
                <figcaption className="mt-4 font-cormorant text-xl text-dxb-ink">{i.caption}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
