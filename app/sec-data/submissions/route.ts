export async function GET(request: Request) {
  const url = new URL(request.url)
  const pathname = url.pathname.replace('/sec-data', '')

  try {
    const response = await fetch(`https://data.sec.gov${pathname}`)
    if (!response.ok) {
      return Response.json(
        { error: `SEC API returned ${response.status}` },
        { status: response.status }
      )
    }
    const data = await response.json()
    return Response.json(data, {
      headers: {
        'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
      },
    })
  } catch (error) {
    return Response.json(
      { error: 'Failed to fetch SEC submissions data' },
      { status: 500 }
    )
  }
}
