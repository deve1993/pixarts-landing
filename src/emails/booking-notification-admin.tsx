import { Section, Text, Link } from '@react-email/components'
import * as React from 'react'
import { EmailLayout, styles, colors } from './components/Layout'
import { format, parseISO } from 'date-fns'
import { it } from 'date-fns/locale'
import { adminEmailTranslations } from './translations'

// ============================================================================
// BOOKING NOTIFICATION - ADMIN EMAIL
// ============================================================================

interface BookingNotificationAdminProps {
  nome: string
  cognome: string
  email: string
  telefono: string
  azienda?: string
  ruolo?: string
  messaggio?: string
  data: string // ISO string
  meetLink?: string
  calendarLink?: string
}

export function BookingNotificationAdmin({
  nome = 'Mario',
  cognome = 'Rossi',
  email = 'mario.rossi@example.com',
  telefono = '+39 123 456 7890',
  azienda,
  ruolo,
  messaggio,
  data = new Date().toISOString(),
  meetLink = 'https://meet.google.com/xxx-xxxx-xxx',
  calendarLink = 'https://calendar.google.com/calendar/event?eid=xxx',
}: BookingNotificationAdminProps) {
  const t = adminEmailTranslations
  const dataFormattata = format(parseISO(data), "EEEE d MMMM yyyy 'alle' HH:mm", {
    locale: it,
  })

  return (
    <EmailLayout
      preview={t.preview(nome, cognome, dataFormattata)}
      headerSubtitle={t.headerSubtitle}
    >
      {/* Alert Badge */}
      <Section style={{ textAlign: 'center', marginBottom: '24px' }}>
        <Text style={{ fontSize: '48px', margin: '0', color: colors.accentOrange }}>
          📅
        </Text>
      </Section>

      {/* Main Card */}
      <Section style={styles.card}>
        <Text style={styles.heading}>{t.title}</Text>
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

        {/* Quick Actions */}
        <Section style={{ textAlign: 'center', margin: '24px 0' }}>
          {meetLink && (
            <Link href={meetLink} style={{ ...styles.button, marginRight: '12px' }}>
              {t.openMeet}
            </Link>
          )}
          {calendarLink && (
            <Link
              href={calendarLink}
              style={{
                ...styles.button,
                backgroundColor: 'transparent',
                border: `1px solid ${colors.accentOrange}`,
                color: colors.accentOrange,
              }}
            >
              {t.viewCalendar}
            </Link>
          )}
        </Section>
      </Section>

      {/* Client Details Card */}
      <Section style={styles.card}>
        <Text style={{ ...styles.heading, fontSize: '18px' }}>
          👤 {t.clientDetailsTitle}
        </Text>

        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <tbody>
            <tr>
              <td style={clientDetailLabelStyle}>{t.nameLabel}</td>
              <td style={clientDetailValueStyle}>{nome} {cognome}</td>
            </tr>
            <tr>
              <td style={clientDetailLabelStyle}>{t.emailLabel}</td>
              <td style={clientDetailValueStyle}>
                <Link href={`mailto:${email}`} style={{ color: colors.accentOrange }}>
                  {email}
                </Link>
              </td>
            </tr>
            <tr>
              <td style={clientDetailLabelStyle}>{t.phoneLabel}</td>
              <td style={clientDetailValueStyle}>
                <Link href={`tel:${telefono}`} style={{ color: colors.accentOrange }}>
                  {telefono}
                </Link>
              </td>
            </tr>
            {azienda && (
              <tr>
                <td style={clientDetailLabelStyle}>{t.companyLabel}</td>
                <td style={clientDetailValueStyle}>{azienda}</td>
              </tr>
            )}
            {ruolo && (
              <tr>
                <td style={clientDetailLabelStyle}>{t.roleLabel}</td>
                <td style={clientDetailValueStyle}>{ruolo}</td>
              </tr>
            )}
          </tbody>
        </table>
      </Section>

      {/* Message Card (if present) */}
      {messaggio && (
        <Section style={styles.card}>
          <Text style={{ ...styles.heading, fontSize: '18px' }}>
            💬 {t.messageTitle}
          </Text>
          <Text
            style={{
              color: colors.textSecondary,
              fontSize: '14px',
              lineHeight: '1.6',
              margin: '0',
              padding: '16px',
              backgroundColor: colors.bgElevated,
              borderRadius: '8px',
              borderLeft: `3px solid ${colors.accentOrange}`,
            }}
          >
            {messaggio}
          </Text>
        </Section>
      )}

      {/* Quick Actions Footer */}
      <Section style={styles.card}>
        <Text style={{ ...styles.heading, fontSize: '18px' }}>
          ⚡ {t.quickActionsTitle}
        </Text>

        <Section style={{ margin: '16px 0' }}>
          <Link
            href={`mailto:${email}?subject=Re: Briefing Call Pixarts&body=Ciao ${nome},%0D%0A%0D%0A`}
            style={{
              display: 'inline-block',
              padding: '10px 16px',
              backgroundColor: colors.bgElevated,
              color: colors.textPrimary,
              borderRadius: '6px',
              textDecoration: 'none',
              fontSize: '13px',
              marginRight: '8px',
              marginBottom: '8px',
            }}
          >
            ✉️ {t.replyEmail}
          </Link>
          <Link
            href={`https://wa.me/${telefono.replace(/[^0-9+]/g, '')}`}
            style={{
              display: 'inline-block',
              padding: '10px 16px',
              backgroundColor: colors.bgElevated,
              color: colors.textPrimary,
              borderRadius: '6px',
              textDecoration: 'none',
              fontSize: '13px',
              marginBottom: '8px',
            }}
          >
            💬 {t.contactWhatsApp}
          </Link>
        </Section>
      </Section>

      {/* Footer Note */}
      <Section style={{ textAlign: 'center' }}>
        <Text
          style={{
            color: colors.textMuted,
            fontSize: '12px',
            lineHeight: '1.5',
          }}
        >
          {t.footerNote}
        </Text>
      </Section>
    </EmailLayout>
  )
}

// ============================================================================
// STYLES
// ============================================================================

const clientDetailLabelStyle: React.CSSProperties = {
  padding: '8px 0',
  color: colors.textMuted,
  fontSize: '13px',
  width: '100px',
  verticalAlign: 'top',
}

const clientDetailValueStyle: React.CSSProperties = {
  padding: '8px 0',
  color: colors.textPrimary,
  fontSize: '14px',
  fontWeight: 500,
}

export default BookingNotificationAdmin
