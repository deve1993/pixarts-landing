import { QuoteFormValues } from './validations/quote'

// Base prices
const BASE_PRICES = {
  landing: { min: 1200, max: 1500 },
  website: { min: 2500, max: 3500 },
  ecommerce: { min: 4500, max: 6000 },
  webapp: { min: 5000, max: 15000 },
}

// Page multipliers
const PAGE_MULTIPLIERS = {
  '1-3': 1,
  '4-7': 1.1,
  '8-15': 1.25,
  '15+': 1.5,
}

// Design addons (flat, not multiplier)
const DESIGN_ADDONS = {
  template: 0,
  custom: 300,
  existing: -200,
}

// Feature addons (added to both min and max)
const FEATURE_ADDONS = {
  contact_form: 0, // included
  booking: 400,
  blog: 300,
  multilang: 300,
  auth: 600,
  payments: 800,
  seo: 0,       // included
  analytics: 0, // included
}

// Timeline modifier
const TIMELINE_MODIFIERS = {
  standard: 1,
  urgent: 1.15,
  flexible: 0.9,
}

// CMS addon (included in all plans)
const CMS_ADDON = { yes: 0, no: 0 }

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
    min += DESIGN_ADDONS[data.design]
    max += DESIGN_ADDONS[data.design]
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
