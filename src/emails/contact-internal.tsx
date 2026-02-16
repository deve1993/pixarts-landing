import {
  Section,
  Text,
  Link,
  Hr,
} from '@react-email/components'
import * as React from 'react'
import { EmailLayout, styles, colors } from './components/Layout'

// ============================================================================
// CONTACT FORM - INTERNAL NOTIFICATION EMAIL
// ============================================================================

interface ContactInternalEmailProps {
  name: string
  email: string
  projectType?: string | null
  submittedAt?: string
}

export function ContactInternalEmail({
  name = 'Mario Rossi',
  email = 'mario.rossi@email.com',
  projectType = 'Sito Aziendale',
  submittedAt = new Date().toLocaleString('it-IT'),
}: ContactInternalEmailProps) {
  return (
    <EmailLayout
      preview={`Nuovo contatto da ${name} - Pixarts`}
      headerSubtitle="Nuovo Lead!"
    >
      {/* Alert Badge */}
      <Section style={{ textAlign: 'center', marginBottom: '24px' }}>
        <span style={styles.successBadge}>
          🎉 NUOVO POTENZIALE CLIENTE
        </span>
      </Section>

      {/* Main Card */}
      <Section style={styles.card}>
        <Text style={styles.heading}>
          Nuovo messaggio dal form contatti
        </Text>

        {/* Contact Info */}
        <Section style={styles.infoBox}>
          <Text style={styles.infoLabel}>Nome</Text>
          <Text style={styles.infoValue}>{name}</Text>
        </Section>

        <Section style={styles.infoBox}>
          <Text style={styles.infoLabel}>Email</Text>
          <Text style={styles.infoValue}>
            <Link href={`mailto:${email}`} style={{ color: colors.accentOrange }}>
              {email}
            </Link>
          </Text>
        </Section>

        <Hr style={styles.hr} />

        {projectType && (
          <Section style={styles.infoBox}>
            <Text style={styles.infoLabel}>Tipo Progetto</Text>
            <Text style={styles.infoValue}>{projectType}</Text>
          </Section>
        )}

        <Text
          style={{
            color: colors.textMuted,
            fontSize: '12px',
            marginTop: '12px',
          }}
        >
          Ricevuto il {submittedAt}
        </Text>
      </Section>

      {/* Quick Actions */}
      <Section style={{ textAlign: 'center' }}>
        <Link
          href={`mailto:${email}?subject=Re: La tua richiesta a Pixarts`}
          style={styles.button}
        >
          Rispondi Subito
        </Link>
      </Section>
    </EmailLayout>
  )
}

export default ContactInternalEmail
