'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface PageHeroProps {
  title: string
  highlight?: string
  subtitle: string
  className?: string
}

export function PageHero({ title, highlight, subtitle, className }: PageHeroProps) {
  return (
    <section className={cn('pt-32 pb-16 md:pt-40 md:pb-20 px-6 max-w-7xl mx-auto', className)}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="text-center max-w-3xl mx-auto"
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-text-primary mb-6">
          {title}{' '}
          {highlight && (
            <span className="bg-gradient-to-r from-accent-orange to-accent-amber bg-clip-text text-transparent">
              {highlight}
            </span>
          )}
        </h1>
        <p className="text-lg md:text-xl text-text-secondary leading-relaxed">
          {subtitle}
        </p>
      </motion.div>
    </section>
  )
}
