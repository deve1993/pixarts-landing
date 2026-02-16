import { getTranslations, setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { PageHero } from '@/components/sections/PageHero'
import { MiniCTA } from '@/components/sections/MiniCTA'

const Capabilities = dynamic(() => import('@/components/sections/Capabilities').then(m => m.Capabilities))
const Process = dynamic(() => import('@/components/sections/Process').then(m => m.Process))
const Pricing = dynamic(() => import('@/components/sections/Pricing').then(m => m.Pricing))
const Guarantee = dynamic(() => import('@/components/sections/Guarantee').then(m => m.Guarantee))

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'serviziPage' })

  const baseUrl = 'https://pixarts.eu'
  const path = '/servizi'

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

export default async function ServiziPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations({ locale, namespace: 'serviziPage' })

  return (
    <>
      <Header />
      <main id="main-content">
        <PageHero
          title={t('heroTitle')}
          highlight={t('heroHighlight')}
          subtitle={t('heroSubtitle')}
        />
        <Capabilities />
        <Process />
        <Pricing />
        <Guarantee />
        <MiniCTA
          title={t('ctaTitle')}
          subtitle={t('ctaSubtitle')}
          primaryLabel={t('ctaPrimary')}
          primaryHref="/contatti"
          secondaryLabel={t('ctaSecondary')}
          secondaryHref="/portfolio"
        />
      </main>
      <Footer />
    </>
  )
}
