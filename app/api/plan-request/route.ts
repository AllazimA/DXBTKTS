import { NextRequest, NextResponse } from 'next/server'
import { clientIp, rateLimited } from '@/lib/rate-limit'
import { appendJsonl, parsePlan, planRecord, PLAN_FILE, queuePlanForCrm, reference } from '@/lib/plan-request'

/**
 * Booking request from the visitor's plan ("request to book").
 * Nothing is charged. Prices are recomputed here from the catalogue, never
 * taken from the browser.
 */
export async function POST(request: NextRequest) {
  if (rateLimited('plan', clientIp(request.headers))) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
  }
  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  const plan = parsePlan(body)
  if (!plan.ok) {
    if (plan.honeypot) return NextResponse.json({ success: true, reference: reference() })
    return NextResponse.json({ error: plan.error }, { status: plan.status })
  }

  const record = planRecord(reference(), 'requested', plan)
  await appendJsonl(PLAN_FILE, record)
  await queuePlanForCrm(record.reference, 'request', plan)
  console.log('Plan request received:', record.reference, `AED ${plan.total}`)
  return NextResponse.json({ success: true, reference: record.reference, estimatedTotal: plan.total })
}
