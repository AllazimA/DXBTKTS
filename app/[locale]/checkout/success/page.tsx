import type { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle2, Clock } from 'lucide-react'
import type { Locale } from '@/i18n.config'
import type { L } from '@/lib/catalogue/types'
import { stripeClient } from '@/lib/stripe'
import { recordPaidSession } from '@/lib/payments'
import { formatAED } from '@/lib/catalogue/money'
import { whatsappLink } from '@/lib/site'
import { ClearPlan } from '@/components/checkout/clear-plan'
import { WhatsAppIcon } from '@/components/ui/whatsapp-icon'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: { absolute: 'Payment | DXB TKTS' }, robots: { index: false, follow: false } }

const t = (en: string, fr: string, ar: string): L => ({ en, fr, ar })
const c = {
  paidTitle: t('Thank you — your payment is confirmed', 'Merci — votre paiement est confirmé', 'شكراً — تم تأكيد الدفع'),
  paidCopy: t(
    'Your concierge will be in touch on WhatsApp shortly to confirm every detail with the suppliers and share your vouchers.',
    'Votre concierge vous contactera très vite sur WhatsApp pour confirmer chaque détail avec les prestataires et vous transmettre vos bons.',
    'سيتواصل معك فريق الكونسيرج قريباً عبر واتساب لتأكيد كل التفاصيل مع المزودين ومشاركة القسائم.',
  ),
  pendingTitle: t('Your payment is being processed', 'Votre paiement est en cours de traitement', 'جارٍ معالجة الدفع'),
  pendingCopy: t('We will confirm as soon as it clears. If anything looks wrong, message us on WhatsApp.', 'Nous confirmerons dès sa validation. En cas de doute, écrivez-nous sur WhatsApp.', 'سنؤكد فور اكتماله. وإن بدا أي شيء غير صحيح فراسلنا عبر واتساب.'),
  missing: t('We could not find this payment.', 'Nous n’avons pas trouvé ce paiement.', 'لم نعثر على هذا الدفع.'),
  reference: t('Reference', 'Référence', 'المرجع'),
  amount: t('Amount paid', 'Montant payé', 'المبلغ المدفوع'),
  test: t('Test payment — no real money was charged.', 'Paiement test — aucun montant réel n’a été débité.', 'دفعة تجريبية — لم يُخصم أي مبلغ حقيقي.'),
  whatsapp: t('Message us on WhatsApp', 'Nous écrire sur WhatsApp', 'راسلنا عبر واتساب'),
  home: t('Back to DXB TKTS', 'Retour à DXB TKTS', 'العودة إلى DXB TKTS'),
}

export default async function CheckoutSuccess({ params: { locale }, searchParams }: { params: { locale: Locale }; searchParams: { session_id?: string } }) {
  const stripe = stripeClient()
  const id = searchParams.session_id
  const session = stripe && id && /^cs_[A-Za-z0-9_]+$/.test(id) ? await stripe.checkout.sessions.retrieve(id).catch(() => null) : null
  if (session) await recordPaidSession(session, 'success_page')
  const paid = session?.payment_status === 'paid'
  const ref = session?.client_reference_id ?? session?.metadata?.reference

  return (
    <section className="bg-dxb-ivory">
      <div className="max-w-2xl mx-auto px-6 py-28 md:py-36 text-center">
        {!session ? (
          <h1 className="font-cormorant text-4xl text-dxb-ink">{c.missing[locale]}</h1>
        ) : (
          <>
            {paid ? <ClearPlan /> : null}
            {paid ? <CheckCircle2 className="mx-auto w-14 h-14 text-dxb-sea" /> : <Clock className="mx-auto w-14 h-14 text-dxb-gold" />}
            <h1 className="mt-8 font-cormorant font-light text-4xl md:text-5xl text-dxb-ink">{paid ? c.paidTitle[locale] : c.pendingTitle[locale]}</h1>
            <p className="mt-6 text-lg text-dxb-slate leading-relaxed">{paid ? c.paidCopy[locale] : c.pendingCopy[locale]}</p>
            <dl className="mt-10 inline-grid grid-cols-2 gap-x-10 gap-y-2 text-start border-t border-dxb-ink/15 pt-6">
              <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-dxb-slate">{c.reference[locale]}</dt>
              <dd className="font-semibold text-dxb-ink" dir="ltr">{ref}</dd>
              <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-dxb-slate">{c.amount[locale]}</dt>
              <dd className="font-semibold text-dxb-ink">{formatAED((session.amount_total ?? 0) / 100, locale)}</dd>
            </dl>
            {!session.livemode && <p className="mt-6 text-sm text-dxb-gold">{c.test[locale]}</p>}
          </>
        )}
        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
          <a href={whatsappLink(ref ? `Hello DXB TKTS, about my booking ${ref}` : undefined)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-dxb-clay text-white text-sm font-semibold tracking-[0.12em] uppercase hover:bg-dxb-clay-hover">
            <WhatsAppIcon className="w-4 h-4" />
            {c.whatsapp[locale]}
          </a>
          <Link href="/" className="px-8 py-4 border border-dxb-ink/20 text-dxb-ink text-sm font-semibold tracking-[0.12em] uppercase hover:border-dxb-gold">
            {c.home[locale]}
          </Link>
        </div>
      </div>
    </section>
  )
}
