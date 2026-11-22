'use client'

import { useEffect, useState } from 'react'

/**
 * Muted, looping background film for page heroes. Plays only when motion is
 * allowed and the connection is not slow or in data-saver mode; otherwise the
 * page keeps its still image underneath.
 */
export function BackgroundFilm({ mp4, mobile, poster, className = '' }: { mp4: string; mobile?: string; poster?: string; className?: string }) {
  const [enabled, setEnabled] = useState(false)
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection
    const slow = conn?.saveData || (conn?.effectiveType && /2g|3g/.test(conn.effectiveType))
    setEnabled(!reduce && !slow)
  }, [])
  if (!enabled) return null
  return (
    <video className={`absolute inset-0 h-full w-full object-cover ${className}`} autoPlay muted loop playsInline preload="none" poster={poster} aria-hidden="true">
      {mobile && <source src={mobile} media="(max-width: 767px)" type="video/mp4" />}
      <source src={mp4} type="video/mp4" />
    </video>
  )
}
