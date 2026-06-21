import { NextRequest, NextResponse } from 'next/server'

// Real Market Data APIs
const ALPHA_VANTAGE_KEY = process.env.ALPHA_VANTAGE_KEY || process.env.VITE_ALPHA_VANTAGE_KEY
const TWELVEDATA_KEY = process.env.TWELVEDATA_KEY || process.env.VITE_TWELVEDATA_KEY
const ALPHA_VANTAGE_BASE = 'https://www.alphavantage.co/query'
const TWELVEDATA_BASE = 'https://api.twelvedata.com'

async function fetchFromAlphaVantage(symbol: string) {
  try {
    const params = new URLSearchParams({
      function: 'GLOBAL_QUOTE',
      symbol: symbol,
      apikey: ALPHA_VANTAGE_KEY || 'demo',
    })

    const res = await fetch(`${ALPHA_VANTAGE_BASE}?${params}`)
    const data = await res.json()

    if (data['Error Message'] || !data['Global Quote'] || !data['Global Quote']['05. price']) {
      return null
    }

    const quote = data['Global Quote']
    return {
      symbol: quote['01. symbol'],
      price: parseFloat(quote['05. price']),
      open: parseFloat(quote['02. open']),
      high: parseFloat(quote['03. high']),
      low: parseFloat(quote['04. low']),
      volume: parseInt(quote['06. volume']),
      change: parseFloat(quote['09. change']),
      changePercent: parseFloat(quote['10. change percent']),
      source: 'Alpha Vantage',
    }
  } catch (error) {
    console.error(`Alpha Vantage fetch failed for ${symbol}:`, error)
    return null
  }
}

async function fetchFromTwelveData(symbol: string) {
  try {
    const params = new URLSearchParams({
      symbol: symbol,
      apikey: TWELVEDATA_KEY || 'demo',
      fields: 'symbol,name,exchange,last_price,change,percent_change,open,high,low,volume',
    })

    const res = await fetch(`${TWELVEDATA_BASE}/quote?${params}`)
    const data = await res.json()

    if (data.status === 'error' || !data.last_price) {
      return null
    }

    return {
      symbol: data.symbol,
      price: parseFloat(data.last_price),
      open: parseFloat(data.open || 0),
      high: parseFloat(data.high || 0),
      low: parseFloat(data.low || 0),
      volume: parseInt(data.volume || 0),
      change: parseFloat(data.change || 0),
      changePercent: parseFloat(data.percent_change || 0),
      source: 'Twelve Data',
    }
  } catch (error) {
    console.error(`Twelve Data fetch failed for ${symbol}:`, error)
    return null
  }
}

