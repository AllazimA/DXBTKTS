import { useId } from 'react'
import { memberCardSample } from '@/content/membership'
import { LOGO_SYMBOL, LOGO_WORDMARK, SYMBOL_D } from '@/components/brand/logo-paths'

/**
 * DXB TKTS membership card, drawn as one scalable SVG to the approved brand card
 * (DXB TKTS Brand, 11_Membership, Phase 5): a flat tier colour, the horizontal logo
 * top left, the tier label top right, a ghost T symbol, the tier name in Archivo,
 * member details in IBM Plex Mono and the perforation line at 79% of the width.
 *
 *  oasis  — green, navy logo, Night Ink type
 *  pearl  — gulf cobalt with a soft light, white logo and type
 *  najm   — Night Ink with light-orange type, a fine orange frame and a star
 *  majlis — navy with an orange edge (company account)
 *
 * Units are tenths of a millimetre on an 85.6 × 54 mm card. No birds or animals.
 */

export type CardFinish = 'oasis' | 'pearl' | 'najm' | 'majlis'

const W = 856
const H = 540
const PERF = Math.round(W * 0.79)
const DISPLAY = "var(--font-archivo), Archivo, 'Helvetica Neue', Arial, sans-serif"
const MONO = "var(--font-plex-mono), 'IBM Plex Mono', ui-monospace, monospace"
const ARABIC = "var(--font-arabic-sans), 'IBM Plex Sans Arabic', Tahoma, sans-serif"

