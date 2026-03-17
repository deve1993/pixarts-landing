import { defineRouting } from 'next-intl/routing'
import { createNavigation } from 'next-intl/navigation'

export const routing = defineRouting({
  locales: ['it', 'en', 'cs'],
  defaultLocale: 'it',
  localePrefix: 'as-needed', // Only show /en, /cs for English and Czech, Italian is default without prefix
  pathnames: {
    '/': '/',
    '/servizi': { it: '/servizi', en: '/services', cs: '/sluzby' },
    '/contatti': { it: '/contatti', en: '/contact', cs: '/kontakt' },
    '/prenota': { it: '/prenota', en: '/book', cs: '/rezervovat' },
    '/preventivo': { it: '/preventivo', en: '/quote', cs: '/nabidka' },
    '/chi-siamo': { it: '/chi-siamo', en: '/about', cs: '/o-nas' },
    '/portfolio': '/portfolio',
    '/blog': '/blog',
    '/privacy-policy': '/privacy-policy',
    '/cookie-policy': '/cookie-policy',
    '/terms-conditions': '/terms-conditions',
    '/gdpr-request': '/gdpr-request',
  },
})

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing)
