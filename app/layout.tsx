import type { Metadata } from 'next'
import { Cormorant_Garamond, Inter } from 'next/font/google'
import './globals.css'

const cormorant = Cormorant_Garamond({
  variable: '--font-cormorant',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
})

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'DXB TKTS | Luxury Concierge & Lifestyle Management Dubai',
  description: 'Premium concierge service for HNWIs in Dubai. Discreet, 24/7 lifestyle support, membership tiers, corporate programs.',
  keywords: ['luxury concierge Dubai', 'UHNWI services', 'exclusive lifestyle management', 'Dubai concierge'],
  authors: [{ name: 'Ahmed Allazim' }],
  openGraph: {
    title: 'DXB TKTS | Luxury Concierge & Lifestyle Management',
    description: 'Premium concierge service for HNWIs in Dubai.',
    url: 'https://dxbtkts.com',
    siteName: 'DXB TKTS',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DXB TKTS | Luxury Concierge & Lifestyle Management',
    description: 'Premium concierge service for HNWIs in Dubai.',
  },
  viewport: 'width=device-width, initial-scale=1',
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#0E1B2C' },
    { media: '(prefers-color-scheme: light)', color: '#FBFAF7' },
  ],
  robots: 'index, follow',
  alternates: {
    canonical: 'https://dxbtkts.com',
    languages: {
      'en-US': 'https://dxbtkts.com/en',
      'ar': 'https://dxbtkts.com/ar',
      'fr': 'https://dxbtkts.com/fr',
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html suppressHydrationWarning>
      <body className={`${cormorant.variable} ${inter.variable}`}>
        {children}
      </body>
    </html>
  )
}
