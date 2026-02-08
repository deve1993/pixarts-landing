'use client'

import { Loader2 } from 'lucide-react'
import { TimeSlot } from './TimeSlot'
import type { TimeSlot as TimeSlotType } from '@/types/booking'

// ============================================================================
// TIME SLOT GRID - Grid of Available Time Slots
// ============================================================================

interface TimeSlotGridProps {
  slots: TimeSlotType[]
  selectedSlot: TimeSlotType | null
  onSlotSelect: (slot: TimeSlotType) => void
  isLoading?: boolean
  labels: {
    loading: string
    noSlots: string
    selectTime: string
  }
}

export function TimeSlotGrid({
  slots,
  selectedSlot,
  onSlotSelect,
  isLoading,
  labels,
}: TimeSlotGridProps) {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-text-muted">
        <Loader2 className="w-8 h-8 animate-spin mb-3" />
        <p className="text-sm">{labels.loading}</p>
      </div>
    )
  }

  // Guard against undefined/null slots
  if (!slots || !Array.isArray(slots)) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-text-muted">
        <p className="text-sm">{labels.noSlots}</p>
      </div>
    )
  }

  const availableSlots = slots.filter((slot) => slot.available)

  if (availableSlots.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-text-muted">
        <p className="text-sm">{labels.noSlots}</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-text-secondary">{labels.selectTime}</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {slots.map((slot) => (
          <TimeSlot
            key={slot.id}
            slot={slot}
            isSelected={selectedSlot?.id === slot.id}
            onClick={() => {
              if (slot.available) {
                onSlotSelect(slot)
              }
            }}
          />
        ))}
      </div>
    </div>
  )
}
