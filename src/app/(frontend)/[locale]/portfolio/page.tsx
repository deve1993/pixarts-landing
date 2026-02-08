import { getTranslations, setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { PortfolioPage } from '@/components/portfolio-page'

// ============================================================================
// PORTFOLIO PAGE - Projects Showcase
// ============================================================================

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'portfolioPage' })

  const baseUrl = 'https://pixarts.eu'
  const path = '/portfolio'

  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: {
      canonical: locale === 'it' ? `${baseUrl}${path}` : `${baseUrl}/${locale}${path}`,
      languages: {
        'it': `${baseUrl}${path}`,
        'en': `${baseUrl}/en${path}`,
        'cs': `${baseUrl}/cs${path}`,
        'x-default': `${baseUrl}${path}`,
      },
    },
    openGraph: {
      title: t('metaTitle'),
      description: t('metaDescription'),
      url: locale === 'it' ? `${baseUrl}${path}` : `${baseUrl}/${locale}${path}`,
      siteName: 'Pixarts',
      locale: locale,
      type: 'website',
    },
  }
}

export default async function Portfolio({ params }: Props) {
  const { locale } = await params

  // Enable static rendering
  setRequestLocale(locale)

  return (
    <>
      <Header />
      <main id="main-content">
        <PortfolioPage />
      </main>
      <Footer />
    </>
  )
}
