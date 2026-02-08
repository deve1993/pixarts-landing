import { NextResponse } from 'next/server'
import { gdprRequestSchema, requestTypes } from '@/lib/validations/gdpr'
import { z } from 'zod'
import { sendEmail, sendInternalNotification } from '@/lib/email'
import { GdprRequestUserEmail } from '@/emails/gdpr-request-user'
import { GdprRequestInternalEmail } from '@/emails/gdpr-request-internal'
import { checkRateLimit, getClientIPFromHeaders, rateLimitHeaders } from '@/lib/rate-limit'

const RATE_LIMIT_MAX = 3
const RATE_LIMIT_WINDOW = 24 * 60 * 60 * 1000

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
    const clientIP = await getClientIPFromHeaders()

    const rateLimitResult = checkRateLimit(clientIP, {
      maxRequests: RATE_LIMIT_MAX,
      windowMs: RATE_LIMIT_WINDOW,
      prefix: 'gdpr',
    })

    if (!rateLimitResult.allowed) {
      const resetHours = Math.ceil(rateLimitResult.resetIn / (60 * 60 * 1000))
      return NextResponse.json(
        {
          success: false,
          message: `Troppe richieste. Riprova tra ${resetHours} ore.`,
        },
        {
          status: 429,
          headers: rateLimitHeaders(rateLimitResult, RATE_LIMIT_MAX),
        }
      )
    }

    const body = await request.json()

    const validatedData = gdprRequestSchema.parse(body)

    const requestId = `GDPR-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`

    const requestTypeLabel = getRequestTypeLabel(validatedData.requestType)
    const requestTypeInfo = requestTypes.find(
      (t) => t.value === validatedData.requestType
    )
    const submittedAt = new Date().toLocaleString('it-IT')
    const deadlineDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('it-IT')

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
        headers: rateLimitHeaders(rateLimitResult, RATE_LIMIT_MAX),
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
