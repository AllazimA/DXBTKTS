import { Instagram, Facebook, Youtube, Linkedin } from 'lucide-react'
import { site } from '@/lib/site'

function TikTok({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 1 1-2.59-2.59c.27 0 .53.04.77.12V9.79a5.68 5.68 0 1 0 4.91 5.63V9.01a7.34 7.34 0 0 0 4.29 1.38V7.3a4.28 4.28 0 0 1-3.23-1.48Z" />
    </svg>
  )
}

const PLATFORMS = [
  { key: 'instagram', label: 'Instagram', Icon: Instagram },
  { key: 'facebook', label: 'Facebook', Icon: Facebook },
  { key: 'tiktok', label: 'TikTok', Icon: TikTok },
  { key: 'youtube', label: 'YouTube', Icon: Youtube },
  { key: 'linkedin', label: 'LinkedIn', Icon: Linkedin },
] as const

/**
 * Social icons from site.social. Platforms without a URL yet are shown
 * dimmed with a "coming soon" tooltip and are not links.
 */
export function SocialLinks({ tone = 'light', comingSoonLabel = 'Coming soon' }: { tone?: 'light' | 'dark'; comingSoonLabel?: string }) {
  const base = tone === 'light' ? 'text-white/70 hover:text-dxb-orange border-white/20' : 'text-dxb-navy hover:text-dxb-cobalt border-dxb-line'
  const dim = tone === 'light' ? 'text-white/25 border-white/10' : 'text-dxb-ink/25 border-dxb-ink/10'
  return (
    <ul className="flex gap-2.5">
      {PLATFORMS.map(({ key, label, Icon }) => {
        const url = site.social[key]
        const cls = 'grid h-9 w-9 place-items-center border transition-colors'
        return (
          <li key={key}>
            {url ? (
              <a href={url} target="_blank" rel="noopener noreferrer" aria-label={label} className={`${cls} ${base}`}>
                <Icon className="w-4 h-4" />
              </a>
            ) : (
              <span title={`${label} — ${comingSoonLabel}`} aria-label={`${label} — ${comingSoonLabel}`} className={`${cls} ${dim} cursor-default`}>
                <Icon className="w-4 h-4" />
              </span>
            )}
          </li>
        )
      })}
    </ul>
  )
}
