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
    <div className="w-full overflow-x-auto pb-4">
      <div className="flex items-center justify-between min-w-[600px] px-2">
        {STEPS.map((step, index) => {
          const isCompleted = index < currentIndex
          const isCurrent = index === currentIndex
          const isPending = index > currentIndex

          return (
            <div key={step} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center relative z-10">
                <div
                  className={cn(
                    'w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 border-2',
                    isCompleted && 'bg-success border-success text-white',
                    isCurrent && 'bg-accent-orange border-accent-orange text-white ring-4 ring-accent-orange/20',
                    isPending && 'bg-bg-elevated border-border text-text-muted'
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
                    'mt-2 text-xs font-medium transition-colors absolute top-full w-32 text-center',
                    isCurrent && 'text-text-primary',
                    !isCurrent && 'text-text-muted'
                  )}
                >
                  {labels[step]}
                </span>
              </div>

              {index < STEPS.length - 1 && (
                <div
                  className={cn(
                    'flex-1 h-0.5 mx-2 sm:mx-4 transition-colors duration-300',
                    index < currentIndex ? 'bg-success' : 'bg-border'
                  )}
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
