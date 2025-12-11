'use client'

import { motion } from 'framer-motion'
import {
  Palette,
  Server,
  Search,
  Bot,
  TrendingUp,
  Layout,
  Settings,
  Cloud,
} from 'lucide-react'

interface ServiceCardProps {
  name: string
  detail: string
  index?: number
}

const serviceIcons: Record<string, typeof Palette> = {
  'Web Design': Palette,
  'Backend': Server,
  'SEO': Search,
  'AI Integration': Bot,
  'CRO': TrendingUp,
  'Frontend': Layout,
  'AI & Automazioni': Bot,
  'DevOps': Cloud,
}

export function ServiceCard({ name, detail, index = 0 }: ServiceCardProps) {
  const Icon = serviceIcons[name] || Settings

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      whileHover={{ scale: 1.02 }}
      className="group relative p-4 bg-bg-surface/60 backdrop-blur-sm border border-border/50 rounded-xl hover:border-accent-orange/30 hover:bg-bg-surface/80 transition-all duration-300"
    >
      {/* Icon */}
      <div className="w-10 h-10 mb-3 bg-gradient-to-br from-accent-orange/20 to-accent-amber/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
        <Icon className="w-5 h-5 text-accent-orange" />
      </div>

      {/* Label */}
      <div className="text-sm font-medium text-text-primary mb-1">{name}</div>

      {/* Detail */}
      <div className="text-xs text-text-muted">{detail}</div>

      {/* Hover glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent-orange/0 to-accent-amber/0 group-hover:from-accent-orange/5 group-hover:to-accent-amber/5 rounded-xl transition-all duration-300 -z-10" />
    </motion.div>
  )
}
