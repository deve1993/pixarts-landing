'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight, Quote, Pause, Play, BadgeCheck } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Section, SectionHeader } from '@/components/ui/section'

const TESTIMONIAL_KEYS = ['testimonial1', 'testimonial2', 'testimonial3'] as const

export function Testimonials() {
  const t = useTranslations('testimonials')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)

  // Auto-play with pause support
  useEffect(() => {
    if (!isPlaying) return

    const timer = setInterval(() => {
      setDirection(1)
      setCurrentIndex((prev) => (prev + 1) % TESTIMONIAL_KEYS.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [isPlaying])

  const goToPrevious = useCallback(() => {
    setDirection(-1)
    setCurrentIndex(
      (prev) => (prev - 1 + TESTIMONIAL_KEYS.length) % TESTIMONIAL_KEYS.length
    )
  }, [])

  const goToNext = useCallback(() => {
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIAL_KEYS.length)
  }, [])

  const goToSlide = useCallback((index: number) => {
    setDirection(index > currentIndex ? 1 : -1)
    setCurrentIndex(index)
  }, [currentIndex])

  const togglePlay = useCallback(() => {
    setIsPlaying((prev) => !prev)
  }, [])

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  }

  const currentKey = TESTIMONIAL_KEYS[currentIndex]
  const initials = t(`${currentKey}.name`).split(' ').map(n => n[0]).join('')

  return (
    <Section id="testimonianze">
      <SectionHeader
        title={t('title')}
        description={t('description')}
      />

      <div
        className="relative max-w-4xl mx-auto"
        role="region"
        aria-roledescription="carousel"
        aria-label={t('controls')}
      >
        {/* Quote Icon */}
        <div className="absolute -top-4 left-0 md:left-8 opacity-10" aria-hidden="true">
          <Quote className="w-24 h-24 text-accent-orange" />
        </div>

        {/* Testimonial Card */}
        <div
          className="relative overflow-hidden"
          aria-live={isPlaying ? 'off' : 'polite'}
        >
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(_, info) => {
                if (info.offset.x > 50) {
                  goToPrevious()
                } else if (info.offset.x < -50) {
                  goToNext()
                }
              }}
              className="w-full cursor-grab active:cursor-grabbing"
              role="group"
              aria-roledescription="slide"
              aria-label={`${currentIndex + 1} / ${TESTIMONIAL_KEYS.length}`}
            >
              <div className="bg-bg-surface/60 backdrop-blur-sm border border-border/50 rounded-2xl p-5 sm:p-8 md:p-12">
                {/* Stars + Verified Badge */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex gap-1" aria-label={t('rating')}>
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 fill-accent-orange text-accent-orange"
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-success/10 border border-success/20">
                    <BadgeCheck className="w-4 h-4 text-success" />
                    <span className="text-xs font-medium text-success">{t('verified')}</span>
                  </div>
                </div>

                {/* Quote */}
                <blockquote className="text-lg sm:text-xl md:text-2xl text-text-primary font-heading leading-relaxed mb-6 sm:mb-8">
                  <p>&ldquo;{t(`${currentKey}.text`)}&rdquo;</p>
                </blockquote>

                {/* Author */}
                <footer className="flex items-center gap-4">
                  {/* Avatar */}
                  <div
                    className="w-14 h-14 rounded-full bg-gradient-to-br from-accent-orange to-accent-amber flex items-center justify-center"
                    aria-hidden="true"
                  >
                    <span className="text-white font-bold text-lg">
                      {initials}
                    </span>
                  </div>

                  <cite className="not-italic">
                    <div className="font-semibold text-text-primary">
                      {t(`${currentKey}.name`)}
                    </div>
                    <div className="text-sm text-text-secondary">
                      {t(`${currentKey}.role`)},{' '}
                      {t(`${currentKey}.company`)}
                    </div>
                  </cite>
                </footer>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 mt-8" role="group" aria-label={t('controls')}>
          <button
            onClick={goToPrevious}
            className="w-12 h-12 rounded-full border border-border/50 bg-bg-surface/60 backdrop-blur-sm flex items-center justify-center text-text-muted hover:text-accent-orange hover:border-accent-orange transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-orange"
            aria-label={t('prev')}
          >
            <ChevronLeft className="w-5 h-5" aria-hidden="true" />
          </button>

          {/* Play/Pause Button */}
          <button
            onClick={togglePlay}
            className="w-12 h-12 rounded-full border border-border/50 bg-bg-surface/60 backdrop-blur-sm flex items-center justify-center text-text-muted hover:text-accent-orange hover:border-accent-orange transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-orange"
            aria-label={isPlaying ? t('pause') : t('play')}
            aria-pressed={!isPlaying}
          >
            {isPlaying ? (
              <Pause className="w-4 h-4" aria-hidden="true" />
            ) : (
              <Play className="w-4 h-4" aria-hidden="true" />
            )}
          </button>

          {/* Dots */}
          <div className="flex gap-2" role="tablist">
            {TESTIMONIAL_KEYS.map((key, index) => (
              <button
                key={key}
                role="tab"
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-orange focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary ${
                  index === currentIndex
                    ? 'w-6 bg-accent-orange'
                    : 'bg-border hover:bg-text-muted'
                }`}
                aria-label={`${t(`${key}.name`)}, ${t(`${key}.company`)}`}
                aria-selected={index === currentIndex}
                tabIndex={index === currentIndex ? 0 : -1}
              />
            ))}
          </div>

          <button
            onClick={goToNext}
            className="w-12 h-12 rounded-full border border-border/50 bg-bg-surface/60 backdrop-blur-sm flex items-center justify-center text-text-muted hover:text-accent-orange hover:border-accent-orange transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-orange"
            aria-label={t('next')}
          >
            <ChevronRight className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </Section>
  )
}
