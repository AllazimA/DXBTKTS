const createNextIntlPlugin = require('next-intl/plugin')
const withNextIntl = createNextIntlPlugin('./i18n.ts')

// Pages removed in Stage 1 (see DXB_TKTS_IMPLEMENTATION_ROADMAP.md)
const retired = [
  ['/portal', '/'],
  ['/supplier', '/'],
  ['/styleguide', '/'],
]

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'images.unsplash.com' }],
  },
  async redirects() {
    // Renamed pages keep their sub-paths (e.g. /journal/<slug> → /blog/<slug>).
    const renamed = [
      ['/journal', '/blog'],
      ['/whats-on', '/tickets'],
      ['/experiences/signature/heritage-conservation-safari', '/experiences/signature/desert-safari-in-style'],
      ['/packages/heritage-falconry-dawn', '/packages/desert-reserve-falconry-dawn'],
    ].flatMap(([from, to]) => [
      { source: `${from}/:path*`, destination: `${to}/:path*`, permanent: true },
      { source: `/:locale(en|ar|fr)${from}/:path*`, destination: `/:locale${to}/:path*`, permanent: true },
    ])
    return renamed.concat(retired.flatMap(([from, to]) => [
      { source: `${from}/:path*`, destination: to, permanent: false },
      { source: `/:locale(en|ar|fr)${from}/:path*`, destination: `/:locale${to === '/' ? '' : to}`, permanent: false },
    ]))
  },
}

module.exports = withNextIntl(nextConfig)
