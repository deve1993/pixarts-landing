# Struttura Landing Page Pixarts

## Layout Generale
```
<Header />
<Hero />
<SocialProof />
<Problems />
<Solution />
<Portfolio />
<Process />
<BenefitGrid />
<Guarantee />
<Pricing />
<Testimonials />
<FAQ />
<CTAFinal />
<Footer />
```

---

## 1. HEADER (Sticky)
**Background:** Glass effect (blur + semi-transparent)
**Height:** 80px desktop, 64px mobile
**Sticky:** Yes, con shadow on scroll

### Layout
```
[Logo] -------------------- [Nav Links] [CTA Button]
```

### Navigation Links
- Portfolio (scroll to #portfolio)
- Come funziona (scroll to #process)
- Prezzi (scroll to #pricing)
- FAQ (scroll to #faq)

### CTA Button
"Preventivo gratuito" → scroll to #cta-form

### Mobile
Hamburger menu con slide-in drawer

---

## 2. HERO SECTION
**Background:** Animated gradient + grain texture
**Padding:** 160px top, 120px bottom (desktop)
**Layout:** Centered, max-width 900px

### Elements Stack
1. **Badge animato** (optional)
   - "✨ 12+ progetti completati"
   - Fade in + slide up
   
2. **H1 Headline**
   - Gradient text effect
   - Font: Satoshi Bold, 72px desktop, 48px mobile
   - Animation: Fade in + slide up (stagger)
   
3. **Subheadline**
   - Text-secondary color
   - Font: Inter Regular, 20px
   - Max-width: 700px
   - Animation: Fade in + slide up (delay)
   
4. **CTA Group** (flex row, gap 16px)
   - Primary Button (gradient) → "#cta-form"
   - Secondary Button (outline) → "#portfolio"
   - Animation: Fade in + slide up (delay)
   - Hover: Ripple effect on primary
   
5. **Stats Row** (3 columns)
   - Animated counters
   - Icons from Lucide
   - Grid: 3 columns desktop, 1 column mobile

### Interactive Features
- **Animated gradient background** (slow rotation)
- **Counter animations** on scroll into view
- **Parallax effect** on scroll (subtle)
- **Ripple effect** on CTA click

---

## 3. SOCIAL PROOF SECTION
**Background:** bg-primary
**Padding:** 80px vertical
**Style:** Logo band with subtle animations

### Layout
Headline → Logo grid (2 cards)

### Portfolio Cards (2 side-by-side)
**Card Style:** 3D tilt effect on hover

1. **FlowMatics Card**
   - Logo/Screenshot
   - Title + subtitle
   - "Visita →" link
   
2. **Quickfy Card**
   - Logo/Screenshot
   - Title + subtitle
   - "Visita →" link

### Animations
- Logos fade in on scroll
- Hover: 3D tilt + glow effect
- Continuous subtle floating animation

---

## 4. PROBLEMS SECTION
**Background:** bg-surface
**Padding:** 120px vertical
**Layout:** Headline + 3 cards grid

### Grid
3 columns desktop, 1 column mobile

### Card Structure (each)
- Icon (Lucide, accent color)
- Title (h3)
- Description (p)
- Hover effect: Lift + border color change

### Animations
- Cards fade in + slide up (stagger)
- Icons rotate on hover
- Border glow on hover

---

## 5. SOLUTION SECTION
**Background:** bg-primary
**Padding:** 120px vertical
**Layout:** Text block + 4 cards grid

### Text Block
- Headline (h2, centered)
- Description (p, max-width 800px, centered)

### Value Props Grid
2x2 grid desktop, 1 column mobile

### Card Structure
- Icon (accent gradient background)
- Title (h3)
- Description (p)
- Hover: Scale + shadow

### Animations
- Text fade in
- Cards cascade in (stagger)
- Icons bounce on hover

---

## 6. PORTFOLIO SECTION
**Background:** bg-surface
**Padding:** 120px vertical
**Layout:** Headline + Intro + 2 project cards

### Project Card (each)
**Layout:** Side-by-side (image + content)
**Alternate:** Card 1 image left, Card 2 image right

#### Card Structure
1. **Image Container**
   - Screenshot/mockup
   - Border + shadow
   - Hover: Scale + glow
   
2. **Content Container**
   - Badge (tipo progetto)
   - Headline (h3)
   - Challenge (subtitle)
   - Solution (bullet list)
   - Results (metrics con icons)
   - CTA link

### Metrics Display
- Icons + numbers
- Animated counters on scroll
- Accent color highlights

### Animations
- Images parallax on scroll
- Content fade in stagger
- Counters animate on viewport enter

---

## 7. PROCESS SECTION
**Background:** bg-primary
**Padding:** 120px vertical
**Layout:** Headline + Intro + 4 step cards + timeline

### Steps Layout
Horizontal timeline desktop, vertical mobile

### Step Card Structure
1. Number badge (large, gradient)
2. Icon (Lucide)
3. Title (h3)
4. Description (p)
5. Duration (small text, muted)

### Timeline Connector
Animated line connecting steps
Progressive reveal on scroll

### Animations
- Steps fade in as user scrolls
- Timeline line draws progressively
- Icons pulse on active step

---

## 8. BENEFIT GRID SECTION
**Background:** bg-surface
**Padding:** 120px vertical
**Layout:** Headline + 6 cards grid (3x2)

### Grid
3 columns desktop, 2 columns tablet, 1 column mobile

### Card Structure
- Icon (accent color)
- Title (h3)
- Description (p)
- Hover: Lift + glow

### Animations
- Cards fade in (stagger, wave pattern)
- Icons scale on hover
- Border glow on hover

---

## 9. GUARANTEE SECTION
**Background:** bg-elevated (special highlight section)
**Padding:** 120px vertical
**Border:** Accent gradient border
**Layout:** Headline + Intro + 3 guarantee cards

### Cards Layout
3 columns desktop, 1 column mobile

### Card Structure
- Large icon + badge (10%, 100%, 30gg)
- Title (h3)
- Description (p)
- Checkmark icon

### Special Styling
- Cards have accent gradient border
- Glow effect around section
- Elevated background

### Animations
- Section glow pulse
- Cards scale in on scroll
- Badges pop in with bounce

---

## 10. PRICING SECTION
**Background:** bg-primary
**Padding:** 120px vertical
**Layout:** Headline + Intro + 3 pricing cards + Extra card

### Cards Layout
3 columns (equal width) desktop, 1 column mobile

### Pricing Card Structure
1. **Header**
   - Badge ("Più veloce", "Più popolare", "Più completo")
   - Title (h3)
   - Price range (large, gradient text)
   - Delivery time
   
2. **Ideal For**
   - Small text, muted
   
3. **Features List**
   - Checkmark + feature text
   - 7-8 items
   
4. **CTA Button**
   - Primary style on "Più popolare"
   - Secondary on others

### Popular Card
- Different background (elevated)
- Border accent gradient
- Larger scale (105%)
- "Più popolare" badge at top

### Extra: Manutenzione Card
- Horizontal layout (full width)
- Different style (outline)
- Compact info

### Animations
- Cards fade in (stagger)
- Popular card pops in slightly larger
- Hover: Lift all cards
- Price numbers count up on scroll

---

## 11. TESTIMONIALS SECTION
**Background:** bg-surface
**Padding:** 120px vertical
**Layout:** Headline + Carousel (3 testimonials)

### Carousel
- 3 testimonials visible on desktop
- 1 on mobile
- Autoplay (5s interval)
- Navigation dots
- Drag to scroll

### Testimonial Card Structure
1. Stars rating (5 stars, accent color)
2. Quote text (larger, emphasized)
3. Avatar (circular, with initials)
4. Name (bold)
5. Role + Company (muted)

### Animations
- Carousel auto-slides
- Cards fade in on change
- Smooth transition between slides

---

## 12. FAQ SECTION
**Background:** bg-primary
**Padding:** 120px vertical
**Layout:** Headline + Accordion (6 questions)

### Accordion Items
- Question (clickable header)
- Answer (collapsible content)
- Chevron icon (rotates on open)
- Border bottom separator

### Accordion Behavior
- One item open at a time
- Smooth expand/collapse
- Keyboard accessible (Enter, Space, Arrows)

### Animations
- Questions fade in on scroll
- Chevron rotates 180° on open
- Content slides down smoothly
- Answer text fades in

---

## 13. CTA FINAL SECTION
**Background:** bg-elevated + accent gradient border
**Padding:** 120px vertical
**Layout:** Headline + Subheadline + Form

### Form Layout
2 columns on desktop, 1 column on mobile

#### Fields
1. Nome e Cognome (full width row 1)
2. Email (left col row 2)
3. Telefono (right col row 2)
4. Tipo di progetto (left col row 3, select)
5. Budget (right col row 3, select)
6. Messaggio (full width row 4, textarea)
7. Privacy checkbox (full width row 5)
8. Submit button (centered row 6)

### Form Styling
- Glass effect background on inputs
- Focus: Accent border + glow
- Error states: Red border
- Success: Green checkmark

### Validation
- Real-time validation
- Error messages below fields
- Disabled submit until valid

### Submit Button
- Full gradient
- Loading state (spinner)
- Success state (checkmark)
- Ripple effect on click

### Animations
- Form fade in + slide up
- Fields fade in (stagger)
- Submit button pulse on hover
- Success confetti animation

---

## 14. FOOTER
**Background:** bg-surface
**Padding:** 80px top, 40px bottom
**Layout:** 4 columns + bottom bar

### Columns Layout
4 equal columns desktop, 1 column mobile

#### Column 1: About
- Logo
- Tagline
- Social icons (LinkedIn, Instagram, Email)

#### Column 2: Servizi
- Links list (5 items)

#### Column 3: Risorse
- Links list (4 items)

#### Column 4: Legale
- Links list (3 items)

### Bottom Bar
- Copyright text
- "Made with ❤️ in Italia"
- Centered, border-top

### Animations
- Footer fade in on scroll
- Social icons hover scale
- Links hover: accent color

---

## Scroll Behaviors

### Smooth Scroll
All anchor links use smooth scroll behavior

### Scroll Progress Bar
Fixed at top of page, shows scroll progress with accent gradient

### Scroll-triggered Animations
- Use Intersection Observer
- Threshold: 0.1
- Animate once (no repeat)

### Parallax Elements
- Hero background (slow)
- Portfolio images (medium)
- Section backgrounds (subtle)

---

## Responsive Breakpoints

### Desktop (1280px+)
- Full layout as described
- 3-4 column grids
- Side-by-side content

### Tablet (768px - 1279px)
- 2 column grids
- Reduced padding
- Adjusted typography scale

### Mobile (< 768px)
- 1 column layout
- Hamburger menu
- Stacked content
- Larger touch targets (min 44px)
- Reduced animations (respect prefers-reduced-motion)

---

## Performance Optimizations

### Images
- WebP format with fallback
- Lazy loading (loading="lazy")
- Responsive images (srcset)
- Blur placeholder while loading

### Fonts
- Preload critical fonts
- Font-display: swap
- Subset fonts (Latin only)

### Code Splitting
- Route-based splitting
- Component lazy loading
- Dynamic imports for heavy components

### Animations
- Use transform and opacity only
- GPU acceleration (will-change)
- Respect prefers-reduced-motion

---

## Accessibility

### Keyboard Navigation
- All interactive elements focusable
- Logical tab order
- Focus visible styles
- Skip to main content link

### Screen Readers
- Semantic HTML5 elements
- ARIA labels where needed
- Alt text on all images
- Form labels properly associated

### Color Contrast
- WCAG AA compliant (4.5:1 minimum)
- Test with contrast checker
- Don't rely on color alone

### Motion
- Respect prefers-reduced-motion
- Provide pause/stop for auto-play
- No flashing content
