// ============================================================================
// GOOGLE CALENDAR INTEGRATION
// ============================================================================

import { google } from 'googleapis'
import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  format,
  parseISO,
  addMinutes,
  isAfter,
  isBefore,
  setHours,
  setMinutes,
  addHours,
  startOfDay,
  endOfDay,
} from 'date-fns'
import { toZonedTime } from 'date-fns-tz'
import { BOOKING_CONFIG } from './booking-config'
import type {
  TimeSlot,
  DayAvailability,
  MonthAvailability,
  BookingFormData,
} from '@/types/booking'

// ============================================================================
// OAUTH CLIENT SETUP
// ============================================================================

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET
)

oauth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
})

const calendar = google.calendar({ version: 'v3', auth: oauth2Client })

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Genera tutti gli slot possibili per un giorno
 */
function generateDaySlots(date: Date): TimeSlot[] {
  const { workingHours, slotDuration, bufferBetween } = BOOKING_CONFIG
  const slots: TimeSlot[] = []

  let currentTime = setMinutes(setHours(date, workingHours.start), 0)
  const dayEndTime = setMinutes(setHours(date, workingHours.end), 0)

  while (isBefore(currentTime, dayEndTime)) {
    const slotEnd = addMinutes(currentTime, slotDuration)

    // Lo slot deve finire entro l'orario lavorativo
    if (isAfter(slotEnd, dayEndTime)) break

    slots.push({
      id: `${format(date, 'yyyy-MM-dd')}-${format(currentTime, 'HHmm')}`,
      startTime: currentTime.toISOString(),
      endTime: slotEnd.toISOString(),
      available: true,
    })

    // Prossimo slot = fine attuale + buffer
    currentTime = addMinutes(slotEnd, bufferBetween)
  }

  return slots
}

/**
 * Recupera eventi esistenti dal calendario
 */
async function getExistingEvents(startDate: Date, endDate: Date) {
  try {
    const response = await calendar.events.list({
      calendarId: process.env.GOOGLE_CALENDAR_ID,
      timeMin: startDate.toISOString(),
      timeMax: endDate.toISOString(),
      singleEvents: true,
      orderBy: 'startTime',
    })

    return response.data.items || []
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    console.error('Errore recupero eventi Google Calendar:', errorMessage)

    // Re-throw invalid_grant errors so they can be handled upstream
    if (errorMessage.includes('invalid_grant')) {
      throw new Error('invalid_grant: Google Calendar token expired')
    }

    return []
  }
}

/**
 * Verifica se uno slot si sovrappone con eventi esistenti
 */
function isSlotBlocked(
  slot: TimeSlot,
  events: Awaited<ReturnType<typeof getExistingEvents>>
): boolean {
  const slotStart = parseISO(slot.startTime)
  const slotEnd = parseISO(slot.endTime)

  return events.some((event) => {
    if (!event.start?.dateTime || !event.end?.dateTime) return false

    const eventStart = parseISO(event.start.dateTime)
    const eventEnd = parseISO(event.end.dateTime)

    // Sovrapposizione se: slotStart < eventEnd AND slotEnd > eventStart
    return isBefore(slotStart, eventEnd) && isAfter(slotEnd, eventStart)
  })
}

// ============================================================================
// PUBLIC API
// ============================================================================

/**
 * GET disponibilità mese intero
 */
