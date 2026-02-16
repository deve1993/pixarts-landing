import { getTranslations, setRequestLocale } from 'next-intl/server'
import dynamic from 'next/dynamic'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { MiniCTA } from '@/components/sections/MiniCTA'

// Above-fold components - loaded immediately
import { Hero, TrustBadges } from '@/components/sections'

// Below-fold components - lazy loaded for better initial performance
const Problems = dynamic(() => import('@/components/sections/Problems').then(m => m.Problems))
const Solution = dynamic(() => import('@/components/sections/Solution').then(m => m.Solution))
const SocialProof = dynamic(() => import('@/components/sections/SocialProof').then(m => m.SocialProof))
const PortfolioShowcase = dynamic(() => import('@/components/portfolio-v2').then(m => m.PortfolioShowcase))
const Testimonials = dynamic(() => import('@/components/sections/Testimonials').then(m => m.Testimonials))

type Props = {
  params: Promise<{ locale: string }>
}

export default async function Home({ params }: Props) {
  const { locale } = await params

  // Enable static rendering
  setRequestLocale(locale)

  const tMid = await getTranslations({ locale, namespace: 'homeMidCta' })
  const t = await getTranslations({ locale, namespace: 'homeCta' })

  return (
    <>
      <Header />
      <main id="main-content">
        <Hero />
        <TrustBadges />
        <Problems />
        <Solution />
        <SocialProof />
        <MiniCTA
          title={tMid('title')}
          subtitle={tMid('subtitle')}
          primaryLabel={tMid('primaryLabel')}
          primaryHref="/contatti"
          secondaryLabel={tMid('secondaryLabel')}
          secondaryHref="/servizi"
        />
        <PortfolioShowcase />
        <Testimonials />
        <MiniCTA
          title={t('title')}
          subtitle={t('subtitle')}
          primaryLabel={t('primaryLabel')}
          primaryHref="/servizi"
          secondaryLabel={t('secondaryLabel')}
          secondaryHref="/contatti"
        />
      </main>
      <Footer />
    </>
  )
}
