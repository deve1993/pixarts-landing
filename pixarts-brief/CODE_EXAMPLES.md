# Code Examples Pixarts

## Essential Code Snippets per velocizzare l'implementazione

---

## 1. Tailwind Config Completo

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#0A0A0B',
          surface: '#141415',
          elevated: '#1C1C1E',
        },
        text: {
          primary: '#FFFFFF',
          secondary: '#A1A1A6',
          muted: '#6B6B70',
        },
        accent: {
          orange: '#FF6B2C',
          amber: '#FFB347',
        },
        border: '#2A2A2D',
        success: '#34D399',
        error: '#F87171',
      },
      fontFamily: {
        heading: ['var(--font-satoshi)', 'system-ui', 'sans-serif'],
        body: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'fade-in': 'fadeIn 0.4s ease-out',
        'slide-in': 'slideIn 0.3s ease-out',
        'ripple': 'ripple 0.6s ease-out',
        'gradient-rotate': 'gradientRotate 15s ease infinite',
        'shimmer': 'shimmer 3s ease-in-out infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        ripple: {
          '0%': { transform: 'scale(0)', opacity: '1' },
          '100%': { transform: 'scale(4)', opacity: '0' },
        },
        gradientRotate: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        shimmer: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
}

export default config
```

---

## 2. Root Layout con Fonts

```typescript
// app/layout.tsx
import { Inter } from 'next/font/google'
import localFont from 'next/font/local'
import './globals.css'
import type { Metadata } from 'next'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const satoshi = localFont({
  src: [
    {
      path: '../public/fonts/Satoshi-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/Satoshi-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/Satoshi-SemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../public/fonts/Satoshi-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-satoshi',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Pixarts - Siti Web Professionali in 10 Giorni | Web Design Italia',
  description: 'Crea il tuo sito web professionale in 10 giorni. Design moderno, SEO incluso, garanzia soddisfazione. Da €1.200.',
  keywords: ['siti web professionali', 'web design italia', 'landing page', 'e-commerce'],
  openGraph: {
    title: 'Pixarts - Siti Web Professionali',
    description: 'Design moderno, consegna in 10 giorni, garanzia tripla',
    url: 'https://pixarts.eu',
    siteName: 'Pixarts',
    locale: 'it_IT',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="it" className={`${inter.variable} ${satoshi.variable}`}>
      <body className="font-body bg-bg-primary text-text-primary antialiased">
        {children}
      </body>
    </html>
  )
}
```

---

## 3. Global CSS

```css
/* app/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* Colors */
    --bg-primary: #0A0A0B;
    --bg-surface: #141415;
    --bg-elevated: #1C1C1E;
    --border: #2A2A2D;
    --text-primary: #FFFFFF;
    --text-secondary: #A1A1A6;
    --text-muted: #6B6B70;
    --accent-orange: #FF6B2C;
    --accent-amber: #FFB347;
    
    /* Spacing */
    --spacing-section: 5rem;
    
    /* Shadows */
    --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.1);
    --shadow-md: 0 4px 16px rgba(0, 0, 0, 0.15);
    --shadow-lg: 0 4px 24px rgba(0, 0, 0, 0.2);
    --shadow-glow: 0 0 24px rgba(255, 107, 44, 0.3);
  }
  
  * {
    @apply border-border;
  }
  
  body {
    @apply bg-bg-primary text-text-primary;
  }
  
  html {
    scroll-behavior: smooth;
  }
}

@layer components {
  .gradient-text {
    @apply bg-gradient-to-r from-accent-orange to-accent-amber bg-clip-text text-transparent;
  }
  
  .glass-effect {
    @apply backdrop-blur-md bg-bg-surface/70 border border-white/10;
  }
  
  .section-container {
    @apply max-w-7xl mx-auto px-6 py-20 md:py-32;
  }
}

@layer utilities {
  .text-balance {
    text-wrap: balance;
  }
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: var(--bg-surface);
}

::-webkit-scrollbar-thumb {
  background: var(--border);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--accent-orange);
}
```

---

## 4. Utility Functions

```typescript
// lib/utils.ts
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
  }).format(price)
}

