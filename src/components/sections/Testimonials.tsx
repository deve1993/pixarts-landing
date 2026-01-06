'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Star, Quote, BadgeCheck } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Section, SectionHeader } from '@/components/ui/section'

const TESTIMONIAL_KEYS = ['testimonial1', 'testimonial2', 'testimonial3'] as const

// Normalized testimonial type used by the component
interface NormalizedTestimonial {
  id: string
  name: string
  role: string
  company: string
  text: string
  rating: number
}

// ============================================================================
// MATRIX RAIN MINI - Stesso effetto usato in Pricing.tsx
// ============================================================================

const isIOS = () => {
  if (typeof window === 'undefined') return false
  return /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
}

const MATRIX_CHARS = ['0', '1']
const MATRIX_CHAR_SIZE = 12
const MATRIX_COLUMN_WIDTH = 20

interface MatrixDrop {
  x: number
  y: number
  speed: number
  length: number
  chars: string[]
  opacity: number
}

function useCardMatrixRain(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  isHovered: boolean
) {
  const dropsRef = useRef<MatrixDrop[]>([])
  const animationFrameRef = useRef<number | undefined>(undefined)

  const initDrops = useCallback((width: number, height: number) => {
    const iOS = isIOS()
    const columns = Math.floor(width / MATRIX_COLUMN_WIDTH)
    const drops: MatrixDrop[] = []

    for (let i = 0; i < columns; i++) {
      if (Math.random() > 0.5) continue

      const length = 3 + Math.floor(Math.random() * 6)
      const chars: string[] = []
      for (let j = 0; j < length; j++) {
        chars.push(MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)])
      }

      drops.push({
        x: i * MATRIX_COLUMN_WIDTH + MATRIX_COLUMN_WIDTH / 2,
        y: Math.random() * height * 0.5 - height * 0.5,
        speed: iOS ? (1.5 + Math.random() * 1.5) : (0.6 + Math.random() * 0.8),
        length,
        chars,
        opacity: iOS ? 0.18 * (0.7 + Math.random() * 0.6) : 0.12 * (0.7 + Math.random() * 0.6),
      })
    }
    dropsRef.current = drops
  }, [])

  const updateDrops = useCallback((height: number) => {
    dropsRef.current.forEach((drop) => {
      drop.y += drop.speed

      if (drop.y - drop.length * MATRIX_CHAR_SIZE > height) {
        drop.y = -drop.length * MATRIX_CHAR_SIZE
        for (let j = 0; j < drop.chars.length; j++) {
          drop.chars[j] = MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)]
        }
      }

      if (Math.random() < 0.03) {
        const idx = Math.floor(Math.random() * drop.chars.length)
        drop.chars[idx] = MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)]
      }
    })
  }, [])

  const draw = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number, dpr: number) => {
    const iOS = isIOS()
    ctx.clearRect(0, 0, width * dpr, height * dpr)
    ctx.save()
    ctx.scale(dpr, dpr)

    ctx.font = `${MATRIX_CHAR_SIZE}px monospace`
    ctx.textAlign = 'center'

    dropsRef.current.forEach((drop) => {
      drop.chars.forEach((char, i) => {
        const charY = drop.y + i * MATRIX_CHAR_SIZE

        if (charY < -MATRIX_CHAR_SIZE || charY > height + MATRIX_CHAR_SIZE) return

        const fadePosition = i / drop.chars.length
        const fadeFactor = 1 - fadePosition * 0.7
        const charOpacity = drop.opacity * fadeFactor

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
    })

    ctx.restore()
  }, [])

  useEffect(() => {
    if (!isHovered) {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
        animationFrameRef.current = undefined
      }
      const canvas = canvasRef.current
      if (canvas) {
        const ctx = canvas.getContext('2d')
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height)
        }
      }
      return
    }

    const canvas = canvasRef.current
    if (!canvas) return

    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    canvas.style.width = `${rect.width}px`
    canvas.style.height = `${rect.height}px`
    initDrops(rect.width, rect.height)

    const animate = () => {
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      updateDrops(rect.height)
      draw(ctx, rect.width, rect.height, dpr)

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animationFrameRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [isHovered, canvasRef, initDrops, updateDrops, draw])
}

// ============================================================================
// TESTIMONIAL CARD
// ============================================================================

interface TestimonialCardProps {
  testimonial: NormalizedTestimonial
  t: ReturnType<typeof useTranslations>
}

