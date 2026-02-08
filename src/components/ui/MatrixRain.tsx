'use client'

import { useEffect, useRef, useState } from 'react'

interface MatrixRainProps {
  className?: string
  /** Delay before starting the animation (ms) - helps with initial page load performance */
  startDelay?: number
}

const MATRIX_CHARS = ['0', '1']
const MATRIX_CHAR_SIZE = 12
const MATRIX_COLUMN_WIDTH_DESKTOP = 17 // Reduced from 20 for 15% more density
const MATRIX_COLUMN_WIDTH_MOBILE = 14

interface MatrixDrop {
  x: number
  y: number
  speed: number
  length: number
  chars: string[]
  opacity: number
}

// Detect iOS for performance optimizations
const isIOS = () => {
  if (typeof window === 'undefined') return false
  return /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
}

export function MatrixRain({ className = '', startDelay = 0 }: MatrixRainProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const dropsRef = useRef<MatrixDrop[]>([])
  const animationFrameRef = useRef<number | undefined>(undefined)
  const [isReady, setIsReady] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mq.matches)
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    if (startDelay === 0) {
      setIsReady(true)
      return
    }
    const timer = setTimeout(() => setIsReady(true), startDelay)
    return () => clearTimeout(timer)
  }, [startDelay])

  useEffect(() => {
    if (!isReady || prefersReducedMotion) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    const iOS = isIOS()
    // iOS: use lower DPR to reduce GPU load
    const dpr = iOS ? 1 : (window.devicePixelRatio || 1)
    const rect = canvas.getBoundingClientRect()

    // Set canvas size with device pixel ratio
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    canvas.style.width = `${rect.width}px`
    canvas.style.height = `${rect.height}px`

    // Initialize drops (columns) - more density on mobile, less on iOS
    const isMobile = rect.width < 768
    const columnWidth = iOS
      ? MATRIX_COLUMN_WIDTH_DESKTOP  // iOS: wider columns = fewer drops
      : (isMobile ? MATRIX_COLUMN_WIDTH_MOBILE : MATRIX_COLUMN_WIDTH_DESKTOP)
    const columns = Math.floor(rect.width / columnWidth)
    const drops: MatrixDrop[] = []

    // Higher density on mobile (80% of columns) vs desktop (57.5% = +15%), lower on iOS
    const dropProbability = iOS ? 0.4 : (isMobile ? 0.8 : 0.575)

    for (let i = 0; i < columns; i++) {
      // Not all columns have drops
      if (Math.random() > dropProbability) continue

      const length = 3 + Math.floor(Math.random() * 6)
      const chars: string[] = []

      for (let j = 0; j < length; j++) {
        chars.push(MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)])
      }

      drops.push({
        x: i * columnWidth + columnWidth / 2,
        y: Math.random() * rect.height * 0.5 - rect.height * 0.5,
        // iOS: faster drops (1.5-3.0) to compensate for lower frame rate feel
        speed: iOS ? (1.5 + Math.random() * 1.5) : (0.6 + Math.random() * 0.8),
        length,
        chars,
        // Higher opacity on mobile/iOS for better visibility, +15% on desktop
        opacity: (iOS || isMobile) ? 0.2 * (0.7 + Math.random() * 0.6) : 0.14 * (0.7 + Math.random() * 0.6),
      })
    }

    dropsRef.current = drops

    let lastFrameTime = 0
    const FRAME_INTERVAL = 1000 / 30 // Cap at 30fps on all devices

    const animate = (timestamp: number) => {
      if (timestamp - lastFrameTime < FRAME_INTERVAL) {
        animationFrameRef.current = requestAnimationFrame(animate)
        return
      }
      lastFrameTime = timestamp

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.save()
      ctx.scale(dpr, dpr)

      ctx.font = `${MATRIX_CHAR_SIZE}px monospace`
      ctx.textAlign = 'center'

      // Draw each drop
      dropsRef.current.forEach((drop) => {
        drop.chars.forEach((char, i) => {
          const charY = drop.y + i * MATRIX_CHAR_SIZE

          if (charY < -MATRIX_CHAR_SIZE || charY > rect.height + MATRIX_CHAR_SIZE) return

          // Fade effect on tail
          const fadePosition = i / drop.chars.length
          const fadeFactor = 1 - fadePosition * 0.7
          const charOpacity = drop.opacity * fadeFactor

          // First character glows (skip shadowBlur on iOS - very expensive)
          if (i === 0) {
            ctx.fillStyle = `rgba(255, 255, 255, ${charOpacity * 1.5})`
            if (!iOS) {
              ctx.shadowBlur = 6
              ctx.shadowColor = 'rgba(255, 255, 255, 0.3)'
            }
          } else {
            ctx.fillStyle = `rgba(255, 255, 255, ${charOpacity})`
            if (!iOS) {
              ctx.shadowBlur = 0
            }
          }

          ctx.fillText(char, drop.x, charY)
        })

        // Update drop position
        drop.y += drop.speed

        // Reset drop if off screen
        if (drop.y - drop.length * MATRIX_CHAR_SIZE > rect.height) {
          drop.y = -drop.length * MATRIX_CHAR_SIZE

          // Randomize characters
          for (let j = 0; j < drop.chars.length; j++) {
            drop.chars[j] = MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)]
          }
        }

        // Occasionally change a character
        if (Math.random() < 0.03) {
          const idx = Math.floor(Math.random() * drop.chars.length)
          drop.chars[idx] = MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)]
        }
      })

      ctx.restore()
      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animationFrameRef.current = requestAnimationFrame(animate as FrameRequestCallback)

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [isReady, prefersReducedMotion])

  if (prefersReducedMotion) {
    return null
  }

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 ${className}`}
      style={{
        width: '100%',
        height: '100%',
        // Force GPU acceleration on iOS
        transform: 'translateZ(0)',
        willChange: 'contents',
      }}
    />
  )
}
