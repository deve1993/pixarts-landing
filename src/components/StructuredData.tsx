import { SOCIAL_LINKS } from '@/lib/constants'

type LocaleKey = 'it' | 'en' | 'cs'

const localeContent = {
  it: {
    description: 'Siti web professionali in 10 giorni. Design moderno, SEO incluso, garanzia soddisfazione.',
    websiteDescription: 'Siti web professionali in 10 giorni che portano clienti. Design moderno, consegna rapida, garanzia totale.',
    inLanguage: 'it-IT',
    breadcrumbs: [
      { name: 'Home', item: 'https://pixarts.eu' },
      { name: 'Portfolio', item: 'https://pixarts.eu/#portfolio' },
      { name: 'Servizi', item: 'https://pixarts.eu/#pricing' },
      { name: 'Contatti', item: 'https://pixarts.eu/#contatti' },
    ],
    faqs: [
      { question: 'Quanto tempo ci vuole davvero?', answer: '7-14 giorni lavorativi a seconda della complessità. Landing page 7 giorni, sito aziendale 10 giorni, e-commerce 14 giorni. Con garanzia scritta: sconto 10% per ogni giorno di ritardo.' },
      { question: 'Cosa succede se non mi piace il risultato?', answer: 'Hai 2 round di revisioni incluse nel prezzo. Se comunque non sei soddisfatto, rimborso completo al 100% entro 7 giorni dal lancio. Zero rischi.' },
      { question: 'Posso aggiornare il sito da solo dopo?', answer: 'Assolutamente sì. Usiamo CMS intuitivi. Inoltre forniamo training completo e documentazione step-by-step.' },
      { question: 'Il prezzo include hosting e dominio?', answer: 'Sì, primo anno incluso nel prezzo del progetto. Dal secondo anno: hosting €150-300/anno, dominio €15-30/anno.' },
      { question: 'Il sito sarà visibile su Google?', answer: 'Sì, SEO base o avanzato incluso: sitemap, meta tags, velocità ottimizzata, struttura mobile-first.' },
      { question: 'Offrite manutenzione dopo il lancio?', answer: 'Sì, primi 30 giorni assistenza gratuita inclusa. Poi pacchetti manutenzione da €200-400/mese.' },
    ],
    services: [
      { name: 'Landing Page', idealFor: 'Freelancer, professionisti, campagne marketing', features: ['Design custom 1 pagina', 'SEO base e meta tags', 'Form contatto integrato'], price: '1200' },
      { name: 'Sito Aziendale', idealFor: 'PMI, studi professionali, agenzie', features: ['Design premium multi-pagina', 'SEO avanzato e analytics', 'CMS per gestione autonoma'], price: '2500' },
      { name: 'E-commerce / Booking', idealFor: 'Negozi online, ristoranti, hotel, B&B', features: ['Design premium e-commerce', 'Pagamenti sicuri integrati', 'Gestione ordini/prenotazioni'], price: '4500' },
    ],
    areaServed: [{ name: 'Italy' }, { name: 'Czech Republic' }],
  },
  en: {
    description: 'Professional websites in 10 days. Modern design, SEO included, satisfaction guarantee.',
    websiteDescription: 'Professional websites in 10 days that bring customers. Modern design, fast delivery, total guarantee.',
    inLanguage: 'en-US',
    breadcrumbs: [
      { name: 'Home', item: 'https://pixarts.eu/en' },
      { name: 'Portfolio', item: 'https://pixarts.eu/en#portfolio' },
      { name: 'Services', item: 'https://pixarts.eu/en#pricing' },
      { name: 'Contact', item: 'https://pixarts.eu/en#contatti' },
    ],
    faqs: [
      { question: 'How long does it really take?', answer: '7-14 business days depending on complexity. Landing page 7 days, business website 10 days, e-commerce 14 days. With written guarantee: 10% discount for each day of delay.' },
      { question: 'What happens if I don\'t like the result?', answer: 'You have 2 rounds of revisions included. If still unsatisfied, full 100% refund within 7 days of launch. Zero risk.' },
      { question: 'Can I update the site myself afterward?', answer: 'Absolutely yes. We use intuitive CMS. Plus we provide complete training and step-by-step documentation.' },
      { question: 'Does the price include hosting and domain?', answer: 'Yes, first year included in project price. From second year: hosting €150-300/year, domain €15-30/year.' },
      { question: 'Will the site be visible on Google?', answer: 'Yes, basic or advanced SEO included: sitemap, meta tags, optimized speed, mobile-first structure.' },
      { question: 'Do you offer maintenance after launch?', answer: 'Yes, first 30 days of free support included. Then maintenance packages from €200-400/month.' },
    ],
    services: [
      { name: 'Landing Page', idealFor: 'Freelancers, professionals, marketing campaigns', features: ['Custom 1-page design', 'Basic SEO and meta tags', 'Integrated contact form'], price: '1200' },
      { name: 'Business Website', idealFor: 'SMEs, professional firms, agencies', features: ['Premium multi-page design', 'Advanced SEO and analytics', 'CMS for autonomous management'], price: '2500' },
      { name: 'E-commerce / Booking', idealFor: 'Online stores, restaurants, hotels, B&Bs', features: ['Premium e-commerce design', 'Secure payment integration', 'Order/booking management'], price: '4500' },
    ],
    areaServed: [{ name: 'Italy' }, { name: 'Czech Republic' }],
  },
  cs: {
    description: 'Profesionální webové stránky za 10 dní. Moderní design, SEO v ceně, záruka spokojenosti.',
    websiteDescription: 'Profesionální webové stránky za 10 dní, které přinášejí zákazníky. Moderní design, rychlé dodání, úplná záruka.',
    inLanguage: 'cs-CZ',
    breadcrumbs: [
      { name: 'Domů', item: 'https://pixarts.eu/cs' },
      { name: 'Portfolio', item: 'https://pixarts.eu/cs#portfolio' },
      { name: 'Služby', item: 'https://pixarts.eu/cs#pricing' },
      { name: 'Kontakt', item: 'https://pixarts.eu/cs#contatti' },
    ],
    faqs: [
      { question: 'Jak dlouho to skutečně trvá?', answer: '7-14 pracovních dní podle složitosti. Landing page 7 dní, firemní web 10 dní, e-shop 14 dní. S písemnou zárukou: 10% sleva za každý den zpoždění.' },
      { question: 'Co se stane, když se mi výsledek nelíbí?', answer: 'Máte 2 kola revizí v ceně. Pokud stále nejste spokojeni, plná refundace 100% do 7 dnů od spuštění. Nulové riziko.' },
      { question: 'Mohu si web sám aktualizovat?', answer: 'Rozhodně ano. Používáme intuitivní CMS. Navíc poskytujeme kompletní školení a dokumentaci krok za krokem.' },
      { question: 'Je v ceně hosting a doména?', answer: 'Ano, první rok je v ceně projektu. Od druhého roku: hosting €150-300/rok, doména €15-30/rok.' },
      { question: 'Bude web viditelný na Google?', answer: 'Ano, základní nebo pokročilé SEO v ceně: sitemap, meta tagy, optimalizovaná rychlost, mobile-first struktura.' },
      { question: 'Nabízíte údržbu po spuštění?', answer: 'Ano, prvních 30 dní bezplatné podpory v ceně. Poté balíčky údržby od €200-400/měsíc.' },
    ],
    services: [
      { name: 'Landing Page', idealFor: 'Freelanceři, profesionálové, marketingové kampaně', features: ['Vlastní jednostránkový design', 'Základní SEO a meta tagy', 'Integrovaný kontaktní formulář'], price: '1200' },
      { name: 'Firemní web', idealFor: 'SME, profesní firmy, agentury', features: ['Prémiový vícestránkový design', 'Pokročilé SEO a analytika', 'CMS pro autonomní správu'], price: '2500' },
      { name: 'E-shop / Rezervace', idealFor: 'Online obchody, restaurace, hotely, penziony', features: ['Prémiový e-shop design', 'Bezpečná integrace plateb', 'Správa objednávek/rezervací'], price: '4500' },
    ],
    areaServed: [{ name: 'Italy' }, { name: 'Czech Republic' }],
  },
} as const

