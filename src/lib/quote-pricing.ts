import { QuoteFormValues } from './validations/quote'

// Base prices
const BASE_PRICES = {
  landing: { min: 800, max: 1500 },
  website: { min: 1500, max: 3000 },
  ecommerce: { min: 3000, max: 6000 },
  webapp: { min: 5000, max: 15000 },
}

// Page multipliers
const PAGE_MULTIPLIERS = {
  '1-3': 1,
  '4-7': 1.3,
  '8-15': 1.6,
  '15+': 2,
}

// Design modifiers
const DESIGN_MODIFIERS = {
  template: 1,
  custom: 1.3,
  existing: 0.8,
}

// Feature addons (added to both min and max)
const FEATURE_ADDONS = {
  contact_form: 0, // included
  booking: 500,
  blog: 400,
  multilang: 300, // per additional language (simplified)
  auth: 800,
  payments: 1000,
  seo: 500,
  analytics: 300,
}

// Timeline modifier
const TIMELINE_MODIFIERS = {
  standard: 1,
  urgent: 1.3,
  flexible: 0.95,
}

// CMS addon
const CMS_ADDON = { yes: 400, no: 0 }

export function calculateQuotePrice(data: Partial<QuoteFormValues>) {
  if (!data.projectType) return { min: 0, max: 0, timeline: '', leadScore: 'low' as const }

  let min = BASE_PRICES[data.projectType].min
  let max = BASE_PRICES[data.projectType].max

  // Pages
  if (data.pages) {
    min *= PAGE_MULTIPLIERS[data.pages]
    max *= PAGE_MULTIPLIERS[data.pages]
  }

  // Design
  if (data.design) {
    min *= DESIGN_MODIFIERS[data.design]
    max *= DESIGN_MODIFIERS[data.design]
  }

  // Features
  if (data.features) {
    data.features.forEach((feature) => {
      const addon = FEATURE_ADDONS[feature]
      min += addon
      max += addon
    })
  }

  // CMS
  if (data.cms) {
    const addon = CMS_ADDON[data.cms]
    min += addon
    max += addon
  }

  // Timeline
  if (data.timeline) {
    min *= TIMELINE_MODIFIERS[data.timeline]
    max *= TIMELINE_MODIFIERS[data.timeline]
  }

  // Round to nearest 50
  min = Math.round(min / 50) * 50
  max = Math.round(max / 50) * 50

  // Lead Score Calculation
  let score = 0
  if (data.projectType === 'webapp' || data.projectType === 'ecommerce') score += 3
  if (data.projectType === 'website') score += 2
  if (data.pages === '15+' || data.pages === '8-15') score += 2
  if (data.timeline === 'urgent') score += 2
  if (data.features && data.features.length > 3) score += 2

  let leadScore: 'high' | 'medium' | 'low' = 'low'
  if (score >= 6) leadScore = 'high'
  else if (score >= 3) leadScore = 'medium'

  // Timeline string
  let timeline = '4-6 settimane'
  if (data.timeline === 'urgent') timeline = '2-3 settimane'
  if (data.timeline === 'flexible') timeline = 'Flessibile'
  if (data.projectType === 'landing') timeline = '1-2 settimane'

  return { min, max, timeline, leadScore }
}
