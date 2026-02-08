'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
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
  const [focusedIndex, setFocusedIndex] = useState(-1)
  const optionRefs = useRef<(HTMLButtonElement | null)[]>([])

  const handleChange = useCallback((newLocale: string) => {
    router.replace(pathname, { locale: newLocale })
    setIsOpen(false)
    setFocusedIndex(-1)
  }, [router, pathname])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        setFocusedIndex(-1)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Close on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
        setFocusedIndex(-1)
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [])

  // Keyboard navigation for the dropdown
  const handleTriggerKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      setIsOpen(true)
      setFocusedIndex(0)
      // Focus first option after dropdown opens
      requestAnimationFrame(() => {
        optionRefs.current[0]?.focus()
      })
    }
  }, [])

  const handleOptionKeyDown = useCallback((e: React.KeyboardEvent, index: number) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        if (index < locales.length - 1) {
          setFocusedIndex(index + 1)
          optionRefs.current[index + 1]?.focus()
        }
        break
      case 'ArrowUp':
        e.preventDefault()
        if (index > 0) {
          setFocusedIndex(index - 1)
          optionRefs.current[index - 1]?.focus()
        }
        break
      case 'Enter':
      case ' ':
        e.preventDefault()
        handleChange(locales[index].code)
        break
      case 'Tab':
        setIsOpen(false)
        setFocusedIndex(-1)
        break
    }
  }, [handleChange])

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleTriggerKeyDown}
        className="flex items-center gap-1.5 px-2.5 py-1.5 min-h-[44px] min-w-[44px] rounded-lg bg-bg-surface/60 backdrop-blur-sm border border-border/50 hover:border-accent-orange/30 transition-all duration-300 group"
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
              {locales.map((loc, index) => {
                const isActive = locale === loc.code
                return (
                  <motion.button
                    key={loc.code}
                    ref={(el) => { optionRefs.current[index] = el }}
                    onClick={() => handleChange(loc.code)}
                    onKeyDown={(e) => handleOptionKeyDown(e, index)}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 min-h-[44px] text-left transition-all duration-200 ${
                      isActive
                        ? 'bg-accent-orange/10 text-text-primary'
                        : 'text-text-secondary hover:bg-bg-elevated hover:text-text-primary'
                    } ${focusedIndex === index ? 'outline-none ring-1 ring-accent-orange/50' : ''}`}
                    whileHover={{ x: 4 }}
                    role="option"
                    aria-selected={isActive}
                    tabIndex={isOpen ? 0 : -1}
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
