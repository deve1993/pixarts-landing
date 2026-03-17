import { getTranslations, setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { BLOG_POSTS } from '@/lib/blog-posts'

type Props = {
  params: Promise<{ locale: string; slug: string }>
}

export async function generateStaticParams() {
  return BLOG_POSTS.flatMap((post) =>
    ['it', 'en', 'cs'].map((locale) => ({ locale, slug: post.slug })),
  )
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  const post = BLOG_POSTS.find((p) => p.slug === slug)
  if (!post) return {}

  const localeKey = locale as 'it' | 'en' | 'cs'
  const content = post.content[localeKey]
  const baseUrl = 'https://pixarts.eu'
  const path = `/blog/${slug}`

  return {
    title: content.metaTitle,
    description: content.metaDescription,
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
      title: content.metaTitle,
      description: content.metaDescription,
      url: locale === 'it' ? `${baseUrl}${path}` : `${baseUrl}/${locale}${path}`,
      siteName: 'Pixarts',
      locale: locale,
      type: 'article',
      publishedTime: post.publishedAt,
    },
  }
}

export default async function BlogArticle({ params }: Props) {
  const { locale, slug } = await params
  setRequestLocale(locale)

  const post = BLOG_POSTS.find((p) => p.slug === slug)
  if (!post) notFound()

  const t = await getTranslations({ locale, namespace: 'blog' })
  const localeKey = locale as 'it' | 'en' | 'cs'
  const content = post.content[localeKey]

  const baseUrl = 'https://pixarts.eu'
  const articleUrl =
    locale === 'it' ? `${baseUrl}/blog/${slug}` : `${baseUrl}/${locale}/blog/${slug}`

  const blogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: content.title,
    description: content.metaDescription,
    url: articleUrl,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    inLanguage: locale === 'it' ? 'it-IT' : locale === 'en' ? 'en-US' : 'cs-CZ',
    author: {
      '@type': 'Organization',
      name: 'Pixarts',
      url: 'https://pixarts.eu',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Pixarts',
      url: 'https://pixarts.eu',
      logo: {
        '@type': 'ImageObject',
        url: 'https://pixarts.eu/logo-white.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': articleUrl,
    },
    timeRequired: `PT${post.readingTime}M`,
    keywords: content.title,
    articleSection: post.category,
  }

  return (
    <>
      <Header />
      <main id="main-content">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
        />

        <article className="py-16 md:py-24">
          <div className="container mx-auto max-w-3xl px-4">
            <header className="mb-10 md:mb-14">
              <div className="mb-4 flex items-center gap-3 text-xs text-gray-500">
                <span className="rounded-full border border-orange-400/30 bg-orange-400/10 px-2.5 py-1 text-orange-400">
                  {post.category}
                </span>
                <span>
                  {new Date(post.publishedAt).toLocaleDateString(
                    locale === 'it' ? 'it-IT' : locale === 'en' ? 'en-US' : 'cs-CZ',
                    { year: 'numeric', month: 'long', day: 'numeric' },
                  )}
                </span>
                <span>
                  {post.readingTime} min {t('readingTime')}
                </span>
              </div>
              <h1 className="text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl">
                {content.title}
              </h1>
              <p className="mt-4 text-lg leading-relaxed text-gray-400">{content.excerpt}</p>
            </header>

            <div
              className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-p:text-gray-300 prose-li:text-gray-300 prose-a:text-orange-400 prose-a:no-underline hover:prose-a:underline prose-strong:text-white"
              dangerouslySetInnerHTML={{ __html: content.content }}
            />

            <footer className="mt-12 border-t border-white/10 pt-8">
              <p className="text-sm text-gray-500">
                {t('publishedBy')}{' '}
                <a href="https://pixarts.eu" className="text-orange-400">
                  Pixarts
                </a>{' '}
                —{' '}
                {new Date(post.publishedAt).toLocaleDateString(
                  locale === 'it' ? 'it-IT' : locale === 'en' ? 'en-US' : 'cs-CZ',
                )}
              </p>
            </footer>
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}
