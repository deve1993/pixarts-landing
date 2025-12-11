'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Expand } from 'lucide-react'

interface ImageViewportProps {
  images: string[]
  name: string
  direction: number
}

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 100 : -100,
    opacity: 0,
    scale: 1.05,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 100 : -100,
    opacity: 0,
    scale: 0.95,
  }),
}

export function ImageViewport({ images, name, direction }: ImageViewportProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0)

  // Reset to first image when project changes
  const currentImage = images[activeImageIndex] || images[0]

  return (
    <div className="relative w-full h-full min-h-[300px] lg:min-h-[500px] group">
      {/* Background gradient glow */}
      <div className="absolute inset-0 bg-gradient-radial from-accent-orange/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Main image container */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={currentImage}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] }}
          className="relative w-full h-full"
        >
          {/* Browser chrome decoration */}
          <div className="absolute top-0 left-0 right-0 h-8 bg-bg-elevated/80 backdrop-blur-sm rounded-t-xl border-b border-border/30 flex items-center px-3 gap-1.5 z-10">
            <div className="w-3 h-3 rounded-full bg-error/50" />
            <div className="w-3 h-3 rounded-full bg-warning/50" />
            <div className="w-3 h-3 rounded-full bg-success/50" />
            <div className="ml-4 flex-1 h-5 bg-bg-surface/50 rounded-md" />
          </div>

          {/* Image */}
          <div className="relative w-full h-full pt-8 rounded-xl overflow-hidden border border-border/50 bg-bg-surface/60">
            <Image
              src={currentImage}
              alt={`${name} screenshot`}
              fill
              className="object-cover object-top"
              sizes="(max-width: 1024px) 100vw, 60vw"
              priority
            />

            {/* Bottom gradient overlay */}
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-bg-primary/80 to-transparent" />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Image navigation dots */}
      {images.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveImageIndex(idx)}
              className={`h-1.5 rounded-full transition-all ${
                idx === activeImageIndex
                  ? 'w-8 bg-accent-orange'
                  : 'w-1.5 bg-white/40 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
      )}

      {/* Image counter */}
      <div className="absolute top-12 right-4 px-3 py-1.5 bg-black/40 backdrop-blur-md rounded-full text-xs text-white/80 font-mono z-10">
        {activeImageIndex + 1} / {images.length}
      </div>

      {/* Fullscreen button (placeholder for future) */}
      <button className="absolute top-12 left-4 p-2 bg-black/40 backdrop-blur-md rounded-lg opacity-0 group-hover:opacity-100 transition-opacity z-10">
        <Expand className="w-4 h-4 text-white" />
      </button>
    </div>
  )
}
