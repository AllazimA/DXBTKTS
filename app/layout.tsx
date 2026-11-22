import type { ReactNode } from 'react'

// The real document shell (<html lang dir>) is in app/[locale]/layout.tsx.
export default function RootLayout({ children }: { children: ReactNode }) {
  return children
}
