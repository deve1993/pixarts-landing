import { setRequestLocale } from 'next-intl/server'
import dynamic from 'next/dynamic'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

// Above-fold components - loaded immediately
import { Hero, TrustBadges, SocialProof } from '@/components/sections'

// Below-fold components - lazy loaded for better initial performance
const Problems = dynamic(() => import('@/components/sections/Problems').then(m => m.Problems))
const Solution = dynamic(() => import('@/components/sections/Solution').then(m => m.Solution))
const PortfolioShowcase = dynamic(() => import('@/components/portfolio-v2').then(m => m.PortfolioShowcase))
const Process = dynamic(() => import('@/components/sections/Process').then(m => m.Process))
const Capabilities = dynamic(() => import('@/components/sections/Capabilities').then(m => m.Capabilities))
const Guarantee = dynamic(() => import('@/components/sections/Guarantee').then(m => m.Guarantee))
const Pricing = dynamic(() => import('@/components/sections/Pricing').then(m => m.Pricing))
const Testimonials = dynamic(() => import('@/components/sections/Testimonials').then(m => m.Testimonials))
const FAQ = dynamic(() => import('@/components/sections/FAQ').then(m => m.FAQ))
const CTAFinal = dynamic(() => import('@/components/sections/CTAFinal').then(m => m.CTAFinal))

type Props = {
  params: Promise<{ locale: string }>
}

export default async function Home({ params }: Props) {
  const { locale } = await params

  // Enable static rendering
  setRequestLocale(locale)

  return (
    <>
      <Header />
      <main id="main-content">
        <Hero />
        <TrustBadges />
        <SocialProof />
        <Problems />
        <Solution />
        <PortfolioShowcase />
        <Process />
        <Capabilities />
        <Guarantee />
        <Pricing />
        <Testimonials />
        <FAQ />
        <CTAFinal />
      </main>
      <Footer />
    </>
  )
}
