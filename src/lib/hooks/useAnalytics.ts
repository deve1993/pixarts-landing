'use client'

import { useCallback } from 'react'

type AnalyticsPrimitive = string | number | boolean | null | undefined
type AnalyticsParams = Record<string, AnalyticsPrimitive>

type ConversionType =
  | 'contact_form_submit'
  | 'booking_complete'
  | 'cta_click'
  | 'portfolio_view'

interface ConversionPayloadMap {
  contact_form_submit: {
    source?: string
    project_type?: string
    budget_range?: string
  }
  booking_complete: {
    booking_date?: string
    booking_time?: string
    booking_id?: string
  }
  cta_click: {
    cta_name: string
    cta_location: string
  }
  portfolio_view: {
    project_name: string
    project_category?: string
  }
}

function pushToDataLayer(payload: AnalyticsParams) {
  if (typeof window === 'undefined') return
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push(payload)
}

export function useAnalytics() {
  const trackEvent = useCallback((name: string, params: AnalyticsParams = {}) => {
    pushToDataLayer({
      event: name,
      ...params,
    })
  }, [])

  const trackConversion = useCallback(
    <T extends ConversionType>(type: T, data: ConversionPayloadMap[T]) => {
      switch (type) {
        case 'contact_form_submit': {
          pushToDataLayer({
            event: 'generate_lead',
            lead_type: 'contact',
            ...data,
          })

          if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
            window.fbq('track', 'Lead')
          }
          break
        }

        case 'booking_complete': {
          pushToDataLayer({
            event: 'schedule',
            ...data,
          })

          if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
            window.fbq('track', 'Schedule')
          }
          break
        }

        case 'cta_click': {
          pushToDataLayer({
            event: 'cta_click',
            ...data,
          })
          break
        }

        case 'portfolio_view': {
          pushToDataLayer({
            event: 'view_item',
            ...data,
          })
          break
        }

        default:
          break
      }
    },
    []
  )

  return {
    trackEvent,
    trackConversion,
  }
}