function TestimonialCard({ testimonial, t }: TestimonialCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useCardMatrixRain(canvasRef, isHovered)

  const initials = testimonial.name.split(' ').map(n => n[0]).join('')

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="flex-shrink-0 w-[350px] md:w-[400px] mx-3 group"
    >
      <div className="relative bg-bg-surface/60 backdrop-blur-sm border border-border/50 rounded-2xl p-6 h-full overflow-hidden hover:border-accent-orange/30 transition-all duration-300">
        {/* Canvas Matrix Effect */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none z-0"
          style={{ opacity: isHovered ? 1 : 0, transition: 'opacity 0.3s' }}
        />

        {/* Quote Icon decorativo */}
        <div className="absolute -top-2 -left-2 opacity-5 group-hover:opacity-10 transition-opacity" aria-hidden="true">
          <Quote className="w-16 h-16 text-accent-orange" />
        </div>

        <div className="relative z-10">
          {/* Header: Stars + Verified */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex gap-0.5" aria-label={t('rating')}>
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star
                  key={i}
                  className="w-4 h-4 fill-accent-orange text-accent-orange"
                  aria-hidden="true"
                />
              ))}
            </div>
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-success/10 border border-success/20">
              <BadgeCheck className="w-3 h-3 text-success" />
              <span className="text-[10px] font-medium text-success">{t('verified')}</span>
            </div>
          </div>

          {/* Quote Text */}
          <blockquote className="text-sm md:text-base text-text-primary leading-relaxed mb-5 min-h-[80px]">
            <p>&ldquo;{testimonial.text}&rdquo;</p>
          </blockquote>

          {/* Author */}
          <footer className="flex items-center gap-3 pt-4 border-t border-border/30">
            {/* Avatar */}
            <div
              className="w-10 h-10 rounded-full bg-gradient-to-br from-accent-orange to-accent-amber flex items-center justify-center flex-shrink-0"
              aria-hidden="true"
            >
              <span className="text-white font-bold text-sm">
                {initials}
              </span>
            </div>

            <cite className="not-italic">
              <div className="font-semibold text-text-primary text-sm">
                {testimonial.name}
              </div>
              <div className="text-xs text-text-muted">
                {testimonial.role}, {testimonial.company}
              </div>
            </cite>
          </footer>
        </div>
      </div>
    </div>
  )
}

// ============================================================================
// MARQUEE COMPONENT
// ============================================================================

interface MarqueeProps {
  children: React.ReactNode
  direction?: 'left' | 'right'
  speed?: number
  pauseOnHover?: boolean
  className?: string
}

function Marquee({
  children,
  direction = 'left',
  speed = 30,
  pauseOnHover = true,
  className = ''
}: MarqueeProps) {
  const [isPaused, setIsPaused] = useState(false)

  return (
    <div
      className={`overflow-hidden ${className}`}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
    >
      <div
        className="flex"
        style={{
          animation: `marquee-${direction} ${speed}s linear infinite`,
          animationPlayState: isPaused ? 'paused' : 'running',
        }}
      >
        {/* Original content */}
        {children}
        {/* Duplicated content for seamless loop */}
        {children}
      </div>

      <style jsx>{`
        @keyframes marquee-left {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        @keyframes marquee-right {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0%);
          }
        }
      `}</style>
    </div>
  )
}

// ============================================================================
// MAIN TESTIMONIALS COMPONENT
// ============================================================================

export function Testimonials() {
  const t = useTranslations('testimonials')

  // Use translations for testimonials
  const testimonialItems: NormalizedTestimonial[] = TESTIMONIAL_KEYS.map(key => ({
    id: `testimonial-${key}`,
    name: t(`${key}.name`),
    role: t(`${key}.role`),
    company: t(`${key}.company`),
    text: t(`${key}.text`),
    rating: 5,
  }))

  return (
    <Section id="testimonianze" className="overflow-hidden">
      <SectionHeader
        title={t('title')}
        description={t('description')}
      />

      {/* Gradient Fades */}
      <div className="relative">
        {/* Left fade */}
        <div className="absolute left-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-r from-bg-primary to-transparent z-10 pointer-events-none" />
        {/* Right fade */}
        <div className="absolute right-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-l from-bg-primary to-transparent z-10 pointer-events-none" />

        {/* Marquee */}
        <Marquee speed={40} pauseOnHover={true}>
          {testimonialItems.map((item) => (
            <TestimonialCard key={item.id} testimonial={item} t={t} />
          ))}
        </Marquee>
      </div>

      {/* Footer hint */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center text-text-muted text-xs mt-6"
      >
        {t('hoverHint')}
      </motion.p>
    </Section>
  )
}
