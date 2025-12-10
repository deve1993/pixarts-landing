'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, Loader2, AlertCircle } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { addMonths, format, startOfMonth } from 'date-fns'
import { Button } from '@/components/ui/button'
import { BookingSteps, type BookingStep } from './BookingSteps'
import { BookingSummary } from './BookingSummary'
import { CalendarMonth } from './CalendarMonth'
import { TimeSlotGrid } from './TimeSlotGrid'
import { BookingForm } from './BookingForm'
import { BookingConfirmation } from './BookingConfirmation'
import { useAvailability } from '@/lib/hooks/useAvailability'
import { useBookingFlow } from '@/lib/hooks/useBookingFlow'
import { BOOKING_CONFIG } from '@/lib/booking-config'
import type { TimeSlot, BookingFormData } from '@/types/booking'
import type { BookingFormValues } from '@/lib/validations/booking'

// ============================================================================
// BOOKING WIDGET - Main Container with State Machine
// ============================================================================

const WEEK_DAYS_IT = ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom']

export function BookingWidget() {
  const t = useTranslations('booking')
  const [currentMonth, setCurrentMonth] = useState(() => startOfMonth(new Date()))

  const {
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
  } = useBookingFlow()

  const { availability, slots, isLoadingAvailability, isLoadingSlots } = useAvailability(
    format(currentMonth, 'yyyy-MM'),
    selectedDate
  )

  const minDate = new Date()
  const maxDate = addMonths(new Date(), BOOKING_CONFIG.maxAdvanceDays / 30)

  const handleDateSelect = useCallback(
    (date: string) => {
      selectDate(date)
    },
    [selectDate]
  )

  const handleSlotSelect = useCallback(
    (slot: TimeSlot) => {
      selectSlot(slot)
    },
    [selectSlot]
  )

  const handleFormSubmit = useCallback(
    async (data: BookingFormValues) => {
      const bookingFormData: BookingFormData = {
        nome: data.nome,
        cognome: data.cognome,
        email: data.email,
        telefono: data.telefono,
        azienda: data.azienda,
        ruolo: data.ruolo,
        messaggio: data.messaggio,
        privacy: data.privacy,
      }
      await submitBooking(bookingFormData)
    },
    [submitBooking]
  )

  const stepLabels = {
    date: t('steps.date'),
    time: t('steps.time'),
    form: t('steps.form'),
    confirm: t('steps.confirm'),
  }

  const summaryLabels = {
    selectedDate: t('summary.selectedDate'),
    selectedTime: t('summary.selectedTime'),
    yourInfo: t('summary.yourInfo'),
    notSelected: t('summary.notSelected'),
  }

  const slotLabels = {
    loading: t('slots.loading'),
    noSlots: t('slots.noSlots'),
    selectTime: t('slots.selectTime'),
  }

  const confirmationLabels = {
    title: t('confirmation.title'),
    subtitle: t('confirmation.subtitle', { nome: formData?.nome || '' }),
    dateLabel: t('confirmation.dateLabel'),
    timeLabel: t('confirmation.timeLabel'),
    durationLabel: t('confirmation.durationLabel'),
    durationValue: t('confirmation.durationValue'),
    whereLabel: t('confirmation.whereLabel'),
    whereValue: t('confirmation.whereValue'),
    meetButton: t('confirmation.meetButton'),
    calendarNote: t('confirmation.calendarNote'),
    whatNext: t('confirmation.whatNext'),
    whatNextItems: t.raw('confirmation.whatNextItems') as string[],
    backHome: t('confirmation.backHome'),
  }

  const contentVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, x: -20, transition: { duration: 0.2 } },
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Steps Indicator */}
      {step !== 'confirm' && (
        <div className="mb-8">
          <BookingSteps currentStep={step} labels={stepLabels} />
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-2">
          <div className="p-6 md:p-8 rounded-xl border border-border/50 bg-bg-surface/60 backdrop-blur-sm">
            <AnimatePresence mode="wait">
              {/* Step 1: Date Selection */}
              {step === 'date' && (
                <motion.div
                  key="date"
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <h2 className="text-xl font-heading font-semibold text-text-primary mb-6">
                    {t('dateStep.title')}
                  </h2>

                  {isLoadingAvailability ? (
                    <div className="flex items-center justify-center py-12">
                      <Loader2 className="w-8 h-8 animate-spin text-accent-orange" />
                    </div>
                  ) : (
                    <CalendarMonth
                      currentMonth={currentMonth}
                      selectedDate={selectedDate}
                      availability={availability}
                      onDateSelect={handleDateSelect}
                      onMonthChange={setCurrentMonth}
                      labels={{ weekDays: WEEK_DAYS_IT }}
                      minDate={minDate}
                      maxDate={maxDate}
                    />
                  )}

                  {/* Next Button */}
                  <div className="mt-8 flex justify-end">
                    <Button
                      onClick={() => setStep('time')}
                      disabled={!selectedDate}
                      className="group"
                    >
                      {t('dateStep.next')}
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Time Selection */}
              {step === 'time' && (
                <motion.div
                  key="time"
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <h2 className="text-xl font-heading font-semibold text-text-primary mb-6">
                    {t('timeStep.title')}
                  </h2>

                  <TimeSlotGrid
                    slots={slots}
                    selectedSlot={selectedSlot}
                    onSlotSelect={handleSlotSelect}
                    isLoading={isLoadingSlots}
                    labels={slotLabels}
                  />

                  {/* Navigation Buttons */}
                  <div className="mt-8 flex justify-between">
                    <Button variant="ghost" onClick={goBack}>
                      <ArrowLeft className="mr-2 w-4 h-4" />
                      {t('timeStep.back')}
                    </Button>
                    <Button
                      onClick={() => setStep('form')}
                      disabled={!selectedSlot}
                      className="group"
                    >
                      {t('timeStep.next')}
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Form */}
              {step === 'form' && (
                <motion.div
                  key="form"
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <h2 className="text-xl font-heading font-semibold text-text-primary mb-6">
                    {t('formStep.title')}
                  </h2>

                  {error && (
                    <div className="mb-6 flex items-center gap-2 p-4 rounded-lg bg-error/10 border border-error/30">
                      <AlertCircle className="w-5 h-5 text-error flex-shrink-0" />
                      <p className="text-sm text-error">{error}</p>
                    </div>
                  )}

                  <BookingForm
                    onSubmit={handleFormSubmit}
                    isLoading={isSubmitting}
                    defaultValues={formData ?? undefined}
                  />

                  {/* Back Button */}
                  <div className="mt-6">
                    <Button
                      variant="ghost"
                      onClick={goBack}
                      disabled={isSubmitting}
                    >
                      <ArrowLeft className="mr-2 w-4 h-4" />
                      {t('formStep.back')}
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* Step 4: Confirmation */}
              {step === 'confirm' && selectedSlot && formData && (
                <motion.div
                  key="confirm"
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <BookingConfirmation
                    slot={selectedSlot}
                    formData={formData}
                    meetLink={bookingResult?.meetLink}
                    labels={confirmationLabels}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Sidebar - Summary */}
        {step !== 'confirm' && (
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <h3 className="text-sm font-medium text-text-muted mb-4">
                {t('summary.title')}
              </h3>
              <BookingSummary
                selectedDate={selectedDate ?? undefined}
                selectedSlot={selectedSlot ?? undefined}
                formData={formData ?? undefined}
                labels={summaryLabels}
              />

              {/* Info Box */}
              <div className="mt-6 p-4 rounded-lg bg-accent-orange/5 border border-accent-orange/20">
                <h4 className="text-sm font-medium text-text-primary mb-2">
                  {t('info.title')}
                </h4>
                <ul className="space-y-2 text-xs text-text-secondary">
                  <li className="flex items-start gap-2">
                    <span className="text-accent-orange">•</span>
                    {t('info.duration')}
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent-orange">•</span>
                    {t('info.free')}
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent-orange">•</span>
                    {t('info.googleMeet')}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
