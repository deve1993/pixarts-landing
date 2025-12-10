# Stack Tecnico Pixarts Landing Page

## Framework & Runtime
```json
{
  "next": "16.0.7",
  "react": "19.0.0",
  "react-dom": "19.0.0",
  "node": ">=18.0.0"
}
```

### Next.js Configuration
- **App Router** (app directory)
- **Server Components** by default
- **Static Generation** (generateStaticParams)
- **Image Optimization** (next/image)

---

## Language & Type Safety
```json
{
  "typescript": "5.7.2"
}
```

### TypeScript Configuration
- Strict mode enabled
- Path aliases configured (@/components, @/lib, etc.)
- Type-safe environment variables

---

## Styling

### Tailwind CSS
```json
{
  "tailwindcss": "4.0.0",
  "@tailwindcss/typography": "latest",
  "@tailwindcss/forms": "latest"
}
```

### Tailwind Config (tailwind.config.ts)
```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
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
          border: '#2A2A2D',
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

## Animation Library
```json
{
  "framer-motion": "11.13.5"
}
```

### Framer Motion Usage
- Page transitions
- Scroll-triggered animations
- Hover effects
- Gesture handling (drag, tap)
- Layout animations

### Key Features to Implement
```typescript
import { motion, useScroll, useInView, AnimatePresence } from 'framer-motion'

// Fade in on scroll
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
}

// Stagger children
const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

// Parallax
const { scrollYProgress } = useScroll()
const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
```

---

## UI Components (shadcn/ui)
```json
{
  "@radix-ui/react-accordion": "latest",
  "@radix-ui/react-dialog": "latest",
  "@radix-ui/react-dropdown-menu": "latest",
  "@radix-ui/react-select": "latest",
  "@radix-ui/react-tabs": "latest",
  "class-variance-authority": "latest",
  "clsx": "latest",
  "tailwind-merge": "latest"
}
```

### Components to Install
```bash
npx shadcn-ui@latest init
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
npx shadcn-ui@latest add input
npx shadcn-ui@latest add textarea
npx shadcn-ui@latest add select
npx shadcn-ui@latest add accordion
npx shadcn-ui@latest add dialog
npx shadcn-ui@latest add badge
```

---

## Icons
```json
{
  "lucide-react": "latest"
}
```

### Icons Used
```typescript
import {
  Zap,
  Sparkles,
  Shield,
  CheckCircle,
  CircleX,
  Clock,
  CircuitBoard,
  MessageSquare,
  Palette,
  Code,
  Rocket,
  TrendingUp,
  Search,
  Smartphone,
  Lock,
  HeadphonesIcon,
  RotateCcw,
  Users,
  ChevronDown,
  Menu,
  X,
  ExternalLink,
  Mail,
  Linkedin,
  Instagram,
  ArrowRight
} from 'lucide-react'
```

---

## Form Handling
```json
{
  "react-hook-form": "latest",
  "@hookform/resolvers": "latest",
  "zod": "latest"
}
```

### Form Schema Example
```typescript
import { z } from 'zod'

export const contactFormSchema = z.object({
  name: z.string().min(2, 'Nome troppo corto'),
  email: z.string().email('Email non valida'),
  phone: z.string().optional(),
  projectType: z.enum(['landing', 'website', 'ecommerce', 'other']),
  budget: z.enum(['1-2k', '2-4k', '4-6k', '6k+']),
  message: z.string().optional(),
  privacy: z.boolean().refine(val => val === true, {
    message: 'Devi accettare la privacy policy'
  })
})

