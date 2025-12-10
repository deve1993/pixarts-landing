import { z } from 'zod'

// ============================================================================
// BOOKING FORM SCHEMA
// ============================================================================

export const bookingFormSchema = z.object({
  nome: z
    .string()
    .min(2, 'validation.nomeMin')
    .max(50, 'validation.nomeMax'),
  cognome: z
    .string()
    .min(2, 'validation.cognomeMin')
    .max(50, 'validation.cognomeMax'),
  email: z
    .string()
    .email('validation.emailInvalid'),
  telefono: z
    .string()
    .regex(/^[\d\s+\-()]{8,20}$/, 'validation.telefonoInvalid'),
  azienda: z
    .string()
    .max(100, 'validation.aziendaMax')
    .optional()
    .or(z.literal('')),
  ruolo: z
    .string()
    .max(50, 'validation.ruoloMax')
    .optional()
    .or(z.literal('')),
  messaggio: z
    .string()
    .max(1000, 'validation.messaggioMax')
    .optional()
    .or(z.literal('')),
  privacy: z
    .boolean()
    .refine((val) => val === true, 'validation.privacyRequired'),
})

// ============================================================================
// TIME SLOT SCHEMA
// ============================================================================

export const timeSlotSchema = z.object({
  id: z.string(),
  startTime: z.string(),
  endTime: z.string(),
  available: z.boolean(),
})

// ============================================================================
// LOCALE SCHEMA
// ============================================================================

export const localeSchema = z.enum(['it', 'en', 'cs']).default('it')

// ============================================================================
// BOOKING REQUEST SCHEMA
// ============================================================================

export const bookingRequestSchema = z.object({
  slot: timeSlotSchema,
  cliente: bookingFormSchema,
  locale: localeSchema,
})

// ============================================================================
// TYPES
// ============================================================================

export type BookingFormValues = z.infer<typeof bookingFormSchema>
export type TimeSlotValues = z.infer<typeof timeSlotSchema>
export type BookingRequestValues = z.infer<typeof bookingRequestSchema>
