import { NextRequest, NextResponse } from 'next/server'
import { quoteFormSchema } from '@/lib/validations/quote'

const rateLimitMap = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT_MAX = 3
const RATE_LIMIT_WINDOW = 5 * 60 * 1000
const MIN_FORM_TIME = 3000

function silentReject() {
  return NextResponse.json({ success: true, quoteId: 'queued' })
}

function getClientIp(request: NextRequest): string {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'
  )
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(ip)

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW })
    return false
  }

  entry.count++
  if (entry.count > RATE_LIMIT_MAX) return true

  return false
}

function cleanupRateLimitMap() {
  if (rateLimitMap.size <= 1000) return
  const now = Date.now()
  for (const [key, val] of rateLimitMap) {
    if (now > val.resetAt) rateLimitMap.delete(key)
  }
}

export async function POST(request: NextRequest) {
  try {
    cleanupRateLimitMap()

    const ip = getClientIp(request)
    if (checkRateLimit(ip)) return silentReject()

    const body = await request.json()

    if (body._hp) return silentReject()

    if (body._ts && (Date.now() - body._ts) < MIN_FORM_TIME) return silentReject()

    const result = quoteFormSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json(
        { success: false, errors: result.error.flatten() },
        { status: 400 }
      )
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { _hp: _honeypot, _ts: _timestamp, ...cleanData } = result.data
    const quoteId = crypto.randomUUID()
    const data = {
      ...cleanData,
      quoteId,
      submittedAt: new Date().toISOString(),
    }

    if (process.env.N8N_QUOTE_WEBHOOK_URL) {
      try {
        await fetch(process.env.N8N_QUOTE_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        })
      } catch (webhookError) {
        console.error('Webhook error:', webhookError)
      }
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
