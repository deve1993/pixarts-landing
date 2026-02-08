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
  phone?: string | null
  company?: string | null
  projectType?: string | null
  budget?: string | null
  message: string
  submittedAt?: string
}

export function ContactInternalEmail({
  name = 'Mario Rossi',
  email = 'mario.rossi@email.com',
  phone = '+39 333 1234567',
  company = 'Acme Corp',
  projectType = 'Sito Aziendale',
  budget = '€2.500 - €3.500',
  message = 'Vorrei informazioni sui vostri servizi di web design.',
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

        {company && (
          <Section style={styles.infoBox}>
            <Text style={styles.infoLabel}>Azienda</Text>
            <Text style={styles.infoValue}>{company}</Text>
          </Section>
        )}

        <Hr style={styles.hr} />

        {/* Project Details */}
        {(projectType || budget) && (
          <>
            <Text style={styles.infoLabel}>DETTAGLI PROGETTO</Text>

            {projectType && (
              <Section style={styles.infoBox}>
                <Text style={styles.infoLabel}>Tipo Progetto</Text>
                <Text style={styles.infoValue}>{projectType}</Text>
              </Section>
            )}

            {budget && (
              <Section style={styles.infoBox}>
                <Text style={styles.infoLabel}>Budget Indicativo</Text>
                <Text style={{ ...styles.infoValue, color: colors.success }}>
                  {budget}
                </Text>
              </Section>
            )}

            <Hr style={styles.hr} />
          </>
        )}

        {/* Message */}
        <Text style={styles.infoLabel}>MESSAGGIO</Text>
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
            {message}
          </Text>
        </Section>

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
        {phone && (
          <Text style={{ marginTop: '16px' }}>
            <Link href={`tel:${phone}`} style={styles.buttonSecondary}>
              📞 Chiama
            </Link>
          </Text>
        )}
      </Section>
    </EmailLayout>
  )
}

export default ContactInternalEmail
