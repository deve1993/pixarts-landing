import {
  Section,
  Text,
  Link,
  Hr,
} from '@react-email/components'
import * as React from 'react'
import { EmailLayout, styles, colors } from './components/Layout'

// ============================================================================
// GDPR REQUEST - USER CONFIRMATION EMAIL
// ============================================================================

interface GdprRequestUserEmailProps {
  requestId: string
  fullName: string
  requestType: string
  requestTypeLabel: string
  submittedAt: string
  deadlineDate: string
}

export function GdprRequestUserEmail({
  requestId = 'GDPR-123456789-ABC',
  fullName = 'Mario Rossi',
  requestType = 'access',
  requestTypeLabel = 'Diritto di Accesso',
  submittedAt = new Date().toLocaleDateString('it-IT'),
  deadlineDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('it-IT'),
}: GdprRequestUserEmailProps) {
  return (
    <EmailLayout
      preview={`Richiesta GDPR #${requestId} ricevuta - Pixarts`}
      headerSubtitle="Richiesta GDPR Ricevuta"
    >
      {/* Success Icon */}
      <Section style={{ textAlign: 'center', marginBottom: '24px' }}>
        <Text style={{ fontSize: '48px', margin: '0', color: colors.success }}>✓</Text>
      </Section>

      {/* Main Card */}
      <Section style={styles.card}>
        <Text style={styles.heading}>
          Ciao {fullName},
        </Text>
        <Text style={styles.paragraph}>
          Abbiamo ricevuto la tua richiesta per l&apos;esercizio dei diritti GDPR.
          La elaboreremo nei termini previsti dalla legge.
        </Text>

        <Hr style={styles.hr} />

        {/* Request Details */}
        <Section style={styles.infoBox}>
          <Text style={styles.infoLabel}>Numero Pratica</Text>
          <Text style={styles.infoValue}>{requestId}</Text>
        </Section>

        <Section style={styles.infoBox}>
          <Text style={styles.infoLabel}>Tipo Richiesta</Text>
          <Text style={styles.infoValue}>{requestTypeLabel}</Text>
        </Section>

        <Section style={styles.infoBox}>
          <Text style={styles.infoLabel}>Data Invio</Text>
          <Text style={styles.infoValue}>{submittedAt}</Text>
        </Section>

        <Hr style={styles.hr} />

        {/* Deadline Notice */}
        <Section
          style={{
            backgroundColor: `rgba(255, 107, 44, 0.1)`,
            borderRadius: '8px',
            padding: '16px',
            textAlign: 'center',
            border: `1px solid ${colors.accentOrange}`,
          }}
        >
          <Text style={{ ...styles.infoLabel, color: colors.accentOrange }}>
            Termine Risposta
          </Text>
          <Text
            style={{
              color: colors.textPrimary,
              fontSize: '20px',
              fontWeight: 'bold',
              margin: '8px 0 4px 0',
            }}
          >
            Entro 30 giorni
          </Text>
          <Text style={{ color: colors.textSecondary, fontSize: '14px', margin: '0' }}>
            Scadenza: {deadlineDate}
          </Text>
        </Section>
      </Section>

      {/* Info Card */}
      <Section style={styles.card}>
        <Text style={{ ...styles.paragraph, marginBottom: '0' }}>
          <strong style={{ color: colors.textPrimary }}>Cosa succede ora?</strong>
        </Text>
        <Text style={styles.paragraph}>
          Il nostro team verificherà la tua identità e processerà la richiesta.
          Riceverai una risposta completa entro il termine indicato. In casi
          particolarmente complessi, potremmo estendere il termine di ulteriori
          60 giorni, previa comunicazione.
        </Text>
      </Section>

      {/* Contact */}
      <Section style={{ textAlign: 'center' }}>
        <Text style={styles.paragraph}>
          Hai domande sulla tua richiesta?
        </Text>
        <Link href="mailto:bo2@fl1.cz" style={styles.button}>
          Contattaci
        </Link>
      </Section>
    </EmailLayout>
  )
}

export default GdprRequestUserEmail
