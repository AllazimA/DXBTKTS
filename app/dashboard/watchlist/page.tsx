'use client'
import dynamic from 'next/dynamic'

const DynamicComponent = dynamic(
  () => import('@/components/atlas/pages/Watchlist'),
  { 
    ssr: false,
    loading: () => <div className="w-full h-screen bg-slate-900 flex items-center justify-center"><div className="text-gray-400">Loading dashboard...</div></div> 
  }
)

export default function Page() {
  return <DynamicComponent />
}