export function scrollToElement(id: string) {
  const element = document.getElementById(id)
  if (element) {
    const offset = 80 // Header height
    const bodyRect = document.body.getBoundingClientRect().top
    const elementRect = element.getBoundingClientRect().top
    const elementPosition = elementRect - bodyRect
    const offsetPosition = elementPosition - offset

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    })
  }
}
```

---

## 5. Form Validation Schema

```typescript
// lib/validations.ts
import { z } from 'zod'

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Il nome deve contenere almeno 2 caratteri')
    .max(100, 'Il nome è troppo lungo'),
  email: z
    .string()
    .email('Inserisci un indirizzo email valido')
    .min(5, 'Email troppo corta'),
  phone: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^[\d\s\+\-\(\)]+$/.test(val),
      'Formato telefono non valido'
    ),
  projectType: z.enum(['landing', 'website', 'ecommerce', 'other'], {
    required_error: 'Seleziona un tipo di progetto',
  }),
  budget: z.enum(['1-2k', '2-4k', '4-6k', '6k+'], {
    required_error: 'Seleziona un budget',
  }),
  message: z.string().max(1000, 'Messaggio troppo lungo').optional(),
  privacy: z.boolean().refine((val) => val === true, {
    message: 'Devi accettare la privacy policy',
  }),
})

export type ContactFormData = z.infer<typeof contactFormSchema>
```

---

## 6. Custom Hooks

```typescript
// lib/hooks/useInView.ts
import { useEffect, useRef, useState } from 'react'

interface UseInViewOptions {
  threshold?: number
  triggerOnce?: boolean
  rootMargin?: string
}

export function useInView(options: UseInViewOptions = {}) {
  const { threshold = 0.1, triggerOnce = true, rootMargin = '0px' } = options
  const ref = useRef<HTMLElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          if (triggerOnce && ref.current) {
            observer.unobserve(ref.current)
          }
        } else if (!triggerOnce) {
          setInView(false)
        }
      },
      { threshold, rootMargin }
    )

    const currentRef = ref.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [threshold, triggerOnce, rootMargin])

  return [ref, inView] as const
}

// lib/hooks/useMediaQuery.ts
import { useEffect, useState } from 'react'

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)
    if (media.matches !== matches) {
      setMatches(media.matches)
    }

    const listener = () => setMatches(media.matches)
    media.addEventListener('change', listener)
    return () => media.removeEventListener('change', listener)
  }, [matches, query])

  return matches
}

// lib/hooks/useScrollProgress.ts
import { useEffect, useState } from 'react'

export function useScrollProgress(): number {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const updateProgress = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrolled = (window.scrollY / scrollHeight) * 100
      setProgress(Math.min(scrolled, 100))
    }

    window.addEventListener('scroll', updateProgress)
    updateProgress()

    return () => window.removeEventListener('scroll', updateProgress)
  }, [])

  return progress
}
```

---

## 7. Animated Counter Component

```typescript
// components/AnimatedCounter.tsx
'use client'

import { useEffect, useState } from 'react'
import { useInView } from '@/lib/hooks/useInView'

interface AnimatedCounterProps {
  end: number
  duration?: number
  suffix?: string
  className?: string
}

export function AnimatedCounter({
  end,
  duration = 2000,
  suffix = '',
  className = '',
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0)
  const [ref, inView] = useInView({ triggerOnce: true })

  useEffect(() => {
    if (!inView) return

    let startTime: number
    let animationFrame: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = timestamp - startTime
      const percentage = Math.min(progress / duration, 1)

      setCount(Math.floor(end * percentage))

      if (percentage < 1) {
        animationFrame = requestAnimationFrame(animate)
      } else {
        setCount(end)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [inView, end, duration])

  return (
    <span ref={ref} className={className}>
      {count}
      {suffix}
    </span>
  )
}
```

---

## 8. Section Wrapper Component

```typescript
// components/Section.tsx
import { cn } from '@/lib/utils'

interface SectionProps {
  id?: string
  className?: string
  children: React.ReactNode
}

export function Section({ id, className, children }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        'py-20 md:py-32 px-6',
        'max-w-7xl mx-auto',
        className
      )}
    >
      {children}
    </section>
  )
}

interface SectionHeaderProps {
  title: string
  description?: string
  centered?: boolean
  className?: string
}

