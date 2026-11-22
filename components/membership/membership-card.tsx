import { useId } from 'react'
import { memberCardSample } from '@/content/membership'

/**
 * DXB TKTS membership card — drawn as one scalable SVG (no images), so it
 * stays sharp at any size and every card renders identically.
 *
 * Finishes
 *  oasis  — brushed champagne metal, dark-bronze embossing
 *  pearl  — platinum / silver with a soft nacre sheen
 *  najm   — black card, champagne-gold embossing
 *  majlis — deep emerald, engraved gold linework (company account)
 *
 * Emblems tell each name: Oasis — a date palm over water; Pearl — an open
 * pearl shell; Najm — a five-pointed star; Majlis — traditional majlis seating.
 * No birds or animals appear on any card.
 */

export type CardFinish = 'oasis' | 'pearl' | 'najm' | 'majlis'

type Palette = {
  base: string[] // card metal, left → right
  ink: string[] // embossed lettering + emblem
  hi: string // emboss highlight
  lo: string // emboss shadow
  muted: string
  line: string // guilloche / engraving
  brush: number // brushed-texture strength
  engraved?: boolean // light/shadow reversed: cut into the card, not raised
}

const P: Record<CardFinish, Palette> = {
  oasis: {
    base: ['#B99A66', '#E4D1A8', '#C8AC7C', '#EEDFBD', '#B8975F', '#D9C293'],
    ink: ['#5A4323', '#3A2B16', '#6B5230'],
    hi: 'rgba(255,246,222,0.85)',
    lo: 'rgba(70,48,18,0.55)',
    muted: 'rgba(58,43,22,0.62)',
    line: 'rgba(90,67,35,0.16)',
    brush: 0.32,
  },
  pearl: {
    base: ['#C9CDD2', '#F3F4F4', '#D6DADE', '#FAFAF8', '#BFC4CA', '#E6E8EA'],
    ink: ['#3B444F', '#1D242D', '#4C5562'],
    hi: 'rgba(255,255,255,0.95)',
    lo: 'rgba(40,48,60,0.42)',
    muted: 'rgba(29,36,45,0.55)',
    line: 'rgba(60,70,84,0.13)',
    brush: 0.26,
  },
  najm: {
    base: ['#0B0B0C', '#1E1D1B', '#121212', '#262420', '#0A0A0A', '#171615'],
    ink: ['#F4E3B5', '#C9A45C', '#8C6C31', '#E8CD90'],
    hi: 'rgba(255,238,196,0.32)',
    lo: 'rgba(0,0,0,0.9)',
    muted: 'rgba(230,203,142,0.6)',
    line: 'rgba(201,164,92,0.12)',
    brush: 0.14,
  },
  majlis: {
    base: ['#071C19', '#0F3A34', '#0A2925', '#124640', '#061714', '#0C302B'],
    ink: ['#EBD49A', '#C29A4E', '#8E6C2E', '#DCC07F'],
    hi: 'rgba(255,236,190,0.22)',
    lo: 'rgba(0,0,0,0.85)',
    muted: 'rgba(225,200,140,0.62)',
    line: 'rgba(209,176,106,0.16)',
    brush: 0.1,
    engraved: true,
  },
}

const W = 856
const H = 540
const SERIF = "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif"
const SANS = "var(--font-inter), Inter, system-ui, sans-serif"
const ARABIC = "var(--font-arabic-display), Amiri, serif"

/** 2n-point star polygon. */
function star(cx: number, cy: number, n: number, outer: number, inner: number, rot = -90) {
  const pts: string[] = []
  for (let i = 0; i < n * 2; i++) {
    const r = i % 2 === 0 ? outer : inner
    const a = ((rot + (i * 180) / n) * Math.PI) / 180
    pts.push(`${(cx + r * Math.cos(a)).toFixed(2)},${(cy + r * Math.sin(a)).toFixed(2)}`)
  }
  return pts.join(' ')
}

