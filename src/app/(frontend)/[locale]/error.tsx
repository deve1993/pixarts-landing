'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Link } from '@/i18n/routing'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
}

const iconVariants = {
  hidden: { scale: 0, rotate: -180 },
  visible: {
    scale: 1,
    rotate: 0,
    transition: { type: 'spring', stiffness: 200, damping: 15 },
  },
  shake: {
    x: [-5, 5, -5, 5, 0],
    transition: { repeat: Infinity, repeatDelay: 3, duration: 0.5 },
  },
}

export default function Error({ error, reset }: ErrorProps) {
  const t = useTranslations('error')

  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-1/2 -left-1/2 w-full h-full rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(255, 107, 44, 0.1) 0%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute -bottom-1/2 -right-1/2 w-full h-full rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(255, 179, 71, 0.1) 0%, transparent 70%)',
          }}
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 4,
          }}
        />
      </div>

      <motion.div
        className="relative z-10 text-center max-w-lg"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Animated icon */}
        <motion.div
          className="mb-8 flex justify-center"
          variants={iconVariants}
          animate="shake"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-accent-orange/20 blur-xl rounded-full" />
            <div className="relative p-6 rounded-full bg-bg-surface border border-accent-orange/30">
              <AlertTriangle className="w-16 h-16 text-accent-orange" strokeWidth={1.5} />
            </div>
          </div>
        </motion.div>

        {/* Glitch text heading */}
        <motion.h1
          className="text-6xl md:text-7xl font-heading font-bold mb-4 glitch-text gradient-text"
          variants={itemVariants}
        >
          {t('heading')}
        </motion.h1>

        {/* Title */}
        <motion.h2
          className="text-2xl md:text-3xl font-heading font-semibold text-text-primary mb-4"
          variants={itemVariants}
        >
          {t('title')}
        </motion.h2>

        {/* Description */}
        <motion.p
          className="text-text-secondary text-lg mb-8 max-w-md mx-auto"
          variants={itemVariants}
        >
          {t('description')}
        </motion.p>

        {/* Error digest (for debugging) */}
        {error.digest && (
          <motion.div
            className="mb-8 p-4 rounded-lg bg-bg-surface/50 border border-border/50"
            variants={itemVariants}
          >
            <p className="text-sm text-text-muted">
              {t('code')}: <code className="text-accent-orange">{error.digest}</code>
            </p>
          </motion.div>
        )}

        {/* Action buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          variants={itemVariants}
        >
          <Button onClick={reset} className="group">
            <RefreshCw className="w-5 h-5 mr-2 group-hover:rotate-180 transition-transform duration-500" />
            {t('retry')}
          </Button>
          <Button variant="secondary" asChild>
            <Link href="/">
              <Home className="w-5 h-5 mr-2" />
              {t('backHome')}
            </Link>
          </Button>
        </motion.div>

        {/* Decorative elements */}
        <motion.div
          className="absolute top-1/4 left-10 w-2 h-2 bg-accent-orange rounded-full"
          animate={{
            opacity: [0.3, 1, 0.3],
            scale: [1, 1.5, 1],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 right-10 w-3 h-3 bg-accent-amber rounded-full"
          animate={{
            opacity: [0.3, 1, 0.3],
            scale: [1, 1.5, 1],
          }}
          transition={{ duration: 2, repeat: Infinity, delay: 1 }}
        />
      </motion.div>
    </div>
  )
}
