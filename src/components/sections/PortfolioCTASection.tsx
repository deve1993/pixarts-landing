'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Briefcase } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import { Button } from '@/components/ui/button'
import { Section } from '@/components/ui/section'

export function PortfolioCTASection() {
  const t = useTranslations('portfolioCta')

  return (
    <Section className="py-16 md:py-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-3xl border border-accent-orange/30 bg-gradient-to-br from-accent-orange/10 via-accent-amber/5 to-transparent p-8 backdrop-blur-sm md:p-12 lg:p-16"
      >
        {/* Decorative Glow */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent-orange/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-accent-amber/20 blur-3xl" />

        {/* Content */}
        <div className="relative z-10 mx-auto max-w-3xl text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent-orange/30 bg-accent-orange/10 px-4 py-2 text-sm font-medium text-accent-orange backdrop-blur-sm"
          >
            <Briefcase className="h-4 w-4" />
            <span>{t('badge')}</span>
          </motion.div>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mb-4 font-heading text-3xl font-bold text-text-primary md:text-4xl lg:text-5xl"
          >
            {t('title')}{' '}
            <span className="bg-gradient-to-r from-accent-orange to-accent-amber bg-clip-text text-transparent">
              {t('titleHighlight')}
            </span>
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mb-8 text-lg text-text-secondary md:text-xl"
          >
            {t('description')}
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <Link href="/portfolio">
              <Button
                size="lg"
                className="group px-8 py-6 text-base shadow-xl shadow-accent-orange/20"
              >
                <span>{t('ctaPrimary')}</span>
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-text-muted"
          >
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-accent-orange" />
              <span>{t('trust1')}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-accent-orange" />
              <span>{t('trust2')}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-accent-orange" />
              <span>{t('trust3')}</span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </Section>
  )
}
