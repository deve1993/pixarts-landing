'use client'

import { useState, useMemo, useCallback } from 'react'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import { ArrowLeft, ArrowRight, Briefcase, BarChart3, Layers } from 'lucide-react'
import { Section } from '@/components/ui/section'
import { Button } from '@/components/ui/button'
import { ProjectCard, ProjectData } from './ProjectCard'
import { ProjectModal } from './ProjectModal'
import { cn } from '@/lib/utils'

// Project IDs - order matters for Bento layout
const PROJECT_KEYS = ['quickfy-app', 'quickfy-web', 'fl1', 'flowmatics', 'singleflo', 'biemme', 'ichnusa'] as const

// Category keys for filtering
const CATEGORY_KEYS = ['all', 'webapp', 'saas', 'b2b-automation', 'landing-page', 'business-website', 'restaurant'] as const
type CategoryKey = typeof CATEGORY_KEYS[number]

// Bento grid layout - balanced asymmetric design
// Layout:
// [  wide-1  ] [ std-1 ]
// [ std-2 ] [  wide-2  ]
// [  wide-3  ] [ std-3 ]
const BENTO_CONFIG: Record<typeof PROJECT_KEYS[number], 'wide' | 'default'> = {
  'quickfy-app': 'wide',
  'quickfy-web': 'default',
  'fl1': 'default',
  'flowmatics': 'wide',
  'singleflo': 'wide',
  'biemme': 'default',
  'ichnusa': 'wide',
}

// Static data that doesn't need translation
const PROJECT_STATIC_DATA: Record<typeof PROJECT_KEYS[number], {
  name: string
  category: string
  images: string[]
  technologies: string[]
  integrations: string[]
  serviceKeys: string[]
  resultKeys: string[]
  url?: string
}> = {
  'fl1': {
    name: 'FL1',
    category: 'business-website',
    images: ['/portfolio/FL1 1.webp', '/portfolio/FL1 2.webp'],
    technologies: ['React', 'Next.js', 'Node.js', 'PostgreSQL', 'Tailwind', 'OpenAI'],
    integrations: ['HubSpot CRM', 'Google Analytics', 'Stripe', 'Mailchimp', 'OpenAI API'],
    serviceKeys: ['webDesign', 'backend', 'seo', 'ai'],
    resultKeys: ['leads', 'response', 'satisfaction'],
  },
  'flowmatics': {
    name: 'FlowMatics',
    category: 'b2b-automation',
    images: ['/portfolio/flowmatic 1.webp', '/portfolio/flowmatic 2.webp'],
    technologies: ['Next.js', 'Tailwind', 'Framer Motion', 'Vercel'],
    integrations: ['Google Analytics 4', 'Google Search Console', 'HubSpot', 'Hotjar'],
    serviceKeys: ['webDesign', 'seo', 'cro'],
    resultKeys: ['contacts', 'visibility', 'keywords'],
  },
  'quickfy-web': {
    name: 'Quickfy',
    category: 'saas',
    images: ['/portfolio/quickfy-web-1.webp', '/portfolio/quickfy-web-5.webp', '/portfolio/quickfy-web-2.webp', '/portfolio/quickfy-web-3.webp', '/portfolio/quickfy-web-4.webp', '/portfolio/quickfy-web-6.webp', '/portfolio/quickfy-web-7.webp', '/portfolio/quickfy-web-8.webp'],
    technologies: ['Next.js', 'Tailwind', 'Framer Motion', 'TypeScript', 'Vercel'],
    integrations: ['Google Analytics 4', 'HubSpot', 'Intercom', 'Stripe'],
    serviceKeys: ['webDesign', 'seo', 'cro'],
    resultKeys: ['leads', 'conversion', 'bounce'],
  },
  'quickfy-app': {
    name: 'Quickfy App',
    category: 'webapp',
    images: ['/portfolio/quickfy APP1.webp', '/portfolio/quickfy APP2.webp'],
    technologies: ['React', 'Next.js', 'Node.js', 'PostgreSQL', 'Redis', 'Docker', 'AWS', 'OpenAI', 'Tailwind'],
    integrations: ['OpenAI API', 'Anthropic Claude', 'Stripe Billing', 'SendGrid', 'Twilio', 'Slack', 'Zapier', 'Make'],
    serviceKeys: ['frontend', 'backend', 'ai', 'devops'],
    resultKeys: ['users', 'time', 'uptime'],
  },
  'singleflo': {
    name: 'SingleFlo',
    category: 'landing-page',
    images: ['/portfolio/singleflo-1.webp', '/portfolio/singleflo-4.webp', '/portfolio/singleflo-2.webp', '/portfolio/singleflo-3.webp', '/portfolio/singleflo-5.webp', '/portfolio/singleflo-6.webp', '/portfolio/singleflo-7.webp', '/portfolio/singleflo-8.webp'],
    technologies: ['Next.js', 'Tailwind', 'Framer Motion', 'TypeScript', 'Vercel'],
    integrations: ['Google Analytics 4', 'Google Search Console'],
    serviceKeys: ['webDesign', 'seo'],
    resultKeys: ['performance', 'seoScore'],
  },
  'biemme': {
    name: 'BiemmeCostruzioni',
    category: 'business-website',
    images: ['/portfolio/biemme-2.webp', '/portfolio/biemme-8.webp', '/portfolio/biemme-1.webp', '/portfolio/biemme-3.webp', '/portfolio/biemme-6.webp', '/portfolio/biemme-4.webp', '/portfolio/biemme-5.webp', '/portfolio/biemme-7.webp'],
    technologies: ['Next.js', 'Tailwind', 'Framer Motion', 'TypeScript', 'Vercel'],
    integrations: ['Google Analytics 4', 'Google Search Console', 'Google Maps'],
    serviceKeys: ['webDesign', 'seo'],
    resultKeys: ['visibility', 'contacts'],
  },
  'ichnusa': {
    name: 'Ichnusa',
    category: 'restaurant',
    images: ['/portfolio/ichnusa-1.webp', '/portfolio/ichnusa-2.webp', '/portfolio/ichnusa-3.webp', '/portfolio/ichnusa-4.webp'],
    technologies: ['Next.js', 'Tailwind', 'Framer Motion', 'TypeScript', 'next-intl'],
    integrations: ['Google Analytics 4', 'Google Search Console', 'Google Maps', 'DISH.co', 'Google Reviews'],
    serviceKeys: ['webDesign', 'seo', 'i18n'],
    resultKeys: ['reviews', 'visibility', 'performance'],
    url: 'https://ichnusa.restaurant',
  },
}

