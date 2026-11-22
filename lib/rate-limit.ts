// Best-effort in-memory rate limit, per server instance and per bucket.
const buckets = new Map<string, number[]>()

export function rateLimited(bucket: string, ip: string, limit = 5, windowMs = 10 * 60 * 1000) {
  const key = `${bucket}:${ip}`
  const now = Date.now()
  const recent = (buckets.get(key) || []).filter(t => now - t < windowMs)
  recent.push(now)
  buckets.set(key, recent)
  return recent.length > limit
}

export function clientIp(headers: Headers) {
  return headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'local'
}
