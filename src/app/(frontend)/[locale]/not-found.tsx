'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Home, Rocket, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Link } from '@/i18n/routing'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
}

// Generate random stars
const generateStars = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    delay: Math.random() * 2,
  }))
}

const stars = generateStars(50)

export default function NotFound() {
  const t = useTranslations('notFound')

  return (
    <div className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
      {/* Starfield background */}
      <div className="absolute inset-0 overflow-hidden">
        {stars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute rounded-full bg-white animate-twinkle"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: star.size,
              height: star.size,
              animationDelay: `${star.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 -left-20 w-96 h-96 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(255, 107, 44, 0.15) 0%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 50, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-20 w-80 h-80 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(255, 179, 71, 0.15) 0%, transparent 70%)',
          }}
          animate={{
            scale: [1.3, 1, 1.3],
            x: [0, -50, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 5,
          }}
        />
      </div>

      <motion.div
        className="relative z-10 text-center max-w-2xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Floating 404 */}
        <motion.div
          className="relative mb-8"
          variants={itemVariants}
        >
          {/* Glow effect behind 404 */}
          <div className="absolute inset-0 blur-3xl opacity-30">
            <span className="text-[12rem] md:text-[16rem] font-heading font-bold gradient-text">
              {t('heading')}
            </span>
          </div>

          {/* Main 404 text */}
          <motion.h1
            className="text-[10rem] md:text-[14rem] font-heading font-bold gradient-text leading-none animate-float"
            style={{ textShadow: '0 0 40px rgba(255, 107, 44, 0.3)' }}
          >
            {t('heading')}
          </motion.h1>
        </motion.div>

        {/* Animated rocket */}
        <motion.div
          className="absolute top-1/3 right-0 md:right-10"
          animate={{
            y: [-20, 20, -20],
            rotate: [0, 10, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <Rocket className="w-12 h-12 md:w-16 md:h-16 text-accent-orange opacity-60" strokeWidth={1.5} />
        </motion.div>

        {/* Title */}
        <motion.h2
          className="text-3xl md:text-4xl font-heading font-semibold text-text-primary mb-4"
          variants={itemVariants}
        >
          {t('title')}
        </motion.h2>

        {/* Description */}
        <motion.p
          className="text-text-secondary text-lg md:text-xl mb-10 max-w-md mx-auto"
          variants={itemVariants}
        >
          {t('description')}
        </motion.p>

        {/* Action buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          variants={itemVariants}
        >
          <Button asChild className="group">
            <Link href="/">
              <Home className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              {t('backHome')}
            </Link>
          </Button>
          <Button variant="secondary" asChild>
            <Link href="/#portfolio">
              <Search className="w-5 h-5 mr-2" />
              {t('explore')}
            </Link>
          </Button>
        </motion.div>

        {/* Popular pages suggestion */}
        <motion.div
          className="pt-8 border-t border-border/30"
          variants={itemVariants}
        >
          <p className="text-text-muted text-sm mb-4">{t('suggestion')}</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/portfolio"
              className="px-4 py-2 rounded-lg bg-bg-surface/50 border border-border/50 text-text-secondary hover:text-text-primary hover:border-accent-orange/50 transition-all duration-300"
            >
              {t('popularPages.portfolio')}
            </Link>
            <Link
              href="/#pricing"
              className="px-4 py-2 rounded-lg bg-bg-surface/50 border border-border/50 text-text-secondary hover:text-text-primary hover:border-accent-orange/50 transition-all duration-300"
            >
              {t('popularPages.pricing')}
            </Link>
            <Link
              href="/#contact"
              className="px-4 py-2 rounded-lg bg-bg-surface/50 border border-border/50 text-text-secondary hover:text-text-primary hover:border-accent-orange/50 transition-all duration-300"
            >
              {t('popularPages.contact')}
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
