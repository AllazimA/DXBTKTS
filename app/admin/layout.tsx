import type { Metadata } from 'next'
import { Archivo, IBM_Plex_Mono } from 'next/font/google'
import '../globals.css'

const archivo = Archivo({ variable: '--font-archivo', subsets: ['latin'], axes: ['wdth'], display: 'swap' })
const plexMono = IBM_Plex_Mono({ variable: '--font-plex-mono', subsets: ['latin'], weight: ['400', '500', '600'], display: 'swap' })

export const metadata: Metadata = { title: 'DXB TKTS — Booking desk', robots: { index: false, follow: false } }

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${archivo.variable} ${plexMono.variable} bg-dxb-sand text-dxb-ink antialiased`}>{children}</body>
    </html>
  )
}
