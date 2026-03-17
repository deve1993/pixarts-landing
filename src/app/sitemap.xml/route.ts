import { NextResponse } from 'next/server'
import { BLOG_POSTS } from '@/lib/blog-posts'

export const dynamic = 'force-dynamic'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://pixarts.eu'

interface SitemapEntry {
  path: string
  changeFrequency: string
  priority: number
  lastModified: string
}

const staticPages: SitemapEntry[] = [
  { path: '',              changeFrequency: 'weekly',  priority: 1.0, lastModified: '2025-06-01' },
  { path: '/servizi',      changeFrequency: 'weekly',  priority: 0.9, lastModified: '2025-06-01' },
  { path: '/portfolio',    changeFrequency: 'weekly',  priority: 0.8, lastModified: '2025-06-01' },
  { path: '/contatti',     changeFrequency: 'monthly', priority: 0.8, lastModified: '2025-06-01' },
  { path: '/prenota',      changeFrequency: 'monthly', priority: 0.9, lastModified: '2025-06-01' },
  { path: '/preventivo',   changeFrequency: 'monthly', priority: 0.8, lastModified: '2025-06-01' },
  { path: '/chi-siamo',    changeFrequency: 'monthly', priority: 0.7, lastModified: '2025-06-01' },
  { path: '/blog',         changeFrequency: 'weekly',  priority: 0.8, lastModified: '2025-03-05' },
  { path: '/privacy-policy',   changeFrequency: 'yearly', priority: 0.3, lastModified: '2025-06-01' },
  { path: '/cookie-policy',    changeFrequency: 'yearly', priority: 0.3, lastModified: '2025-06-01' },
  { path: '/terms-conditions', changeFrequency: 'yearly', priority: 0.3, lastModified: '2025-06-01' },
  { path: '/gdpr-request',     changeFrequency: 'yearly', priority: 0.4, lastModified: '2025-06-01' },
]

const locales = ['it', 'en', 'cs'] as const

const localizedPaths: Partial<Record<string, Partial<Record<'en' | 'cs', string>>>> = {
  '/servizi':    { en: '/services', cs: '/sluzby'     },
  '/contatti':   { en: '/contact',  cs: '/kontakt'    },
  '/prenota':    { en: '/book',     cs: '/rezervovat' },
  '/preventivo': { en: '/quote',    cs: '/nabidka'    },
  '/chi-siamo':  { en: '/about',    cs: '/o-nas'      },
}

function localeUrl(path: string, locale: string): string {
  const localePath =
    (locale === 'en' || locale === 'cs') && path
      ? (localizedPaths[path]?.[locale] ?? path)
      : path
  if (locale === 'it') return `${baseUrl}${localePath || '/'}`
  return `${baseUrl}/${locale}${localePath}`
}

function buildUrlEntry(entry: SitemapEntry, locale: string): string {
  const loc = localeUrl(entry.path, locale)
  const alternates = locales
    .map((l) => `      <xhtml:link rel="alternate" hreflang="${l}" href="${localeUrl(entry.path, l)}" />`)
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

function buildBlogEntry(slug: string, lastModified: string, locale: string): string {
  const path = `/blog/${slug}`
  const loc = locale === 'it' ? `${baseUrl}${path}` : `${baseUrl}/${locale}${path}`
  const alternates = locales
    .map((l) => {
      const href = l === 'it' ? `${baseUrl}${path}` : `${baseUrl}/${l}${path}`
      return `      <xhtml:link rel="alternate" hreflang="${l}" href="${href}" />`
    })
    .join('\n')
  const xDefault = `      <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}${path}" />`

  return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastModified}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.7</priority>
${alternates}
${xDefault}
  </url>`
}

function buildSitemap(): string {
  const staticEntries = staticPages
    .flatMap((entry) => locales.map((locale) => buildUrlEntry(entry, locale)))
    .join('\n')

  const blogEntries = BLOG_POSTS
    .flatMap((post) => locales.map((locale) => buildBlogEntry(post.slug, post.publishedAt, locale)))
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
>
${staticEntries}
${blogEntries}
</urlset>`
}

export async function GET() {
  const xml = buildSitemap()

  return new NextResponse(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'X-Robots-Tag': 'noindex',
    },
  })
}
