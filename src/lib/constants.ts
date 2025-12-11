import {
  CircleX,
  Clock,
  CircuitBoard,
  Zap,
  Sparkles,
  Shield,
  CheckCircle,
  MessageSquare,
  Palette,
  Code,
  Rocket,
  TrendingUp,
  Search,
  Headphones,
  Smartphone,
  Lock,
  RotateCcw,
  Users,
  type LucideIcon,
} from 'lucide-react'

// Navigation
export const NAV_ITEMS = [
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Servizi', href: '#pricing' },
  { label: 'Processo', href: '#processo' },
  { label: 'FAQ', href: '#faq' },
] as const

// Stats
export const STATS = [
  { value: 12, suffix: '+', label: 'Progetti completati' },
  { value: 95, suffix: '%', label: 'Clienti soddisfatti' },
  { value: 10, suffix: ' giorni', label: 'Consegna media' },
] as const

// Problems
export interface Problem {
  icon: LucideIcon
  title: string
  description: string
}

export const PROBLEMS: Problem[] = [
  {
    icon: CircleX,
    title: 'Il mio sito non porta clienti',
    description:
      'Design amatoriale, navigazione confusa, call-to-action invisibili. Il risultato? Traffico che non converte.',
  },
  {
    icon: Clock,
    title: 'Troppo tempo per avere un sito',
    description:
      'Mesi di attesa, revisioni infinite, scadenze saltate. Nel frattempo la concorrenza ti supera.',
  },
  {
    icon: CircuitBoard,
    title: 'Non capisco niente di tecnico',
    description:
      'Hosting, CMS, SEO, analytics. Termini incomprensibili e nessuno che ti spiega veramente come funziona.',
  },
]

// Solution Value Props
export interface ValueProp {
  icon: LucideIcon
  title: string
  subtitle: string
  description: string
}

export const VALUE_PROPS: ValueProp[] = [
  {
    icon: Zap,
    title: 'Consegna garantita',
    subtitle: '7-14 giorni',
    description:
      'Tempi certi, nessuna sorpresa. Garanzia scritta: sconto 10% per ogni giorno di ritardo.',
  },
  {
    icon: Sparkles,
    title: 'Design che converte',
    subtitle: '+180% richieste contatto',
    description:
      "Ogni elemento pensato per guidare l'utente verso l'azione: acquisto, contatto, prenotazione.",
  },
  {
    icon: Shield,
    title: 'Zero pensieri tecnici',
    subtitle: 'Tutto incluso',
    description:
      'Hosting, SEO, analytics, training. Tu gestisci il business, noi la tecnologia.',
  },
  {
    icon: CheckCircle,
    title: 'Rischio zero',
    subtitle: 'Garanzia tripla',
    description:
      'Rimborso 100% se insoddisfatto + 2 revisioni + 30 giorni assistenza gratuita.',
  },
]

// Portfolio Projects (Legacy - kept for backwards compatibility)
export interface PortfolioProject {
  name: string
  url: string
  type: string
  challenge: string
  solutions: string[]
  results: { value: string; label: string }[]
  // Hero Parallax fields (optional for backwards compatibility)
  id?: string
  thumbnail?: string
  category?: 'webapp' | 'saas' | 'b2b-automation' | 'landing-page' | 'business-website'
  tags?: string[]
  description?: string
  section?: string
  order?: number
}

// Portfolio V2 - New structure with services, integrations, and technologies
export interface PortfolioService {
  name: string
  detail: string
}

export interface PortfolioResult {
  value: string
  label: string
  suffix?: string
}

export interface PortfolioProjectV2 {
  id: string
  name: string
  client: string
  subtitle: string
  images: string[]
  services: PortfolioService[]
  integrations: string[]
  results: PortfolioResult[]
  technologies: string[]
  description: string
}

