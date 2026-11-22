import type { Metadata, Viewport } from 'next'
import { Amiri, Cormorant_Garamond, IBM_Plex_Sans_Arabic, Inter } from 'next/font/google'
import { site } from '@/lib/site'
import '../globals.css'
import { NextIntlClientProvider } from 'next-intl'
import { notFound } from 'next/navigation'
import { Providers } from '@/components/providers'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { PlanProvider } from '@/components/catalogue/plan-provider'
import { PlanDrawer } from '@/components/catalogue/plan-drawer'
import { ComingSoonBanner } from '@/components/layout/coming-soon-banner'
import { WhatsAppWidget } from '@/components/layout/whatsapp-widget'
import { locales, localeMeta, type Locale } from '@/i18n.config'
import en from '@/messages/en.json'
import ar from '@/messages/ar.json'
import fr from '@/messages/fr.json'

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

// Arabic faces: preloaded only on Arabic pages.
const arabicSans = IBM_Plex_Sans_Arabic({
  variable: '--font-arabic-sans',
  subsets: ['arabic'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  preload: false,
})

const arabicDisplay = Amiri({
  variable: '--font-arabic-display',
  subsets: ['arabic'],
  weight: ['400', '700'],
  display: 'swap',
  preload: false,
})

// Page-level title, description, canonical and hreflang are set per page
// (see lib/metadata.ts). Only site-wide defaults live here.
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: 'DXB TKTS | Private Experiences & Concierge in Dubai',
    template: '%s | DXB TKTS',
  },
  description:
    'Private experiences and concierge in Dubai — yachts, desert, helicopter tours, chauffeurs and celebrations, arranged by a Dubai-based team.',
  applicationName: site.name,
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0E1B2C',
}

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: site.name,
  url: site.url,
  email: site.email,
  telephone: site.whatsapp.e164,
  areaServed: [
    { '@type': 'City', name: 'Dubai' },
    { '@type': 'Country', name: 'United Arab Emirates' },
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    telephone: site.whatsapp.e164,
    availableLanguage: ['English', 'Arabic', 'French'],
  },
}


const messages = { en, ar, fr } as const

export function generateStaticParams() {
  return locales.map(locale => ({ locale }))
}

// <html> lives here (not in app/layout.tsx) so lang/dir update whenever the
// locale segment changes — including client-side language switches.
export default function LocaleLayout({ children, params: { locale } }: { children: React.ReactNode; params: { locale: Locale } }) {
  if (!locales.includes(locale)) notFound()
  const dir = localeMeta[locale].dir

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <body className={`${cormorant.variable} ${inter.variable} ${arabicDisplay.variable} ${locale === 'ar' ? arabicSans.variable : ''}`}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
        <NextIntlClientProvider locale={locale} messages={messages[locale]}>
          <Providers>
            <PlanProvider>
              <div className="dxb-root flex flex-col min-h-screen bg-dxb-ivory text-dxb-ink">
                <ComingSoonBanner />
                <Header />
                <main className="flex-1">{children}</main>
                <Footer />
              </div>
              <PlanDrawer />
              <WhatsAppWidget />
            </PlanProvider>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
