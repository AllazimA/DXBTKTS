/**
 * Alpha Vantage API — free tier: 25 req/day, 5 req/min
 * Get your key at: https://www.alphavantage.co/support/#api-key
 * Then set VITE_ALPHA_VANTAGE_KEY in your .env file
 */

const BASE = "https://www.alphavantage.co/query";
const memCache = {};

function getKey() {
  return import.meta.env.VITE_ALPHA_VANTAGE_KEY || "demo";
}

async function avFetch(params) {
  const cacheKey = JSON.stringify(params);
  // Return cached data (only successful responses are ever cached)
  if (memCache[cacheKey]) return memCache[cacheKey];

  const url = `${BASE}?${new URLSearchParams({ ...params, apikey: getKey() })}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Alpha Vantage error ${res.status}`);

  const data = await res.json();

  // Detect API-level error messages — do NOT cache these
  if (data["Note"] || (typeof data["Note"] === "string"))
    throw new Error("Rate limit reached — wait ~60 seconds and retry (free tier: 5 req/min)");
  if (data["Information"])
    throw new Error("Rate limit or invalid API key — check VITE_ALPHA_VANTAGE_KEY in .env");
  if (data["Error Message"])
    throw new Error(`Ticker not found: ${params.symbol}`);

  // Only cache successful responses so retries after rate-limit work
  memCache[cacheKey] = data;
  return data;
}

/** Current price, change, volume */
export async function getQuote(symbol) {
  const data = await avFetch({ function: "GLOBAL_QUOTE", symbol });
  const q = data["Global Quote"];
  if (!q || !q["05. price"]) throw new Error(`No quote data for ${symbol}`);
  return {
    symbol:        q["01. symbol"],
    price:         parseFloat(q["05. price"]),
    open:          parseFloat(q["02. open"]),
    high:          parseFloat(q["03. high"]),
    low:           parseFloat(q["04. low"]),
    volume:        parseInt(q["06. volume"]),
    prevClose:     parseFloat(q["08. previous close"]),
    change:        parseFloat(q["09. change"]),
    changePct:     parseFloat(q["10. change percent"]),
    latestDay:     q["07. latest trading day"],
  };
}

/**
 * Full company overview — PE, EPS, market cap, margins, 52w high/low,
 * beta, dividend yield, analyst target, sector, description, etc.
 */
export async function getOverview(symbol) {
  const data = await avFetch({ function: "OVERVIEW", symbol });
  if (!data["Symbol"]) throw new Error(`No overview for ${symbol}`);
  return data;
}

/** Search for ticker symbol by keyword */
export async function searchSymbol(keywords) {
  const data = await avFetch({ function: "SYMBOL_SEARCH", keywords });
  return data["bestMatches"] || [];
}

/**
 * Convenience: fetch quote + overview in parallel.
 * Returns a merged object ready for StockAnalysis.
 */
export async function getFullStock(symbol) {
  const [quote, overview] = await Promise.all([
    getQuote(symbol),
    getOverview(symbol).catch(() => ({})), // overview might be empty for non-US stocks
  ]);
  return { quote, overview };
}