export const PORTFOLIO_PROJECTS_V2: PortfolioProjectV2[] = [
  {
    id: 'fl1',
    name: 'FL1',
    client: 'FL1 Srl',
    subtitle: 'Sito Aziendale con AI Integration',
    images: ['/portfolio/FL1 1.webp', '/portfolio/FL1 2.webp'],
    services: [
      { name: 'Web Design', detail: 'Design corporate moderno e professionale' },
      { name: 'Backend', detail: 'API REST e integrazioni server-side' },
      { name: 'SEO', detail: 'Ottimizzazione on-page e tecnica' },
      { name: 'AI Integration', detail: 'Chatbot e automazioni LLM' },
    ],
    integrations: ['HubSpot CRM', 'Google Analytics', 'Stripe', 'Mailchimp', 'OpenAI API'],
    results: [
      { value: '+220', label: 'lead generati', suffix: '%' },
      { value: '45', label: 'tempo risposta chat', suffix: 'sec' },
      { value: '98', label: 'soddisfazione clienti', suffix: '%' },
    ],
    technologies: ['React', 'Next.js', 'Node.js', 'PostgreSQL', 'Tailwind', 'OpenAI'],
    description: 'Sito aziendale completo con sistema di lead generation automatizzato, chatbot AI per supporto clienti e integrazione CRM per gestione commerciale.',
  },
  {
    id: 'flowmatics',
    name: 'FlowMatics',
    client: 'FlowMatics',
    subtitle: 'Piattaforma Automazione Marketing',
    images: ['/portfolio/flowmatic 1.webp', '/portfolio/flowmatic 2.webp'],
    services: [
      { name: 'Web Design', detail: 'Landing page ad alta conversione' },
      { name: 'SEO', detail: 'SEO tecnico e contenuti ottimizzati' },
      { name: 'CRO', detail: 'Ottimizzazione tasso conversione' },
    ],
    integrations: ['Google Analytics 4', 'Google Search Console', 'HubSpot', 'Hotjar'],
    results: [
      { value: '+180', label: 'richieste contatto', suffix: '%' },
      { value: '+40', label: 'visibilità Google', suffix: '%' },
      { value: 'Top 3', label: 'keyword target' },
    ],
    technologies: ['Next.js', 'Tailwind', 'Framer Motion', 'Vercel'],
    description: 'Landing page B2B progettata per convertire visitatori in lead qualificati. Funnel ottimizzato con A/B testing e analytics avanzati.',
  },
  {
    id: 'quickfy-web',
    name: 'Quickfy',
    client: 'Quickfy',
    subtitle: 'SaaS Marketing Website',
    images: ['/portfolio/quickfy 1.webp', '/portfolio/quickfy 2.webp'],
    services: [
      { name: 'Web Design', detail: 'Design SaaS moderno con demo interattiva' },
      { name: 'SEO', detail: 'SEO per SaaS e content strategy' },
      { name: 'CRO', detail: 'Funnel di conversione ottimizzato' },
    ],
    integrations: ['Google Analytics 4', 'HubSpot', 'Intercom', 'Stripe'],
    results: [
      { value: '3-5', label: 'lead qualificati/settimana' },
      { value: '8.5', label: 'tasso conversione', suffix: '%' },
      { value: '-37', label: 'bounce rate', suffix: '%' },
    ],
    technologies: ['Next.js', 'Tailwind', 'Framer Motion', 'TypeScript', 'Vercel'],
    description: 'Sito marketing per piattaforma SaaS con demo interattiva integrata, pricing dinamico e sistema di lead nurturing automatizzato.',
  },
  {
    id: 'quickfy-app',
    name: 'Quickfy App',
    client: 'Quickfy',
    subtitle: 'Dashboard Analytics & Automazioni',
    images: ['/portfolio/quickfy APP1.webp', '/portfolio/quickfy APP2.webp'],
    services: [
      { name: 'Frontend', detail: 'Dashboard React con UI/UX avanzata' },
      { name: 'Backend', detail: 'API scalabili e microservizi' },
      { name: 'AI & Automazioni', detail: 'Server MCP, chatbot AI, workflow automatici' },
      { name: 'DevOps', detail: 'CI/CD, monitoring e scaling' },
    ],
    integrations: ['OpenAI API', 'Anthropic Claude', 'Stripe Billing', 'SendGrid', 'Twilio', 'Slack', 'Zapier', 'Make'],
    results: [
      { value: '500+', label: 'utenti attivi' },
      { value: '15', label: 'ore risparmiate/settimana', suffix: 'h' },
      { value: '99.9', label: 'uptime garantito', suffix: '%' },
    ],
    technologies: ['React', 'Next.js', 'Node.js', 'PostgreSQL', 'Redis', 'Docker', 'AWS', 'OpenAI', 'Tailwind'],
    description: 'Piattaforma SaaS completa con dashboard analytics, server MCP per automazioni AI, chatbot marketing intelligente, gestione campagne automatizzate e integrazioni multi-canale.',
  },
]

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    name: 'FlowMatics',
    url: 'flowmatics.eu',
    type: 'Automazione Marketing B2B',
    challenge: 'Piattaforma complessa da comunicare in modo semplice',
    solutions: [
      'Design pulito e professionale',
      'Funnel di conversione ottimizzato',
      'SEO avanzato per traffico qualificato',
    ],
    results: [
      { value: '+180%', label: 'richieste contatto' },
      { value: '+40%', label: 'visibilità Google' },
      { value: 'Top 3', label: 'keyword strategiche' },
    ],
  },
  {
    name: 'Quickfy',
    url: 'quickfy.eu',
    type: 'SaaS Analytics Platform',
    challenge: 'Dashboard complessa da presentare al target B2B',
    solutions: [
      'Design moderno con animazioni interattive',
      'Demo interattiva in homepage',
      'Landing page ottimizzate per conversione',
    ],
    results: [
      { value: '3-5', label: 'lead qualificati/settimana' },
      { value: '8.5%', label: 'tasso conversione' },
      { value: '-37%', label: 'bounce rate' },
    ],
  },
  {
    name: 'Falegnameria Benetti',
    url: 'falegnameriabenetti.it',
    type: 'Portfolio Artigianale',
    challenge: 'Mostrare la qualità artigianale e generare contatti qualificati',
    solutions: [
      'Portfolio fotografico professionale',
      'Form contatto ottimizzato per preventivi',
      'SEO locale per visibilità territoriale',
    ],
    results: [
      { value: '+300%', label: 'richieste preventivo' },
      { value: 'Top 5', label: 'Google locale' },
      { value: '10gg', label: 'consegna progetto' },
    ],
  },
]