/** Regular polygon. */
function poly(cx: number, cy: number, n: number, r: number, rot = -90) {
  return Array.from({ length: n }, (_, i) => {
    const a = ((rot + (i * 360) / n) * Math.PI) / 180
    return `${(cx + r * Math.cos(a)).toFixed(2)},${(cy + r * Math.sin(a)).toFixed(2)}`
  }).join(' ')
}

/** Wave rings: r(θ) = base + amp·sin(k·θ + phase), drawn once and reused. */
const GUILLOCHE: string[] = Array.from({ length: 22 }, (_, i) => {
  const base = 170 + i * 7
  const amp = 26
  const phase = i * 0.42
  const pts: string[] = []
  for (let s = 0; s <= 720; s++) {
    const th = (s / 720) * Math.PI * 2
    const r = base + amp * Math.sin(14 * th + phase)
    pts.push(`${(r * Math.cos(th)).toFixed(1)},${(r * Math.sin(th)).toFixed(1)}`)
  }
  return `M${pts.join('L')}Z`
})

/** Palm frond: a tapered, drooping leaf pointing along +x from the crown. */
const FROND = 'M0 0 C 14 -13 40 -16 62 3 C 55 -1 48 0 42 4 C 36 -1 29 -1 23 4 C 17 0 9 -1 0 0 Z'

/** Scalloped fan between two angles around a hinge (pearl shell lid). */
function fan(cx: number, cy: number, r: number, from: number, to: number, ribs: number) {
  const pt = (a: number, rr: number) => [cx + rr * Math.cos((a * Math.PI) / 180), cy + rr * Math.sin((a * Math.PI) / 180)]
  const step = (to - from) / ribs
  let d = `M${cx} ${cy} L${pt(from, r).map(n => n.toFixed(1)).join(' ')}`
  const ribLines: string[] = []
  for (let i = 0; i < ribs; i++) {
    const a1 = from + step * (i + 1)
    const mid = pt(from + step * (i + 0.5), r * 1.07)
    const end = pt(a1, r)
    d += ` Q${mid[0].toFixed(1)} ${mid[1].toFixed(1)} ${end[0].toFixed(1)} ${end[1].toFixed(1)}`
    if (i < ribs - 1) ribLines.push(`M${cx} ${cy} L${end[0].toFixed(1)} ${end[1].toFixed(1)}`)
  }
  return { outline: `${d} Z`, ribs: ribLines.join(' ') }
}

