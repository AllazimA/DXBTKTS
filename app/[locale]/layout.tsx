import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

export default function LocalizedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col min-h-screen bg-dxb-ivory text-dxb-ink">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  )
}
