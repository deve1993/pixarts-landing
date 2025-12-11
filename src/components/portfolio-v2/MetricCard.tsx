'use client'

import { motion } from 'framer-motion'

interface MetricCardProps {
  value: string
  label: string
  suffix?: string
  index?: number
}

export function MetricCard({ value, label, suffix, index = 0 }: MetricCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
      className="p-4 bg-gradient-to-br from-bg-surface/80 to-bg-surface/40 border border-border/50 rounded-xl text-center"
    >
      {/* Value */}
      <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent-orange to-accent-amber mb-1">
        {value}
        {suffix && <span className="text-lg">{suffix}</span>}
      </div>

      {/* Label */}
      <div className="text-xs text-text-muted">{label}</div>
    </motion.div>
  )
}
