import Image from 'next/image'
import type { SceneArt, SceneImage as SceneImageData } from '@/lib/images'

type Props = {
  image: SceneImageData
  sizes: string
  className?: string
  priority?: boolean
}

/**
 * Renders a photo, or — while no licensed photo exists for the scene — a
 * drawn illustration that fills the same box. Never falls back to an
 * unrelated stock image.
 */
export function SceneImage({ image, sizes, className = 'object-cover', priority }: Props) {
  if (image.src) {
    return (
      <Image src={image.src} alt={image.alt} fill sizes={sizes} priority={priority} className={className} />
    )
  }
  return <SceneArtwork art={image.art ?? 'dunes'} label={image.alt} />
}

function SceneArtwork({ art, label }: { art: SceneArt; label: string }) {
  if (art === 'sea') {
    return (
      <svg
        role="img"
        aria-label={label}
        viewBox="0 0 400 300"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
      >
        <defs>
          <linearGradient id="sea-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#00354E" />
            <stop offset="0.55" stopColor="#2F3DF0" />
            <stop offset="1" stopColor="#FAA61C" />
          </linearGradient>
          <linearGradient id="sea-water" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#00354E" />
            <stop offset="1" stopColor="#0A0E2A" />
          </linearGradient>
        </defs>
        <rect width="400" height="300" fill="url(#sea-sky)" />
        <circle cx="290" cy="168" r="26" fill="#FAA61C" opacity="0.85" />
        {/* skyline silhouette */}
        <path
          d="M0 178h40v-14h12v14h18v-30h10v30h24v-46h6v-20h4v20h6v46h22v-24h14v24h30v-10h16v10h40v-18h12v18h146v12H0z"
          fill="#0A0E2A"
          opacity="0.55"
        />
        <rect y="182" width="400" height="118" fill="url(#sea-water)" />
        <path d="M232 190h116" stroke="#FAA61C" strokeWidth="2" opacity="0.5" />
        <path d="M250 200h80M262 210h56" stroke="#FAA61C" strokeWidth="1.5" opacity="0.3" />
        {/* yacht */}
        <path d="M96 214h112l-14 16H112z" fill="#FFFFFF" opacity="0.92" />
        <path d="M118 214v-12h56l10 12z" fill="#FFFFFF" opacity="0.8" />
        <path d="M84 232c40 6 104 6 140 0" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.35" fill="none" />
      </svg>
    )
  }
  return (
    <svg
      role="img"
      aria-label={label}
      viewBox="0 0 400 300"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
    >
      <defs>
        <linearGradient id="dune-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FAA61C" />
          <stop offset="1" stopColor="#F2EEE6" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill="url(#dune-sky)" />
      <circle cx="300" cy="96" r="34" fill="#F2EEE6" opacity="0.9" />
      <path d="M0 170c70-40 140-44 210-16s130 26 190-8v154H0z" fill="#FAA61C" />
      <path d="M0 214c90-46 170-40 240-6s110 22 160 0v92H0z" fill="#FAA61C" />
      <path d="M0 258c80-30 160-26 230 0s120 18 170 4v38H0z" fill="#00354E" />
      <path d="M210 154c40 16 90 22 130 6" stroke="#F2EEE6" strokeWidth="1.5" opacity="0.4" fill="none" />
    </svg>
  )
}
