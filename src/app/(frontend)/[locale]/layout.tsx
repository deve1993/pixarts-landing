import { Inter, Space_Grotesk, Megrim } from "next/font/google"
import "../../globals.css"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { NextIntlClientProvider } from "next-intl"
import { getMessages, setRequestLocale } from "next-intl/server"
import { routing } from "@/i18n/routing"
import { BackgroundWrapper } from "@/components/BackgroundWrapper"
import { StructuredData } from "@/components/StructuredData"
import { SkipToContent } from "@/components/SkipToContent"
import { CookieConsent } from "@/components/CookieConsent"
import {
  GoogleTagManager,
  GoogleTagManagerNoscript,
  HotjarScript,
  MetaPixel,
} from "@/components/analytics"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-satoshi",
  display: "swap",
})

const megrim = Megrim({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-megrim",
  display: "swap",
})

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

const localeMetadata = {
  it: {
    title: "Pixarts - Siti Web Professionali in 10 Giorni | Web Design Italia",
    description: "Crea il tuo sito web professionale in 10 giorni. Design moderno, SEO incluso, garanzia soddisfazione. Da €1.200. Portfolio FlowMatics e Quickfy.",
    keywords: ["siti web professionali", "web design italia", "landing page", "e-commerce", "sito aziendale", "web design veloce"],
    ogLocale: "it_IT",
    ogTitle: "Pixarts - Siti Web Professionali in 10 Giorni",
    ogDescription: "Design moderno, consegna in 10 giorni, garanzia tripla. Trasforma il tuo business online.",
    ogImageAlt: "Pixarts - Web Design Professionale",
    twitterTitle: "Pixarts - Siti Web Professionali in 10 Giorni",
    twitterDescription: "Design moderno, consegna in 10 giorni, garanzia tripla.",
  },
  en: {
    title: "Pixarts - Professional Websites in 10 Days | Web Design",
    description: "Create your professional website in 10 days. Modern design, SEO included, satisfaction guarantee. From €1,200. FlowMatics and Quickfy portfolio.",
    keywords: ["professional websites", "web design", "landing page", "e-commerce", "business website", "fast web design"],
    ogLocale: "en_US",
    ogTitle: "Pixarts - Professional Websites in 10 Days",
    ogDescription: "Modern design, 10-day delivery, triple guarantee. Transform your business online.",
    ogImageAlt: "Pixarts - Professional Web Design",
    twitterTitle: "Pixarts - Professional Websites in 10 Days",
    twitterDescription: "Modern design, 10-day delivery, triple guarantee.",
  },
  cs: {
    title: "Pixarts - Profesionální webové stránky za 10 dní | Webový design",
    description: "Vytvořte si profesionální web za 10 dní. Moderní design, SEO v ceně, záruka spokojenosti. Od 1 200 €. Portfolio FlowMatics a Quickfy.",
    keywords: ["profesionální webové stránky", "webový design", "landing page", "e-commerce", "firemní web", "rychlý webový design"],
    ogLocale: "cs_CZ",
    ogTitle: "Pixarts - Profesionální webové stránky za 10 dní",
    ogDescription: "Moderní design, dodání za 10 dní, trojitá záruka. Transformujte své podnikání online.",
    ogImageAlt: "Pixarts - Profesionální webový design",
    twitterTitle: "Pixarts - Profesionální webové stránky za 10 dní",
    twitterDescription: "Moderní design, dodání za 10 dní, trojitá záruka.",
  },
} as const

function getLocaleUrl(locale: string): string {
  if (locale === "it") return "https://pixarts.eu"
  return `https://pixarts.eu/${locale}`
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params

  const meta = localeMetadata[locale as keyof typeof localeMetadata] ?? localeMetadata.en
  const canonicalUrl = getLocaleUrl(locale)

  return {
    metadataBase: new URL("https://pixarts.eu"),
    title: {
      default: meta.title,
      template: "%s | Pixarts",
    },
    description: meta.description,
    keywords: [...meta.keywords],
    authors: [{ name: "Pixarts" }],
    creator: "Pixarts",
    openGraph: {
      type: "website",
      locale: meta.ogLocale,
      url: canonicalUrl,
      siteName: "Pixarts",
      title: meta.ogTitle,
      description: meta.ogDescription,
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: meta.ogImageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.twitterTitle,
      description: meta.twitterDescription,
      images: ["/og-image.png"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "48x48" },
        { url: "/favicon.svg", type: "image/svg+xml" },
      ],
      shortcut: "/favicon.ico",
      apple: "/apple-touch-icon.png",
    },
    alternates: {
      canonical: canonicalUrl,
      languages: {
        "it": "https://pixarts.eu",
        "en": "https://pixarts.eu/en",
        "cs": "https://pixarts.eu/cs",
        "x-default": "https://pixarts.eu",
      },
    },
    manifest: "/manifest.json",
  }
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params

  // Validate locale
  if (!routing.locales.includes(locale as 'it' | 'en' | 'cs')) {
    notFound()
  }

  // Enable static rendering
  setRequestLocale(locale)

  // Provide all messages to the client
  const messages = await getMessages()

  return (
    <html lang={locale} className={`${inter.variable} ${spaceGrotesk.variable} ${megrim.variable}`}>
      <head>
        <StructuredData locale={locale} />
        <GoogleTagManager />
      </head>
      <body className="font-body bg-bg-primary text-text-primary antialiased">
        <GoogleTagManagerNoscript />
        <NextIntlClientProvider messages={messages}>
          <SkipToContent />
          <BackgroundWrapper />
          {children}
          <MetaPixel />
          <HotjarScript />
          <CookieConsent />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