type Look = { fg: string; sub: string; symbol: string; wordmark: string; ghost: string; ghostOpacity: number; label: string }
const LOOK: Record<CardFinish, Look> = {
  oasis: { fg: '#0A0E2A', sub: '#0A0E2A', symbol: '#00354E', wordmark: '#00354E', ghost: '#00354E', ghostOpacity: 0.14, label: 'Annual membership' },
  pearl: { fg: '#FFFFFF', sub: '#FFFFFF', symbol: '#FFFFFF', wordmark: '#FFFFFF', ghost: '#FFFFFF', ghostOpacity: 0.14, label: 'Household membership' },
  najm: { fg: '#FAA61C', sub: '#FAA61C', symbol: '#FAA61C', wordmark: '#FFFFFF', ghost: '#FAA61C', ghostOpacity: 0.1, label: 'Private membership' },
  majlis: { fg: '#FFFFFF', sub: '#FAA61C', symbol: '#FAA61C', wordmark: '#FFFFFF', ghost: '#FAA61C', ghostOpacity: 0.07, label: 'Company account' },
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
  /** Kept for callers; the card shows the tier's own label from the brand card. */
  label?: string
  memberName?: string
  memberNumber?: string
  expiry?: string
  showMember?: boolean
  className?: string
}) {
  const k = LOOK[finish]
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '')
  const id = (s: string) => `${s}${uid}`
  // Logo: 4.6 mm tall at 5.5 mm from the left and 5.2 mm from the top.
  const logoScale = 46 / 170
  // Ghost symbol: 44 mm tall, bleeding off the bottom right.
  const gs = 440 / 76
  const gx = W + 60 - 88 * gs
  const gy = H + 100 - 440
  const nameSize = name.length > 8 ? 60 : 81
  const fields: [string, string][] = [['Member', memberName], ['No.', memberNumber], ['Valid', expiry]]
  let fx = 55

  return (
    <div
      dir="ltr"
      className={`relative w-full aspect-[1.586] rounded-[3.7%/5.9%] shadow-[0_2px_3px_rgba(0,0,0,0.18),0_34px_60px_-26px_rgba(0,0,0,0.65)] ${className}`}
      role="img"
      aria-label={`DXB TKTS ${name} membership card${showMember ? `, ${memberName}` : ''}`}
    >
      <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full" aria-hidden="true">
        <defs>
          <clipPath id={id('clip')}><rect width={W} height={H} rx="32" /></clipPath>
          <radialGradient id={id('pearl')} cx="0.85" cy="0.1" r="0.9"><stop offset="0" stopColor="#FFFFFF" stopOpacity="0.26" /><stop offset="0.5" stopColor="#FFFFFF" stopOpacity="0" /></radialGradient>
          <linearGradient id={id('majlis')} x1="0" y1="0" x2="0.75" y2="1"><stop offset="0" stopColor="#0A4662" /><stop offset="0.55" stopColor="#00354E" /><stop offset="1" stopColor="#002536" /></linearGradient>
          <radialGradient id={id('najm')} cx="0.18" cy="0" r="1.1"><stop offset="0" stopColor="#151B45" /><stop offset="0.6" stopColor="#0A0E2A" /></radialGradient>
          <pattern id={id('brush')} width="7.5" height="10" patternUnits="userSpaceOnUse"><rect width="2.5" height="10" fill="#FFFFFF" opacity="0.02" /></pattern>
        </defs>
        <g clipPath={`url(#${id('clip')})`}>
          {finish === 'oasis' && <rect width={W} height={H} fill="#5FAD46" />}
          {finish === 'pearl' && <><rect width={W} height={H} fill="#2F3DF0" /><rect width={W} height={H} fill={`url(#${id('pearl')})`} /></>}
          {finish === 'majlis' && <><rect width={W} height={H} fill={`url(#${id('majlis')})`} /><rect width="14" height={H} fill="#FAA61C" /></>}
          {finish === 'najm' && <><rect width={W} height={H} fill={`url(#${id('najm')})`} /><rect width={W} height={H} fill={`url(#${id('brush')})`} />
            <rect x="24" y="24" width={W - 48} height={H - 48} rx="20" fill="none" stroke="#FAA61C" strokeOpacity="0.45" strokeWidth="2.5" /></>}

          {/* Ghost T symbol */}
          <path d={SYMBOL_D} fill={k.ghost} opacity={k.ghostOpacity} transform={`translate(${gx - 6 * gs} ${gy - 14 * gs}) scale(${gs})`} />

          {/* Logo, outlined paths from the brand masters */}
          <g transform={`translate(55 ${52 + 35 * logoScale}) scale(${logoScale})`}>
            <path d={LOGO_SYMBOL.d} transform={LOGO_SYMBOL.transform} fill={k.symbol} />
            <path d={LOGO_WORDMARK.d} transform={LOGO_WORDMARK.transform} fill={k.wordmark} />
          </g>
          <text x={W - 55} y="76" textAnchor="end" fontFamily={MONO} fontSize="16" fontWeight="500" letterSpacing="1.3" fill={k.sub}>
            {(k.label || label || '').toUpperCase()}
          </text>

          {/* Tier */}
          <text x="55" y="262" fontFamily={DISPLAY} fontSize={nameSize} fontWeight="800" letterSpacing={-0.04 * nameSize} fill={k.fg} style={{ fontStretch: '122%' }}>
            {name}
            {finish === 'najm' && <tspan dx="6" dy={-nameSize * 0.5} fontSize={nameSize * 0.42} fill="#FAA61C">★</tspan>}
          </text>
          <text x="55" y="300" fontFamily={ARABIC} fontSize="25" fontWeight="700" fill={k.sub} textAnchor="start">{arabicName}</text>

          {/* Member details */}
          {showMember && fields.map(([l, v]) => {
            const x = fx
            fx += Math.max(l.length * 8, v.length * 11.8) + 60
            return (
              <g key={l} fontFamily={MONO} fill={k.fg}>
                <text x={x} y="462" fontSize="12.7" fontWeight="500" letterSpacing="1" opacity="0.7">{l.toUpperCase()}</text>
                <text x={x} y="490" fontSize="19.7" fontWeight="500" style={{ fontVariantNumeric: 'tabular-nums' }}>{v}</text>
              </g>
            )
          })}

          {/* Perforation at 79% */}
          <line x1={PERF} y1="40" x2={PERF} y2={H - 40} stroke={k.fg} strokeOpacity="0.4" strokeWidth="3" strokeDasharray="9 7" />
        </g>
      </svg>
    </div>
  )
}
