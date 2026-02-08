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
      <main className="min-h-screen bg-bg-primary pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header Section */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-accent-orange/10 text-accent-orange text-sm font-medium mb-4">
              {t('badge')}
            </div>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-text-primary mb-4">
              {t('title')}
            </h1>
            <p className="text-lg text-text-secondary">
              {t('subtitle')}
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-bg-surface border border-border rounded-xl p-6 flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-accent-orange/10 flex items-center justify-center text-accent-orange mb-4">
                  <benefit.icon className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-semibold text-text-primary mb-2">
                  {benefit.title}
                </h3>
                <p className="text-sm text-text-secondary">
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
