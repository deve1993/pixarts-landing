import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { BookingWidget } from '@/components/booking'
import { Calendar, Video, Clock, Sparkles } from 'lucide-react'

// ============================================================================
// PRENOTA PAGE - Booking Page
// ============================================================================

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'booking' })

  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
  }
}

function BookingContent() {
  const t = useTranslations('booking')

  const features = [
    {
      icon: Calendar,
      titleKey: 'features.flexible',
      descKey: 'features.flexibleDesc',
    },
    {
      icon: Video,
      titleKey: 'features.online',
      descKey: 'features.onlineDesc',
    },
    {
      icon: Clock,
      titleKey: 'features.duration',
      descKey: 'features.durationDesc',
    },
    {
      icon: Sparkles,
      titleKey: 'features.free',
      descKey: 'features.freeDesc',
    },
  ]

  return (
    <>
      <Header />
      <main className="relative min-h-screen pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-orange/10 border border-accent-orange/30 mb-6">
              <Calendar className="w-4 h-4 text-accent-orange" />
              <span className="text-sm font-medium text-accent-orange">
                {t('badge')}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-text-primary mb-4">
              {t('title')}
            </h1>
            <p className="text-text-secondary max-w-2xl mx-auto text-lg">
              {t('subtitle')}
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-4 rounded-xl border border-border/50 bg-bg-surface/30 backdrop-blur-sm"
              >
                <div className="w-10 h-10 rounded-lg bg-accent-orange/10 flex items-center justify-center mb-3">
                  <feature.icon className="w-5 h-5 text-accent-orange" />
                </div>
                <h3 className="font-semibold text-text-primary mb-1">
                  {t(feature.titleKey)}
                </h3>
                <p className="text-sm text-text-muted">
                  {t(feature.descKey)}
                </p>
              </div>
            ))}
          </div>

          {/* Booking Widget */}
          <BookingWidget />
        </div>
      </main>
      <Footer />
    </>
  )
}

export default function PrenotaPage() {
  return <BookingContent />
}
