import { setRequestLocale } from 'next-intl/server'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import {
  Hero,
  TrustBadges,
  SocialProof,
  Problems,
  Solution,
  HeroParallax,
  Process,
  Benefits,
  Guarantee,
  Pricing,
  Testimonials,
  FAQ,
  CTAFinal,
} from '@/components/sections'

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
        <HeroParallax />
        <Process />
        <Benefits />
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
