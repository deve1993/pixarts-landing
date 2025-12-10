import {
  Body,
  Container,
  Head,
  Html,
  Preview,
  Section,
  Text,
  Link,
  Hr,
  Img,
} from '@react-email/components'
import * as React from 'react'

// ============================================================================
// DESIGN TOKENS
// ============================================================================

export const colors = {
  bgPrimary: '#0A0A0B',
  bgSurface: '#141415',
  bgElevated: '#1C1C1E',
  textPrimary: '#FFFFFF',
  textSecondary: '#A1A1A6',
  textMuted: '#6B6B70',
  accentOrange: '#FF6B2C',
  accentAmber: '#FFB347',
  border: '#2C2C2E',
  success: '#22C55E',
}

export const styles = {
  main: {
    backgroundColor: colors.bgPrimary,
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '0',
  },
  header: {
    background: `linear-gradient(135deg, ${colors.accentOrange} 0%, ${colors.accentAmber} 100%)`,
    padding: '32px 24px',
    textAlign: 'center' as const,
    borderRadius: '12px 12px 0 0',
  },
  headerSubtitle: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: '14px',
    margin: '8px 0 0 0',
    fontWeight: 500 as const,
  },
  body: {
    padding: '32px 24px',
  },
  card: {
    backgroundColor: colors.bgSurface,
    borderRadius: '12px',
    padding: '24px',
    marginBottom: '24px',
    border: `1px solid ${colors.border}`,
  },
  heading: {
    color: colors.textPrimary,
    fontSize: '24px',
    fontWeight: 'bold' as const,
    margin: '0 0 16px 0',
    lineHeight: '1.3',
  },
  paragraph: {
    color: colors.textSecondary,
    fontSize: '16px',
    lineHeight: '1.6',
    margin: '0 0 16px 0',
  },
  button: {
    background: `linear-gradient(135deg, ${colors.accentOrange} 0%, ${colors.accentAmber} 100%)`,
    color: '#FFFFFF',
    padding: '14px 28px',
    borderRadius: '8px',
    textDecoration: 'none',
    fontWeight: 'bold' as const,
    fontSize: '16px',
    display: 'inline-block',
    textAlign: 'center' as const,
  },
  buttonSecondary: {
    backgroundColor: colors.bgElevated,
    color: colors.textPrimary,
    padding: '12px 24px',
    borderRadius: '8px',
    textDecoration: 'none',
    fontWeight: 500 as const,
    fontSize: '14px',
    display: 'inline-block',
    border: `1px solid ${colors.border}`,
  },
  infoBox: {
    backgroundColor: colors.bgElevated,
    borderRadius: '8px',
    padding: '16px',
    marginBottom: '16px',
    borderLeft: `4px solid ${colors.accentOrange}`,
  },
  infoLabel: {
    color: colors.textMuted,
    fontSize: '12px',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px',
    margin: '0 0 4px 0',
  },
  infoValue: {
    color: colors.textPrimary,
    fontSize: '16px',
    fontWeight: 500 as const,
    margin: '0',
  },
  hr: {
    borderColor: colors.border,
    margin: '24px 0',
  },
  footer: {
    padding: '24px',
    textAlign: 'center' as const,
  },
  footerText: {
    color: colors.textMuted,
    fontSize: '12px',
    margin: '0 0 8px 0',
    lineHeight: '1.5',
  },
  footerLink: {
    color: colors.accentOrange,
    textDecoration: 'none',
  },
  badge: {
    display: 'inline-block',
    backgroundColor: `rgba(255, 107, 44, 0.15)`,
    color: colors.accentOrange,
    padding: '6px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: 600 as const,
    border: `1px solid rgba(255, 107, 44, 0.3)`,
  },
  successBadge: {
    display: 'inline-block',
    backgroundColor: `rgba(34, 197, 94, 0.15)`,
    color: colors.success,
    padding: '6px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: 600 as const,
    border: `1px solid rgba(34, 197, 94, 0.3)`,
  },
}

// ============================================================================
// LOGO COMPONENT
// ============================================================================

export function Logo() {
  return (
    <Img
      src="https://pixarts.eu/logo-white.png"
      alt="Pixarts"
      width="150"
      height="auto"
      style={{ margin: '0 auto' }}
    />
  )
}

// ============================================================================
// EMAIL LAYOUT
// ============================================================================

interface EmailLayoutProps {
  preview: string
  headerSubtitle?: string
  children: React.ReactNode
}

export function EmailLayout({ preview, headerSubtitle, children }: EmailLayoutProps) {
  return (
    <Html>
      <Head />
      <Preview>{preview}</Preview>
      <Body style={styles.main}>
        <Container style={styles.container}>
          {/* Header */}
          <Section style={styles.header}>
            <Logo />
            {headerSubtitle && (
              <Text style={styles.headerSubtitle}>{headerSubtitle}</Text>
            )}
          </Section>

          {/* Body Content */}
          <Section style={styles.body}>
            {children}
          </Section>

          {/* Footer */}
          <Section style={styles.footer}>
            <Text style={styles.footerText}>
              © {new Date().getFullYear()} Pixarts (Fl1 s.r.o.)
            </Text>
            <Text style={styles.footerText}>
              Moskevská 1464/61, Praha 10, Repubblica Ceca
            </Text>
            <Text style={styles.footerText}>
              <Link href="https://pixarts.eu" style={styles.footerLink}>
                pixarts.eu
              </Link>
              {' • '}
              <Link href="mailto:bo2@fl1.cz" style={styles.footerLink}>
                bo2@fl1.cz
              </Link>
            </Text>
            <Text style={{ ...styles.footerText, marginTop: '16px', fontSize: '11px' }}>
              Questa email è stata inviata automaticamente. Per favore non rispondere direttamente.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}
