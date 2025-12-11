'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { cn } from '@/lib/utils'
import { useMediaQuery } from '@/lib/hooks/useMediaQuery'

interface SatelliteCardProps {
  projectKey: 'flowmatics' | 'quickfy' | 'benetti' | 'fl1'
  projectName: string
  position: 'top-left' | 'top-right' | 'bottom-right' | 'bottom-center'
  className?: string
}

const contentVariants = {
  hidden: {
    opacity: 0,
    height: 0,
    transition: { duration: 0.2 },
  },
  visible: {
    opacity: 1,
    height: 'auto',
    transition: { duration: 0.3, delay: 0.1 },
  },
}

const metricsVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
  },
}

const metricVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
}

export function SatelliteCard({
  projectKey,
  projectName,
  position,
  className,
}: SatelliteCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const isMobile = useMediaQuery('(max-width: 1023px)')
  const t = useTranslations('socialProof')

  const handleInteraction = () => {
    if (isMobile) {
      setIsExpanded(!isExpanded)
    }
  }

  const handleMouseEnter = () => {
    if (!isMobile) setIsExpanded(true)
  }

  const handleMouseLeave = () => {
    if (!isMobile) setIsExpanded(false)
  }

  return (
    <motion.div
      layout
      onClick={handleInteraction}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{
        opacity: 1,
        scale: 1,
        width: isMobile ? '100%' : isExpanded ? 350 : 180,
      }}
      transition={{
        width: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.4 },
        scale: { duration: 0.4 },
      }}
      role="article"
      aria-expanded={isExpanded}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          setIsExpanded(!isExpanded)
        }
      }}
      className={cn(
        // Base glassmorphism
        'rounded-xl border border-border/50 bg-bg-surface/80 backdrop-blur-md',
        // Padding
        'p-4 lg:p-5',
        // Hover state (desktop only)
        'lg:hover:border-accent-orange/40 lg:hover:bg-bg-surface/90',
        // Cursor
        'cursor-default',
        // Transition per colori
        'transition-colors duration-300',
        // Overflow per animazione contenuti
        'overflow-hidden',
        // Shadow
        'shadow-lg shadow-black/20',
        className
      )}
    >
      {/* Header: sempre visibile */}
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <h3 className="text-lg font-heading font-bold text-text-primary truncate">
            {projectName}
          </h3>
          <p className="text-xs text-text-muted mt-0.5 truncate">
            {t(`projects.${projectKey}.type`)}
          </p>
        </div>

        {/* Indicatore espansione (mobile) */}
        {isMobile && (
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="flex-shrink-0 text-text-muted"
          >
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        )}
      </div>

      {/* Contenuto Espanso */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={contentVariants}
            className="overflow-hidden"
          >
            {/* Results/Metriche */}
            <motion.div
              variants={metricsVariants}
              className="grid grid-cols-3 gap-2 py-3 mt-3 border-y border-border/30"
            >
              {[1, 2, 3].map((i) => (
                <motion.div key={i} variants={metricVariants} className="text-center">
                  <div className="text-sm lg:text-base font-heading font-bold gradient-text">
                    {t(`projects.${projectKey}.result${i}.value`)}
                  </div>
                  <p className="text-[10px] lg:text-xs text-text-muted mt-0.5 leading-tight">
                    {t(`projects.${projectKey}.result${i}.label`)}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            {/* Challenge */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
              className="mt-3"
            >
              <h4 className="text-[10px] font-semibold text-accent-orange uppercase tracking-wide mb-1">
                {t('challenge')}
              </h4>
              <p className="text-xs text-text-secondary leading-relaxed">
                {t(`projects.${projectKey}.challenge`)}
              </p>
            </motion.div>

            {/* Solutions */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              className="mt-3"
            >
              <h4 className="text-[10px] font-semibold text-accent-orange uppercase tracking-wide mb-1">
                {t('solutions')}
              </h4>
              <ul className="space-y-1">
                {[1, 2].map((i) => (
                  <li
                    key={i}
                    className="flex items-start gap-1.5 text-xs text-text-secondary"
                  >
                    <div className="w-1 h-1 rounded-full bg-accent-orange mt-1.5 flex-shrink-0" />
                    <span className="leading-relaxed">{t(`projects.${projectKey}.solution${i}`)}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
