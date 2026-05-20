/**
 * CoinGecko API — Free, no API key required, no rate limits
 * Perfect fallback when Alpha Vantage is rate-limited
 * Supports: Crypto, stocks, commodities
 */

const BASE = "https://api.coingecko.com/api/v3";

// Mapping of stock symbols to CoinGecko crypto IDs
// CoinGecko has excellent crypto coverage but limited stocks
const CRYPTO_MAP = {
  'BTC': 'bitcoin',
  'ETH': 'ethereum',
  'BNB': 'binancecoin',
  'XRP': 'ripple',
  'SOL': 'solana',
  'ADA': 'cardano',
  'DOGE': 'dogecoin',
  'DOT': 'polkadot',
  'MATIC': 'matic-network',
  'LINK': 'chainlink',
};

// Stock symbol to CoinGecko equivalent (uses stock tickers)
const STOCK_MAP = {
  'AAPL': 'apple-inc', // Using company ID instead of ticker
  'MSFT': 'microsoft-corporation',
  'GOOGL': 'alphabet-inc',
  'AMZN': 'amazon-com-inc',
  'TSLA': 'tesla-inc',
  // Add more as needed
};

/**
 * Fetch price from CoinGecko
 * Supports crypto by ID (bitcoin, ethereum, etc.)
 */
export async function getCoinGeckoPrice(id, vs_currency = 'usd') {
  try {
    const url = `${BASE}/simple/price?ids=${id}&vs_currencies=${vs_currency}&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true`;

    const res = await fetch(url);
    if (!res.ok) throw new Error(`CoinGecko error ${res.status}`);

    const data = await res.json();

    if (!data[id]) {
      throw new Error(`No data for ${id}`);
    }

    const price = data[id][vs_currency];
    const change24h = data[id][`${vs_currency}_24h_change`] || 0;

    return {
      symbol: id,
      price,
      change24h,
      marketCap: data[id][`${vs_currency}_market_cap`],
      volume24h: data[id][`${vs_currency}_24h_vol`],
      source: 'coingecko'
    };
  } catch (err) {
    throw new Error(`CoinGecko fetch failed: ${err.message}`);
  }
}

/**
 * Search CoinGecko for crypto assets
 */
export async function searchCoinGecko(query) {
  try {
    const url = `${BASE}/search?query=${encodeURIComponent(query)}`;

    const res = await fetch(url);
    if (!res.ok) throw new Error(`CoinGecko search error ${res.status}`);

    const data = await res.json();

    return (data.coins || []).slice(0, 5).map(coin => ({
      symbol: coin.symbol.toUpperCase(),
      name: coin.name,
      id: coin.id,
      thumb: coin.thumb,
      source: 'coingecko'
    }));
  } catch (err) {
    console.warn('CoinGecko search failed:', err.message);
    return [];
  }
}

/**
 * Get full crypto data from CoinGecko
 */
export async function getFullCryptoData(id) {
  try {
    const url = `${BASE}/coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false`;

    const res = await fetch(url);
    if (!res.ok) throw new Error(`CoinGecko error ${res.status}`);

    return await res.json();
  } catch (err) {
    throw new Error(`Failed to fetch crypto data: ${err.message}`);
  }
}

/**
 * Get top 100 cryptocurrencies (for watchlist)
 */
export async function getTopCryptos(limit = 100) {
  try {
    const url = `${BASE}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${Math.min(limit, 250)}&page=1&sparkline=false`;

    const res = await fetch(url);
    if (!res.ok) throw new Error(`CoinGecko error ${res.status}`);

    return await res.json();
  } catch (err) {
    throw new Error(`Failed to fetch top cryptos: ${err.message}`);
  }
}

/**
 * Is this a crypto symbol (BTC, ETH, etc)?
 */
export function isCryptoSymbol(symbol) {
  return symbol.toUpperCase() in CRYPTO_MAP;
}

/**
 * Get crypto ID from symbol
 */
export function getCryptoId(symbol) {
  return CRYPTO_MAP[symbol.toUpperCase()];
}
