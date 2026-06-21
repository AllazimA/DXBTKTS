import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    const { name, email, phone, contact_method, interest } = body

    if (!name || !email || !phone || !contact_method || !interest) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // TODO: Integrate with Zoho CRM via lib/api/zoho.ts
    // const lead = await createZohoLead({
    //   name,
    //   email,
    //   phone,
    //   source: 'website_enquiry',
    //   interest,
    //   message: body.message,
    // })

    // Mock response - ready to connect to real backend
    console.log('Enquiry received:', { name, email, phone, interest })

    return NextResponse.json(
      {
        success: true,
        message: 'Enquiry received. We will be in touch within 24 hours.',
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Enquiry error:', error)
    return NextResponse.json(
      { error: 'Failed to process enquiry' },
      { status: 500 }
    )
  }
}
