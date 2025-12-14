'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Palette, TrendingUp, Search, Headphones, Smartphone, Lock } from 'lucide-react'
import { Section } from '@/components/ui/section'
import { staggerContainer, staggerItem, fadeInUp } from '@/lib/motion-variants'

const BENEFIT_ICONS = [Palette, TrendingUp, Search, Headphones, Smartphone, Lock]
const BENEFIT_KEYS = ['benefit1', 'benefit2', 'benefit3', 'benefit4', 'benefit5', 'benefit6'] as const

export function Benefits() {
  const t = useTranslations('benefits')

  return (
    <Section id="vantaggi">
      {/* Custom Header with Pixarts logo styling */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={fadeInUp}
        className="mb-16 text-center"
      >
        <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4 text-balance">
          {t('titlePrefix')}{' '}
          <span className="font-megrim font-normal tracking-wide">
            <span className="text-text-primary">Pi</span>
            <span className="text-accent-orange">x</span>
            <span className="text-text-primary">arts</span>
          </span>
        </h2>
        <p className="text-lg text-text-secondary max-w-2xl mx-auto text-balance">
          {t('description')}
        </p>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={staggerContainer}
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {BENEFIT_KEYS.map((benefitKey, index) => {
          const Icon = BENEFIT_ICONS[index]
          return (
            <motion.div
              key={benefitKey}
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

                {/* Content */}
                <h3 className="text-lg font-heading font-semibold text-text-primary mb-2">
                  {t(`${benefitKey}.title`)}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {t(`${benefitKey}.description`)}
                </p>
              </div>
            </motion.div>
          )
        })}
      </motion.div>
    </Section>
  )
}