// Hero Parallax Projects - 15 cards for parallax showcase
export const HERO_PARALLAX_PROJECTS: PortfolioProject[] = [
  // Row 1: FlowMatics (5 cards - Dark theme, green accent)
  {
    id: 'flowmatics-hero',
    name: 'FlowMatics',
    url: 'flowmatics.eu',
    type: 'Automazione Marketing B2B',
    thumbnail: '/portfolio/Screenshot 2025-12-09 202706.webp',
    category: 'b2b-automation',
    section: 'Hero',
    order: 1,
    tags: ['B2B', 'Automation', 'AI'],
    description: 'Piattaforma AI-powered per automatizzazione marketing B2B con ROI 340%',
    challenge: '',
    solutions: [],
    results: [],
  },
  {
    id: 'flowmatics-process',
    name: 'FlowMatics',
    url: 'flowmatics.eu',
    type: 'Automazione Marketing B2B',
    thumbnail: '/portfolio/Screenshot 2025-12-09 202734.webp',
    category: 'b2b-automation',
    section: 'Processo',
    order: 2,
    tags: ['B2B', 'Process', 'Timeline'],
    description: 'Processo di implementazione in 3 step strategici',
    challenge: '',
    solutions: [],
    results: [],
  },
  {
    id: 'flowmatics-integrations',
    name: 'FlowMatics',
    url: 'flowmatics.eu',
    type: 'Automazione Marketing B2B',
    thumbnail: '/portfolio/Screenshot 2025-12-09 204101.webp',
    category: 'b2b-automation',
    section: 'Integrazioni',
    order: 3,
    tags: ['B2B', 'Integrations', 'Apps'],
    description: 'Integrazioni con 50+ piattaforme e strumenti marketing',
    challenge: '',
    solutions: [],
    results: [],
  },
  {
    id: 'flowmatics-implementation',
    name: 'FlowMatics',
    url: 'flowmatics.eu',
    type: 'Automazione Marketing B2B',
    thumbnail: '/portfolio/Screenshot 2025-12-09 204140.webp',
    category: 'b2b-automation',
    section: 'Implementation',
    order: 4,
    tags: ['B2B', 'Implementation', 'Workflow'],
    description: 'Processo di implementazione tecnica in 4 fasi',
    challenge: '',
    solutions: [],
    results: [],
  },
  {
    id: 'flowmatics-about',
    name: 'FlowMatics',
    url: 'flowmatics.eu',
    type: 'Automazione Marketing B2B',
    thumbnail: '/portfolio/Screenshot 2025-12-09 204207.webp',
    category: 'b2b-automation',
    section: 'About',
    order: 5,
    tags: ['B2B', 'Company', 'Team'],
    description: 'Team FL1 con 10+ anni esperienza in sales automation',
    challenge: '',
    solutions: [],
    results: [],
  },
  // Row 2: Quickfy Marketing (5 cards - Light theme, blue/purple accent)
  {
    id: 'quickfy-hero',
    name: 'Quickfy',
    url: 'quickfy.eu',
    type: 'SaaS Analytics Platform',
    thumbnail: '/portfolio/Screenshot 2025-12-09 202814.webp',
    category: 'saas',
    section: 'Hero',
    order: 6,
    tags: ['SaaS', 'Analytics', 'Dashboard'],
    description: 'Piattaforma analytics intelligente per PMI con AI integrata',
    challenge: '',
    solutions: [],
    results: [],
  },
  {
    id: 'quickfy-features',
    name: 'Quickfy',
    url: 'quickfy.eu',
    type: 'SaaS Analytics Platform',
    thumbnail: '/portfolio/Screenshot 2025-12-09 202901.webp',
    category: 'saas',
    section: 'Features',
    order: 7,
    tags: ['SaaS', 'Features', 'Growth'],
    description: '3 soluzioni intelligenti per la crescita del business',
    challenge: '',
    solutions: [],
    results: [],
  },
  {
    id: 'quickfy-benefits',
    name: 'Quickfy',
    url: 'quickfy.eu',
    type: 'SaaS Analytics Platform',
    thumbnail: '/portfolio/Screenshot 2025-12-09 202913.webp',
    category: 'saas',
    section: 'Benefits',
    order: 8,
    tags: ['SaaS', 'Benefits', 'Stats'],
    description: 'Vantaggi chiave: 15+ ore risparmiate, 100% chiarezza dati',
    challenge: '',
    solutions: [],
    results: [],
  },
  {
    id: 'quickfy-pricing',
    name: 'Quickfy',
    url: 'quickfy.eu',
    type: 'SaaS Analytics Platform',
    thumbnail: '/portfolio/Screenshot 2025-12-09 202925.webp',
    category: 'saas',
    section: 'Pricing',
    order: 9,
    tags: ['SaaS', 'Pricing', 'Plans'],
    description: 'Piani flessibili da Starter a Pro per ogni esigenza',
    challenge: '',
    solutions: [],
    results: [],
  },
  {
    id: 'quickfy-cta',
    name: 'Quickfy',
    url: 'quickfy.eu',
    type: 'SaaS Analytics Platform',
    thumbnail: '/portfolio/Screenshot 2025-12-09 203001.webp',
    category: 'saas',
    section: 'CTA',
    order: 10,
    tags: ['SaaS', 'Contact', 'Form'],
    description: 'Form di contatto ottimizzato con stats chiave e garanzie',
    challenge: '',
    solutions: [],
    results: [],
  },
  // Row 3: Quickfy Dashboard Internal (5 cards - Internal UX)
  {
    id: 'quickfy-login',
    name: 'Quickfy',
    url: 'quickfy.eu',
    type: 'SaaS Analytics Platform',
    thumbnail: '/portfolio/Screenshot 2025-12-09 204518.webp',
    category: 'webapp',
    section: 'Login',
    order: 11,
    tags: ['WebApp', 'Login', 'UX'],
    description: 'Pagina login pulita con onboarding semplificato',
    challenge: '',
    solutions: [],
    results: [],
  },
  {
    id: 'quickfy-social-dashboard',
    name: 'Quickfy',
    url: 'quickfy.eu',
    type: 'SaaS Analytics Platform',
    thumbnail: '/portfolio/Screenshot 2025-12-09 204557.webp',
    category: 'webapp',
    section: 'Social AI',
    order: 12,
    tags: ['WebApp', 'Social', 'AI'],
    description: 'Dashboard gestione social con AI integrata per contenuti',
    challenge: '',
    solutions: [],
    results: [],
  },
  {
    id: 'quickfy-campaigns',
    name: 'Quickfy',
    url: 'quickfy.eu',
    type: 'SaaS Analytics Platform',
    thumbnail: '/portfolio/Screenshot 2025-12-09 204625.webp',
    category: 'webapp',
    section: 'Campaigns',
    order: 13,
    tags: ['WebApp', 'Campaigns', 'Analytics'],
    description: 'Dashboard campagne marketing con analytics real-time',
    challenge: '',
    solutions: [],
    results: [],
  },
  {
    id: 'quickfy-credits',
    name: 'Quickfy',
    url: 'quickfy.eu',
    type: 'SaaS Analytics Platform',
    thumbnail: '/portfolio/Screenshot 2025-12-09 204648.webp',
    category: 'webapp',
    section: 'Credits',
    order: 14,
    tags: ['WebApp', 'Credits', 'System'],
    description: 'Sistema crediti gamificato per funzionalità AI',
    challenge: '',
    solutions: [],
    results: [],
  },
  {
    id: 'quickfy-hero-duplicate',
    name: 'Quickfy',
    url: 'quickfy.eu',
    type: 'SaaS Analytics Platform',
    thumbnail: '/portfolio/Screenshot 2025-12-09 202814.webp',
    category: 'saas',
    section: 'Hero',
    order: 15,
    tags: ['SaaS', 'Analytics', 'Landing'],
    description: 'Hero section con preview dashboard e CTA efficace',
    challenge: '',
    solutions: [],
    results: [],
  },
]

