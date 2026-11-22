import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'
import { randomUUID } from 'crypto'
import { crmAuthorized } from '@/lib/crm-outbox'
import { CURATED_KINDS, PUBLISHED_DIR, type CuratedKind } from '@/lib/curated'

export const dynamic = 'force-dynamic'
const NO_STORE = { 'Cache-Control': 'private, no-store', 'X-Robots-Tag': 'noindex' }
const MAX_ITEMS = 100
const KEY = /^[a-zA-Z]{1,40}(_(fr|ar))?$/

/**
 * POST — the DXB CRM publishes one curated list (Website listings → Publish).
 * Body: { kind: 'restaurant' | 'nightlife' | 'event', items: [...], publishedAt }.
 * Bearer CRM_SYNC_SECRET required. The list REPLACES what was published before; an empty
 * list clears the page back to nothing (events) — restaurants and nightlife then show no cards.
 * Only plain text fields are kept; pages escape everything they render.
 */
export async function POST(request: NextRequest) {
  if (!crmAuthorized(request.headers.get('authorization'))) return NextResponse.json({ error: 'Unauthorized' }, { status: 401, headers: NO_STORE })
  let body: { kind?: unknown; items?: unknown; publishedAt?: unknown }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400, headers: NO_STORE })
  }
  const kind = body.kind as CuratedKind
  if (!CURATED_KINDS.includes(kind)) return NextResponse.json({ error: 'Unknown list' }, { status: 400, headers: NO_STORE })
  if (!Array.isArray(body.items) || body.items.length > MAX_ITEMS) return NextResponse.json({ error: `items must be a list of at most ${MAX_ITEMS}` }, { status: 400, headers: NO_STORE })

  const items = body.items
    .filter((i): i is Record<string, unknown> => !!i && typeof i === 'object' && !Array.isArray(i))
    .map(i => {
      const out: Record<string, string | number> = {}
      for (const [k, v] of Object.entries(i)) {
        if (!KEY.test(k)) continue
        if (typeof v === 'string') out[k] = v.slice(0, 2000)
        else if (typeof v === 'number' && Number.isFinite(v)) out[k] = v
      }
      return out
    })

  const doc = { kind, publishedAt: typeof body.publishedAt === 'string' ? body.publishedAt.slice(0, 40) : new Date().toISOString(), receivedAt: new Date().toISOString(), items }
  await fs.mkdir(PUBLISHED_DIR, { recursive: true })
  const file = path.join(PUBLISHED_DIR, `${kind}.json`)
  const tmp = `${file}.${randomUUID()}.tmp`
  await fs.writeFile(tmp, JSON.stringify(doc, null, 2), 'utf8')
  await fs.rename(tmp, file) // atomic: a page never reads a half-written list
  return NextResponse.json({ ok: true, kind, count: items.length }, { headers: NO_STORE })
}
