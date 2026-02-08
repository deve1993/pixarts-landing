'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, ExternalLink, X, ArrowRight, MessageCircle } from 'lucide-react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { ServiceCard } from '@/components/portfolio-v2/ServiceCard'
import { MetricCard } from '@/components/portfolio-v2/MetricCard'
import { TechLogo } from '@/components/portfolio-v2/TechLogo'
import { Button } from '@/components/ui/button'
import { useAnalytics } from '@/lib/hooks/useAnalytics'
import { scrollToElement } from '@/lib/utils'
import { ProjectData } from './ProjectCard'

interface ProjectModalProps {
  project: ProjectData | null
  isOpen: boolean
  onClose: () => void
  projects?: ProjectData[]
  onNavigate?: (project: ProjectData) => void
}

export function ProjectModal({ project, isOpen, onClose, projects = [], onNavigate }: ProjectModalProps) {
  const t = useTranslations('portfolioPage')
  const [imageIndex, setImageIndex] = useState(0)
  const { trackConversion, trackEvent } = useAnalytics()

  // Find current project index for navigation
  const currentIndex = projects.findIndex(p => p.id === project?.id)
  const hasPrevProject = currentIndex > 0
  const hasNextProject = currentIndex < projects.length - 1 && currentIndex !== -1

  // Reset image index when project changes
  useEffect(() => {
    setImageIndex(0)
  }, [project?.id])

  // Handle keyboard navigation
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose()
    } else if (e.key === 'ArrowLeft' && hasPrevProject && onNavigate) {
      onNavigate(projects[currentIndex - 1])
    } else if (e.key === 'ArrowRight' && hasNextProject && onNavigate) {
      onNavigate(projects[currentIndex + 1])
    }
  }, [onClose, hasPrevProject, hasNextProject, onNavigate, projects, currentIndex])

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen, handleKeyDown])

  useEffect(() => {
    if (!isOpen || !project) return

    trackConversion('portfolio_view', {
      project_name: project.name,
      project_category: project.category,
    })
  }, [isOpen, project, trackConversion])

  if (!project) return null

  const handleImagePrev = () => {
    if (imageIndex > 0) setImageIndex(imageIndex - 1)
  }

  const handleImageNext = () => {
    if (imageIndex < project.images.length - 1) setImageIndex(imageIndex + 1)
  }

  const handleContactClick = () => {
    trackEvent('cta_click', {
      cta_name: 'portfolio_modal_contact',
      cta_location: 'portfolio_modal',
    })

    onClose()
    setTimeout(() => {
      scrollToElement('contatti')
    }, 300)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-bg-primary/90 backdrop-blur-md z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-4 md:inset-8 lg:inset-12 z-50 overflow-hidden rounded-2xl border border-border/50 bg-bg-surface shadow-2xl"
          >
            {/* Header Bar with navigation */}
            <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-4 py-3 bg-bg-surface/80 backdrop-blur-sm border-b border-border/30">
              {/* Project Navigation - Previous */}
              <button
                onClick={() => hasPrevProject && onNavigate?.(projects[currentIndex - 1])}
                disabled={!hasPrevProject}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm text-text-secondary hover:text-text-primary disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                aria-label={t('previousProject')}
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="hidden sm:inline">{t('previousProject')}</span>
              </button>

              {/* Project Counter */}
              <div className="text-sm text-text-muted">
                {currentIndex + 1} / {projects.length}
              </div>

              {/* Project Navigation - Next & Close */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => hasNextProject && onNavigate?.(projects[currentIndex + 1])}
                  disabled={!hasNextProject}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm text-text-secondary hover:text-text-primary disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  aria-label={t('nextProject')}
                >
                  <span className="hidden sm:inline">{t('nextProject')}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>

                <button
                  onClick={onClose}
                  className="p-2 bg-bg-elevated/80 backdrop-blur-sm border border-border/50 rounded-full hover:bg-bg-elevated hover:border-accent-orange/30 transition-all"
                  aria-label={t('close')}
                >
                  <X className="w-5 h-5 text-text-primary" />
                </button>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="h-full overflow-y-auto pt-14">
              <div className="p-6 md:p-8 lg:p-10">
                {/* Header */}
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mb-6"
                >
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-accent-orange/10 border border-accent-orange/20 rounded-full mb-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent-orange animate-pulse" />
                    <span className="text-sm text-accent-orange font-medium">{project.category}</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-text-primary mb-2">
                    {project.name}
                  </h2>
                  <p className="text-lg text-text-secondary">{project.subtitle}</p>
                </motion.div>

                {/* Main Content - Two Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:items-start">
                  {/* Left Column - Image & Story (Sticky on desktop) */}
                  <div className="lg:col-span-3 space-y-6 lg:sticky lg:top-6 lg:self-start">
                    {/* Image Gallery */}
                    <div className="relative rounded-xl overflow-hidden border border-border/50 bg-bg-elevated/50">
                      <motion.div
                        key={`${project.id}-${imageIndex}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="relative aspect-[16/10]"
                      >
                        <Image
                          src={project.images[imageIndex]}
                          alt={`${project.name} screenshot ${imageIndex + 1}`}
                          fill
                          className="object-contain"
                          sizes="(max-width: 1024px) 100vw, 60vw"
                          priority
                        />
                      </motion.div>

                      {/* Image Navigation */}
                      {project.images.length > 1 && (
                        <>
                          <button
                            onClick={handleImagePrev}
                            disabled={imageIndex === 0}
                            className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-bg-surface/90 backdrop-blur-sm border border-border/50 rounded-full disabled:opacity-30 disabled:cursor-not-allowed hover:bg-bg-surface hover:border-accent-orange/30 transition-all"
                            aria-label={t('previousImage')}
                          >
                            <ChevronLeft className="w-5 h-5 text-text-primary" />
                          </button>
                          <button
                            onClick={handleImageNext}
                            disabled={imageIndex === project.images.length - 1}
                            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-bg-surface/90 backdrop-blur-sm border border-border/50 rounded-full disabled:opacity-30 disabled:cursor-not-allowed hover:bg-bg-surface hover:border-accent-orange/30 transition-all"
                            aria-label={t('nextImage')}
                          >
                            <ChevronRight className="w-5 h-5 text-text-primary" />
                          </button>

                          {/* Image Dots */}
                          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2">
                            {project.images.map((_, idx) => (
                              <button
                                key={idx}
                                onClick={() => setImageIndex(idx)}
                                aria-label={`${t('image')} ${idx + 1}`}
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

                    {/* Description / Story */}
                    <div className="p-6 rounded-xl bg-gradient-to-br from-bg-elevated/50 to-bg-surface/30 border border-border/40">
                      <h3 className="text-sm uppercase tracking-wider text-accent-orange mb-4 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent-orange animate-pulse" />
                        {t('theProject')}
                      </h3>
                      <p className="text-base md:text-lg text-text-secondary leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    {/* Services - Full width on mobile */}
                    <div className="lg:hidden p-5 rounded-xl bg-bg-elevated/30 border border-border/30">
                      <h3 className="text-sm uppercase tracking-wider text-text-muted mb-4 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent-orange" />
                        {t('services')}
                      </h3>
                      <div className="space-y-3">
                        {project.services.map((service, index) => (
                          <ServiceCard
                            key={`${project.id}-service-mobile-${index}`}
                            name={service.name}
                            detail={service.detail}
                            index={index}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column - Details */}
                  <div className="lg:col-span-2 space-y-6">
                    {/* Results - Highlighted */}
                    <div className="p-5 rounded-xl bg-gradient-to-br from-accent-orange/10 to-accent-amber/5 border border-accent-orange/20">
                      <h3 className="text-sm uppercase tracking-wider text-accent-orange mb-4 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent-orange animate-pulse" />
                        {t('results')}
                      </h3>
                      <div className="grid grid-cols-1 gap-3">
                        {project.results.map((result, index) => (
                          <MetricCard
                            key={`${project.id}-result-${index}`}
                            value={result.value}
                            label={result.label}
                            suffix={result.suffix}
                            index={index}
                          />
                        ))}
                      </div>
                    </div>

                    {/* CTA - Contextual */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.4 }}
                      className="p-5 rounded-xl bg-gradient-to-br from-bg-elevated to-bg-surface border border-border/50"
                    >
                      <div className="flex items-start gap-3 mb-4">
                        <div className="p-2 rounded-lg bg-accent-orange/10">
                          <MessageCircle className="w-5 h-5 text-accent-orange" />
                        </div>
                        <div>
                          <p className="text-text-primary font-medium mb-1">
                            {t('ctaTitle')}
                          </p>
                          <p className="text-sm text-text-secondary">
                            {t('ctaDescription')}
                          </p>
                        </div>
                      </div>
                      <Button
                        onClick={handleContactClick}
                        className="w-full group"
                      >
                        {t('ctaButton')}
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </motion.div>

                    {/* Services - Desktop only */}
                    <div className="hidden lg:block p-5 rounded-xl bg-bg-elevated/30 border border-border/30">
                      <h3 className="text-sm uppercase tracking-wider text-text-muted mb-4 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent-orange" />
                        {t('services')}
                      </h3>
                      <div className="space-y-3">
                        {project.services.map((service, index) => (
                          <ServiceCard
                            key={`${project.id}-service-${index}`}
                            name={service.name}
                            detail={service.detail}
                            index={index}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Technologies */}
                    <div className="p-5 rounded-xl bg-bg-elevated/30 border border-border/30">
                      <h3 className="text-sm uppercase tracking-wider text-text-muted mb-4 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent-orange" />
                        {t('technologies')}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, index) => (
                          <TechLogo key={`${project.id}-tech-${index}`} name={tech} />
                        ))}
                      </div>
                    </div>

                    {/* Integrations */}
                    <div className="p-5 rounded-xl bg-bg-elevated/30 border border-border/30">
                      <h3 className="text-sm uppercase tracking-wider text-text-muted mb-4 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent-orange" />
                        {t('integrations')}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {project.integrations.map((integration, index) => (
                          <span
                            key={`${project.id}-integration-${index}`}
                            className="px-3 py-1.5 bg-bg-surface/60 border border-border/50 rounded-lg text-xs text-text-secondary"
                          >
                            {integration}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Visit Site Button */}
                    {project.url && (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full px-6 py-4 bg-gradient-to-r from-accent-orange to-accent-amber text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-accent-orange/25 transition-all"
                      >
                        <span>{t('visitSite')}</span>
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