export function SectionHeader({
  title,
  description,
  centered = true,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn('mb-16', centered && 'text-center', className)}>
      <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
        {title}
      </h2>
      {description && (
        <p className="text-lg text-text-secondary max-w-2xl mx-auto">
          {description}
        </p>
      )}
    </div>
  )
}
```

---

## 9. Framer Motion Variants

```typescript
// lib/motion-variants.ts
export const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1],
    },
  },
}

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.4 },
  },
}

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

export const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
}

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5 },
  },
}
```

---

## 10. API Route per Contact Form

```typescript
// app/api/contact/route.ts
import { NextResponse } from 'next/server'
import { contactFormSchema } from '@/lib/validations'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate data
    const validatedData = contactFormSchema.parse(body)

    // Send email
    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!,
      to: process.env.RESEND_TO_EMAIL!,
      subject: `Nuovo contatto da ${validatedData.name}`,
      html: `
        <h2>Nuova richiesta preventivo</h2>
        <p><strong>Nome:</strong> ${validatedData.name}</p>
        <p><strong>Email:</strong> ${validatedData.email}</p>
        ${validatedData.phone ? `<p><strong>Telefono:</strong> ${validatedData.phone}</p>` : ''}
        <p><strong>Tipo progetto:</strong> ${validatedData.projectType}</p>
        <p><strong>Budget:</strong> ${validatedData.budget}</p>
        ${validatedData.message ? `<p><strong>Messaggio:</strong><br>${validatedData.message}</p>` : ''}
      `,
    })

    if (error) {
      return NextResponse.json(
        { success: false, message: 'Errore invio email' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Messaggio inviato con successo',
    })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { success: false, message: 'Errore durante l\'invio' },
      { status: 500 }
    )
  }
}
```

---

## 11. Hero Section Example

```typescript
// components/sections/Hero.tsx
'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { AnimatedCounter } from '@/components/AnimatedCounter'
import { scrollToElement } from '@/lib/utils'

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-bg-primary via-bg-surface to-bg-primary">
        <div className="absolute inset-0 bg-[url('/grain.svg')] opacity-[0.05]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-bg-surface border border-border mb-8">
            <span className="text-sm text-text-secondary">
              ✨ 12+ progetti completati
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6">
            <span className="gradient-text">
              Siti web professionali
            </span>
            <br />
            in 10 giorni che portano clienti
          </h1>

          {/* Subheadline */}
          <p className="text-xl text-text-secondary max-w-2xl mx-auto mb-10">
            Dalla prima bozza al lancio: design moderno, SEO incluso e garanzia
            soddisfazione. Tu pensi al tuo business, noi al tuo sito.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button
              size="lg"
              className="group"
              onClick={() => scrollToElement('cta-form')}
            >
              Richiedi preventivo gratuito
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollToElement('portfolio')}
            >
              Vedi il portfolio
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div>
              <div className="text-3xl font-bold gradient-text">
                <AnimatedCounter end={12} suffix="+" />
              </div>
              <p className="text-sm text-text-muted">Progetti completati</p>
            </div>
            <div>
              <div className="text-3xl font-bold gradient-text">
                <AnimatedCounter end={95} suffix="%" />
              </div>
              <p className="text-sm text-text-muted">Clienti soddisfatti</p>
            </div>
            <div>
              <div className="text-3xl font-bold gradient-text">
                <AnimatedCounter end={10} suffix=" giorni" />
              </div>
              <p className="text-sm text-text-muted">Consegna media</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
```

---

## 12. Card Component con Hover Effect

```typescript
// components/ui/card.tsx (estendi shadcn)
'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import * as React from 'react'

interface AnimatedCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
}

export function AnimatedCard({
  children,
  className,
  ...props
}: AnimatedCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className={cn(
        'rounded-xl border border-border bg-bg-surface p-6',
        'hover:border-accent-orange hover:shadow-lg',
        'transition-colors duration-300',
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  )
}
```

---

## 13. Environment Variables Example

```bash
# .env.local
NEXT_PUBLIC_SITE_URL=https://pixarts.eu

# Email (Resend)
RESEND_API_KEY=re_123456789
RESEND_FROM_EMAIL=noreply@pixarts.eu
RESEND_TO_EMAIL=info@pixarts.eu

# Analytics (Optional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

---

Questi snippets ti permettono di partire immediatamente senza dover scrivere il boilerplate da zero. Combinali con i file di documentazione per una implementazione rapida e pulita! 🚀
