/**
 * Central image registry for DXB TKTS.
 *
 * Every image used by the marketing sections is listed here so it can be
 * swapped in one place when partner / owned photography arrives (Roadmap
 * Stage 2). Each Unsplash photo below was opened and checked by eye to
 * confirm it shows what its alt text says.
 *
 * `null` means no suitable licensed photo is available yet: the section
 * renders a drawn scene instead of a misleading stock photo.
 */

import aiImages from './ai-images.json'

const unsplash = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?q=80&w=${w}&auto=format&fit=crop`

export type SceneArt = 'dunes' | 'sea'

export type SceneImage = {
  src: string | null
  alt: string
  /** Drawn fallback used while `src` is null */
  art?: SceneArt
}

export const images = {
  dubaiSkyline: {
    src: unsplash('1512453979798-5ea266f8880c', 2400),
    alt: 'Dubai skyline and Burj Khalifa at dusk',
  },
  burjKhalifa: {
    src: unsplash('1580674684081-7617fbf3d745'),
    alt: 'Burj Khalifa rising above Downtown Dubai',
  },
  burjAlArabAerial: {
    src: unsplash('1518684079-3c830dcef090'),
    alt: 'Burj Al Arab and the Jumeirah coastline from the air',
  },
  grandMosque: {
    src: unsplash('1512632578888-169bbbc64f33'),
    alt: 'Sheikh Zayed Grand Mosque, Abu Dhabi, reflected at sunset',
  },
  fineDining: {
    src: unsplash('1414235077428-338989a2e8c0'),
    alt: 'Plated dinner on a restaurant table',
  },
  eveningEvent: {
    src: unsplash('1470229722913-7c0e2dbbafd3'),
    alt: 'Crowd and stage lights at an evening concert',
  },
  privateVilla: {
    src: unsplash('1613490493576-7fde63acd811'),
    alt: 'Modern private villa with a pool',
  },
  arrival: {
    src: unsplash('1436491865332-7a61a109cc05'),
    alt: 'Aircraft wing above the clouds at sunset',
  },
  // Pending partner photography (Roadmap Stage 2)
  desert: { src: null, alt: 'Desert dunes at golden hour', art: 'dunes' },
  yacht: { src: null, alt: 'Private yacht on the Arabian Gulf', art: 'sea' },
} satisfies Record<string, SceneImage>

const aiFiles = new Set<string>((aiImages as { files: string[] }).files)

/** Returns /images/ai/<base>.<ext> if that AI image has been added, else null. */
function aiFile(base: string): string | null {
  for (const ext of ['webp', 'jpg', 'jpeg', 'png', 'avif']) {
    if (aiFiles.has(`${base}.${ext}`)) return `/images/ai/${base}.${ext}`
  }
  return null
}

/** Product image: AI file `product-<slug>` when present, otherwise the registry fallback. */
export function productImage(slug: string, fallback: keyof typeof images, alt: string): SceneImage {
  const src = aiFile(`product-${slug}`)
  return src ? { src, alt } : images[fallback]
}

/** Category image: AI file `category-<slug>` when present, otherwise the registry fallback. */
export function categoryImage(slug: string, fallback: keyof typeof images, alt: string): SceneImage {
  const src = aiFile(`category-${slug}`)
  return src ? { src, alt } : images[fallback]
}

/** Homepage hero still: AI `hero-desktop` when present, otherwise the skyline photo. */
export function heroImage(): SceneImage {
  const src = aiFile('hero-desktop')
  return src ? { src, alt: 'Dubai skyline at blue hour with a private yacht' } : images.dubaiSkyline
}

/** Any AI slot (e.g. 'gallery-water'), falling back to a registry image. */
export function aiImage(slot: string, fallback: keyof typeof images, alt?: string): SceneImage {
  const src = aiFile(slot)
  return src ? { src, alt: alt ?? images[fallback].alt } : images[fallback]
}
