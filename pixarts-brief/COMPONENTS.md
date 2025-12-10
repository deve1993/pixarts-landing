# Lista Componenti Pixarts Landing

## Componenti Layout

### 1. Header.tsx
**Props:**
```typescript
interface HeaderProps {
  // No props needed, static navigation
}
```

**Features:**
- Sticky positioning con glass effect
- Shadow on scroll
- Logo con link a #home
- Navigation links (scroll to sections)
- CTA button
- Mobile hamburger menu
- Smooth scroll behavior

**State:**
- `isScrolled` - boolean per shadow effect
- `isMobileMenuOpen` - boolean per mobile menu

---

### 2. Footer.tsx
**Props:**
```typescript
interface FooterProps {
  // No props needed, static content
}
```

**Sections:**
- 4 columns (About, Servizi, Risorse, Legale)
- Logo + tagline + social icons
- Links lists
- Bottom bar con copyright

**Features:**
- Responsive column layout
- Social icons hover effects
- Link hover states

---

## Componenti Sezioni

### 3. Hero.tsx
**Props:**
```typescript
interface HeroProps {
  // No props needed, static content
}
```

**Features:**
- Animated gradient background
- Badge animato (optional)
- Headline con gradient text effect
- Subheadline
- CTA buttons group
- Stats row con animated counters
- Ripple effect on CTA click
- Parallax effect on scroll

**Dependencies:**
- framer-motion per animazioni
- Custom AnimatedBackground component
- AnimatedCounter component

---

### 4. AnimatedBackground.tsx
**Props:**
```typescript
interface AnimatedBackgroundProps {
  // No props, pure visual component
}
```

**Features:**
- Animated gradient (slow rotation)
- Grain texture overlay
- CSS animations only (no JS)

---

### 5. AnimatedCounter.tsx
**Props:**
```typescript
interface AnimatedCounterProps {
  end: number
  duration?: number
  suffix?: string
}
```

**Features:**
- Count from 0 to end value
- Smooth animation
- Intersection Observer (animate on view)
- Number formatting (12+ → "12+")

---

### 6. SocialProof.tsx
**Props:**
```typescript
interface SocialProofProps {
  projects: Array<{
    name: string
    url: string
    type: string
    image: string
  }>
}
```

**Features:**
- Headline
- 2 portfolio cards side-by-side
- 3D tilt effect on hover
- Card glow on hover
- External link to projects

**Dependencies:**
- framer-motion per 3D tilt
- next/image per screenshots

---

### 7. Problems.tsx
**Props:**
```typescript
interface ProblemsProps {
  problems: Array<{
    icon: LucideIcon
    title: string
    description: string
  }>
}
```

**Features:**
- Headline
- 3 cards grid (responsive)
- Icons con accent color
- Hover: lift + border glow
- Stagger animation on scroll

**Dependencies:**
- lucide-react per icons
- framer-motion per animations

---

### 8. Solution.tsx
**Props:**
```typescript
interface SolutionProps {
  headline: string
  description: string
  valueProps: Array<{
    icon: LucideIcon
    title: string
    description: string
  }>
}
```

**Features:**
- Text block (headline + description)
- 4 cards grid (2x2)
- Icons con gradient background
- Hover: scale + shadow
- Cascade animation

**Dependencies:**
- lucide-react
- framer-motion

---

### 9. Portfolio.tsx
**Props:**
```typescript
interface PortfolioProps {
  projects: Array<{
    name: string
    url: string
    type: string
    challenge: string
    solution: string[]
    results: Array<{
      metric: string
      value: string
      icon: LucideIcon
    }>
    image: string
  }>
}
```

**Features:**
- Headline + intro
- 2 project cards (alternating layout)
- Image parallax on scroll
- Animated metrics counters
- External link to projects
- Responsive side-by-side → stacked

**Dependencies:**
- next/image
- framer-motion
- AnimatedCounter

---

### 10. Process.tsx
**Props:**
```typescript
interface ProcessProps {
  steps: Array<{
    number: number
    icon: LucideIcon
    title: string
    description: string
    duration: string
  }>
}
```

**Features:**
- Headline + intro
- 4 step cards
- Animated timeline connector
- Progressive reveal on scroll
- Icons pulse on active step
- Horizontal timeline desktop, vertical mobile

**Dependencies:**
- lucide-react
- framer-motion

---

### 11. BenefitGrid.tsx
**Props:**
```typescript
interface BenefitGridProps {
  benefits: Array<{
    icon: LucideIcon
    title: string
    description: string
  }>
}
```

**Features:**
- Headline
- 6 cards grid (3x2)
- Icons con accent color
- Hover: lift + glow
- Stagger animation (wave pattern)

**Dependencies:**
- lucide-react
- framer-motion

---

