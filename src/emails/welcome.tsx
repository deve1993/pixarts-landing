import {
  Section,
  Text,
  Link,
  Hr,
} from '@react-email/components'
import * as React from 'react'
import { EmailLayout, styles, colors } from './components/Layout'

// ============================================================================
// WELCOME EMAIL
// ============================================================================

interface WelcomeEmailProps {
  name: string
  projectType?: string
}

export function WelcomeEmail({
  name = 'Mario',
  projectType = 'sito web',
}: WelcomeEmailProps) {
  return (
    <EmailLayout
      preview={`Benvenuto in Pixarts! Iniziamo il tuo progetto`}
      headerSubtitle="Benvenuto! 🎉"
    >
      {/* Welcome Card */}
      <Section style={styles.card}>
        <Text style={styles.heading}>
          Ciao {name}! 👋
        </Text>
        <Text style={styles.paragraph}>
          Siamo entusiasti di averti a bordo! Grazie per aver scelto Pixarts per
          il tuo {projectType}. Il nostro team è pronto a trasformare la tua visione
          in realtà.
        </Text>
      </Section>

      {/* What to Expect */}
      <Section style={styles.card}>
        <Text style={{ ...styles.heading, fontSize: '20px' }}>
          Cosa aspettarti
        </Text>

        <Section
          style={{
            backgroundColor: colors.bgElevated,
            borderRadius: '8px',
            padding: '16px',
            marginBottom: '12px',
          }}
        >
          <Text style={{ color: colors.accentOrange, fontWeight: 'bold', margin: '0 0 4px 0' }}>
            📞 Step 1: Brief Iniziale
          </Text>
          <Text style={{ color: colors.textSecondary, fontSize: '14px', margin: '0' }}>
            Ti contatteremo entro 24 ore per una call conoscitiva di 30 minuti.
          </Text>
        </Section>

        <Section
          style={{
            backgroundColor: colors.bgElevated,
            borderRadius: '8px',
            padding: '16px',
            marginBottom: '12px',
          }}
        >
          <Text style={{ color: colors.accentOrange, fontWeight: 'bold', margin: '0 0 4px 0' }}>
            🎨 Step 2: Design
          </Text>
          <Text style={{ color: colors.textSecondary, fontSize: '14px', margin: '0' }}>
            Creiamo il design del tuo sito con revisioni incluse.
          </Text>
        </Section>

        <Section
          style={{
            backgroundColor: colors.bgElevated,
            borderRadius: '8px',
            padding: '16px',
            marginBottom: '12px',
          }}
        >
          <Text style={{ color: colors.accentOrange, fontWeight: 'bold', margin: '0 0 4px 0' }}>
            💻 Step 3: Sviluppo
          </Text>
          <Text style={{ color: colors.textSecondary, fontSize: '14px', margin: '0' }}>
            Costruiamo il tuo sito con le migliori tecnologie.
          </Text>
        </Section>

        <Section
          style={{
            backgroundColor: colors.bgElevated,
            borderRadius: '8px',
            padding: '16px',
          }}
        >
          <Text style={{ color: colors.accentOrange, fontWeight: 'bold', margin: '0 0 4px 0' }}>
            🚀 Step 4: Lancio
          </Text>
          <Text style={{ color: colors.textSecondary, fontSize: '14px', margin: '0' }}>
            Mettiamo online il tuo sito e ti formiamo sulla gestione.
          </Text>
        </Section>
      </Section>

      {/* Timeline */}
      <Section
        style={{
          backgroundColor: `rgba(255, 107, 44, 0.1)`,
          borderRadius: '12px',
          padding: '24px',
          textAlign: 'center',
          border: `1px solid rgba(255, 107, 44, 0.3)`,
          marginBottom: '24px',
        }}
      >
        <Text style={{ color: colors.textMuted, fontSize: '12px', margin: '0 0 8px 0', textTransform: 'uppercase' }}>
          Tempo medio di consegna
        </Text>
        <Text
          style={{
            color: colors.textPrimary,
            fontSize: '32px',
            fontWeight: 'bold',
            margin: '0',
          }}
        >
          7-10 giorni
        </Text>
        <Text style={{ color: colors.textSecondary, fontSize: '14px', margin: '8px 0 0 0' }}>
          dalla conferma del brief
        </Text>
      </Section>

      {/* Included */}
      <Section style={styles.card}>
        <Text style={{ ...styles.heading, fontSize: '18px' }}>
          ✨ Incluso nel tuo progetto
        </Text>
        <Hr style={styles.hr} />
        <Text style={{ ...styles.paragraph, margin: '8px 0' }}>
          ✓ Design responsive mobile-first
        </Text>
        <Text style={{ ...styles.paragraph, margin: '8px 0' }}>
          ✓ Ottimizzazione SEO base
        </Text>
        <Text style={{ ...styles.paragraph, margin: '8px 0' }}>
          ✓ Hosting incluso per 1 anno
        </Text>
        <Text style={{ ...styles.paragraph, margin: '8px 0' }}>
          ✓ Certificato SSL gratuito
        </Text>
        <Text style={{ ...styles.paragraph, margin: '8px 0' }}>
          ✓ Training e documentazione
        </Text>
        <Text style={{ ...styles.paragraph, margin: '8px 0' }}>
          ✓ 30 giorni di supporto gratuito
        </Text>
      </Section>

      {/* CTA */}
      <Section style={{ textAlign: 'center' }}>
        <Text style={styles.paragraph}>
          Hai domande? Siamo qui per aiutarti!
        </Text>
        <Link href="mailto:bo2@fl1.cz" style={styles.button}>
          Contattaci
        </Link>
        <Text style={{ marginTop: '16px' }}>
          <Link href="https://pixarts.eu/#portfolio" style={styles.buttonSecondary}>
            Vedi i nostri lavori
          </Link>
        </Text>
      </Section>
    </EmailLayout>
  )
}

export default WelcomeEmail
