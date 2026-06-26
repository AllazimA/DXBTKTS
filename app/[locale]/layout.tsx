import { NextIntlClientProvider } from 'next-intl'
import { ThemeProvider } from 'next-themes'
import { Providers } from '@/components/providers'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { locales, type Locale } from '@/i18n.config'
import en from '@/messages/en.json'
import ar from '@/messages/ar.json'
import fr from '@/messages/fr.json'

const messages = { en, ar, fr } as const

type Props = {
  children: React.ReactNode
  params: { locale: Locale }
}

export async function generateStaticParams() {
  return locales.map(locale => ({ locale }))
}

export default async function LocalizedLayout({ children, params: { locale } }: Props) {
  const localeMessages = messages[locale as keyof typeof messages] || messages.en

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <NextIntlClientProvider messages={localeMessages}>
        <Providers>
          <div className="flex flex-col min-h-screen bg-dxb-ivory text-dxb-ink">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </NextIntlClientProvider>
    </ThemeProvider>
  )
}