### 12. Guarantee.tsx
**Props:**
```typescript
interface GuaranteeProps {
  guarantees: Array<{
    icon: LucideIcon
    badge: string // "10%", "100%", "30gg"
    title: string
    description: string
  }>
}
```

**Features:**
- Special elevated section
- Accent gradient border
- Section glow pulse
- 3 guarantee cards
- Large icon + badge
- Cards scale in on scroll

**Dependencies:**
- lucide-react
- framer-motion

---

### 13. Pricing.tsx
**Props:**
```typescript
interface PricingProps {
  plans: Array<{
    badge: string
    title: string
    price: string
    deliveryTime: string
    idealFor: string
    features: string[]
    isPopular?: boolean
  }>
  maintenancePlan: {
    price: string
    features: string[]
  }
}
```

**Features:**
- Headline + intro
- 3 pricing cards
- Popular plan highlighted (larger, border gradient)
- Feature list con checkmarks
- Price animation (count up)
- CTA buttons (different style per card)
- Extra maintenance card (horizontal)

**Dependencies:**
- lucide-react (CheckCircle)
- framer-motion
- shadcn/ui Button, Card, Badge

---

### 14. Testimonials.tsx
**Props:**
```typescript
interface TestimonialsProps {
  testimonials: Array<{
    name: string
    role: string
    company: string
    text: string
    rating: number
    avatar: string // initials
  }>
}
```

**Features:**
- Headline
- Carousel (3 visible desktop, 1 mobile)
- Auto-play (5s interval)
- Navigation dots
- Drag to scroll
- Stars rating
- Avatar con initials

**Dependencies:**
- framer-motion per carousel
- lucide-react (Star icon)

---

### 15. FAQ.tsx
**Props:**
```typescript
interface FAQProps {
  faqs: Array<{
    question: string
    answer: string
  }>
}
```

**Features:**
- Headline
- Accordion (6 questions)
- One item open at a time
- Smooth expand/collapse
- Chevron icon rotation
- Keyboard accessible

**Dependencies:**
- @radix-ui/react-accordion (or shadcn/ui accordion)
- lucide-react (ChevronDown)
- framer-motion (optional smooth animations)

---

### 16. CTAFinal.tsx
**Props:**
```typescript
interface CTAFinalProps {
  onSubmit: (data: ContactFormData) => Promise<void>
}
```

**Features:**
- Headline + subheadline
- Contact form (2 columns layout)
- Real-time validation
- Error messages
- Loading state
- Success state con confetti
- Glass effect form styling
- Focus states con glow

**Form Fields:**
- Nome e Cognome (required)
- Email (required, validation)
- Telefono (optional)
- Tipo di progetto (select)
- Budget (select)
- Messaggio (textarea, optional)
- Privacy checkbox (required)

**Dependencies:**
- react-hook-form
- @hookform/resolvers/zod
- zod (validation schema)
- shadcn/ui Input, Textarea, Select
- lucide-react (icons)
- canvas-confetti (success animation)

---

## Componenti UI (shadcn/ui)

### 17. Button (ui/button.tsx)
**Variants:**
- default (primary gradient)
- secondary (outline)
- ghost
- link

### 18. Card (ui/card.tsx)
**Components:**
- Card (container)
- CardHeader
- CardTitle
- CardDescription
- CardContent
- CardFooter

### 19. Input (ui/input.tsx)
**Features:**
- Glass effect background
- Focus state con glow
- Error state styling

### 20. Textarea (ui/textarea.tsx)
**Features:**
- Auto-resize
- Character count (optional)
- Focus state

### 21. Select (ui/select.tsx)
**Features:**
- Custom dropdown styling
- Search in options (optional)
- Keyboard navigation

### 22. Accordion (ui/accordion.tsx)
**Features:**
- Single or multiple items open
- Smooth animations
- Custom trigger styling

### 23. Badge (ui/badge.tsx)
**Variants:**
- default
- secondary
- outline
- accent (gradient)

### 24. Dialog (ui/dialog.tsx)
**Features:**
- Modal overlay
- Close on escape
- Focus trap
- Animations

---

## Utility Components

### 25. ScrollToTop.tsx
**Features:**
- Fixed button bottom right
- Show on scroll > 500px
- Smooth scroll to top
- Fade in/out animation

### 26. ScrollProgress.tsx
**Features:**
- Fixed bar at top
- Gradient fill (accent)
- Shows page scroll progress

### 27. LoadingSpinner.tsx
**Props:**
```typescript
interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}
```

**Features:**
- CSS animation
- Accent gradient color
- Different sizes

---

## Hook Personalizzati

### useInView.ts
```typescript
interface UseInViewOptions {
  threshold?: number
  triggerOnce?: boolean
}

function useInView(options?: UseInViewOptions): [
  React.RefObject<HTMLElement>,
  boolean
]
```

**Usage:**
```typescript
const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })
```

