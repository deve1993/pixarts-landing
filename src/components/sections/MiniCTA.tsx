'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Link } from '@/i18n/routing'
import { cn } from '@/lib/utils'

interface MiniCTAProps {
  title: string
  subtitle?: string
  primaryLabel: string
  primaryHref: string
  secondaryLabel?: string
  secondaryHref?: string
  className?: string
}

export function MiniCTA({
  title,
  subtitle,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
  className,
}: MiniCTAProps) {
  return (
    <section className={cn('py-16 md:py-24 px-6 max-w-7xl mx-auto', className)}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-3xl border border-accent-orange/30 bg-gradient-to-br from-accent-orange/10 via-accent-amber/5 to-transparent p-8 md:p-12 lg:p-16 backdrop-blur-sm text-center"
      >
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent-orange/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-accent-amber/20 blur-3xl" />

        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-primary mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="text-lg text-text-secondary mb-8">
              {subtitle}
            </p>
          )}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={primaryHref}>
              <Button size="lg" className="group px-8 py-6 text-base shadow-xl shadow-accent-orange/20">
                <span>{primaryLabel}</span>
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            {secondaryLabel && secondaryHref && (
              <Link href={secondaryHref}>
                <Button size="lg" variant="secondary" className="px-8 py-6 text-base">
                  {secondaryLabel}
                </Button>
              </Link>
            )}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
