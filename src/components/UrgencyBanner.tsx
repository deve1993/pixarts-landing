'use client'

import { motion } from 'framer-motion'
import { Flame } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'

export function UrgencyBanner() {
  const t = useTranslations('urgencyBanner')

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto max-w-4xl px-6 py-4"
    >
      <Link href="/preventivo" className="block group">
        <div
          className="
            relative flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4
            rounded-2xl px-6 py-4
            bg-gradient-to-r from-[#FF8C32] via-[#FF9A45] to-[#FFB428]
            shadow-lg shadow-[#FF8C32]/30
            overflow-hidden
          "
        >
          <motion.div
            className="absolute inset-0 bg-white/10 rounded-2xl"
            animate={{ opacity: [0, 0.15, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            aria-hidden="true"
          />

          <span className="relative flex h-3 w-3 shrink-0" aria-hidden="true">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-white" />
          </span>

          <div className="relative flex items-center gap-2">
            <Flame className="w-5 h-5 text-white shrink-0" aria-hidden="true" />
            <p className="text-white font-semibold text-sm sm:text-base text-center sm:text-left">
              {t('text')}
            </p>
          </div>

          <span
            className="
              relative shrink-0
              inline-flex items-center gap-1.5
              rounded-full bg-white/20 hover:bg-white/30
              border border-white/40
              px-4 py-1.5
              text-white font-semibold text-sm
              transition-colors duration-200
              group-hover:bg-white group-hover:text-[#FF8C32]
            "
          >
            {t('cta')} →
          </span>
        </div>
      </Link>
    </motion.div>
  )
}
