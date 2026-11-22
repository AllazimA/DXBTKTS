import type { MetadataRoute } from 'next'
import { locales, defaultLocale } from '@/i18n.config'
import { absoluteUrl } from '@/lib/site'
import { categories, products } from '@/data/catalogue'
import { articles } from '@/content/journal'
import { packages } from '@/data/packages'

const staticRoutes = ['/', '/about', '/experiences', '/services', '/membership', '/corporate', '/request', '/contact', '/tickets', '/blog', '/packages', '/dining', '/nightlife', '/sourcing', '/legal/privacy', '/legal/terms', '/legal/cookies']

const routes = [
  ...staticRoutes,
  ...categories.map(c => `/experiences/${c.slug}`),
  ...products.map(p => `/experiences/${p.category}/${p.slug}`),
  ...articles.map(a => `/blog/${a.slug}`),
  ...packages.map(p => `/packages/${p.slug}`),
]

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map(path => {
    const languages: Record<string, string> = {}
    for (const l of locales) languages[l] = absoluteUrl(l, path)
    return {
      url: absoluteUrl(defaultLocale, path),
      changeFrequency: 'monthly' as const,
      priority: path === '/' ? 1 : path.startsWith('/legal') ? 0.2 : path.startsWith('/experiences') ? 0.9 : 0.6,
      alternates: { languages },
    }
  })
}
