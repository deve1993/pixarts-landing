import { defineRouting } from 'next-intl/routing'
import { createNavigation } from 'next-intl/navigation'

export const routing = defineRouting({
  locales: ['it', 'en', 'cs'],
  defaultLocale: 'it',
  localePrefix: 'as-needed', // Only show /en, /cs for English and Czech, Italian is default without prefix
})

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing)
