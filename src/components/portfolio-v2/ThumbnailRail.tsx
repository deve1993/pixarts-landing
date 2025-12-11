'use client'

import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ThumbnailCard } from './ThumbnailCard'
import type { PortfolioProjectV2 } from '@/lib/constants'

interface ThumbnailRailProps {
  projects: PortfolioProjectV2[]
  activeIndex: number
  onSelect: (index: number) => void
}

export function ThumbnailRail({
  projects,
  activeIndex,
  onSelect,
}: ThumbnailRailProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const thumbnailRefs = useRef<(HTMLButtonElement | null)[]>([])

  // Auto-scroll to active thumbnail
  useEffect(() => {
    const container = scrollContainerRef.current
    const activeThumbnail = thumbnailRefs.current[activeIndex]

    if (container && activeThumbnail) {
      const containerWidth = container.offsetWidth
      const thumbnailLeft = activeThumbnail.offsetLeft
      const thumbnailWidth = activeThumbnail.offsetWidth

      const targetScroll =
        thumbnailLeft - containerWidth / 2 + thumbnailWidth / 2

      container.scrollTo({
        left: targetScroll,
        behavior: 'smooth',
      })
    }
  }, [activeIndex])

  return (
    <div className="relative w-full py-4 lg:py-6">
      {/* Fade edges */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 lg:w-20 bg-gradient-to-r from-bg-primary to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 lg:w-20 bg-gradient-to-l from-bg-primary to-transparent z-10" />

      {/* Scrollable container */}
      <motion.div
        ref={scrollContainerRef}
        className="flex gap-3 overflow-x-auto scrollbar-hide px-12 lg:px-20"
        style={{ scrollbarWidth: 'none' }}
      >
        {projects.map((project, index) => (
          <div
            key={project.id}
            ref={(el) => {
              thumbnailRefs.current[index] = el as HTMLButtonElement | null
            }}
          >
            <ThumbnailCard
              image={project.images[0]}
              name={project.name}
              index={index}
              isActive={index === activeIndex}
              onClick={() => onSelect(index)}
            />
          </div>
        ))}
      </motion.div>

      {/* Navigation hint */}
      <div className="text-center mt-3">
        <span className="text-xs text-text-muted">
          {activeIndex + 1} / {projects.length} progetti
        </span>
      </div>
    </div>
  )
}
