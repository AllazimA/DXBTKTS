'use client'

import { SceneImage } from '@/components/ui/scene-image'
import { aiImage, type SceneImage as SceneImageData } from '@/lib/images'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

const visuals: SceneImageData[] = [
  aiImage('story-evening', 'fineDining', 'Dinner table above the Dubai skyline at night'),
  aiImage('story-desert', 'desert', 'Private dinner table in the desert at dusk'),
]

type Story = { eyebrow: string; title: string; copy: string }

function StoryRow({
  story,
  visual,
  flip,
  cta,
}: {
  story: Story
  visual: SceneImageData
  flip: boolean
  cta: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  return (
    <div
      ref={ref}
      className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${
        flip ? 'lg:[direction:rtl]' : ''
      }`}
    >
      {/* Parallax image */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        viewport={{ once: true, margin: '-80px' }}
        className="relative aspect-[16/11] overflow-hidden [direction:ltr]"
      >
        <motion.div style={{ y }} className="absolute -inset-y-[10%] inset-x-0">
          <SceneImage image={visual} sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
        </motion.div>
        <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />
      </motion.div>

      {/* Copy */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.15 }}
        viewport={{ once: true, margin: '-80px' }}
        dir="auto"
      >
        <span className="text-xs font-semibold tracking-[0.35em] text-dxb-gold uppercase">
          {story.eyebrow}
        </span>
        <h3 className="font-cormorant text-4xl md:text-5xl font-light text-white mt-5 mb-6 leading-tight">
          {story.title}
        </h3>
        <p className="text-white/70 text-lg font-light leading-relaxed mb-8">{story.copy}</p>
        <Link
          href="/request"
          className="inline-flex items-center gap-3 text-sm font-semibold tracking-[0.2em] uppercase text-dxb-gold group"
        >
          <span className="h-px w-10 bg-dxb-gold transition-all duration-300 group-hover:w-16" />
          {cta}
        </Link>
      </motion.div>
    </div>
  )
}

export function Experiences() {
  const t = useTranslations('experiences')
  const stories = t.raw('stories') as Story[]
  const accent = (chunks: React.ReactNode) => (
    <span className="italic text-dxb-gold">{chunks}</span>
  )

  return (
    <section className="py-24 md:py-32 bg-dxb-ink relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/3 w-[40rem] h-[40rem] bg-dxb-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="text-xs font-semibold tracking-[0.35em] text-dxb-gold uppercase">
            {t('eyebrow')}
          </span>
          <h2 className="font-cormorant text-4xl md:text-5xl font-light text-white mt-6">
            {t.rich('title', { accent })}
          </h2>
        </motion.div>

        <div className="space-y-28">
          {stories.map((s, i) => (
            <StoryRow key={s.title} story={s} visual={visuals[i]} flip={i % 2 === 1} cta={t('cta')} />
          ))}
        </div>
      </div>
    </section>
  )
}
