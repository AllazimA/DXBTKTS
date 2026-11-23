'use client'

import { SceneImage } from '@/components/ui/scene-image'
import { aiImage, type SceneImage as SceneImageData } from '@/lib/images'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { BrandIcon, MonoLabel } from '@/components/brand'
import { SectionHeading } from '@/components/brand/section-heading'
import { Reveal } from '@/components/brand/reveal'

const visuals: { image: SceneImageData; icon: 'evening' | 'desert' }[] = [
  { image: aiImage('story-evening', 'fineDining', 'Dinner table above the Dubai skyline at night'), icon: 'evening' },
  { image: aiImage('story-desert', 'desert', 'Private dinner table in the desert at dusk'), icon: 'desert' },
]

type Story = { eyebrow: string; title: string; copy: string }

function StoryRow({ story, visual, flip, cta, index }: { story: Story; visual: (typeof visuals)[number]; flip: boolean; cta: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])

  return (
    <div ref={ref} className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
      <Reveal className={`lg:col-span-7 ${flip ? 'lg:order-2' : ''}`}>
        <div className="relative aspect-[16/11] overflow-hidden dxb-cut dxb-cut-lg bg-dxb-navy">
          <motion.div style={{ y }} className="absolute -inset-y-[8%] inset-x-0">
            <SceneImage image={visual.image} sizes="(max-width: 1024px) 100vw, 58vw" className="object-cover" />
          </motion.div>
        </div>
      </Reveal>
      <Reveal delay={0.1} className={`lg:col-span-5 ${flip ? 'lg:order-1' : ''}`}>
        <span className="inline-flex items-center gap-2 text-dxb-cobalt">
          <BrandIcon name={visual.icon} className="w-5 h-5" />
          <MonoLabel parts={[String(index + 1).padStart(2, '0'), story.eyebrow]} />
        </span>
        <h3 className="font-display text-3xl md:text-[44px] text-dxb-navy mt-4 mb-5">{story.title}</h3>
        <p className="text-dxb-ink/80 text-lg leading-relaxed mb-8">{story.copy}</p>
        <Link href="/request" className="group inline-flex items-center gap-2 text-[15px] font-bold text-dxb-cobalt underline-offset-4 hover:underline">
          {cta}
          <BrandIcon name="arrow" className="w-4 h-4 transition-transform group-hover:translate-x-1 rtl:rotate-180" />
        </Link>
      </Reveal>
    </div>
  )
}

export function Experiences() {
  const t = useTranslations('experiences')
  const stories = t.raw('stories') as Story[]
  const accent = (chunks: React.ReactNode) => <span className="text-dxb-cobalt">{chunks}</span>

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-6">
        <SectionHeading index="04" label={t('eyebrow')} title={t.rich('title', { accent })} className="mb-14" />
        <div className="space-y-20 md:space-y-28">
          {stories.map((s, i) => (
            <StoryRow key={s.title} story={s} visual={visuals[i]} flip={i % 2 === 1} cta={t('cta')} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
