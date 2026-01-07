'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface MetricCardProps {
  value: string
  label: string
  suffix?: string
  index?: number
}

// Extract numeric value and prefix from string like "+40", "98", "-20%"
function parseValue(value: string): { prefix: string; number: number; isNumeric: boolean } {
  const match = value.match(/^([+-]?)(\d+(?:\.\d+)?)/)
  if (match) {
    return {
      prefix: match[1] || '',
      number: parseFloat(match[2]),
      isNumeric: true
    }
  }
  return { prefix: '', number: 0, isNumeric: false }
}

// Custom hook for count-up animation
function useCountUp(end: number, duration: number = 1500, shouldStart: boolean = false) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!shouldStart) return

    let startTime: number | null = null
    let animationFrame: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)

      // Easing function (ease-out cubic)
      const easeOut = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(easeOut * end))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      } else {
        setCount(end)
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [end, duration, shouldStart])

  return count
}

export function MetricCard({ value, label, suffix, index = 0 }: MetricCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  const { prefix, number, isNumeric } = parseValue(value)
  const animatedValue = useCountUp(number, 1200 + index * 200, isInView && isNumeric)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
      className="p-4 bg-gradient-to-br from-bg-surface/80 to-bg-surface/40 border border-border/50 rounded-xl text-center group hover:border-accent-orange/30 transition-colors"
    >
      {/* Value with count-up */}
      <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent-orange to-accent-amber mb-1">
        {isNumeric ? (
          <>
            {prefix}
            <span className="tabular-nums">{animatedValue}</span>
          </>
        ) : (
          value
        )}
        {suffix && <span className="text-lg">{suffix}</span>}
      </div>

      {/* Label */}
      <div className="text-xs text-text-muted">{label}</div>
    </motion.div>
  )
}
