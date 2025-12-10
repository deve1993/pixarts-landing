'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { bookingFormSchema, type BookingFormValues } from '@/lib/validations/booking'

// ============================================================================
// BOOKING FORM - Client Data Collection
// ============================================================================

interface BookingFormProps {
  onSubmit: (data: BookingFormValues) => void
  isLoading?: boolean
  defaultValues?: Partial<BookingFormValues>
}

export function BookingForm({ onSubmit, isLoading, defaultValues }: BookingFormProps) {
  const t = useTranslations('booking.form')
  const tValidation = useTranslations('booking.validation')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      nome: '',
      cognome: '',
      email: '',
      telefono: '',
      azienda: '',
      ruolo: '',
      messaggio: '',
      privacy: false,
      ...defaultValues,
    },
  })

  const getErrorMessage = (errorKey: string | undefined): string => {
    if (!errorKey) return ''
    const key = errorKey.replace('validation.', '')
    return tValidation(key)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Nome e Cognome */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="nome"
            className="block text-sm font-medium text-text-primary mb-2"
          >
            {t('nome')} <span className="text-error">*</span>
          </label>
          <Input
            id="nome"
            placeholder={t('nomePlaceholder')}
            error={!!errors.nome}
            {...register('nome')}
          />
          {errors.nome && (
            <p className="mt-1 text-xs text-error">
              {getErrorMessage(errors.nome.message)}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="cognome"
            className="block text-sm font-medium text-text-primary mb-2"
          >
            {t('cognome')} <span className="text-error">*</span>
          </label>
          <Input
            id="cognome"
            placeholder={t('cognomePlaceholder')}
            error={!!errors.cognome}
            {...register('cognome')}
          />
          {errors.cognome && (
            <p className="mt-1 text-xs text-error">
              {getErrorMessage(errors.cognome.message)}
            </p>
          )}
        </div>
      </div>

      {/* Email */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-text-primary mb-2"
        >
          {t('email')} <span className="text-error">*</span>
        </label>
        <Input
          id="email"
          type="email"
          placeholder={t('emailPlaceholder')}
          error={!!errors.email}
          {...register('email')}
        />
        {errors.email && (
          <p className="mt-1 text-xs text-error">
            {getErrorMessage(errors.email.message)}
          </p>
        )}
      </div>

      {/* Telefono */}
      <div>
        <label
          htmlFor="telefono"
          className="block text-sm font-medium text-text-primary mb-2"
        >
          {t('telefono')} <span className="text-error">*</span>
        </label>
        <Input
          id="telefono"
          type="tel"
          placeholder={t('telefonoPlaceholder')}
          error={!!errors.telefono}
          {...register('telefono')}
        />
        {errors.telefono && (
          <p className="mt-1 text-xs text-error">
            {getErrorMessage(errors.telefono.message)}
          </p>
        )}
      </div>

      {/* Azienda e Ruolo */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="azienda"
            className="block text-sm font-medium text-text-primary mb-2"
          >
            {t('azienda')}
          </label>
          <Input
            id="azienda"
            placeholder={t('aziendaPlaceholder')}
            error={!!errors.azienda}
            {...register('azienda')}
          />
          {errors.azienda && (
            <p className="mt-1 text-xs text-error">
              {getErrorMessage(errors.azienda.message)}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="ruolo"
            className="block text-sm font-medium text-text-primary mb-2"
          >
            {t('ruolo')}
          </label>
          <Input
            id="ruolo"
            placeholder={t('ruoloPlaceholder')}
            error={!!errors.ruolo}
            {...register('ruolo')}
          />
          {errors.ruolo && (
            <p className="mt-1 text-xs text-error">
              {getErrorMessage(errors.ruolo.message)}
            </p>
          )}
        </div>
      </div>

      {/* Messaggio */}
      <div>
        <label
          htmlFor="messaggio"
          className="block text-sm font-medium text-text-primary mb-2"
        >
          {t('messaggio')}
        </label>
        <Textarea
          id="messaggio"
          placeholder={t('messaggioPlaceholder')}
          rows={4}
          error={!!errors.messaggio}
          {...register('messaggio')}
        />
        <p className="mt-1 text-xs text-text-muted">{t('messaggioHelper')}</p>
        {errors.messaggio && (
          <p className="mt-1 text-xs text-error">
            {getErrorMessage(errors.messaggio.message)}
          </p>
        )}
      </div>

      {/* Privacy Checkbox */}
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          id="privacy"
          className="mt-1 w-4 h-4 rounded border-border bg-bg-elevated text-accent-orange focus:ring-accent-orange focus:ring-offset-bg-primary"
          {...register('privacy')}
        />
        <label htmlFor="privacy" className="text-sm text-text-secondary">
          {t('privacy')}{' '}
          <Link href="/privacy-policy" className="text-accent-orange hover:underline">
            {t('privacyLink')}
          </Link>{' '}
          <span className="text-error">*</span>
        </label>
      </div>
      {errors.privacy && (
        <p className="text-xs text-error">{getErrorMessage(errors.privacy.message)}</p>
      )}

      {/* Submit Button */}
      <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
        {isLoading ? t('submitting') : t('submit')}
      </Button>
    </form>
  )
}
