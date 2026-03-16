'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, ArrowRight } from 'lucide-react'
import { useTranslations } from 'next-intl'

const WHATSAPP_URL = 'https://wa.me/420775113732'
const SCROLL_THRESHOLD = 300

export function StickyCtaButton() {
  const t = useTranslations('stickyCtaButton')
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > SCROLL_THRESHOLD)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-6 right-6 z-40 md:hidden"
          >
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t('whatsappLabel')}
              className="
                flex items-center justify-center
                w-14 h-14 rounded-full
                bg-[#FF8C32] text-white
                shadow-xl shadow-[#FF8C32]/40
                hover:scale-110 active:scale-95
                transition-transform duration-200
              "
            >
              <MessageCircle className="w-6 h-6" aria-hidden="true" />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="hidden md:block fixed bottom-0 left-0 right-0 z-40"
          >
            <div className="max-w-7xl mx-auto px-6 pb-5 flex justify-end">
              <a
                href="/preventivo"
                className="
                  inline-flex items-center gap-3
                  rounded-full
                  bg-[#FF8C32] text-white font-semibold
                  px-7 py-3.5 text-sm
                  shadow-xl shadow-[#FF8C32]/35
                  hover:bg-[#e87a28] active:scale-[0.98]
                  transition-all duration-200
                  group
                "
              >
                {t('label')}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
