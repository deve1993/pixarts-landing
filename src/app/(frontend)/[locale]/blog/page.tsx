import { getTranslations, setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { PageHero } from '@/components/sections/PageHero'
import { BLOG_POSTS } from '@/lib/blog-posts'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'blog' })

  const baseUrl = 'https://pixarts.eu'
  const path = '/blog'

  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
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
      title: t('metaTitle'),
      description: t('metaDescription'),
      url: locale === 'it' ? `${baseUrl}${path}` : `${baseUrl}/${locale}${path}`,
      siteName: 'Pixarts',
      locale: locale,
      type: 'website',
    },
  }
}

export default async function BlogPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations({ locale, namespace: 'blog' })
  const localeKey = locale as 'it' | 'en' | 'cs'

  return (
    <>
      <Header />
      <main id="main-content">
        <PageHero
          title={t('heroTitle')}
          highlight={t('heroHighlight')}
          subtitle={t('heroSubtitle')}
        />

        <section className="py-16 md:py-24">
          <div className="container mx-auto max-w-4xl px-4">
            <div className="grid gap-8 md:gap-10">
              {BLOG_POSTS.map((post) => {
                const content = post.content[localeKey]
                return (
                  <article
                    key={post.slug}
                    className="group rounded-2xl border border-white/10 bg-white/5 p-6 transition-colors hover:bg-white/10 md:p-8"
                  >
                    <div className="mb-3 flex items-center gap-3 text-xs text-gray-500">
                      <span className="rounded-full border border-orange-400/30 bg-orange-400/10 px-2.5 py-1 text-orange-400">
                        {post.category}
                      </span>
                      <span>
                        {new Date(post.publishedAt).toLocaleDateString(
                          locale === 'it' ? 'it-IT' : locale === 'en' ? 'en-US' : 'cs-CZ',
                          { year: 'numeric', month: 'long', day: 'numeric' },
                        )}
                      </span>
                      <span>{post.readingTime} min</span>
                    </div>
                    <h2 className="mb-3 text-xl font-bold text-white transition-colors group-hover:text-orange-400 md:text-2xl">
                      <Link href={`/blog/${post.slug}`}>{content.title}</Link>
                    </h2>
                    <p className="mb-4 leading-relaxed text-gray-400">{content.excerpt}</p>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-2 text-sm font-medium text-orange-400 transition-colors hover:text-orange-300"
                    >
                      {t('readMore')} →
                    </Link>
                  </article>
                )
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
