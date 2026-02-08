'use client'

import { motion } from 'framer-motion'
import { Check, ArrowLeft } from 'lucide-react'
import { Link } from '@/i18n/routing'
import { Button } from '@/components/ui/button'
import { useTranslations } from 'next-intl'

export function QuoteConfirmation() {
  const t = useTranslations('quotePage.confirmation')

  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        className="w-20 h-20 bg-success/20 rounded-full flex items-center justify-center mb-6"
      >
        <div className="w-12 h-12 bg-success rounded-full flex items-center justify-center text-white">
          <Check className="w-8 h-8" />
        </div>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-3xl font-heading font-bold text-text-primary mb-4"
      >
        {t('title')}
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-text-secondary max-w-md mb-8"
      >
        {t('message')}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Link href="/">
          <Button variant="secondary" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            {t('backHome')}
          </Button>
        </Link>
      </motion.div>
    </div>
  )
}
