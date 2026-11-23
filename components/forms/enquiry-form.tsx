'use client'

import { HONEYPOT_FIELD } from '@/lib/honeypot-field'
import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export function EnquiryForm() {
  const t = useTranslations('contact.form')
  const contactOptions = t.raw('contactOptions') as Record<string, string>
  const interestOptions = t.raw('interestOptions') as Record<string, string>
  const referralOptions = t.raw('referralOptions') as Record<string, string>

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
          [HONEYPOT_FIELD]: formData.get(HONEYPOT_FIELD),
          page: window.location.pathname,
          locale: document.documentElement.lang,
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
      <Card>
        <CardHeader>
          <CardTitle className="text-dxb-navy">{t('successTitle')}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-dxb-slate">{t('successCopy')}</p>
        </CardContent>
      </Card>
    )
  }

  const selectStyles =
  'mt-2 flex h-12 w-full border border-dxb-line bg-white px-4 text-[15px] text-dxb-ink focus-visible:outline-none focus-visible:border-dxb-cobalt focus-visible:ring-2 focus-visible:ring-dxb-cobalt/25'

  return (
    <div className="dxb-lift">
    <Card className="dxb-cut-lg">
      <CardHeader className="bg-dxb-orange border-0 px-7 md:px-10 py-5">
        <CardTitle className="text-dxb-ink text-2xl font-extrabold">{t('title')}</CardTitle>
        <CardDescription className="text-dxb-ink/75">{t('subtitle')}</CardDescription>
      </CardHeader>
      <CardContent className="p-7 md:p-10 pt-7 md:pt-10">
        <form onSubmit={handleSubmit} className="relative space-y-6">
          <input
            type="text"
            name={HONEYPOT_FIELD} data-1p-ignore data-lpignore="true" data-form-type="other"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="absolute -left-[9999px] h-0 w-0 opacity-0"
          />
          {/* Name */}
          <div>
            <Label htmlFor="name">{t('name')}</Label>
            <Input id="name" name="name" type="text" required placeholder={t('namePlaceholder')} className="mt-2" />
          </div>

          {/* Email */}
          <div>
            <Label htmlFor="email">{t('email')}</Label>
            <Input id="email" name="email" type="email" required placeholder={t('emailPlaceholder')} className="mt-2" dir="ltr" />
          </div>

          {/* Phone */}
          <div>
            <Label htmlFor="phone">{t('phone')}</Label>
            <Input id="phone" name="phone" type="tel" required placeholder={t('phonePlaceholder')} className="mt-2" dir="ltr" />
          </div>

          {/* Preferred Contact Method */}
          <div>
            <Label htmlFor="contact_method">{t('contactMethod')}</Label>
            <select id="contact_method" name="contact_method" required className={selectStyles}>
              <option value="">{t('contactMethodPlaceholder')}</option>
              {Object.entries(contactOptions).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          {/* Interest */}
          <div>
            <Label htmlFor="interest">{t('interest')}</Label>
            <select id="interest" name="interest" required className={selectStyles}>
              <option value="">{t('interestPlaceholder')}</option>
              {Object.entries(interestOptions).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          {/* Message */}
          <div>
            <Label htmlFor="message">{t('message')}</Label>
            <textarea
              id="message"
              name="message"
              placeholder={t('messagePlaceholder')}
              rows={4}
              className="mt-2 flex w-full border border-dxb-line bg-white px-4 py-3 text-[15px] focus-visible:outline-none focus-visible:border-dxb-cobalt focus-visible:ring-2 focus-visible:ring-dxb-cobalt/25"
            />
          </div>

          {/* Referral Source */}
          <div>
            <Label htmlFor="referral_source">{t('referral')}</Label>
            <select id="referral_source" name="referral_source" className={selectStyles}>
              <option value="">{t('referralPlaceholder')}</option>
              {Object.entries(referralOptions).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          {/* Privacy Consent */}
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="privacy"
              name="privacy"
              required
              className="mt-1 w-4 h-4 accent-[#2F3DF0]"
            />
            <Label htmlFor="privacy" className="mt-0">
              {t('privacy')}
            </Label>
          </div>

          {/* Submit */}
          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? t('sending') : t('submit')}
          </Button>
        </form>
      </CardContent>
    </Card>
    </div>
  )
}
