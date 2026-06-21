import { Metadata } from 'next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Eyebrow } from '@/components/ui/eyebrow'

export const metadata: Metadata = {
  title: 'Supplier Portal | DXB TKTS',
  description: 'Supplier partner dashboard.',
  robots: 'noindex, nofollow',
}

export default function SupplierPortal() {
  return (
    <div className="min-h-screen bg-dxb-band py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <Eyebrow className="mb-4">Supplier Portal</Eyebrow>
          <h1 className="font-cormorant text-4xl font-semibold text-dxb-ink mb-2">
            Partner Dashboard
          </h1>
          <p className="text-dxb-slate">Manage incoming requests and your partnership</p>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {[
            { label: 'Pending Requests', value: '0' },
            { label: 'Completed', value: '—' },
            { label: 'Response Rate', value: '—' },
            { label: 'Rating', value: '★★★★★' },
          ].map(item => (
            <Card key={item.label}>
              <CardHeader>
                <CardTitle className="text-lg">{item.label}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-semibold text-dxb-gold">{item.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Requests (Mock) */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Member Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-dxb-slate text-sm">
                No pending requests. Member requests will appear here when received.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Notice */}
        <div className="mt-8 bg-dxb-gold/10 border-l-4 border-dxb-gold p-6 rounded">
          <p className="text-dxb-slate">
            <strong>Portal Notice:</strong> Supplier portal is currently in development. Full request management, rating system, and performance tracking coming soon. This is a scaffolded demonstration.
          </p>
        </div>
      </div>
    </div>
  )
}
