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
import { GoogleAnalytics } from "@/components/GoogleAnalytics"

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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params

  const isItalian = locale === "it"

  return {
    metadataBase: new URL("https://pixarts.eu"),
    title: {
      default: isItalian
        ? "Pixarts - Siti Web Professionali in 10 Giorni | Web Design Italia"
        : "Pixarts - Professional Websites in 10 Days | Web Design Italy",
      template: "%s | Pixarts",
    },
    description: isItalian
      ? "Crea il tuo sito web professionale in 10 giorni. Design moderno, SEO incluso, garanzia soddisfazione. Da €1.200. Portfolio FlowMatics e Quickfy."
      : "Create your professional website in 10 days. Modern design, SEO included, satisfaction guarantee. From €1,200. FlowMatics and Quickfy portfolio.",
    keywords: isItalian
      ? ["siti web professionali", "web design italia", "landing page", "e-commerce", "sito aziendale", "web design veloce"]
      : ["professional websites", "web design italy", "landing page", "e-commerce", "business website", "fast web design"],
    authors: [{ name: "Pixarts" }],
    creator: "Pixarts",
    openGraph: {
      type: "website",
      locale: isItalian ? "it_IT" : "en_US",
      url: "https://pixarts.eu",
      siteName: "Pixarts",
      title: isItalian
        ? "Pixarts - Siti Web Professionali in 10 Giorni"
        : "Pixarts - Professional Websites in 10 Days",
      description: isItalian
        ? "Design moderno, consegna in 10 giorni, garanzia tripla. Trasforma il tuo business online."
        : "Modern design, 10-day delivery, triple guarantee. Transform your business online.",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: isItalian ? "Pixarts - Web Design Professionale" : "Pixarts - Professional Web Design",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: isItalian
        ? "Pixarts - Siti Web Professionali in 10 Giorni"
        : "Pixarts - Professional Websites in 10 Days",
      description: isItalian
        ? "Design moderno, consegna in 10 giorni, garanzia tripla."
        : "Modern design, 10-day delivery, triple guarantee.",
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
      canonical: isItalian ? "https://pixarts.eu" : `https://pixarts.eu/${locale}`,
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
  if (!routing.locales.includes(locale as 'it' | 'en')) {
    notFound()
  }

  // Enable static rendering
  setRequestLocale(locale)

  // Provide all messages to the client
  const messages = await getMessages()

  return (
    <html lang={locale} className={`${inter.variable} ${spaceGrotesk.variable} ${megrim.variable}`}>
      <head>
        <StructuredData />
        <GoogleAnalytics />
      </head>
      <body className="font-body bg-bg-primary text-text-primary antialiased">
        <NextIntlClientProvider messages={messages}>
          <SkipToContent />
          <BackgroundWrapper />
          {children}
          <CookieConsent />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
