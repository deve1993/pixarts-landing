'use client'

import { format, parseISO } from 'date-fns'
import { cn } from '@/lib/utils'
import type { TimeSlot as TimeSlotType } from '@/types/booking'

// ============================================================================
// TIME SLOT - Single Time Slot Button
// ============================================================================

interface TimeSlotProps {
  slot: TimeSlotType
  isSelected: boolean
  onClick: () => void
}

export function TimeSlot({ slot, isSelected, onClick }: TimeSlotProps) {
  const startTime = format(parseISO(slot.startTime), 'HH:mm')
  const endTime = format(parseISO(slot.endTime), 'HH:mm')

  const ariaLabel = slot.available
    ? `${startTime} - ${endTime}${isSelected ? ', selezionato' : ', disponibile'}`
    : `${startTime} - ${endTime}, non disponibile`

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={!slot.available}
      aria-label={ariaLabel}
      aria-pressed={isSelected}
      aria-disabled={!slot.available}
      className={cn(
        'px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200',
        'border',
        // Available & not selected
        slot.available && !isSelected && [
          'border-border/50 bg-bg-surface/60',
          'text-text-primary',
          'hover:border-accent-orange hover:bg-accent-orange/10',
          'cursor-pointer',
        ],
        // Selected
        isSelected && [
          'border-accent-orange bg-accent-orange text-white',
          'ring-2 ring-accent-orange/30',
        ],
        // Not available
        !slot.available && [
          'border-border/30 bg-bg-elevated/30',
          'text-text-muted/50 line-through',
          'cursor-not-allowed',
        ]
      )}
    >
      {startTime} - {endTime}
    </button>
  )
}
