'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { motion } from 'framer-motion'

// ============================================================================
// TYPES
// ============================================================================

interface MatrixDrop {
  x: number
  y: number
  speed: number
  length: number
  chars: string[]
  opacity: number
}

interface BlobConfig {
  id: number
  initialX: number
  initialY: number
  size: number
  duration: number
  morphDuration: number
}

// ============================================================================
// CONSTANTS
// ============================================================================

// Matrix Rain constants
const MATRIX_COLUMN_WIDTH = 25 // Spazio tra colonne
const MATRIX_CHAR_SIZE = 14 // Dimensione font
const MATRIX_BASE_OPACITY = 0.18 // 15-20% trasparenza
const MATRIX_CHARS = ['0', '1']

// Blob configurations for gradient mesh
const BLOB_CONFIGS: BlobConfig[] = [
  { id: 1, initialX: 10, initialY: 15, size: 600, duration: 10, morphDuration: 15 },
  { id: 2, initialX: 80, initialY: 20, size: 500, duration: 12, morphDuration: 18 },
  { id: 3, initialX: 40, initialY: 60, size: 700, duration: 8, morphDuration: 20 },
  { id: 4, initialX: 75, initialY: 75, size: 450, duration: 11, morphDuration: 16 },
]

// ============================================================================
// HOOKS
// ============================================================================

/**
 * Hook for detecting reduced motion preference
 */
function usePrefersReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  return prefersReducedMotion
}

/**
 * Custom hook for Matrix Rain effect
 */
function useMatrixRain(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  prefersReducedMotion: boolean,
  enabled: boolean = true
) {
  const dropsRef = useRef<MatrixDrop[]>([])
  const animationFrameRef = useRef<number | undefined>(undefined)

  // Initialize matrix drops
  const initDrops = useCallback((width: number, height: number) => {
    const columns = Math.floor(width / MATRIX_COLUMN_WIDTH)
    const drops: MatrixDrop[] = []

    for (let i = 0; i < columns; i++) {
      // Solo ~40% delle colonne attive per densità media
      if (Math.random() > 0.4) continue

      const length = 5 + Math.floor(Math.random() * 10)
      const chars: string[] = []
      for (let j = 0; j < length; j++) {
        chars.push(MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)])
      }

      drops.push({
        x: i * MATRIX_COLUMN_WIDTH + MATRIX_COLUMN_WIDTH / 2,
        y: Math.random() * height * 0.5 - height * 0.5, // Partono sopra lo schermo
        speed: 0.8 + Math.random() * 1.2,
        length,
        chars,
        opacity: MATRIX_BASE_OPACITY * (0.7 + Math.random() * 0.6),
      })
    }
    dropsRef.current = drops
  }, [])

  // Update drop positions
  const updateDrops = useCallback((height: number) => {
    dropsRef.current.forEach((drop) => {
      drop.y += drop.speed

      // Reset quando esce dallo schermo
      if (drop.y - drop.length * MATRIX_CHAR_SIZE > height) {
        drop.y = -drop.length * MATRIX_CHAR_SIZE
        // Rigenera caratteri
        for (let j = 0; j < drop.chars.length; j++) {
          drop.chars[j] = MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)]
        }
      }

      // Cambia casualmente alcuni caratteri durante la caduta
      if (Math.random() < 0.02) {
        const idx = Math.floor(Math.random() * drop.chars.length)
        drop.chars[idx] = MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)]
      }
    })
  }, [])

  // Draw matrix rain
  const draw = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number, dpr: number) => {
    ctx.clearRect(0, 0, width * dpr, height * dpr)
    ctx.save()
    ctx.scale(dpr, dpr)

    ctx.font = `${MATRIX_CHAR_SIZE}px monospace`
    ctx.textAlign = 'center'

    dropsRef.current.forEach((drop) => {
      drop.chars.forEach((char, i) => {
        const charY = drop.y + i * MATRIX_CHAR_SIZE

        // Skip se fuori schermo
        if (charY < -MATRIX_CHAR_SIZE || charY > height + MATRIX_CHAR_SIZE) return

        // Fade gradient: primo carattere più luminoso, ultimi più sbiaditi
        const fadePosition = i / drop.chars.length
        const fadeFactor = 1 - fadePosition * 0.7
        const charOpacity = drop.opacity * fadeFactor

        // Il primo carattere (testa) è più luminoso
        if (i === 0) {
          ctx.fillStyle = `rgba(255, 150, 80, ${charOpacity * 1.5})`
          ctx.shadowBlur = 8
          ctx.shadowColor = 'rgba(255, 107, 44, 0.5)'
        } else {
          ctx.fillStyle = `rgba(255, 107, 44, ${charOpacity})`
          ctx.shadowBlur = 0
        }

        ctx.fillText(char, drop.x, charY)
      })
    })

    ctx.restore()
  }, [])

  // Setup and cleanup
  useEffect(() => {
    if (!enabled) return

    const canvas = canvasRef.current
    if (!canvas) return

    const dpr = window.devicePixelRatio || 1

    const handleResize = () => {
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      canvas.style.width = `${rect.width}px`
      canvas.style.height = `${rect.height}px`
      initDrops(rect.width, rect.height)
    }

    handleResize()

    let resizeTimeout: ReturnType<typeof setTimeout>
    const debouncedResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(handleResize, 300)
    }

    window.addEventListener('resize', debouncedResize)

    let lastFrameTime = 0
    const FRAME_INTERVAL = 1000 / 30 // Cap at 30fps

    const animate = (timestamp: number) => {
      if (timestamp - lastFrameTime < FRAME_INTERVAL) {
        animationFrameRef.current = requestAnimationFrame(animate)
        return
      }
      lastFrameTime = timestamp

      const ctx = canvas.getContext('2d')
      if (!ctx) return

      const rect = canvas.getBoundingClientRect()

      if (!prefersReducedMotion) {
        updateDrops(rect.height)
      }
      draw(ctx, rect.width, rect.height, dpr)

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animationFrameRef.current = requestAnimationFrame(animate as FrameRequestCallback)

    return () => {
      window.removeEventListener('resize', debouncedResize)
      clearTimeout(resizeTimeout)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [canvasRef, prefersReducedMotion, enabled, initDrops, updateDrops, draw])
}

// ============================================================================
// GRADIENT BLOB COMPONENT
// ============================================================================

interface GradientBlobProps {
  config: BlobConfig
  prefersReducedMotion: boolean
}

function GradientBlob({ config, prefersReducedMotion }: GradientBlobProps) {
  const blobVariants = {
    animate: {
      scale: [1, 1.15, 1],
      borderRadius: [
        '30% 70% 70% 30% / 30% 30% 70% 70%',
        '70% 30% 30% 70% / 70% 70% 30% 30%',
        '30% 70% 70% 30% / 30% 30% 70% 70%',
      ],
      x: [0, 20, -10, 0],
      y: [0, -15, 10, 0],
    },
  }

  const baseStyle: React.CSSProperties = {
    position: 'absolute',
    left: `${config.initialX}%`,
    top: `${config.initialY}%`,
    width: config.size,
    height: config.size,
    background: 'linear-gradient(135deg, #FF6B2C 0%, #FFB347 100%)',
    filter: 'blur(80px)',
    opacity: 0.2,
    transform: 'translate(-50%, -50%)',
    borderRadius: '50%',
    // Performance optimizations - reduce repaint cost
    contain: 'layout style paint',
    willChange: 'transform',
  }

  if (prefersReducedMotion) {
    return <div style={baseStyle} />
  }

  return (
    <motion.div
      style={{
        ...baseStyle,
        transform: undefined, // Let framer handle transforms
        x: '-50%',
        y: '-50%',
      }}
      variants={blobVariants}
      animate="animate"
      transition={{
        duration: config.duration,
        repeat: Infinity,
        ease: 'easeInOut',
        times: [0, 0.33, 0.66, 1],
      }}
    />
  )
}

// ============================================================================
// GRAIN TEXTURE COMPONENT
// ============================================================================

function GrainTexture() {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{ opacity: 0.03, mixBlendMode: 'overlay' }}
      aria-hidden="true"
    >
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="grain-filter" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.8"
              numOctaves="4"
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
          </filter>
        </defs>
        <rect width="100%" height="100%" filter="url(#grain-filter)" />
      </svg>
    </div>
  )
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

