'use client'

import Script from 'next/script'
import { useEffect, useState } from 'react'

interface CookiePreferences {
  necessary: boolean
  analytics: boolean
  marketing: boolean
  timestamp: number
}

const PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID
const COOKIE_CONSENT_KEY = 'pixarts-cookie-consent'

function hasMarketingConsent() {
  try {
    const stored = localStorage.getItem(COOKIE_CONSENT_KEY)
    if (!stored) return false
    const parsed = JSON.parse(stored) as CookiePreferences
    return parsed.marketing === true
  } catch {
    return false
  }
}

function cleanupMetaPixel() {
  const baseScript = document.getElementById('meta-pixel-base')
  if (baseScript) {
    baseScript.remove()
  }

  const sdkScript = document.getElementById('facebook-jssdk')
  if (sdkScript) {
    sdkScript.remove()
  }

  delete window.fbq
  delete window._fbq
}

export function MetaPixel() {
  const [isEnabled, setIsEnabled] = useState(false)

  useEffect(() => {
    if (!PIXEL_ID) return

    const updateConsent = () => {
      const enabled = hasMarketingConsent()
      setIsEnabled(enabled)

      if (!enabled) {
        cleanupMetaPixel()
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

  if (!PIXEL_ID || !isEnabled) {
    return null
  }

  return (
    <Script id="meta-pixel-base" strategy="afterInteractive">
      {`
        !(function(f,b,e,v,n,t,s){
          if(f.fbq)return;
          n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;
          n.push=n;
          n.loaded=!0;
          n.version='2.0';
          n.queue=[];
          t=b.createElement(e);
          t.async=!0;
          t.id='facebook-jssdk';
          t.src=v;
          s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s);
        })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

        fbq('init', '${PIXEL_ID}');
        fbq('track', 'PageView');
      `}
    </Script>
  )
}
