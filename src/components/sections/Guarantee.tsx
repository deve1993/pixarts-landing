'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Shield, Clock, RotateCcw, Users } from 'lucide-react'
import { Section } from '@/components/ui/section'
import { MatrixRain } from '@/components/ui/MatrixRain'
import { staggerContainer, staggerItem, scaleIn } from '@/lib/motion-variants'

const GUARANTEE_ICONS = [Clock, RotateCcw, Users]
const GUARANTEE_KEYS = ['guarantee1', 'guarantee2', 'guarantee3'] as const

export function Guarantee() {
  const t = useTranslations('guarantee')

  return (
    <Section id="garanzia">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={scaleIn}
        className="relative"
      >
        <div className="relative rounded-3xl border border-accent-orange/30 bg-bg-surface/60 backdrop-blur-sm p-8 md:p-12">
          {/* Header */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', duration: 0.6 }}
              className="w-16 h-16 mx-auto rounded-full bg-accent-orange/20 flex items-center justify-center mb-6"
            >
              <Shield className="w-8 h-8 text-accent-orange" />
            </motion.div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-primary mb-4">
              {t('title')}
            </h2>
            <p className="text-text-secondary max-w-xl mx-auto">
              {t('description')}
            </p>
          </div>

          {/* Guarantees Grid */}
          <motion.div
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-6"
          >
            {GUARANTEE_KEYS.map((guaranteeKey, index) => {
              const Icon = GUARANTEE_ICONS[index]
              return (
                <motion.div
                  key={guaranteeKey}
                  variants={staggerItem}
                  whileHover={{ y: -4 }}
                  className="relative group rounded-2xl border border-border/50 bg-bg-surface/60 backdrop-blur-sm p-6 hover:border-accent-orange/30 transition-all duration-300 overflow-hidden"
                >
                  {/* Matrix Rain Effect - Only visible on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl overflow-hidden">
                    <MatrixRain />
                  </div>

                  <div className="relative z-10 flex items-start gap-4">
                    {/* Icon */}
                    <div className="flex-shrink-0">
                      <div className="w-14 h-14 rounded-xl bg-bg-elevated flex items-center justify-center">
                        <Icon className="w-6 h-6 text-text-secondary group-hover:text-accent-orange transition-colors" />
                      </div>
                    </div>

                    {/* Content */}
                    <div>
                      <h3 className="text-lg font-heading font-semibold text-text-primary mb-2">
                        {t(`${guaranteeKey}.title`)}
                      </h3>
                      <p className="text-text-secondary text-sm leading-relaxed">
                        {t(`${guaranteeKey}.description`)}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </motion.div>
    </Section>
  )
}
