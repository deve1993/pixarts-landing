'use client'

import Script from 'next/script'
import { useEffect, useState } from 'react'

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-9WMPZ5J33J'
const COOKIE_CONSENT_KEY = 'pixarts-cookie-consent'

export function GoogleAnalytics() {
  const [hasConsent, setHasConsent] = useState(false)

  useEffect(() => {
    // Check initial consent
    const checkConsent = () => {
      try {
        const stored = localStorage.getItem(COOKIE_CONSENT_KEY)
        if (stored) {
          const prefs = JSON.parse(stored)
          setHasConsent(prefs.analytics === true)
        }
      } catch {
        setHasConsent(false)
      }
    }

    checkConsent()

    // Listen for consent changes (fired by CookieConsent component via localStorage)
    const handleStorage = (e: StorageEvent) => {
      if (e.key === COOKIE_CONSENT_KEY) checkConsent()
    }
    window.addEventListener('storage', handleStorage)

    // Also re-check on custom event (same-tab updates)
    const handleConsentUpdate = () => checkConsent()
    window.addEventListener('cookie-consent-updated', handleConsentUpdate)

    return () => {
      window.removeEventListener('storage', handleStorage)
      window.removeEventListener('cookie-consent-updated', handleConsentUpdate)
    }
  }, [])

  if (!hasConsent) return null

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>
    </>
  )
}
