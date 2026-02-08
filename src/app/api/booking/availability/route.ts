import { NextRequest, NextResponse } from 'next/server'
import { getMonthAvailability } from '@/lib/google-calendar'
import { checkRateLimit, getClientIP } from '@/lib/rate-limit'

const RATE_CONFIG = { maxRequests: 30, windowMs: 60 * 1000, prefix: 'booking_avail' }

export async function GET(request: NextRequest) {
  const ip = getClientIP(request)
  const rl = checkRateLimit(ip, RATE_CONFIG)

  if (!rl.allowed) {
    return NextResponse.json(
      { error: 'Troppe richieste. Riprova tra qualche minuto.' },
      { status: 429 }
    )
  }

  const searchParams = request.nextUrl.searchParams
  const month = searchParams.get('month')

  if (!month || !/^\d{4}-\d{2}$/.test(month)) {
    return NextResponse.json(
      { error: 'Parametro month richiesto (formato: YYYY-MM)' },
      { status: 400 }
    )
  }

  try {
    const availability = await getMonthAvailability(month)
    return NextResponse.json(availability)
  } catch (error) {
    console.error('Errore availability:', error)
    return NextResponse.json(
      { error: 'Errore nel recupero disponibilità' },
      { status: 500 }
    )
  }
}
