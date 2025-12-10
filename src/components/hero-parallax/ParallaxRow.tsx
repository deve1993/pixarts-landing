'use client'

import { motion, type MotionValue } from 'framer-motion'
import type { PortfolioProject } from '@/lib/constants'
import { ProjectCard } from './ProjectCard'

interface ParallaxRowProps {
  projects: PortfolioProject[]
  translateX: MotionValue<number>
  direction: 'left' | 'right'
}

export function ParallaxRow({
  projects,
  translateX,
  direction,
}: ParallaxRowProps) {
  return (
    <div className="relative w-full overflow-hidden">
      {/* Gradient Fade Left Edge */}
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-32 bg-gradient-to-r from-bg-primary to-transparent" />

      {/* Gradient Fade Right Edge */}
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-32 bg-gradient-to-l from-bg-primary to-transparent" />

      {/* Scrolling Row Container */}
      <motion.div
        className="flex gap-6"
        style={{ x: translateX, willChange: 'transform' }}
      >
        {projects.map((project, index) => (
          <ProjectCard
            key={project.id || `${project.name}-${index}`}
            project={project}
            index={index}
          />
        ))}

        {/* Duplicate for Infinite Scroll Effect (Optional) */}
        {projects.map((project, index) => (
          <ProjectCard
            key={`duplicate-${project.id || `${project.name}-${index}`}`}
            project={project}
            index={index + projects.length}
          />
        ))}
      </motion.div>
    </div>
  )
}
