'use client'

import { useMemo } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  parseISO,
  addMonths,
  subMonths,
} from 'date-fns'
import { it } from 'date-fns/locale'
import { CalendarDay } from './CalendarDay'
import { Button } from '@/components/ui/button'
import type { DayAvailability } from '@/types/booking'

// ============================================================================
// CALENDAR MONTH - Monthly Calendar View
// ============================================================================

interface CalendarMonthProps {
  currentMonth: Date
  selectedDate: string | null
  availability: DayAvailability[]
  onDateSelect: (date: string) => void
  onMonthChange: (month: Date) => void
  labels: {
    weekDays: string[]
  }
  minDate?: Date
  maxDate?: Date
}

export function CalendarMonth({
  currentMonth,
  selectedDate,
  availability,
  onDateSelect,
  onMonthChange,
  labels,
  minDate,
  maxDate,
}: CalendarMonthProps) {
  // Genera tutte le date da mostrare nel calendario
  const calendarDays = useMemo(() => {
    const monthStart = startOfMonth(currentMonth)
    const monthEnd = endOfMonth(currentMonth)
    const calendarStart = startOfWeek(monthStart, { weekStartsOn: 1 }) // Lunedì
    const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 1 })

    return eachDayOfInterval({ start: calendarStart, end: calendarEnd })
  }, [currentMonth])

  // Crea mappa disponibilità per lookup veloce
  const availabilityMap = useMemo(() => {
    const map = new Map<string, boolean>()
    availability.forEach((day) => {
      map.set(day.date, day.available)
    })
    return map
  }, [availability])

  const today = new Date()

  const canGoBack = !minDate || subMonths(currentMonth, 1) >= startOfMonth(minDate)
  const canGoForward = !maxDate || addMonths(currentMonth, 1) <= endOfMonth(maxDate)

  return (
    <div className="w-full">
      {/* Header con navigazione mese */}
      <div className="flex items-center justify-between mb-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onMonthChange(subMonths(currentMonth, 1))}
          disabled={!canGoBack}
          aria-label="Mese precedente"
          className="p-2"
        >
          <ChevronLeft className="w-5 h-5" aria-hidden="true" />
        </Button>

        <h3 className="text-lg font-heading font-semibold text-text-primary capitalize">
          {format(currentMonth, 'MMMM yyyy', { locale: it })}
        </h3>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => onMonthChange(addMonths(currentMonth, 1))}
          disabled={!canGoForward}
          aria-label="Mese successivo"
          className="p-2"
        >
          <ChevronRight className="w-5 h-5" aria-hidden="true" />
        </Button>
      </div>

      {/* Giorni della settimana */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {labels.weekDays.map((day) => (
          <div
            key={day}
            className="text-center text-xs font-medium text-text-muted py-2"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Griglia giorni */}
      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((day) => {
          const dateStr = format(day, 'yyyy-MM-dd')
          const isCurrentMonth = isSameMonth(day, currentMonth)
          const isToday = isSameDay(day, today)
          const isSelected = selectedDate === dateStr
          const isAvailable = availabilityMap.get(dateStr) ?? false

          return (
            <CalendarDay
              key={dateStr}
              date={dateStr}
              dayNumber={day.getDate()}
              isCurrentMonth={isCurrentMonth}
              isToday={isToday}
              isSelected={isSelected}
              isAvailable={isAvailable}
              onClick={() => {
                if (isCurrentMonth && isAvailable) {
                  onDateSelect(dateStr)
                }
              }}
            />
          )
        })}
      </div>

      {/* Legenda */}
      <div className="flex items-center justify-center gap-6 mt-6 text-xs text-text-muted">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-success" />
          <span>Disponibile</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-text-muted/30" />
          <span>Non disponibile</span>
        </div>
      </div>
    </div>
  )
}
