import { NextRequest, NextResponse } from 'next/server'
import { crmAuthorized, listPending } from '@/lib/crm-outbox'

export const dynamic = 'force-dynamic'
const NO_STORE = { 'Cache-Control': 'private, no-store', 'X-Robots-Tag': 'noindex' }

/** GET — pending website requests for the DXB CRM. Bearer CRM_SYNC_SECRET required. */
export async function GET(request: NextRequest) {
  if (!crmAuthorized(request.headers.get('authorization'))) return NextResponse.json({ error: 'Unauthorized' }, { status: 401, headers: NO_STORE })
  return NextResponse.json({ enquiries: await listPending(50) }, { headers: NO_STORE })
}
