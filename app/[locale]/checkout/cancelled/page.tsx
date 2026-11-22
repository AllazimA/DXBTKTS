import type { Metadata } from 'next'
import Link from 'next/link'
import type { Locale } from '@/i18n.config'
import type { L } from '@/lib/catalogue/types'

export const metadata: Metadata = { title: { absolute: 'Payment cancelled | DXB TKTS' }, robots: { index: false, follow: false } }

const t = (en: string, fr: string, ar: string): L => ({ en, fr, ar })
const c = {
  title: t('Payment not completed', 'Paiement non finalisé', 'لم يكتمل الدفع'),
  copy: t(
    'Nothing has been charged and your plan is still saved. You can try again, or send it as a request and pay once we have confirmed everything.',
    'Rien n’a été débité et votre programme est toujours enregistré. Vous pouvez réessayer, ou l’envoyer comme demande et payer une fois tout confirmé.',
    'لم يُخصم أي مبلغ وما زالت خطتك محفوظة. يمكنك المحاولة مجدداً، أو إرسالها كطلب والدفع بعد أن نؤكد كل شيء.',
  ),
  back: t('Back to experiences', 'Retour aux expériences', 'العودة إلى التجارب'),
}

export default function CheckoutCancelled({ params: { locale } }: { params: { locale: Locale } }) {
  return (
    <section className="bg-dxb-ivory">
      <div className="max-w-2xl mx-auto px-6 py-28 md:py-36 text-center">
        <h1 className="font-cormorant font-light text-4xl md:text-5xl text-dxb-ink">{c.title[locale]}</h1>
        <p className="mt-6 text-lg text-dxb-slate leading-relaxed">{c.copy[locale]}</p>
        <Link href="/experiences" className="mt-10 inline-block px-8 py-4 bg-dxb-clay text-white text-sm font-semibold tracking-[0.12em] uppercase hover:bg-dxb-clay-hover">
          {c.back[locale]}
        </Link>
      </div>
    </section>
  )
}