// Process Steps
export interface ProcessStep {
  icon: LucideIcon
  title: string
  duration: string
  description: string
}

export const PROCESS_STEPS: ProcessStep[] = [
  {
    icon: MessageSquare,
    title: 'Brief',
    duration: '30 minuti',
    description:
      'Chiamata o meeting per capire obiettivi, target e competitor. Raccogliamo tutto il necessario per partire.',
  },
  {
    icon: Palette,
    title: 'Design',
    duration: '2-3 giorni',
    description:
      'Creiamo mockup alta fedeltà basati sul tuo brand. Approvazione prima di iniziare lo sviluppo.',
  },
  {
    icon: Code,
    title: 'Sviluppo',
    duration: '4-7 giorni',
    description:
      'Codifica, test, ottimizzazione performance e SEO. Aggiornamenti continui sullo stato dei lavori.',
  },
  {
    icon: Rocket,
    title: 'Lancio',
    duration: '1 giorno',
    description:
      'Deploy, training completo e consegna credenziali. Sei online e autonomo.',
  },
]

// Capabilities - "Cosa Possiamo Fare"
export interface Capability {
  icon: LucideIcon
  title: string
  description: string
  integrations: string[] // logo file names without extension
}

export const CAPABILITIES: Capability[] = [
  {
    icon: Code,
    title: 'Siti Web & Landing',
    description:
      'Design moderno che converte, ottimizzato SEO e performance. Dal concept al lancio in tempi record.',
    integrations: ['nextjs', 'vercel', 'tailwind'],
  },
  {
    icon: TrendingUp,
    title: 'E-commerce & Pagamenti',
    description:
      'Checkout fluido, pagamenti sicuri, gestione ordini automatizzata. Vendi online senza pensieri.',
    integrations: ['stripe', 'shopify'],
  },
  {
    icon: Users,
    title: 'CRM & Lead Generation',
    description:
      'Pipeline vendita automatizzate, lead scoring, follow-up intelligenti. Converti più contatti in clienti.',
    integrations: ['hubspot'],
  },
  {
    icon: Search,
    title: 'Analytics & Insights',
    description:
      'Dashboard personalizzate, tracking avanzato, decisioni data-driven. Misura ciò che conta.',
    integrations: ['google-analytics', 'hotjar'],
  },
  {
    icon: Sparkles,
    title: 'Automazioni & AI',
    description:
      'Chatbot intelligenti, workflow automatici, integrazioni su misura. Risparmia tempo, scala il business.',
    integrations: ['openai', 'zapier', 'make'],
  },
  {
    icon: MessageSquare,
    title: 'Email & Comunicazione',
    description:
      'Campagne automatiche, notifiche multi-canale, newsletter che convertono. Resta connesso coi clienti.',
    integrations: ['mailchimp', 'sendgrid', 'twilio'],
  },
]

