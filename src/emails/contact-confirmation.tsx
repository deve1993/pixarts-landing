import {
  Section,
  Text,
  Link,
  Hr,
} from '@react-email/components'
import * as React from 'react'
import { EmailLayout, styles, colors } from './components/Layout'

// ============================================================================
// CONTACT FORM - USER CONFIRMATION EMAIL
// ============================================================================

interface ContactConfirmationEmailProps {
  name: string
  message: string
  submittedAt?: string
}

export function ContactConfirmationEmail({
  name = 'Mario',
  message = 'Vorrei informazioni sui vostri servizi...',
  submittedAt = new Date().toLocaleDateString('it-IT'),
}: ContactConfirmationEmailProps) {
  return (
    <EmailLayout
      preview={`Abbiamo ricevuto il tuo messaggio - Pixarts`}
      headerSubtitle="Messaggio Ricevuto"
    >
      {/* Success Icon */}
      <Section style={{ textAlign: 'center', marginBottom: '24px' }}>
        <div
          style={{
            width: '64px',
            height: '64px',
            backgroundColor: colors.success,
            borderRadius: '50%',
            margin: '0 auto',
          }}
        >
          <Text style={{ fontSize: '32px', margin: '0', lineHeight: '64px', color: '#fff' }}>✓</Text>
        </div>
      </Section>

      {/* Main Card */}
      <Section style={styles.card}>
        <Text style={styles.heading}>
          Ciao {name}! 👋
        </Text>
        <Text style={styles.paragraph}>
          Grazie per averci contattato! Abbiamo ricevuto il tuo messaggio e
          ti risponderemo il prima possibile, di solito entro 24 ore lavorative.
        </Text>

        <Hr style={styles.hr} />

        {/* Message Preview */}
        <Text style={styles.infoLabel}>IL TUO MESSAGGIO</Text>
        <Section
          style={{
            backgroundColor: colors.bgPrimary,
            borderRadius: '8px',
            padding: '16px',
            marginTop: '8px',
            borderLeft: `4px solid ${colors.accentOrange}`,
          }}
        >
          <Text
            style={{
              ...styles.paragraph,
              margin: '0',
              fontStyle: 'italic',
              whiteSpace: 'pre-wrap',
            }}
          >
            &quot;{message}&quot;
          </Text>
        </Section>

        <Text
          style={{
            color: colors.textMuted,
            fontSize: '12px',
            marginTop: '12px',
          }}
        >
          Inviato il {submittedAt}
        </Text>
      </Section>

      {/* What's Next */}
      <Section style={styles.card}>
        <Text style={{ ...styles.heading, fontSize: '18px' }}>
          Cosa succede ora?
        </Text>
        <Section style={{ marginBottom: '16px' }}>
          <Text style={{ ...styles.paragraph, margin: '0' }}>
            <span style={{ color: colors.accentOrange, fontWeight: 'bold' }}>1.</span>{' '}
            Analizziamo la tua richiesta
          </Text>
        </Section>
        <Section style={{ marginBottom: '16px' }}>
          <Text style={{ ...styles.paragraph, margin: '0' }}>
            <span style={{ color: colors.accentOrange, fontWeight: 'bold' }}>2.</span>{' '}
            Ti contattiamo per capire meglio le tue esigenze
          </Text>
        </Section>
        <Section>
          <Text style={{ ...styles.paragraph, margin: '0' }}>
            <span style={{ color: colors.accentOrange, fontWeight: 'bold' }}>3.</span>{' '}
            Ti inviamo una proposta personalizzata
          </Text>
        </Section>
      </Section>

      {/* Response Time */}
      <Section
        style={{
          backgroundColor: `rgba(255, 107, 44, 0.1)`,
          borderRadius: '12px',
          padding: '20px',
          textAlign: 'center',
          border: `1px solid rgba(255, 107, 44, 0.3)`,
          marginBottom: '24px',
        }}
      >
        <Text
          style={{
            color: colors.accentOrange,
            fontSize: '14px',
            fontWeight: 'bold',
            margin: '0 0 4px 0',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
          }}
        >
          Tempo di risposta medio
        </Text>
        <Text
          style={{
            color: colors.textPrimary,
            fontSize: '28px',
            fontWeight: 'bold',
            margin: '8px 0',
          }}
        >
          &lt; 24 ore
        </Text>
        <Text style={{ color: colors.textSecondary, fontSize: '14px', margin: '0' }}>
          durante i giorni lavorativi
        </Text>
      </Section>

      {/* CTA */}
      <Section style={{ textAlign: 'center' }}>
        <Text style={styles.paragraph}>
          Nel frattempo, dai un&apos;occhiata ai nostri lavori:
        </Text>
        <Link href="https://pixarts.eu/#portfolio" style={styles.button}>
          Vedi Portfolio
        </Link>
      </Section>
    </EmailLayout>
  )
}

export default ContactConfirmationEmail
