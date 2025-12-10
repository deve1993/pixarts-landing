'use client'

import { useState, useRef, useEffect } from 'react'
import { useLocale } from 'next-intl'
import { useRouter, usePathname } from '@/i18n/routing'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Check } from 'lucide-react'

const locales = [
  { code: 'it', label: 'Italiano', flag: '🇮🇹', shortLabel: 'IT' },
  { code: 'en', label: 'English', flag: '🇬🇧', shortLabel: 'EN' },
  { code: 'cs', label: 'Čeština', flag: '🇨🇿', shortLabel: 'CS' },
] as const

export function LanguageSwitcher() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const currentLocale = locales.find((l) => l.code === locale) || locales[0]

  const handleChange = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale })
    setIsOpen(false)
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Close on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false)
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [])

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-bg-surface/60 backdrop-blur-sm border border-border/50 hover:border-accent-orange/30 transition-all duration-300 group"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label="Select language"
      >
        <span className="text-lg leading-none">{currentLocale.flag}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-3.5 h-3.5 text-text-muted group-hover:text-accent-orange transition-colors" />
        </motion.div>
      </motion.button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute right-0 top-full mt-2 z-50 min-w-[160px] overflow-hidden rounded-xl bg-bg-surface/95 backdrop-blur-md border border-accent-orange/30 shadow-xl shadow-black/20"
            role="listbox"
            aria-label="Available languages"
          >
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-accent-orange/5 to-transparent pointer-events-none" />

            <div className="relative py-1">
              {locales.map((loc) => {
                const isActive = locale === loc.code
                return (
                  <motion.button
                    key={loc.code}
                    onClick={() => handleChange(loc.code)}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-all duration-200 ${
                      isActive
                        ? 'bg-accent-orange/10 text-text-primary'
                        : 'text-text-secondary hover:bg-bg-elevated hover:text-text-primary'
                    }`}
                    whileHover={{ x: 4 }}
                    role="option"
                    aria-selected={isActive}
                  >
                    <span className="text-lg">{loc.flag}</span>
                    <span className="flex-1 text-sm font-medium">{loc.label}</span>
                    {isActive && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                      >
                        <Check className="w-4 h-4 text-accent-orange" />
                      </motion.div>
                    )}
                  </motion.button>
                )
              })}
            </div>

            {/* Bottom accent line */}
            <div className="h-0.5 bg-gradient-to-r from-transparent via-accent-orange/50 to-transparent" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