export async function getMonthAvailability(
  month: string
): Promise<MonthAvailability> {
  const { workingDays, minAdvanceHours } = BOOKING_CONFIG

  const monthDate = parseISO(`${month}-01`)
  const start = startOfMonth(monthDate)
  const end = endOfMonth(monthDate)

  const now = new Date()
  const minBookingTime = addHours(now, minAdvanceHours)

  // Recupera tutti gli eventi del mese
  const events = await getExistingEvents(start, end)

  const days = eachDayOfInterval({ start, end })

  const daysAvailability: DayAvailability[] = days.map((day) => {
    const dayOfWeek = day.getDay()
    const dateStr = format(day, 'yyyy-MM-dd')

    // Non lavorativo
    if (!(workingDays as readonly number[]).includes(dayOfWeek)) {
      return { date: dateStr, available: false, slots: [] }
    }

    // Giorno passato
    if (isBefore(endOfDay(day), now)) {
      return { date: dateStr, available: false, slots: [] }
    }

    // Genera slot e filtra quelli bloccati
    const allSlots = generateDaySlots(day)
    const availableSlots = allSlots.map((slot) => ({
      ...slot,
      available:
        !isSlotBlocked(slot, events) &&
        isAfter(parseISO(slot.startTime), minBookingTime),
    }))

    const hasAvailableSlots = availableSlots.some((s) => s.available)

    return {
      date: dateStr,
      available: hasAvailableSlots,
      slots: availableSlots,
    }
  })

  return { month, days: daysAvailability }
}

/**
 * GET slots per giorno specifico
 */
export async function getDaySlots(date: string): Promise<TimeSlot[]> {
  const { minAdvanceHours, workingDays } = BOOKING_CONFIG

  const dayDate = parseISO(date)
  const dayOfWeek = dayDate.getDay()

  // Non lavorativo
  if (!(workingDays as readonly number[]).includes(dayOfWeek)) {
    return []
  }

  const dayStart = startOfDay(dayDate)
  const dayEnd = endOfDay(dayDate)

  const now = new Date()
  const minBookingTime = addHours(now, minAdvanceHours)

  // Giorno passato
  if (isBefore(dayEnd, now)) {
    return []
  }

  const events = await getExistingEvents(dayStart, dayEnd)
  const allSlots = generateDaySlots(dayDate)

  return allSlots.map((slot) => ({
    ...slot,
    available:
      !isSlotBlocked(slot, events) &&
      isAfter(parseISO(slot.startTime), minBookingTime),
  }))
}

/**
 * Verifica disponibilità singolo slot
 */
export async function checkSlotAvailability(startTime: string): Promise<boolean> {
  const { slotDuration, minAdvanceHours } = BOOKING_CONFIG

  const slotStart = parseISO(startTime)
  const slotEnd = addMinutes(slotStart, slotDuration)
  const minBookingTime = addHours(new Date(), minAdvanceHours)

  if (isBefore(slotStart, minBookingTime)) {
    return false
  }

  const events = await getExistingEvents(slotStart, slotEnd)
  return events.length === 0
}

/**
 * Crea prenotazione su Google Calendar
 */
export async function createBooking(
  slot: TimeSlot,
  cliente: BookingFormData
) {
  const { appointmentType, appointmentDescription, timezone, adminEmail } =
    BOOKING_CONFIG

  const event = {
    summary: `${appointmentType} - ${cliente.nome} ${cliente.cognome}`,
    description: `
${appointmentDescription}

📋 DETTAGLI CLIENTE
Nome: ${cliente.nome} ${cliente.cognome}
Email: ${cliente.email}
Telefono: ${cliente.telefono}
${cliente.azienda ? `Azienda: ${cliente.azienda}` : ''}
${cliente.ruolo ? `Ruolo: ${cliente.ruolo}` : ''}
${cliente.messaggio ? `\nMessaggio:\n${cliente.messaggio}` : ''}

---
Prenotato tramite pixarts.eu
    `.trim(),
    start: {
      dateTime: slot.startTime,
      timeZone: timezone,
    },
    end: {
      dateTime: slot.endTime,
      timeZone: timezone,
    },
    attendees: [{ email: cliente.email }, { email: adminEmail }],
    conferenceData: {
      createRequest: {
        requestId: `pixarts-${Date.now()}`,
        conferenceSolutionKey: { type: 'hangoutsMeet' },
      },
    },
    reminders: {
      useDefault: false,
      overrides: [
        { method: 'email', minutes: 24 * 60 }, // 24h prima
        { method: 'popup', minutes: 30 }, // 30min prima
      ],
    },
  }

  const response = await calendar.events.insert({
    calendarId: process.env.GOOGLE_CALENDAR_ID,
    requestBody: event,
    conferenceDataVersion: 1,
    sendUpdates: 'all',
  })

  return response.data
}
