'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export function EnquiryForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const formData = new FormData(e.currentTarget)
      const response = await fetch('/api/enquiry', {
        method: 'POST',
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          phone: formData.get('phone'),
          contact_method: formData.get('contact_method'),
          interest: formData.get('interest'),
          message: formData.get('message'),
          referral_source: formData.get('referral_source'),
        }),
        headers: { 'Content-Type': 'application/json' },
      })

      if (response.ok) {
        setSubmitted(true)
      }
    } catch (error) {
      console.error('Form submission error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (submitted) {
    return (
      <Card className="border-dxb-gold border-2">
        <CardHeader>
          <CardTitle className="text-dxb-gold">Thank you</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-dxb-slate">
            Your enquiry has been received. Our team will be in touch within 24 hours to discuss how we can serve you.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Begin Your Journey</CardTitle>
        <CardDescription>Tell us about yourself and your needs. We'll be in touch within 24 hours.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <Label htmlFor="name">Full Name *</Label>
            <Input id="name" name="name" type="text" required placeholder="Your name" className="mt-2" />
          </div>

          {/* Email */}
          <div>
            <Label htmlFor="email">Email Address *</Label>
            <Input id="email" name="email" type="email" required placeholder="hello@example.com" className="mt-2" />
          </div>

          {/* Phone */}
          <div>
            <Label htmlFor="phone">Phone Number *</Label>
            <Input id="phone" name="phone" type="tel" required placeholder="+971 XX XXX XXXX" className="mt-2" />
          </div>

          {/* Preferred Contact Method */}
          <div>
            <Label htmlFor="contact_method">Preferred Contact Method *</Label>
            <select
              id="contact_method"
              name="contact_method"
              required
              className="mt-2 flex h-10 w-full rounded border border-dxb-band bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dxb-gold"
            >
              <option value="">Select a method</option>
              <option value="phone">Phone</option>
              <option value="email">Email</option>
              <option value="whatsapp">WhatsApp</option>
            </select>
          </div>

          {/* Interest */}
          <div>
            <Label htmlFor="interest">What are you interested in? *</Label>
            <select
              id="interest"
              name="interest"
              required
              className="mt-2 flex h-10 w-full rounded border border-dxb-band bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dxb-gold"
            >
              <option value="">Select an option</option>
              <option value="signature">Signature Membership</option>
              <option value="prive">Privé Membership</option>
              <option value="noir">Noir Membership</option>
              <option value="corporate">Corporate Concierge</option>
              <option value="other">Other / Enquiry</option>
            </select>
          </div>

          {/* Message */}
          <div>
            <Label htmlFor="message">Message</Label>
            <textarea
              id="message"
              name="message"
              placeholder="Tell us more about yourself and your lifestyle..."
              rows={4}
              className="mt-2 flex w-full rounded border border-dxb-band bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dxb-gold"
            />
          </div>

          {/* Referral Source */}
          <div>
            <Label htmlFor="referral_source">How did you hear about us?</Label>
            <select
              id="referral_source"
              name="referral_source"
              className="mt-2 flex h-10 w-full rounded border border-dxb-band bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dxb-gold"
            >
              <option value="">Select an option</option>
              <option value="referral">Referral</option>
              <option value="social_media">Social Media</option>
              <option value="google">Google Search</option>
              <option value="press">Press / Media</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Privacy Consent */}
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="privacy"
              name="privacy"
              required
              className="mt-1 w-4 h-4 rounded border border-dxb-band bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dxb-gold"
            />
            <Label htmlFor="privacy" className="mt-0">
              I agree to the privacy policy and consent to being contacted about membership and services. *
            </Label>
          </div>

          {/* Submit */}
          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? 'Sending...' : 'Request Consultation'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
