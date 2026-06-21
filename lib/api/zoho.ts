// DXB TKTS — Zoho CRM Integration Stubs
// These are placeholder functions ready to connect to Zoho CRM
// Do NOT add real API keys here — use environment variables only

interface CreateLeadPayload {
  name: string
  email: string
  phone: string
  source: string
  interest?: string
  message?: string
  company?: string
}

interface CreateTicketPayload {
  subject: string
  description: string
  contact_email: string
  priority?: 'low' | 'medium' | 'high'
  category?: string
}

/**
 * Create a lead in Zoho CRM from a website enquiry
 * @param payload Lead data from website form
 * @returns Lead ID or error
 *
 * TODO: Implement Zoho CRM API call
 * Requires: ZOHO_CRM_API_TOKEN, NEXT_PUBLIC_ZOHO_ORG_ID
 * Endpoint: https://www.zohoapis.com/crm/v3/leads
 */
export async function createZohoLead(payload: CreateLeadPayload) {
  // Placeholder — mocks success
  console.log('→ [STUB] Creating Zoho lead:', payload)

  // When ready, implement:
  // const response = await fetch(`https://www.zohoapis.com/crm/v3/leads`, {
  //   method: 'POST',
  //   headers: {
  //     'Authorization': `Bearer ${process.env.ZOHO_CRM_API_TOKEN}`,
  //     'Content-Type': 'application/json',
  //     'X-ZOHO-ORG-ID': process.env.NEXT_PUBLIC_ZOHO_ORG_ID!,
  //   },
  //   body: JSON.stringify({
  //     data: [
  //       {
  //         Last_Name: payload.name,
  //         Email: payload.email,
  //         Phone: payload.phone,
  //         Source: payload.source,
  //         Custom_Field: payload.interest,
  //         Description: payload.message,
  //       },
  //     ],
  //   }),
  // })
  // if (!response.ok) throw new Error('Zoho API error')
  // const data = await response.json()
  // return data.data[0].id

  return {
    success: true,
    leadId: `lead_${Date.now()}`,
    message: 'Mock lead created (ready for Zoho integration)',
  }
}

/**
 * Create a support ticket in Zoho Desk
 * @param payload Ticket data from portal request form
 * @returns Ticket ID or error
 *
 * TODO: Implement Zoho Desk API call
 * Requires: ZOHO_DESK_API_TOKEN, ZOHO_DESK_DEPARTMENT_ID
 * Endpoint: https://desk.zoho.com/api/v1/tickets
 */
export async function createZohoTicket(payload: CreateTicketPayload) {
  // Placeholder — mocks success
  console.log('→ [STUB] Creating Zoho ticket:', payload)

  // When ready, implement:
  // const response = await fetch('https://desk.zoho.com/api/v1/tickets', {
  //   method: 'POST',
  //   headers: {
  //     'Authorization': `Bearer ${process.env.ZOHO_DESK_API_TOKEN}`,
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({
  //     subject: payload.subject,
  //     description: payload.description,
  //     email: payload.contact_email,
  //     priority: payload.priority || 'medium',
  //     departmentId: process.env.ZOHO_DESK_DEPARTMENT_ID,
  //   }),
  // })
  // if (!response.ok) throw new Error('Zoho Desk API error')
  // const data = await response.json()
  // return data.id

  return {
    success: true,
    ticketId: `ticket_${Date.now()}`,
    message: 'Mock ticket created (ready for Zoho Desk integration)',
  }
}

/**
 * Send a transactional email via Zoho CRM
 * @param to Recipient email
 * @param subject Email subject
 * @param html HTML email body
 */
export async function sendZohoEmail(to: string, subject: string, html: string) {
  // Placeholder — logs email details
  console.log('→ [STUB] Sending email via Zoho:', { to, subject })

  return {
    success: true,
    messageId: `msg_${Date.now()}`,
    message: 'Mock email sent (ready for Zoho integration)',
  }
}
