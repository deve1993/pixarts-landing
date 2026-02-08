'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Clock, Lock, Headphones, Award } from 'lucide-react'

const BADGE_ICONS = [Clock, Lock, Headphones, Award]
const BADGE_KEYS = ['delivery', 'secure', 'support', 'projects'] as const

export function TrustBadges() {
  const t = useTranslations('trustBadges')

  return (
    <section className="-mt-8 overflow-hidden">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap justify-center items-center gap-5 md:gap-8"
        >
          {BADGE_KEYS.map((badgeKey, index) => {
            const Icon = BADGE_ICONS[index]
            return (
              <motion.div
                key={badgeKey}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.1,
                  duration: 0.4,
                  ease: [0.22, 1, 0.36, 1],
                  scale: { duration: 0.2 },
                  y: { duration: 0.2 },
                }}
                whileHover={{ scale: 1.15, y: -2 }}
                className="flex items-center gap-2 text-text-muted hover:text-accent-orange cursor-default transition-colors duration-200"
              >
                <Icon className="w-4 h-4 text-accent-orange" />
                <span className="text-sm font-medium">
                  {t(badgeKey)}
                </span>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
