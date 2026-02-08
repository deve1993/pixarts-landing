'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'
import { Layout, Monitor, ShoppingCart, Code2, Check, ChevronRight, ChevronLeft, Loader2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import { quoteFormSchema, type QuoteFormValues } from '@/lib/validations/quote'
import { QuoteSteps, type QuoteStep } from './QuoteSteps'
import { QuoteSummary } from './QuoteSummary'
import { QuoteConfirmation } from './QuoteConfirmation'
import { Link } from '@/i18n/routing'

const STEPS: QuoteStep[] = ['project', 'details', 'features', 'timeline', 'contact', 'summary']

export function QuoteForm() {
  const t = useTranslations('quotePage')
  const [currentStep, setCurrentStep] = useState<QuoteStep>('project')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteFormSchema),
    defaultValues: {
      features: [],
      privacy: false,
    },
    mode: 'onChange',
  })

  const formData = watch()

  const nextStep = async () => {
    const currentIndex = STEPS.indexOf(currentStep)
    const nextIndex = currentIndex + 1

    // Validate current step fields
    let isValid = false
    if (currentStep === 'project') isValid = await trigger('projectType')
    if (currentStep === 'details') isValid = await trigger(['pages', 'design'])
    if (currentStep === 'features') isValid = true // Optional
    if (currentStep === 'timeline') isValid = await trigger(['cms', 'timeline'])
    if (currentStep === 'contact') isValid = await trigger(['nome', 'cognome', 'email', 'telefono', 'privacy'])

    if (isValid && nextIndex < STEPS.length) {
      setCurrentStep(STEPS[nextIndex])
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const prevStep = () => {
    const currentIndex = STEPS.indexOf(currentStep)
    const prevIndex = currentIndex - 1
    if (prevIndex >= 0) {
      setCurrentStep(STEPS[prevIndex])
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const onSubmit = async (data: QuoteFormValues) => {
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) throw new Error('Failed to submit')

      setIsSuccess(true)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (error) {
      console.error('Error submitting quote:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return <QuoteConfirmation />
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <QuoteSteps
          currentStep={currentStep}
          labels={{
            project: t('steps.project'),
            details: t('steps.details'),
            features: t('steps.features'),
            timeline: t('steps.timeline'),
            contact: t('steps.contact'),
            summary: t('steps.summary'),
          }}
        />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* STEP 1: PROJECT TYPE */}
            {currentStep === 'project' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { id: 'landing', icon: Layout },
                  { id: 'website', icon: Monitor },
                  { id: 'ecommerce', icon: ShoppingCart },
                  { id: 'webapp', icon: Code2 },
                ].map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setValue('projectType', item.id as any /* eslint-disable-line @typescript-eslint/no-explicit-any */, { shouldValidate: true })}
                    className={cn(
                      'cursor-pointer p-6 rounded-xl border-2 transition-all duration-200 hover:border-accent-orange/50 bg-bg-surface',
                      formData.projectType === item.id
                        ? 'border-accent-orange bg-accent-orange/5'
                        : 'border-border'
                    )}
                  >
                    <item.icon className={cn(
                      "w-8 h-8 mb-4",
                      formData.projectType === item.id ? "text-accent-orange" : "text-text-muted"
                    )} />
                    <h3 className="text-lg font-semibold text-text-primary mb-2">
                      {t(`projectTypes.${item.id}.title`)}
                    </h3>
                    <p className="text-sm text-text-secondary">
                      {t(`projectTypes.${item.id}.description`)}
                    </p>
                  </div>
                ))}
                {errors.projectType && (
                  <p className="text-error text-sm col-span-full">{t('validation.required')}</p>
                )}
              </div>
            )}

            {/* STEP 2: PAGES & DESIGN */}
            {currentStep === 'details' && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-semibold text-text-primary mb-4">{t('pages.label')}</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {['1-3', '4-7', '8-15', '15+'].map((range) => (
                      <div
                        key={range}
                        onClick={() => setValue('pages', range as any /* eslint-disable-line @typescript-eslint/no-explicit-any */, { shouldValidate: true })}
                        className={cn(
                          'cursor-pointer p-4 rounded-lg border-2 text-center transition-all bg-bg-surface',
                          formData.pages === range
                            ? 'border-accent-orange bg-accent-orange/5 text-accent-orange font-bold'
                            : 'border-border text-text-secondary hover:border-accent-orange/30'
                        )}
                      >
                        {t(`pages.${range}`)}
                      </div>
                    ))}
                  </div>
                  {errors.pages && <p className="text-error text-sm mt-2">{t('validation.required')}</p>}
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-text-primary mb-4">{t('design.label')}</h3>
                  <div className="grid sm:grid-cols-3 gap-4">
                    {['template', 'custom', 'existing'].map((option) => (
                      <div
                        key={option}
                        onClick={() => setValue('design', option as any /* eslint-disable-line @typescript-eslint/no-explicit-any */, { shouldValidate: true })}
                        className={cn(
                          'cursor-pointer p-4 rounded-lg border-2 transition-all bg-bg-surface',
                          formData.design === option
                            ? 'border-accent-orange bg-accent-orange/5'
                            : 'border-border hover:border-accent-orange/30'
                        )}
                      >
                        <div className="font-semibold text-text-primary mb-1">
                          {t(`designOptions.${option}.title`)}
                        </div>
                        <div className="text-xs text-text-secondary">
                          {t(`designOptions.${option}.description`)}
                        </div>
                      </div>
                    ))}
                  </div>
                  {errors.design && <p className="text-error text-sm mt-2">{t('validation.required')}</p>}
                </div>
              </div>
            )}

            {/* STEP 3: FEATURES */}
            {currentStep === 'features' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  'contact_form', 'booking', 'blog', 'multilang',
                  'auth', 'payments', 'seo', 'analytics'
                ].map((feature) => {
                  const isSelected = formData.features?.includes(feature as any /* eslint-disable-line @typescript-eslint/no-explicit-any */)
                  return (
                    <div
                      key={feature}
                      onClick={() => {
                        const current = formData.features || []
                        const updated = isSelected
                          ? current.filter(f => f !== feature)
                          : [...current, feature]
                        setValue('features', updated as any /* eslint-disable-line @typescript-eslint/no-explicit-any */)
                      }}
                      className={cn(
                        'cursor-pointer p-4 rounded-lg border-2 flex items-center justify-between transition-all bg-bg-surface',
                        isSelected
                          ? 'border-accent-orange bg-accent-orange/5'
                          : 'border-border hover:border-accent-orange/30'
                      )}
                    >
                      <div>
                        <div className={cn("font-medium", isSelected ? "text-accent-orange" : "text-text-primary")}>
                          {t(`featuresList.${feature}.title`)}
                        </div>
                        <div className="text-xs text-text-secondary mt-1">
                          {t(`featuresList.${feature}.description`)}
                        </div>
                      </div>
                      {isSelected && <Check className="w-5 h-5 text-accent-orange" />}
                    </div>
                  )
                })}
              </div>
            )}

            {/* STEP 4: CMS & TIMELINE */}
            {currentStep === 'timeline' && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-semibold text-text-primary mb-4">{t('cms.label')}</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {['yes', 'no'].map((option) => (
                      <div
                        key={option}
                        onClick={() => setValue('cms', option as any /* eslint-disable-line @typescript-eslint/no-explicit-any */, { shouldValidate: true })}
                        className={cn(
                          'cursor-pointer p-4 rounded-lg border-2 transition-all bg-bg-surface',
                          formData.cms === option
                            ? 'border-accent-orange bg-accent-orange/5'
                            : 'border-border hover:border-accent-orange/30'
                        )}
                      >
                        <div className="font-semibold text-text-primary mb-1">
                          {t(`cmsOptions.${option}.title`)}
                        </div>
                        <div className="text-xs text-text-secondary">
                          {t(`cmsOptions.${option}.description`)}
                        </div>
                      </div>
                    ))}
                  </div>
                  {errors.cms && <p className="text-error text-sm mt-2">{t('validation.required')}</p>}
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-text-primary mb-4">{t('timeline.label')}</h3>
                  <div className="grid sm:grid-cols-3 gap-4">
                    {['standard', 'urgent', 'flexible'].map((option) => (
                      <div
                        key={option}
                        onClick={() => setValue('timeline', option as any /* eslint-disable-line @typescript-eslint/no-explicit-any */, { shouldValidate: true })}
                        className={cn(
                          'cursor-pointer p-4 rounded-lg border-2 transition-all bg-bg-surface',
                          formData.timeline === option
                            ? 'border-accent-orange bg-accent-orange/5'
                            : 'border-border hover:border-accent-orange/30'
                        )}
                      >
                        <div className="font-semibold text-text-primary mb-1">
                          {t(`timelineOptions.${option}.title`)}
                        </div>
                        <div className="text-xs text-text-secondary">
                          {t(`timelineOptions.${option}.description`)}
                        </div>
                      </div>
                    ))}
                  </div>
                  {errors.timeline && <p className="text-error text-sm mt-2">{t('validation.required')}</p>}
                </div>
              </div>
            )}

            {/* STEP 5: CONTACT INFO */}
            {currentStep === 'contact' && (
              <div className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      {t('form.nome')} <span className="text-error">*</span>
                    </label>
                    <Input {...register('nome')} error={!!errors.nome} />
                    {errors.nome && <p className="text-error text-xs mt-1">{t(errors.nome.message as any /* eslint-disable-line @typescript-eslint/no-explicit-any */)}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      {t('form.cognome')} <span className="text-error">*</span>
                    </label>
                    <Input {...register('cognome')} error={!!errors.cognome} />
                    {errors.cognome && <p className="text-error text-xs mt-1">{t(errors.cognome.message as any /* eslint-disable-line @typescript-eslint/no-explicit-any */)}</p>}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      {t('form.email')} <span className="text-error">*</span>
                    </label>
                    <Input {...register('email')} type="email" error={!!errors.email} />
                    {errors.email && <p className="text-error text-xs mt-1">{t(errors.email.message as any /* eslint-disable-line @typescript-eslint/no-explicit-any */)}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      {t('form.telefono')} <span className="text-error">*</span>
                    </label>
                    <Input {...register('telefono')} type="tel" error={!!errors.telefono} />
                    {errors.telefono && <p className="text-error text-xs mt-1">{t(errors.telefono.message as any /* eslint-disable-line @typescript-eslint/no-explicit-any */)}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    {t('form.azienda')}
                  </label>
                  <Input {...register('azienda')} />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    {t('form.messaggio')}
                  </label>
                  <Textarea {...register('messaggio')} rows={4} />
                </div>

                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="privacy"
                    className="mt-1 w-4 h-4 rounded border-border bg-bg-elevated text-accent-orange focus:ring-accent-orange"
                    {...register('privacy')}
                  />
                  <label htmlFor="privacy" className="text-sm text-text-secondary">
                    {t('form.privacy')}{' '}
                    <Link href="/privacy-policy" className="text-accent-orange hover:underline">
                      {t('form.privacyLink')}
                    </Link>{' '}
                    <span className="text-error">*</span>
                  </label>
                </div>
                {errors.privacy && <p className="text-error text-xs">{t(errors.privacy.message as any /* eslint-disable-line @typescript-eslint/no-explicit-any */)}</p>}
              </div>
            )}

            {/* STEP 6: SUMMARY */}
            {currentStep === 'summary' && (
              <QuoteSummary data={formData} />
            )}
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-between pt-8 border-t border-border">
          <Button
            type="button"
            variant="secondary"
            onClick={prevStep}
            disabled={currentStep === 'project' || isSubmitting}
            className={cn(currentStep === 'project' && 'invisible')}
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            {t('buttons.back')}
          </Button>

          {currentStep === 'summary' ? (
            <div className="flex flex-col items-end gap-2">
              <Button type="submit" size="lg" disabled={isSubmitting} className="min-w-[200px]">
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    {t('buttons.submitting')}
                  </>
                ) : (
                  <>
                    {t('buttons.submit')}
                    <Check className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
              <span className="text-xs text-text-muted">{t('buttons.submitNote')}</span>
            </div>
          ) : (
            <Button type="button" onClick={nextStep}>
              {t('buttons.next')}
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </form>
    </div>
  )
}
