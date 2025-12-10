'use client'

import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

// ============================================================================
// BOOKING STEPS - Progress Indicator
// ============================================================================

export type BookingStep = 'date' | 'time' | 'form' | 'confirm'

interface BookingStepsProps {
  currentStep: BookingStep
  labels: {
    date: string
    time: string
    form: string
    confirm: string
  }
}

const STEPS: BookingStep[] = ['date', 'time', 'form', 'confirm']

export function BookingSteps({ currentStep, labels }: BookingStepsProps) {
  const currentIndex = STEPS.indexOf(currentStep)

  return (
    <div className="flex items-center justify-center gap-2 sm:gap-4">
      {STEPS.map((step, index) => {
        const isCompleted = index < currentIndex
        const isCurrent = index === currentIndex
        const isPending = index > currentIndex

        return (
          <div key={step} className="flex items-center">
            {/* Step Circle */}
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  'w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300',
                  isCompleted && 'bg-success text-white',
                  isCurrent && 'bg-accent-orange text-white ring-4 ring-accent-orange/20',
                  isPending && 'bg-bg-elevated text-text-muted border border-border'
                )}
              >
                {isCompleted ? (
                  <Check className="w-4 h-4 sm:w-5 sm:h-5" />
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>
              {/* Step Label */}
              <span
                className={cn(
                  'mt-2 text-xs sm:text-sm font-medium transition-colors',
                  isCurrent && 'text-text-primary',
                  !isCurrent && 'text-text-muted'
                )}
              >
                {labels[step]}
              </span>
            </div>

            {/* Connector Line */}
            {index < STEPS.length - 1 && (
              <div
                className={cn(
                  'w-8 sm:w-16 h-0.5 mx-2 sm:mx-4 transition-colors duration-300',
                  index < currentIndex ? 'bg-success' : 'bg-border'
                )}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
