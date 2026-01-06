import { NextRequest, NextResponse } from 'next/server'
import { createBooking, checkSlotAvailability } from '@/lib/google-calendar'
import { sendEmail, sendInternalNotification } from '@/lib/email'
import { bookingRequestSchema } from '@/lib/validations/booking'
import BookingConfirmationClient from '@/emails/booking-confirmation-client'
import BookingNotificationAdmin from '@/emails/booking-notification-admin'
import { clientEmailTranslations, type EmailLocale } from '@/emails/translations'

// ============================================================================
// RATE LIMITING (in-memory, per produzione usare Redis)
// ============================================================================

const rateLimitMap = new Map<string, { count: number; resetTime: number }>()
const RATE_LIMIT = 10 // richieste (increased from 3)
const RATE_LIMIT_WINDOW = 60 * 60 * 1000 // 1 ora

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const record = rateLimitMap.get(ip)

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW })
    return true
  }

  if (record.count >= RATE_LIMIT) {
    return false
  }

  record.count++
  return true
}

function getClientIP(request: NextRequest): string {
  const forwardedFor = request.headers.get('x-forwarded-for')
  const realIP = request.headers.get('x-real-ip')
  const cfConnectingIP = request.headers.get('cf-connecting-ip')

  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim()
  }
  if (realIP) {
    return realIP
  }
  if (cfConnectingIP) {
    return cfConnectingIP
  }
  return 'unknown'
}

// ============================================================================
// POST /api/booking/create
// ============================================================================

export async function POST(request: NextRequest) {
  const clientIP = getClientIP(request)

  // Rate limit check
  if (!checkRateLimit(clientIP)) {
    return NextResponse.json(
      { error: 'Troppe richieste. Riprova tra un\'ora.' },
      { status: 429 }
    )
  }

  try {
    const body = await request.json()

    // Validazione
    const validation = bookingRequestSchema.safeParse(body)
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Dati non validi', details: validation.error.flatten() },
        { status: 400 }
      )
    }

    const { slot, cliente, locale } = validation.data
    const emailLocale = (locale || 'it') as EmailLocale

    // Verifica slot ancora disponibile
    const isAvailable = await checkSlotAvailability(slot.startTime)
    if (!isAvailable) {
      return NextResponse.json(
        { error: 'Questo orario non è più disponibile. Seleziona un altro slot.' },
        { status: 409 }
      )
    }

    // Crea evento Google Calendar
    const calendarEvent = await createBooking(slot, cliente)

    // Invia email conferma al cliente (nella lingua selezionata)
    const t = clientEmailTranslations[emailLocale]
    await sendEmail({
      to: cliente.email,
      subject: `✅ ${t.subject}`,
      react: BookingConfirmationClient({
        nome: cliente.nome,
        data: slot.startTime,
        meetLink: calendarEvent.hangoutLink || undefined,
        locale: emailLocale,
      }),
    })

    // Invia notifica admin
    await sendInternalNotification({
      subject: `🆕 Nuova prenotazione: ${cliente.nome} ${cliente.cognome}`,
      react: BookingNotificationAdmin({
        nome: cliente.nome,
        cognome: cliente.cognome,
        email: cliente.email,
        telefono: cliente.telefono,
        azienda: cliente.azienda,
        ruolo: cliente.ruolo,
        messaggio: cliente.messaggio,
        data: slot.startTime,
        meetLink: calendarEvent.hangoutLink || undefined,
        calendarLink: calendarEvent.htmlLink || undefined,
      }),
      replyTo: cliente.email,
    })

    return NextResponse.json({
      success: true,
      booking: {
        id: calendarEvent.id,
        meetLink: calendarEvent.hangoutLink,
        slot,
        cliente: {
          nome: cliente.nome,
          email: cliente.email,
        },
      },
    })
  } catch (error) {
    console.error('Errore creazione booking:', error)

    // Handle specific Google Calendar errors
    const errorMessage = error instanceof Error ? error.message : 'Errore sconosciuto'

    if (errorMessage.includes('invalid_grant')) {
      return NextResponse.json(
        { error: 'Servizio di prenotazione temporaneamente non disponibile. Contattaci via email.' },
        { status: 503 }
      )
    }

    if (errorMessage.includes('quota') || errorMessage.includes('rate')) {
      return NextResponse.json(
        { error: 'Troppi tentativi. Riprova tra qualche minuto.' },
        { status: 429 }
      )
    }

    return NextResponse.json(
      { error: 'Errore nella creazione della prenotazione. Riprova.' },
      { status: 500 }
    )
  }
}
