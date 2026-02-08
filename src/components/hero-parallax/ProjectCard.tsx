'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { ExternalLink } from 'lucide-react'
import type { PortfolioProject } from '@/lib/constants'

interface ProjectCardProps {
  project: PortfolioProject
  index: number
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  if (!project.thumbnail) return null

  const handleClick = () => {
    if (project.url) {
      window.open(`https://${project.url}`, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <motion.div
      className="group relative h-[240px] w-full cursor-pointer overflow-hidden rounded-2xl border border-border/50 bg-bg-surface/60 backdrop-blur-sm transition-all duration-300 hover:border-accent-orange/50 hover:shadow-glow sm:h-[280px] md:h-[340px] lg:h-[400px]"
      whileHover={{ scale: 1.03, y: -4 }}
      whileTap={{ scale: 0.98 }}
      style={{ willChange: 'transform' }}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          handleClick()
        }
      }}
    >
      {/* Image Container */}
      <div className="relative h-full w-full">
        <Image
          src={project.thumbnail}
          alt={`${project.name} - ${project.type || project.category || 'Web project'} | ${project.section || 'Project showcase'}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover object-top transition-transform duration-700 group-hover:scale-110"
          quality={85}
          loading={index < 6 ? 'eager' : 'lazy'}
          priority={index < 3}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/70 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-90" />

        {/* Shine Effect on Hover */}
        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent" />
        </div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 z-10 p-4 sm:p-6">
          <div className="space-y-2 transform transition-transform duration-300 group-hover:translate-y-[-4px]">
            {/* Project Name */}
            <h3 className="font-heading text-lg font-bold text-text-primary md:text-xl lg:text-2xl">
              {project.name}
            </h3>

            {/* Type/Section */}
            {(project.type || project.section) && (
              <p className="text-xs text-text-secondary sm:text-sm md:text-base line-clamp-1">
                {project.type || project.section}
              </p>
            )}

            {/* Category Badge + URL Indicator */}
            <div className="flex items-center gap-2 flex-wrap">
              {project.category && (
                <span className="inline-block rounded-full bg-accent-orange/20 px-2.5 py-1 text-xs font-medium text-accent-orange backdrop-blur-sm">
                  {project.category}
                </span>
              )}
              {project.url && (
                <div className="flex items-center gap-1 text-xs text-accent-orange opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <ExternalLink className="h-3 w-3" />
                  <span className="hidden sm:inline">Visita sito</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Browser Window Decorative Buttons */}
        <div className="absolute left-4 top-4 z-10 flex gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="h-2.5 w-2.5 rounded-full bg-error/60 sm:h-3 sm:w-3" />
          <div className="h-2.5 w-2.5 rounded-full bg-warning/60 sm:h-3 sm:w-3" />
          <div className="h-2.5 w-2.5 rounded-full bg-success/60 sm:h-3 sm:w-3" />
        </div>

        {/* Click Indicator Ripple */}
        {project.url && (
          <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <div className="absolute inset-0 rounded-2xl ring-2 ring-accent-orange/30 ring-offset-2 ring-offset-bg-primary/50" />
          </div>
        )}
      </div>
    </motion.div>
  )
}