// Guarantees
export interface Guarantee {
  icon: LucideIcon
  badge: string
  title: string
  description: string
}

export const GUARANTEES: Guarantee[] = [
  {
    icon: Clock,
    badge: '10%',
    title: 'Garanzia tempi',
    description:
      'Consegna nei tempi concordati o sconto 10% per ogni giorno di ritardo. Impegno scritto in contratto.',
  },
  {
    icon: RotateCcw,
    badge: '100%',
    title: 'Garanzia soddisfazione',
    description:
      'Non ti convince? Rimborso completo entro 7 giorni dal lancio. Nessuna domanda, nessun vincolo.',
  },
  {
    icon: Users,
    badge: '30gg',
    title: 'Garanzia assistenza',
    description:
      '2 round di revisioni incluse + 30 giorni di supporto post-lancio gratuito. Sempre al tuo fianco.',
  },
]

// Pricing Plans
export interface PricingPlan {
  name: string
  badge: string
  priceRange: string
  duration: string
  idealFor: string
  features: string[]
  highlighted?: boolean
}

export const PRICING_PLANS: PricingPlan[] = [
  {
    name: 'Landing Page',
    badge: 'Più veloce',
    priceRange: '€1.200 - €1.500',
    duration: '7 giorni',
    idealFor: 'Freelancer, professionisti, campagne marketing',
    features: [
      'Design custom 1 pagina',
      'SEO base e meta tags',
      'Form contatto integrato',
      'Hosting incluso 1 anno',
      'Responsive mobile',
      '1 round revisioni',
      'Training e documentazione',
    ],
  },
  {
    name: 'Sito Aziendale',
    badge: 'Più popolare',
    priceRange: '€2.500 - €3.500',
    duration: '10 giorni',
    idealFor: 'PMI, studi professionali, agenzie',
    features: [
      'Design premium multi-pagina',
      'SEO avanzato e analytics',
      'CMS per gestione autonoma',
      'Hosting incluso 1 anno',
      'Blog integrato (opzionale)',
      '2 round revisioni',
      'Training completo + 30gg supporto',
    ],
    highlighted: true,
  },
  {
    name: 'E-commerce / Booking',
    badge: 'Più completo',
    priceRange: '€4.500 - €6.000',
    duration: '14 giorni',
    idealFor: 'Negozi online, ristoranti, hotel, B&B',
    features: [
      'Design premium e-commerce',
      'Pagamenti sicuri integrati',
      'Gestione ordini/prenotazioni',
      'Hosting incluso 1 anno',
      'SEO avanzato e-commerce',
      '2 round revisioni',
      'Training avanzato + 30gg supporto',
    ],
  },
]

