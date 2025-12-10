# Animazioni e Interazioni Pixarts

## Filosofia Animazioni
- **Smooth & Subtle:** Animazioni eleganti, mai aggressive
- **Performance First:** Solo transform e opacity
- **Purposeful:** Ogni animazione ha uno scopo UX
- **Accessible:** Rispetta prefers-reduced-motion

---

## Animazioni Globali

### 1. Page Load
**Sequence:**
1. Header fade in (0ms)
2. Hero content stagger (200ms delay)
3. Background gradient activate (0ms)

**Code:**
```typescript
const pageLoadVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
}
```

### 2. Scroll-Triggered Fade In
**Usage:** Tutte le sezioni
**Behavior:** Fade in + slide up quando entra nel viewport

**Code:**
```typescript
const fadeInUp = {
  hidden: { 
    opacity: 0, 
    y: 20 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1]
    }
  }
}

// Usage
<motion.div
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.1 }}
  variants={fadeInUp}
>
```

### 3. Stagger Children
**Usage:** Card grids, feature lists

**Code:**
```typescript
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  }
}
```

---

## Header Animations

### 1. Header Scroll Effect
**Trigger:** Window scroll > 50px
**Effect:** Add shadow + slight blur

**Code:**
```typescript
const [isScrolled, setIsScrolled] = useState(false)

useEffect(() => {
  const handleScroll = () => {
    setIsScrolled(window.scrollY > 50)
  }
  window.addEventListener('scroll', handleScroll)
  return () => window.removeEventListener('scroll', handleScroll)
}, [])

// Class
className={cn(
  'transition-all duration-300',
  isScrolled && 'shadow-lg backdrop-blur-md'
)}
```

### 2. Mobile Menu Slide In
**Trigger:** Hamburger click
**Effect:** Slide from right + backdrop fade in

**Code:**
```typescript
<AnimatePresence>
  {isOpen && (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
      />
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed right-0 top-0 h-full w-80 bg-surface"
      >
        {/* Menu content */}
      </motion.div>
    </>
  )}
</AnimatePresence>
```

---

## Hero Section Animations

### 1. Animated Gradient Background
**Effect:** Slow rotation continuous
**Performance:** CSS only

**Code:**
```css
@keyframes gradient-rotate {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.animated-gradient {
  background: linear-gradient(
    135deg,
    #FF6B2C 0%,
    #FFB347 25%,
    #FF6B2C 50%,
    #FFB347 75%,
    #FF6B2C 100%
  );
  background-size: 400% 400%;
  animation: gradient-rotate 15s ease infinite;
}
```

### 2. Headline Gradient Text
**Effect:** Gradient clip + subtle shimmer

**Code:**
```css
.gradient-text {
  background: linear-gradient(
    135deg,
    #FF6B2C 0%,
    #FFB347 50%,
    #FF6B2C 100%
  );
  background-size: 200% 200%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shimmer 3s ease-in-out infinite;
}

@keyframes shimmer {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}
```

### 3. CTA Ripple Effect
**Trigger:** Button click
**Effect:** Ripple expanding from click point

**Code:**
```typescript
const Ripple = () => {
  const [ripples, setRipples] = useState<Array<{
    x: number
    y: number
    id: number
  }>>([])

  const addRipple = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    setRipples([...ripples, { x, y, id: Date.now() }])
    setTimeout(() => {
      setRipples(prev => prev.slice(1))
    }, 600)
  }

  return (
    <button onClick={addRipple} className="relative overflow-hidden">
      {ripples.map(ripple => (
        <span
          key={ripple.id}
          className="absolute w-5 h-5 bg-white/30 rounded-full animate-ripple"
          style={{
            left: ripple.x,
            top: ripple.y,
            transform: 'translate(-50%, -50%)'
          }}
        />
      ))}
      Click me
    </button>
  )
}

// CSS
@keyframes ripple {
  0% {
    transform: translate(-50%, -50%) scale(0);
    opacity: 1;
  }
  100% {
    transform: translate(-50%, -50%) scale(4);
    opacity: 0;
  }
}

.animate-ripple {
  animation: ripple 0.6s ease-out;
}
```

### 4. Stats Counter Animation
**Trigger:** Scroll into view
**Effect:** Count from 0 to target

**Code:**
```typescript
const AnimatedCounter = ({ 
  end, 
  duration = 2000, 
  suffix = '' 
}: {
  end: number
  duration?: number
  suffix?: string
}) => {
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
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [inView, end, duration])

  return <span ref={ref}>{count}{suffix}</span>
}
```

### 5. Parallax Effect
**Effect:** Background moves slower than content

**Code:**
```typescript
const { scrollYProgress } = useScroll()
const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])

<motion.div style={{ y }}>
  {/* Background content */}
</motion.div>
```

---

## Card Animations

### 1. Hover Lift
**Effect:** Translate up + shadow increase

**Code:**
```typescript
<motion.div
  whileHover={{ 
    y: -8,
    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.3)'
  }}
  transition={{ duration: 0.3 }}
  className="card"
>
```

