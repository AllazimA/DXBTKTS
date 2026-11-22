import { site, whatsappLink } from '@/lib/site'

/**
 * The acknowledgement a guest receives the moment the website accepts their request or payment.
 * Sent through Resend's HTTP API (no SDK). It never blocks or fails a submission: the result is
 * only reported ('sent' | 'off' | 'failed') so the CRM can show whether the guest was told.
 *
 * Settings (environment):
 *   RESEND_API_KEY        — required; without it nothing is sent ('off').
 *   ACK_EMAIL_FROM        — e.g. "DXB TKTS <hello@dxbtkts.com>" once the domain is verified in Resend.
 *                           Until then Resend's test sender is used, which only delivers to the
 *                           Resend account owner's own address (fine for testing, not for guests).
 *   ACK_EMAIL_REPLY_TO    — optional reply-to address.
 */
export type AckStatus = 'sent' | 'off' | 'failed'
export type AckKind = 'plan' | 'pay' | 'enquiry' | 'service'
export type AckInput = {
  to: string
  name: string
  locale?: string | null
  kind: AckKind
  reference?: string | null
  /** One line per thing asked for, already in the guest's words / product names. */
  lines: string[]
  /** Plans: the estimated total. Payments: the amount paid. */
  amount?: { value: number; currency: string; test?: boolean } | null
}

type Lang = 'en' | 'fr' | 'ar'
const T: Record<Lang, Record<string, string>> = {
  en: {
    subject_plan: 'We have your plan — {ref}', subject_pay: 'Payment received — {ref}', subject_enquiry: 'We have your request', subject_service: 'We have your request',
    hello: 'Dear {name},',
    intro_plan: 'Thank you for your plan. We are checking availability with our partners and will come back to you personally with the confirmed details and final price.',
    intro_pay: 'Thank you — your payment is confirmed. We are now securing everything with our partners and will send your confirmation and vouchers.',
    intro_enquiry: 'Thank you for your request. A member of our team will reply to you personally.',
    intro_service: 'Thank you for your request. A member of our team will reply to you personally.',
    asked: 'What you asked for', reference: 'Your reference', total: 'Estimated total', paid: 'Amount paid', indicative: 'Indicative until we confirm with our partners.', test: 'Test payment — no real money was charged.',
    next: 'What happens next', next_body: 'We usually reply within a few hours, on WhatsApp or by email. If anything changes, message us on WhatsApp{reply}.', reply: ' or simply reply to this email',
    whatsapp: 'Message us on WhatsApp', signoff: 'With warm regards,', team: 'The DXB TKTS concierge team',
  },
  fr: {
    subject_plan: 'Nous avons bien reçu votre programme — {ref}', subject_pay: 'Paiement reçu — {ref}', subject_enquiry: 'Nous avons bien reçu votre demande', subject_service: 'Nous avons bien reçu votre demande',
    hello: 'Bonjour {name},',
    intro_plan: 'Merci pour votre programme. Nous vérifions les disponibilités auprès de nos partenaires et revenons vers vous personnellement avec les détails confirmés et le prix final.',
    intro_pay: 'Merci — votre paiement est confirmé. Nous réservons tout auprès de nos partenaires et vous enverrons votre confirmation et vos bons.',
    intro_enquiry: 'Merci pour votre demande. Un membre de notre équipe vous répondra personnellement.',
    intro_service: 'Merci pour votre demande. Un membre de notre équipe vous répondra personnellement.',
    asked: 'Votre demande', reference: 'Votre référence', total: 'Total estimé', paid: 'Montant payé', indicative: 'Indicatif jusqu’à confirmation par nos partenaires.', test: 'Paiement test — aucun montant réel n’a été débité.',
    next: 'La suite', next_body: 'Nous répondons généralement en quelques heures, sur WhatsApp ou par e-mail. Pour toute modification, écrivez-nous sur WhatsApp{reply}.', reply: ' ou répondez simplement à cet e-mail',
    whatsapp: 'Nous écrire sur WhatsApp', signoff: 'Bien cordialement,', team: 'L’équipe conciergerie DXB TKTS',
  },
  ar: {
    subject_plan: 'استلمنا خطتك — {ref}', subject_pay: 'تم استلام الدفع — {ref}', subject_enquiry: 'استلمنا طلبك', subject_service: 'استلمنا طلبك',
    hello: 'عزيزي/عزيزتي {name}،',
    intro_plan: 'شكراً لك على خطتك. نتحقق الآن من التوفر لدى شركائنا وسنعود إليك شخصياً بالتفاصيل المؤكدة والسعر النهائي.',
    intro_pay: 'شكراً لك — تم تأكيد الدفع. نقوم الآن بتأمين كل شيء مع شركائنا وسنرسل إليك التأكيد والقسائم.',
    intro_enquiry: 'شكراً لك على طلبك. سيرد عليك أحد أعضاء فريقنا شخصياً.',
    intro_service: 'شكراً لك على طلبك. سيرد عليك أحد أعضاء فريقنا شخصياً.',
    asked: 'ما طلبته', reference: 'رقمك المرجعي', total: 'الإجمالي التقديري', paid: 'المبلغ المدفوع', indicative: 'تقديري حتى التأكيد مع شركائنا.', test: 'دفعة تجريبية — لم يتم خصم أي مبلغ حقيقي.',
    next: 'الخطوة التالية', next_body: 'نرد عادة خلال ساعات قليلة عبر واتساب أو البريد الإلكتروني. لأي تغيير، راسلنا على واتساب{reply}.', reply: ' أو قم بالرد على هذه الرسالة',
    whatsapp: 'راسلنا على واتساب', signoff: 'مع أطيب التحيات،', team: 'فريق الكونسيرج في DXB TKTS',
  },
}

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
const fill = (s: string, v: Record<string, string>) => s.replace(/\{(\w+)\}/g, (_, k) => v[k] ?? '')
const money = (n: number, c: string) => `${c} ${n.toLocaleString('en-US', { maximumFractionDigits: 2 })}`

