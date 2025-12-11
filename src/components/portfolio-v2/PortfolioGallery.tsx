'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { Section, SectionHeader } from '@/components/ui/section'
import { PORTFOLIO_PROJECTS_V2 } from '@/lib/constants'
import { ServiceCard } from './ServiceCard'
import { MetricCard } from './MetricCard'
import { TechLogo } from './TechLogo'

export function PortfolioGallery() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [imageIndex, setImageIndex] = useState(0)

  const projects = PORTFOLIO_PROJECTS_V2
  const activeProject = projects[activeIndex]

  const handleSelect = useCallback(
    (index: number) => {
      setDirection(index > activeIndex ? 1 : -1)
      setActiveIndex(index)
      setImageIndex(0)
    },
    [activeIndex]
  )

  const handlePrev = useCallback(() => {
    if (activeIndex > 0) {
      setDirection(-1)
      setActiveIndex(activeIndex - 1)
      setImageIndex(0)
    }
  }, [activeIndex])

  const handleNext = useCallback(() => {
    if (activeIndex < projects.length - 1) {
      setDirection(1)
      setActiveIndex(activeIndex + 1)
      setImageIndex(0)
    }
  }, [activeIndex, projects.length])

  const handleImagePrev = useCallback(() => {
    if (imageIndex > 0) {
      setImageIndex(imageIndex - 1)
    }
  }, [imageIndex])

  const handleImageNext = useCallback(() => {
    if (imageIndex < activeProject.images.length - 1) {
      setImageIndex(imageIndex + 1)
    }
  }, [imageIndex, activeProject.images.length])

  return (
    <Section id="portfolio" className="overflow-hidden">
      <SectionHeader
        badge="Portfolio"
        title="I nostri progetti"
        description="Scopri come abbiamo aiutato i nostri clienti a crescere online"
      />

      {/* Main Container */}
      <div className="relative">
        {/* Project Header with Navigation */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={handlePrev}
            disabled={activeIndex === 0}
            className="flex items-center gap-2 px-4 py-2 bg-bg-surface/60 backdrop-blur-sm border border-border/50 rounded-full disabled:opacity-30 disabled:cursor-not-allowed hover:bg-bg-surface hover:border-accent-orange/30 transition-all group"
          >
            <ChevronLeft className="w-5 h-5 text-text-primary group-hover:text-accent-orange transition-colors" />
            <span className="text-sm text-text-secondary group-hover:text-text-primary transition-colors hidden sm:inline">
              Precedente
            </span>
          </button>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeProject.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
              className="text-center"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent-orange/10 border border-accent-orange/20 rounded-full mb-2">
                <div className="w-1.5 h-1.5 rounded-full bg-accent-orange animate-pulse" />
                <span className="text-xs text-accent-orange font-medium">
                  {activeProject.client}
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-text-primary font-heading">
                {activeProject.name}
              </h2>
              <p className="text-text-secondary mt-1">{activeProject.subtitle}</p>
            </motion.div>
          </AnimatePresence>

          <button
            onClick={handleNext}
            disabled={activeIndex === projects.length - 1}
            className="flex items-center gap-2 px-4 py-2 bg-bg-surface/60 backdrop-blur-sm border border-border/50 rounded-full disabled:opacity-30 disabled:cursor-not-allowed hover:bg-bg-surface hover:border-accent-orange/30 transition-all group"
          >
            <span className="text-sm text-text-secondary group-hover:text-text-primary transition-colors hidden sm:inline">
              Successivo
            </span>
            <ChevronRight className="w-5 h-5 text-text-primary group-hover:text-accent-orange transition-colors" />
          </button>
        </div>

        {/* Full-Width Image Viewport */}
        <div className="relative rounded-2xl overflow-hidden border border-border/50 bg-bg-surface/30 backdrop-blur-sm mb-8">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={`${activeProject.id}-${imageIndex}`}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.4, ease: [0.43, 0.13, 0.23, 0.96] }}
              className="relative aspect-[4/3] w-full"
            >
              <Image
                src={activeProject.images[imageIndex]}
                alt={`${activeProject.name} screenshot ${imageIndex + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                priority={activeIndex === 0}
                quality={100}
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/60 via-transparent to-transparent" />
            </motion.div>
          </AnimatePresence>

          {/* Image Navigation (if multiple images) */}
          {activeProject.images.length > 1 && (
            <>
              <button
                onClick={handleImagePrev}
                disabled={imageIndex === 0}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-bg-surface/80 backdrop-blur-sm border border-border/50 rounded-full disabled:opacity-30 disabled:cursor-not-allowed hover:bg-bg-surface hover:border-accent-orange/30 transition-all z-10"
              >
                <ChevronLeft className="w-5 h-5 text-text-primary" />
              </button>
              <button
                onClick={handleImageNext}
                disabled={imageIndex === activeProject.images.length - 1}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-bg-surface/80 backdrop-blur-sm border border-border/50 rounded-full disabled:opacity-30 disabled:cursor-not-allowed hover:bg-bg-surface hover:border-accent-orange/30 transition-all z-10"
              >
                <ChevronRight className="w-5 h-5 text-text-primary" />
              </button>

              {/* Image dots */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
                {activeProject.images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setImageIndex(idx)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      idx === imageIndex
                        ? 'bg-accent-orange w-6'
                        : 'bg-text-primary/30 hover:bg-text-primary/50'
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Details Grid - 3 Columns */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeProject.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
          >
            {/* Column 1: Services */}
            <div className="p-6 rounded-2xl bg-bg-surface/30 backdrop-blur-sm border border-border/50">
              <h3 className="text-sm uppercase tracking-wider text-text-muted mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-orange" />
                Servizi
              </h3>
              <div className="space-y-3">
                {activeProject.services.map((service, index) => (
                  <ServiceCard
                    key={service.name}
                    name={service.name}
                    detail={service.detail}
                    index={index}
                  />
                ))}
              </div>
            </div>

            {/* Column 2: Results */}
            <div className="p-6 rounded-2xl bg-bg-surface/30 backdrop-blur-sm border border-border/50">
              <h3 className="text-sm uppercase tracking-wider text-text-muted mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-orange" />
                Risultati
              </h3>
              <div className="space-y-3">
                {activeProject.results.map((result, index) => (
                  <MetricCard
                    key={result.label}
                    value={result.value}
                    label={result.label}
                    suffix={result.suffix}
                    index={index}
                  />
                ))}
              </div>

              {/* Description */}
              <div className="mt-6 pt-4 border-t border-border/30">
                <p className="text-sm text-text-secondary leading-relaxed">
                  {activeProject.description}
                </p>
              </div>
            </div>

            {/* Column 3: Tech Stack & Integrations */}
            <div className="p-6 rounded-2xl bg-bg-surface/30 backdrop-blur-sm border border-border/50">
              <h3 className="text-sm uppercase tracking-wider text-text-muted mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-orange" />
                Tecnologie
              </h3>
              <div className="flex flex-wrap gap-2 mb-6">
                {activeProject.technologies.map((tech) => (
                  <TechLogo key={tech} name={tech} />
                ))}
              </div>

              <h3 className="text-sm uppercase tracking-wider text-text-muted mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-orange" />
                Integrazioni
              </h3>
              <div className="flex flex-wrap gap-2">
                {activeProject.integrations.map((integration) => (
                  <span
                    key={integration}
                    className="px-3 py-1.5 bg-bg-surface/60 border border-border/50 rounded-lg text-xs text-text-secondary hover:border-accent-orange/30 hover:text-text-primary transition-colors"
                  >
                    {integration}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Project Dots Navigation */}
        <div className="flex items-center justify-center gap-3 mt-8">
          {projects.map((project, index) => (
            <button
              key={project.id}
              onClick={() => handleSelect(index)}
              className={`group relative transition-all ${
                index === activeIndex ? 'scale-110' : ''
              }`}
            >
              <span
                className={`block w-3 h-3 rounded-full transition-all ${
                  index === activeIndex
                    ? 'bg-accent-orange shadow-lg shadow-accent-orange/30'
                    : 'bg-border hover:bg-text-muted'
                }`}
              />
              {/* Tooltip */}
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-bg-surface border border-border/50 rounded text-xs text-text-secondary whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                {project.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </Section>
  )
}
