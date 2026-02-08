'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { Code, TrendingUp, Users, Search, Sparkles, MessageSquare, type LucideIcon } from 'lucide-react'
import { Section } from '@/components/ui/section'
import { MatrixRain } from '@/components/ui/MatrixRain'
import { staggerContainer, staggerItem, fadeInUp } from '@/lib/motion-variants'

// Capability keys for translation lookup
const CAPABILITY_KEYS = ['web', 'ecommerce', 'crm', 'analytics', 'automation', 'email'] as const

// Static data that doesn't need translation
interface CapabilityStaticData {
  icon: LucideIcon
  integrations: string[]
}

const CAPABILITY_STATIC_DATA: Record<typeof CAPABILITY_KEYS[number], CapabilityStaticData> = {
  web: {
    icon: Code,
    integrations: ['nextjs', 'vercel', 'tailwind'],
  },
  ecommerce: {
    icon: TrendingUp,
    integrations: ['stripe', 'shopify'],
  },
  crm: {
    icon: Users,
    integrations: ['hubspot'],
  },
  analytics: {
    icon: Search,
    integrations: ['google-analytics', 'hotjar'],
  },
  automation: {
    icon: Sparkles,
    integrations: ['openai', 'zapier', 'make'],
  },
  email: {
    icon: MessageSquare,
    integrations: ['mailchimp', 'sendgrid', 'twilio'],
  },
}

// Mapping for display names
const INTEGRATION_NAMES: Record<string, string> = {
  'nextjs': 'Next.js',
  'vercel': 'Vercel',
  'tailwind': 'Tailwind',
  'stripe': 'Stripe',
  'shopify': 'Shopify',
  'hubspot': 'HubSpot',
  'google-analytics': 'GA4',
  'hotjar': 'Hotjar',
  'openai': 'OpenAI',
  'zapier': 'Zapier',
  'make': 'Make',
  'mailchimp': 'Mailchimp',
  'sendgrid': 'SendGrid',
  'twilio': 'Twilio',
}

export function Capabilities() {
  const t = useTranslations('capabilities')

  return (
    <Section id="servizi">
      {/* Custom Header with Pixarts logo styling */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={fadeInUp}
        className="mb-16 text-center"
      >
        <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4 text-balance">
          {t('titlePrefix')}{' '}
          <span className="font-megrim font-normal tracking-wide">
            <span className="text-text-primary">Pi</span>
            <span className="text-accent-orange">x</span>
            <span className="text-text-primary">arts</span>
          </span>
        </h2>
        <p className="text-lg text-text-secondary max-w-2xl mx-auto text-balance">
          {t('description')}
        </p>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={staggerContainer}
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {CAPABILITY_KEYS.map((key, index) => {
          const staticData = CAPABILITY_STATIC_DATA[key]
          const Icon = staticData.icon
          return (
            <motion.div
              key={key}
              variants={staggerItem}
              whileHover={{ y: -4 }}
              className="group relative overflow-hidden rounded-xl border border-border/50 bg-bg-surface/60 backdrop-blur-sm p-6 hover:border-accent-orange/30 transition-all duration-300"
            >
              {/* Matrix Rain Effect - Only visible on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl overflow-hidden">
                <MatrixRain />
              </div>

              {/* Background Gradient on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent-orange/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative z-10">
                {/* Icon */}
                <div className="w-12 h-12 rounded-lg bg-accent-orange/10 flex items-center justify-center mb-4 group-hover:bg-accent-orange/20 transition-colors">
                  <Icon className="w-6 h-6 text-accent-orange" aria-hidden="true" />
                </div>

                {/* Content */}
                <h3 className="text-lg font-heading font-semibold text-text-primary mb-2">
                  {t(`items.${key}.title`)}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed mb-4">
                  {t(`items.${key}.description`)}
                </p>

                {/* Integration Logos with Names */}
                <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-border/30">
                  {staticData.integrations.map((integration) => (
                    <div
                      key={integration}
                      className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-bg-elevated/50 opacity-70 group-hover:opacity-100 transition-opacity"
                    >
                      <div className="relative w-4 h-4 flex-shrink-0">
                        <Image
                          src={`/tech-logos/${integration}.svg`}
                          alt={integration}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <span className="text-xs text-text-secondary">
                        {INTEGRATION_NAMES[integration] || integration}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )
        })}
      </motion.div>
    </Section>
  )
}
