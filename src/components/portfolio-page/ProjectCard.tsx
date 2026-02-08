'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowUpRight, Monitor, Smartphone } from 'lucide-react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

export interface ProjectData {
  id: string
  name: string
  client: string
  subtitle: string
  category: string
  categoryKey?: string
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
  viewProjectLabel?: string
}

// ── Count-up animation for grid results ──────────────────────────────
function parseValue(value: string): { prefix: string; number: number; rest: string; isNumeric: boolean } {
  const match = value.match(/^([+-]?)(\d+(?:\.\d+)?)(.*)$/)
  if (match) {
    return { prefix: match[1] || '', number: parseFloat(match[2]), rest: match[3] || '', isNumeric: true }
  }
  return { prefix: '', number: 0, rest: '', isNumeric: false }
}

function useCountUp(end: number, duration: number = 1200, shouldStart: boolean = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!shouldStart) return
    let startTime: number | null = null
    let frame: number
    const animate = (ts: number) => {
      if (!startTime) startTime = ts
      const progress = Math.min((ts - startTime) / duration, 1)
      setCount(Math.floor((1 - Math.pow(1 - progress, 3)) * end))
      if (progress < 1) frame = requestAnimationFrame(animate)
      else setCount(end)
    }
    frame = requestAnimationFrame(animate)
    return () => { if (frame) cancelAnimationFrame(frame) }
  }, [end, duration, shouldStart])
  return count
}

function AnimatedResultValue({ value, suffix, isWide }: { value: string; suffix?: string; isWide: boolean }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-30px' })
  const { prefix, number, rest, isNumeric } = parseValue(value)
  const animatedValue = useCountUp(number, 1000, isInView && isNumeric)

  return (
    <span
      ref={ref}
      className={cn(
        'font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent-orange to-accent-amber',
        isWide ? 'text-lg md:text-xl' : 'text-base'
      )}
    >
      {isNumeric ? <>{prefix}<span className="tabular-nums">{animatedValue}</span>{rest}</> : value}
      {suffix}
    </span>
  )
}

// ── Device type indicator ────────────────────────────────────────────
function DeviceIndicator({ categoryKey }: { categoryKey?: string }) {
  const isApp = categoryKey === 'webapp'
  return (
    <div className="absolute top-3 left-3 z-10 p-1.5 bg-bg-primary/60 backdrop-blur-sm rounded-md border border-border/30">
      {isApp ? <Smartphone className="w-3.5 h-3.5 text-text-muted" /> : <Monitor className="w-3.5 h-3.5 text-text-muted" />}
    </div>
  )
}

// ── ProjectCard ──────────────────────────────────────────────────────
export function ProjectCard({ project, onClick, index, variant = 'default', viewProjectLabel = 'View project' }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const projectNumber = String(index + 1).padStart(2, '0')
  const isWide = variant === 'wide'
  const hasSecondImage = project.images.length > 1

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick() }
  }, [onClick])

  return (
    <motion.article
      role="button"
      tabIndex={0}
      aria-label={`${project.name} — ${project.subtitle}`}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      className={cn(
        "group relative h-full overflow-hidden rounded-xl cursor-pointer transition-all duration-300",
        "bg-bg-surface/80 backdrop-blur-sm",
        "border border-border/50",
        "glow-border",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-orange focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary",
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

      {/* Image Container — wide: 16/9, default: 4/3 for better vertical space */}
      <div className={cn(
        "relative overflow-hidden",
        isWide ? "md:w-[55%] aspect-[16/9] md:aspect-auto md:min-h-full" : "aspect-[4/3]"
      )}>
        {/* Device type indicator */}
        <DeviceIndicator categoryKey={project.categoryKey} />

        {/* Primary image */}
        <Image
          src={project.images[0]}
          alt={project.name}
          fill
          className={cn(
            "object-cover transition-all duration-500",
            hasSecondImage ? "group-hover:opacity-0 group-hover:scale-105" : "group-hover:scale-105"
          )}
          sizes={isWide
            ? "(max-width: 768px) 100vw, 55vw"
            : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          }
        />

        {/* Secondary image — fade in on hover */}
        {hasSecondImage && (
          <Image
            src={project.images[1]}
            alt={`${project.name} - preview 2`}
            fill
            className="object-cover transition-all duration-500 opacity-0 scale-105 group-hover:opacity-100 group-hover:scale-100"
            sizes={isWide
              ? "(max-width: 768px) 100vw, 55vw"
              : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            }
          />
        )}

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
            className="absolute top-3 right-3 p-2 bg-accent-orange rounded-full shadow-lg z-10"
          >
            <ArrowUpRight className="w-4 h-4 text-white" />
          </motion.div>
        )}
      </div>

      {/* Content — increased padding from p-4 to p-5 on default cards */}
      <div className={cn(
        "relative",
        isWide ? "md:w-[45%] p-5 md:p-6 flex flex-col justify-center" : "p-5"
      )}>
        {/* Category Badge */}
        <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-accent-orange/10 border border-accent-orange/20 rounded-full mb-3 w-fit">
          <div className="w-1 h-1 rounded-full bg-accent-orange" />
          <span className="text-[10px] text-accent-orange font-medium uppercase tracking-wide">{project.category}</span>
        </div>

        {/* Title */}
        <h3 className={cn(
          "font-heading font-bold text-text-primary mb-1.5 transition-colors duration-300 group-hover:text-accent-orange",
          isWide ? "text-xl md:text-2xl" : "text-lg line-clamp-1"
        )}>
          {project.name}
        </h3>

        {/* Subtitle */}
        <p className={cn(
          "text-text-secondary",
          isWide ? "text-sm md:text-base line-clamp-2 mb-4" : "text-sm line-clamp-2 mb-4"
        )}>
          {project.subtitle}
        </p>

        {/* Results Preview — with animated count-up */}
        {project.results.length > 0 && (
          <div className={cn(
            "flex flex-wrap gap-x-4 gap-y-1.5 pt-3 border-t border-border/30",
            isWide && "gap-x-6"
          )}>
            {project.results.slice(0, isWide ? 3 : 2).map((result, idx) => (
              <div key={idx} className="flex items-baseline gap-1">
                <AnimatedResultValue value={result.value} suffix={result.suffix} isWide={isWide} />
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

        {/* Arrow for wide cards — i18n-ready label */}
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
            <span>{viewProjectLabel}</span>
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
