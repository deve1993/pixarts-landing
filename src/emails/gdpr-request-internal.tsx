import {
  Section,
  Text,
  Link,
  Hr,
} from '@react-email/components'
import * as React from 'react'
import { EmailLayout, styles, colors } from './components/Layout'

// ============================================================================
// GDPR REQUEST - INTERNAL NOTIFICATION EMAIL
// ============================================================================

interface GdprRequestInternalEmailProps {
  requestId: string
  fullName: string
  email: string
  phone?: string | null
  requestType: string
  requestTypeLabel: string
  requestTypeArticle?: string
  details?: string | null
  emailUsed?: string | null
  clientIP: string
  submittedAt: string
  deadlineDate: string
}

export function GdprRequestInternalEmail({
  requestId = 'GDPR-123456789-ABC',
  fullName = 'Mario Rossi',
  email = 'mario.rossi@email.com',
  phone = '+39 333 1234567',
  requestType = 'access',
  requestTypeLabel = 'Diritto di Accesso',
  requestTypeArticle = 'Art. 15 GDPR',
  details = 'Vorrei ricevere una copia di tutti i miei dati personali.',
  emailUsed = null,
  clientIP = '192.168.1.1',
  submittedAt = new Date().toLocaleString('it-IT'),
  deadlineDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('it-IT'),
}: GdprRequestInternalEmailProps) {
  return (
    <EmailLayout
      preview={`[GDPR] Nuova richiesta #${requestId} - ${requestTypeLabel}`}
      headerSubtitle="Nuova Richiesta GDPR"
    >
      {/* Alert Badge */}
      <Section style={{ textAlign: 'center', marginBottom: '24px' }}>
        <span style={styles.badge}>
          RICHIEDE AZIONE ENTRO 30 GIORNI
        </span>
      </Section>

      {/* Main Card */}
      <Section style={styles.card}>
        <Text style={styles.heading}>
          Nuova Richiesta GDPR
        </Text>

        {/* Request Type Highlight */}
        <Section
          style={{
            backgroundColor: colors.bgElevated,
            borderRadius: '8px',
            padding: '16px',
            marginBottom: '20px',
            textAlign: 'center',
          }}
        >
          <Text
            style={{
              color: colors.accentOrange,
              fontSize: '18px',
              fontWeight: 'bold',
              margin: '0 0 4px 0',
            }}
          >
            {requestTypeLabel}
          </Text>
          {requestTypeArticle && (
            <Text style={{ color: colors.textMuted, fontSize: '14px', margin: '0' }}>
              {requestTypeArticle}
            </Text>
          )}
        </Section>

        {/* Request Info */}
        <Text style={{ ...styles.infoLabel, marginBottom: '16px' }}>
          DETTAGLI RICHIESTA
        </Text>

        <Section style={styles.infoBox}>
          <Text style={styles.infoLabel}>ID Richiesta</Text>
          <Text style={styles.infoValue}>{requestId}</Text>
        </Section>

        <Section style={styles.infoBox}>
          <Text style={styles.infoLabel}>Nome Completo</Text>
          <Text style={styles.infoValue}>{fullName}</Text>
        </Section>

        <Section style={styles.infoBox}>
          <Text style={styles.infoLabel}>Email</Text>
          <Text style={styles.infoValue}>
            <Link href={`mailto:${email}`} style={{ color: colors.accentOrange }}>
              {email}
            </Link>
          </Text>
        </Section>

        {phone && (
          <Section style={styles.infoBox}>
            <Text style={styles.infoLabel}>Telefono</Text>
            <Text style={styles.infoValue}>
              <Link href={`tel:${phone}`} style={{ color: colors.accentOrange }}>
                {phone}
              </Link>
            </Text>
          </Section>
        )}

        {emailUsed && (
          <Section style={styles.infoBox}>
            <Text style={styles.infoLabel}>Email usata per contattarci</Text>
            <Text style={styles.infoValue}>{emailUsed}</Text>
          </Section>
        )}

        {details && (
          <>
            <Hr style={styles.hr} />
            <Text style={styles.infoLabel}>DETTAGLI FORNITI</Text>
            <Section
              style={{
                backgroundColor: colors.bgPrimary,
                borderRadius: '8px',
                padding: '16px',
                marginTop: '8px',
                borderLeft: `4px solid ${colors.accentOrange}`,
              }}
            >
              <Text style={{ ...styles.paragraph, margin: '0', whiteSpace: 'pre-wrap' }}>
                {details}
              </Text>
            </Section>
          </>
        )}
      </Section>

      {/* Deadline Warning */}
      <Section
        style={{
          ...styles.card,
          backgroundColor: `rgba(255, 107, 44, 0.1)`,
          border: `1px solid ${colors.accentOrange}`,
        }}
      >
        <Text
          style={{
            color: colors.accentOrange,
            fontSize: '16px',
            fontWeight: 'bold',
            margin: '0 0 8px 0',
          }}
        >
          ⚠️ Scadenza Risposta
        </Text>
        <Text style={{ color: colors.textPrimary, fontSize: '14px', margin: '0' }}>
          Ai sensi del GDPR, la risposta deve essere fornita entro <strong>30 giorni</strong> dalla ricezione.
        </Text>
        <Text
          style={{
            color: colors.textSecondary,
            fontSize: '14px',
            margin: '8px 0 0 0',
          }}
        >
          Scadenza: <strong style={{ color: colors.textPrimary }}>{deadlineDate}</strong>
        </Text>
      </Section>

      {/* Technical Info */}
      <Section style={{ ...styles.card, backgroundColor: colors.bgPrimary }}>
        <Text style={styles.infoLabel}>INFORMAZIONI TECNICHE</Text>
        <Text style={{ color: colors.textMuted, fontSize: '12px', margin: '8px 0 0 0' }}>
          IP: {clientIP} • Timestamp: {submittedAt}
        </Text>
      </Section>

      {/* Quick Actions */}
      <Section style={{ textAlign: 'center' }}>
        <Link href={`mailto:${email}?subject=Re: Richiesta GDPR ${requestId}`} style={styles.button}>
          Rispondi all&apos;Utente
        </Link>
      </Section>
    </EmailLayout>
  )
}

export default GdprRequestInternalEmail
