import { NextResponse, type NextRequest } from 'next/server'
import createMiddleware from 'next-intl/middleware'
import { locales, defaultLocale } from './i18n.config'

const intl = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'as-needed',
})

/** Constant-time comparison so the password check does not leak timing. */
function safeEqual(a: string, b: string) {
  if (a.length !== b.length) return false
  let out = 0
  for (let i = 0; i < a.length; i++) out |= a.charCodeAt(i) ^ b.charCodeAt(i)
  return out === 0
}

/**
 * /admin is the team's booking desk: HTTP Basic auth with ADMIN_USER and
 * ADMIN_PASSWORD. Without both set, the area does not exist (404).
 */
function admin(request: NextRequest) {
  const user = process.env.ADMIN_USER
  const pass = process.env.ADMIN_PASSWORD
  if (!user || !pass) return new NextResponse('Not found', { status: 404 })
  const header = request.headers.get('authorization') ?? ''
  if (header.startsWith('Basic ')) {
    const [u, ...rest] = atob(header.slice(6)).split(':')
    if (safeEqual(u, user) && safeEqual(rest.join(':'), pass)) {
      const res = NextResponse.next()
      res.headers.set('X-Robots-Tag', 'noindex, nofollow')
      res.headers.set('Cache-Control', 'no-store')
      return res
    }
  }
  return new NextResponse('Authentication required', { status: 401, headers: { 'WWW-Authenticate': 'Basic realm="DXB TKTS admin", charset="UTF-8"' } })
}

export default function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === '/admin' || request.nextUrl.pathname.startsWith('/admin/')) return admin(request)
  return intl(request)
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*|__nextjs_original-stack-frame).*)'],
}
