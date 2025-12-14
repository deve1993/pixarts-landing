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
            {t('nome')} <span className="text-error" aria-hidden="true">*</span>
          </label>
          <Input
            id="nome"
            placeholder={t('nomePlaceholder')}
            error={!!errors.nome}
            aria-required="true"
            aria-invalid={!!errors.nome}
            aria-describedby={errors.nome ? 'nome-error' : undefined}
            {...register('nome')}
          />
          {errors.nome && (
            <p id="nome-error" role="alert" className="mt-1 text-xs text-error">
              {getErrorMessage(errors.nome.message)}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="cognome"
            className="block text-sm font-medium text-text-primary mb-2"
          >
            {t('cognome')} <span className="text-error" aria-hidden="true">*</span>
          </label>
          <Input
            id="cognome"
            placeholder={t('cognomePlaceholder')}
            error={!!errors.cognome}
            aria-required="true"
            aria-invalid={!!errors.cognome}
            aria-describedby={errors.cognome ? 'cognome-error' : undefined}
            {...register('cognome')}
          />
          {errors.cognome && (
            <p id="cognome-error" role="alert" className="mt-1 text-xs text-error">
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
          {t('email')} <span className="text-error" aria-hidden="true">*</span>
        </label>
        <Input
          id="email"
          type="email"
          placeholder={t('emailPlaceholder')}
          error={!!errors.email}
          aria-required="true"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'email-error' : undefined}
          {...register('email')}
        />
        {errors.email && (
          <p id="email-error" role="alert" className="mt-1 text-xs text-error">
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
          {t('telefono')} <span className="text-error" aria-hidden="true">*</span>
        </label>
        <Input
          id="telefono"
          type="tel"
          placeholder={t('telefonoPlaceholder')}
          error={!!errors.telefono}
          aria-required="true"
          aria-invalid={!!errors.telefono}
          aria-describedby={errors.telefono ? 'telefono-error' : undefined}
          {...register('telefono')}
        />
        {errors.telefono && (
          <p id="telefono-error" role="alert" className="mt-1 text-xs text-error">
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
            aria-invalid={!!errors.azienda}
            aria-describedby={errors.azienda ? 'azienda-error' : undefined}
            {...register('azienda')}
          />
          {errors.azienda && (
            <p id="azienda-error" role="alert" className="mt-1 text-xs text-error">
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
            aria-invalid={!!errors.ruolo}
            aria-describedby={errors.ruolo ? 'ruolo-error' : undefined}
            {...register('ruolo')}
          />
          {errors.ruolo && (
            <p id="ruolo-error" role="alert" className="mt-1 text-xs text-error">
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
          aria-invalid={!!errors.messaggio}
          aria-describedby="messaggio-helper messaggio-error"
          {...register('messaggio')}
        />
        <p id="messaggio-helper" className="mt-1 text-xs text-text-muted">{t('messaggioHelper')}</p>
        {errors.messaggio && (
          <p id="messaggio-error" role="alert" className="mt-1 text-xs text-error">
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
          aria-required="true"
          aria-invalid={!!errors.privacy}
          aria-describedby={errors.privacy ? 'privacy-error' : undefined}
          {...register('privacy')}
        />
        <label htmlFor="privacy" className="text-sm text-text-secondary">
          {t('privacy')}{' '}
          <Link href="/privacy-policy" className="text-accent-orange hover:underline">
            {t('privacyLink')}
          </Link>{' '}
          <span className="text-error" aria-hidden="true">*</span>
        </label>
      </div>
      {errors.privacy && (
        <p id="privacy-error" role="alert" className="text-xs text-error">{getErrorMessage(errors.privacy.message)}</p>
      )}

      {/* Submit Button */}
      <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
        {isLoading ? t('submitting') : t('submit')}
      </Button>
    </form>
  )
}
