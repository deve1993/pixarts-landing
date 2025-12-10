'use client'

import { Calendar, Clock, User } from 'lucide-react'
import { format, parseISO } from 'date-fns'
import { it } from 'date-fns/locale'
import type { TimeSlot, BookingFormData } from '@/types/booking'

// ============================================================================
// BOOKING SUMMARY - Current Selection Display
// ============================================================================

interface BookingSummaryProps {
  selectedDate?: string
  selectedSlot?: TimeSlot
  formData?: BookingFormData
  labels: {
    selectedDate: string
    selectedTime: string
    yourInfo: string
    notSelected: string
  }
}

export function BookingSummary({
  selectedDate,
  selectedSlot,
  formData,
  labels,
}: BookingSummaryProps) {
  const formattedDate = selectedDate
    ? format(parseISO(selectedDate), 'EEEE d MMMM yyyy', { locale: it })
    : null

  const formattedTime = selectedSlot
    ? format(parseISO(selectedSlot.startTime), 'HH:mm', { locale: it })
    : null

  return (
    <div className="p-4 rounded-xl bg-bg-surface/60 border border-border/50 backdrop-blur-sm">
      <div className="space-y-3">
        {/* Selected Date */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-bg-elevated flex items-center justify-center">
            <Calendar className="w-4 h-4 text-accent-orange" />
          </div>
          <div>
            <p className="text-xs text-text-muted">{labels.selectedDate}</p>
            <p className="text-sm font-medium text-text-primary">
              {formattedDate || (
                <span className="text-text-muted italic">{labels.notSelected}</span>
              )}
            </p>
          </div>
        </div>

        {/* Selected Time */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-bg-elevated flex items-center justify-center">
            <Clock className="w-4 h-4 text-accent-orange" />
          </div>
          <div>
            <p className="text-xs text-text-muted">{labels.selectedTime}</p>
            <p className="text-sm font-medium text-text-primary">
              {formattedTime || (
                <span className="text-text-muted italic">{labels.notSelected}</span>
              )}
            </p>
          </div>
        </div>

        {/* User Info (if available) */}
        {formData && (
          <div className="flex items-center gap-3 pt-2 border-t border-border/50">
            <div className="w-8 h-8 rounded-lg bg-bg-elevated flex items-center justify-center">
              <User className="w-4 h-4 text-accent-orange" />
            </div>
            <div>
              <p className="text-xs text-text-muted">{labels.yourInfo}</p>
              <p className="text-sm font-medium text-text-primary">
                {formData.nome} {formData.cognome}
              </p>
              <p className="text-xs text-text-secondary">{formData.email}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
