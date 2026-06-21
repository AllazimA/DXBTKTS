/**
 * Twelve Data API — 800 requests per day (free tier)
 * Get your key at: https://twelvedata.com/
 * Then set VITE_TWELVEDATA_KEY in your .env file
 */

const BASE = "https://api.twelvedata.com";

function getKey() {
  // Next.js public env variables
  if (typeof window !== 'undefined') {
    return window.__NEXT_PUBLIC_TWELVEDATA_KEY || process.env.NEXT_PUBLIC_TWELVEDATA_KEY || "demo";
  }
  return process.env.VITE_TWELVEDATA_KEY || process.env.NEXT_PUBLIC_TWELVEDATA_KEY || "demo";
}

async function tdFetch(params) {
  const url = `${BASE}/${params.path}?${new URLSearchParams({ 
    ...params.query, 
    apikey: getKey() 
  })}`;
  
  console.log(`📡 Twelve Data request: ${url}`);
  
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Twelve Data error ${res.status}`);

  const data = await res.json();
  
  // Check for API errors
  if (data.status === 'error' || data.code === 401) {
    throw new Error(`Invalid API key or rate limit - check VITE_TWELVEDATA_KEY in .env`);
  }
  if (data.code === 429) {
    throw new Error(`Rate limit reached (800/day) - wait and retry`);
  }

  return data;
}

/**
 * Search for ticker symbols by keyword
 * Returns array of matching symbols
 */
export async function searchSymbols(query) {
  try {
    const data = await tdFetch({
      path: 'symbol_search',
      query: { symbol: query }
    });

    if (!data.data || !Array.isArray(data.data)) {
      return [];
    }

    return data.data.map(item => ({
      symbol: item.symbol,
      name: item.instrument_name || item.description || 'Unknown',
      type: item.instrument_type || 'stock',
      exchange: item.exchange || 'Unknown'
    }));
  } catch (err) {
    throw new Error(`Symbol search failed: ${err.message}`);
  }
}

/**
 * Get quote (current price) for a symbol
 */
export async function getQuote(symbol) {
  try {
    const data = await tdFetch({
      path: 'quote',
      query: { 
        symbol: symbol,
        fields: 'symbol,name,exchange,last_price,bid,ask,change,percent_change,open,high,low'
      }
    });

    if (data.status === 'error' || !data.symbol) {
      throw new Error(`Symbol not found: ${symbol}`);
    }

    return {
      symbol: data.symbol,
      name: data.name || data.symbol,
      price: parseFloat(data.last_price || 0),
      bid: parseFloat(data.bid || 0),
      ask: parseFloat(data.ask || 0),
      change: parseFloat(data.change || 0),
      changePct: parseFloat(data.percent_change || 0),
      open: parseFloat(data.open || 0),
      high: parseFloat(data.high || 0),
      low: parseFloat(data.low || 0),
      exchange: data.exchange || 'Unknown',
      source: 'twelvedata'
    };
  } catch (err) {
    throw new Error(`Quote fetch failed: ${err.message}`);
  }
}

export async function getFullData(symbol) {
  try {
    const data = await tdFetch({
      path: 'quote',
      query: { 
        symbol: symbol,
        fields: 'symbol,name,exchange,country,sector,industry,last_price,bid,ask,change,percent_change,open,high,low,close,volume'
      }
    });

    if (data.status === 'error' || !data.symbol) {
      throw new Error(`Symbol not found: ${symbol}`);
    }

    return data;
  } catch (err) {
    throw new Error(`Full data fetch failed: ${err.message}`);
  }
}
