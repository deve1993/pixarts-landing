'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { usePathname } from 'next/navigation'
import { useRouter, Link } from '@/i18n/routing'
import { Logo } from './Logo'
import { Button } from './ui/button'
import { LanguageSwitcher } from './LanguageSwitcher'
import { cn, scrollToElement } from '@/lib/utils'

const NAV_ITEMS_KEYS = [
  { key: 'home', href: '/', isPage: true },
  { key: 'services', href: '/servizi', isPage: true },
  { key: 'portfolio', href: '/portfolio', isPage: true },
  { key: 'contact', href: '/contatti', isPage: true },
] as const

export function Header() {
  const t = useTranslations('nav')
  const pathname = usePathname()
  const router = useRouter()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const firstFocusableRef = useRef<HTMLButtonElement>(null)
  const lastFocusableRef = useRef<HTMLButtonElement>(null)

  // Check if we're on the homepage
  const isHomePage = pathname === '/' || pathname === '/it' || pathname === '/en' || pathname === '/cs'

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Focus trap and keyboard navigation for mobile menu
  useEffect(() => {
    if (!isMobileMenuOpen) return

    // Focus first menu item when menu opens
    setTimeout(() => {
      firstFocusableRef.current?.focus()
    }, 100)

    const handleKeyDown = (e: KeyboardEvent) => {
      // Close on Escape
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false)
        menuButtonRef.current?.focus()
        return
      }

      // Focus trap with Tab
      if (e.key === 'Tab') {
        const focusableElements = menuRef.current?.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )

        if (!focusableElements || focusableElements.length === 0) return

        const firstElement = focusableElements[0] as HTMLElement
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault()
          lastElement.focus()
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault()
          firstElement.focus()
        }
      }
    }

    // Prevent body scroll when menu is open
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isMobileMenuOpen])

  const handleNavClick = useCallback((href: string) => {
    const id = href.replace('#', '')
    setIsMobileMenuOpen(false)

    if (isHomePage) {
      // On homepage, just scroll to the element
      scrollToElement(id)
    } else {
      // On other pages, navigate to homepage with hash
      router.push(`/${href}`)
    }
  }, [isHomePage, router])

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false)
    menuButtonRef.current?.focus()
  }, [])

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled
            ? 'py-3 backdrop-blur-md bg-bg-primary/80 border-b border-border/50'
            : 'py-5 bg-transparent'
        )}
        role="banner"
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="relative z-50"
            aria-label={t('logoAria')}
          >
            <Logo />
          </Link>

          {/* Desktop Navigation */}
          <nav
            className="hidden md:flex items-center gap-8"
            role="navigation"
            aria-label={t('mainNav')}
          >
            {NAV_ITEMS_KEYS.map((item) => (
              item.isPage ? (
                <Link
                  key={item.key}
                  href={item.href}
                  className="relative text-text-secondary hover:text-text-primary transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-orange focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary rounded-sm group"
                >
                  {t(item.key)}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent-orange transition-all duration-300 ease-out group-hover:w-full" />
                </Link>
              ) : (
                <button
                  key={item.key}
                  onClick={() => handleNavClick(item.href)}
                  className="relative text-text-secondary hover:text-text-primary transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-orange focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary rounded-sm group"
                >
                  {t(item.key)}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent-orange transition-all duration-300 ease-out group-hover:w-full" />
                </button>
              )
            ))}
          </nav>

          {/* Desktop CTA + Language Switcher */}
          <div className="hidden md:flex items-center gap-4">
            <LanguageSwitcher />
            <Link href="/prenota">
              <Button size="sm">
                {t('book')}
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            ref={menuButtonRef}
            className="md:hidden relative z-50 p-2.5 -mr-2.5 text-text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-orange rounded-md"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? t('closeMenu') : t('openMenu')}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            ref={menuRef}
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 md:hidden"
            role="dialog"
            aria-modal="true"
            aria-label={t('mobileMenuDialog')}
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-bg-primary/95 backdrop-blur-lg"
              onClick={closeMobileMenu}
              aria-hidden="true"
            />

            {/* Menu Content */}
            <motion.nav
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="relative flex flex-col items-center justify-center h-full gap-8"
              role="navigation"
              aria-label={t('mobileNav')}
            >
              {NAV_ITEMS_KEYS.map((item, index) => (
                item.isPage ? (
                  <motion.div
                    key={item.key}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      onClick={closeMobileMenu}
                      className="text-2xl font-heading font-semibold text-text-primary hover:text-accent-orange transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-orange focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary rounded-md px-4 py-2 block"
                    >
                      {t(item.key)}
                    </Link>
                  </motion.div>
                ) : (
                  <motion.button
                    key={item.key}
                    ref={index === 0 ? firstFocusableRef : undefined}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                    onClick={() => handleNavClick(item.href)}
                    className="text-2xl font-heading font-semibold text-text-primary hover:text-accent-orange transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-orange focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary rounded-md px-4 py-2"
                  >
                    {t(item.key)}
                  </motion.button>
                )
              ))}

              {/* Mobile Language Switcher */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
              >
                <LanguageSwitcher />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-4"
              >
                <Link href="/prenota" onClick={closeMobileMenu}>
                  <Button ref={lastFocusableRef} size="lg">
                    {t('book')}
                  </Button>
                </Link>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
