'use client'

import { useRef, useState, useEffect } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from 'framer-motion'
import { HERO_PARALLAX_PROJECTS } from '@/lib/constants'
import { HeroHeader } from './HeroHeader'
import { ParallaxColumn } from './ParallaxColumn'
import { PortfolioCTA } from './PortfolioCTA'

export function HeroParallax() {
  const containerRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const [isMobile, setIsMobile] = useState(false)

  // Detect mobile for performance optimization - parallax 3D is heavy on mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Scroll tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  // Spring configuration for smooth animations
  const springConfig = {
    stiffness: 300,
    damping: 30,
    restDelta: 0.001,
  }

  // Transform mappings - vertical movement for columns
  const translateFirst = useTransform(scrollYProgress, [0, 1], [0, -150])
  const translateSecond = useTransform(scrollYProgress, [0, 1], [0, 150])
  const translateThird = useTransform(scrollYProgress, [0, 1], [0, -150])

  // 3D rotation effect
  const rotateX = useTransform(scrollYProgress, [0, 0.2], [15, 0])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0])

  // Apply spring for smooth transitions
  const translateFirstSpring = useSpring(translateFirst, springConfig)
  const translateSecondSpring = useSpring(translateSecond, springConfig)
  const translateThirdSpring = useSpring(translateThird, springConfig)
  const rotateXSpring = useSpring(rotateX, springConfig)

  // Split projects into 3 columns (5 per column)
  const firstColumn = HERO_PARALLAX_PROJECTS.slice(0, 5)
  const secondColumn = HERO_PARALLAX_PROJECTS.slice(5, 10)
  const thirdColumn = HERO_PARALLAX_PROJECTS.slice(10, 15)

  // If reduced motion is preferred OR mobile device, show static grid for better performance
  if (prefersReducedMotion || isMobile) {
    return (
      <section
        id="portfolio"
        ref={containerRef}
        className="relative w-full overflow-hidden py-12 md:py-20"
      >
        <div className="relative z-10">
          <HeroHeader />
          <div className="container mx-auto grid gap-4 md:gap-6 px-4 grid-cols-2 lg:grid-cols-3">
            {HERO_PARALLAX_PROJECTS.slice(0, 6).map((project, index) => (
              <div key={project.id || index} className="aspect-[16/10]">
                <div className="h-full w-full rounded-xl border border-border bg-bg-surface" />
              </div>
            ))}
          </div>
        </div>
        <PortfolioCTA />
      </section>
    )
  }

  return (
    <>
      <section
        id="portfolio"
        ref={containerRef}
        className="relative h-[180vh] w-full overflow-hidden py-20 md:py-32"
      >
        {/* Fixed Header */}
        <div className="relative z-20">
          <HeroHeader />
        </div>

        {/* Sticky Container with Parallax Columns */}
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <motion.div
            style={{
              rotateX: rotateXSpring,
              opacity,
              perspective: '1200px',
            }}
            className="relative mx-auto flex w-full max-w-7xl gap-4 px-4 md:gap-6 lg:gap-8"
          >
            {/* Column 1 - Moves up */}
            <ParallaxColumn
              projects={firstColumn}
              translateY={translateFirstSpring}
            />

            {/* Column 2 - Moves down */}
            <ParallaxColumn
              projects={secondColumn}
              translateY={translateSecondSpring}
            />

            {/* Column 3 - Moves up */}
            <ParallaxColumn
              projects={thirdColumn}
              translateY={translateThirdSpring}
              className="hidden lg:flex"
            />
          </motion.div>
        </div>
      </section>

      {/* CTA Section after Portfolio */}
      <PortfolioCTA />
    </>
  )
}
