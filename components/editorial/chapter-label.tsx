import { Tear } from '@/components/brand'

/** Editorial section marker: "01 ⁞ THE FOUNDER" in mono, with a short rule. */
export function ChapterLabel({ index, label, tone = 'dark' }: { index?: string; label: string; tone?: 'dark' | 'light' }) {
  const colour = tone === 'light' ? 'text-dxb-orange' : 'text-dxb-cobalt'
  const rule = tone === 'light' ? 'bg-white/30' : 'bg-dxb-navy'
  return (
    <div className={`flex items-center gap-3 dxb-label ${colour}`}>
      <span className={`h-[2px] w-8 ${rule}`} />
      {index && <span dir="ltr">{index}</span>}
      {index && <Tear />}
      <span>{label}</span>
    </div>
  )
}
