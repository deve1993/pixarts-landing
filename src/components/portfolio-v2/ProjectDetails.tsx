'use client'

import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ServiceCard } from './ServiceCard'
import { MetricCard } from './MetricCard'
import { TechLogo } from './TechLogo'
import type { PortfolioProjectV2 } from '@/lib/constants'

interface ProjectDetailsProps {
  project: PortfolioProjectV2
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
}

export function ProjectDetails({ project }: ProjectDetailsProps) {
  return (
    <motion.div
      key={project.id}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-accent-orange/20 px-6 lg:px-8 py-8 lg:py-12"
    >
      {/* Header */}
      <motion.div variants={itemVariants}>
        {/* Client badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent-orange/10 border border-accent-orange/20 rounded-full mb-4">
          <div className="w-1.5 h-1.5 rounded-full bg-accent-orange animate-pulse" />
          <span className="text-xs text-accent-orange font-medium">
            {project.client}
          </span>
        </div>

        {/* Title */}
        <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-2 font-heading">
          {project.name}
        </h2>

        {/* Subtitle */}
        <p className="text-lg text-text-secondary mb-6">{project.subtitle}</p>
      </motion.div>

      {/* Services Section */}
      <motion.div variants={itemVariants} className="mb-8">
        <h3 className="text-sm uppercase tracking-wider text-text-muted mb-4">
          Servizi
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {project.services.map((service, index) => (
            <ServiceCard
              key={service.name}
              name={service.name}
              detail={service.detail}
              index={index}
            />
          ))}
        </div>
      </motion.div>

      {/* Results Section */}
      <motion.div variants={itemVariants} className="mb-8">
        <h3 className="text-sm uppercase tracking-wider text-text-muted mb-4">
          Risultati
        </h3>
        <div className="grid grid-cols-3 gap-3">
          {project.results.map((result, index) => (
            <MetricCard
              key={result.label}
              value={result.value}
              label={result.label}
              suffix={result.suffix}
              index={index}
            />
          ))}
        </div>
      </motion.div>

      {/* Description */}
      <motion.div variants={itemVariants} className="mb-8">
        <h3 className="text-sm uppercase tracking-wider text-text-muted mb-4">
          Il Progetto
        </h3>
        <p className="text-text-secondary leading-relaxed">
          {project.description}
        </p>
      </motion.div>

      {/* Technologies */}
      <motion.div variants={itemVariants} className="mb-8">
        <h3 className="text-sm uppercase tracking-wider text-text-muted mb-4">
          Tecnologie
        </h3>
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <TechLogo key={tech} name={tech} />
          ))}
        </div>
      </motion.div>

      {/* Integrations */}
      <motion.div variants={itemVariants} className="mb-8">
        <h3 className="text-sm uppercase tracking-wider text-text-muted mb-4">
          Integrazioni
        </h3>
        <div className="flex flex-wrap gap-2">
          {project.integrations.map((integration) => (
            <span
              key={integration}
              className="px-3 py-1.5 bg-bg-surface/60 border border-border/50 rounded-lg text-xs text-text-secondary"
            >
              {integration}
            </span>
          ))}
        </div>
      </motion.div>

      {/* CTA Button */}
      <motion.div variants={itemVariants}>
        <Button className="w-full group">
          <span className="flex items-center justify-center gap-2">
            Scopri di più
            <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </span>
        </Button>
      </motion.div>
    </motion.div>
  )
}
