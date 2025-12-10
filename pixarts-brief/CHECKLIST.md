# Checklist Implementazione Pixarts Landing

## Setup Iniziale

### 1. Inizializzazione Progetto
```bash
npx create-next-app@latest pixarts-landing --typescript --tailwind --app
cd pixarts-landing
```

**Opzioni da selezionare:**
- ✅ TypeScript
- ✅ ESLint
- ✅ Tailwind CSS
- ✅ `src/` directory: No
- ✅ App Router: Yes
- ✅ Import alias: Yes (@/*)

### 2. Installazione Dipendenze
```bash
# Core dependencies
npm install framer-motion lucide-react
npm install react-hook-form @hookform/resolvers zod
npm install clsx tailwind-merge class-variance-authority

# shadcn/ui setup
npx shadcn-ui@latest init
npx shadcn-ui@latest add button card input textarea select accordion badge dialog

# Email service (scegli uno)
npm install resend
# oppure
npm install nodemailer @types/nodemailer

# Optional: Analytics
npm install @vercel/analytics

# Optional: Confetti
npm install canvas-confetti @types/canvas-confetti
```

### 3. Configurazione Tailwind
Aggiorna `tailwind.config.ts` con:
- Custom colors (da DESIGN_SYSTEM.md)
- Custom fonts
- Custom animations
- Plugins (@tailwindcss/typography, @tailwindcss/forms)

### 4. Download Fonts
1. Scarica Satoshi da https://www.fontshare.com/fonts/satoshi
2. Crea cartella `public/fonts/`
3. Copia .woff2 files:
   - Satoshi-Regular.woff2
   - Satoshi-Medium.woff2
   - Satoshi-SemiBold.woff2
   - Satoshi-Bold.woff2

### 5. Setup Font in Layout
Configura `app/layout.tsx` con:
- Import fonts (Inter da next/font, Satoshi local)
- CSS variables per fonts
- Metadata SEO

### 6. CSS Globale
Aggiorna `app/globals.css` con:
- @tailwind directives
- CSS variables del design system
- Custom animations keyframes
- Utility classes

---

## Fase 1: Struttura Base (2-3 ore)

### ✅ File Structure
```
app/
├── layout.tsx
├── page.tsx
├── globals.css
└── api/
    └── contact/
        └── route.ts

components/
├── sections/
│   ├── Hero.tsx
│   ├── SocialProof.tsx
│   ├── Problems.tsx
│   ├── Solution.tsx
│   ├── Portfolio.tsx
│   ├── Process.tsx
│   ├── BenefitGrid.tsx
│   ├── Guarantee.tsx
│   ├── Pricing.tsx
│   ├── Testimonials.tsx
│   ├── FAQ.tsx
│   └── CTAFinal.tsx
├── ui/ (shadcn components)
├── Header.tsx
├── Footer.tsx
└── AnimatedBackground.tsx

lib/
├── utils.ts
├── validations.ts
└── constants.ts

public/
├── fonts/
└── images/
    ├── logo.svg
    ├── og-image.png
    └── portfolio/
```

### ✅ Constants File
Crea `lib/constants.ts` con tutti i dati da CONTENT.md:
- PORTFOLIO_PROJECTS
- PROBLEMS
- VALUE_PROPS
- PROCESS_STEPS
- BENEFITS
- GUARANTEES
- PRICING_PLANS
- MAINTENANCE_PLAN
- TESTIMONIALS
- FAQS

### ✅ Utils File
Crea `lib/utils.ts`:
```typescript
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

### ✅ Validations File
Crea `lib/validations.ts` con Zod schema del form contatto

---

## Fase 2: Layout Components (2-3 ore)

### ✅ Header Component
- [ ] Logo (link to #home)
- [ ] Navigation desktop (5 links)
- [ ] CTA button
- [ ] Sticky con scroll effect
- [ ] Mobile hamburger menu
- [ ] Glass effect background
- [ ] Smooth scroll su links

**Test:**
- Sticky funziona
- Shadow appare su scroll
- Links scrollano smooth alle sezioni
- Mobile menu si apre/chiude correttamente

### ✅ Footer Component
- [ ] 4 colonne (About, Servizi, Risorse, Legale)
- [ ] Logo + tagline + social icons
- [ ] Links lists
- [ ] Bottom bar con copyright
- [ ] Responsive (1 colonna su mobile)

**Test:**
- Layout responsive
- Links funzionanti
- Social icons hover effect

### ✅ AnimatedBackground Component
- [ ] Gradient animato
- [ ] Grain texture overlay
- [ ] CSS-only animation
- [ ] Performance ottimizzata

**Test:**
- Animazione smooth
- No jank su scroll
- Colori corretti

---

## Fase 3: Hero Section (2-3 ore)

### ✅ Hero Component
- [ ] Badge animato (optional)
- [ ] H1 con gradient text
- [ ] Subheadline
- [ ] CTA buttons group
- [ ] Stats row con counters
- [ ] Fade in stagger animation
- [ ] Ripple effect su CTA
- [ ] Parallax su scroll

### ✅ AnimatedCounter Component
- [ ] Count from 0 to end
- [ ] Intersection Observer
- [ ] Smooth animation
- [ ] Format numbers con +

**Test:**
- Animazioni smooth
- Counters partono quando visibili
- CTA ripple funziona
- Responsive layout

---

## Fase 4: Content Sections (4-5 ore)

### ✅ SocialProof Section
- [ ] Headline
- [ ] 2 portfolio cards
- [ ] 3D tilt on hover
- [ ] External links
- [ ] Images loading

**Test:**
- Tilt effect smooth
- Links aperti in new tab
- Images ottimizzate

### ✅ Problems Section
- [ ] Headline
- [ ] 3 cards grid
- [ ] Icons correct
- [ ] Hover effects
- [ ] Stagger animation

**Test:**
- Grid responsive
- Hover lift funziona
- Icons colore corretto

### ✅ Solution Section
- [ ] Text block
- [ ] 4 cards grid (2x2)
- [ ] Icons gradient bg
- [ ] Hover scale
- [ ] Cascade animation

**Test:**
- Layout responsive
- Animazioni smooth
- Icons rendering

### ✅ Portfolio Section
- [ ] 2 project cards
- [ ] Alternating layout
- [ ] Image parallax
- [ ] Metrics animated
- [ ] External links

**Test:**
- Layout alternates correctly
- Parallax smooth
- Counters animate
- Links funzionano

### ✅ Process Section
- [ ] 4 step cards
- [ ] Timeline connector
- [ ] Progressive reveal
- [ ] Icons pulse
- [ ] Horizontal → vertical responsive

**Test:**
- Timeline draws on scroll
- Steps reveal in order
- Responsive layout

### ✅ BenefitGrid Section
- [ ] 6 cards grid (3x2)
- [ ] Icons accent color
- [ ] Hover glow
- [ ] Wave stagger animation

**Test:**
- Grid responsive
- Hover effects
- Animation timing

---

## Fase 5: Conversion Sections (3-4 ore)

### ✅ Guarantee Section
- [ ] Elevated background
- [ ] Gradient border
- [ ] 3 cards con badges
- [ ] Section glow pulse
- [ ] Scale in animation

**Test:**
- Special styling applied
- Badges visible
- Glow effect subtle

### ✅ Pricing Section
- [ ] 3 pricing cards
- [ ] Popular card highlighted
- [ ] Feature lists
- [ ] Price counters
- [ ] CTA buttons different styles
- [ ] Maintenance card (horizontal)

**Test:**
- Popular card stands out
- Prices animate
- All features listed
- Responsive stacking

### ✅ Testimonials Section
- [ ] Carousel (3 visible desktop)
- [ ] Auto-play 5s
- [ ] Navigation dots
- [ ] Drag to scroll
- [ ] Stars rating
- [ ] Avatar initials

**Test:**
- Auto-play works
- Drag smooth
- Transitions smooth
- Responsive (1 visible mobile)

### ✅ FAQ Section
- [ ] Accordion (6 items)
- [ ] One open at a time
- [ ] Chevron rotation
- [ ] Smooth expand/collapse
- [ ] Keyboard accessible

**Test:**
- Only one open at time
- Animations smooth
- Keyboard navigation works
- Content readable

---

## Fase 6: Form & API (2-3 ore)

### ✅ CTAFinal Section
- [ ] Headline + subheadline
- [ ] Form 2 columns layout
- [ ] All fields (7 total)
- [ ] Real-time validation
- [ ] Error states
- [ ] Loading state
- [ ] Success state
- [ ] Privacy checkbox

**Form Fields:**
- [ ] Nome e Cognome (text, required)
- [ ] Email (email, required)
- [ ] Telefono (tel, optional)
- [ ] Tipo progetto (select, required)
- [ ] Budget (select, required)
- [ ] Messaggio (textarea, optional)
- [ ] Privacy (checkbox, required)

### ✅ API Route
File: `app/api/contact/route.ts`
- [ ] Zod validation
- [ ] Send email (Resend/Nodemailer)
- [ ] Error handling
- [ ] CORS headers
- [ ] Rate limiting (optional)

**Test:**
- Validation works
- Email sends correctly
- Error messages show
- Success state triggers
- Confetti animates (optional)

---

## Fase 7: Animazioni & UX (2-3 ore)

### ✅ Scroll Behaviors
- [ ] Smooth scroll on anchor links
- [ ] Scroll progress bar
- [ ] Scroll to top button (shows after 500px)
- [ ] Section animations on scroll

### ✅ Hover Effects
- [ ] All cards lift on hover
- [ ] Icons scale/rotate
- [ ] Buttons ripple
- [ ] Links color change

### ✅ Loading States
- [ ] Form submit loading
- [ ] Image placeholders
- [ ] Skeleton screens (optional)

### ✅ Accessibility
- [ ] Keyboard navigation works
- [ ] Focus visible on all interactive elements
- [ ] ARIA labels on icons
- [ ] Alt text on images
- [ ] Form labels properly associated
- [ ] Respects prefers-reduced-motion

**Test:**
- Tab through entire page
- Test with screen reader
- Check contrast ratios
- Disable JavaScript (should show content)

---

## Fase 8: Content & Assets (1-2 ore)

### ✅ Images
Crea/trova images per:
- [ ] Logo Pixarts (SVG)
- [ ] OG image (1200x630px)
- [ ] Favicon (multiple sizes)
- [ ] Portfolio screenshots (FlowMatics, Quickfy)
- [ ] Placeholder avatar images (optional)

**Ottimizzazione:**
- [ ] Convert to WebP
- [ ] Multiple sizes (srcset)
- [ ] Compress (TinyPNG, Squoosh)
- [ ] Max 200KB per image

### ✅ Testi
- [ ] Copy/paste da CONTENT.md
- [ ] Verifica typos
- [ ] Controlla link URLs
- [ ] Test form labels

---

## Fase 9: Testing (2-3 ore)

### ✅ Visual Testing
**Desktop (1920x1080):**
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge

**Tablet (768x1024):**
- [ ] iPad layout
- [ ] All sections readable

**Mobile (375x667):**
- [ ] iPhone layout
- [ ] Touch targets 44px+
- [ ] No horizontal scroll

### ✅ Functional Testing
- [ ] All links work
- [ ] All buttons work
- [ ] Form validates correctly
- [ ] Form submits successfully
- [ ] Email arrives
- [ ] Animations play
- [ ] Carousel auto-plays
- [ ] Accordion opens/closes

### ✅ Performance Testing
**Lighthouse Score (Desktop):**
- [ ] Performance: 90+
- [ ] Accessibility: 95+
- [ ] Best Practices: 95+
- [ ] SEO: 100

**Core Web Vitals:**
- [ ] LCP < 2.5s
- [ ] FID < 100ms
- [ ] CLS < 0.1

**Bundle Size:**
- [ ] Initial JS < 200KB (gzipped)
- [ ] Total page < 1MB
- [ ] Images lazy loaded

### ✅ SEO Testing
- [ ] Title tag correct
- [ ] Meta description correct
- [ ] OG tags present
- [ ] Twitter card tags
- [ ] Sitemap.xml generated
- [ ] Robots.txt present
- [ ] Schema.org markup (optional)

---

## Fase 10: Deploy (1-2 ore)

### ✅ Pre-Deploy Checklist
- [ ] Remove console.logs
- [ ] Check .env.local variables
- [ ] Test build locally (`npm run build`)
- [ ] Check for TypeScript errors
- [ ] Check for ESLint warnings
- [ ] Optimize images
- [ ] Generate favicon pack

### ✅ Vercel Deploy
```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Production deploy
vercel --prod
```

**Configure Vercel:**
- [ ] Add environment variables
- [ ] Custom domain (pixarts.eu)
- [ ] SSL certificate (automatic)
- [ ] Analytics enabled (optional)

### ✅ Post-Deploy Testing
- [ ] Test all pages on production URL
- [ ] Verify form submission works
- [ ] Check SSL certificate
- [ ] Test from different locations
- [ ] Check Google PageSpeed Insights

---

## Fase 11: Polish & Handoff (1-2 ore)

### ✅ Documentation
Crea `DEPLOYMENT.md`:
- [ ] Come fare deploy
- [ ] Come aggiornare contenuti
- [ ] Come modificare prezzi
- [ ] Come gestire form submissions
- [ ] Environment variables needed

### ✅ Training Materials
- [ ] How to add new testimonial
- [ ] How to update portfolio
- [ ] How to change pricing
- [ ] How to manage form emails
- [ ] How to check analytics

### ✅ Final QA
- [ ] Tutti i link funzionano
- [ ] Email corretto in footer
- [ ] Social links corretti
- [ ] Privacy policy link (TBD)
- [ ] Cookie policy link (TBD)
- [ ] Termini e condizioni link (TBD)

---

## Issues Comuni e Soluzioni

### Fonts non si caricano
```typescript
// Verifica che i path siano corretti
src: './fonts/Satoshi-Bold.woff2' // ✅
src: '/fonts/Satoshi-Bold.woff2'  // ❌
```

### Animazioni lag su mobile
```typescript
// Usa CSS transforms invece di left/top
transform: translateX(100px) // ✅
left: 100px                   // ❌

// Rispetta prefers-reduced-motion
const shouldReduce = useMediaQuery('(prefers-reduced-motion: reduce)')
```

### Immagini non ottimizzate
```typescript
// Usa sempre next/image
import Image from 'next/image'

<Image
  src="/images/hero.jpg"
  alt="Description"
  width={800}
  height={600}
  priority={true} // per above-the-fold
  placeholder="blur"
/>
```

### Form non invia email
```typescript
// Verifica API route
// Controlla .env.local
RESEND_API_KEY=re_...
RESEND_FROM_EMAIL=noreply@pixarts.eu
RESEND_TO_EMAIL=info@pixarts.eu

// Test con curl
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com",...}'
```

### Build fallisce
```bash
# Check TypeScript errors
npm run type-check

# Check ESLint
npm run lint

# Clear cache
rm -rf .next
npm run build
```

---

## Quality Gates

### Minimum Requirements
- ✅ All sections implemented
- ✅ Responsive design works
- ✅ Form submission works
- ✅ Lighthouse Performance 90+
- ✅ No console errors
- ✅ All links work

### Nice-to-Have
- ⭐ Lighthouse Performance 95+
- ⭐ Confetti animation on form success
- ⭐ 3D tilt effects on cards
- ⭐ Advanced animations
- ⭐ Custom cursor (optional)
- ⭐ Easter eggs (optional)

---

## Timeline Stimato

| Fase | Tempo | Cumulative |
|------|-------|------------|
| 1. Setup iniziale | 1h | 1h |
| 2. Struttura base | 2-3h | 3-4h |
| 3. Layout components | 2-3h | 5-7h |
| 4. Hero section | 2-3h | 7-10h |
| 5. Content sections | 4-5h | 11-15h |
| 6. Conversion sections | 3-4h | 14-19h |
| 7. Form & API | 2-3h | 16-22h |
| 8. Animazioni & UX | 2-3h | 18-25h |
| 9. Content & Assets | 1-2h | 19-27h |
| 10. Testing | 2-3h | 21-30h |
| 11. Deploy | 1-2h | 22-32h |
| 12. Polish & Handoff | 1-2h | 23-34h |

**Total: 23-34 ore (3-5 giorni lavorativi)**

---

## Support & Resources

### Documentation Links
- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Framer Motion Docs](https://www.framer.com/motion/)
- [shadcn/ui Docs](https://ui.shadcn.com/)
- [Lucide Icons](https://lucide.dev/)

### Design Resources
- [Figma File](TBD)
- [Style Guide](DESIGN_SYSTEM.md)
- [Content Doc](CONTENT.md)
- [Component Specs](COMPONENTS.md)

### Contact
- Email: [TBD]
- Project Manager: [TBD]

---

## Sign-Off

### Developer Checklist
- [ ] Code reviewed
- [ ] Tests passing
- [ ] Documentation complete
- [ ] Deployed to production
- [ ] Client walkthrough done

### Client Acceptance
- [ ] Design approved
- [ ] Content approved
- [ ] Functionality approved
- [ ] Training received
- [ ] Documentation received

**Project Completed:** [Date]
**Signed by:** [Name]
