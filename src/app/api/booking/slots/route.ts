import { NextRequest, NextResponse } from 'next/server'
import { getDaySlots } from '@/lib/google-calendar'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const date = searchParams.get('date') // YYYY-MM-DD

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
