'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

interface ThumbnailCardProps {
  image: string
  name: string
  index: number
  isActive: boolean
  onClick: () => void
}

export function ThumbnailCard({
  image,
  name,
  index,
  isActive,
  onClick,
}: ThumbnailCardProps) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`relative flex-shrink-0 w-[120px] h-[80px] rounded-lg overflow-hidden border-2 transition-all duration-300 ${
        isActive
          ? 'border-accent-orange shadow-lg shadow-accent-orange/30'
          : 'border-border/50 hover:border-text-muted/50'
      }`}
    >
      {/* Thumbnail image */}
      <Image
        src={image}
        alt={name}
        fill
        className="object-cover"
        sizes="120px"
      />

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

      {/* Project number */}
      <div className="absolute top-1 right-1 px-1.5 py-0.5 bg-black/60 backdrop-blur-sm rounded text-[10px] text-white/60 font-mono">
        {String(index + 1).padStart(2, '0')}
      </div>

      {/* Active indicator */}
      {isActive && (
        <motion.div
          layoutId="activeIndicator"
          className="absolute inset-0 border-2 border-accent-orange rounded-lg"
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        />
      )}
    </motion.button>
  )
}
