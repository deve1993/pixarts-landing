'use client'

import { motion } from 'framer-motion'
import { ExternalLink, ArrowRight } from 'lucide-react'
import { Section, SectionHeader } from '@/components/ui/section'
import { Button } from '@/components/ui/button'
import { PORTFOLIO_PROJECTS } from '@/lib/constants'
import { fadeInUp, slideInLeft, slideInRight } from '@/lib/motion-variants'

export function Portfolio() {
  return (
    <Section id="portfolio">
      <SectionHeader
        title="Progetti che parlano da soli"
        description="Due case study che dimostrano come un sito ben fatto può trasformare il tuo business"
      />

      <div className="space-y-16">
        {PORTFOLIO_PROJECTS.map((project, index) => (
          <motion.div
            key={project.name}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={index % 2 === 0 ? slideInLeft : slideInRight}
            className="grid lg:grid-cols-2 gap-8 items-center"
          >
            {/* Project Visual */}
            <div
              className={`relative ${index % 2 === 1 ? 'lg:order-2' : ''}`}
            >
              <div className="relative aspect-video rounded-2xl overflow-hidden border border-border/50 bg-bg-surface/60 backdrop-blur-sm">
                {/* Placeholder for project screenshot */}
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-accent-orange/10 to-accent-amber/10">
                  <div className="text-center">
                    <h3 className="text-4xl font-heading font-bold gradient-text mb-2">
                      {project.name}
                    </h3>
                    <p className="text-text-muted">{project.url}</p>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-4 left-4 flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-error/50" />
                  <div className="w-3 h-3 rounded-full bg-warning/50" />
                  <div className="w-3 h-3 rounded-full bg-success/50" />
                </div>
              </div>
            </div>

            {/* Project Info */}
            <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
              <div className="space-y-6">
                {/* Header */}
                <div>
                  <span className="text-sm text-accent-orange font-medium">
                    {project.type}
                  </span>
                  <h3 className="text-3xl font-heading font-bold text-text-primary mt-2">
                    {project.name}
                  </h3>
                </div>

                {/* Challenge */}
                <div>
                  <h4 className="text-sm font-semibold text-text-muted uppercase tracking-wide mb-2">
                    La sfida
                  </h4>
                  <p className="text-text-secondary">{project.challenge}</p>
                </div>

                {/* Solution */}
                <div>
                  <h4 className="text-sm font-semibold text-text-muted uppercase tracking-wide mb-2">
                    La soluzione
                  </h4>
                  <ul className="space-y-2">
                    {project.solutions.map((solution, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-text-secondary"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-accent-orange mt-2 flex-shrink-0" />
                        {solution}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Results */}
                <div className="grid grid-cols-3 gap-4 py-6 border-y border-border">
                  {project.results.map((result, i) => (
                    <div key={i}>
                      <div className="text-2xl font-heading font-bold gradient-text">
                        {result.value}
                      </div>
                      <p className="text-xs text-text-muted mt-1">
                        {result.label}
                      </p>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <Button
                  variant="secondary"
                  className="group"
                  onClick={() =>
                    window.open(`https://${project.url}`, '_blank')
                  }
                >
                  Visita {project.url}
                  <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
