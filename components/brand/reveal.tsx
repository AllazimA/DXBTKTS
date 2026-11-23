'use client'

import { motion } from 'framer-motion'
import React from 'react'

/** Fade-and-rise on first view. Respects reduced motion via globals.css. */
export function Reveal({ children, delay = 0, className, as = 'div' }: { children: React.ReactNode; delay?: number; className?: string; as?: 'div' | 'li' }) {
  const M = as === 'li' ? motion.li : motion.div
  return (
    <M
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, margin: '-60px' }}
      className={className}
    >
      {children}
    </M>
  )
}