export type ContactFormData = z.infer<typeof contactFormSchema>
```

---

## Font Management

### Google Fonts (next/font)
```typescript
import { Inter } from 'next/font/google'
import localFont from 'next/font/local'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const satoshi = localFont({
  src: [
    {
      path: './fonts/Satoshi-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/Satoshi-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/Satoshi-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-satoshi',
  display: 'swap',
})
```

### Font Files Location
```
public/fonts/
├── Satoshi-Regular.woff2
├── Satoshi-Medium.woff2
├── Satoshi-Bold.woff2
└── Satoshi-SemiBold.woff2
```

### Font Download Sources
- **Satoshi:** https://www.fontshare.com/fonts/satoshi (free)
- **Inter:** Google Fonts (via next/font)

---

## Utilities
```json
{
  "clsx": "latest",
  "tailwind-merge": "latest"
}
```

### cn() Helper
```typescript
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

---

## Email Service (Form Submission)

### Options (Pick One)

#### Option 1: Resend (Recommended)
```json
{
  "resend": "latest"
}
```

#### Option 2: Nodemailer
```json
{
  "nodemailer": "latest"
}
```

#### Option 3: FormSubmit.co
- No dependencies
- HTML form action to FormSubmit endpoint
- Free tier available

---

## Analytics (Optional)

### Vercel Analytics
```json
{
  "@vercel/analytics": "latest"
}
```

### Google Analytics
```typescript
// app/layout.tsx
import Script from 'next/script'

<Script
  src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
  strategy="afterInteractive"
/>
```

---

## SEO

### next-seo (Optional)
```json
{
  "next-seo": "latest"
}
```

### Metadata Configuration
```typescript
// app/layout.tsx
export const metadata: Metadata = {
  title: 'Pixarts - Siti Web Professionali in 10 Giorni | Web Design Italia',
  description: 'Crea il tuo sito web professionale in 10 giorni. Design moderno, SEO incluso, garanzia soddisfazione. Da €1.200.',
  keywords: 'siti web professionali, web design italia, landing page',
  openGraph: {
    title: 'Pixarts - Siti Web Professionali',
    description: 'Design moderno, consegna in 10 giorni, garanzia tripla',
    url: 'https://pixarts.eu',
    siteName: 'Pixarts',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'it_IT',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pixarts - Siti Web Professionali',
    description: 'Design moderno, consegna in 10 giorni',
    images: ['/og-image.png'],
  },
}
```

---

## Development Tools
```json
{
  "@types/node": "latest",
  "@types/react": "latest",
  "@types/react-dom": "latest",
  "eslint": "latest",
  "eslint-config-next": "latest",
  "prettier": "latest",
  "prettier-plugin-tailwindcss": "latest"
}
```

### ESLint Config
```json
{
  "extends": ["next/core-web-vitals", "prettier"],
  "rules": {
    "react/no-unescaped-entities": "off"
  }
}
```

### Prettier Config
```json
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 80,
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

---

## Project Structure
```
pixarts-landing/
├── app/
│   ├── layout.tsx          # Root layout with fonts
│   ├── page.tsx            # Home page
│   ├── api/
│   │   └── contact/
│   │       └── route.ts    # Contact form API
│   └── globals.css         # Global styles + Tailwind
├── components/
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── SocialProof.tsx
│   │   ├── Problems.tsx
│   │   ├── Solution.tsx
│   │   ├── Portfolio.tsx
│   │   ├── Process.tsx
│   │   ├── BenefitGrid.tsx
│   │   ├── Guarantee.tsx
│   │   ├── Pricing.tsx
│   │   ├── Testimonials.tsx
│   │   ├── FAQ.tsx
│   │   └── CTAFinal.tsx
│   ├── ui/                 # shadcn components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── accordion.tsx
│   │   └── ...
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── AnimatedBackground.tsx
├── lib/
│   ├── utils.ts            # cn() helper
│   ├── validations.ts      # Zod schemas
│   └── constants.ts        # Static data
├── public/
│   ├── fonts/
│   ├── images/
│   │   ├── og-image.png
│   │   ├── logo.svg
│   │   └── portfolio/
│   └── favicon.ico
├── styles/
│   └── animations.css      # Custom animations
├── .env.local
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

---

## Environment Variables
```bash
# .env.local
NEXT_PUBLIC_SITE_URL=https://pixarts.eu

# Email (if using Resend)
RESEND_API_KEY=your_api_key_here
RESEND_FROM_EMAIL=noreply@pixarts.eu
RESEND_TO_EMAIL=info@pixarts.eu

# Analytics (optional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

---

## Build & Deploy

### Build Commands
```bash
npm run dev       # Development server
npm run build     # Production build
npm run start     # Production server
npm run lint      # ESLint check
```

### Deployment (Vercel Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production deployment
vercel --prod
```

### Performance Targets
- **Lighthouse Score:** 90+ all categories
- **First Contentful Paint:** < 1.5s
- **Time to Interactive:** < 3.5s
- **Cumulative Layout Shift:** < 0.1

---

## Critical CSS
Generate critical CSS for above-the-fold content:
```typescript
// next.config.js
module.exports = {
  experimental: {
    optimizeCss: true,
  },
}
```

---

## Image Optimization

### Next.js Image Component
```typescript
import Image from 'next/image'

<Image
  src="/images/portfolio/flowmatics.png"
  alt="FlowMatics Dashboard"
  width={800}
  height={600}
  quality={85}
  priority={false} // true for above-the-fold
  placeholder="blur"
  blurDataURL="data:image/..."
/>
```

### Image Formats
- WebP with PNG/JPG fallback
- SVG for logos and icons
- Optimized with sharp (automatic in Next.js)

---

## Security Headers
```typescript
// next.config.js
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin'
  }
]
```

---

## Complete package.json
```json
{
  "name": "pixarts-landing",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "16.0.7",
    "react": "19.0.0",
    "react-dom": "19.0.0",
    "typescript": "5.7.2",
    "framer-motion": "11.13.5",
    "lucide-react": "latest",
    "tailwindcss": "4.0.0",
    "@tailwindcss/typography": "latest",
    "@tailwindcss/forms": "latest",
    "react-hook-form": "latest",
    "@hookform/resolvers": "latest",
    "zod": "latest",
    "@radix-ui/react-accordion": "latest",
    "@radix-ui/react-dialog": "latest",
    "@radix-ui/react-select": "latest",
    "class-variance-authority": "latest",
    "clsx": "latest",
    "tailwind-merge": "latest",
    "resend": "latest"
  },
  "devDependencies": {
    "@types/node": "latest",
    "@types/react": "latest",
    "@types/react-dom": "latest",
    "eslint": "latest",
    "eslint-config-next": "latest",
    "prettier": "latest",
    "prettier-plugin-tailwindcss": "latest"
  }
}
```
