'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Sparkles } from 'lucide-react'

export function HeroHeader() {
  const t = useTranslations('portfolio.hero')

  return (
    <div className="relative z-20 mx-auto max-w-4xl px-4 pb-12 pt-12 text-center md:pb-20 md:pt-24">
      {/* Badge */}
      <motion.div
        className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent-orange/30 bg-accent-orange/10 px-4 py-2 text-sm font-medium text-accent-orange backdrop-blur-sm"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Sparkles className="h-4 w-4" />
        <span>{t('badge')}</span>
      </motion.div>

      {/* Title with Gradient Highlight */}
      <motion.h1
        className="mb-6 font-heading text-5xl font-bold leading-tight tracking-tight text-text-primary md:text-6xl lg:text-7xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        {t('title')}{' '}
        <span className="bg-gradient-to-r from-accent-orange to-accent-amber bg-clip-text text-transparent">
          {t('titleHighlight')}
        </span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        className="mx-auto max-w-2xl text-lg leading-relaxed text-text-secondary md:text-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {t('subtitle')}
      </motion.p>
    </div>
  )
}
