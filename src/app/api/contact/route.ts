import { NextResponse } from 'next/server'
import { contactFormSchema } from '@/lib/validations'
import { headers } from 'next/headers'
import { sendEmail, sendInternalNotification } from '@/lib/email'
import { ContactConfirmationEmail } from '@/emails/contact-confirmation'
import { ContactInternalEmail } from '@/emails/contact-internal'

// Simple in-memory rate limiting
// In production, use Redis or a proper rate limiting service
const rateLimit = new Map<string, { count: number; resetTime: number }>()
const RATE_LIMIT_MAX = 5 // Max requests per window
const RATE_LIMIT_WINDOW = 60 * 60 * 1000 // 1 hour in milliseconds

function getRateLimitKey(ip: string): string {
  return `rate_limit_${ip}`
}

function checkRateLimit(ip: string): { allowed: boolean; remaining: number; resetIn: number } {
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
    // First request or window expired
    rateLimit.set(key, { count: 1, resetTime: now + RATE_LIMIT_WINDOW })
    return { allowed: true, remaining: RATE_LIMIT_MAX - 1, resetIn: RATE_LIMIT_WINDOW }
  }

  if (record.count >= RATE_LIMIT_MAX) {
    // Rate limit exceeded
    return {
      allowed: false,
      remaining: 0,
      resetIn: record.resetTime - now
    }
  }

  // Increment count
  record.count++
  rateLimit.set(key, record)
  return {
    allowed: true,
    remaining: RATE_LIMIT_MAX - record.count,
    resetIn: record.resetTime - now
  }
}

function getClientIP(headersList: Headers): string {
  // Try various headers for client IP
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

export async function POST(request: Request) {
  try {
    // Get client IP for rate limiting
    const headersList = await headers()
    const clientIP = getClientIP(headersList)

    // Check rate limit
    const rateLimitResult = checkRateLimit(clientIP)

    if (!rateLimitResult.allowed) {
      const resetMinutes = Math.ceil(rateLimitResult.resetIn / 60000)
      return NextResponse.json(
        {
          success: false,
          message: `Troppe richieste. Riprova tra ${resetMinutes} minuti.`
        },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': RATE_LIMIT_MAX.toString(),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': Math.ceil(rateLimitResult.resetIn / 1000).toString(),
            'Retry-After': Math.ceil(rateLimitResult.resetIn / 1000).toString(),
          }
        }
      )
    }

    const body = await request.json()

    // Validate data
    const validatedData = contactFormSchema.parse(body)

    // Map project type to readable label
    const projectTypeLabels: Record<string, string> = {
      landing: 'Landing Page',
      website: 'Sito Aziendale',
      ecommerce: 'E-commerce / Booking',
      other: 'Altro',
    }

    // Map budget to readable label
    const budgetLabels: Record<string, string> = {
      '1-2k': '€1.000 - €2.000',
      '2-4k': '€2.000 - €4.000',
      '4-6k': '€4.000 - €6.000',
      '6k+': '+€6.000',
    }

    const submittedAt = new Date().toLocaleString('it-IT')

    // Send internal notification email
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

    // Send confirmation email to user
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
        headers: {
          'X-RateLimit-Limit': RATE_LIMIT_MAX.toString(),
          'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
        }
      }
    )
  } catch (error) {
    console.error('Contact form error:', error)

    // Handle Zod validation errors
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
