type LocaleKey = 'it' | 'en' | 'cs'

interface AboutStructuredDataProps {
  locale?: string
}

function getLocaleUrl(locale: LocaleKey): string {
  if (locale === 'it') return 'https://pixarts.eu'
  return `https://pixarts.eu/${locale}`
}

export function AboutStructuredData({ locale = 'it' }: AboutStructuredDataProps) {
  const l = locale as LocaleKey
  const siteUrl = getLocaleUrl(l)

  const aboutPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name:
      locale === 'it'
        ? 'Chi Siamo - Pixarts'
        : locale === 'en'
          ? 'About Pixarts'
          : 'O nás - Pixarts',
    url: `${siteUrl}/chi-siamo`,
    description:
      locale === 'it'
        ? "Pixarts è un'agenzia web fondata nel 2024 da FL1 s.r.o. Creiamo siti web professionali in 7-14 giorni con garanzia tripla."
        : locale === 'en'
          ? 'Pixarts is a web agency founded in 2024 by FL1 s.r.o. We create professional websites in 7-14 days with a triple guarantee.'
          : 'Pixarts je webová agentura založená v roce 2024 společností FL1 s.r.o. Vytváříme profesionální weby za 7-14 dní s trojitou zárukou.',
    mainEntity: {
      '@type': 'Organization',
      name: 'Pixarts',
      legalName: 'FL1 s.r.o.',
      url: 'https://pixarts.eu',
      logo: 'https://pixarts.eu/logo-white.png',
      foundingDate: '2024',
      foundingLocation: {
        '@type': 'Place',
        addressCountry: 'CZ',
        addressLocality: 'Praha',
      },
      areaServed: [
        { '@type': 'Country', name: 'Italy' },
        { '@type': 'Country', name: 'Czech Republic' },
      ],
      numberOfEmployees: {
        '@type': 'QuantitativeValue',
        minValue: 2,
        maxValue: 10,
      },
      knowsAbout: [
        'Web Design',
        'Web Development',
        'SEO',
        'Next.js',
        'React',
        'E-commerce',
        'AI Chatbot Integration',
      ],
      slogan:
        locale === 'it'
          ? 'Siti web professionali in 10 giorni'
          : locale === 'en'
            ? 'Professional websites in 10 days'
            : 'Profesionální weby za 10 dní',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }}
    />
  )
}