// Testimonials
export interface Testimonial {
  name: string
  role: string
  company: string
  text: string
  initials: string
}

export const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Marco Benetti',
    role: 'Titolare',
    company: 'Falegnameria Artigiana',
    text: 'In 10 giorni avevo un sito che finalmente rappresenta la qualità del mio lavoro. Le richieste sono triplicate e ora posso mostrare il portfolio ai clienti con orgoglio.',
    initials: 'MB',
  },
  {
    name: 'Sofia Rossi',
    role: 'Partner',
    company: 'Studio Legale Associato',
    text: 'Professionalità e chiarezza dal primo contatto. Hanno capito subito le nostre esigenze e il risultato è oltre le aspettative. Assistenza sempre presente.',
    initials: 'SR',
  },
  {
    name: 'Luca Marino',
    role: 'Proprietario',
    company: 'Ristorante Da Luca',
    text: 'Sistema prenotazioni che funziona benissimo. Tempi rispettati alla lettera e supporto sempre disponibile. Consigliato al 100%.',
    initials: 'LM',
  },
]

// FAQs
export interface FAQ {
  question: string
  answer: string
}

export const FAQS: FAQ[] = [
  {
    question: 'Quanto tempo ci vuole davvero?',
    answer:
      '7-14 giorni lavorativi a seconda della complessità. Landing page 7 giorni, sito aziendale 10 giorni, e-commerce 14 giorni. Con garanzia scritta: sconto 10% per ogni giorno di ritardo.',
  },
  {
    question: 'Cosa succede se non mi piace il risultato?',
    answer:
      'Hai 2 round di revisioni incluse nel prezzo. Se comunque non sei soddisfatto, rimborso completo al 100% entro 7 giorni dal lancio. Zero rischi.',
  },
  {
    question: 'Posso aggiornare il sito da solo dopo?',
    answer:
      'Assolutamente sì. Usiamo CMS intuitivi (WordPress, Webflow o custom admin). Inoltre forniamo training completo e documentazione step-by-step.',
  },
  {
    question: 'Il prezzo include hosting e dominio?',
    answer:
      'Sì, primo anno incluso nel prezzo del progetto. Dal secondo anno: hosting €150-300/anno, dominio €15-30/anno a seconda delle necessità.',
  },
  {
    question: 'Il sito sarà visibile su Google?',
    answer:
      'Sì, SEO base o avanzato incluso: sitemap, meta tags, velocità ottimizzata, struttura mobile-first. Per risultati garantiti offriamo anche consulenza SEO continuativa.',
  },
  {
    question: 'Offrite manutenzione dopo il lancio?',
    answer:
      'Sì, primi 30 giorni assistenza gratuita inclusa. Poi pacchetti manutenzione da €200-400/mese: aggiornamenti, backup, supporto tecnico, modifiche minori.',
  },
]

