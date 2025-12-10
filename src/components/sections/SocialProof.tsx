'use client'

import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import { Section, SectionHeader } from '@/components/ui/section'
import { SatelliteCard } from '@/components/SatelliteCard'
import { PORTFOLIO_PROJECTS } from '@/lib/constants'
import { fadeInUp, staggerContainer, staggerItem, scaleIn } from '@/lib/motion-variants'

// Dynamic import del globo con ssr: false per evitare problemi con canvas
const GlobeCanvas = dynamic(
  () => import('@/components/GlobeCanvas').then((mod) => mod.GlobeCanvas),
  { ssr: false }
)

export function SocialProof() {
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
          title="Hanno Scelto Noi"
          description="Progetti reali, risultati misurabili. Dai un'occhiata ai nostri casi di successo."
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
        {/* Satellite Card 1: Left (Desktop only) - FlowMatics */}
        <div className="hidden lg:block absolute top-1/2 -translate-y-1/2 left-0 xl:left-[2%] 2xl:left-[5%] z-10">
          <SatelliteCard
            project={PORTFOLIO_PROJECTS[0]}
            position="top-left"
          />
        </div>

        {/* Globo Centrale */}
        <div className="relative">
          {/* Glow arancione attorno al globo - più chiaro */}
          <div className="absolute inset-0 bg-accent-amber/30 blur-3xl rounded-full scale-75" />

          {/* Globo - ingrandito */}
          <div className="relative w-[380px] h-[380px] md:w-[550px] md:h-[550px] lg:w-[650px] lg:h-[650px]">
            <GlobeCanvas className="w-full h-full" />
          </div>
        </div>

        {/* Satellite Card 2: Right (Desktop only) - Quickfy */}
        <div className="hidden lg:block absolute top-1/2 -translate-y-1/2 right-0 xl:right-[2%] 2xl:right-[5%] z-10">
          <SatelliteCard
            project={PORTFOLIO_PROJECTS[1]}
            position="top-right"
          />
        </div>

        {/* Satellite Card 3: Bottom-Center (Desktop only) - Falegnameria Benetti */}
        <div className="hidden lg:block absolute bottom-0 left-1/2 -translate-x-1/2 z-10">
          <SatelliteCard
            project={PORTFOLIO_PROJECTS[2]}
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
        {PORTFOLIO_PROJECTS.map((project, index) => (
          <motion.div key={project.name} variants={staggerItem}>
            <SatelliteCard
              project={project}
              position={index === 0 ? 'top-left' : 'bottom-right'}
            />
          </motion.div>
        ))}
      </motion.div>
    </Section>
  )
}
