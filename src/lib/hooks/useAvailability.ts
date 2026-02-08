'use client'

import { useState, useEffect, useCallback } from 'react'
import type { DayAvailability, TimeSlot, MonthAvailability } from '@/types/booking'

// ============================================================================
// USE AVAILABILITY HOOK
// ============================================================================

interface UseAvailabilityReturn {
  availability: DayAvailability[]
  slots: TimeSlot[]
  isLoadingAvailability: boolean
  isLoadingSlots: boolean
  error: string | null
  refetchAvailability: () => Promise<void>
  refetchSlots: () => Promise<void>
}

// Cache per disponibilità mese
const availabilityCache = new Map<string, { data: DayAvailability[]; timestamp: number }>()
const CACHE_DURATION = 5 * 60 * 1000 // 5 minuti

export function useAvailability(
  month: string | null,
  selectedDate: string | null
): UseAvailabilityReturn {
  const [availability, setAvailability] = useState<DayAvailability[]>([])
  const [slots, setSlots] = useState<TimeSlot[]>([])
  const [isLoadingAvailability, setIsLoadingAvailability] = useState(false)
  const [isLoadingSlots, setIsLoadingSlots] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Fetch disponibilità mese
  const fetchAvailability = useCallback(async () => {
    if (!month) return

    // Check cache
    const cached = availabilityCache.get(month)
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      setAvailability(cached.data)
      return
    }

    setIsLoadingAvailability(true)
    setError(null)

    try {
      const response = await fetch(`/api/booking/availability?month=${month}`)

      if (!response.ok) {
        throw new Error('Failed to fetch availability')
      }

      const data: MonthAvailability = await response.json()

      // Update cache
      availabilityCache.set(month, {
        data: data.days,
        timestamp: Date.now(),
      })

      setAvailability(data.days)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
      setAvailability([])
    } finally {
      setIsLoadingAvailability(false)
    }
  }, [month])

  // Fetch slots per giorno
  const fetchSlots = useCallback(async () => {
    if (!selectedDate) {
      setSlots([])
      return
    }

    setIsLoadingSlots(true)
    setError(null)

    try {
      const response = await fetch(`/api/booking/slots?date=${selectedDate}`)

      if (!response.ok) {
        throw new Error('Failed to fetch slots')
      }

      const data = await response.json()
      // L'API ritorna { date, slots }, estraiamo solo gli slots
      setSlots(data.slots || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
      setSlots([])
    } finally {
      setIsLoadingSlots(false)
    }
  }, [selectedDate])

  // Effects
  useEffect(() => {
    fetchAvailability()
  }, [fetchAvailability])

  useEffect(() => {
    fetchSlots()
  }, [fetchSlots])

  return {
    availability,
    slots,
    isLoadingAvailability,
    isLoadingSlots,
    error,
    refetchAvailability: fetchAvailability,
    refetchSlots: fetchSlots,
  }
}
