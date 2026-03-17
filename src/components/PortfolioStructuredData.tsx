import { PORTFOLIO_PROJECTS_V2 } from '@/lib/constants'

interface PortfolioStructuredDataProps {
  locale?: string
}

function getLocaleUrl(locale: string): string {
  if (locale === 'it') return 'https://pixarts.eu'
  return `https://pixarts.eu/${locale}`
}

export function PortfolioStructuredData({ locale = 'it' }: PortfolioStructuredDataProps) {
  const siteUrl = getLocaleUrl(locale)
  const portfolioUrl = `${siteUrl}/portfolio`

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name:
      locale === 'it'
        ? 'Portfolio Pixarts — Progetti Completati'
        : locale === 'en'
          ? 'Pixarts Portfolio — Completed Projects'
          : 'Portfolio Pixarts — Dokončené projekty',
    description:
      locale === 'it'
        ? 'Siti web e applicazioni create da Pixarts per clienti in Italia e Repubblica Ceca.'
        : locale === 'en'
          ? 'Websites and applications created by Pixarts for clients in Italy and Czech Republic.'
          : 'Webové stránky a aplikace vytvořené Pixarts pro klienty v Itálii a České republice.',
    url: portfolioUrl,
    numberOfItems: PORTFOLIO_PROJECTS_V2.length,
    itemListElement: PORTFOLIO_PROJECTS_V2.map((project, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'CreativeWork',
        '@id': `${portfolioUrl}#${project.id}`,
        name: `${project.client} — ${project.subtitle}`,
        description: project.description,
        creator: {
          '@type': 'Organization',
          name: 'Pixarts',
          url: 'https://pixarts.eu',
        },
        image: project.images[0]
          ? `https://pixarts.eu${project.images[0]}`
          : 'https://pixarts.eu/og-image.png',
        keywords: project.technologies.join(', '),
        about: project.services.map((s) => s.name).join(', '),
        result: project.results.map((r) => `${r.value}${r.suffix ?? ''} ${r.label}`).join('; '),
      },
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
    />
  )
}
