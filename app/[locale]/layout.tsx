import { shareImage } from '@/lib/metadata'
import type { Metadata, Viewport } from 'next'
import { Archivo, IBM_Plex_Mono, IBM_Plex_Sans_Arabic } from 'next/font/google'
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

// Brand type (03_Typography): Archivo with its width axis for display and text,
// IBM Plex Mono for labels and data, IBM Plex Sans Arabic for Arabic.
const archivo = Archivo({
  variable: '--font-archivo',
  subsets: ['latin', 'latin-ext'],
  axes: ['wdth'],
  display: 'swap',
})

const plexMono = IBM_Plex_Mono({
  variable: '--font-plex-mono',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
})

// Arabic face: preloaded only on Arabic pages.
const arabicSans = IBM_Plex_Sans_Arabic({
  variable: '--font-arabic-sans',
  subsets: ['arabic'],
  weight: ['400', '500', '600', '700'],
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
  openGraph: { siteName: site.name, type: 'website', images: [shareImage] },
  twitter: { card: 'summary_large_image', images: [shareImage.url] },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '48x48' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#00354E',
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
      <body className={`${archivo.variable} ${plexMono.variable} ${arabicSans.variable}`}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
        <NextIntlClientProvider locale={locale} messages={messages[locale]}>
          <Providers>
            <PlanProvider>
              <div className="dxb-root flex flex-col min-h-screen bg-dxb-sand text-dxb-ink">
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
