// Lists the AI images present in public/images/ai so the site can use them
// instead of placeholders. Runs automatically before `npm run dev` and
// `npm run build`; run `npm run images` after adding files to a running server.
import { readdirSync, writeFileSync } from 'node:fs'

const dir = new URL('../public/images/ai/', import.meta.url)
let files = []
try {
  files = readdirSync(dir).filter(f => /\.(webp|jpe?g|png|avif)$/i.test(f)).sort()
} catch {}
const out = new URL('../lib/ai-images.json', import.meta.url)
writeFileSync(out, JSON.stringify({ files }, null, 2) + '\n')
console.log(`[images] ${files.length} AI image(s) found in public/images/ai`)
