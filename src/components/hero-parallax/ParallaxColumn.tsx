'use client'

import { motion, type MotionValue } from 'framer-motion'
import type { PortfolioProject } from '@/lib/constants'
import { ProjectCard } from './ProjectCard'
import { cn } from '@/lib/utils'

interface ParallaxColumnProps {
  projects: PortfolioProject[]
  translateY: MotionValue<number>
  className?: string
}

export function ParallaxColumn({
  projects,
  translateY,
  className,
}: ParallaxColumnProps) {
  return (
    <motion.div
      className={cn('flex flex-1 flex-col gap-4 md:gap-6 lg:gap-8', className)}
      style={{ y: translateY }}
    >
      {projects.map((project, index) => (
        <ProjectCard
          key={project.id || `${project.name}-${index}`}
          project={project}
          index={index}
        />
      ))}
    </motion.div>
  )
}
