import { NextRequest, NextResponse } from 'next/server'
import { getMonthAvailability } from '@/lib/google-calendar'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const month = searchParams.get('month') // YYYY-MM

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
