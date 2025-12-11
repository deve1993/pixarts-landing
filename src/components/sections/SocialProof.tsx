'use client'

import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import { useTranslations } from 'next-intl'
import { useEffect, useState, useRef } from 'react'
import { Section, SectionHeader } from '@/components/ui/section'
import { SatelliteCard } from '@/components/SatelliteCard'
import { fadeInUp, staggerContainer, staggerItem, scaleIn } from '@/lib/motion-variants'

const PROJECT_KEYS = ['flowmatics', 'quickfy', 'benetti', 'fl1'] as const
const PROJECT_NAMES = ['FlowMatics', 'Quickfy', 'Falegnameria Benetti', 'FL1'] as const

// Dynamic import del globo con ssr: false per evitare problemi con canvas
const GlobeCanvas = dynamic(
  () => import('@/components/GlobeCanvas').then((mod) => mod.GlobeCanvas),
  { ssr: false, loading: () => <GlobePlaceholder /> }
)

// Placeholder mentre il Globe si carica
function GlobePlaceholder() {
  return (
    <div
      className="w-full h-full rounded-full bg-gradient-to-br from-accent-orange/10 to-accent-amber/5 animate-pulse"
      style={{ aspectRatio: '1' }}
    />
  )
}

// Hook per Intersection Observer - carica Globe solo quando visibile
function useInView(options?: IntersectionObserverInit) {
  const ref = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(([entry]) => {
      // Una volta visibile, rimane true (lazy load una volta sola)
      if (entry.isIntersecting) {
        setIsInView(true)
        observer.disconnect()
      }
    }, { rootMargin: '200px', ...options })

    observer.observe(element)
    return () => observer.disconnect()
  }, [options])

  return { ref, isInView }
}

export function SocialProof() {
  const t = useTranslations('socialProof')
  // Lazy load Globe only when section comes into view
  const { ref: globeContainerRef, isInView: shouldLoadGlobe } = useInView()

  return (
    <Section id="social-proof" className="py-16 md:py-24">
      {/* Header */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={fadeInUp}
      >
        <SectionHeader
          title={t('title')}
          description={t('description')}
        />
      </motion.div>

      {/* Globo + Satelliti Container */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={scaleIn}
        className="relative flex justify-center items-center min-h-[450px] md:min-h-[620px] lg:min-h-[750px]"
      >
        {/* Satellite Card 1: Top-Left (Desktop only) - FlowMatics */}
        <div className="hidden lg:block absolute top-[20%] left-[8%] xl:left-[12%] 2xl:left-[18%] z-10">
          <SatelliteCard
            projectKey="flowmatics"
            projectName="FlowMatics"
            position="top-left"
          />
        </div>

        {/* Satellite Card 2: Top-Right (Desktop only) - Quickfy */}
        <div className="hidden lg:block absolute top-[20%] right-[8%] xl:right-[12%] 2xl:right-[18%] z-10">
          <SatelliteCard
            projectKey="quickfy"
            projectName="Quickfy"
            position="top-right"
          />
        </div>

        {/* Globo Centrale - Lazy loaded */}
        <div ref={globeContainerRef} className="relative z-0">
          {/* Glow arancione attorno al globo - più chiaro */}
          <div className="absolute inset-0 bg-accent-amber/30 blur-3xl rounded-full scale-75" />

          {/* Globo - ingrandito, caricato solo quando visibile */}
          <div className="relative w-[380px] h-[380px] md:w-[550px] md:h-[550px] lg:w-[550px] lg:h-[550px]">
            {shouldLoadGlobe ? (
              <GlobeCanvas className="w-full h-full" />
            ) : (
              <GlobePlaceholder />
            )}
          </div>
        </div>

        {/* Satellite Card 3: Bottom-Left (Desktop only) - FL1 */}
        <div className="hidden lg:block absolute bottom-[5%] left-[5%] xl:left-[10%] 2xl:left-[15%] z-10">
          <SatelliteCard
            projectKey="fl1"
            projectName="FL1"
            position="bottom-center"
          />
        </div>

        {/* Satellite Card 4: Bottom-Right (Desktop only) - Falegnameria Benetti */}
        <div className="hidden lg:block absolute bottom-[5%] right-[5%] xl:right-[10%] 2xl:right-[15%] z-10">
          <SatelliteCard
            projectKey="benetti"
            projectName="Falegnameria Benetti"
            position="bottom-center"
          />
        </div>
      </motion.div>

      {/* Mobile Cards: sotto il globo */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="lg:hidden mt-8 space-y-4 max-w-md mx-auto"
      >
        {PROJECT_KEYS.map((key, index) => (
          <motion.div key={key} variants={staggerItem}>
            <SatelliteCard
              projectKey={key}
              projectName={PROJECT_NAMES[index]}
              position={index === 0 ? 'top-left' : 'bottom-right'}
            />
          </motion.div>
        ))}
      </motion.div>
    </Section>
  )
}
