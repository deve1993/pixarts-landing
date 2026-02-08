'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Section } from '@/components/ui/section'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select } from '@/components/ui/select'
import { BookingCard } from '@/components/booking'
import { Link } from '@/i18n/routing'
import { contactFormSchema, type ContactFormData } from '@/lib/validations'
import { staggerContainer, staggerItem } from '@/lib/motion-variants'

type FormStatus = 'idle' | 'loading' | 'success' | 'error'

const PROJECT_TYPE_KEYS = ['landing', 'website', 'ecommerce', 'other'] as const
const BUDGET_KEYS = ['1-2k', '2-4k', '4-6k', '6k+'] as const

export function CTAFinal() {
  const t = useTranslations('cta')
  const tBooking = useTranslations('booking')
  const [status, setStatus] = useState<FormStatus>('idle')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    setStatus('loading')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) throw new Error('Failed to send')

      setStatus('success')
      reset()
    } catch {
      setStatus('error')
    }
  }

  return (
    <Section id="contatti">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={staggerContainer}
        className="relative"
      >
        {/* Header */}
        <motion.div variants={staggerItem} className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-text-primary mb-4">
            {t('title')}
          </h2>
          <p className="text-lg text-text-secondary max-w-xl mx-auto">
            {t('description')}
          </p>
        </motion.div>

        {/* Two Column Layout: Form + Booking */}
        <div className="grid lg:grid-cols-2 gap-8 items-stretch">
          {/* Left Column: Contact Form */}
          <motion.div variants={staggerItem} className="h-full">
            {status === 'success' ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16 px-8 rounded-2xl border border-accent-orange/30 bg-bg-surface/60 backdrop-blur-sm"
            >
              <div className="w-16 h-16 mx-auto rounded-full bg-accent-orange/20 flex items-center justify-center mb-6">
                <CheckCircle className="w-8 h-8 text-accent-orange" />
              </div>
              <h3 className="text-2xl font-heading font-bold text-text-primary mb-2">
                {t('successTitle')}
              </h3>
              <p className="text-text-secondary mb-6">
                {t('successMessage')}
              </p>
              <Button
                variant="secondary"
                onClick={() => setStatus('idle')}
              >
                {t('sendAnother')}
              </Button>
            </motion.div>
          ) : (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-6 p-8 rounded-2xl border border-border/50 bg-bg-surface/60 backdrop-blur-sm"
            >
              {/* Name & Email Row */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-text-primary mb-2"
                  >
                    {t('form.name')} {t('form.required')}
                  </label>
                  <Input
                    id="name"
                    placeholder={t('form.namePlaceholder')}
                    error={!!errors.name}
                    {...register('name')}
                  />
                  {errors.name && (
                    <p className="mt-1 text-xs text-error">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-text-primary mb-2"
                  >
                    {t('form.email')} {t('form.required')}
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
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Phone */}
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
                    {errors.phone.message}
                  </p>
                )}
              </div>

              {/* Project Type & Budget Row */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="projectType"
                    className="block text-sm font-medium text-text-primary mb-2"
                  >
                    {t('form.projectType')} {t('form.required')}
                  </label>
                  <Select
                    id="projectType"
                    error={!!errors.projectType}
                    {...register('projectType')}
                  >
                    <option value="">{t('form.projectTypePlaceholder')}</option>
                    {PROJECT_TYPE_KEYS.map((key) => (
                      <option key={key} value={key}>
                        {t(`projectTypes.${key}`)}
                      </option>
                    ))}
                  </Select>
                  {errors.projectType && (
                    <p className="mt-1 text-xs text-error">
                      {errors.projectType.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="budget"
                    className="block text-sm font-medium text-text-primary mb-2"
                  >
                    {t('form.budget')} {t('form.required')}
                  </label>
                  <Select
                    id="budget"
                    error={!!errors.budget}
                    {...register('budget')}
                  >
                    <option value="">{t('form.budgetPlaceholder')}</option>
                    {BUDGET_KEYS.map((key) => (
                      <option key={key} value={key}>
                        {t(`budgetOptions.${key}`)}
                      </option>
                    ))}
                  </Select>
                  {errors.budget && (
                    <p className="mt-1 text-xs text-error">
                      {errors.budget.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-text-primary mb-2"
                >
                  {t('form.message')}
                </label>
                <Textarea
                  id="message"
                  placeholder={t('form.messagePlaceholder')}
                  error={!!errors.message}
                  {...register('message')}
                />
                {errors.message && (
                  <p className="mt-1 text-xs text-error">
                    {errors.message.message}
                  </p>
                )}
              </div>

              {/* Privacy */}
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="privacy"
                  className="mt-1 w-4 h-4 rounded border-border bg-bg-elevated text-accent-orange focus:ring-accent-orange focus:ring-offset-bg-primary"
                  {...register('privacy')}
                />
                <label
                  htmlFor="privacy"
                  className="text-sm text-text-secondary"
                >
                  {t('form.privacy')}{' '}
                  <Link
                    href="/privacy-policy"
                    className="text-accent-orange hover:underline"
                  >
                    {t('form.privacyLink')}
                  </Link>{' '}
                  {t('form.privacyText')}
                </label>
              </div>
              {errors.privacy && (
                <p className="text-xs text-error">{errors.privacy.message}</p>
              )}

              {/* Error Message */}
              {status === 'error' && (
                <div className="flex items-center gap-2 p-4 rounded-lg bg-error/10 border border-error/30">
                  <AlertCircle className="w-5 h-5 text-error flex-shrink-0" />
                  <p className="text-sm text-error">
                    {t('errorMessage')}
                  </p>
                </div>
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
                    {t('submit')}
                    <Send className="w-5 h-5 ml-2" />
                  </>
                )}
              </Button>
            </form>
          )}
          </motion.div>

          {/* Right Column: Booking Card */}
          <motion.div variants={staggerItem} className="h-full">
            <BookingCard
              labels={{
                title: tBooking('badge'),
                subtitle: tBooking('features.free'),
                features: {
                  duration: tBooking('features.duration'),
                  online: tBooking('features.online'),
                  free: tBooking('features.freeDesc'),
                },
                cta: tBooking('title'),
              }}
            />
          </motion.div>
        </div>
      </motion.div>
    </Section>
  )
}
