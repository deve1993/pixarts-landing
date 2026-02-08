'use client'

import { useState, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Section, SectionHeader } from '@/components/ui/section'
import { ServiceCard } from './ServiceCard'
import { MetricCard } from './MetricCard'
import { TechLogo } from './TechLogo'

// Project IDs and static data (images, technologies, integrations don't need translation)
const PROJECT_KEYS = ['fl1', 'flowmatics', 'quickfy-web', 'quickfy-app'] as const

const PROJECT_STATIC_DATA = {
  'fl1': {
    name: 'FL1',
    images: ['/portfolio/FL1 1.webp', '/portfolio/FL1 2.webp'],
    technologies: ['React', 'Next.js', 'Node.js', 'PostgreSQL', 'Tailwind', 'OpenAI'],
    integrations: ['HubSpot CRM', 'Google Analytics', 'Stripe', 'Mailchimp', 'OpenAI API'],
    serviceKeys: ['webDesign', 'backend', 'seo', 'ai'],
    resultKeys: ['leads', 'response', 'satisfaction'],
  },
  'flowmatics': {
    name: 'FlowMatics',
    images: ['/portfolio/flowmatic 1.webp', '/portfolio/flowmatic 2.webp'],
    technologies: ['Next.js', 'Tailwind', 'Framer Motion', 'Vercel'],
    integrations: ['Google Analytics 4', 'Google Search Console', 'HubSpot', 'Hotjar'],
    serviceKeys: ['webDesign', 'seo', 'cro'],
    resultKeys: ['contacts', 'visibility', 'keywords'],
  },
  'quickfy-web': {
    name: 'Quickfy',
    images: ['/portfolio/quickfy 1.webp', '/portfolio/quickfy 2.webp'],
    technologies: ['Next.js', 'Tailwind', 'Framer Motion', 'TypeScript', 'Vercel'],
    integrations: ['Google Analytics 4', 'HubSpot', 'Intercom', 'Stripe'],
    serviceKeys: ['webDesign', 'seo', 'cro'],
    resultKeys: ['leads', 'conversion', 'bounce'],
  },
  'quickfy-app': {
    name: 'Quickfy App',
    images: ['/portfolio/quickfy APP1.webp', '/portfolio/quickfy APP2.webp'],
    technologies: ['React', 'Next.js', 'Node.js', 'PostgreSQL', 'Redis', 'Docker', 'AWS', 'OpenAI', 'Tailwind'],
    integrations: ['OpenAI API', 'Anthropic Claude', 'Stripe Billing', 'SendGrid', 'Twilio', 'Slack', 'Zapier', 'Make'],
    serviceKeys: ['frontend', 'backend', 'ai', 'devops'],
    resultKeys: ['users', 'time', 'uptime'],
  },
} as const

// Normalized project type for use within the component
interface NormalizedProject {
  id: string
  name: string
  client: string
  subtitle: string
  description: string
  images: string[]
  services: Array<{ name: string; detail: string }>
  results: Array<{ value: string; label: string; suffix?: string }>
  technologies: string[]
  integrations: string[]
}

