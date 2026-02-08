'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Section, SectionHeader } from '@/components/ui/section'
import { cn } from '@/lib/utils'

const FAQ_KEYS = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6'] as const

export function FAQ() {
  const t = useTranslations('faq')
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  // Use translations for FAQs
  const faqItems = FAQ_KEYS.map(key => ({
    id: `faq-${key}`,
    question: t(`${key}.question`),
    answer: t(`${key}.answer`),
  }))

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <Section id="faq">
      <SectionHeader
        title={t('title')}
        description={t('description')}
      />

      <div className="max-w-3xl mx-auto space-y-4">
        {faqItems.map((faq, index) => (
          <motion.div
            key={faq.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <button
              onClick={() => toggleFaq(index)}
              aria-expanded={openIndex === index}
              aria-controls={`${faq.id}-content`}
              className={cn(
                'w-full text-left rounded-xl border bg-bg-surface/60 backdrop-blur-sm p-6 transition-all duration-300',
                openIndex === index
                  ? 'border-accent-orange/50'
                  : 'border-border/50 hover:border-accent-orange/30'
              )}
            >
              <div className="flex items-start justify-between gap-4">
                <h3 id={`${faq.id}-heading`} className="text-lg font-heading font-semibold text-text-primary pr-4">
                  {faq.question}
                </h3>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex-shrink-0 mt-1"
                  aria-hidden="true"
                >
                  <ChevronDown
                    className={cn(
                      'w-5 h-5 transition-colors',
                      openIndex === index
                        ? 'text-accent-orange'
                        : 'text-text-muted'
                    )}
                  />
                </motion.div>
              </div>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    id={`${faq.id}-content`}
                    role="region"
                    aria-labelledby={`${faq.id}-heading`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <p className="text-text-secondary mt-4 pt-4 border-t border-border leading-relaxed">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
