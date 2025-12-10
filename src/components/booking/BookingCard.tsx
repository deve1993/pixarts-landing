'use client'

import { Calendar, Clock, Video, ArrowRight } from 'lucide-react'
import { Link } from '@/i18n/routing'
import { Button } from '@/components/ui/button'

// ============================================================================
// BOOKING CARD - Compact Booking CTA for Homepage
// ============================================================================

interface BookingCardProps {
  labels: {
    title: string
    subtitle: string
    features: {
      duration: string
      online: string
      free: string
    }
    cta: string
  }
}

export function BookingCard({ labels }: BookingCardProps) {
  return (
    <div className="flex flex-col h-full p-8 rounded-2xl border border-accent-orange/30 bg-gradient-to-br from-accent-orange/10 to-transparent backdrop-blur-sm">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-accent-orange/20 flex items-center justify-center">
          <Calendar className="w-6 h-6 text-accent-orange" />
        </div>
        <div>
          <h3 className="text-xl font-heading font-bold text-text-primary">
            {labels.title}
          </h3>
          <p className="text-sm text-text-muted">{labels.subtitle}</p>
        </div>
      </div>

      {/* Features */}
      <div className="flex-grow space-y-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-bg-elevated flex items-center justify-center">
            <Clock className="w-4 h-4 text-accent-orange" />
          </div>
          <span className="text-text-secondary">{labels.features.duration}</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-bg-elevated flex items-center justify-center">
            <Video className="w-4 h-4 text-accent-orange" />
          </div>
          <span className="text-text-secondary">{labels.features.online}</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-bg-elevated flex items-center justify-center">
            <span className="text-accent-orange font-bold text-sm">€0</span>
          </div>
          <span className="text-text-secondary">{labels.features.free}</span>
        </div>
      </div>

      {/* Visual Separator */}
      <div className="relative py-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border/50" />
        </div>
        <div className="relative flex justify-center">
          <span className="px-4 bg-transparent text-text-muted text-sm">
            oppure
          </span>
        </div>
      </div>

      {/* CTA Button */}
      <Link href="/prenota" className="block">
        <Button size="lg" className="w-full group">
          {labels.cta}
          <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Button>
      </Link>

      {/* Trust Badge */}
      <p className="text-center text-xs text-text-muted mt-4">
        Senza impegno • Risposta in 24h
      </p>
    </div>
  )
}