### 2. 3D Tilt Effect
**Usage:** Portfolio cards
**Effect:** Tilt based on mouse position

**Code:**
```typescript
const Card3DTilt = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null)
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    
    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    
    const rotateX = (y - centerY) / 10
    const rotateY = (centerX - x) / 10
    
    setRotateX(rotateX)
    setRotateY(rotateY)
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ 
        rotateX, 
        rotateY,
        transformPerspective: 1000
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="card"
    >
      {children}
    </motion.div>
  )
}
```

### 3. Glow on Hover
**Effect:** Border color change + outer glow

**Code:**
```css
.card {
  border: 1px solid var(--border);
  transition: all 0.3s ease;
}

.card:hover {
  border-color: var(--accent-orange);
  box-shadow: 
    0 0 20px rgba(255, 107, 44, 0.2),
    0 8px 32px rgba(0, 0, 0, 0.3);
}
```

### 4. Icon Bounce
**Effect:** Icon scales on hover

**Code:**
```typescript
<motion.div
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.95 }}
  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
>
  <Icon className="w-6 h-6" />
</motion.div>
```

---

## Portfolio Section

### 1. Image Parallax
**Effect:** Image moves slower on scroll

**Code:**
```typescript
const { scrollYProgress } = useScroll({
  target: ref,
  offset: ['start end', 'end start']
})

const y = useTransform(scrollYProgress, [0, 1], ['-20%', '20%'])

<motion.div style={{ y }}>
  <Image src={project.image} alt={project.name} />
</motion.div>
```

### 2. Metrics Count Up
**Trigger:** Scroll into view
**Effect:** Numbers animate from 0

(Usa AnimatedCounter component visto sopra)

### 3. Alternating Layout
**Effect:** Smooth transition between left/right layouts

**Code:**
```typescript
const variants = {
  left: { x: -50, opacity: 0 },
  right: { x: 50, opacity: 0 },
  center: { x: 0, opacity: 1 }
}

<motion.div
  initial={index % 2 === 0 ? 'left' : 'right'}
  whileInView="center"
  viewport={{ once: true }}
  variants={variants}
>
```

---

## Process Section

### 1. Timeline Draw Animation
**Effect:** Line draws progressively on scroll

**Code:**
```typescript
const { scrollYProgress } = useScroll({
  target: ref,
  offset: ['start center', 'end center']
})

const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1])

<svg>
  <motion.path
    d="M 0 0 L 100 0"
    stroke="url(#gradient)"
    strokeWidth="2"
    fill="none"
    style={{ pathLength }}
  />
</svg>
```

### 2. Step Reveal
**Effect:** Steps fade in as timeline reaches them

**Code:**
```typescript
const stepVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: i * 0.2,
      duration: 0.5
    }
  })
}

{steps.map((step, i) => (
  <motion.div
    key={i}
    custom={i}
    initial="hidden"
    whileInView="visible"
    variants={stepVariants}
  >
    {step.content}
  </motion.div>
))}
```

### 3. Icon Pulse
**Effect:** Active step icon pulses

**Code:**
```css
@keyframes pulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.05);
  }
}

.active-step-icon {
  animation: pulse 2s ease-in-out infinite;
}
```

---

## Pricing Section

### 1. Popular Card Pop
**Effect:** Popular card scales in larger

**Code:**
```typescript
const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: (isPopular: boolean) => ({
    opacity: 1,
    y: 0,
    scale: isPopular ? 1.05 : 1,
    transition: {
      duration: 0.5,
      delay: isPopular ? 0.2 : 0
    }
  })
}

<motion.div
  custom={plan.isPopular}
  initial="hidden"
  whileInView="visible"
  variants={cardVariants}
>
```

### 2. Price Counter
**Effect:** Price animates from 0

(Usa AnimatedCounter con formato €)

### 3. Feature List Cascade
**Effect:** Features appear one by one

**Code:**
```typescript
<motion.ul
  initial="hidden"
  whileInView="visible"
  variants={{
    visible: { transition: { staggerChildren: 0.05 } }
  }}
>
  {features.map((feature, i) => (
    <motion.li
      key={i}
      variants={{
        hidden: { opacity: 0, x: -10 },
        visible: { opacity: 1, x: 0 }
      }}
    >
      <CheckCircle /> {feature}
    </motion.li>
  ))}
</motion.ul>
```

---

## Testimonials Carousel

### 1. Auto-Slide
**Effect:** Automatic slide every 5s

**Code:**
```typescript
const [current, setCurrent] = useState(0)

useEffect(() => {
  const timer = setInterval(() => {
    setCurrent(prev => (prev + 1) % testimonials.length)
  }, 5000)
  
  return () => clearInterval(timer)
}, [testimonials.length])
```

### 2. Slide Transition
**Effect:** Smooth fade + slide

**Code:**
```typescript
<AnimatePresence mode="wait">
  <motion.div
    key={current}
    initial={{ opacity: 0, x: 100 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -100 }}
    transition={{ duration: 0.5 }}
  >
    {testimonials[current]}
  </motion.div>
</AnimatePresence>
```

