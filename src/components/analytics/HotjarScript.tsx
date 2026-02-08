'use client'

import Script from 'next/script'
import { useEffect, useState } from 'react'

interface CookiePreferences {
  necessary: boolean
  analytics: boolean
  marketing: boolean
  timestamp: number
}

const HOTJAR_ID = process.env.NEXT_PUBLIC_HOTJAR_ID
const COOKIE_CONSENT_KEY = 'pixarts-cookie-consent'

function hasAnalyticsConsent() {
  try {
    const stored = localStorage.getItem(COOKIE_CONSENT_KEY)
    if (!stored) return false
    const parsed = JSON.parse(stored) as CookiePreferences
    return parsed.analytics === true
  } catch {
    return false
  }
}

function cleanupHotjar() {
  const script = document.getElementById('hotjar-script')
  if (script) {
    script.remove()
  }

  const externalScripts = document.querySelectorAll('script[src*="static.hotjar.com"]')
  externalScripts.forEach((item) => item.remove())

  delete window.hj
  delete window._hjSettings
}

export function HotjarScript() {
  const [isEnabled, setIsEnabled] = useState(false)

  useEffect(() => {
    if (!HOTJAR_ID) return

    const updateConsent = () => {
      const enabled = hasAnalyticsConsent()
      setIsEnabled(enabled)

      if (!enabled) {
        cleanupHotjar()
      }
    }

    updateConsent()

    const handleStorage = (event: StorageEvent) => {
      if (event.key === COOKIE_CONSENT_KEY) {
        updateConsent()
      }
    }

    window.addEventListener('storage', handleStorage)
    window.addEventListener('cookie-consent-updated', updateConsent)

    return () => {
      window.removeEventListener('storage', handleStorage)
      window.removeEventListener('cookie-consent-updated', updateConsent)
    }
  }, [])

  if (!HOTJAR_ID || !isEnabled) {
    return null
  }

  return (
    <Script id="hotjar-script" strategy="afterInteractive">
      {`
        (function(h,o,t,j,a,r){
          h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
          h._hjSettings={hjid:${HOTJAR_ID},hjsv:6};
          a=o.getElementsByTagName('head')[0];
          r=o.createElement('script');
          r.async=1;
          r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
          a.appendChild(r);
        })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
      `}
    </Script>
  )
}
