import { z } from 'zod'

export const quoteFormSchema = z.object({
  projectType: z.enum(['landing', 'website', 'ecommerce', 'webapp']),
  pages: z.enum(['1-3', '4-7', '8-15', '15+']),
  design: z.enum(['template', 'custom', 'existing']),
  features: z.array(z.enum(['contact_form', 'booking', 'blog', 'multilang', 'auth', 'payments', 'seo', 'analytics'])),
  cms: z.enum(['yes', 'no']),
  timeline: z.enum(['standard', 'urgent', 'flexible']),
  nome: z.string().min(2, 'validation.nomeMin'),
  cognome: z.string().min(2, 'validation.cognomeMin'),
  email: z.string().email('validation.emailInvalid'),
  telefono: z.string().regex(/^[\d\s+\-()]{8,20}$/, 'validation.telefonoInvalid'),
  azienda: z.string().optional().or(z.literal('')),
  messaggio: z.string().optional().or(z.literal('')),
  privacy: z.boolean().refine((val) => val === true, 'validation.privacyRequired'),
  // Anti-spam fields
  _hp: z.string().optional(), // Honeypot - must be empty
  _ts: z.number().optional(), // Timestamp - form load time
})

export type QuoteFormValues = z.infer<typeof quoteFormSchema>
