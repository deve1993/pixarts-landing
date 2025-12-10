'use client'

import { motion } from 'framer-motion'
import { Check, ArrowRight, Clock } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Section, SectionHeader } from '@/components/ui/section'
import { Button } from '@/components/ui/button'
import { scrollToElement } from '@/lib/utils'
import { staggerContainer, staggerItem } from '@/lib/motion-variants'
import { useEffect, useRef, useState, useCallback } from 'react'

const PLAN_KEYS = ['plan1', 'plan2', 'plan3'] as const

// ============================================================================
// MATRIX RAIN MINI - Effetto Matrix per le card
// ============================================================================

// Detect iOS for performance optimizations
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
        speed: 0.6 + Math.random() * 0.8,
        length,
        chars,
        opacity: 0.12 * (0.7 + Math.random() * 0.6),
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

        // Skip shadowBlur on iOS - very expensive
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
      // Clear canvas when not hovered
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
  }, [canvasRef, isHovered, initDrops, updateDrops, draw])
}

// ============================================================================
// PRICING CARD COMPONENT
// ============================================================================

interface PricingCardProps {
  plan: {
    key: string
    name: string
    badge: string
    price: string
    duration: string
    idealFor: string
    features: string[]
  }
  t: ReturnType<typeof useTranslations>
}

function PricingCard({ plan, t }: PricingCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useCardMatrixRain(canvasRef, isHovered)

  return (
    <motion.div
      variants={staggerItem}
      whileHover={{ y: -4 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative group rounded-2xl border p-5 md:p-8 transition-all duration-300 backdrop-blur-sm overflow-hidden h-full ${
        isHovered
          ? 'border-accent-orange bg-gradient-to-b from-accent-orange/10 to-bg-surface/80 shadow-lg shadow-accent-orange/10'
          : 'border-border/50 bg-bg-surface/60'
      }`}
    >
      {/* Matrix Rain Canvas - Solo visibile al hover */}
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 pointer-events-none transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ width: '100%', height: '100%' }}
      />

      {/* Content wrapper con z-index per stare sopra il canvas */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Badge */}
        <span className={`inline-flex px-2.5 py-0.5 rounded-full text-[11px] mb-4 w-fit transition-colors duration-300 ${
          isHovered
            ? 'bg-accent-orange text-white'
            : 'bg-bg-elevated text-text-muted'
        }`}>
          {plan.badge}
        </span>

        {/* Plan Name */}
        <h3 className="text-2xl font-heading font-bold text-text-primary mt-2 mb-2">
          {plan.name}
        </h3>

        {/* Price */}
        <div className="mb-4">
          <span className="text-3xl font-heading font-bold gradient-text">
            {plan.price}
          </span>
        </div>

        {/* Duration */}
        <div className="flex items-center gap-2 text-sm text-text-secondary mb-4">
          <Clock className="w-4 h-4" />
          <span>{t('deliveryIn')} {plan.duration}</span>
        </div>

        {/* Ideal For */}
        <p className="text-sm text-text-muted mb-6 pb-6 border-b border-border">
          {t('idealFor')} {plan.idealFor}
        </p>

        {/* Features */}
        <ul className="space-y-3 mb-8 flex-grow">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-start gap-3 text-sm">
              <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
              <span className="text-text-secondary">{feature}</span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <Button
          variant={isHovered ? 'default' : 'secondary'}
          className="w-full group/btn"
          onClick={() => scrollToElement('contatti')}
        >
          {t('cta')}
          <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
        </Button>
      </div>
    </motion.div>
  )
}

// ============================================================================
// MAIN PRICING COMPONENT
// ============================================================================

export function Pricing() {
  const t = useTranslations('pricing')

  const plans = PLAN_KEYS.map((planKey) => ({
    key: planKey,
    name: t(`${planKey}.name`),
    badge: t(`${planKey}.badge`),
    price: t(`${planKey}.price`),
    duration: t(`${planKey}.duration`),
    idealFor: t(`${planKey}.idealFor`),
    features: t.raw(`${planKey}.features`) as string[],
  }))

  return (
    <Section id="pricing">
      <SectionHeader
        title={t('title')}
        description={t('description')}
      />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={staggerContainer}
        className="grid md:grid-cols-3 gap-6"
      >
        {plans.map((plan) => (
          <PricingCard key={plan.key} plan={plan} t={t} />
        ))}
      </motion.div>

      {/* Maintenance Note */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className="mt-12 text-center"
      >
        <div className="inline-flex flex-col sm:flex-row items-center gap-4 px-6 py-4 rounded-xl bg-bg-surface/60 backdrop-blur-sm border border-border/50">
          <div className="text-left">
            <span className="text-text-primary font-semibold">
              {t('maintenance')}
            </span>
            <span className="text-text-secondary ml-2">{t('maintenancePrice')}</span>
          </div>
          <span className="text-text-muted text-sm">
            {t('maintenanceDesc')}
          </span>
        </div>
      </motion.div>
    </Section>
  )
}
