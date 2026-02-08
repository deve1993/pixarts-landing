import { NextRequest, NextResponse } from 'next/server'
import { quoteFormSchema } from '@/lib/validations/quote'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate data
    const result = quoteFormSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json(
        { success: false, errors: result.error.flatten() },
        { status: 400 }
      )
    }

    const quoteId = crypto.randomUUID()
    const data = {
      ...result.data,
      quoteId,
      submittedAt: new Date().toISOString(),
    }

    // Send to n8n webhook if configured
    if (process.env.N8N_QUOTE_WEBHOOK_URL) {
      try {
        await fetch(process.env.N8N_QUOTE_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        })
      } catch (webhookError) {
        console.error('Webhook error:', webhookError)
        // Continue execution - we don't want to fail the user request if webhook fails
      }
    } else {
      console.log('Quote received (no webhook configured):', data)
    }

    return NextResponse.json({ success: true, quoteId })
  } catch (error) {
    console.error('Quote submission error:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}
