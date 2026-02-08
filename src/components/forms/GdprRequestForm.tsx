'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Send, CheckCircle, AlertCircle, Loader2, Shield } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  gdprRequestSchema,
  requestTypes,
  type GdprRequestData,
} from '@/lib/validations/gdpr'

type FormStatus = 'idle' | 'loading' | 'success' | 'error'

interface SuccessData {
  requestId: string
  email: string
}

export function GdprRequestForm() {
  const t = useTranslations('gdprRequest')
  const tValidation = useTranslations('gdprRequest.validation')
  const [status, setStatus] = useState<FormStatus>('idle')
  const [successData, setSuccessData] = useState<SuccessData | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<GdprRequestData>({
    resolver: zodResolver(gdprRequestSchema),
    defaultValues: {
      confirmIdentity: false,
      confirmTruthful: false,
      privacyAccepted: false,
    },
  })

  const selectedRequestType = watch('requestType')

  const getErrorMessage = (errorKey: string | undefined): string => {
    if (!errorKey) return ''
    // Extract the key from "validation.xxx" format
    const key = errorKey.replace('validation.', '')
    return tValidation(key)
  }

  const onSubmit = async (data: GdprRequestData) => {
    setStatus('loading')

    try {
      const response = await fetch('/api/gdpr-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || 'Failed to send')
      }

      setSuccessData({
        requestId: result.requestId,
        email: data.email,
      })
      setStatus('success')
      reset()
    } catch {
      setStatus('error')
    }
  }

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: 'easeOut' },
    },
  }

  const successVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: 'spring', damping: 20 },
    },
  }

  return (
    <AnimatePresence mode="wait">
      {status === 'success' && successData ? (
        <motion.div
          key="success"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={successVariants}
          className="text-center py-16 px-8 rounded-xl border border-accent-orange/30 bg-bg-surface/60 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.2 }}
            className="w-20 h-20 mx-auto rounded-full bg-accent-orange/20 flex items-center justify-center mb-6"
          >
            <CheckCircle className="w-10 h-10 text-accent-orange" />
          </motion.div>
          <h3 className="text-2xl font-heading font-bold text-text-primary mb-4">
            {t('successTitle')}
          </h3>
          <p className="text-text-secondary mb-2">
            {t('successMessage', { requestId: successData.requestId })}
          </p>
          <p className="text-text-muted text-sm mb-8">
            {t('successEmailNote', { email: successData.email })}
          </p>
          <Link href="/">
            <Button variant="secondary">{t('backToHome')}</Button>
          </Link>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={formVariants}
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-8 p-6 md:p-8 rounded-xl border border-border/50 bg-bg-surface/60 backdrop-blur-sm"
        >
          {/* Section 1: Personal Data */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-accent-orange/20 flex items-center justify-center">
                <span className="text-sm font-bold text-accent-orange">1</span>
              </div>
              <h3 className="text-lg font-heading font-semibold text-text-primary">
                {t('section1.title')}
              </h3>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium text-text-primary mb-2"
                >
                  {t('form.fullName')} <span className="text-error">*</span>
                </label>
                <Input
                  id="fullName"
                  placeholder={t('form.fullNamePlaceholder')}
                  error={!!errors.fullName}
                  {...register('fullName')}
                />
                {errors.fullName && (
                  <p className="mt-1 text-xs text-error">
                    {getErrorMessage(errors.fullName.message)}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-text-primary mb-2"
                >
                  {t('form.email')} <span className="text-error">*</span>
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder={t('form.emailPlaceholder')}
                  error={!!errors.email}
                  {...register('email')}
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-error">
                    {getErrorMessage(errors.email.message)}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-text-primary mb-2"
              >
                {t('form.phone')}
              </label>
              <Input
                id="phone"
                type="tel"
                placeholder={t('form.phonePlaceholder')}
                error={!!errors.phone}
                {...register('phone')}
              />
              {errors.phone && (
                <p className="mt-1 text-xs text-error">
                  {getErrorMessage(errors.phone.message)}
                </p>
              )}
            </div>
          </div>

          {/* Section 2: Request Type */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-accent-orange/20 flex items-center justify-center">
                <span className="text-sm font-bold text-accent-orange">2</span>
              </div>
              <h3 className="text-lg font-heading font-semibold text-text-primary">
                {t('section2.title')}
              </h3>
            </div>

            <div className="grid gap-3">
              {requestTypes.map((type) => (
                <label
                  key={type.value}
                  className={`relative flex items-start gap-4 p-4 rounded-lg border cursor-pointer transition-all ${
                    selectedRequestType === type.value
                      ? 'border-accent-orange bg-accent-orange/5'
                      : 'border-border hover:border-border/80 bg-bg-elevated/50'
                  }`}
                >
                  <input
                    type="radio"
                    value={type.value}
                    className="sr-only"
                    {...register('requestType')}
                    onChange={() => setValue('requestType', type.value)}
                  />
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex-shrink-0 mt-0.5 transition-colors ${
                      selectedRequestType === type.value
                        ? 'border-accent-orange bg-accent-orange'
                        : 'border-border'
                    }`}
                  >
                    {selectedRequestType === type.value && (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-medium text-text-primary">
                        {t(`requestTypes.${type.labelKey}`)}
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded bg-bg-elevated text-text-muted">
                        {type.article}
                      </span>
                    </div>
                    <p className="text-sm text-text-muted mt-1">
                      {t(`requestTypes.${type.descKey}`)}
                    </p>
                  </div>
                </label>
              ))}
            </div>
            {errors.requestType && (
              <p className="text-xs text-error">
                {getErrorMessage(errors.requestType.message)}
              </p>
            )}
          </div>

          {/* Section 3: Details */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-accent-orange/20 flex items-center justify-center">
                <span className="text-sm font-bold text-accent-orange">3</span>
              </div>
              <h3 className="text-lg font-heading font-semibold text-text-primary">
                {t('section3.title')}
              </h3>
            </div>

            <div>
              <label
                htmlFor="details"
                className="block text-sm font-medium text-text-primary mb-2"
              >
                {t('form.details')}
              </label>
              <Textarea
                id="details"
                placeholder={t('form.detailsPlaceholder')}
                rows={4}
                error={!!errors.details}
                {...register('details')}
              />
              <p className="mt-1 text-xs text-text-muted">
                {t('form.detailsHelper')}
              </p>
              {errors.details && (
                <p className="mt-1 text-xs text-error">
                  {getErrorMessage(errors.details.message)}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="emailUsed"
                className="block text-sm font-medium text-text-primary mb-2"
              >
                {t('form.emailUsed')}
              </label>
              <Input
                id="emailUsed"
                type="email"
                placeholder={t('form.emailUsedPlaceholder')}
                error={!!errors.emailUsed}
                {...register('emailUsed')}
              />
              <p className="mt-1 text-xs text-text-muted">
                {t('form.emailUsedHelper')}
              </p>
              {errors.emailUsed && (
                <p className="mt-1 text-xs text-error">
                  {getErrorMessage(errors.emailUsed.message)}
                </p>
              )}
            </div>
          </div>

          {/* Section 4: Confirmations */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-accent-orange/20 flex items-center justify-center">
                <span className="text-sm font-bold text-accent-orange">4</span>
              </div>
              <h3 className="text-lg font-heading font-semibold text-text-primary">
                {t('section4.title')}
              </h3>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="confirmIdentity"
                  className="mt-1 w-4 h-4 rounded border-border bg-bg-elevated text-accent-orange focus:ring-accent-orange focus:ring-offset-bg-primary"
                  {...register('confirmIdentity')}
                />
                <label
                  htmlFor="confirmIdentity"
                  className="text-sm text-text-secondary"
                >
                  {t('form.confirmIdentity')}{' '}
                  <span className="text-error">*</span>
                </label>
              </div>
              {errors.confirmIdentity && (
                <p className="text-xs text-error ml-7">
                  {getErrorMessage(errors.confirmIdentity.message)}
                </p>
              )}

              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="confirmTruthful"
                  className="mt-1 w-4 h-4 rounded border-border bg-bg-elevated text-accent-orange focus:ring-accent-orange focus:ring-offset-bg-primary"
                  {...register('confirmTruthful')}
                />
                <label
                  htmlFor="confirmTruthful"
                  className="text-sm text-text-secondary"
                >
                  {t('form.confirmTruthful')}{' '}
                  <span className="text-error">*</span>
                </label>
              </div>
              {errors.confirmTruthful && (
                <p className="text-xs text-error ml-7">
                  {getErrorMessage(errors.confirmTruthful.message)}
                </p>
              )}

              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="privacyAccepted"
                  className="mt-1 w-4 h-4 rounded border-border bg-bg-elevated text-accent-orange focus:ring-accent-orange focus:ring-offset-bg-primary"
                  {...register('privacyAccepted')}
                />
                <label
                  htmlFor="privacyAccepted"
                  className="text-sm text-text-secondary"
                >
                  {t('form.privacyAccepted')}{' '}
                  <Link
                    href="/privacy-policy"
                    className="text-accent-orange hover:underline"
                  >
                    {t('form.privacyLink')}
                  </Link>{' '}
                  <span className="text-error">*</span>
                </label>
              </div>
              {errors.privacyAccepted && (
                <p className="text-xs text-error ml-7">
                  {getErrorMessage(errors.privacyAccepted.message)}
                </p>
              )}
            </div>
          </div>

          {/* Error Message */}
          {status === 'error' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 p-4 rounded-lg bg-error/10 border border-error/30"
            >
              <AlertCircle className="w-5 h-5 text-error flex-shrink-0" />
              <p className="text-sm text-error">{t('errorMessage')}</p>
            </motion.div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            size="lg"
            className="w-full"
            disabled={status === 'loading'}
          >
            {status === 'loading' ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                {t('submitting')}
              </>
            ) : (
              <>
                <Shield className="w-5 h-5 mr-2" />
                {t('submit')}
              </>
            )}
          </Button>
        </motion.form>
      )}
    </AnimatePresence>
  )
}
