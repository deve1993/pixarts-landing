import { Resend } from 'resend'
import { render } from '@react-email/components'
import * as React from 'react'

// Initialize Resend client
const resend = new Resend(process.env.RESEND_API_KEY)

// Default email configuration
const DEFAULT_FROM = process.env.RESEND_FROM_EMAIL || 'noreply@pixarts.eu'
const DEFAULT_TO = process.env.RESEND_TO_EMAIL || 'bo2@fl1.cz'

interface SendEmailOptions {
  to: string | string[]
  subject: string
  react: React.ReactElement
  from?: string
  replyTo?: string
}

interface SendEmailResult {
  success: boolean
  data?: { id: string }
  error?: Error | unknown
}

/**
 * Send an email using Resend with React Email templates
 */
export async function sendEmail({
  to,
  subject,
  react,
  from = DEFAULT_FROM,
  replyTo,
}: SendEmailOptions): Promise<SendEmailResult> {
  try {
    // Check if Resend is configured
    if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY === 're_your_api_key_here') {
      console.log('Email would be sent:', { to, subject, from })
      return { success: true, data: { id: 'mock-id' } }
    }

    const { data, error } = await resend.emails.send({
      from,
      to: Array.isArray(to) ? to : [to],
      subject,
      react,
      replyTo,
    })

    if (error) {
      console.error('Resend error:', error)
      return { success: false, error }
    }

    return { success: true, data: data ?? undefined }
  } catch (error) {
    console.error('Email send error:', error)
    return { success: false, error }
  }
}

/**
 * Send internal notification email
 */
export async function sendInternalNotification({
  subject,
  react,
  replyTo,
}: {
  subject: string
  react: React.ReactElement
  replyTo?: string
}): Promise<SendEmailResult> {
  return sendEmail({
    to: DEFAULT_TO,
    subject,
    react,
    replyTo,
  })
}

/**
 * Render email template to HTML string (for debugging/preview)
 */
export async function renderEmailToHtml(react: React.ReactElement): Promise<string> {
  return render(react)
}

export { resend, DEFAULT_FROM, DEFAULT_TO }
