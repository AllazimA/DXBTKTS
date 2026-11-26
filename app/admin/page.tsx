import { loadDesk, type PlanRecord } from '@/lib/admin-data'
import { templates, templateLabels, fillTemplate, greetingFor, type TemplateKey } from '@/content/whatsapp-templates'

export const dynamic = 'force-dynamic'

const aed = (n: number) => `AED ${n.toLocaleString('en-US')}`
const when = (iso: string) => new Date(iso).toLocaleString('en-GB', { timeZone: 'Asia/Dubai', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })
const digits = (s: string) => s.replace(/\D/g, '')

function wa(number: string, text: string) {
  return `https://wa.me/${digits(number)}?text=${encodeURIComponent(text)}`
}

function messageFor(key: TemplateKey, b: PlanRecord) {
  const lang = b.locale === 'fr' || b.locale === 'ar' ? b.locale : 'en'
  const items = b.items.map(i => `${i.product}${i.date ? ` (${i.date})` : ''}`).join(', ')
  const firstDate = b.items.map(i => i.date).filter(Boolean).sort()[0] ?? ''
  return fillTemplate(templates[key][lang], {
    greeting: greetingFor(lang),
    fullname: b.customer.name.trim(),
    name: b.customer.name.split(' ')[0],
    ref: b.reference,
    items,
    first: b.items[0]?.product ?? '',
    date: firstDate,
  })
}

function Status({ b }: { b: Awaited<ReturnType<typeof loadDesk>>['bookings'][number] }) {
  if (b.paid) return <span className="bg-dxb-sea/10 text-dxb-sea px-2 py-0.5 text-xs font-semibold">Paid {aed(b.paid.amount_aed)}{b.paid.livemode ? '' : ' · test'}</span>
  if (b.status === 'awaiting_payment') return <span className="bg-dxb-clay/10 text-dxb-cobalt px-2 py-0.5 text-xs font-semibold">Checkout not completed</span>
  return <span className="bg-dxb-orange text-dxb-ink px-2 py-0.5 text-xs font-semibold">Request — confirm & send payment</span>
}

export default async function AdminDesk() {
  const { bookings, payments, enquiries } = await loadDesk()
  const paidTotal = payments.filter(p => !p.livemode).reduce((s, p) => s + p.amount_aed, 0)
  const livePaid = payments.filter(p => p.livemode).reduce((s, p) => s + p.amount_aed, 0)

  return (
    <main className="max-w-7xl mx-auto px-6 py-10">
      <header className="flex flex-wrap items-end justify-between gap-4 border-b border-dxb-ink/15 pb-6">
        <div>
          <p className="text-[11px] font-medium font-mono uppercase tracking-[0.06em] text-dxb-gold">DXB TKTS</p>
          <h1 className="font-display text-4xl text-dxb-navy">Booking desk</h1>
          <p className="text-sm text-dxb-slate mt-1">Plan requests, payments and enquiries from the website. Times in Dubai time.</p>
        </div>
        <dl className="grid grid-cols-3 gap-6 text-sm">
          <div><dt className="text-dxb-slate">Plans</dt><dd className="text-2xl font-semibold">{bookings.length}</dd></div>
          <div><dt className="text-dxb-slate">Paid (live)</dt><dd className="text-2xl font-semibold">{aed(livePaid)}</dd></div>
          <div><dt className="text-dxb-slate">Paid (test)</dt><dd className="text-2xl font-semibold text-dxb-slate">{aed(paidTotal)}</dd></div>
        </dl>
      </header>

      <section className="mt-10">
        <h2 className="font-display text-3xl">Plans and bookings</h2>
        {bookings.length === 0 ? (
          <p className="mt-4 text-dxb-slate">No plan requests yet.</p>
        ) : (
          <div className="mt-4 space-y-4">
            {bookings.map(b => (
              <article key={`${b.reference}-${b.received_at}`} className="bg-white border border-dxb-band p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold">
                      <span className="font-mono">{b.reference}</span> · {b.customer.name}
                      <span className="ms-2 text-xs uppercase text-dxb-slate">{b.locale ?? 'en'}</span>
                    </p>
                    <p className="text-xs text-dxb-slate mt-0.5">
                      {when(b.received_at)} · {b.customer.email} · <span dir="ltr">{b.customer.whatsapp}</span>
                      {b.customer.hotel ? ` · ${b.customer.hotel}` : ''}
                    </p>
                  </div>
                  <div className="text-end">
                    <Status b={b} />
                    <p className="mt-1 text-sm font-semibold">{aed(b.estimated_total_aed)}</p>
                  </div>
                </div>
                <ul className="mt-3 text-sm divide-y divide-dxb-band border-y border-dxb-band">
                  {b.items.map((i, n) => (
                    <li key={n} className="py-1.5 flex justify-between gap-4">
                      <span>
                        {i.product} — {i.variant} · qty {i.qty}{i.children ? ` + ${i.children} children` : ''}
                        <span className="text-dxb-slate"> · {i.date ?? 'date to confirm'} ({i.time})</span>
                      </span>
                      <span className="whitespace-nowrap">{aed(i.estimated_total_aed)}</span>
                    </li>
                  ))}
                </ul>
                {b.customer.notes && <p className="mt-2 text-sm text-dxb-slate">Notes: {b.customer.notes}</p>}
                <div className="mt-3 flex flex-wrap gap-2">
                  {(Object.keys(templates) as TemplateKey[]).map(k => (
                    <a key={k} href={wa(b.customer.whatsapp, messageFor(k, b))} target="_blank" rel="noopener noreferrer" className="border border-dxb-ink/20 px-3 py-1.5 text-xs font-semibold hover:border-dxb-gold hover:text-dxb-gold">
                      WhatsApp: {templateLabels[k]}
                    </a>
                  ))}
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="mt-14">
        <h2 className="font-display text-3xl">Enquiries</h2>
        {enquiries.length === 0 ? (
          <p className="mt-4 text-dxb-slate">No enquiries yet.</p>
        ) : (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm bg-white border border-dxb-band">
              <thead className="text-left text-xs font-mono uppercase tracking-[0.06em] text-dxb-slate">
                <tr><th className="p-3">Received</th><th className="p-3">Name</th><th className="p-3">Interest</th><th className="p-3">Date</th><th className="p-3">Message</th><th className="p-3">Contact</th></tr>
              </thead>
              <tbody className="divide-y divide-dxb-band">
                {enquiries.map(e => (
                  <tr key={e.id} className="align-top">
                    <td className="p-3 whitespace-nowrap">{when(e.received_at)}</td>
                    <td className="p-3">{e.name}<br /><span className="text-xs text-dxb-slate">{e.email}</span></td>
                    <td className="p-3">{e.interest}</td>
                    <td className="p-3 whitespace-nowrap">{e.date ?? '—'}</td>
                    <td className="p-3 max-w-md whitespace-pre-line">{e.message ?? ''}</td>
                    <td className="p-3 whitespace-nowrap">
                      <a className="font-semibold text-dxb-gold underline" href={wa(e.phone, `Hello ${e.name.split(' ')[0]}, thank you for your enquiry with DXB TKTS (${e.interest}).`)} target="_blank" rel="noopener noreferrer">WhatsApp</a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  )
}