// Fallback mock data if real API fails
const MOCK_STOCKS: Record<string, any> = {
  AAPL: {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    price: 189.95,
    change: 2.45,
    changePercent: 1.31,
    high52Week: 199.62,
    low52Week: 164.08,
    volume: 52_000_000,
    marketCap: 2_950_000_000_000,
    pe: 32.5,
    dividendYield: 0.0045,
    beta: 1.25,
    description:
      'Apple Inc. is an American multinational technology company that specializes in consumer electronics, computer software, and online services.',
    industry: 'Technology',
    website: 'https://www.apple.com',
    priceHistory: generateMockPriceHistory(189.95, 30),
    technicalIndicators: {
      sma50: 185.32,
      sma200: 178.45,
      rsi: 65.4,
    },
  },
  MSFT: {
    symbol: 'MSFT',
    name: 'Microsoft Corporation',
    price: 416.22,
    change: 5.18,
    changePercent: 1.26,
    high52Week: 437.67,
    low52Week: 327.68,
    volume: 19_500_000,
    marketCap: 3_100_000_000_000,
    pe: 35.8,
    dividendYield: 0.0072,
    beta: 0.95,
    description:
      'Microsoft Corporation is an American technology corporation that develops, manufactures, licenses, supports, and sells computer software, consumer electronics, personal computers, and related services.',
    industry: 'Technology',
    website: 'https://www.microsoft.com',
    priceHistory: generateMockPriceHistory(416.22, 30),
    technicalIndicators: {
      sma50: 410.15,
      sma200: 395.32,
      rsi: 62.8,
    },
  },
  GOOGL: {
    symbol: 'GOOGL',
    name: 'Alphabet Inc.',
    price: 177.45,
    change: 2.15,
    changePercent: 1.23,
    high52Week: 203.48,
    low52Week: 136.57,
    volume: 21_300_000,
    marketCap: 1_750_000_000_000,
    pe: 28.4,
    dividendYield: 0.0,
    beta: 1.05,
    description:
      'Alphabet Inc. is an American multinational conglomerate and technology company. It is the parent company of Google, a search engine and advertising company that represents the majority of its business and revenue.',
    industry: 'Technology',
    website: 'https://www.google.com',
    priceHistory: generateMockPriceHistory(177.45, 30),
    technicalIndicators: {
      sma50: 173.82,
      sma200: 168.95,
      rsi: 58.3,
    },
  },
  TSLA: {
    symbol: 'TSLA',
    name: 'Tesla, Inc.',
    price: 242.84,
    change: -3.22,
    changePercent: -1.31,
    high52Week: 299.29,
    low52Week: 155.87,
    volume: 126_000_000,
    marketCap: 768_000_000_000,
    pe: 68.5,
    dividendYield: 0.0,
    beta: 2.35,
    description:
      'Tesla, Inc. is an American electric vehicle and clean energy company. The company specializes in electric vehicle manufacturing and solar panel production.',
    industry: 'Automotive',
    website: 'https://www.tesla.com',
    priceHistory: generateMockPriceHistory(242.84, 30),
    technicalIndicators: {
      sma50: 248.95,
      sma200: 235.12,
      rsi: 45.2,
    },
  },
  NVDA: {
    symbol: 'NVDA',
    name: 'NVIDIA Corporation',
    price: 875.34,
    change: 12.45,
    changePercent: 1.44,
    high52Week: 969.27,
    low52Week: 398.82,
    volume: 35_400_000,
    marketCap: 2_150_000_000_000,
    pe: 54.2,
    dividendYield: 0.0036,
    beta: 1.82,
    description:
      'NVIDIA Corporation is an American technology company that designs graphics processing units (GPUs) for gaming and professional markets.',
    industry: 'Technology',
    website: 'https://www.nvidia.com',
    priceHistory: generateMockPriceHistory(875.34, 30),
    technicalIndicators: {
      sma50: 862.15,
      sma200: 725.48,
      rsi: 71.5,
    },
  },
  KO: {
    symbol: 'KO',
    name: 'The Coca-Cola Company',
    price: 60.52,
    change: 0.52,
    changePercent: 0.87,
    high52Week: 68.29,
    low52Week: 54.38,
    volume: 12_300_000,
    marketCap: 268_000_000_000,
    pe: 25.8,
    dividendYield: 0.0302,
    beta: 0.62,
    description:
      'The Coca-Cola Company is a beverage manufacturer and distributor with a portfolio of brands.',
    industry: 'Consumer Staples',
    website: 'https://www.coca-cola.com',
    priceHistory: generateMockPriceHistory(60.52, 30),
    technicalIndicators: {
      sma50: 59.85,
      sma200: 58.92,
      rsi: 52.3,
    },
  },
  AAPL: {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    price: 189.95,
    change: 2.45,
    changePercent: 1.31,
    high52Week: 199.62,
    low52Week: 164.08,
    volume: 52_000_000,
    marketCap: 2_950_000_000_000,
    pe: 32.5,
    dividendYield: 0.0045,
    beta: 1.25,
    description:
      'Apple Inc. is an American multinational technology company.',
    industry: 'Technology',
    website: 'https://www.apple.com',
    priceHistory: generateMockPriceHistory(189.95, 30),
    technicalIndicators: {
      sma50: 185.32,
      sma200: 178.45,
      rsi: 65.4,
    },
  },
  DIS: {
    symbol: 'DIS',
    name: 'The Walt Disney Company',
    price: 92.67,
    change: 1.25,
    changePercent: 1.37,
    high52Week: 123.74,
    low52Week: 78.73,
    volume: 8_900_000,
    marketCap: 169_000_000_000,
    pe: 18.5,
    dividendYield: 0.0055,
    beta: 1.12,
    description:
      'The Walt Disney Company is an American multinational entertainment conglomerate.',
    industry: 'Communication Services',
    website: 'https://www.disney.com',
    priceHistory: generateMockPriceHistory(92.67, 30),
    technicalIndicators: {
      sma50: 90.15,
      sma200: 87.42,
      rsi: 58.9,
    },
  },
  C: {
    symbol: 'C',
    name: 'Citigroup Inc.',
    price: 59.24,
    change: -0.35,
    changePercent: -0.59,
    high52Week: 72.48,
    low52Week: 47.38,
    volume: 19_200_000,
    marketCap: 128_000_000_000,
    pe: 8.5,
    dividendYield: 0.0355,
    beta: 1.45,
    description:
      'Citigroup Inc. is a multinational investment bank and financial services corporation.',
    industry: 'Financials',
    website: 'https://www.citigroup.com',
    priceHistory: generateMockPriceHistory(59.24, 30),
    technicalIndicators: {
      sma50: 58.92,
      sma200: 56.73,
      rsi: 48.2,
    },
  },
  AXP: {
    symbol: 'AXP',
    name: 'American Express Company',
    price: 256.84,
    change: 3.15,
    changePercent: 1.24,
    high52Week: 294.82,
    low52Week: 189.72,
    volume: 4_520_000,
    marketCap: 195_000_000_000,
    pe: 16.8,
    dividendYield: 0.0087,
    beta: 1.35,
    description:
      'American Express Company is a global financial services corporation.',
    industry: 'Financials',
    website: 'https://www.americanexpress.com',
    priceHistory: generateMockPriceHistory(256.84, 30),
    technicalIndicators: {
      sma50: 252.15,
      sma200: 238.45,
      rsi: 64.5,
    },
  },
  MA: {
    symbol: 'MA',
    name: 'Mastercard Incorporated',
    price: 486.92,
    change: 4.28,
    changePercent: 0.88,
    high52Week: 537.64,
    low52Week: 376.88,
    volume: 2_340_000,
    marketCap: 486_000_000_000,
    pe: 38.5,
    dividendYield: 0.0035,
    beta: 1.12,
    description:
      'Mastercard Incorporated is a multinational financial services corporation.',
    industry: 'Financials',
    website: 'https://www.mastercard.com',
    priceHistory: generateMockPriceHistory(486.92, 30),
    technicalIndicators: {
      sma50: 478.15,
      sma200: 455.82,
      rsi: 62.3,
    },
  },
}