/** Tier insignia, drawn around (0,0) within radius ~80. */
function Emblem({ finish, ink, pearl }: { finish: CardFinish; ink: string; pearl: string }) {
  const s = { fill: 'none', stroke: ink, strokeLinejoin: 'round' as const, strokeLinecap: 'round' as const }

  if (finish === 'oasis') {
    // Oasis: date palms over still water, inside a double ring.
    const Palm = ({ x, y, k, lean }: { x: number; y: number; k: number; lean: number }) => (
      <g transform={`translate(${x} ${y}) scale(${k})`}>
        <path d={`M-3 0 C ${-1 + lean * 0.2} -24 ${lean * 0.7} -46 ${lean} -64 L ${lean + 6} -65 C ${lean * 0.7 + 8} -46 ${6 + lean * 0.2} -24 6 0 Z`} fill={ink} />
        {[-10, -22, -34, -46, -56].map((yy, i) => (
          <path key={yy} d={`M${-2 + (lean * (i + 1)) / 6} ${yy} l 8 -2`} stroke="rgba(0,0,0,0.35)" strokeWidth="1.2" />
        ))}
        {[-178, -152, -126, -100, -72, -42, -12].map(a => (
          <path key={a} d={FROND} fill={ink} transform={`translate(${lean + 3} -66) rotate(${a})${a < -90 ? ' scale(1 -1)' : ''}`} />
        ))}
        {[[-2, -60], [5, -58], [1, -55], [8, -61]].map(([dx, dy]) => (
          <circle key={`${dx}${dy}`} cx={lean + dx} cy={dy} r="2.6" fill={ink} />
        ))}
      </g>
    )
    return (
      <g>
        <circle r="78" {...s} strokeWidth="2.2" />
        <circle r="70" {...s} strokeWidth="0.9" />
        <Palm x={30} y={40} k={0.58} lean={6} />
        <Palm x={-8} y={42} k={0.92} lean={-14} />
        <path d="M-50 44 C -32 39 -14 48 2 43 S 34 39 50 44" {...s} strokeWidth="2" />
        <path d="M-38 53 C -22 49 -8 56 8 52 S 28 49 38 53" {...s} strokeWidth="1.3" />
      </g>
    )
  }

  if (finish === 'pearl') {
    // An open pearl shell: fluted lid raised behind, the lower valve cradling the pearl.
    const lid = fan(0, 16, 60, -168, -12, 9)
    return (
      <g>
        <circle r="78" {...s} strokeWidth="1" />
        <path d={lid.outline} {...s} strokeWidth="2.6" />
        <path d={lid.ribs} {...s} strokeWidth="1.1" />
        <path d="M-58 16 C -52 52 52 52 58 16 C 34 30 -34 30 -58 16 Z" fill={ink} opacity="0.92" />
        <path d="M-44 24 C -30 40 30 40 44 24" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1" />
        <circle cx="0" cy="13" r="15" fill={pearl} stroke={ink} strokeWidth="1.2" />
        <circle cx="-5" cy="8" r="4" fill="#fff" opacity="0.8" />
      </g>
    )
  }

  if (finish === 'najm') {
    // Najm: a faceted five-pointed star inside a compass ring.
    const outer = 62
    const inner = 25
    const v = Array.from({ length: 10 }, (_, i) => {
      const r = i % 2 === 0 ? outer : inner
      const a = ((-90 + i * 36) * Math.PI) / 180
      return [r * Math.cos(a), r * Math.sin(a)]
    })
    return (
      <g>
        <circle r="80" {...s} strokeWidth="1.2" />
        <circle r="74" {...s} strokeWidth="2.4" />
        {Array.from({ length: 60 }).map((_, i) => (
          <line key={i} x1="0" y1={-74} x2="0" y2={i % 5 === 0 ? -64 : -69} stroke={ink} strokeWidth={i % 5 === 0 ? 1.6 : 0.8} transform={`rotate(${i * 6})`} />
        ))}
        {v.map((p, i) => {
          const q = v[(i + 1) % 10]
          return (
            <g key={i}>
              <polygon points={`0,0 ${p[0].toFixed(2)},${p[1].toFixed(2)} ${q[0].toFixed(2)},${q[1].toFixed(2)}`} fill={ink} />
              {i % 2 === 1 && <polygon points={`0,0 ${p[0].toFixed(2)},${p[1].toFixed(2)} ${q[0].toFixed(2)},${q[1].toFixed(2)}`} fill="rgba(0,0,0,0.38)" />}
            </g>
          )
        })}
      </g>
    )
  }

  // Majlis: traditional floor seating framed by an arch, a lantern above and a dallah on the tray.
  return (
    <g>
      <path d="M-70 66 V -8 C -70 -46 -34 -66 0 -80 C 34 -66 70 -46 70 -8 V 66 Z" {...s} strokeWidth="2.4" />
      <path d="M-62 66 V -6 C -62 -40 -30 -58 0 -71 C 30 -58 62 -40 62 -6 V 66" {...s} strokeWidth="0.9" />
      {/* lantern */}
      <line x1="0" y1="-71" x2="0" y2="-52" stroke={ink} strokeWidth="1.2" />
      <path d="M-6 -52 H 6 L 9 -42 L 5 -32 H -5 L -9 -42 Z" fill={ink} />
      {/* back cushions */}
      {[-52, -17, 18].map(x => (
        <rect key={x} x={x} y="-8" width="34" height="30" rx="7" {...s} strokeWidth="2" />
      ))}
      {/* seat with woven stripes */}
      <rect x="-58" y="20" width="116" height="22" rx="3" fill={ink} />
      {[25, 31, 37].map(y => (
        <line key={y} x1="-56" y1={y} x2="56" y2={y} stroke="rgba(0,0,0,0.38)" strokeWidth="1.4" strokeDasharray="5 3" />
      ))}
      {/* arm bolsters */}
      <rect x="-68" y="4" width="13" height="38" rx="6.5" fill={ink} />
      <rect x="55" y="4" width="13" height="38" rx="6.5" fill={ink} />
      {/* rug and tray with dallah */}
      <line x1="-62" y1="58" x2="62" y2="58" stroke={ink} strokeWidth="1.6" />
      <line x1="-50" y1="63" x2="50" y2="63" stroke={ink} strokeWidth="0.9" />
      <rect x="-16" y="50" width="32" height="5" rx="1.5" fill={ink} />
      <path d="M-3 50 C -7 46 -6 40 -2 38 L -2 35 L 2 35 L 2 38 C 6 40 7 46 3 50 Z M 3 42 C 8 40 11 37 13 34" fill={ink} stroke={ink} strokeWidth="1" />
    </g>
  )
}