### 3. Drag to Scroll
**Effect:** User can drag carousel

**Code:**
```typescript
<motion.div
  drag="x"
  dragConstraints={{ left: -width, right: 0 }}
  dragElastic={0.1}
  onDragEnd={(e, { offset, velocity }) => {
    const swipe = swipePower(offset.x, velocity.x)
    if (swipe < -swipeConfidenceThreshold) {
      paginate(1)
    } else if (swipe > swipeConfidenceThreshold) {
      paginate(-1)
    }
  }}
>
```

---

## FAQ Accordion

### 1. Accordion Open/Close
**Effect:** Smooth height animation + chevron rotation

**Code:**
```typescript
<Accordion type="single" collapsible>
  {faqs.map((faq, i) => (
    <AccordionItem key={i} value={`item-${i}`}>
      <AccordionTrigger className="group">
        {faq.question}
        <ChevronDown className="transition-transform group-data-[state=open]:rotate-180" />
      </AccordionTrigger>
      <AccordionContent>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          {faq.answer}
        </motion.div>
      </AccordionContent>
    </AccordionItem>
  ))}
</Accordion>
```

---

## Form Animations

### 1. Input Focus Glow
**Effect:** Border color + outer glow

**Code:**
```css
input, textarea {
  border: 1px solid var(--border);
  transition: all 0.3s ease;
}

input:focus, textarea:focus {
  outline: none;
  border-color: var(--accent-orange);
  box-shadow: 
    0 0 0 3px rgba(255, 107, 44, 0.2),
    0 0 20px rgba(255, 107, 44, 0.1);
}
```

### 2. Error Shake
**Effect:** Input shakes on error

**Code:**
```typescript
const errorVariants = {
  shake: {
    x: [0, -10, 10, -10, 10, 0],
    transition: { duration: 0.5 }
  }
}

<motion.div
  animate={error ? 'shake' : ''}
  variants={errorVariants}
>
  <Input />
</motion.div>
```

### 3. Submit Button Loading
**Effect:** Spinner + pulse

**Code:**
```typescript
<Button disabled={isLoading}>
  {isLoading ? (
    <>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      >
        <Loader2 className="w-4 h-4" />
      </motion.div>
      Invio in corso...
    </>
  ) : (
    'Invia richiesta'
  )}
</Button>
```

### 4. Success Confetti
**Effect:** Confetti explosion on success

**Code:**
```typescript
import confetti from 'canvas-confetti'

const handleSuccess = () => {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#FF6B2C', '#FFB347', '#FFFFFF']
  })
}
```

---

## Scroll Utilities

### 1. Scroll Progress Bar
**Effect:** Fixed bar showing scroll progress

**Code:**
```typescript
const ScrollProgress = () => {
  const { scrollYProgress } = useScroll()
  
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent-orange to-accent-amber origin-left z-50"
      style={{ scaleX: scrollYProgress }}
    />
  )
}
```

### 2. Scroll to Top Button
**Effect:** Fade in after scroll > 500px

**Code:**
```typescript
const ScrollToTop = () => {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 500)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          whileHover={{ scale: 1.1 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 p-3 rounded-full bg-gradient-to-r from-accent-orange to-accent-amber"
        >
          <ArrowUp className="w-6 h-6" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
```

---

## Performance Optimization

### 1. Rispetta Reduced Motion
**Code:**
```typescript
const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')

const variants = prefersReducedMotion ? {} : {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}
```

### 2. Will-Change Strategy
**Code:**
```css
/* Solo su elementi che stanno per animare */
.about-to-animate {
  will-change: transform, opacity;
}

/* Rimuovi dopo animazione */
.animated {
  will-change: auto;
}
```

### 3. GPU Acceleration
**Code:**
```css
/* Force GPU */
.animated-element {
  transform: translateZ(0);
  backface-visibility: hidden;
}
```

### 4. Lazy Load Animations
**Code:**
```typescript
import dynamic from 'next/dynamic'

const HeavyAnimation = dynamic(
  () => import('./HeavyAnimation'),
  { ssr: false }
)
```

---

## Animation Checklist

### Must-Have Animations
- [x] Header scroll effect
- [x] Hero content stagger
- [x] Scroll-triggered fade ins
- [x] Card hover lifts
- [x] Button ripple effect
- [x] Counter animations
- [x] Form focus glows
- [x] Accordion smooth open/close
- [x] Carousel transitions
- [x] Scroll progress bar

### Nice-to-Have Animations
- [ ] 3D tilt cards (portfolio)
- [ ] Timeline draw animation
- [ ] Parallax backgrounds
- [ ] Confetti on success
- [ ] Icon pulse on active
- [ ] Gradient shimmer

### Performance Checklist
- [ ] Respect prefers-reduced-motion
- [ ] Use transform/opacity only
- [ ] GPU acceleration on heavy animations
- [ ] Lazy load non-critical animations
- [ ] Test on mobile devices
- [ ] Monitor frame rate (should be 60fps)
