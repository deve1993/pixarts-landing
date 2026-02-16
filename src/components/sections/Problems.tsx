'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { CircleX, Clock, CircuitBoard, AlertTriangle } from 'lucide-react'
import { Section, SectionHeader } from '@/components/ui/section'
import { staggerContainer, staggerItem } from '@/lib/motion-variants'

const PROBLEM_ICONS = [CircleX, Clock, CircuitBoard]
const PROBLEM_KEYS = ['problem1', 'problem2', 'problem3'] as const

export function Problems() {
  const t = useTranslations('problems')

  return (
    <Section id="problemi">
      <SectionHeader
        title={t('title')}
        description={t('description')}
      />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={staggerContainer}
        className="grid md:grid-cols-3 gap-6"
      >
        {PROBLEM_KEYS.map((problemKey, index) => {
          const Icon = PROBLEM_ICONS[index]
          return (
            <motion.div
              key={problemKey}
              variants={staggerItem}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="group relative overflow-hidden rounded-xl border border-border/50 bg-bg-surface/60 backdrop-blur-sm p-8 hover:border-error/50 hover:shadow-[0_0_24px_rgba(248,113,113,0.15)] transition-all duration-300"
            >
              {/* Background Gradient on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-error/8 via-error/4 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Corner Accent */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-error/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-bl-full" />

              <div className="relative z-10">
                {/* Badge "Problema N" */}
                <div className="flex items-center gap-2 mb-6">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-error/10 border border-error/20 group-hover:bg-error/20 transition-colors">
                    <AlertTriangle className="w-3.5 h-3.5 text-error" aria-hidden="true" />
                    <span className="text-xs font-medium text-error">
                      {t(`problemLabel`, { n: index + 1 })}
                    </span>
                  </div>
                </div>

                {/* Icon con effetti migliorati */}
                <motion.div
                  whileHover={{ rotate: [0, -5, 5, -5, 0], scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                  className="w-16 h-16 rounded-xl bg-gradient-to-br from-error/15 to-error/5 border border-error/20 flex items-center justify-center mb-6 group-hover:border-error/40 group-hover:shadow-[0_0_16px_rgba(248,113,113,0.2)] transition-all duration-300"
                  aria-hidden="true"
                >
                  <Icon className="w-8 h-8 text-error" />
                </motion.div>

                {/* Content */}
                <h3 className="text-xl font-heading font-semibold text-text-primary mb-3 group-hover:text-white transition-colors">
                  {t(`${problemKey}.title`)}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {t(`${problemKey}.description`)}
                </p>
              </div>

              {/* Bottom Accent Bar */}
              <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-error via-error/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </motion.div>
          )
        })}
      </motion.div>
    </Section>
  )
}
