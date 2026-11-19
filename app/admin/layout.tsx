import type { Metadata } from 'next'
import '../globals.css'

export const metadata: Metadata = { title: 'DXB TKTS — Booking desk', robots: { index: false, follow: false } }

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-dxb-ivory text-dxb-ink antialiased">{children}</body>
    </html>
  )
}