// Delay before starting Matrix Rain animation (ms) - helps with initial page load performance
const MATRIX_RAIN_START_DELAY = 1500

export function HybridPremiumBackground() {
  const matrixCanvasRef = useRef<HTMLCanvasElement>(null)
  const prefersReducedMotion = usePrefersReducedMotion()
  const [mounted, setMounted] = useState(false)
  const [matrixReady, setMatrixReady] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Delay Matrix Rain start by 1.5 seconds for better initial load performance
    const timer = setTimeout(() => setMatrixReady(true), MATRIX_RAIN_START_DELAY)
    return () => clearTimeout(timer)
  }, [])

  // Initialize Matrix Rain effect - starts only after delay
  useMatrixRain(matrixCanvasRef, prefersReducedMotion, matrixReady)

  if (!mounted) {
    return (
      <div
        className="fixed inset-0 overflow-hidden pointer-events-none"
        style={{ zIndex: -1, backgroundColor: '#0A0A0B' }}
        aria-hidden="true"
      />
    )
  }

  return (
    <div
      className="fixed inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: -1, backgroundColor: '#0A0A0B' }}
      aria-hidden="true"
    >
      {/* Layer 1: Gradient Mesh */}
      <div className="absolute inset-0 overflow-hidden">
        {BLOB_CONFIGS.map((config) => (
          <GradientBlob
            key={config.id}
            config={config}
            prefersReducedMotion={prefersReducedMotion}
          />
        ))}
      </div>

      {/* Layer 2: Matrix Rain */}
      <canvas
        ref={matrixCanvasRef}
        className="absolute inset-0"
        style={{ width: '100%', height: '100%' }}
      />

      {/* Layer 3: Grain Texture */}
      <GrainTexture />
    </div>
  )
}

export default HybridPremiumBackground
