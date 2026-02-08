'use client'

import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

export type QuoteStep = 'project' | 'details' | 'features' | 'timeline' | 'contact' | 'summary'

interface QuoteStepsProps {
  currentStep: QuoteStep
  labels: {
    project: string
    details: string
    features: string
    timeline: string
    contact: string
    summary: string
  }
}

const STEPS: QuoteStep[] = ['project', 'details', 'features', 'timeline', 'contact', 'summary']

export function QuoteSteps({ currentStep, labels }: QuoteStepsProps) {
  const currentIndex = STEPS.indexOf(currentStep)

  return (
    <div className="flex items-center justify-center gap-1 sm:gap-2 md:gap-3">
      {STEPS.map((step, index) => {
        const isCompleted = index < currentIndex
        const isCurrent = index === currentIndex

        return (
          <div key={step} className="flex items-center">
            {/* Step Circle + Label */}
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  'w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300',
                  isCompleted && 'bg-success text-white',
                  isCurrent && 'bg-accent-orange text-white ring-4 ring-accent-orange/20',
                  !isCompleted && !isCurrent && 'bg-bg-elevated text-text-muted border border-border'
                )}
              >
                {isCompleted ? (
                  <Check className="w-4 h-4 sm:w-5 sm:h-5" />
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>
              <span
                className={cn(
                  'mt-2 text-[10px] sm:text-xs font-medium transition-colors whitespace-nowrap',
                  isCurrent ? 'text-text-primary' : 'text-text-muted'
                )}
              >
                <span className="hidden sm:inline">{labels[step]}</span>
                <span className="sm:hidden">{index + 1}</span>
              </span>
            </div>

            {/* Connector Line */}
            {index < STEPS.length - 1 && (
              <div
                className={cn(
                  'w-4 sm:w-8 md:w-12 h-0.5 mx-1 sm:mx-2 transition-colors duration-300',
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
