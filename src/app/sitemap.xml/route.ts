import { NextResponse } from 'next/server'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://pixarts.eu'

interface SitemapEntry {
  path: string
  changeFrequency: string
  priority: number
  lastModified: string
}

const pages: SitemapEntry[] = [
  {
    path: '',
    changeFrequency: 'weekly',
    priority: 1.0,
    lastModified: new Date().toISOString().split('T')[0],
  },
  {
    path: '/servizi',
    changeFrequency: 'weekly',
    priority: 0.9,
    lastModified: new Date().toISOString().split('T')[0],
  },
  {
    path: '/portfolio',
    changeFrequency: 'weekly',
    priority: 0.8,
    lastModified: new Date().toISOString().split('T')[0],
  },
  {
    path: '/contatti',
    changeFrequency: 'monthly',
    priority: 0.8,
    lastModified: new Date().toISOString().split('T')[0],
  },
  {
    path: '/prenota',
    changeFrequency: 'monthly',
    priority: 0.9,
    lastModified: new Date().toISOString().split('T')[0],
  },
  {
    path: '/privacy-policy',
    changeFrequency: 'yearly',
    priority: 0.3,
    lastModified: '2025-06-01',
  },
  {
    path: '/cookie-policy',
    changeFrequency: 'yearly',
    priority: 0.3,
    lastModified: '2025-06-01',
  },
  {
    path: '/terms-conditions',
    changeFrequency: 'yearly',
    priority: 0.3,
    lastModified: '2025-06-01',
  },
  {
    path: '/gdpr-request',
    changeFrequency: 'yearly',
    priority: 0.4,
    lastModified: '2025-06-01',
  },
]

// localePrefix: 'as-needed' — Italian has no prefix, en → /en, cs → /cs
const locales = ['it', 'en', 'cs'] as const

function localeUrl(path: string, locale?: string): string {
  if (!locale || locale === 'it') return `${baseUrl}${path || '/'}`
  return `${baseUrl}/${locale}${path}`
}

function buildUrlEntry(entry: SitemapEntry, locale: string): string {
  const loc = localeUrl(entry.path, locale)

  const alternates = locales
    .map(
      (l) =>
        `      <xhtml:link rel="alternate" hreflang="${l}" href="${localeUrl(entry.path, l)}" />`
    )
    .join('\n')

  const xDefault = `      <xhtml:link rel="alternate" hreflang="x-default" href="${localeUrl(entry.path, 'it')}" />`

  return `  <url>
    <loc>${loc}</loc>
    <lastmod>${entry.lastModified}</lastmod>
    <changefreq>${entry.changeFrequency}</changefreq>
    <priority>${entry.priority.toFixed(1)}</priority>
${alternates}
${xDefault}
  </url>`
}

function buildSitemap(): string {
  const urlEntries = pages
    .flatMap((entry) => locales.map((locale) => buildUrlEntry(entry, locale)))
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
>
${urlEntries}
</urlset>`
}

export async function GET() {
  const xml = buildSitemap()

  return new NextResponse(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=43200',
      'X-Robots-Tag': 'noindex',
    },
  })
}
