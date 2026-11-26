import type { L } from '@/lib/catalogue/types'

/**
 * Guest messages sent by the team from the admin view (wa.me links, prefilled).
 * Placeholders: {greeting} {fullname} {name} {ref} {items} {first} {date}
 * Register: brand voice v1.1 (luxury): courteous, full sentences, signed by the concierge, no emoji.
 * Strategy report: opportunity 9 (pre-arrival upsell) and 10 (reviews).
 * Reviews are asked for honestly — never incentivised, never filtered.
 */

export type TemplateKey = 'received' | 'preArrival' | 'dayBefore' | 'review'

const t = (en: string, fr: string, ar: string): L => ({ en, fr, ar })

export const templateLabels: Record<TemplateKey, string> = {
  received: 'Received',
  preArrival: 'Pre-arrival (7 days)',
  dayBefore: 'Day before',
  review: 'Review request',
}

export const templates: Record<TemplateKey, L> = {
  received: t(
    '{greeting}, {fullname}. Thank you for your request with DXB TKTS (reference {ref}). Your concierge is now confirming availability for {items}, and will return to you here shortly with every detail. — Your concierge, DXB TKTS',
    '{greeting} {fullname}, nous vous remercions de votre demande auprès de DXB TKTS (référence {ref}). Votre concierge confirme actuellement les disponibilités pour {items} et reviendra vers vous ici très prochainement avec tous les détails. — Votre concierge, DXB TKTS',
    '{greeting} {fullname}، نشكركم على طلبكم لدى DXB TKTS (المرجع {ref}). يقوم الكونسيرج الخاص بكم حالياً بتأكيد توفر {items}، وسيعود إليكم هنا قريباً بكامل التفاصيل. — الكونسيرج الخاص بكم، DXB TKTS',
  ),
  preArrival: t(
    '{greeting}, {fullname}. We look forward to welcoming you to Dubai. Your arrangements ({ref}): {items}. May we prepare anything further before you arrive? A chauffeur from the airport, a table for your first evening or Burj Khalifa at sunset would be our pleasure to arrange. — Your concierge, DXB TKTS',
    '{greeting} {fullname}, nous nous réjouissons de vous accueillir à Dubaï. Vos réservations ({ref}) : {items}. Pouvons-nous préparer autre chose avant votre arrivée ? Un chauffeur à l’aéroport, une table pour votre première soirée ou Burj Khalifa au coucher du soleil : ce serait avec plaisir. — Votre concierge, DXB TKTS',
    '{greeting} {fullname}، يسعدنا أن نستقبلكم في دبي. ترتيباتكم ({ref}): {items}. هل تودّون أن نُعدّ لكم أي شيء آخر قبل وصولكم؟ سائق خاص من المطار، أو طاولة لأمسيتكم الأولى، أو برج خليفة عند الغروب، يسعدنا ترتيب ذلك. — الكونسيرج الخاص بكم، DXB TKTS',
  ),
  dayBefore: t(
    '{greeting}, {fullname}. Everything is in place for {date}: {items}. Your chauffeur’s and guide’s details will follow here. Should anything change, simply message us and we will take care of it. — Your concierge, DXB TKTS',
    '{greeting} {fullname}, tout est prêt pour le {date} : {items}. Les coordonnées de votre chauffeur et de votre guide suivront ici. En cas de changement, il vous suffit de nous écrire et nous nous en occuperons. — Votre concierge, DXB TKTS',
    '{greeting} {fullname}، كل شيء جاهز ليوم {date}: {items}. ستصلكم تفاصيل السائق والمرشد هنا. وإن طرأ أي تغيير، يكفي أن تراسلونا وسنتولى الأمر. — الكونسيرج الخاص بكم، DXB TKTS',
  ),
  review: t(
    '{greeting}, {fullname}. Thank you for allowing us to arrange {first} during your stay. We would be grateful for a few honest words about your experience: they help us, and future guests, more than anything. — Your concierge, DXB TKTS',
    '{greeting} {fullname}, nous vous remercions de nous avoir confié {first} pendant votre séjour. Quelques mots sincères sur votre expérience nous seraient précieux : ils nous aident, ainsi que nos futurs hôtes, plus que tout. — Votre concierge, DXB TKTS',
    '{greeting} {fullname}، نشكركم على منحنا شرف ترتيب {first} خلال إقامتكم. يسعدنا أن نسمع منكم بضع كلمات صادقة عن تجربتكم، فهي تساعدنا وتساعد ضيوفنا القادمين أكثر من أي شيء. — الكونسيرج الخاص بكم، DXB TKTS',
  ),
}

/** Time-of-day greeting in Dubai, per language (luxury register, brand voice v1.1). */
export function greetingFor(lang: 'en' | 'fr' | 'ar', now: Date = new Date()) {
  const hour = Number(new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Dubai', hour: '2-digit', hourCycle: 'h23' }).format(now))
  const part = hour < 12 ? 'morning' : hour < 17 ? 'afternoon' : 'evening'
  if (lang === 'fr') return part === 'evening' ? 'Bonsoir' : 'Bonjour'
  if (lang === 'ar') return part === 'morning' ? 'صباح الخير' : 'مساء الخير'
  return part === 'morning' ? 'Good morning' : part === 'afternoon' ? 'Good afternoon' : 'Good evening'
}

export function fillTemplate(text: string, values: Record<string, string>) {
  return text.replace(/\{(\w+)\}/g, (_, k: string) => values[k] ?? '')
}
