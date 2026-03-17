import { getTranslations, setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { MiniCTA } from '@/components/sections/MiniCTA'
import { PageHero } from '@/components/sections/PageHero'
import { AboutStructuredData } from '@/components/AboutStructuredData'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'chiSiamo' })

  const baseUrl = 'https://pixarts.eu'
  const path = '/chi-siamo'

  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: {
      canonical: locale === 'it' ? `${baseUrl}${path}` : `${baseUrl}/${locale}${path}`,
      languages: {
        it: `${baseUrl}${path}`,
        en: `${baseUrl}/en${path}`,
        cs: `${baseUrl}/cs${path}`,
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
      images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    },
  }
}

const TECH_STACK = [
  { name: 'Next.js 15', category: 'Framework' },
  { name: 'React 19', category: 'UI' },
  { name: 'TypeScript', category: 'Language' },
  { name: 'Tailwind CSS', category: 'Styling' },
  { name: 'Payload CMS', category: 'CMS' },
  { name: 'Coolify', category: 'Deployment' },
]

export default async function ChiSiamo({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations({ locale, namespace: 'chiSiamo' })

  const stats = [
    { value: t('stat1Value'), label: t('stat1Label') },
    { value: t('stat2Value'), label: t('stat2Label') },
    { value: t('stat3Value'), label: t('stat3Label') },
    { value: t('stat4Value'), label: t('stat4Label') },
  ]

  const whyItems = [
    { title: t('why1Title'), text: t('why1Text') },
    { title: t('why2Title'), text: t('why2Text') },
    { title: t('why3Title'), text: t('why3Text') },
    { title: t('why4Title'), text: t('why4Text') },
  ]

  const valueItems = [
    { title: t('value1Title'), text: t('value1Text') },
    { title: t('value2Title'), text: t('value2Text') },
    { title: t('value3Title'), text: t('value3Text') },
  ]

  return (
    <>
      <Header />
      <main id="main-content">
        <AboutStructuredData locale={locale} />

        <PageHero
          title={t('heroTitle')}
          highlight={t('heroHighlight')}
          subtitle={t('heroSubtitle')}
        />

        <section className="py-16 md:py-24">
          <div className="container mx-auto max-w-4xl px-4">
            <div className="grid gap-12 md:grid-cols-2">
              <div>
                <h2 className="mb-4 text-2xl font-bold text-white md:text-3xl">
                  {t('missionTitle')}
                </h2>
                <p className="text-lg leading-relaxed text-gray-300">{t('missionText')}</p>
              </div>
              <div>
                <h2 className="mb-4 text-2xl font-bold text-white md:text-3xl">
                  {t('storyTitle')}
                </h2>
                <p className="leading-relaxed text-gray-300">{t('storyText')}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-white/10 bg-white/5 py-12">
          <div className="container mx-auto max-w-5xl px-4">
            <h2 className="mb-10 text-center text-2xl font-bold text-white">{t('statsTitle')}</h2>
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-4xl font-bold text-orange-400 md:text-5xl">{stat.value}</div>
                  <div className="mt-2 text-sm text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container mx-auto max-w-5xl px-4">
            <h2 className="mb-12 text-center text-3xl font-bold text-white">{t('whyTitle')}</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {whyItems.map((item) => (
                <div
                  key={item.title}
                  className="rounded-xl border border-white/10 bg-white/5 p-6 transition-colors hover:bg-white/10"
                >
                  <h3 className="mb-3 text-lg font-semibold text-white">{item.title}</h3>
                  <p className="text-gray-400">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-white/10 py-16 md:py-20">
          <div className="container mx-auto max-w-5xl px-4">
            <h2 className="mb-12 text-center text-3xl font-bold text-white">{t('valuesTitle')}</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {valueItems.map((item) => (
                <div key={item.title} className="text-center">
                  <h3 className="mb-3 text-xl font-bold text-orange-400">{item.title}</h3>
                  <p className="text-gray-400">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-white/10 bg-white/5 py-16">
          <div className="container mx-auto max-w-4xl px-4 text-center">
            <h2 className="mb-4 text-2xl font-bold text-white">{t('techTitle')}</h2>
            <p className="mb-10 text-gray-400">{t('techText')}</p>
            <div className="flex flex-wrap justify-center gap-3">
              {TECH_STACK.map((tech) => (
                <span
                  key={tech.name}
                  className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white"
                >
                  {tech.name}
                  <span className="ml-2 text-xs text-gray-500">{tech.category}</span>
                </span>
              ))}
            </div>
          </div>
        </section>

        <MiniCTA
          title={t('ctaTitle')}
          subtitle={t('ctaSubtitle')}
          primaryLabel={t('ctaPrimary')}
          primaryHref="/prenota"
          secondaryLabel={t('ctaSecondary')}
          secondaryHref="/portfolio"
        />
      </main>
      <Footer />
    </>
  )
}
