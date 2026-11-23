'use client'

import React, { useEffect, useRef, useState } from 'react'

/**
 * A photograph frame that opens like a curtain the first time it scrolls into
 * view: the frame wipes upward while the picture inside settles from a slight
 * zoom. Purely visual; content is in the page from the start.
 */
export function Unveil({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShown(true)
      return
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true)
          io.disconnect()
        }
      },
      { rootMargin: '0px 0px -12% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={ref} className={`dxb-unveil ${shown ? 'is-shown' : ''} ${className}`} style={{ ['--unveil-delay' as string]: `${delay}ms` }}>
      {children}
    </div>
  )
}
