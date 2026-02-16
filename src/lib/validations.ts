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
  projectType: z.enum(['landing', 'website', 'ecommerce', 'other'], {
    required_error: 'Seleziona un tipo di progetto',
  }),
  privacy: z.boolean().refine((val) => val === true, {
    message: 'Devi accettare la privacy policy',
  }),
})

export type ContactFormData = z.infer<typeof contactFormSchema>