export function buildAck(a: AckInput): { subject: string; html: string; text: string } {
  const lang: Lang = a.locale === 'fr' || a.locale === 'ar' ? a.locale : 'en'
  // "Reply to this email" only when replies actually reach someone.
  const t: Record<string, string> = { ...T[lang], next_body: fill(T[lang].next_body, { reply: process.env.ACK_EMAIL_REPLY_TO ? T[lang].reply : '' }) }; const rtl = lang === 'ar'
  const first = a.name.trim().split(/\s+/)[0] || a.name
  const ref = a.reference ?? ''
  const subject = fill(t[`subject_${a.kind}`], { ref }).replace(/\s—\s$/, '')
  const amountLabel = a.kind === 'pay' ? t.paid : t.total
  const amountNote = a.amount?.test ? t.test : a.kind === 'plan' ? t.indicative : ''
  const wa = whatsappLink(ref ? `Hi DXB TKTS — about ${ref}` : 'Hi DXB TKTS')

  const text = [
    fill(t.hello, { name: first }), '', t[`intro_${a.kind}`], '',
    ref ? `${t.reference}: ${ref}` : '',
    a.lines.length ? `${t.asked}:\n${a.lines.map(l => `• ${l}`).join('\n')}` : '',
    a.amount ? `${amountLabel}: ${money(a.amount.value, a.amount.currency)}${amountNote ? ` (${amountNote})` : ''}` : '',
    '', `${t.next}: ${t.next_body}`, `${t.whatsapp}: ${wa}`, '', t.signoff, t.team, site.url,
  ].filter((l, i, all) => l !== '' || all[i - 1] !== '').join('\n')

  const row = (k: string, v: string) => `<tr><td style="padding:6px 0;color:#6B7280;font-size:13px;width:40%">${esc(k)}</td><td style="padding:6px 0;color:#0F1B2D;font-size:14px;font-weight:600">${esc(v)}</td></tr>`
  const html = `<!doctype html><html lang="${lang}" dir="${rtl ? 'rtl' : 'ltr'}"><body style="margin:0;background:#F5F1EA;font-family:Helvetica,Arial,sans-serif">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F5F1EA;padding:24px 12px"><tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#FFFFFF;border:1px solid #E7E0D3">
<tr><td style="background:#0F1B2D;padding:22px 28px;color:#FFFFFF;font-family:Georgia,serif;font-size:22px;letter-spacing:.5px">DXB <span style="color:#B08D3F">TKTS</span><div style="font-family:Helvetica,Arial,sans-serif;font-size:10px;letter-spacing:3px;color:#B08D3F;margin-top:4px">PRIVATE CONCIERGE · DUBAI</div></td></tr>
<tr><td style="padding:28px;color:#0F1B2D;font-size:15px;line-height:1.6;text-align:${rtl ? 'right' : 'left'}">
<p style="margin:0 0 14px">${esc(fill(t.hello, { name: first }))}</p>
<p style="margin:0 0 20px">${esc(t[`intro_${a.kind}`])}</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #E7E0D3;border-bottom:1px solid #E7E0D3;margin:0 0 20px">
${ref ? row(t.reference, ref) : ''}${a.amount ? row(amountLabel, money(a.amount.value, a.amount.currency)) : ''}
</table>
${amountNote ? `<p style="margin:-12px 0 18px;color:#8A6A2B;font-size:12px">${esc(amountNote)}</p>` : ''}
${a.lines.length ? `<p style="margin:0 0 6px;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#6B7280">${esc(t.asked)}</p><ul style="margin:0 0 20px;padding-${rtl ? 'right' : 'left'}:18px">${a.lines.map(l => `<li style="margin:0 0 4px">${esc(l)}</li>`).join('')}</ul>` : ''}
<p style="margin:0 0 6px;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#6B7280">${esc(t.next)}</p>
<p style="margin:0 0 22px">${esc(t.next_body)}</p>
<p style="margin:0 0 26px"><a href="${esc(wa)}" style="display:inline-block;background:#B4532A;color:#FFFFFF;text-decoration:none;padding:12px 22px;font-size:13px;font-weight:600;letter-spacing:1px">${esc(t.whatsapp)}</a></p>
<p style="margin:0">${esc(t.signoff)}<br>${esc(t.team)}</p>
</td></tr>
<tr><td style="padding:16px 28px;border-top:1px solid #E7E0D3;color:#6B7280;font-size:12px">${esc(site.url.replace(/^https?:\/\//, ''))} · WhatsApp ${esc(site.whatsapp.display ?? '')}</td></tr>
</table></td></tr></table></body></html>`
  return { subject, html, text }
}

/** Send the acknowledgement. Never throws. */
export async function sendAck(a: AckInput): Promise<AckStatus> {
  const key = process.env.RESEND_API_KEY
  if (!key) return 'off'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(a.to)) return 'failed'
  try {
    const { subject, html, text } = buildAck(a)
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: process.env.ACK_EMAIL_FROM || 'DXB TKTS <onboarding@resend.dev>',
        to: [a.to], subject, html, text,
        ...(process.env.ACK_EMAIL_REPLY_TO ? { reply_to: process.env.ACK_EMAIL_REPLY_TO } : {}),
      }),
      signal: AbortSignal.timeout(8000),
    })
    if (res.ok) { const j = await res.json().catch(() => ({})) as { id?: string }; console.log(`[ack-email] ${a.kind} acknowledgement accepted by Resend (id ${j.id ?? '?'})`); return 'sent' }
    const err = await res.text().catch(() => '')
    console.error(`[ack-email] Resend refused (${res.status}): ${err.slice(0, 300)}`)
    return 'failed'
  } catch (e) {
    console.error('[ack-email] not sent:', (e as Error).message)
    return 'failed'
  }
}