// Stagger animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: 0.2,
    },
  },
}

export function PortfolioPage() {
  const t = useTranslations('portfolioPage')
  const tGallery = useTranslations('portfolio.gallery')
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null)
  const [activeFilter, setActiveFilter] = useState<CategoryKey>('all')

  // Build normalized project data with translations
  const projects: ProjectData[] = useMemo(() => {
    return PROJECT_KEYS.map(key => {
      const staticData = PROJECT_STATIC_DATA[key]

      // Use portfolioPage translations for new projects, gallery translations for existing ones
      const useNewTranslations = key === 'singleflo' || key === 'biemme' || key === 'ichnusa'
      const projectT = useNewTranslations ? t : tGallery

      return {
        id: key,
        name: staticData.name,
        client: projectT(`projects.${key}.client`),
        subtitle: projectT(`projects.${key}.subtitle`),
        category: t(`categories.${staticData.category}`),
        categoryKey: staticData.category as string,
        description: projectT(`projects.${key}.description`),
        images: staticData.images,
        services: staticData.serviceKeys.map(sk => ({
          name: projectT(`projects.${key}.services.${sk}.name`),
          detail: projectT(`projects.${key}.services.${sk}.detail`),
        })),
        results: staticData.resultKeys.map(rk => ({
          value: projectT(`projects.${key}.results.${rk}.value`),
          label: projectT(`projects.${key}.results.${rk}.label`),
          suffix: projectT.has?.(`projects.${key}.results.${rk}.suffix`)
            ? projectT(`projects.${key}.results.${rk}.suffix`)
            : undefined,
        })),
        technologies: [...staticData.technologies],
        integrations: [...staticData.integrations],
        url: staticData.url,
      }
    })
  }, [t, tGallery])

  // Filter projects based on active filter
  const filteredProjects = useMemo(() => {
    if (activeFilter === 'all') return projects
    return projects.filter(p => (p as ProjectData & { categoryKey: string }).categoryKey === activeFilter)
  }, [projects, activeFilter])

  const uniqueSectors = useMemo(() => {
    return new Set(projects.map(p => (p as ProjectData & { categoryKey: string }).categoryKey)).size
  }, [projects])

  const categoryCounts = useMemo(() => {
    const counts: Record<CategoryKey, number> = {
      'all': projects.length,
      'webapp': 0,
      'saas': 0,
      'b2b-automation': 0,
      'landing-page': 0,
      'business-website': 0,
      'restaurant': 0,
    }
    projects.forEach(p => {
      const key = (p as ProjectData & { categoryKey: string }).categoryKey as CategoryKey
      if (counts[key] !== undefined) {
        counts[key]++
      }
    })
    return counts
  }, [projects])

  const handleFilterClick = useCallback((category: CategoryKey) => {
    setActiveFilter(category)
  }, [])

  // Check if bento layout should be used
  const useBentoLayout = activeFilter === 'all'

  return (
    <>
      <Section className="relative min-h-screen pt-24 pb-16 overflow-hidden">
        {/* Background Decorations */}
        <div
          className="absolute -top-40 -right-40 w-[400px] h-[400px] bg-accent-orange/8 rounded-full blur-[100px] pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-40 -left-40 w-[350px] h-[350px] bg-accent-amber/5 rounded-full blur-[80px] pointer-events-none"
          aria-hidden="true"
        />

        {/* Back Link */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="relative z-10 mb-8"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-text-secondary hover:text-accent-orange transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="relative">
              {t('backToHome')}
              <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-accent-orange group-hover:w-full transition-all duration-300" />
            </span>
          </Link>
        </motion.div>

        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative text-center mb-10"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="relative inline-flex items-center gap-2 px-3 py-1.5 bg-accent-orange/10 border border-accent-orange/20 rounded-full mb-4"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-accent-orange animate-pulse" />
            <span className="text-sm text-accent-orange font-medium">{t('badge')} · {projects.length} case study</span>
          </motion.div>

          <h1 className="relative text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-text-primary mb-4">
            {t('title')}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-orange to-accent-amber">
              {t('titleHighlight')}
            </span>
          </h1>

          <p className="relative text-lg text-text-secondary max-w-2xl mx-auto mb-6">
            {t('description')}
          </p>

          {/* Hero stat line */}
          <div className="relative flex flex-wrap justify-center gap-4 md:gap-8">
            <div className="flex items-center gap-2 text-text-muted">
              <Briefcase className="w-4 h-4 text-accent-orange" />
              <span className="text-sm">{t('statsProjects', { count: projects.length })}</span>
            </div>
            <div className="flex items-center gap-2 text-text-muted">
              <Layers className="w-4 h-4 text-accent-orange" />
              <span className="text-sm">{t('statsSectors', { count: uniqueSectors })}</span>
            </div>
            <div className="flex items-center gap-2 text-text-muted">
              <BarChart3 className="w-4 h-4 text-accent-orange" />
              <span className="text-sm">{t('statsConversion')}</span>
            </div>
          </div>
        </motion.div>

        {/* Filter Chips — scrollable on mobile */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="relative z-10 flex overflow-x-auto md:flex-wrap md:justify-center gap-2 mb-10 pb-2 md:pb-0 scrollbar-hide"
        >
          {CATEGORY_KEYS.map((category) => {
            const isActive = activeFilter === category
            const count = categoryCounts[category]

            if (count === 0 && category !== 'all') return null

            return (
              <motion.button
                key={category}
                onClick={() => handleFilterClick(category)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  "relative flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
                  "border focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-orange",
                  isActive
                    ? "bg-accent-orange text-white border-accent-orange shadow-lg shadow-accent-orange/25"
                    : "bg-bg-surface/60 text-text-secondary border-border/50 hover:border-accent-orange/50 hover:text-text-primary"
                )}
              >
                <span>{t(`filters.${category}`)}</span>
                <span className={cn(
                  "ml-1.5 text-xs",
                  isActive ? "text-white/80" : "text-text-muted"
                )}>
                  ({count})
                </span>
              </motion.button>
            )
          })}
        </motion.div>

        {/* Bento Grid Layout */}
        <LayoutGroup>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className={cn(
              "relative z-10",
              useBentoLayout
                ? "grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5"
                : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            )}
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => {
                const variant = useBentoLayout
                  ? BENTO_CONFIG[project.id as typeof PROJECT_KEYS[number]]
                  : 'default'

                const isEven = index % 2 === 0

                return (
                  <motion.div
                    key={project.id}
                    layout
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className={cn(
                      useBentoLayout && variant === 'wide' && 'md:col-span-2',
                      // E7: Mobile card stack — overlap + alternating offset
                      index > 0 && 'max-md:-mt-3',
                      isEven ? 'max-md:ml-0 max-md:mr-2' : 'max-md:ml-2 max-md:mr-0'
                    )}
                  >
                    <ProjectCard
                      project={project}
                      onClick={() => setSelectedProject(project)}
                      index={index}
                      variant={variant}
                      viewProjectLabel={t('viewProject')}
                    />
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>

        {/* Empty state */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <p className="text-text-secondary">{t('noProjects')}</p>
          </motion.div>
        )}
      </Section>

      {/* Bottom CTA Section */}
      <Section className="relative pt-0 pb-16 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="relative text-center p-8 md:p-12 rounded-2xl bg-gradient-to-br from-bg-elevated to-bg-surface border border-border/50"
        >
          <div
            className="absolute -top-20 -right-20 w-[300px] h-[300px] bg-accent-orange/8 rounded-full blur-[80px] pointer-events-none"
            aria-hidden="true"
          />
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-text-primary mb-3">
            {t('ctaSectionTitle')}
          </h2>
          <p className="text-text-secondary max-w-xl mx-auto mb-8">
            {t('ctaSectionDescription')}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/#contatti">
              <Button size="lg" className="group">
                {t('ctaSectionButton')}
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/prenota">
              <Button variant="secondary" size="lg">
                {t('ctaSectionBook')}
              </Button>
            </Link>
          </div>
        </motion.div>
      </Section>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        projects={filteredProjects}
        onNavigate={setSelectedProject}
      />
    </>
  )
}
