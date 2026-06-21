import type { Metadata } from 'next'
import { Cormorant_Garamond, Inter } from 'next/font/google'
import { notFound } from 'next/navigation'
import { getMessages } from 'next-intl/server'
import { NextIntlClientProvider } from 'next-intl'
import { locales, defaultLocale, localeMeta, type Locale } from '@/i18n.config'
import { ThemeProvider } from 'next-themes'
import { Providers } from '@/components/providers'
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

type Props = {
  children: React.ReactNode
  params: { locale: Locale }
}

export async function generateStaticParams() {
  return locales.map(locale => ({ locale }))
}

export default async function LocaleLayout({ children, params: { locale } }: Props) {
  if (!locales.includes(locale)) {
    notFound()
  }

  const messages = await getMessages()
  const dir = localeMeta[locale].dir

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <body className={`${cormorant.variable} ${inter.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <NextIntlClientProvider messages={messages}>
            <Providers>
              {children}
            </Providers>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
