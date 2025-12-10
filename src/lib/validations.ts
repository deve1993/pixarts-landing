import { z } from 'zod'

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Il nome deve contenere almeno 2 caratteri')
    .max(100, 'Il nome è troppo lungo'),
  email: z
    .string()
    .email('Inserisci un indirizzo email valido')
    .min(5, 'Email troppo corta'),
  phone: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^[\d\s\+\-\(\)]+$/.test(val),
      'Formato telefono non valido'
    ),
  projectType: z.enum(['landing', 'website', 'ecommerce', 'other'], {
    required_error: 'Seleziona un tipo di progetto',
  }),
  budget: z.enum(['1-2k', '2-4k', '4-6k', '6k+'], {
    required_error: 'Seleziona un budget',
  }),
  message: z.string().max(1000, 'Messaggio troppo lungo').optional(),
  privacy: z.boolean().refine((val) => val === true, {
    message: 'Devi accettare la privacy policy',
  }),
})

export type ContactFormData = z.infer<typeof contactFormSchema>
