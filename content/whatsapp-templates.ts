import type { L } from '@/lib/catalogue/types'

/**
 * Guest messages sent by the team from the admin view (wa.me links, prefilled).
 * Placeholders: {name} {ref} {items} {first} {date}
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
    'Hello {name}, thank you for your request {ref} with DXB TKTS. Your concierge is checking availability for {items} and will confirm everything with you here shortly.',
    'Bonjour {name}, merci pour votre demande {ref} auprès de DXB TKTS. Votre concierge vérifie les disponibilités pour {items} et vous confirme tout ici très vite.',
    'مرحباً {name}، شكراً لطلبك {ref} لدى DXB TKTS. يتحقق فريق الكونسيرج من توفر {items} وسنؤكد لك كل شيء هنا قريباً.',
  ),
  preArrival: t(
    'Hello {name}, we look forward to welcoming you to Dubai. Your plan ({ref}): {items}. Would you like us to add anything before you arrive — a car from the airport, a table for your first evening, or Burj Khalifa at sunset?',
    'Bonjour {name}, nous avons hâte de vous accueillir à Dubaï. Votre programme ({ref}) : {items}. Souhaitez-vous ajouter quelque chose avant votre arrivée — une voiture depuis l’aéroport, une table pour votre premier soir ou Burj Khalifa au coucher du soleil ?',
    'مرحباً {name}، نتطلع إلى استقبالك في دبي. خطتك ({ref}): {items}. هل تود أن نضيف شيئاً قبل وصولك — سيارة من المطار، أو طاولة لأمسيتك الأولى، أو برج خليفة عند الغروب؟',
  ),
  dayBefore: t(
    'Hello {name}, a quick reminder for {date}: {items}. Your driver and guide details will follow here. Message us any time if anything changes.',
    'Bonjour {name}, petit rappel pour le {date} : {items}. Les coordonnées de votre chauffeur et de votre guide suivront ici. Écrivez-nous à tout moment en cas de changement.',
    'مرحباً {name}، تذكير سريع ليوم {date}: {items}. ستصلك تفاصيل السائق والمرشد هنا. راسلنا في أي وقت إذا تغيّر شيء.',
  ),
  review: t(
    'Hello {name}, thank you for spending part of your stay with DXB TKTS. How was {first}? A few honest lines from you help us — and other travellers — more than anything.',
    'Bonjour {name}, merci d’avoir passé une partie de votre séjour avec DXB TKTS. Comment s’est passé {first} ? Quelques lignes sincères de votre part nous aident — ainsi que d’autres voyageurs — plus que tout.',
    'مرحباً {name}، شكراً لقضائك جزءاً من إقامتك مع DXB TKTS. كيف كانت تجربة {first}؟ بضع كلمات صادقة منك تساعدنا — وتساعد المسافرين الآخرين — أكثر من أي شيء.',
  ),
}

export function fillTemplate(text: string, values: Record<string, string>) {
  return text.replace(/\{(\w+)\}/g, (_, k: string) => values[k] ?? '')
}
