'use client'

import { useEffect, useRef, useState } from 'react'

export type Film = { mp4: string; mobile?: string; poster?: string }

/**
 * Films play when motion is allowed and data saving is off.
 * null until the browser has been asked (i.e. on the server and before hydration).
 */
export function useFilmsAllowed() {
  const [ok, setOk] = useState<boolean | null>(null)
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection
    const slow = conn?.saveData || (conn?.effectiveType && /(^|-)2g|3g/.test(conn.effectiveType))
    setOk(!reduce && !slow)
  }, [])
  return ok
}

/**
 * A muted, looping film that reliably autoplays in Safari and on iPhone.
 *
 * React sets `muted` only as a DOM property, never as the attribute, and
 * Safari refuses to autoplay a video without the attribute — so the films
 * silently stayed on their poster there. Here the attributes are set by hand,
 * play() is called explicitly (and again when the tab becomes visible), and
 * the film fades in over its poster once real frames are moving.
 */
export function FilmVideo({ film, playing = true, eager = false, className = '' }: { film: Film; playing?: boolean; eager?: boolean; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null)
  // An eager film (a page opening) is in the server HTML with autoplay, so the
  // browser starts it before any JavaScript runs; it shows at once, its poster
  // being the same frame as the still underneath. Other films fade in once playing.
  const [live, setLive] = useState(eager)
  // Films off screen stay paused, so the six homepage scenes don't all play at once.
  const [inView, setInView] = useState(eager)
  useEffect(() => {
    const v = ref.current
    if (!v || !('IntersectionObserver' in window)) return setInView(true)
    // Decide at once for a film that is already on screen (e.g. a page opening),
    // without waiting for the observer's first callback.
    const r = v.getBoundingClientRect()
    if (r.bottom > -200 && r.top < window.innerHeight + 200) setInView(true)
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { rootMargin: '200px 0px' })
    io.observe(v)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    const v = ref.current
    if (!v) return
    v.muted = true
    v.defaultMuted = true
    v.setAttribute('muted', '')
    v.setAttribute('playsinline', '')
    v.setAttribute('webkit-playsinline', '')
    const onPlaying = () => setLive(true)
    if (!v.paused) setLive(true)
    v.addEventListener('playing', onPlaying)
    return () => v.removeEventListener('playing', onPlaying)
  }, [])

  useEffect(() => {
    const v = ref.current
    if (!v) return
    if (!playing || !inView) {
      v.pause()
      return
    }
    // Muted films may play in a background tab, so no visibility check here:
    // just keep asking until the browser agrees.
    const tryPlay = () => {
      if (v.paused) v.play().catch(() => {})
    }
    tryPlay()
    const events = ['loadedmetadata', 'loadeddata', 'canplay'] as const
    events.forEach(e => v.addEventListener(e, tryPlay))
    document.addEventListener('visibilitychange', tryPlay)
    const retry = window.setInterval(() => {
      if (!v.paused) return window.clearInterval(retry)
      tryPlay()
    }, 1200)
    return () => {
      events.forEach(e => v.removeEventListener(e, tryPlay))
      document.removeEventListener('visibilitychange', tryPlay)
      window.clearInterval(retry)
    }
  }, [playing, inView])

  return (
    <video
      ref={ref}
      className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1200ms] ease-out ${live ? 'opacity-100' : 'opacity-0'} ${className}`}
      muted
      loop
      playsInline
      autoPlay={playing && inView}
      preload={inView ? 'auto' : 'metadata'}
      poster={film.poster}
      aria-hidden="true"
    >
      {film.mobile && <source src={film.mobile} media="(max-width: 767px)" type="video/mp4" />}
      <source src={film.mp4} type="video/mp4" />
    </video>
  )
}

/**
 * Muted, looping background film for page heroes. Plays only when motion is
 * allowed and the connection is not slow or in data-saver mode; otherwise the
 * page keeps its still image underneath.
 */
export function BackgroundFilm({ mp4, mobile, poster, className = '', eager = false, playing = true }: Film & { className?: string; eager?: boolean; playing?: boolean }) {
  const allowed = useFilmsAllowed()
  // Eager films render from the server and are removed only if the browser
  // turns out to ask for reduced motion or data saving.
  if (allowed === false || (allowed === null && !eager)) return null
  return <FilmVideo film={{ mp4, mobile, poster }} className={className} eager={eager} playing={playing} />
}