// Form Options
export const PROJECT_TYPES = [
  { value: 'landing', label: 'Landing Page' },
  { value: 'website', label: 'Sito Aziendale' },
  { value: 'ecommerce', label: 'E-commerce / Booking' },
  { value: 'other', label: 'Altro' },
] as const

export const BUDGET_OPTIONS = [
  { value: '1-2k', label: '€1.000 - €2.000' },
  { value: '2-4k', label: '€2.000 - €4.000' },
  { value: '4-6k', label: '€4.000 - €6.000' },
  { value: '6k+', label: '+€6.000' },
] as const

// Footer
export const FOOTER_SERVICES = [
  { label: 'Landing Page', href: '#pricing' },
  { label: 'Sito Aziendale', href: '#pricing' },
  { label: 'E-commerce', href: '#pricing' },
  { label: 'Booking & Prenotazioni', href: '#pricing' },
  { label: 'Manutenzione', href: '#pricing' },
] as const

export const FOOTER_RESOURCES = [
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Come funziona', href: '#processo' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Blog', href: '#', comingSoon: true },
] as const

export const FOOTER_LEGAL = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Cookie Policy', href: '/cookies' },
  { label: 'Termini e Condizioni', href: '/terms' },
] as const

export const SOCIAL_LINKS = [
  { name: 'LinkedIn', href: 'https://linkedin.com/company/pixarts' },
  { name: 'Instagram', href: 'https://instagram.com/pixarts.eu' },
] as const
