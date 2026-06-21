import { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Eyebrow } from '@/components/ui/eyebrow'

export const metadata: Metadata = {
  title: 'Member Portal | DXB TKTS',
  description: 'Your private concierge dashboard.',
  robots: 'noindex, nofollow',
}

export default function MemberPortal() {
  return (
    <div className="min-h-screen bg-dxb-band py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <Eyebrow className="mb-4">Member Portal</Eyebrow>
          <h1 className="font-cormorant text-4xl font-semibold text-dxb-ink mb-2">
            Welcome Back
          </h1>
          <p className="text-dxb-slate">Manage your concierge requests and preferences</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardHeader>
              <CardTitle>New Request</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-dxb-slate mb-4">Submit a new concierge request</p>
              <Button asChild variant="primary" size="sm">
                <Link href="/portal/request">Create Request</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Active Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-dxb-slate mb-4">0 active requests</p>
              <Button asChild variant="outline" size="sm">
                <Link href="/portal/requests">View All</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Profile Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-dxb-slate mb-4">Manage your preferences and dossier</p>
              <Button asChild variant="outline" size="sm">
                <Link href="/portal/profile">Edit Profile</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Notice */}
        <div className="bg-dxb-gold/10 border-l-4 border-dxb-gold p-6 rounded">
          <p className="text-dxb-slate">
            <strong>Portal Notice:</strong> Member portal is currently in development. Authentication and data persistence coming soon. This is a scaffolded demonstration of the portal structure.
          </p>
        </div>
      </div>
    </div>
  )
}
