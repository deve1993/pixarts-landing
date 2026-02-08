// ============================================================================
// BOOKING TYPES
// ============================================================================

export interface TimeSlot {
  id: string
  startTime: string // ISO string
  endTime: string // ISO string
  available: boolean
}

export interface DayAvailability {
  date: string // YYYY-MM-DD
  available: boolean
  slots: TimeSlot[]
}

export interface MonthAvailability {
  month: string // YYYY-MM
  days: DayAvailability[]
}

export interface BookingFormData {
  nome: string
  cognome: string
  email: string
  telefono: string
  azienda?: string
  ruolo?: string
  messaggio?: string
  privacy: boolean
}

export interface BookingRequest {
  slot: TimeSlot
  cliente: BookingFormData
}

export interface BookingConfirmation {
  id: string
  calendarEventId: string
  slot: TimeSlot
  cliente: Omit<BookingFormData, 'privacy'>
  meetLink?: string
  createdAt: string
}

export type BookingStep = 'calendar' | 'time' | 'form' | 'confirm'

// API Response types
export interface AvailabilityResponse {
  month: string
  days: DayAvailability[]
}

export interface SlotsResponse {
  date: string
  slots: TimeSlot[]
}

export interface CreateBookingResponse {
  success: boolean
  booking?: {
    id: string
    meetLink?: string
    slot: TimeSlot
    cliente: {
      nome: string
      email: string
    }
  }
  error?: string
}
