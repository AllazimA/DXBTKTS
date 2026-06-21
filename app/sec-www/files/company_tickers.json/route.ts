export async function GET() {
  try {
    const response = await fetch('https://www.sec.gov/files/company_tickers.json')
    if (!response.ok) {
      return Response.json(
        { error: `SEC API returned ${response.status}` },
        { status: response.status }
      )
    }
    const data = await response.json()
    return Response.json(data, {
      headers: {
        'Cache-Control': 'public, max-age=86400', // Cache for 24 hours
      },
    })
  } catch (error) {
    return Response.json(
      { error: 'Failed to fetch SEC ticker data' },
      { status: 500 }
    )
  }
}
