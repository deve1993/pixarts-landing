'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Zap, Shield, Clock } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { AnimatedCounter } from '@/components/AnimatedCounter'
import { HeroLogo } from '@/components/HeroLogo'
import { useAnalytics } from '@/lib/hooks/useAnalytics'
import { scrollToElement } from '@/lib/utils'

// Animation variants
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
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

// Stat icons mapping
const statIcons = [Zap, Shield, Clock]

// Stats data (values for AnimatedCounter)
const STATS_DATA = [
  { value: 12, suffix: '+', labelKey: 'projects' },
  { value: 95, suffix: '%', labelKey: 'satisfaction' },
  { value: 10, suffix: ' giorni', labelKey: 'delivery' },
] as const

export function Hero() {
  const t = useTranslations('hero')
  const tStats = useTranslations('stats')
  const { trackEvent } = useAnalytics()

  // Use translations for hero content
  const heroData = {
    title1: t('title1'),
    title2: t('title2'),
    title3: t('title3'),
    title4: t('title4'),
    subtitle1: t('subtitle1'),
    subtitle2: t('subtitle2'),
    subtitle3: t('subtitle3'),
    ctaPrimary: t('ctaPrimary'),
    ctaSecondary: t('ctaSecondary'),
  }

  // Use translations for stats
  const statsData = STATS_DATA.map((stat) => ({
    value: stat.value,
    suffix: stat.suffix,
    label: tStats(stat.labelKey),
  }))

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 md:pt-24 pb-20 md:pb-32">
      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="text-center"
        >
          {/* Hero Logo with Particles */}
          <motion.div variants={itemVariants} className="mb-12">
            <HeroLogo />
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-heading font-bold mb-8 leading-[1.1] tracking-tight"
          >
            <span className="block mb-2">
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-accent-orange via-accent-amber to-accent-orange bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-rotate">
                  {heroData.title1}
                </span>
              </span>
              {' '}
              <span className="text-text-primary">{heroData.title2}</span>
            </span>
            <span className="block text-text-primary">
              {heroData.title3}{' '}
              <span className="relative inline-block">
                <span className="relative z-10">{heroData.title4}</span>
                <motion.span
                  className="absolute -bottom-2 left-0 right-0 h-3 bg-gradient-to-r from-accent-orange/30 to-accent-amber/30 rounded-full -z-10"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 1, duration: 0.8, ease: 'easeOut' }}
                />
              </span>
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl lg:text-2xl text-text-secondary max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            {heroData.subtitle1}{' '}
            <span className="text-text-primary font-semibold">{heroData.subtitle2}</span>.
            <br className="hidden sm:block" />
            {heroData.subtitle3}{' '}
            <span className="text-accent-orange font-semibold">100%</span>.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-32"
          >
            <Button
              size="lg"
              className="group text-base px-8 py-6 shadow-xl shadow-accent-orange/20"
              onClick={() => {
                trackEvent('cta_click', {
                  cta_name: 'hero_primary',
                  cta_location: 'hero',
                })
                scrollToElement('contatti')
              }}
            >
              <span>{heroData.ctaPrimary}</span>
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="secondary"
              className="text-base px-8 py-6"
              onClick={() => {
                trackEvent('cta_click', {
                  cta_name: 'hero_secondary',
                  cta_location: 'hero',
                })
                scrollToElement('portfolio')
              }}
            >
              {heroData.ctaSecondary}
            </Button>
          </motion.div>

          {/* Stats Cards with Floating Animation */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-6 max-w-3xl mx-auto"
          >
            {statsData.map((stat, index) => {
              const Icon = statIcons[index] || Zap
              return (
                <motion.div
                  key={`stat-${index}`}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                  }}
                  transition={{
                    opacity: { delay: 1 + index * 0.15, duration: 0.5 },
                    scale: { delay: 1 + index * 0.15, duration: 0.5 },
                    y: { delay: 1 + index * 0.15, duration: 0.5 },
                  }}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="relative group"
                >
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-accent-orange/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="relative bg-bg-surface/60 backdrop-blur-sm border border-border/50 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 hover:border-accent-orange/30 transition-colors">
                    <div className="flex items-center justify-center gap-3 mb-2 sm:mb-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-gradient-to-br from-accent-orange/20 to-accent-amber/10 flex items-center justify-center">
                        <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-accent-orange" />
                      </div>
                    </div>
                    <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-heading font-bold bg-gradient-to-r from-accent-orange to-accent-amber bg-clip-text text-transparent mb-0.5 sm:mb-1">
                      <AnimatedCounter
                        end={stat.value}
                        suffix={stat.suffix}
                        duration={2000}
                      />
                    </div>
                    <p className="text-[10px] sm:text-xs md:text-sm text-text-muted font-medium">
                      {stat.label}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </motion.div>
      </div>

    </section>
  )
}
