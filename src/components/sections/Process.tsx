'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { MessageSquare, Palette, Code, Rocket, type LucideIcon } from 'lucide-react'
import { Section, SectionHeader } from '@/components/ui/section'

const PROCESS_ICONS = [MessageSquare, Palette, Code, Rocket]
const PROCESS_KEYS = ['step1', 'step2', 'step3', 'step4'] as const

// Animation variants
const timelineLineVariants = {
  hidden: { scaleY: 0 },
  visible: {
    scaleY: 1,
    transition: { duration: 1.5, ease: 'easeOut' }
  }
}

const stepContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2
    }
  }
}

const circleVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { type: 'spring', damping: 15, stiffness: 200 }
  }
}

const contentVariants = {
  hidden: (isLeft: boolean) => ({
    opacity: 0,
    x: isLeft ? -60 : 60
  }),
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
}

const numberLineVariants = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: { duration: 0.5, ease: 'easeOut' }
  }
}

// ProcessStep Component
interface ProcessStepProps {
  stepKey: typeof PROCESS_KEYS[number]
  index: number
  Icon: LucideIcon
  isLeft: boolean
  t: ReturnType<typeof useTranslations>
}

function ProcessStep({ stepKey, index, Icon, isLeft, t }: ProcessStepProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={stepContainerVariants}
      className="relative py-8 lg:py-12"
    >
      {/* Step Number Header */}
      <motion.div
        variants={numberLineVariants}
        className="flex items-center justify-center gap-4 mb-8"
      >
        <div className="hidden sm:block h-px flex-1 max-w-[100px] bg-gradient-to-r from-transparent to-accent-orange/50" />
        <span className="text-4xl sm:text-5xl font-heading font-bold text-accent-orange/20">
          {String(index + 1).padStart(2, '0')}
        </span>
        <div className="hidden sm:block h-px flex-1 max-w-[100px] bg-gradient-to-l from-transparent to-accent-orange/50" />
      </motion.div>

      {/* Main Content - Zigzag Layout */}
      <div className={`flex flex-col lg:flex-row items-center gap-6 lg:gap-12 ${
        isLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'
      }`}>
        {/* Content Card */}
        <motion.div
          custom={isLeft}
          variants={contentVariants}
          className={`flex-1 w-full lg:max-w-md ${
            isLeft ? 'lg:text-right' : 'lg:text-left'
          }`}
        >
          <div className={`p-6 rounded-2xl bg-bg-surface/40 backdrop-blur-sm border border-border/50
                          hover:border-accent-orange/30 transition-all duration-300
                          hover:shadow-lg hover:shadow-accent-orange/5`}>
            <h3 className="text-2xl font-heading font-bold text-text-primary mb-3">
              {t(`${stepKey}.title`)}
            </h3>
            <div className={`inline-flex px-4 py-1.5 rounded-full bg-accent-orange/10
                            border border-accent-orange/30 text-accent-orange text-sm font-semibold mb-4`}>
              {t(`${stepKey}.duration`)}
            </div>
            <p className="text-text-secondary leading-relaxed">
              {t(`${stepKey}.description`)}
            </p>
          </div>
        </motion.div>

        {/* Center Icon Circle */}
        <motion.div
          variants={circleVariants}
          className="relative flex-shrink-0 order-first lg:order-none"
        >
          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-bg-surface/60 backdrop-blur-sm
                       border-2 border-accent-orange flex items-center justify-center
                       shadow-lg shadow-accent-orange/20"
          >
            <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-accent-orange" />

            {/* Glow effect */}
            <div className="absolute inset-0 rounded-full bg-accent-orange/10 blur-xl -z-10" />
          </motion.div>

          {/* Step Number Badge */}
          <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-accent-orange
                         text-white text-sm font-bold flex items-center justify-center
                         shadow-lg shadow-accent-orange/40">
            {index + 1}
          </div>
        </motion.div>

        {/* Spacer for zigzag on desktop */}
        <div className="hidden lg:block flex-1 max-w-md" />
      </div>

    </motion.div>
  )
}

export function Process() {
  const t = useTranslations('process')

  return (
    <Section id="processo" className="overflow-hidden">
      <SectionHeader
        title={t('title')}
        description={t('description')}
      />

      {/* Timeline Container */}
      <div className="relative max-w-4xl mx-auto">
        {/* Steps */}
        <div className="relative">
          {PROCESS_KEYS.map((stepKey, index) => {
            const Icon = PROCESS_ICONS[index]
            const isLeft = index % 2 === 0
            return (
              <ProcessStep
                key={stepKey}
                stepKey={stepKey}
                index={index}
                Icon={Icon}
                isLeft={isLeft}
                t={t}
              />
            )
          })}
        </div>
      </div>

      {/* Total Timeline Badge */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="mt-16 text-center"
      >
        <div className="inline-flex items-center gap-4 px-8 py-4 rounded-2xl
                       bg-bg-surface/60 backdrop-blur-sm border border-border/50
                       shadow-lg shadow-accent-orange/5">
          <span className="text-text-secondary text-lg">{t('total')}</span>
          <span className="font-heading font-bold text-2xl gradient-text">
            {t('totalTime')}
          </span>
        </div>
      </motion.div>
    </Section>
  )
}
