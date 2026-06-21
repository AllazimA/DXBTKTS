'use client'

import { motion } from 'framer-motion'
import { Lightbulb, Lock, Globe } from 'lucide-react'

const features = [
  {
    icon: Lightbulb,
    title: 'Anticipate, Don\'t React',
    description: 'We study your preferences, your patterns, your world. Before you need something, we\'re ready.',
  },
  {
    icon: Lock,
    title: 'Absolute Confidentiality',
    description: 'Your privacy is sacred. Every conversation, every transaction, every detail stays between us and you.',
  },
  {
    icon: Globe,
    title: '24/7 Global Access',
    description: 'Impossible request at 3 AM? We\'re here. We find a way. Your clock drives us, not ours.',
  },
]

export function WhatWeDo() {
  return (
    <section className="py-20 bg-dxb-ivory">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {features.map((feature, i) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <motion.div
                  className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-dxb-gold/10 mb-6"
                  whileHover={{ scale: 1.05 }}
                >
                  <Icon className="w-8 h-8 text-dxb-gold" />
                </motion.div>
                <h3 className="font-cormorant text-2xl font-semibold text-dxb-ink mb-3">
                  {feature.title}
                </h3>
                <p className="text-dxb-slate leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