function generateMockPriceHistory(
  currentPrice: number,
  days: number
) {
  const history = []
  let price = currentPrice * 0.92 // Start lower

  for (let i = days; i >= 0; i--) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })

    // Random walk
    price = price * (0.98 + Math.random() * 0.04)

    const open = price
    const close = price * (0.99 + Math.random() * 0.02)
    const high = Math.max(open, close) * (1 + Math.random() * 0.02)
    const low = Math.min(open, close) * (1 - Math.random() * 0.02)
    const volume = Math.floor(20_000_000 + Math.random() * 40_000_000)

    history.push({
      date: dateStr,
      open: Number(open.toFixed(2)),
      high: Number(high.toFixed(2)),
      low: Number(low.toFixed(2)),
      close: Number(close.toFixed(2)),
      volume,
    })

    price = close
  }

  return history
}

export async function GET(
  request: NextRequest,
  { params }: { params: { symbol: string } }
) {
  try {
    const symbol = params.symbol.toUpperCase()
    const timeframe = request.nextUrl.searchParams.get('timeframe') || '1M'

    // Try to fetch real data from both APIs
    let stockData = await fetchFromAlphaVantage(symbol)

    // If Alpha Vantage fails, try Twelve Data
    if (!stockData) {
      stockData = await fetchFromTwelveData(symbol)
    }

    // Fall back to mock data if both real APIs fail
    if (!stockData) {
      stockData = MOCK_STOCKS[symbol]
    }

    if (!stockData) {
      return NextResponse.json(
        { error: `Stock symbol "${symbol}" not found` },
        { status: 404 }
      )
    }

    // Filter price history based on timeframe (if available)
    let filteredHistory: any[] = []
    if (stockData.priceHistory && Array.isArray(stockData.priceHistory)) {
      const allHistory = stockData.priceHistory
      switch (timeframe) {
        case '1D':
          filteredHistory = allHistory.slice(-1)
          break
        case '1W':
          filteredHistory = allHistory.slice(-5)
          break
        case '1M':
          filteredHistory = allHistory.slice(-21)
          break
        case '3M':
          filteredHistory = allHistory.slice(-63)
          break
        case '1Y':
          filteredHistory = allHistory
          break
        default:
          filteredHistory = allHistory.slice(-21)
      }
    }

    return NextResponse.json({
      ...stockData,
      priceHistory: filteredHistory,
    })
  } catch (error) {
    console.error('Error fetching stock data:', error)
    return NextResponse.json(
      { error: 'Failed to fetch stock data' },
      { status: 500 }
    )
  }
}
