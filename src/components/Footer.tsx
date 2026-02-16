'use client'

import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import { Logo } from './Logo'
import { SOCIAL_LINKS } from '@/lib/constants'
import { Linkedin, Instagram, Mail } from 'lucide-react'

const FOOTER_SERVICE_KEYS = ['landing', 'website', 'ecommerce', 'booking', 'maintenance'] as const
const FOOTER_RESOURCE_KEYS = ['portfolio', 'process', 'faq', 'blog'] as const

export function Footer() {
  const t = useTranslations('footer')
  const tPricing = useTranslations('pricing')
  const tNav = useTranslations('nav')
  const tBooking = useTranslations('booking')
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-bg-surface border-t border-border">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Column 1: About */}
          <div className="space-y-6">
            <Logo size="md" />
            <p className="text-text-secondary text-sm leading-relaxed">
              {t('description')}
            </p>
            <div className="flex items-center gap-4">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-bg-elevated border border-border flex items-center justify-center text-text-muted hover:text-accent-orange hover:border-accent-orange transition-all duration-200"
                  aria-label={`${social.name} (${t('opensNewWindow')})`}
                >
                  {social.name === 'LinkedIn' ? (
                    <Linkedin size={18} aria-hidden="true" />
                  ) : (
                    <Instagram size={18} aria-hidden="true" />
                  )}
                </a>
              ))}
              <a
                href="mailto:info@pixarts.eu"
                className="w-10 h-10 rounded-lg bg-bg-elevated border border-border flex items-center justify-center text-text-muted hover:text-accent-orange hover:border-accent-orange transition-all duration-200"
                aria-label={t('emailAriaLabel')}
              >
                <Mail size={18} aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Column 2: Services */}
          <div>
            <h3 className="font-heading font-semibold text-text-primary mb-6">
              {t('services')}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/servizi" className="text-text-secondary hover:text-text-primary transition-colors duration-200 text-sm">
                  {tPricing('plan1.name')}
                </Link>
              </li>
              <li>
                <Link href="/servizi" className="text-text-secondary hover:text-text-primary transition-colors duration-200 text-sm">
                  {tPricing('plan2.name')}
                </Link>
              </li>
              <li>
                <Link href="/servizi" className="text-text-secondary hover:text-text-primary transition-colors duration-200 text-sm">
                  {tPricing('plan3.name')}
                </Link>
              </li>
              <li>
                <Link href="/servizi" className="text-text-secondary hover:text-text-primary transition-colors duration-200 text-sm">
                  {tPricing('maintenance')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div>
            <h3 className="font-heading font-semibold text-text-primary mb-6">
              {t('resources')}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/portfolio" className="text-text-secondary hover:text-text-primary transition-colors duration-200 text-sm">
                  {tNav('portfolio')}
                </Link>
              </li>
              <li>
                <Link href="/servizi" className="text-text-secondary hover:text-text-primary transition-colors duration-200 text-sm">
                  {tNav('services')}
                </Link>
              </li>
              <li>
                <Link href="/contatti" className="text-text-secondary hover:text-text-primary transition-colors duration-200 text-sm">
                  {tNav('contact')}
                </Link>
              </li>
              <li>
                <Link href="/prenota" className="text-text-secondary hover:text-text-primary transition-colors duration-200 text-sm">
                  {tBooking('title')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Legal */}
          <div>
            <h3 className="font-heading font-semibold text-text-primary mb-6">
              {t('legal')}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/privacy-policy" className="text-text-secondary hover:text-text-primary transition-colors duration-200 text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/cookie-policy" className="text-text-secondary hover:text-text-primary transition-colors duration-200 text-sm">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-conditions" className="text-text-secondary hover:text-text-primary transition-colors duration-200 text-sm">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/gdpr-request" className="text-text-secondary hover:text-text-primary transition-colors duration-200 text-sm">
                  {t('gdprRequest')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-text-muted text-sm">
            © {currentYear} Pixarts. {t('copyright')}
          </p>
          <p className="text-text-muted text-sm flex items-center gap-1.5">
            {t('madeWith')}{' '}
            <span
              className="text-xl bg-gradient-to-r from-accent-orange to-accent-red bg-clip-text text-transparent"
              aria-label="love"
            >
              ♥
            </span>
          </p>
        </div>
      </div>
    </footer>
  )
}
