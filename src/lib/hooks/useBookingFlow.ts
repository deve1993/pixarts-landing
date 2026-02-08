'use client'

import { useState, useCallback } from 'react'
import { useLocale } from 'next-intl'
import type { TimeSlot, BookingFormData } from '@/types/booking'
import type { BookingStep } from '@/components/booking/BookingSteps'

// ============================================================================
// USE BOOKING FLOW HOOK - State Machine for Booking Process
// ============================================================================

interface BookingResult {
  success: boolean
  meetLink?: string
  calendarEventId?: string
}

interface UseBookingFlowReturn {
  step: BookingStep
  selectedDate: string | null
  selectedSlot: TimeSlot | null
  formData: BookingFormData | null
  bookingResult: BookingResult | null
  isSubmitting: boolean
  error: string | null
  setStep: (step: BookingStep) => void
  selectDate: (date: string) => void
  selectSlot: (slot: TimeSlot) => void
  submitBooking: (data: BookingFormData) => Promise<void>
  goBack: () => void
  reset: () => void
}

const STEP_ORDER: BookingStep[] = ['date', 'time', 'form', 'confirm']

export function useBookingFlow(): UseBookingFlowReturn {
  const locale = useLocale()
  const [step, setStep] = useState<BookingStep>('date')
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null)
  const [formData, setFormData] = useState<BookingFormData | null>(null)
  const [bookingResult, setBookingResult] = useState<BookingResult | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const selectDate = useCallback((date: string) => {
    setSelectedDate(date)
    setSelectedSlot(null) // Reset slot when date changes
    setError(null)
  }, [])

  const selectSlot = useCallback((slot: TimeSlot) => {
    setSelectedSlot(slot)
    setError(null)
  }, [])

  const goBack = useCallback(() => {
    const currentIndex = STEP_ORDER.indexOf(step)
    if (currentIndex > 0) {
      setStep(STEP_ORDER[currentIndex - 1])
      setError(null)
    }
  }, [step])

  const submitBooking = useCallback(
    async (data: BookingFormData) => {
      if (!selectedSlot) {
        setError('Nessuno slot selezionato')
        return
      }

      setIsSubmitting(true)
      setError(null)
      setFormData(data)

      try {
        const response = await fetch('/api/booking/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            slot: selectedSlot,
            cliente: {
              ...data,
              privacy: true, // Always true if submitted
            },
            locale, // Pass current locale for email language
          }),
        })

        const result = await response.json()

        if (!response.ok) {
          throw new Error(result.error || 'Errore durante la prenotazione')
        }

        setBookingResult({
          success: true,
          meetLink: result.booking?.meetLink,
          calendarEventId: result.booking?.id,
        })
        setStep('confirm')
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Errore sconosciuto')
      } finally {
        setIsSubmitting(false)
      }
    },
    [selectedSlot]
  )

  const reset = useCallback(() => {
    setStep('date')
    setSelectedDate(null)
    setSelectedSlot(null)
    setFormData(null)
    setBookingResult(null)
    setError(null)
  }, [])

  return {
    step,
    selectedDate,
    selectedSlot,
    formData,
    bookingResult,
    isSubmitting,
    error,
    setStep,
    selectDate,
    selectSlot,
    submitBooking,
    goBack,
    reset,
  }
}
