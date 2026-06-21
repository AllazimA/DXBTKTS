import type { Metadata } from 'next'
import { ThemeProvider } from 'next-themes'
import { Providers } from '@/components/providers'
import './globals.css'

export const metadata: Metadata = {
  title: 'Lavish Morocco | Luxury Concierge & Lifestyle Management',
  description: 'Bespoke luxury concierge and lifestyle management in Morocco. VIP experiences, private travel, and exclusive accommodations for discerning travelers.',
  keywords: ['luxury concierge Morocco', 'VIP travel', 'bespoke experiences', 'private tours', 'Agadir concierge', 'lifestyle management'],
  authors: [{ name: 'Ahmed Allazim' }],
  openGraph: {
    title: 'Lavish Morocco | Luxury Concierge & Lifestyle Management',
    description: 'Bespoke luxury concierge and lifestyle management in Morocco.',
    url: 'https://lavishmorocco.com',
    siteName: 'Lavish Morocco',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lavish Morocco | Luxury Concierge & Lifestyle Management',
    description: 'Bespoke luxury concierge and lifestyle management in Morocco.',
  },
  viewport: 'width=device-width, initial-scale=1',
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#080808' },
    { media: '(prefers-color-scheme: light)', color: '#f5f0e8' },
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