function getLocaleUrl(locale: string): string {
  if (locale === 'it') return 'https://pixarts.eu'
  return `https://pixarts.eu/${locale}`
}

function buildSchemas(locale: string) {
  const l = (locale in localeContent ? locale : 'en') as LocaleKey
  const content = localeContent[l]
  const siteUrl = getLocaleUrl(l)

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Pixarts',
    url: 'https://pixarts.eu',
    logo: 'https://pixarts.eu/logo.png',
    description: content.description,
    foundingDate: '2024',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'CZ',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: 'info@pixarts.eu',
      availableLanguage: ['Italian', 'English', 'Czech'],
    },
    sameAs: SOCIAL_LINKS.map((s) => s.href),
  }

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Pixarts',
    image: 'https://pixarts.eu/og-image.png',
    url: siteUrl,
    email: 'info@pixarts.eu',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'CZ',
    },
    priceRange: '€€',
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
    areaServed: content.areaServed.map((area) => ({
      '@type': 'Country',
      name: area.name,
    })),
    serviceType: ['Web Design', 'Web Development', 'SEO', 'E-commerce'],
  }

  const serviceSchemas = content.services.map((plan) => ({
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: plan.name,
    description: `${plan.idealFor}. ${plan.features.join(', ')}.`,
    provider: {
      '@type': 'Organization',
      name: 'Pixarts',
    },
    areaServed: content.areaServed.map((area) => ({
      '@type': 'Country',
      name: area.name,
    })),
    offers: {
      '@type': 'Offer',
      price: plan.price,
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

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: content.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Pixarts',
    url: siteUrl,
    description: content.websiteDescription,
    inLanguage: content.inLanguage,
    publisher: {
      '@type': 'Organization',
      name: 'Pixarts',
      logo: {
        '@type': 'ImageObject',
        url: 'https://pixarts.eu/logo.png',
      },
    },
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: content.breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.item,
    })),
  }

  return {
    organizationSchema,
    localBusinessSchema,
    websiteSchema,
    breadcrumbSchema,
    faqSchema,
    serviceSchemas,
  }
}

interface StructuredDataProps {
  locale?: string
}

export function StructuredData({ locale = 'it' }: StructuredDataProps) {
  const schemas = buildSchemas(locale)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.faqSchema) }}
      />
      {schemas.serviceSchemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  )
}
