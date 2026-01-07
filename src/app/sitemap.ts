import { MetadataRoute } from 'next'

const BASE_URL = 'https://pixarts.eu'
const LOCALES = ['it', 'en', 'cs'] as const
const DEFAULT_LOCALE = 'it'

// All static pages in the app with their priorities
const STATIC_PAGES = [
  { path: '', priority: 1.0, changeFrequency: 'weekly' as const },
  { path: '/portfolio', priority: 0.9, changeFrequency: 'weekly' as const },
  { path: '/prenota', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/privacy-policy', priority: 0.3, changeFrequency: 'yearly' as const },
  { path: '/cookie-policy', priority: 0.3, changeFrequency: 'yearly' as const },
  { path: '/terms-conditions', priority: 0.3, changeFrequency: 'yearly' as const },
  { path: '/gdpr-request', priority: 0.3, changeFrequency: 'yearly' as const },
] as const

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []
  const lastModified = new Date()

  // Generate entries for each page in each locale
  for (const page of STATIC_PAGES) {
    for (const locale of LOCALES) {
      // For default locale (it), don't add locale prefix to URL
      const url = locale === DEFAULT_LOCALE
        ? `${BASE_URL}${page.path}`
        : `${BASE_URL}/${locale}${page.path}`

      // Create alternates for hreflang
      const languages: Record<string, string> = {}
      for (const altLocale of LOCALES) {
        const altUrl = altLocale === DEFAULT_LOCALE
          ? `${BASE_URL}${page.path}`
          : `${BASE_URL}/${altLocale}${page.path}`
        languages[altLocale] = altUrl
      }
      // Add x-default pointing to Italian version
      languages['x-default'] = `${BASE_URL}${page.path}`

      entries.push({
        url,
        lastModified,
        changeFrequency: page.changeFrequency,
        priority: page.priority,
        alternates: {
          languages,
        },
      })
    }
  }

  return entries
}
