import { PRICING_PLANS, FAQS, SOCIAL_LINKS } from '@/lib/constants'

// Organization Schema
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Pixarts',
  url: 'https://pixarts.eu',
  logo: 'https://pixarts.eu/logo.png',
  description:
    'Siti web professionali in 10 giorni. Design moderno, SEO incluso, garanzia soddisfazione.',
  foundingDate: '2024',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'IT',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    email: 'info@pixarts.eu',
    availableLanguage: ['Italian', 'English'],
  },
  sameAs: SOCIAL_LINKS.map((s) => s.href),
}

// LocalBusiness Schema
const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Pixarts',
  image: 'https://pixarts.eu/og-image.png',
  url: 'https://pixarts.eu',
  telephone: '',
  email: 'info@pixarts.eu',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'IT',
  },
  priceRange: '€€',
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '09:00',
    closes: '18:00',
  },
  areaServed: {
    '@type': 'Country',
    name: 'Italy',
  },
  serviceType: ['Web Design', 'Web Development', 'SEO', 'E-commerce'],
}

// Product/Service Schema for Pricing
const serviceSchemas = PRICING_PLANS.map((plan) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: plan.name,
  description: `${plan.idealFor}. ${plan.features.slice(0, 3).join(', ')}.`,
  provider: {
    '@type': 'Organization',
    name: 'Pixarts',
  },
  areaServed: {
    '@type': 'Country',
    name: 'Italy',
  },
  offers: {
    '@type': 'Offer',
    price: plan.priceRange.match(/€([\d.]+)/)?.[1]?.replace('.', '') || '1200',
    priceCurrency: 'EUR',
    priceValidUntil: new Date(
      new Date().setFullYear(new Date().getFullYear() + 1)
    )
      .toISOString()
      .split('T')[0],
    availability: 'https://schema.org/InStock',
    validFrom: new Date().toISOString().split('T')[0],
  },
}))

// FAQ Schema
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
}

// Website Schema with SearchAction
const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Pixarts',
  url: 'https://pixarts.eu',
  description:
    'Siti web professionali in 10 giorni che portano clienti. Design moderno, consegna rapida, garanzia totale.',
  inLanguage: 'it-IT',
  publisher: {
    '@type': 'Organization',
    name: 'Pixarts',
    logo: {
      '@type': 'ImageObject',
      url: 'https://pixarts.eu/logo.png',
    },
  },
}

// BreadcrumbList Schema
const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://pixarts.eu',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Portfolio',
      item: 'https://pixarts.eu/#portfolio',
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'Servizi',
      item: 'https://pixarts.eu/#pricing',
    },
    {
      '@type': 'ListItem',
      position: 4,
      name: 'Contatti',
      item: 'https://pixarts.eu/#contatti',
    },
  ],
}

export function StructuredData() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {serviceSchemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  )
}
