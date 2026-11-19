import { NextRequest, NextResponse } from 'next/server'
import { crmAuthorized, ID_RE, removeImported } from '@/lib/crm-outbox'

const NO_STORE = { 'Cache-Control': 'private, no-store', 'X-Robots-Tag': 'noindex' }

/** POST { ids } — the CRM confirms these requests are imported; their queued copies are removed. */
export async function POST(request: NextRequest) {
  if (!crmAuthorized(request.headers.get('authorization'))) return NextResponse.json({ error: 'Unauthorized' }, { status: 401, headers: NO_STORE })
  let ids: unknown
  try {
    ids = (await request.json())?.ids
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400, headers: NO_STORE })
  }
  if (!Array.isArray(ids) || ids.length > 100 || !ids.every(x => typeof x === 'string' && ID_RE.test(x))) return NextResponse.json({ error: 'Invalid ids' }, { status: 400, headers: NO_STORE })
  return NextResponse.json({ removed: await removeImported(ids as string[]) }, { headers: NO_STORE })
}
