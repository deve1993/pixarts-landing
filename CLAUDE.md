# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

```bash
pnpm dev       # Start development server (frontend + Payload admin)
pnpm build     # Production build
pnpm start     # Start production server
pnpm lint      # ESLint check
```

## Architecture Overview

This is a **Next.js 15** landing page for Pixarts (pixarts.eu), a web design service targeting Italian SMBs. Uses **App Router** with route groups separating frontend and CMS.

### Route Groups Architecture
The app uses Next.js route groups to separate concerns:
- `(frontend)` - Public-facing website with internationalization
- `(payload)` - Payload CMS admin panel at `/admin`

```
src/app/
├── layout.tsx              # Root layout (minimal, passes through)
├── globals.css             # Global styles
├── (frontend)/
│   └── [locale]/           # Internationalized pages (it, en, cs)
│       ├── layout.tsx      # Frontend layout with fonts, providers
│       ├── page.tsx        # Homepage
│       └── prenota/        # Booking page
├── (payload)/
│   ├── layout.tsx          # Payload admin layout
│   ├── admin/[[...segments]]/  # Admin panel routes
│   └── api/[...slug]/      # Payload API routes
└── api/                    # Custom API routes (contact, booking, gdpr)
```

### Payload CMS Integration
- **Database:** SQLite (`payload.db` in root)
- **Config:** `payload.config.ts` in project root
- **Admin:** Available at `/admin`
- **Collections:** Users, Media, Projects, Services, Testimonials, FAQs
- **Globals:** SiteSettings, HomePage, Navigation, Footer
- **Localization:** Payload mirrors next-intl locales (it, en, cs)

### Internationalization (next-intl)
- **Locales:** `it` (default), `en`, `cs`
- Routes under `(frontend)/[locale]/`
- Translations in `src/messages/{locale}.json`
- Italian has no prefix, others use `/en`, `/cs`
- Middleware excludes `/admin`, `/api`, `/media` from i18n processing

### Key Directories
```
src/
├── app/                    # See Route Groups Architecture above
├── components/
│   ├── sections/           # Landing page sections (Hero, Pricing, FAQ, etc.)
│   ├── ui/                 # Base components (Button, Card, Input)
│   ├── booking/            # Booking system components
│   ├── hero-parallax/      # Hero parallax effect components
│   └── portfolio-v2/       # Portfolio gallery components
├── payload/
│   ├── collections/        # Payload collection configs
│   ├── globals/            # Payload global configs
│   └── components/         # Custom admin components (Logo, Icon)
├── lib/
│   ├── utils.ts            # cn() helper, formatPrice(), scrollToElement()
│   ├── validations/        # Zod schemas
│   ├── hooks/              # Custom hooks (useInView, useMediaQuery, useBookingFlow)
│   └── motion-variants.ts  # Framer Motion animation presets
├── emails/                 # React Email templates
├── i18n/                   # next-intl config (routing.ts, request.ts)
└── messages/               # Translation JSON files
```

### Tech Stack
- **Framework:** Next.js 15 with App Router, React 19
- **CMS:** Payload 3.x with SQLite + Lexical editor
- **Styling:** Tailwind CSS 3.4
- **Animations:** Framer Motion
- **Forms:** react-hook-form + Zod validation
- **Icons:** lucide-react
- **Email:** Resend + React Email
- **Calendar Integration:** Google Calendar API

### Path Aliases
Use `@/*` for imports from `src/` (e.g., `@/components/ui/button`)

### Design System Colors
- Background: `bg-primary` (#0A0A0B), `bg-surface` (#141415), `bg-elevated` (#1C1C1E)
- Accent: `accent-orange` (#FF6B2C), `accent-amber` (#FFB347)
- Text: `text-primary` (#FFFFFF), `text-secondary` (#A1A1A6)

### Component Patterns
- Sections export from `src/components/sections/index.ts`
- UI components export from `src/components/ui/index.ts`
- Use `cn()` from `@/lib/utils` for class merging

### API Routes
- `POST /api/contact` - Contact form submission (sends email via Resend)
- `GET/POST /api/booking/*` - Booking system endpoints
- `POST /api/gdpr-request` - GDPR data requests
- `/api/*` (via Payload) - Auto-generated REST/GraphQL endpoints for collections
