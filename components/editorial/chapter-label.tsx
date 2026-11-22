/** Editorial section marker: "01 — The founder" with a hairline. */
export function ChapterLabel({ index, label, tone = 'dark' }: { index?: string; label: string; tone?: 'dark' | 'light' }) {
  const colour = tone === 'light' ? 'text-white/60' : 'text-dxb-slate'
  const rule = tone === 'light' ? 'bg-white/25' : 'bg-dxb-ink/15'
  return (
    <div className={`flex items-center gap-4 text-[11px] font-semibold uppercase tracking-[0.3em] ${colour}`}>
      {index && <span className="text-dxb-gold" dir="ltr">{index}</span>}
      <span className={`h-px w-10 ${rule}`} />
      <span>{label}</span>
    </div>
  )
}
