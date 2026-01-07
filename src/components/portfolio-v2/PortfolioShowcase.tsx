'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import { Section, SectionHeader } from '@/components/ui/section'
import { Button } from '@/components/ui/button'

// 3 progetti showcase per la homepage
const SHOWCASE_PROJECTS = [
  {
    id: 'quickfy-app',
    name: 'Quickfy App',
    image: '/portfolio/quickfy APP1.webp',
    category: 'webapp',
    resultValue: '500+',
    resultLabel: 'utenti attivi',
  },
  {
    id: 'fl1',
    name: 'FL1',
    image: '/portfolio/FL1 1.webp',
    category: 'business-website',
    resultValue: '+220%',
    resultLabel: 'lead generati',
  },
  {
    id: 'singleflo',
    name: 'SingleFlo',
    image: '/portfolio/singleflo-1.webp',
    category: 'landing-page',
    resultValue: '98/100',
    resultLabel: 'Performance',
  },
] as const

export function PortfolioShowcase() {
  const t = useTranslations('portfolioShowcase')

  return (
    <Section id="portfolio" className="overflow-hidden">
      <SectionHeader
        badge={t('badge')}
        title={t('title')}
        description={t('description')}
      />

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8">
        {/* Hero Project - Full width on mobile, spans 2 cols on desktop */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="md:col-span-2"
        >
          <Link href="/portfolio" className="group block">
            <div className="relative aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden border border-border/50 bg-bg-elevated/50">
              <Image
                src={SHOWCASE_PROJECTS[0].image}
                alt={SHOWCASE_PROJECTS[0].name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 90vw"
                priority
              />

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/90 via-bg-primary/20 to-transparent" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <div className="flex items-end justify-between">
                  <div>
                    <span className="inline-block px-3 py-1 mb-3 text-xs font-medium text-accent-orange bg-accent-orange/10 border border-accent-orange/20 rounded-full">
                      {t(`categories.${SHOWCASE_PROJECTS[0].category}`)}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-heading font-bold text-text-primary mb-2 group-hover:text-accent-orange transition-colors">
                      {SHOWCASE_PROJECTS[0].name}
                    </h3>
                    <p className="text-text-secondary text-sm md:text-base">
                      {t(`projects.${SHOWCASE_PROJECTS[0].id}.subtitle`)}
                    </p>
                  </div>

                  {/* Result badge */}
                  <div className="hidden md:block text-right">
                    <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent-orange to-accent-amber">
                      {SHOWCASE_PROJECTS[0].resultValue}
                    </span>
                    <p className="text-xs text-text-muted">{SHOWCASE_PROJECTS[0].resultLabel}</p>
                  </div>
                </div>
              </div>

              {/* Hover arrow */}
              <div className="absolute top-6 right-6 p-3 bg-bg-surface/80 backdrop-blur-sm border border-border/50 rounded-full opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                <ArrowRight className="w-5 h-5 text-accent-orange" />
              </div>
            </div>
          </Link>
        </motion.div>

        {/* Secondary Projects - 2 columns */}
        {SHOWCASE_PROJECTS.slice(1).map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
          >
            <Link href="/portfolio" className="group block">
              <div className="relative aspect-[16/10] rounded-xl overflow-hidden border border-border/50 bg-bg-elevated/50">
                <Image
                  src={project.image}
                  alt={project.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/90 via-bg-primary/30 to-transparent" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <span className="inline-block px-2 py-0.5 mb-2 text-[10px] font-medium text-accent-orange bg-accent-orange/10 border border-accent-orange/20 rounded-full">
                    {t(`categories.${project.category}`)}
                  </span>
                  <h3 className="text-xl font-heading font-bold text-text-primary mb-1 group-hover:text-accent-orange transition-colors">
                    {project.name}
                  </h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent-orange to-accent-amber">
                      {project.resultValue}
                    </span>
                    <span className="text-xs text-text-muted">{project.resultLabel}</span>
                  </div>
                </div>

                {/* Hover arrow */}
                <div className="absolute top-4 right-4 p-2 bg-bg-surface/80 backdrop-blur-sm border border-border/50 rounded-full opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                  <ArrowRight className="w-4 h-4 text-accent-orange" />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* CTA Button */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="flex justify-center"
      >
        <Link href="/portfolio">
          <Button size="lg" className="group">
            {t('cta')}
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </motion.div>
    </Section>
  )
}
