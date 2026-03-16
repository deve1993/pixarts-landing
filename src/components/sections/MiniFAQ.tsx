'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { cn } from '@/lib/utils'

const MINI_FAQ_KEYS = ['q1', 'q2', 'q3'] as const

export function MiniFAQ() {
  const t = useTranslations('miniFaq')
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const items = MINI_FAQ_KEYS.map((key) => ({
    id: `mini-faq-${key}`,
    question: t(`${key}.question`),
    answer: t(`${key}.answer`),
  }))

  return (
    <section className="py-8 px-6">
      <div className="max-w-3xl mx-auto">
        <p className="text-center text-sm font-medium text-text-muted uppercase tracking-wider mb-6">
          {t('title')}
        </p>

        <div className="space-y-3">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                aria-expanded={openIndex === index}
                aria-controls={`${item.id}-content`}
                className={cn(
                  'w-full text-left rounded-xl border bg-bg-surface/60 backdrop-blur-sm px-5 py-4 transition-all duration-200',
                  openIndex === index
                    ? 'border-accent-orange/40'
                    : 'border-border/40 hover:border-accent-orange/25'
                )}
              >
                <div className="flex items-center justify-between gap-4">
                  <h3
                    id={`${item.id}-heading`}
                    className="text-base font-semibold text-text-primary text-left"
                  >
                    {item.question}
                  </h3>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="shrink-0"
                    aria-hidden="true"
                  >
                    <ChevronDown
                      className={cn(
                        'w-4 h-4 transition-colors',
                        openIndex === index ? 'text-accent-orange' : 'text-text-muted'
                      )}
                    />
                  </motion.div>
                </div>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      id={`${item.id}-content`}
                      role="region"
                      aria-labelledby={`${item.id}-heading`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <p className="text-text-secondary text-sm leading-relaxed mt-3 pt-3 border-t border-border/50">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
