'use client'

import { motion } from 'framer-motion'
import { Check, ArrowRight, Clock, Zap, Plug } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Section, SectionHeader } from '@/components/ui/section'
import { Button } from '@/components/ui/button'
import { scrollToElement } from '@/lib/utils'
import { staggerContainer, staggerItem } from '@/lib/motion-variants'
import { useRef, useState, useCallback, useEffect } from 'react'
import { ADDONS } from '@/lib/constants'

const PLAN_KEYS = ['plan1', 'plan2', 'plan3'] as const
const PLAN_INTEGRATIONS = {
  plan1: ['Google Analytics 4', 'Meta Pixel', 'Google Search Console', 'Cookie Consent GDPR'],
  plan2: ['Google Analytics 4 (eventi)', 'Meta Pixel', 'Google Search Console', 'Cookie Consent GDPR', 'Google Maps', 'Mailchimp/Brevo base'],
  plan3: ['Google Analytics 4 (e-commerce)', 'Meta Pixel + Conversions API', 'Google Search Console', 'Cookie Consent GDPR', 'Google Maps', 'Mailchimp/Brevo base', 'Stripe Checkout', 'Calendly/Cal.com (booking)'],
}

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
        // iOS: faster drops (1.5-3.0) to feel responsive
        speed: iOS ? (1.5 + Math.random() * 1.5) : (0.6 + Math.random() * 0.8),
        length,
        chars,
        // iOS: higher opacity for visibility
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
    integrations: string[]
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
        <ul className="space-y-3 mb-6">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-start gap-3 text-sm">
              <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
              <span className="text-text-secondary">{feature}</span>
            </li>
          ))}
        </ul>

        {/* Integrations */}
        <div className="mb-8 flex-grow">
          <div className="flex items-center gap-2 mb-3">
            <Plug className="w-4 h-4 text-accent-orange" />
            <span className="text-sm font-medium text-text-primary">{t('integrationsIncluded')}</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {plan.integrations.map((integration, index) => (
              <span
                key={index}
                className="px-2 py-0.5 text-[10px] rounded-full bg-bg-elevated/80 text-text-muted border border-border/30"
              >
                {integration}
              </span>
            ))}
          </div>
        </div>

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
// ADD-ONS SECTION - BENTO GRID 2+3
// ============================================================================

// Componente singola card Add-on con effetto Matrix
interface AddonCardProps {
  addon: typeof ADDONS[0]
  t: ReturnType<typeof useTranslations>
  size: 'large' | 'medium'
  featured?: boolean
}

function AddonCard({ addon, t, size, featured }: AddonCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const Icon = addon.icon

  useCardMatrixRain(canvasRef, isHovered)

  if (size === 'large') {
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`p-6 md:p-8 rounded-2xl border backdrop-blur-sm group relative overflow-hidden ${
          featured
            ? 'border-accent-orange/30 bg-gradient-to-br from-accent-orange/10 via-bg-surface/80 to-bg-surface/60'
            : 'border-border/50 bg-bg-surface/60 hover:border-accent-orange/30 transition-all'
        }`}
      >
        {/* Canvas per effetto Matrix */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none z-0"
          style={{ opacity: isHovered ? 1 : 0, transition: 'opacity 0.3s' }}
        />
        {/* Gradient blob decorativo */}
        {featured ? (
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-accent-orange/20 rounded-full blur-3xl group-hover:bg-accent-orange/30 transition-all" />
        ) : (
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-accent-orange/10 rounded-full blur-3xl group-hover:bg-accent-orange/20 transition-all" />
        )}

        <div className="relative z-10 h-full flex flex-col min-h-[180px]">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors ${
            featured
              ? 'bg-accent-orange/20 group-hover:bg-accent-orange/30'
              : 'bg-accent-orange/10 group-hover:bg-accent-orange/20'
          }`}>
            <Icon className="w-6 h-6 text-accent-orange" />
          </div>
          <h4 className="text-xl md:text-2xl font-heading font-bold text-text-primary mb-3">
            {t(`${addon.id}.name`)}
          </h4>
          <p className="text-sm text-text-secondary">
            {t(`${addon.id}.description`)}
          </p>
        </div>
      </motion.div>
    )
  }

  // Card media
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="p-5 rounded-2xl border border-border/50 bg-bg-surface/60 backdrop-blur-sm group hover:border-accent-orange/30 transition-all relative overflow-hidden"
    >
      {/* Canvas per effetto Matrix */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
        style={{ opacity: isHovered ? 1 : 0, transition: 'opacity 0.3s' }}
      />

      <div className="relative z-10 h-full flex flex-col">
        <div className="w-10 h-10 rounded-lg bg-accent-orange/10 flex items-center justify-center mb-3 group-hover:bg-accent-orange/20 transition-colors">
          <Icon className="w-5 h-5 text-accent-orange" />
        </div>
        <h4 className="font-semibold text-text-primary mb-2">
          {t(`${addon.id}.name`)}
        </h4>
        <p className="text-xs text-text-muted">
          {t(`${addon.id}.description`)}
        </p>
      </div>
    </motion.div>
  )
}

function AddonsSection() {
  const t = useTranslations('addons')
  const coreAddons = ADDONS.filter(a => a.tier === 'core')

  // Layout 2+3: Prima riga 2 card grandi, seconda riga 3 card medie
  const addon1 = coreAddons[0] // Chatbot AI
  const addon2 = coreAddons[1] // CRM Avanzato
  const addon3 = coreAddons[2] // Automazioni Zapier/Make
  const addon4 = coreAddons[3] // WhatsApp Business
  const addon5 = coreAddons[4] // Email Marketing

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mt-20"
    >
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-orange/10 text-accent-orange text-sm mb-4">
          <Zap className="w-4 h-4" />
          {t('tiers.core')}
        </div>
        <h3 className="text-2xl md:text-3xl font-heading font-bold text-text-primary mb-3">
          {t('title')}
        </h3>
        <p className="text-text-secondary max-w-2xl mx-auto">
          {t('description')}
        </p>
      </div>

      {/* Riga 1: 2 Card Grandi */}
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        {addon1 && <AddonCard addon={addon1} t={t} size="large" featured />}
        {addon2 && <AddonCard addon={addon2} t={t} size="large" />}
      </div>

      {/* Riga 2: 3 Card Medie */}
      <div className="grid md:grid-cols-3 gap-4">
        {addon3 && <AddonCard addon={addon3} t={t} size="medium" />}
        {addon4 && <AddonCard addon={addon4} t={t} size="medium" />}
        {addon5 && <AddonCard addon={addon5} t={t} size="medium" />}
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-8 text-center"
      >
        <p className="text-text-muted text-sm">
          {t('advancedNote')}
        </p>
      </motion.div>
    </motion.div>
  )
}

// ============================================================================
// MAIN PRICING COMPONENT
// ============================================================================

export function Pricing() {
  const t = useTranslations('pricing')

  // Use translations for plans
  const plans = PLAN_KEYS.map((planKey) => ({
    key: planKey,
    name: t(`${planKey}.name`),
    badge: t(`${planKey}.badge`),
    price: t(`${planKey}.price`),
    duration: t(`${planKey}.duration`),
    idealFor: t(`${planKey}.idealFor`),
    features: t.raw(`${planKey}.features`) as string[],
    integrations: PLAN_INTEGRATIONS[planKey],
  }))

  return (
    <Section id="pricing">
      <SectionHeader
        title={t('title')}
        description={t('description')}
      />

      {/* Main Pricing Plans */}
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

      {/* Add-ons Section */}
      <AddonsSection />
    </Section>
  )
}