export function PortfolioGallery() {
  const t = useTranslations('portfolio.gallery')

  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [imageIndex, setImageIndex] = useState(0)

  // Use translations for projects
  const normalizedProjects: NormalizedProject[] = useMemo(() => {
    return PROJECT_KEYS.map(key => {
      const staticData = PROJECT_STATIC_DATA[key]
      return {
        id: key,
        name: staticData.name,
        client: t(`projects.${key}.client`),
        subtitle: t(`projects.${key}.subtitle`),
        description: t(`projects.${key}.description`),
        images: [...staticData.images] as string[],
        services: staticData.serviceKeys.map(sk => ({
          name: t(`projects.${key}.services.${sk}.name`),
          detail: t(`projects.${key}.services.${sk}.detail`),
        })),
        results: staticData.resultKeys.map(rk => ({
          value: t(`projects.${key}.results.${rk}.value`),
          label: t(`projects.${key}.results.${rk}.label`),
          suffix: t.has(`projects.${key}.results.${rk}.suffix`)
            ? t(`projects.${key}.results.${rk}.suffix`)
            : undefined,
        })),
        technologies: [...staticData.technologies] as string[],
        integrations: [...staticData.integrations] as string[],
      }
    })
  }, [t])

  const activeProject = normalizedProjects[activeIndex] || normalizedProjects[0]
  const activeProjectKey = activeProject.id

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
    if (activeIndex < normalizedProjects.length - 1) {
      setDirection(1)
      setActiveIndex(activeIndex + 1)
      setImageIndex(0)
    }
  }, [activeIndex, normalizedProjects.length])

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
        badge={t('badge')}
        title={t('title')}
        description={t('description')}
      />

      {/* Main Container */}
      <div className="relative">
        {/* Project Header with Navigation */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={handlePrev}
            disabled={activeIndex === 0}
            aria-label={t('previous')}
            className="flex items-center gap-2 px-4 py-2 bg-bg-surface/60 backdrop-blur-sm border border-border/50 rounded-full disabled:opacity-30 disabled:cursor-not-allowed hover:bg-bg-surface hover:border-accent-orange/30 transition-all group"
          >
            <ChevronLeft className="w-5 h-5 text-text-primary group-hover:text-accent-orange transition-colors" aria-hidden="true" />
            <span className="text-sm text-text-secondary group-hover:text-text-primary transition-colors hidden sm:inline">
              {t('previous')}
            </span>
          </button>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeProjectKey}
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
            disabled={activeIndex === normalizedProjects.length - 1}
            aria-label={t('next')}
            className="flex items-center gap-2 px-4 py-2 bg-bg-surface/60 backdrop-blur-sm border border-border/50 rounded-full disabled:opacity-30 disabled:cursor-not-allowed hover:bg-bg-surface hover:border-accent-orange/30 transition-all group"
          >
            <span className="text-sm text-text-secondary group-hover:text-text-primary transition-colors hidden sm:inline">
              {t('next')}
            </span>
            <ChevronRight className="w-5 h-5 text-text-primary group-hover:text-accent-orange transition-colors" aria-hidden="true" />
          </button>
        </div>

        {/* Full-Width Image Viewport */}
        <div className="relative rounded-2xl overflow-hidden border border-border/50 bg-bg-elevated/50 backdrop-blur-sm mb-8">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={`${activeProjectKey}-${imageIndex}`}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.4, ease: [0.43, 0.13, 0.23, 0.96] }}
              className="relative aspect-[16/10] w-full"
            >
              <Image
                src={activeProject.images[imageIndex]}
                alt={`${activeProject.name} screenshot ${imageIndex + 1}`}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                priority={activeIndex === 0}
                quality={90}
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/40 via-transparent to-transparent pointer-events-none" />
            </motion.div>
          </AnimatePresence>

          {/* Image Navigation (if multiple images) */}
          {activeProject.images.length > 1 && (
            <>
              <button
                onClick={handleImagePrev}
                disabled={imageIndex === 0}
                aria-label={t('previousImage')}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-bg-surface/80 backdrop-blur-sm border border-border/50 rounded-full disabled:opacity-30 disabled:cursor-not-allowed hover:bg-bg-surface hover:border-accent-orange/30 transition-all z-10"
              >
                <ChevronLeft className="w-5 h-5 text-text-primary" aria-hidden="true" />
              </button>
              <button
                onClick={handleImageNext}
                disabled={imageIndex === activeProject.images.length - 1}
                aria-label={t('nextImage')}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-bg-surface/80 backdrop-blur-sm border border-border/50 rounded-full disabled:opacity-30 disabled:cursor-not-allowed hover:bg-bg-surface hover:border-accent-orange/30 transition-all z-10"
              >
                <ChevronRight className="w-5 h-5 text-text-primary" aria-hidden="true" />
              </button>

              {/* Image dots */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10" role="tablist" aria-label={t('imageNavigation')}>
                {activeProject.images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setImageIndex(idx)}
                    role="tab"
                    aria-selected={idx === imageIndex}
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

        {/* Details Grid - 3 Columns */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeProjectKey}
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
                {t('services')}
              </h3>
              <div className="space-y-3">
                {activeProject.services.map((service, index) => (
                  <ServiceCard
                    key={`${activeProject.id}-service-${index}`}
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
                {t('results')}
              </h3>
              <div className="space-y-3">
                {activeProject.results.map((result, index) => (
                  <MetricCard
                    key={`${activeProject.id}-result-${index}`}
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
                {t('technologies')}
              </h3>
              <div className="flex flex-wrap gap-2 mb-6">
                {activeProject.technologies.map((tech, index) => (
                  <TechLogo key={`${activeProject.id}-tech-${index}`} name={tech} />
                ))}
              </div>

              <h3 className="text-sm uppercase tracking-wider text-text-muted mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-orange" />
                {t('integrations')}
              </h3>
              <div className="flex flex-wrap gap-2">
                {activeProject.integrations.map((integration, index) => (
                  <span
                    key={`${activeProject.id}-integration-${index}`}
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
        <div className="flex items-center justify-center gap-3 mt-8" role="tablist" aria-label={t('projectNavigation')}>
          {normalizedProjects.map((project, index) => (
            <button
              key={project.id}
              onClick={() => handleSelect(index)}
              role="tab"
              aria-selected={index === activeIndex}
              aria-label={`${t('viewProject')} ${project.name}`}
              className={`group relative transition-all ${
                index === activeIndex ? 'scale-110' : ''
              }`}
            >
              <span
                aria-hidden="true"
                className={`block w-3 h-3 rounded-full transition-all ${
                  index === activeIndex
                    ? 'bg-accent-orange shadow-lg shadow-accent-orange/30'
                    : 'bg-border hover:bg-text-muted'
                }`}
              />
              {/* Tooltip */}
              <span aria-hidden="true" className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-bg-surface border border-border/50 rounded text-xs text-text-secondary whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                {project.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </Section>
  )
}
