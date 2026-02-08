'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, Calendar, Clock, Video, ArrowRight } from 'lucide-react'
import { format, parseISO } from 'date-fns'
import { it } from 'date-fns/locale'
import { Button } from '@/components/ui/button'
import { Link } from '@/i18n/routing'
import { useAnalytics } from '@/lib/hooks/useAnalytics'
import type { TimeSlot, BookingFormData } from '@/types/booking'

// ============================================================================
// BOOKING CONFIRMATION - Success Screen
// ============================================================================

interface BookingConfirmationProps {
  slot: TimeSlot
  formData: BookingFormData
  meetLink?: string
  bookingId?: string
  labels: {
    title: string
    subtitle: string
    dateLabel: string
    timeLabel: string
    durationLabel: string
    durationValue: string
    whereLabel: string
    whereValue: string
    meetButton: string
    calendarNote: string
    whatNext: string
    whatNextItems: string[]
    backHome: string
  }
}

export function BookingConfirmation({
  slot,
  formData,
  meetLink,
  bookingId,
  labels,
}: BookingConfirmationProps) {
  const { trackConversion } = useAnalytics()
  const hasTrackedRef = useRef(false)

  const formattedDate = format(parseISO(slot.startTime), 'EEEE d MMMM yyyy', {
    locale: it,
  })
  const formattedTime = format(parseISO(slot.startTime), 'HH:mm', { locale: it })

  useEffect(() => {
    if (hasTrackedRef.current) return

    trackConversion('booking_complete', {
      booking_date: slot.startTime.slice(0, 10),
      booking_time: slot.startTime.slice(11, 16),
      booking_id: bookingId,
    })

    hasTrackedRef.current = true
  }, [bookingId, slot.startTime, trackConversion])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="text-center"
    >
      {/* Success Icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', delay: 0.2, damping: 15 }}
        className="w-20 h-20 mx-auto rounded-full bg-success/20 flex items-center justify-center mb-6"
      >
        <CheckCircle className="w-10 h-10 text-success" />
      </motion.div>

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="text-2xl md:text-3xl font-heading font-bold text-text-primary mb-2">
          {labels.title}
        </h2>
        <p className="text-text-secondary mb-8">
          {labels.subtitle.replace('{nome}', formData.nome)}
        </p>
      </motion.div>

      {/* Appointment Details Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="max-w-md mx-auto p-6 rounded-xl bg-bg-surface/60 border border-border/50 backdrop-blur-sm mb-8"
      >
        <div className="space-y-4">
          {/* Date */}
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-accent-orange/10 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-accent-orange" />
            </div>
            <div className="text-left">
              <p className="text-xs text-text-muted">{labels.dateLabel}</p>
              <p className="text-sm font-medium text-text-primary capitalize">
                {formattedDate}
              </p>
            </div>
          </div>

          {/* Time */}
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-accent-orange/10 flex items-center justify-center">
              <Clock className="w-5 h-5 text-accent-orange" />
            </div>
            <div className="text-left">
              <p className="text-xs text-text-muted">{labels.timeLabel}</p>
              <p className="text-sm font-medium text-text-primary">{formattedTime}</p>
            </div>
          </div>

          {/* Duration */}
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-accent-orange/10 flex items-center justify-center">
              <Clock className="w-5 h-5 text-accent-orange" />
            </div>
            <div className="text-left">
              <p className="text-xs text-text-muted">{labels.durationLabel}</p>
              <p className="text-sm font-medium text-text-primary">
                {labels.durationValue}
              </p>
            </div>
          </div>

          {/* Where */}
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-accent-orange/10 flex items-center justify-center">
              <Video className="w-5 h-5 text-accent-orange" />
            </div>
            <div className="text-left">
              <p className="text-xs text-text-muted">{labels.whereLabel}</p>
              <p className="text-sm font-medium text-text-primary">
                {labels.whereValue}
              </p>
            </div>
          </div>
        </div>

        {/* Meet Link Button */}
        {meetLink && (
          <a
            href={meetLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-accent-orange text-white font-medium hover:bg-accent-orange/90 transition-colors"
          >
            <Video className="w-5 h-5" />
            {labels.meetButton}
          </a>
        )}

        <p className="mt-4 text-xs text-text-muted">{labels.calendarNote}</p>
      </motion.div>

      {/* What's Next */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="max-w-md mx-auto text-left mb-8"
      >
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
          {labels.whatNext}
        </h3>
        <ul className="space-y-3">
          {labels.whatNextItems.map((item, index) => (
            <li key={index} className="flex items-start gap-3 text-sm">
              <span className="text-accent-orange">→</span>
              <span className="text-text-secondary">{item}</span>
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Back Home Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <Link href="/">
          <Button variant="secondary" className="group">
            {labels.backHome}
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </motion.div>
    </motion.div>
  )
}