### useScrollProgress.ts
```typescript
function useScrollProgress(): number
```

**Usage:**
```typescript
const scrollProgress = useScrollProgress() // 0-100
```

### useMediaQuery.ts
```typescript
function useMediaQuery(query: string): boolean
```

**Usage:**
```typescript
const isMobile = useMediaQuery('(max-width: 768px)')
```

---

## Costanti e Dati (lib/constants.ts)

### Portfolio Projects
```typescript
export const PORTFOLIO_PROJECTS = [
  {
    name: 'FlowMatics',
    url: 'https://flowmatics.eu',
    type: 'Automazione Marketing B2B',
    // ...
  },
  {
    name: 'Quickfy',
    url: 'https://quickfy.eu',
    type: 'SaaS Analytics Platform',
    // ...
  },
]
```

### Problems Data
```typescript
export const PROBLEMS = [
  {
    icon: CircleX,
    title: 'Il mio sito non porta clienti',
    description: '...',
  },
  // ...
]
```

### Value Props
```typescript
export const VALUE_PROPS = [...]
```

### Process Steps
```typescript
export const PROCESS_STEPS = [...]
```

### Benefits
```typescript
export const BENEFITS = [...]
```

### Guarantees
```typescript
export const GUARANTEES = [...]
```

### Pricing Plans
```typescript
export const PRICING_PLANS = [...]
```

### Testimonials
```typescript
export const TESTIMONIALS = [...]
```

### FAQs
```typescript
export const FAQS = [...]
```

---

## API Routes

### /api/contact/route.ts
**Method:** POST

**Request Body:**
```typescript
{
  name: string
  email: string
  phone?: string
  projectType: string
  budget: string
  message?: string
  privacy: boolean
}
```

**Response:**
```typescript
{
  success: boolean
  message: string
}
```

**Features:**
- Zod validation
- Send email con Resend
- Error handling
- Rate limiting (optional)

---

## Stile Componenti Riutilizzabili

### Section Wrapper
```typescript
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
```

### Section Header
```typescript
interface SectionHeaderProps {
  title: string
  description?: string
  centered?: boolean
}

export function SectionHeader({
  title,
  description,
  centered = true
}: SectionHeaderProps) {
  return (
    <div className={cn('mb-16', centered && 'text-center')}>
      <h2 className="text-4xl md:text-5xl font-bold mb-4">
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

### Gradient Text
```typescript
interface GradientTextProps {
  children: React.ReactNode
  className?: string
}

export function GradientText({ children, className }: GradientTextProps) {
  return (
    <span
      className={cn(
        'bg-gradient-to-r from-accent-orange to-accent-amber',
        'bg-clip-text text-transparent',
        className
      )}
    >
      {children}
    </span>
  )
}
```

---

## Testing Checklist

### Unit Tests
- [ ] Form validation schema
- [ ] Utility functions (cn, formatters)
- [ ] Custom hooks

### Integration Tests
- [ ] Form submission flow
- [ ] Navigation scroll behavior
- [ ] Responsive breakpoints

### Visual Regression Tests
- [ ] All sections desktop
- [ ] All sections mobile
- [ ] Hover states
- [ ] Animation states

### Performance Tests
- [ ] Lighthouse score 90+
- [ ] Core Web Vitals
- [ ] Bundle size analysis
- [ ] Image optimization

### Accessibility Tests
- [ ] Keyboard navigation
- [ ] Screen reader compatibility
- [ ] Color contrast ratios
- [ ] ARIA labels

---

## Component Development Order

### Phase 1: Foundation (Day 1)
1. Setup Next.js + TypeScript
2. Configure Tailwind + Design tokens
3. Install dependencies
4. Create constants file
5. Setup fonts (Satoshi + Inter)

### Phase 2: Layout (Day 2)
6. Header component
7. Footer component
8. AnimatedBackground component
9. Base page structure

### Phase 3: Hero & Core (Day 3)
10. Hero section
11. AnimatedCounter component
12. SocialProof section
13. Problems section

### Phase 4: Content Sections (Day 4)
14. Solution section
15. Portfolio section
16. Process section
17. BenefitGrid section

### Phase 5: Conversion (Day 5)
18. Guarantee section
19. Pricing section
20. Testimonials section
21. FAQ section

### Phase 6: Forms & Polish (Day 6)
22. CTAFinal section con form
23. API route /api/contact
24. Form validation
25. Email integration

### Phase 7: Animations & UX (Day 7)
26. Scroll animations
27. Hover effects
28. Loading states
29. ScrollProgress component
30. ScrollToTop component

### Phase 8: Testing & Deploy (Day 8-9)
31. Responsive testing
32. Cross-browser testing
33. Performance optimization
34. SEO metadata
35. Deploy to Vercel

### Phase 9: Polish & Handoff (Day 10)
36. Final QA
37. Documentation
38. Handoff materials
