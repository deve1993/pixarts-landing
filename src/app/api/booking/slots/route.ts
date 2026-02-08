import { NextRequest, NextResponse } from 'next/server'
import { getDaySlots } from '@/lib/google-calendar'
import { checkRateLimit, getClientIP } from '@/lib/rate-limit'

const RATE_CONFIG = { maxRequests: 30, windowMs: 60 * 1000, prefix: 'booking_slots' }

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
  const date = searchParams.get('date')

  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json(
      { error: 'Parametro date richiesto (formato: YYYY-MM-DD)' },
      { status: 400 }
    )
  }

  try {
    const slots = await getDaySlots(date)
    return NextResponse.json({ date, slots })
  } catch (error) {
    console.error('Errore slots:', error)
    return NextResponse.json(
      { error: 'Errore nel recupero orari' },
      { status: 500 }
    )
  }
}
