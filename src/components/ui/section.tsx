'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { fadeInUp } from '@/lib/motion-variants'

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  id?: string
  className?: string
  children: React.ReactNode
}

export function Section({ id, className, children, ...props }: SectionProps) {
  return (
    <section
      id={id}
      className={cn('py-12 md:py-20 lg:py-32 px-6', 'max-w-7xl mx-auto', className)}
      {...props}
    >
      {children}
    </section>
  )
}

interface SectionHeaderProps {
  title: string
  description?: string
  badge?: string
  centered?: boolean
  className?: string
  animate?: boolean
}

export function SectionHeader({
  title,
  description,
  badge,
  centered = true,
  className,
  animate = true,
}: SectionHeaderProps) {
  const content = (
    <div className={cn('mb-16', centered && 'text-center', className)}>
      {badge && (
        <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium text-accent-orange bg-accent-orange/10 border border-accent-orange/20 rounded-full">
          {badge}
        </span>
      )}
      <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4 text-balance">
        {title}
      </h2>
      {description && (
        <p className="text-lg text-text-secondary max-w-2xl mx-auto text-balance">
          {description}
        </p>
      )}
    </div>
  )

  if (animate) {
    return (
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={fadeInUp}
      >
        {content}
      </motion.div>
    )
  }

  return content
}
