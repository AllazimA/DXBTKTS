// Builds optimised WebP files for the site from the owner's AI originals.
//   originals:  assets-originals/ai/*.jpg   (master files, not served)
//   output:     public/images/ai/<slot>.webp (2400px wide, quality 80)
// Mapping lives in scripts/image-map.json. Requires ImageMagick (`magick`).
import { readFileSync, existsSync, mkdirSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('..', import.meta.url))
const map = JSON.parse(readFileSync(`${root}scripts/image-map.json`, 'utf8'))
mkdirSync(`${root}public/images/ai`, { recursive: true })
let ok = 0
// A slot is "file.jpg", or { file, gravity } for a portrait crop aimed at part of the picture.
for (const [slot, entry] of Object.entries(map)) {
  if (slot.startsWith('_')) continue
  const file = typeof entry === 'string' ? entry : entry.file
  const gravity = typeof entry === 'string' ? 'center' : entry.gravity ?? 'center'
  // Mood-strip images (*-strip-*) are 4:5 portraits.
  const src = `${root}assets-originals/ai/${file}`
  if (!existsSync(src)) { console.warn(`missing original for ${slot}: ${file}`); continue }
  const out = `${root}public/images/ai/${slot}.webp`
  const portrait = slot === 'section-philosophy' || slot.includes('-strip-')
  const size = slot === 'og-default' ? '1200x630^' : portrait ? '1600x2000^' : '2400x'
  const args = [src, '-resize', size]
  if (slot === 'og-default' || portrait) args.push('-gravity', gravity, '-extent', size.replace('^', ''))
  args.push('-strip', '-quality', '80', '-set', 'comment', '© DXBTKTS. All rights reserved.', out)
  execFileSync('magick', args)
  ok++
}
console.log(`[images] built ${ok} WebP file(s) in public/images/ai`)
