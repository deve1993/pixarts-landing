'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import { X, Cookie, ChevronDown, ChevronUp } from 'lucide-react'

interface CookiePreferences {
  necessary: boolean
  analytics: boolean
  marketing: boolean
  timestamp: number
}

const STORAGE_KEY = 'pixarts-cookie-consent'

function updateConsentMode(prefs: CookiePreferences) {
  if (typeof window === 'undefined') return

  window.dataLayer = window.dataLayer || []

  const consentPayload = {
    analytics_storage: prefs.analytics ? 'granted' : 'denied',
    ad_storage: prefs.marketing ? 'granted' : 'denied',
    ad_user_data: prefs.marketing ? 'granted' : 'denied',
    ad_personalization: prefs.marketing ? 'granted' : 'denied',
  }

  if (typeof window.gtag === 'function') {
    window.gtag('consent', 'update', consentPayload)
    return
  }

  window.dataLayer.push(['consent', 'update', consentPayload])
}

export function CookieConsent() {
  const t = useTranslations('cookieConsent')
  const [isVisible, setIsVisible] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: true,
    marketing: true,
    timestamp: 0,
  })

  useEffect(() => {
    // Check if user has already set preferences
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as CookiePreferences
        setPreferences(parsed)
        setIsVisible(false)
        updateConsentMode(parsed)
      } catch {
        setIsVisible(true)
      }
    } else {
      // Show banner after a short delay for better UX
      const timer = setTimeout(() => setIsVisible(true), 1000)
      return () => clearTimeout(timer)
    }
  }, [])

  const savePreferences = (prefs: CookiePreferences) => {
    const toSave = { ...prefs, timestamp: Date.now() }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave))
    setPreferences(toSave)
    updateConsentMode(toSave)
    setIsVisible(false)
    // Notify GoogleAnalytics component of consent change (same-tab)
    window.dispatchEvent(new CustomEvent('cookie-consent-updated'))
  }

  const acceptAll = () => {
    savePreferences({
      necessary: true,
      analytics: true,
      marketing: true,
      timestamp: Date.now(),
    })
  }

  const rejectAll = () => {
    savePreferences({
      necessary: true,
      analytics: false,
      marketing: false,
      timestamp: Date.now(),
    })
  }

  const saveCustom = () => {
    savePreferences(preferences)
  }

  const toggleCategory = (category: 'analytics' | 'marketing') => {
    setPreferences((prev) => ({
      ...prev,
      [category]: !prev[category],
    }))
  }

  // Function to open preferences from footer link
  useEffect(() => {
    const handleOpenPreferences = () => {
      setIsVisible(true)
      setIsExpanded(true)
    }

    window.addEventListener('open-cookie-preferences', handleOpenPreferences)
    return () => window.removeEventListener('open-cookie-preferences', handleOpenPreferences)
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
        >
          <div className="max-w-4xl mx-auto bg-bg-surface/95 backdrop-blur-md border border-border rounded-xl shadow-xl overflow-hidden">
            {/* Main Banner */}
            <div className="p-6">
              <div className="flex items-start gap-4">
                <div className="hidden sm:flex w-12 h-12 rounded-xl bg-gradient-to-br from-accent-orange to-accent-amber items-center justify-center flex-shrink-0" aria-hidden="true">
                  <Cookie className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-heading font-semibold text-text-primary mb-2">
                    {t('title')}
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {t('description')}{' '}
                    <Link href="/cookie-policy" className="text-accent-orange hover:underline">
                      {t('moreInfo')}
                    </Link>
                  </p>
                </div>
                <button
                  onClick={rejectAll}
                  className="hidden md:flex p-3 rounded-lg hover:bg-bg-elevated transition-colors"
                  aria-label="Chiudi e rifiuta cookie opzionali"
                >
                  <X className="w-5 h-5 text-text-muted" aria-hidden="true" />
                </button>
              </div>

              {/* Expandable Preferences */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-6 pt-6 border-t border-border space-y-4">
                      {/* Necessary Cookies */}
                      <div className="flex items-center justify-between p-4 bg-bg-elevated/50 rounded-lg">
                        <div className="flex-1 min-w-0 pr-4">
                          <p className="font-semibold text-text-primary text-sm">{t('necessary')}</p>
                          <p className="text-text-muted text-xs mt-1">{t('necessaryDesc')}</p>
                        </div>
                        <div className="w-12 h-6 bg-accent-orange/30 rounded-full relative">
                          <div className="absolute left-1 top-1 w-4 h-4 bg-accent-orange rounded-full" />
                        </div>
                      </div>

                      {/* Analytics Cookies */}
                      <div className="flex items-center justify-between p-4 bg-bg-elevated/50 rounded-lg">
                        <div className="flex-1 min-w-0 pr-4">
                          <p id="analytics-label" className="font-semibold text-text-primary text-sm">{t('analytics')}</p>
                          <p id="analytics-desc" className="text-text-muted text-xs mt-1">{t('analyticsDesc')}</p>
                        </div>
                        <button
                          onClick={() => toggleCategory('analytics')}
                          role="switch"
                          aria-checked={preferences.analytics}
                          aria-labelledby="analytics-label"
                          aria-describedby="analytics-desc"
                          className={`relative w-12 h-6 rounded-full transition-colors ${
                            preferences.analytics ? 'bg-accent-orange' : 'bg-bg-elevated'
                          }`}
                        >
                          <span className="sr-only">
                            {preferences.analytics ? 'Disabilita' : 'Abilita'} cookie analytics
                          </span>
                          <div
                            className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${
                              preferences.analytics ? 'left-7' : 'left-1'
                            }`}
                            aria-hidden="true"
                          />
                        </button>
                      </div>

                      {/* Marketing Cookies */}
                      <div className="flex items-center justify-between p-4 bg-bg-elevated/50 rounded-lg">
                        <div className="flex-1 min-w-0 pr-4">
                          <p id="marketing-label" className="font-semibold text-text-primary text-sm">{t('marketing')}</p>
                          <p id="marketing-desc" className="text-text-muted text-xs mt-1">{t('marketingDesc')}</p>
                        </div>
                        <button
                          onClick={() => toggleCategory('marketing')}
                          role="switch"
                          aria-checked={preferences.marketing}
                          aria-labelledby="marketing-label"
                          aria-describedby="marketing-desc"
                          className={`relative w-12 h-6 rounded-full transition-colors ${
                            preferences.marketing ? 'bg-accent-orange' : 'bg-bg-elevated'
                          }`}
                        >
                          <span className="sr-only">
                            {preferences.marketing ? 'Disabilita' : 'Abilita'} cookie marketing
                          </span>
                          <div
                            className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${
                              preferences.marketing ? 'left-7' : 'left-1'
                            }`}
                            aria-hidden="true"
                          />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Action Buttons */}
              <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
                >
                  {isExpanded ? (
                    <>
                      <ChevronUp className="w-4 h-4" aria-hidden="true" />
                      {t('hideSettings')}
                    </>
                  ) : (
                    <>
                      <ChevronDown className="w-4 h-4" aria-hidden="true" />
                      {t('customize')}
                    </>
                  )}
                </button>

                <div className="flex-1" />

                <div className="flex flex-col sm:flex-row gap-3">
                  {isExpanded ? (
                    <button
                      onClick={saveCustom}
                      className="px-6 py-2.5 text-sm font-medium text-text-primary bg-bg-elevated hover:bg-bg-elevated/80 rounded-lg transition-colors"
                    >
                      {t('save')}
                    </button>
                  ) : (
                    <button
                      onClick={rejectAll}
                      className="px-6 py-2.5 text-sm font-medium text-text-primary bg-bg-elevated hover:bg-bg-elevated/80 rounded-lg transition-colors"
                    >
                      {t('rejectAll')}
                    </button>
                  )}
                  <button
                    onClick={acceptAll}
                    className="px-6 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-accent-orange to-accent-amber hover:shadow-glow rounded-lg transition-all"
                  >
                    {t('acceptAll')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Export a function to open preferences from anywhere
export function openCookiePreferences() {
  window.dispatchEvent(new CustomEvent('open-cookie-preferences'))
}
