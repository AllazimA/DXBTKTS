import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx}',
    './content/**/*.{js,ts,jsx,tsx}',
    './data/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dxb: {
          // DXB TKTS brand palette v1.0 — eight colours, locked 22 Nov 2026.
          navy: '#00354E', // brand dark: bars, footers, headlines
          orange: '#FAA61C', // light orange: T symbol, buttons, highlights (ink text only)
          cobalt: '#2F3DF0', // gulf cobalt: links, brand panels, water
          ink: '#0A0E2A', // night ink: body text, premium grounds
          green: '#5FAD46', // days out, Oasis (ink text only)
          red: '#CF2227', // live events and nights (white text)
          sand: '#F2EEE6', // page ground
          // Interface states derived from the palette (not new brand colours).
          'orange-hover': '#F29A08',
          line: '#DCD6CA', // hairlines on sand/white
          muted: '#4E5268', // secondary text: night ink at ~75%
          // Legacy names kept so older markup stays on-brand.
          // `gold` is contextual: cobalt on light grounds, light orange on dark grounds (see globals.css).
          gold: 'rgb(var(--dxb-accent) / <alpha-value>)',
          'gold-hover': '#00354E',
          ivory: '#F2EEE6',
          band: '#DCD6CA',
          slate: '#4E5268',
          clay: '#FAA61C',
          'clay-hover': '#F29A08',
          sea: '#2F3DF0',
        },
      },
      fontFamily: {
        sans: ['var(--font-archivo)', 'Archivo', 'Helvetica Neue', 'Arial', 'sans-serif'],
        display: ['var(--font-archivo)', 'Archivo', 'Helvetica Neue', 'Arial', 'sans-serif'],
        mono: ['var(--font-plex-mono)', 'IBM Plex Mono', 'ui-monospace', 'Menlo', 'monospace'],
        cormorant: ['var(--font-archivo)', 'Archivo', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'hero-pattern': "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c9a96e' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'shimmer': 'shimmer 2s linear infinite',
        'spin-slow': 'spin 8s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(201, 169, 110, 0.3)' },
          '100%': { boxShadow: '0 0 40px rgba(201, 169, 110, 0.7), 0 0 80px rgba(201, 169, 110, 0.3)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      boxShadow: {
        ticket: '0 1px 0 rgba(10,14,42,0.06), 0 18px 40px -24px rgba(10,14,42,0.35)',
        'ticket-lg': '0 1px 0 rgba(10,14,42,0.06), 0 30px 60px -28px rgba(10,14,42,0.45)',
      },
    },
  },
  plugins: [],
}
export default config
