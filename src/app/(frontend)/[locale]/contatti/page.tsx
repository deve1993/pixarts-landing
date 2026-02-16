import { getTranslations, setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { PageHero } from '@/components/sections/PageHero'

const CTAFinal = dynamic(() => import('@/components/sections/CTAFinal').then(m => m.CTAFinal))
const FAQ = dynamic(() => import('@/components/sections/FAQ').then(m => m.FAQ))

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'contattiPage' })

  const baseUrl = 'https://pixarts.eu'
  const path = '/contatti'

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

export default async function ContattiPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations({ locale, namespace: 'contattiPage' })

  return (
    <>
      <Header />
      <main id="main-content">
        <PageHero
          title={t('heroTitle')}
          highlight={t('heroHighlight')}
          subtitle={t('heroSubtitle')}
        />
        <CTAFinal />
        <FAQ />
      </main>
      <Footer />
    </>
  )
}
