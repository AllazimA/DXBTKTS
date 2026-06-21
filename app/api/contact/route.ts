import { Resend } from 'resend'
import { NextRequest, NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const { name, email, phone, nationality, arrivalDate, departureDate, guests, service, message } = body

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        {
          status: 400,
          headers: {
            'Access-Control-Allow-Origin': '*',
          }
        }
      )
    }

    const emailContent = `
<div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6; max-width: 600px;">
  <h2 style="color: #333; border-bottom: 2px solid #ddd; padding-bottom: 10px;">New Concierge Request</h2>

  <h3 style="color: #555; margin-top: 20px; margin-bottom: 10px;">Sender Details</h3>
  <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
    <tr>
      <td style="padding: 8px; border-bottom: 1px solid #eee; width: 120px;"><strong>Name:</strong></td>
      <td style="padding: 8px; border-bottom: 1px solid #eee;">${name}</td>
    </tr>
    <tr>
      <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Email:</strong></td>
      <td style="padding: 8px; border-bottom: 1px solid #eee;"><a href="mailto:${email}">${email}</a></td>
    </tr>
    ${phone ? `<tr>
      <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Phone:</strong></td>
      <td style="padding: 8px; border-bottom: 1px solid #eee;">${phone}</td>
    </tr>` : ''}
    ${nationality ? `<tr>
      <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Nationality:</strong></td>
      <td style="padding: 8px; border-bottom: 1px solid #eee;">${nationality}</td>
    </tr>` : ''}
  </table>

  ${arrivalDate || departureDate || guests || service ? `
  <h3 style="color: #555; margin-top: 20px; margin-bottom: 10px;">Trip Details</h3>
  <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
    ${arrivalDate ? `<tr>
      <td style="padding: 8px; border-bottom: 1px solid #eee; width: 120px;"><strong>Arrival Date:</strong></td>
      <td style="padding: 8px; border-bottom: 1px solid #eee;">${arrivalDate}</td>
    </tr>` : ''}
    ${departureDate ? `<tr>
      <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Departure Date:</strong></td>
      <td style="padding: 8px; border-bottom: 1px solid #eee;">${departureDate}</td>
    </tr>` : ''}
    ${guests ? `<tr>
      <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Number of Guests:</strong></td>
      <td style="padding: 8px; border-bottom: 1px solid #eee;">${guests}</td>
    </tr>` : ''}
    ${service ? `<tr>
      <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Service Required:</strong></td>
      <td style="padding: 8px; border-bottom: 1px solid #eee;">${service}</td>
    </tr>` : ''}
  </table>
  ` : ''}

  <h3 style="color: #555; margin-top: 20px; margin-bottom: 10px;">Message</h3>
  <div style="background-color: #f5f5f5; padding: 12px; border-left: 3px solid #ccc; margin-bottom: 20px;">
    <p style="margin: 0; white-space: pre-wrap;">${message}</p>
  </div>

  <div style="margin-top: 30px; padding-top: 15px; border-top: 1px solid #ddd; font-size: 12px; color: #888;">
    <p style="margin: 0;">Received from Lavish Morocco contact form</p>
    <p style="margin: 5px 0 0 0;">${new Date().toLocaleString()}</p>
  </div>
</div>
    `.trim()

    console.log('Sending email via Resend:', { from: 'hello@lavishmorocco.com', to: 'contact@lavishmorocco.com', name, email })

    const result = await resend.emails.send({
      from: 'Lavish Morocco <hello@lavishmorocco.com>',
      to: 'contact@lavishmorocco.com',
      replyTo: email,
      subject: `Concierge Request from ${name}`,
      html: emailContent,
    })

    console.log('Resend response:', { success: !result.error, error: result.error, id: result.data?.id })

    if (result.error) {
      console.error('Resend error:', result.error)
      return NextResponse.json(
        { error: 'Failed to send email' },
        {
          status: 500,
          headers: {
            'Access-Control-Allow-Origin': '*',
          }
        }
      )
    }

    return NextResponse.json(
      { success: true, id: result.data?.id },
      {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
        }
      }
    )
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      {
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
        }
      }
    )
  }
}