/** Engraved background pattern per finish. */
function Pattern({ finish, line }: { finish: CardFinish; line: string }) {
  // Guilloche band — interlaced wave rings, the banknote-engraving look shared by all cards.
  const cx = finish === 'majlis' ? 720 : 610
  const cy = finish === 'majlis' ? 150 : 330
  const rosette = (
    <g transform={`translate(${cx} ${cy})`} fill="none" stroke={line} strokeWidth="0.75">
      {GUILLOCHE.map((d, i) => (
        <path key={i} d={d} />
      ))}
    </g>
  )
  if (finish === 'oasis') {
    return (
      <g>
        {rosette}
        {Array.from({ length: 9 }).map((_, i) => (
          <path key={i} d={`M-20 ${430 + i * 14} C 180 ${390 + i * 14}, 420 ${470 + i * 14}, 880 ${410 + i * 14}`} fill="none" stroke={line} strokeWidth="1" />
        ))}
      </g>
    )
  }
  if (finish === 'pearl') {
    return (
      <g>
        {rosette}
        {Array.from({ length: 10 }).map((_, i) => (
          <circle key={i} cx={735} cy={120} r={95 + i * 26} fill="none" stroke={line} strokeWidth="0.8" />
        ))}
      </g>
    )
  }
  if (finish === 'najm') {
    return (
      <g>
        {rosette}
        <g transform="translate(735 120)" stroke={line} strokeWidth="0.8">
          {Array.from({ length: 72 }).map((_, i) => (
            <line key={i} x1="0" y1="-110" x2="0" y2="-900" transform={`rotate(${i * 5})`} />
          ))}
        </g>
      </g>
    )
  }
  // majlis — a colonnade of engraved arches along the base
  return (
    <g>
      {rosette}
      {Array.from({ length: 13 }).map((_, i) => {
        const x = -10 + i * 70
        return (
          <path key={i} d={`M ${x} 560 V 470 C ${x} 440 ${x + 22} 424 ${x + 32} 410 C ${x + 42} 424 ${x + 64} 440 ${x + 64} 470 V 560`} fill="none" stroke={line} strokeWidth="1.1" />
        )
      })}
    </g>
  )
}

