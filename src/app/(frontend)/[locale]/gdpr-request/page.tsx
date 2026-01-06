import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { GdprRequestForm } from '@/components/forms/GdprRequestForm'
import { Shield, Clock, Lock, FileText } from 'lucide-react'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'gdprRequest' })

  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
  }
}

function GdprRequestContent() {
  const t = useTranslations('gdprRequest')

  const features = [
    {
      icon: Shield,
      titleKey: 'features.secure',
      descKey: 'features.secureDesc',
    },
    {
      icon: Clock,
      titleKey: 'features.response',
      descKey: 'features.responseDesc',
    },
    {
      icon: Lock,
      titleKey: 'features.privacy',
      descKey: 'features.privacyDesc',
    },
    {
      icon: FileText,
      titleKey: 'features.confirmation',
      descKey: 'features.confirmationDesc',
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
              <Shield className="w-4 h-4 text-accent-orange" />
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

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2">
              <GdprRequestForm />
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Info Box */}
              <div className="p-6 rounded-xl border border-border/50 bg-bg-surface/60 backdrop-blur-sm">
                <h3 className="font-heading font-semibold text-text-primary mb-4">
                  {t('sidebar.infoTitle')}
                </h3>
                <div className="space-y-4 text-sm text-text-secondary">
                  <p>{t('sidebar.infoText1')}</p>
                  <p>{t('sidebar.infoText2')}</p>
                </div>
              </div>

              {/* Rights List */}
              <div className="p-6 rounded-xl border border-border/50 bg-bg-surface/60 backdrop-blur-sm">
                <h3 className="font-heading font-semibold text-text-primary mb-4">
                  {t('sidebar.rightsTitle')}
                </h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-accent-orange mt-0.5">Art. 15</span>
                    <span className="text-text-secondary">{t('sidebar.rightAccess')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent-orange mt-0.5">Art. 16</span>
                    <span className="text-text-secondary">{t('sidebar.rightRectification')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent-orange mt-0.5">Art. 17</span>
                    <span className="text-text-secondary">{t('sidebar.rightErasure')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent-orange mt-0.5">Art. 18</span>
                    <span className="text-text-secondary">{t('sidebar.rightRestriction')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent-orange mt-0.5">Art. 20</span>
                    <span className="text-text-secondary">{t('sidebar.rightPortability')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent-orange mt-0.5">Art. 21</span>
                    <span className="text-text-secondary">{t('sidebar.rightObjection')}</span>
                  </li>
                </ul>
              </div>

              {/* Contact Info */}
              <div className="p-6 rounded-xl border border-accent-orange/30 bg-accent-orange/5">
                <h3 className="font-heading font-semibold text-text-primary mb-3">
                  {t('sidebar.contactTitle')}
                </h3>
                <p className="text-sm text-text-secondary mb-3">
                  {t('sidebar.contactText')}
                </p>
                <a
                  href="mailto:bo2@fl1.cz"
                  className="text-accent-orange hover:underline text-sm font-medium"
                >
                  bo2@fl1.cz
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default function GdprRequestPage() {
  return <GdprRequestContent />
}
