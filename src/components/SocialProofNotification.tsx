'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { CheckCircle, X } from 'lucide-react'

// Mock data for notifications - in real scenario this could come from API
const NOTIFICATION_NAMES = [
  { name: 'Marco B.', company: 'FlowMatics', daysAgo: 2 },
  { name: 'Sofia R.', company: 'Studio Legale', daysAgo: 5 },
  { name: 'Luca M.', company: 'Ristorante Da Luca', daysAgo: 7 },
  { name: 'Giulia P.', company: 'Boutique Moda', daysAgo: 10 },
  { name: 'Alessandro T.', company: 'Tech Solutions', daysAgo: 14 },
]

export function SocialProofNotification() {
  const t = useTranslations('notifications')
  const [isVisible, setIsVisible] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDismissed, setIsDismissed] = useState(false)

  const showNotification = useCallback(() => {
    if (isDismissed) return
    setIsVisible(true)

    // Hide after 5 seconds
    setTimeout(() => {
      setIsVisible(false)
      // Update index for next notification
      setCurrentIndex((prev) => (prev + 1) % NOTIFICATION_NAMES.length)
    }, 5000)
  }, [isDismissed])

  useEffect(() => {
    // Initial delay before first notification
    const initialDelay = setTimeout(() => {
      showNotification()
    }, 8000)

    // Show new notification every 15 seconds
    const interval = setInterval(() => {
      showNotification()
    }, 15000)

    return () => {
      clearTimeout(initialDelay)
      clearInterval(interval)
    }
  }, [showNotification])

  const handleDismiss = () => {
    setIsVisible(false)
    setIsDismissed(true)
  }

  const currentNotification = NOTIFICATION_NAMES[currentIndex]

  return (
    <AnimatePresence>
      {isVisible && !isDismissed && (
        <motion.div
          initial={{ opacity: 0, x: -100, y: 20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 25
          }}
          className="fixed bottom-6 left-6 z-50 max-w-sm"
        >
          <div className="relative flex items-start gap-3 p-4 rounded-xl bg-bg-surface/60 backdrop-blur-sm border border-accent-orange/30 shadow-xl shadow-accent-orange/10">
            {/* Success Icon */}
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-success/20 flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-success" />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-text-primary">
                <span className="font-semibold">{currentNotification.name}</span>
                {' '}
                <span className="text-text-secondary">({currentNotification.company})</span>
              </p>
              <p className="text-sm text-text-secondary mt-0.5">
                {t('newProject')}
              </p>
              <p className="text-xs text-text-muted mt-1">
                {currentNotification.daysAgo} {t('daysAgo')}
              </p>
            </div>

            {/* Close Button */}
            <button
              onClick={handleDismiss}
              className="flex-shrink-0 p-1 rounded-md text-text-muted hover:text-text-primary hover:bg-bg-elevated transition-colors"
              aria-label="Chiudi notifica"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Progress Bar */}
            <motion.div
              initial={{ scaleX: 1 }}
              animate={{ scaleX: 0 }}
              transition={{ duration: 5, ease: 'linear' }}
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent-orange/50 origin-left rounded-b-xl"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
