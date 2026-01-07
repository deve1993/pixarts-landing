import { MetadataRoute } from 'next'

const BASE_URL = 'https://pixarts.eu'
const LOCALES = ['it', 'en', 'cs'] as const
const DEFAULT_LOCALE = 'it'

// Pagine statiche con date di ultima modifica accurate
// Google ignora priority e changeFrequency, quindi usiamo solo lastModified
// Aggiorna la data quando modifichi significativamente una pagina
const STATIC_PAGES = [
  { path: '', lastModified: '2026-01-07' },
  { path: '/portfolio', lastModified: '2026-01-07' },
  { path: '/prenota', lastModified: '2026-01-07' },
  { path: '/privacy-policy', lastModified: '2025-06-01' },
  { path: '/cookie-policy', lastModified: '2025-06-01' },
  { path: '/terms-conditions', lastModified: '2025-06-01' },
  { path: '/gdpr-request', lastModified: '2025-06-01' },
] as const

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []

  for (const page of STATIC_PAGES) {
    for (const locale of LOCALES) {
      // Per la lingua predefinita (it), non aggiungere prefisso locale all'URL
      const url = locale === DEFAULT_LOCALE
        ? `${BASE_URL}${page.path}`
        : `${BASE_URL}/${locale}${page.path}`

      // Crea alternates per hreflang
      const languages: Record<string, string> = {}
      for (const altLocale of LOCALES) {
        const altUrl = altLocale === DEFAULT_LOCALE
          ? `${BASE_URL}${page.path}`
          : `${BASE_URL}/${altLocale}${page.path}`
        languages[altLocale] = altUrl
      }
      // Aggiungi x-default che punta alla versione italiana
      languages['x-default'] = `${BASE_URL}${page.path}`

      entries.push({
        url,
        lastModified: new Date(page.lastModified),
        alternates: {
          languages,
        },
      })
    }
  }

  return entries
}
