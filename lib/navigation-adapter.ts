import { useRouter } from 'next/navigation'

/**
 * Adapter for React Router's useNavigate to work with Next.js
 * Provides drop-in replacement for: const navigate = useNavigate()
 */
export function useNavigate() {
  const router = useRouter()

  return (path: string) => {
    router.push(path)
  }
}

/**
 * Adapter function to convert React Router navigate calls
 * OLD: navigate(createPageUrl("ClientDetail") + `?id=${id}`)
 * NEW: navigate(`/dashboard/clients/${id}`)
 *
 * This helper maps old page names to new Next.js routes
 */
export function createPageUrl(pageName: string): string {
  const pageMap: Record<string, string> = {
    'ClientDetail': '/dashboard/clients',
    'PortfolioDetail': '/dashboard/portfolios',
    'Clients': '/dashboard/clients',
    'Portfolios': '/dashboard/portfolios',
    'Dashboard': '/dashboard',
    'VirtualPortfolio': '/dashboard/virtual-portfolio',
    'StockAnalysis': '/dashboard/stock-analysis',
    'Watchlist': '/dashboard/watchlist',
    'TodaysMarket': '/dashboard/todays-market',
    'Reports': '/dashboard/reports',
    'NewsResearch': '/dashboard/news-research',
    'ClientAssessment': '/dashboard/client-assessment',
    'PortfolioBuilder': '/dashboard/portfolio-builder',
    'Settings': '/dashboard/settings',
  }

  return pageMap[pageName] || '/' + pageName.replace(/ /g, '-').toLowerCase()
}
