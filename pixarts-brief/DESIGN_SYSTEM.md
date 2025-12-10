# Design System Pixarts

## Stile Generale
**Dark Premium** - Mood: Sicurezza + Eleganza + Innovazione

## Tipografia

### Font Families
```css
--font-heading: 'Satoshi', system-ui, sans-serif;
--font-body: 'Inter', system-ui, sans-serif;
```

### Font Weights
- **Headings:** Bold (700) e SemiBold (600)
- **Body:** Regular (400) e Medium (500)

### Scale Tipografica
```css
--text-xs: 0.75rem;      /* 12px */
--text-sm: 0.875rem;     /* 14px */
--text-base: 1rem;       /* 16px */
--text-lg: 1.125rem;     /* 18px */
--text-xl: 1.25rem;      /* 20px */
--text-2xl: 1.5rem;      /* 24px */
--text-3xl: 1.875rem;    /* 30px */
--text-4xl: 2.25rem;     /* 36px */
--text-5xl: 3rem;        /* 48px */
--text-6xl: 3.75rem;     /* 60px */
--text-7xl: 4.5rem;      /* 72px */
```

### Line Heights
```css
--leading-tight: 1.1;
--leading-snug: 1.25;
--leading-normal: 1.5;
--leading-relaxed: 1.75;
```

## Palette Colori

### Sfondi
```css
--bg-primary: #0A0A0B;      /* Background principale */
--bg-surface: #141415;      /* Surface cards/sections */
--bg-elevated: #1C1C1E;     /* Elevated components */
--border: #2A2A2D;          /* Bordi */
```

### Testi
```css
--text-primary: #FFFFFF;    /* Testo principale */
--text-secondary: #A1A1A6;  /* Testo secondario */
--text-muted: #6B6B70;      /* Testo disabilitato */
```

### Accento (Gradiente)
```css
--accent-orange: #FF6B2C;
--accent-amber: #FFB347;
--accent-gradient: linear-gradient(135deg, #FF6B2C 0%, #FFB347 100%);
```

### Stati
```css
--success: #34D399;
--error: #F87171;
--warning: #FBBF24;
```

### Effetti Glow
```css
--glow-cta: rgba(255, 107, 44, 0.3);
--glow-accent: rgba(255, 107, 44, 0.2);
```

## Spacing System
Base: 8px

```css
--spacing-1: 0.25rem;   /* 4px */
--spacing-2: 0.5rem;    /* 8px */
--spacing-3: 0.75rem;   /* 12px */
--spacing-4: 1rem;      /* 16px */
--spacing-5: 1.25rem;   /* 20px */
--spacing-6: 1.5rem;    /* 24px */
--spacing-8: 2rem;      /* 32px */
--spacing-10: 2.5rem;   /* 40px */
--spacing-12: 3rem;     /* 48px */
--spacing-16: 4rem;     /* 64px */
--spacing-20: 5rem;     /* 80px */
--spacing-24: 6rem;     /* 96px */
--spacing-32: 8rem;     /* 128px */
```

## Border Radius
```css
--radius-sm: 8px;
--radius-md: 12px;
--radius-lg: 16px;
--radius-xl: 24px;
--radius-full: 9999px;
```

## Shadows
```css
--shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.1);
--shadow-md: 0 4px 16px rgba(0, 0, 0, 0.15);
--shadow-lg: 0 4px 24px rgba(0, 0, 0, 0.2);
--shadow-xl: 0 8px 32px rgba(0, 0, 0, 0.25);
--shadow-glow: 0 0 24px var(--glow-cta);
```

## Effetti Speciali

### Glass Effect
```css
backdrop-filter: blur(12px);
background: rgba(20, 20, 21, 0.7);
border: 1px solid rgba(255, 255, 255, 0.1);
```

### Gradient Text
```css
background: var(--accent-gradient);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
background-clip: text;
```

### Grain Texture
```css
background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E");
```

