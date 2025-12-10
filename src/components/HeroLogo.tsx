'use client'

import { motion } from 'framer-motion'

export function HeroLogo() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="relative inline-flex items-center justify-center"
    >
      {/* Glow backdrop behind the logo */}
      <div className="absolute inset-0 blur-3xl opacity-20">
        <div className="absolute inset-0 bg-gradient-radial from-accent-orange/30 via-accent-orange/5 to-transparent" />
      </div>

      {/* Main Logo */}
      <div className="relative z-10 select-none">
        <h2 className="font-megrim font-normal tracking-wider text-6xl sm:text-7xl md:text-8xl lg:text-9xl">
          <span className="text-white">Pi</span>
          <motion.span
            className="relative inline-block text-accent-orange"
            animate={{
              textShadow: [
                '0 0 10px rgba(255, 107, 44, 0.3)',
                '0 0 20px rgba(255, 107, 44, 0.5)',
                '0 0 10px rgba(255, 107, 44, 0.3)',
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            x
          </motion.span>
          <span className="text-white">arts</span>
        </h2>

        {/* Underline that draws in */}
        <motion.div
          className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent-orange to-transparent rounded-full"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
        />
      </div>
    </motion.div>
  )
}
