import { Section, Text, Link } from '@react-email/components'
import * as React from 'react'
import { EmailLayout, styles, colors } from './components/Layout'
import { format, parseISO } from 'date-fns'
import {
  clientEmailTranslations,
  dateLocales,
  datePatterns,
  type EmailLocale,
} from './translations'

// ============================================================================
// BOOKING CONFIRMATION - CLIENT EMAIL (Multilingual)
// ============================================================================

interface BookingConfirmationClientProps {
  nome: string
  data: string // ISO string
  meetLink?: string
  locale?: EmailLocale
}

export function BookingConfirmationClient({
  nome = 'Mario',
  data = new Date().toISOString(),
  meetLink = 'https://meet.google.com/xxx-xxxx-xxx',
  locale = 'it',
}: BookingConfirmationClientProps) {
  const t = clientEmailTranslations[locale]
  const dateLocale = dateLocales[locale]
  const datePattern = datePatterns[locale]

  const dataFormattata = format(parseISO(data), datePattern, {
    locale: dateLocale,
  })

  return (
    <EmailLayout preview={t.preview(dataFormattata)} headerSubtitle={t.headerSubtitle}>
      {/* Success Badge */}
      <Section style={{ textAlign: 'center', marginBottom: '24px' }}>
        <Text style={{ fontSize: '48px', margin: '0', color: colors.success }}>
          ✓
        </Text>
      </Section>

      {/* Main Card */}
      <Section style={styles.card}>
        <Text style={styles.heading}>{t.greeting(nome)}</Text>
        <Text style={styles.paragraph}>{t.intro}</Text>

        {/* Appointment Details */}
        <Section style={styles.infoBox}>
          <Text style={styles.infoLabel}>📅 {t.dateLabel}</Text>
          <Text style={styles.infoValue}>{dataFormattata}</Text>
        </Section>

        <Section style={styles.infoBox}>
          <Text style={styles.infoLabel}>⏱️ {t.durationLabel}</Text>
          <Text style={styles.infoValue}>{t.durationValue}</Text>
        </Section>

        <Section style={styles.infoBox}>
          <Text style={styles.infoLabel}>📍 {t.whereLabel}</Text>
          <Text style={styles.infoValue}>{t.whereValue}</Text>
        </Section>

        {/* Meet Button */}
        {meetLink && (
          <Section style={{ textAlign: 'center', margin: '24px 0' }}>
            <Link href={meetLink} style={styles.button}>
              {t.joinButton}
            </Link>
            <Text
              style={{
                color: colors.textMuted,
                fontSize: '13px',
                margin: '12px 0 0 0',
              }}
            >
              {t.linkNote}
            </Text>
          </Section>
        )}
      </Section>

      {/* What to Expect */}
      <Section style={styles.card}>
        <Text style={{ ...styles.heading, fontSize: '18px' }}>{t.whatToExpectTitle}</Text>

        <Text style={styles.paragraph}>
          <span style={{ color: colors.accentOrange }}>→</span> {t.whatToExpect1}
        </Text>
        <Text style={styles.paragraph}>
          <span style={{ color: colors.accentOrange }}>→</span> {t.whatToExpect2}
        </Text>
        <Text style={styles.paragraph}>
          <span style={{ color: colors.accentOrange }}>→</span> {t.whatToExpect3}
        </Text>
      </Section>

      {/* How to Prepare */}
      <Section style={styles.card}>
        <Text style={{ ...styles.heading, fontSize: '18px' }}>{t.howToPrepareTitle}</Text>
        <Text style={styles.paragraph}>{t.howToPrepareIntro}</Text>
        <Text
          style={{
            color: colors.textSecondary,
            fontSize: '14px',
            lineHeight: '1.8',
            margin: '0',
          }}
        >
          • {t.howToPrepare1}
          <br />
          • {t.howToPrepare2}
          <br />• {t.howToPrepare3}
        </Text>
      </Section>

      {/* Reschedule Note */}
      <Section style={{ textAlign: 'center' }}>
        <Text
          style={{
            color: colors.textMuted,
            fontSize: '13px',
            lineHeight: '1.5',
          }}
        >
          {t.rescheduleNote}
        </Text>
      </Section>

      {/* Signature */}
      <Section style={{ textAlign: 'center', marginTop: '24px' }}>
        <Text style={{ color: colors.textSecondary, fontSize: '14px' }}>
          {t.signature}
          <br />
          <strong style={{ color: colors.textPrimary }}>Daniel</strong> — Pixarts
        </Text>
      </Section>
    </EmailLayout>
  )
}

export default BookingConfirmationClient
