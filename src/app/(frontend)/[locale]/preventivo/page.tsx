import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { QuoteForm } from '@/components/quote'
import { Zap, Shield, Clock, Award } from 'lucide-react'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'quotePage' })

  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
  }
}

export default async function QuotePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'quotePage' })

  const benefits = [
    {
      icon: Zap,
      title: t('benefits.instant.title'),
      description: t('benefits.instant.description'),
    },
    {
      icon: Award,
      title: t('benefits.customized.title'),
      description: t('benefits.customized.description'),
    },
    {
      icon: Shield,
      title: t('benefits.noObligation.title'),
      description: t('benefits.noObligation.description'),
    },
    {
      icon: Clock,
      title: t('benefits.fast.title'),
      description: t('benefits.fast.description'),
    },
  ]

  return (
    <>
      <Header />
      <main className="relative min-h-screen pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-6">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-orange/10 border border-accent-orange/30 mb-6">
              <Zap className="w-4 h-4 text-accent-orange" />
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

          {/* Benefits Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {benefits.map((benefit, index) => (
              <div key={index} className="p-4 rounded-xl border border-border/50 bg-bg-surface/30 backdrop-blur-sm">
                <div className="w-10 h-10 rounded-lg bg-accent-orange/10 flex items-center justify-center mb-3">
                  <benefit.icon className="w-5 h-5 text-accent-orange" />
                </div>
                <h3 className="font-semibold text-text-primary mb-1">
                  {benefit.title}
                </h3>
                <p className="text-sm text-text-muted">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>

          {/* Quote Form */}
          <QuoteForm />
        </div>
      </main>
      <Footer />
    </>
  )
}
