import { NextResponse } from 'next/server'
import { contactFormSchema } from '@/lib/validations'
import { sendEmail, sendInternalNotification } from '@/lib/email'
import { ContactConfirmationEmail } from '@/emails/contact-confirmation'
import { ContactInternalEmail } from '@/emails/contact-internal'
import { checkRateLimit, getClientIPFromHeaders, rateLimitHeaders } from '@/lib/rate-limit'

const RATE_LIMIT_MAX = 5
const RATE_LIMIT_WINDOW = 60 * 60 * 1000

export async function POST(request: Request) {
  try {
    const clientIP = await getClientIPFromHeaders()

    const rateLimitResult = checkRateLimit(clientIP, {
      maxRequests: RATE_LIMIT_MAX,
      windowMs: RATE_LIMIT_WINDOW,
      prefix: 'contact',
    })

    if (!rateLimitResult.allowed) {
      const resetMinutes = Math.ceil(rateLimitResult.resetIn / 60000)
      return NextResponse.json(
        {
          success: false,
          message: `Troppe richieste. Riprova tra ${resetMinutes} minuti.`,
        },
        {
          status: 429,
          headers: rateLimitHeaders(rateLimitResult, RATE_LIMIT_MAX),
        }
      )
    }

    const body = await request.json()

    const validatedData = contactFormSchema.parse(body)

    const projectTypeLabels: Record<string, string> = {
      landing: 'Landing Page',
      website: 'Sito Aziendale',
      ecommerce: 'E-commerce / Booking',
      other: 'Altro',
    }

    const budgetLabels: Record<string, string> = {
      '1-2k': '€1.000 - €2.000',
      '2-4k': '€2.000 - €4.000',
      '4-6k': '€4.000 - €6.000',
      '6k+': '+€6.000',
    }

    const submittedAt = new Date().toLocaleString('it-IT')

    const internalResult = await sendInternalNotification({
      subject: `Nuova richiesta preventivo da ${validatedData.name}`,
      react: ContactInternalEmail({
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone,
        projectType: projectTypeLabels[validatedData.projectType],
        budget: budgetLabels[validatedData.budget],
        message: validatedData.message || 'Nessun messaggio aggiuntivo',
        submittedAt,
      }),
      replyTo: validatedData.email,
    })

    if (!internalResult.success) {
      console.error('Internal notification error:', internalResult.error)
    }

    const userResult = await sendEmail({
      to: validatedData.email,
      subject: `Abbiamo ricevuto la tua richiesta - Pixarts`,
      react: ContactConfirmationEmail({
        name: validatedData.name.split(' ')[0], // Use first name only
        message: validatedData.message || `Richiesta per: ${projectTypeLabels[validatedData.projectType]}`,
        submittedAt: new Date().toLocaleDateString('it-IT'),
      }),
    })

    if (!userResult.success) {
      console.error('User confirmation error:', userResult.error)
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Messaggio inviato con successo',
      },
      {
        headers: rateLimitHeaders(rateLimitResult, RATE_LIMIT_MAX),
      }
    )
  } catch (error) {
    console.error('Contact form error:', error)

    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { success: false, message: 'Dati non validi' },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { success: false, message: 'Errore durante l\'invio' },
      { status: 500 }
    )
  }
}
