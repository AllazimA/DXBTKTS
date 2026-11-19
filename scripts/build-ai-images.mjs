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
for (const [slot, file] of Object.entries(map)) {
  if (slot.startsWith('_')) continue
  const src = `${root}assets-originals/ai/${file}`
  if (!existsSync(src)) { console.warn(`missing original for ${slot}: ${file}`); continue }
  const out = `${root}public/images/ai/${slot}.webp`
  const size = slot === 'og-default' ? '1200x630^' : slot === 'section-philosophy' ? '1600x2000^' : '2400x'
  const args = [src, '-resize', size]
  if (slot === 'og-default' || slot === 'section-philosophy') args.push('-gravity', 'center', '-extent', size.replace('^', ''))
  args.push('-strip', '-quality', '80', '-set', 'comment', '© DXBTKTS. All rights reserved.', out)
  execFileSync('magick', args)
  ok++
}
console.log(`[images] built ${ok} WebP file(s) in public/images/ai`)
