import { promises as fs } from 'fs'
import path from 'path'

/**
 * Anti-spam honeypot shared by every public form.
 *
 * The hidden field MUST have a meaningless name. It used to be called
 * "company_website": browser autofill ignores autocomplete="off" for a name
 * like that and filled it with the guest's saved details, so real plans were
 * answered with a fake "received" and silently dropped (DXB-KVQ7VW,
 * 2026-11-24). Anything caught is still written to data/honeypot.jsonl so a
 * real guest can always be recovered.
 */
import { HONEYPOT_FIELD } from '@/lib/honeypot-field'
export { HONEYPOT_FIELD }

const FILE = path.join(process.cwd(), 'data', 'honeypot.jsonl')

export async function honeypotHit(body: Record<string, unknown>, form: string): Promise<boolean> {
  const v = body[HONEYPOT_FIELD]
  if (typeof v !== 'string' || !v.trim()) return false
  console.warn(`[honeypot] ${form} submission caught (field="${v.slice(0, 60)}") — kept in data/honeypot.jsonl`)
  try {
    await fs.mkdir(path.dirname(FILE), { recursive: true })
    await fs.appendFile(FILE, JSON.stringify({ caught_at: new Date().toISOString(), form, body }) + '\n', 'utf8')
  } catch (err) {
    console.error('[honeypot] could not record caught submission', err)
  }
  return true
}
