'use client'

import { useTranslations } from 'next-intl'
import { QuoteFormValues } from '@/lib/validations/quote'
import { calculateQuotePrice } from '@/lib/quote-pricing'
import { cn } from '@/lib/utils'
import { Zap, Flame, Clock } from 'lucide-react'

interface QuoteSummaryProps {
  data: Partial<QuoteFormValues>
}

export function QuoteSummary({ data }: QuoteSummaryProps) {
  const t = useTranslations('quotePage')
  const { min, max, timeline, leadScore } = calculateQuotePrice(data)

  return (
    <div className="space-y-6">
      <div className="bg-bg-surface border border-border rounded-xl p-6">
        <h3 className="text-xl font-heading font-semibold text-text-primary mb-4">
          {t('summary.title')}
        </h3>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <span className="text-sm text-text-muted block mb-1">{t('summary.projectType')}</span>
            <span className="text-text-primary font-medium">
              {data.projectType ? t(`projectTypes.${data.projectType}.title`) : '-'}
            </span>
          </div>

          <div>
            <span className="text-sm text-text-muted block mb-1">{t('summary.pages')}</span>
            <span className="text-text-primary font-medium">
              {data.pages ? t(`pages.${data.pages}`) : '-'}
            </span>
          </div>

          <div>
            <span className="text-sm text-text-muted block mb-1">{t('summary.design')}</span>
            <span className="text-text-primary font-medium">
              {data.design ? t(`designOptions.${data.design}.title`) : '-'}
            </span>
          </div>

          <div>
            <span className="text-sm text-text-muted block mb-1">{t('summary.cms')}</span>
            <span className="text-text-primary font-medium">
              {data.cms ? t(`cmsOptions.${data.cms}.title`) : '-'}
            </span>
          </div>
        </div>

        {data.features && data.features.length > 0 && (
          <div className="mt-6">
            <span className="text-sm text-text-muted block mb-2">{t('summary.features')}</span>
            <div className="flex flex-wrap gap-2">
              {data.features.map((feature) => (
                <span
                  key={feature}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-accent-orange/10 text-accent-orange"
                >
                  {t(`featuresList.${feature}.title`)}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="bg-bg-elevated border border-border/50 rounded-xl p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Flame className="w-24 h-24 text-accent-orange" />
        </div>

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-sm text-text-muted block mb-1">{t('summary.estimatedPrice')}</span>
              <div className="text-3xl font-heading font-bold bg-gradient-to-r from-accent-orange to-accent-amber bg-clip-text text-transparent">
                €{min.toLocaleString()} - €{max.toLocaleString()}
              </div>
            </div>
            <div className="text-right">
              <span className="text-sm text-text-muted block mb-1">{t('summary.leadScore')}</span>
              <div className="flex items-center justify-end gap-2">
                {leadScore === 'high' && <Flame className="w-5 h-5 text-error" />}
                {leadScore === 'medium' && <Zap className="w-5 h-5 text-accent-amber" />}
                {leadScore === 'low' && <Clock className="w-5 h-5 text-text-muted" />}
                <span
                  className={cn(
                    'font-medium',
                    leadScore === 'high' && 'text-error',
                    leadScore === 'medium' && 'text-accent-amber',
                    leadScore === 'low' && 'text-text-muted'
                  )}
                >
                  {t(`leadScore.${leadScore}`)}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-text-secondary bg-bg-surface/50 p-3 rounded-lg border border-border/50">
            <Clock className="w-4 h-4 text-accent-orange" />
            <span className="text-sm">
              {t('summary.estimatedTimeline')}: <span className="font-medium text-text-primary">{timeline}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