## Animazioni

### Durate
```css
--duration-fast: 200ms;
--duration-normal: 300ms;
--duration-slow: 500ms;
```

### Easing
```css
--ease-smooth: cubic-bezier(0.4, 0, 0.2, 1);
--ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
```

### Animazioni Comuni
```css
/* Fade In Up */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Scale On Hover */
.hover-scale {
  transition: transform var(--duration-normal) var(--ease-smooth);
}
.hover-scale:hover {
  transform: scale(1.05);
}

/* Ripple Effect (CTA) */
@keyframes ripple {
  0% {
    transform: scale(0);
    opacity: 1;
  }
  100% {
    transform: scale(4);
    opacity: 0;
  }
}
```

## Icone
**Libreria:** Lucide Icons (lucide-react)
- Stroke: 1.5-2px
- Colori:
  - Nav: #A1A1A6
  - Features: #FF6B2C
  - CTA: #FFFFFF
  - Social: #6B6B70

Link: https://lucide.dev

## Componenti Base

### Button Primary (CTA)
```css
background: var(--accent-gradient);
color: var(--text-primary);
padding: 1rem 2rem;
border-radius: var(--radius-lg);
font-weight: 600;
box-shadow: var(--shadow-glow);
transition: all var(--duration-normal) var(--ease-smooth);

&:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 32px var(--glow-cta);
}

&:active {
  transform: translateY(0);
}
```

### Button Secondary
```css
background: transparent;
color: var(--text-secondary);
padding: 1rem 2rem;
border: 1px solid var(--border);
border-radius: var(--radius-lg);
font-weight: 500;
transition: all var(--duration-normal) var(--ease-smooth);

&:hover {
  border-color: var(--accent-orange);
  color: var(--text-primary);
}
```

### Card
```css
background: var(--bg-surface);
border: 1px solid var(--border);
border-radius: var(--radius-lg);
padding: var(--spacing-6);
box-shadow: var(--shadow-md);
transition: all var(--duration-normal) var(--ease-smooth);

&:hover {
  border-color: var(--accent-orange);
  transform: translateY(-4px);
  box-shadow: var(--shadow-xl);
}
```

### Input Field
```css
background: var(--bg-elevated);
border: 1px solid var(--border);
border-radius: var(--radius-md);
padding: 0.75rem 1rem;
color: var(--text-primary);
font-family: var(--font-body);
transition: all var(--duration-normal) var(--ease-smooth);

&:focus {
  outline: none;
  border-color: var(--accent-orange);
  box-shadow: 0 0 0 3px var(--glow-accent);
}

&::placeholder {
  color: var(--text-muted);
}
```

### Section Container
```css
max-width: 1280px;
margin: 0 auto;
padding: var(--spacing-20) var(--spacing-6);

@media (max-width: 768px) {
  padding: var(--spacing-12) var(--spacing-4);
}
```

## Breakpoints
```css
--screen-sm: 640px;
--screen-md: 768px;
--screen-lg: 1024px;
--screen-xl: 1280px;
--screen-2xl: 1536px;
```

## Grid System
```css
display: grid;
grid-template-columns: repeat(12, 1fr);
gap: var(--spacing-6);

@media (max-width: 768px) {
  grid-template-columns: 1fr;
}
```

## Z-Index Scale
```css
--z-base: 0;
--z-dropdown: 10;
--z-sticky: 20;
--z-modal: 30;
--z-popover: 40;
--z-tooltip: 50;
```

## Performance
- Usa `will-change` solo quando necessario
- Preferisci `transform` e `opacity` per animazioni
- Lazy load immagini e componenti pesanti
- Usa `contain: layout style paint` per isolamento

## Accessibilità
- Contrasto minimo 4.5:1 per testo normale
- Contrasto minimo 3:1 per testo large
- Focus visible su tutti gli elementi interattivi
- ARIA labels su icone e elementi decorativi
- Keyboard navigation completa
