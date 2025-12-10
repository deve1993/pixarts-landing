import { NextResponse } from 'next/server'
import { gdprRequestSchema, requestTypes } from '@/lib/validations/gdpr'
import { headers } from 'next/headers'
import { z } from 'zod'
import { sendEmail, sendInternalNotification } from '@/lib/email'
import { GdprRequestUserEmail } from '@/emails/gdpr-request-user'
import { GdprRequestInternalEmail } from '@/emails/gdpr-request-internal'

// Simple in-memory rate limiting
const rateLimit = new Map<string, { count: number; resetTime: number }>()
const RATE_LIMIT_MAX = 3 // Max GDPR requests per window
const RATE_LIMIT_WINDOW = 24 * 60 * 60 * 1000 // 24 hours in milliseconds

function getRateLimitKey(ip: string): string {
  return `gdpr_rate_limit_${ip}`
}

function checkRateLimit(ip: string): {
  allowed: boolean
  remaining: number
  resetIn: number
} {
  const now = Date.now()
  const key = getRateLimitKey(ip)
  const record = rateLimit.get(key)

  // Clean up old entries periodically
  if (rateLimit.size > 10000) {
    const cutoff = now - RATE_LIMIT_WINDOW
    for (const [k, v] of rateLimit.entries()) {
      if (v.resetTime < cutoff) {
        rateLimit.delete(k)
      }
    }
  }

  if (!record || now > record.resetTime) {
    rateLimit.set(key, { count: 1, resetTime: now + RATE_LIMIT_WINDOW })
    return {
      allowed: true,
      remaining: RATE_LIMIT_MAX - 1,
      resetIn: RATE_LIMIT_WINDOW,
    }
  }

  if (record.count >= RATE_LIMIT_MAX) {
    return {
      allowed: false,
      remaining: 0,
      resetIn: record.resetTime - now,
    }
  }

  record.count++
  rateLimit.set(key, record)
  return {
    allowed: true,
    remaining: RATE_LIMIT_MAX - record.count,
    resetIn: record.resetTime - now,
  }
}

function getClientIP(headersList: Headers): string {
  const forwardedFor = headersList.get('x-forwarded-for')
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim()
  }

  const realIP = headersList.get('x-real-ip')
  if (realIP) {
    return realIP
  }

  const cfConnectingIP = headersList.get('cf-connecting-ip')
  if (cfConnectingIP) {
    return cfConnectingIP
  }

  return 'unknown'
}

function getRequestTypeLabel(value: string): string {
  const labels: Record<string, string> = {
    access: 'Diritto di Accesso',
    rectification: 'Diritto di Rettifica',
    erasure: 'Diritto alla Cancellazione',
    restriction: 'Diritto alla Limitazione',
    portability: 'Diritto alla Portabilità',
    objection: 'Diritto di Opposizione',
    consent_withdrawal: 'Revoca Consenso',
  }

  return labels[value] || value
}

export async function POST(request: Request) {
  try {
    // Get client IP for rate limiting
    const headersList = await headers()
    const clientIP = getClientIP(headersList)

    // Check rate limit
    const rateLimitResult = checkRateLimit(clientIP)

    if (!rateLimitResult.allowed) {
      const resetHours = Math.ceil(rateLimitResult.resetIn / (60 * 60 * 1000))
      return NextResponse.json(
        {
          success: false,
          message: `Troppe richieste. Riprova tra ${resetHours} ore.`,
        },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': RATE_LIMIT_MAX.toString(),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': Math.ceil(
              rateLimitResult.resetIn / 1000
            ).toString(),
            'Retry-After': Math.ceil(
              rateLimitResult.resetIn / 1000
            ).toString(),
          },
        }
      )
    }

    const body = await request.json()

    // Server-side validation
    const validatedData = gdprRequestSchema.parse(body)

    // Generate unique request ID
    const requestId = `GDPR-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`

    const requestTypeLabel = getRequestTypeLabel(validatedData.requestType)
    const requestTypeInfo = requestTypes.find(
      (t) => t.value === validatedData.requestType
    )
    const submittedAt = new Date().toLocaleString('it-IT')
    const deadlineDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('it-IT')

    // Send internal notification email
    const internalResult = await sendInternalNotification({
      subject: `[GDPR] Nuova richiesta #${requestId} - ${requestTypeLabel}`,
      react: GdprRequestInternalEmail({
        requestId,
        fullName: validatedData.fullName,
        email: validatedData.email,
        phone: validatedData.phone,
        requestType: validatedData.requestType,
        requestTypeLabel,
        requestTypeArticle: requestTypeInfo?.article,
        details: validatedData.details,
        emailUsed: validatedData.emailUsed,
        clientIP,
        submittedAt,
        deadlineDate,
      }),
      replyTo: validatedData.email,
    })

    if (!internalResult.success) {
      console.error('Internal notification error:', internalResult.error)
    }

    // Send confirmation email to user
    const userResult = await sendEmail({
      to: validatedData.email,
      subject: `Conferma richiesta GDPR #${requestId} - Pixarts`,
      react: GdprRequestUserEmail({
        requestId,
        fullName: validatedData.fullName,
        requestType: validatedData.requestType,
        requestTypeLabel,
        submittedAt: new Date().toLocaleDateString('it-IT'),
        deadlineDate,
      }),
    })

    if (!userResult.success) {
      console.error('User confirmation error:', userResult.error)
    }

    return NextResponse.json(
      {
        success: true,
        requestId,
        message: 'Richiesta inviata con successo',
      },
      {
        headers: {
          'X-RateLimit-Limit': RATE_LIMIT_MAX.toString(),
          'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
        },
      }
    )
  } catch (error) {
    console.error('GDPR request error:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, errors: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { success: false, message: 'Errore interno del server' },
      { status: 500 }
    )
  }
}
