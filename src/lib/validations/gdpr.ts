import { z } from 'zod'

export const requestTypes = [
  {
    value: 'access',
    labelKey: 'access',
    descKey: 'accessDesc',
    article: 'Art. 15 GDPR',
  },
  {
    value: 'rectification',
    labelKey: 'rectification',
    descKey: 'rectificationDesc',
    article: 'Art. 16 GDPR',
  },
  {
    value: 'erasure',
    labelKey: 'erasure',
    descKey: 'erasureDesc',
    article: 'Art. 17 GDPR',
  },
  {
    value: 'restriction',
    labelKey: 'restriction',
    descKey: 'restrictionDesc',
    article: 'Art. 18 GDPR',
  },
  {
    value: 'portability',
    labelKey: 'portability',
    descKey: 'portabilityDesc',
    article: 'Art. 20 GDPR',
  },
  {
    value: 'objection',
    labelKey: 'objection',
    descKey: 'objectionDesc',
    article: 'Art. 21 GDPR',
  },
  {
    value: 'consent_withdrawal',
    labelKey: 'consentWithdrawal',
    descKey: 'consentWithdrawalDesc',
    article: 'Art. 7 GDPR',
  },
] as const

export type RequestType = (typeof requestTypes)[number]['value']

export const gdprRequestSchema = z.object({
  // Personal data
  fullName: z
    .string()
    .min(2, 'validation.fullNameMin')
    .max(100, 'validation.fullNameMax'),
  email: z.string().email('validation.emailInvalid'),
  phone: z
    .string()
    .optional()
    .refine((val) => !val || /^[+]?[\d\s\-()]+$/.test(val), {
      message: 'validation.phoneInvalid',
    }),

  // Request type
  requestType: z.enum(
    [
      'access',
      'rectification',
      'erasure',
      'restriction',
      'portability',
      'objection',
      'consent_withdrawal',
    ],
    {
      required_error: 'validation.requestTypeRequired',
    }
  ),

  // Details
  details: z.string().max(1000, 'validation.detailsMax').optional(),
  emailUsed: z
    .string()
    .email('validation.emailInvalid')
    .optional()
    .or(z.literal('')),

  // Confirmations
  confirmIdentity: z.boolean().refine((val) => val === true, {
    message: 'validation.confirmIdentityRequired',
  }),
  confirmTruthful: z.boolean().refine((val) => val === true, {
    message: 'validation.confirmTruthfulRequired',
  }),
  privacyAccepted: z.boolean().refine((val) => val === true, {
    message: 'validation.privacyRequired',
  }),
})

export type GdprRequestData = z.infer<typeof gdprRequestSchema>
