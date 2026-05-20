import type { Metadata } from 'next'
import { ThemeProvider } from 'next-themes'
import { Providers } from '@/components/providers'
import './globals.css'

export const metadata: Metadata = {
  title: 'Lavish Morocco | Bespoke Luxury Concierge & Lifestyle Management',
  description: 'Experience world-class luxury concierge services in Morocco. Bespoke travel, accommodation, and lifestyle management for those who demand the finest.',
  keywords: ['Luxury Concierge', 'Morocco', 'Bespoke Services', 'Travel', 'Lifestyle Management', 'Agadir'],
  authors: [{ name: 'Ahmed Allazim' }],
  openGraph: {
    title: 'Lavish Morocco | Bespoke Luxury Concierge',
    description: 'Experience world-class bespoke concierge services in Morocco.',
    url: 'https://lavish-morocco.vercel.app',
    siteName: 'Lavish Morocco',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lavish Morocco | Bespoke Luxury Concierge',
    description: 'Experience world-class bespoke concierge services in Morocco.',
  },
  viewport: 'width=device-width, initial-scale=1',
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#050814' },
    { media: '(prefers-color-scheme: light)', color: '#f8f7f4' },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <Providers>
            {children}
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  )
}
