'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Zap, Sparkles, Shield, CheckCircle } from 'lucide-react'
import { Section, SectionHeader } from '@/components/ui/section'
import { staggerContainer, staggerItem } from '@/lib/motion-variants'

const SOLUTION_ICONS = [Zap, Sparkles, Shield, CheckCircle]
const SOLUTION_KEYS = ['prop1', 'prop2', 'prop3', 'prop4'] as const

export function Solution() {
  const t = useTranslations('solution')

  return (
    <Section id="soluzione">
      <SectionHeader
        title={t('title')}
        description={t('description')}
      />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={staggerContainer}
        className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {SOLUTION_KEYS.map((propKey, index) => {
          const Icon = SOLUTION_ICONS[index]
          return (
            <motion.div
              key={propKey}
              variants={staggerItem}
              whileHover={{ y: -4 }}
              className="group relative overflow-hidden rounded-xl border border-border/50 bg-bg-surface/60 backdrop-blur-sm p-6 hover:border-accent-orange/30 transition-all duration-300"
            >
              {/* Background Gradient on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent-orange/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative z-10">
                {/* Icon */}
                <div className="w-12 h-12 rounded-lg bg-accent-orange/10 flex items-center justify-center mb-4 group-hover:bg-accent-orange/20 transition-colors">
                  <Icon className="w-6 h-6 text-accent-orange" aria-hidden="true" />
                </div>

                {/* Subtitle Badge */}
                <div className="inline-block px-3 py-1 rounded-full bg-bg-elevated text-xs font-medium text-accent-orange mb-3">
                  {t(`${propKey}.subtitle`)}
                </div>

                {/* Content */}
                <h3 className="text-lg font-heading font-semibold text-text-primary mb-2">
                  {t(`${propKey}.title`)}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {t(`${propKey}.description`)}
                </p>
              </div>
            </motion.div>
          )
        })}
      </motion.div>
    </Section>
  )
}