export function MembershipCard({
  finish,
  name,
  arabicName,
  label,
  memberName = memberCardSample.memberName,
  memberNumber = memberCardSample.memberNumber,
  expiry = memberCardSample.expiry,
  showMember = true,
  className = '',
}: {
  finish: CardFinish
  name: string
  arabicName: string
  label: string
  memberName?: string
  memberNumber?: string
  expiry?: string
  showMember?: boolean
  className?: string
}) {
  const p = P[finish]
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '')
  const id = (k: string) => `${k}${uid}`
  const ref = (k: string) => `url(#${id(k)})`
  const dark = finish === 'najm' || finish === 'majlis'
  // Engraved = cut in (shadow top-left); embossed = raised (shadow bottom-right).
  const d = p.engraved ? -1 : 1

  return (
    <div
      dir="ltr"
      className={`relative w-full aspect-[1.586] rounded-[4.2%/6.6%] shadow-[0_2px_3px_rgba(0,0,0,0.18),0_34px_60px_-26px_rgba(0,0,0,0.65)] ${className}`}
      role="img"
      aria-label={`DXB TKTS ${name} membership card${showMember ? ` — ${memberName}` : ''}`}
    >
      <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full" aria-hidden="true">
        <defs>
          <clipPath id={id('clip')}>
            <rect width={W} height={H} rx="36" />
          </clipPath>
          <linearGradient id={id('base')} x1="0" y1="0" x2="1" y2="0.62">
            {p.base.map((c, i) => (
              <stop key={i} offset={i / (p.base.length - 1)} stopColor={c} />
            ))}
          </linearGradient>
          <linearGradient id={id('ink')} x1="0" y1="0" x2="1" y2="1">
            {p.ink.map((c, i) => (
              <stop key={i} offset={i / (p.ink.length - 1)} stopColor={c} />
            ))}
          </linearGradient>
          <linearGradient id={id('sheen')} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0.28" stopColor="#fff" stopOpacity="0" />
            <stop offset="0.44" stopColor="#fff" stopOpacity={dark ? 0.1 : 0.42} />
            <stop offset="0.52" stopColor="#fff" stopOpacity="0" />
            <stop offset="0.7" stopColor="#fff" stopOpacity={dark ? 0.04 : 0.16} />
            <stop offset="0.8" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          <linearGradient id={id('edge')} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#fff" stopOpacity={dark ? 0.28 : 0.85} />
            <stop offset="0.5" stopColor="#fff" stopOpacity="0" />
            <stop offset="1" stopColor="#000" stopOpacity={dark ? 0.6 : 0.25} />
          </linearGradient>
          <radialGradient id={id('nacre')} cx="0.78" cy="0.2" r="0.75">
            <stop offset="0" stopColor="#F7E8EE" stopOpacity="0.75" />
            <stop offset="0.35" stopColor="#E2EEF1" stopOpacity="0.5" />
            <stop offset="0.7" stopColor="#EFE8DA" stopOpacity="0.25" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
          <radialGradient id={id('pearl')} cx="0.36" cy="0.32" r="0.75">
            <stop offset="0" stopColor="#FFFFFF" />
            <stop offset="0.45" stopColor="#EEE8EC" />
            <stop offset="0.8" stopColor="#C9CDD6" />
            <stop offset="1" stopColor="#9AA0AC" />
          </radialGradient>
          <linearGradient id={id('chip')} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#F6E6B4" />
            <stop offset="0.35" stopColor="#D4B26A" />
            <stop offset="0.6" stopColor="#F0DBA0" />
            <stop offset="1" stopColor="#9C7A38" />
          </linearGradient>
          {/* Brushed metal: noise stretched along the x axis */}
          <filter id={id('brush')} filterUnits="userSpaceOnUse" x="0" y="0" width={W} height={H}>
            <feTurbulence type="fractalNoise" baseFrequency="0.0016 0.75" numOctaves="3" seed="7" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <filter id={id('grain')} filterUnits="userSpaceOnUse" x="0" y="0" width={W} height={H}>
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="3" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          {/* Emboss / engrave: a highlight and a shadow either side of the shape */}
          <filter id={id('emboss')} x="-20%" y="-30%" width="140%" height="160%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="0.7" result="b" />
            <feOffset in="b" dx={1.8 * d} dy={1.8 * d} result="o1" />
            <feFlood floodColor={p.lo} />
            <feComposite in2="o1" operator="in" result="shadow" />
            <feOffset in="b" dx={-1.2 * d} dy={-1.2 * d} result="o2" />
            <feFlood floodColor={p.hi} />
            <feComposite in2="o2" operator="in" result="light" />
            <feMerge>
              <feMergeNode in="shadow" />
              <feMergeNode in="light" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g clipPath={ref('clip')}>
          <rect width={W} height={H} fill={ref('base')} />
          {finish === 'pearl' && <rect width={W} height={H} fill={ref('nacre')} />}
          <rect width={W} height={H} filter={ref('brush')} opacity={p.brush} style={{ mixBlendMode: 'overlay' }} />
          <rect width={W} height={H} filter={ref('grain')} opacity={dark ? 0.07 : 0.05} style={{ mixBlendMode: 'overlay' }} />
          <Pattern finish={finish} line={p.line} />
          <rect width={W} height={H} fill={ref('sheen')} />

          {/* Brand */}
          <g filter={ref('emboss')} fill={ref('ink')}>
            <text x="64" y="104" fontFamily={SERIF} fontSize="50" fontWeight="600" letterSpacing="2">
              DXB TKTS
            </text>
            <text x="66" y="140" fontFamily={SANS} fontSize="13" fontWeight="600" letterSpacing="6.5">
              {label.toUpperCase()}
            </text>
          </g>

          {/* Emblem */}
          <g transform="translate(735 122)" filter={ref('emboss')}>
            <Emblem finish={finish} ink={ref('ink')} pearl={ref('pearl')} />
          </g>

          {/* Chip */}
          <g transform="translate(66 182)">
            <rect width="104" height="80" rx="13" fill={ref('chip')} stroke="rgba(90,66,24,0.6)" strokeWidth="1.2" />
            <g fill="none" stroke="rgba(92,68,26,0.55)" strokeWidth="1.4">
              <path d="M0 27 H34 M0 53 H34 M70 27 H104 M70 53 H104" />
              <path d="M34 0 V80 M70 0 V80" />
              <rect x="34" y="20" width="36" height="40" rx="6" />
            </g>
            <rect width="104" height="80" rx="13" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="0.8" />
          </g>
          {/* Contactless */}
          <g transform="translate(196 222)" fill="none" stroke={ref('ink')} strokeWidth="3" strokeLinecap="round" filter={ref('emboss')} opacity="0.85">
            <path d="M0 -12 C6 -4 6 4 0 12" />
            <path d="M10 -21 C20 -7 20 7 10 21" />
            <path d="M20 -30 C34 -10 34 10 20 30" />
          </g>

          {showMember && (
            <g filter={ref('emboss')} fill={ref('ink')}>
              <text x="66" y="312" fontFamily={SANS} fontSize="10.5" fontWeight="600" letterSpacing="3">
                MEMBER NO.
              </text>
              <text x="66" y="356" fontFamily={SANS} fontSize="44" fontWeight="500" letterSpacing="10" style={{ fontVariantNumeric: 'tabular-nums' }}>
                {memberNumber}
              </text>
              <text x="66" y="394" fontFamily={SANS} fontSize="10.5" fontWeight="600" letterSpacing="3">
                VALID
              </text>
              <text x="66" y="407" fontFamily={SANS} fontSize="10.5" fontWeight="600" letterSpacing="3">
                THRU
              </text>
              <text x="126" y="408" fontFamily={SANS} fontSize="26" fontWeight="500" letterSpacing="4" style={{ fontVariantNumeric: 'tabular-nums' }}>
                {expiry}
              </text>
              <text x="66" y="482" fontFamily={SANS} fontSize="29" fontWeight="500" letterSpacing="3.5">
                {memberName.toUpperCase()}
              </text>
            </g>
          )}

          {/* Tier */}
          <g filter={ref('emboss')} fill={ref('ink')}>
            <text x="790" y="420" textAnchor="start" fontFamily={ARABIC} fontSize="34" direction="rtl">
              {arabicName}
            </text>
            <text x="792" y="484" textAnchor="end" fontFamily={SERIF} fontSize="56" fontStyle="italic" fontWeight="500" letterSpacing="1">
              {name}
            </text>
          </g>

          {/* Bevelled edge */}
          <rect x="1.5" y="1.5" width={W - 3} height={H - 3} rx="35" fill="none" stroke={ref('edge')} strokeWidth="3" />
        </g>
      </svg>
    </div>
  )
}
