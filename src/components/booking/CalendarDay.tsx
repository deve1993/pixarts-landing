'use client'

import { cn } from '@/lib/utils'

// ============================================================================
// CALENDAR DAY - Single Day Cell
// ============================================================================

interface CalendarDayProps {
  date: string // YYYY-MM-DD
  dayNumber: number
  isCurrentMonth: boolean
  isToday: boolean
  isSelected: boolean
  isAvailable: boolean
  onClick: () => void
  monthName?: string
}

const getAriaLabel = (
  dayNumber: number,
  monthName: string | undefined,
  isToday: boolean,
  isAvailable: boolean,
  isSelected: boolean
): string => {
  const parts = [`${dayNumber}`]
  if (monthName) parts[0] = `${dayNumber} ${monthName}`
  if (isToday) parts.push('oggi')
  if (isSelected) parts.push('selezionato')
  if (!isAvailable) parts.push('non disponibile')
  else parts.push('disponibile')
  return parts.join(', ')
}

export function CalendarDay({
  dayNumber,
  isCurrentMonth,
  isToday,
  isSelected,
  isAvailable,
  onClick,
  monthName,
}: CalendarDayProps) {
  const isDisabled = !isCurrentMonth || !isAvailable

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isDisabled}
      aria-label={getAriaLabel(dayNumber, monthName, isToday, isAvailable, isSelected)}
      aria-pressed={isSelected}
      aria-disabled={isDisabled}
      className={cn(
        'relative w-full aspect-square rounded-lg text-sm font-medium transition-all duration-200',
        'flex items-center justify-center',
        // Base states
        isCurrentMonth ? 'text-text-primary' : 'text-text-muted/30',
        // Available & enabled
        isAvailable && isCurrentMonth && !isSelected && [
          'hover:bg-accent-orange/10 hover:text-accent-orange',
          'cursor-pointer',
        ],
        // Selected
        isSelected && [
          'bg-accent-orange text-white',
          'ring-2 ring-accent-orange ring-offset-2 ring-offset-bg-primary',
        ],
        // Disabled
        isDisabled && 'cursor-not-allowed opacity-50',
        // Not available (but in current month)
        !isAvailable && isCurrentMonth && 'line-through text-text-muted/50',
        // Today indicator
        isToday && !isSelected && 'ring-1 ring-accent-orange/50'
      )}
    >
      {dayNumber}

      {/* Today dot */}
      {isToday && !isSelected && (
        <span aria-hidden="true" className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent-orange" />
      )}

      {/* Available indicator */}
      {isAvailable && isCurrentMonth && !isSelected && (
        <span aria-hidden="true" className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-success" />
      )}
    </button>
  )
}
