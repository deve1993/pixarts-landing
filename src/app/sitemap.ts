import { MetadataRoute } from 'next'

const BASE_URL = 'https://pixarts.eu'
const LOCALES = ['it', 'en', 'cs'] as const
const DEFAULT_LOCALE = 'it'

// All static pages in the app
const STATIC_PAGES = [
  '', // Homepage
  '/privacy-policy',
  '/cookie-policy',
  '/terms-conditions',
  '/prenota',
  '/gdpr-request',
] as const

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date().toISOString()

  const entries: MetadataRoute.Sitemap = []

  // Generate entries for each page in each locale
  for (const page of STATIC_PAGES) {
    for (const locale of LOCALES) {
      // For default locale (it), don't add locale prefix to URL
      // But still add alternates for all locales
      const url = locale === DEFAULT_LOCALE
        ? `${BASE_URL}${page}`
        : `${BASE_URL}/${locale}${page}`

      // Create alternates for hreflang
      const languages: Record<string, string> = {}
      for (const altLocale of LOCALES) {
        const altUrl = altLocale === DEFAULT_LOCALE
          ? `${BASE_URL}${page}`
          : `${BASE_URL}/${altLocale}${page}`
        languages[altLocale] = altUrl
      }
      // Add x-default pointing to Italian version
      languages['x-default'] = `${BASE_URL}${page}`

      entries.push({
        url,
        lastModified: currentDate,
        changeFrequency: page === '' ? 'weekly' : 'monthly',
        priority: page === '' ? 1.0 : 0.8,
        alternates: {
          languages,
        },
      })
    }
  }

  return entries
}
