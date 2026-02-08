// ============================================================================
// BOOKING CONFIGURATION
// ============================================================================

export const BOOKING_CONFIG = {
  // Durata appuntamento
  slotDuration: 60, // minuti per appuntamento
  bufferBetween: 15, // minuti buffer tra appuntamenti

  // Orari disponibili
  workingHours: {
    start: 9, // 09:00
    end: 18, // 18:00 (ultimo slot alle 17:00)
  },

  // Giorni lavorativi (0 = domenica, 6 = sabato)
  workingDays: [1, 2, 3, 4, 5], // lun-ven

  // Restrizioni
  minAdvanceHours: 24, // minimo 24h di anticipo
  maxAdvanceDays: 30, // massimo 30 giorni avanti

  // Timezone
  timezone: 'Europe/Rome',

  // Info appuntamento
  appointmentType: 'Briefing Call Gratuito',
  appointmentDescription:
    'Chiamata conoscitiva per discutere il tuo progetto web.',

  // Contatti
  adminEmail: process.env.BOOKING_ADMIN_EMAIL || 'daniel@pixarts.eu',
  fromEmail: process.env.RESEND_FROM_EMAIL || 'prenotazioni@pixarts.eu',
  brandName: 'Pixarts',
  websiteUrl: 'https://pixarts.eu',
} as const

export type BookingConfig = typeof BOOKING_CONFIG
