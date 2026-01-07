'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

export interface ProjectData {
  id: string
  name: string
  client: string
  subtitle: string
  category: string
  description: string
  images: string[]
  services: Array<{ name: string; detail: string }>
  results: Array<{ value: string; label: string; suffix?: string }>
  technologies: string[]
  integrations: string[]
  url?: string
  challenge?: string
  solution?: string
}

interface ProjectCardProps {
  project: ProjectData
  onClick: () => void
  index: number
  variant?: 'default' | 'wide'
}

export function ProjectCard({ project, onClick, index, variant = 'default' }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const projectNumber = String(index + 1).padStart(2, '0')
  const isWide = variant === 'wide'

  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      className={cn(
        "group relative h-full overflow-hidden rounded-xl border cursor-pointer transition-all duration-300",
        "bg-bg-surface/80 backdrop-blur-sm",
        "border-border/50 hover:border-accent-orange/40",
        "hover:shadow-xl hover:shadow-accent-orange/10",
        isWide && "md:flex md:flex-row"
      )}
    >
      {/* Corner Accent - L Shape */}
      <div className="absolute top-0 left-0 w-8 h-8 pointer-events-none z-10">
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-accent-orange to-transparent" />
        <div className="absolute top-0 left-0 w-[2px] h-full bg-gradient-to-b from-accent-orange to-transparent" />
      </div>

      {/* Project Number - Background */}
      <div className={cn(
        "absolute font-heading font-black text-text-primary/[0.03] leading-none pointer-events-none select-none z-0",
        isWide ? "top-4 right-4 text-[80px]" : "top-3 right-3 text-[50px]"
      )}>
        {projectNumber}
      </div>

      {/* Image Container */}
      <div className={cn(
        "relative overflow-hidden",
        isWide ? "md:w-[55%] aspect-[16/10] md:aspect-auto md:min-h-full" : "aspect-[16/10]"
      )}>
        <Image
          src={project.images[0]}
          alt={project.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes={isWide
            ? "(max-width: 768px) 100vw, 55vw"
            : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          }
        />

        {/* Overlay gradient */}
        <div className={cn(
          "absolute inset-0 transition-opacity duration-300",
          isWide
            ? "bg-gradient-to-r from-transparent via-transparent to-bg-primary/80 md:bg-gradient-to-r opacity-60 group-hover:opacity-40"
            : "bg-gradient-to-t from-bg-primary via-bg-primary/30 to-transparent opacity-60 group-hover:opacity-40"
        )} />

        {/* Hover Arrow - Only on default cards */}
        {!isWide && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: isHovered ? 1 : 0,
              scale: isHovered ? 1 : 0.8
            }}
            transition={{ duration: 0.2 }}
            className="absolute top-3 right-3 p-2 bg-accent-orange rounded-full shadow-lg"
          >
            <ArrowUpRight className="w-4 h-4 text-white" />
          </motion.div>
        )}
      </div>

      {/* Content */}
      <div className={cn(
        "relative",
        isWide ? "md:w-[45%] p-5 md:p-6 flex flex-col justify-center" : "p-4"
      )}>
        {/* Category Badge */}
        <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-accent-orange/10 border border-accent-orange/20 rounded-full mb-2 w-fit">
          <div className="w-1 h-1 rounded-full bg-accent-orange" />
          <span className="text-[10px] text-accent-orange font-medium uppercase tracking-wide">{project.category}</span>
        </div>

        {/* Title */}
        <h3 className={cn(
          "font-heading font-bold text-text-primary mb-1 transition-colors duration-300 group-hover:text-accent-orange",
          isWide ? "text-xl md:text-2xl" : "text-lg line-clamp-1"
        )}>
          {project.name}
        </h3>

        {/* Subtitle */}
        <p className={cn(
          "text-text-secondary",
          isWide ? "text-sm md:text-base line-clamp-2 mb-4" : "text-sm line-clamp-2 mb-3"
        )}>
          {project.subtitle}
        </p>

        {/* Results Preview */}
        {project.results.length > 0 && (
          <div className={cn(
            "flex flex-wrap gap-x-4 gap-y-1 pt-3 border-t border-border/30",
            isWide && "gap-x-6"
          )}>
            {project.results.slice(0, isWide ? 3 : 2).map((result, idx) => (
              <div key={idx} className="flex items-baseline gap-1">
                <span className={cn(
                  "font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent-orange to-accent-amber",
                  isWide ? "text-lg md:text-xl" : "text-base"
                )}>
                  {result.value}{result.suffix}
                </span>
                <span className={cn(
                  "text-text-muted",
                  isWide ? "text-xs" : "text-[10px]"
                )}>{result.label}</span>
              </div>
            ))}
          </div>
        )}

        {/* Technologies - Only on wide cards */}
        {isWide && project.technologies.length > 0 && (
          <div className="hidden md:flex flex-wrap gap-1.5 mt-4 pt-3 border-t border-border/30">
            {project.technologies.slice(0, 4).map((tech, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 text-[10px] text-text-muted bg-bg-elevated/50 rounded border border-border/30"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span className="px-2 py-0.5 text-[10px] text-text-muted">
                +{project.technologies.length - 4}
              </span>
            )}
          </div>
        )}

        {/* Arrow for wide cards */}
        {isWide && (
          <motion.div
            initial={{ opacity: 0.6, x: 0 }}
            animate={{
              opacity: isHovered ? 1 : 0.6,
              x: isHovered ? 4 : 0
            }}
            transition={{ duration: 0.2 }}
            className="hidden md:flex items-center gap-2 mt-4 text-accent-orange text-sm font-medium"
          >
            <span>Vedi progetto</span>
            <ArrowUpRight className="w-4 h-4" />
          </motion.div>
        )}
      </div>

      {/* Bottom accent line - animated */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-accent-orange to-accent-amber"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        style={{ originX: 0 }}
      />
    </motion.article>
  )
}
