'use client'

import { useEffect, useRef } from 'react'

interface MatrixRainProps {
  className?: string
}

const MATRIX_CHARS = ['0', '1']
const MATRIX_CHAR_SIZE = 12
const MATRIX_COLUMN_WIDTH_DESKTOP = 20
const MATRIX_COLUMN_WIDTH_MOBILE = 14

interface MatrixDrop {
  x: number
  y: number
  speed: number
  length: number
  chars: string[]
  opacity: number
}

export function MatrixRain({ className = '' }: MatrixRainProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const dropsRef = useRef<MatrixDrop[]>([])
  const animationFrameRef = useRef<number | undefined>(undefined)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()

    // Set canvas size with device pixel ratio
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    canvas.style.width = `${rect.width}px`
    canvas.style.height = `${rect.height}px`

    // Initialize drops (columns) - more density on mobile
    const isMobile = rect.width < 768
    const columnWidth = isMobile ? MATRIX_COLUMN_WIDTH_MOBILE : MATRIX_COLUMN_WIDTH_DESKTOP
    const columns = Math.floor(rect.width / columnWidth)
    const drops: MatrixDrop[] = []

    // Higher density on mobile (80% of columns) vs desktop (50%)
    const dropProbability = isMobile ? 0.8 : 0.5

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
        speed: 0.6 + Math.random() * 0.8,
        length,
        chars,
        // Higher opacity on mobile for better visibility
        opacity: isMobile ? 0.18 * (0.7 + Math.random() * 0.6) : 0.12 * (0.7 + Math.random() * 0.6),
      })
    }

    dropsRef.current = drops

    // Animation function
    const animate = () => {
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

          // First character glows
          if (i === 0) {
            ctx.fillStyle = `rgba(255, 255, 255, ${charOpacity * 1.5})`
            ctx.shadowBlur = 6
            ctx.shadowColor = 'rgba(255, 255, 255, 0.3)'
          } else {
            ctx.fillStyle = `rgba(255, 255, 255, ${charOpacity})`
            ctx.shadowBlur = 0
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

    animationFrameRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 ${className}`}
      style={{ width: '100%', height: '100%' }}
    />
  )
}
