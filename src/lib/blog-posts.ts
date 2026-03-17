export interface BlogPostContent {
  title: string
  excerpt: string
  metaTitle: string
  metaDescription: string
  content: string // HTML string with h2, h3, p, ul, li tags
}

export interface BlogPost {
  slug: string
  publishedAt: string
  readingTime: number // minutes
  category: string
  content: {
    it: BlogPostContent
    en: BlogPostContent
    cs: BlogPostContent
  }
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'quanto-costa-sito-web',
    publishedAt: '2025-01-15',
    readingTime: 7,
    category: 'Pricing',
    content: {
      it: {
        title: 'Quanto costa un sito web professionale nel 2025?',
        excerpt:
          "Una guida completa ai prezzi reali per siti web in Italia: dalla landing page all'e-commerce, con tutti i fattori che influenzano il costo.",
        metaTitle: 'Quanto costa un sito web nel 2025? Prezzi reali in Italia',
        metaDescription:
          'Scopri i prezzi reali per un sito web professionale in Italia nel 2025. Landing page da €1.200, siti aziendali da €2.500, e-commerce da €4.500. Guida completa.',
        content: `<h2>I prezzi reali di un sito web nel 2025</h2>
<p>Questa è la domanda più comune che riceviamo ogni giorno: <strong>quanto costa un sito web?</strong> La risposta onesta è: dipende. Ma in questa guida ti daremo i numeri reali, senza marketing, senza prezzi gonfiati.</p>

<h2>Le 3 fasce di prezzo principali</h2>

<h3>Landing Page: €1.200 - €1.500</h3>
<p>Una landing page professionale è il punto di partenza ideale per freelancer, professionisti e campagne marketing. Include:</p>
<ul>
<li>Design custom a una pagina</li>
<li>SEO base (meta tags, sitemap, robots.txt)</li>
<li>Form di contatto integrato</li>
<li>Hosting e dominio per il primo anno</li>
<li>Responsive su tutti i dispositivi</li>
<li>Consegna garantita in 7 giorni</li>
</ul>

<h3>Sito Aziendale: €2.500 - €3.500</h3>
<p>Il sito aziendale è la scelta giusta per PMI, studi professionali e agenzie che hanno bisogno di più pagine e gestione autonoma dei contenuti. Include:</p>
<ul>
<li>Design premium multi-pagina (5-10 pagine)</li>
<li>SEO avanzato con analytics integrati</li>
<li>CMS per aggiornare i contenuti in autonomia</li>
<li>Blog integrato (opzionale)</li>
<li>2 round di revisioni</li>
<li>30 giorni di supporto post-lancio</li>
</ul>

<h3>E-commerce e Booking: €4.500 - €6.000</h3>
<p>Per negozi online, ristoranti, hotel e B&B che hanno bisogno di vendere o gestire prenotazioni online. Include pagamenti Stripe, gestione ordini e SEO e-commerce.</p>

<h2>Cosa influenza il prezzo?</h2>
<p>Il costo finale dipende da diversi fattori:</p>
<ul>
<li><strong>Numero di pagine</strong>: una landing page costa meno di un sito a 20 pagine</li>
<li><strong>Funzionalità</strong>: e-commerce, booking, area riservata aumentano il costo</li>
<li><strong>Design</strong>: un design completamente custom costa di più di un tema adattato</li>
<li><strong>Integrazioni</strong>: CRM, chatbot AI, email marketing aggiungono costo</li>
<li><strong>Contenuti</strong>: se hai già testi e immagini pronti, risparmi tempo</li>
</ul>

<h2>Prezzi da evitare: i campanelli d'allarme</h2>
<p>Diffida da queste situazioni:</p>
<ul>
<li><strong>Prezzi sotto €500</strong>: impossibile fare lavoro professionale a queste cifre</li>
<li><strong>Nessun contratto scritto</strong>: senza garanzie scritte, sei esposto a rischi</li>
<li><strong>Tempi indefiniti</strong>: "quando è pronto è pronto" non è un piano di lavoro</li>
<li><strong>Hosting incluso a vita</strong>: non esiste, qualcuno paga sempre</li>
</ul>

<h2>I costi ricorrenti: cosa aspettarsi ogni anno</h2>
<p>Oltre al costo una tantum del sito, considera questi costi annuali:</p>
<ul>
<li>Hosting: €150-300/anno</li>
<li>Dominio: €15-30/anno</li>
<li>Manutenzione (opzionale): €150-400/mese</li>
<li>SSL: incluso nella maggior parte degli hosting</li>
</ul>

<h2>Quanto costa NON avere un sito professionale?</h2>
<p>Il vero costo non è quello del sito, ma quello delle opportunità perse. Un sito lento, vecchio o poco convincente può costare molto di più del suo costo di sviluppo in clienti persi.</p>
<p>Per avere un preventivo preciso e gratuito entro 24 ore, puoi <a href="/preventivo">richiedere qui</a>.</p>`,
      },
      en: {
        title: 'How much does a professional website cost in 2025?',
        excerpt:
          'A complete guide to real website prices: from landing pages to e-commerce, with all the factors that affect the cost.',
        metaTitle: 'How much does a website cost in 2025? Real prices',
        metaDescription:
          'Discover real prices for a professional website in 2025. Landing pages from €1,200, business websites from €2,500, e-commerce from €4,500. Complete guide.',
        content: `<h2>Real website prices in 2025</h2>
<p>This is the most common question we receive: <strong>how much does a website cost?</strong> The honest answer is: it depends. But in this guide we'll give you real numbers, without marketing fluff, without inflated prices.</p>

<h2>The 3 main price ranges</h2>

<h3>Landing Page: €1,200 - €1,500</h3>
<p>A professional landing page is the ideal starting point for freelancers, professionals, and marketing campaigns. Includes:</p>
<ul>
<li>Custom single-page design</li>
<li>Basic SEO (meta tags, sitemap, robots.txt)</li>
<li>Integrated contact form</li>
<li>First-year hosting and domain</li>
<li>Responsive on all devices</li>
<li>Guaranteed delivery in 7 days</li>
</ul>

<h3>Business Website: €2,500 - €3,500</h3>
<p>The business website is right for SMEs, professional firms, and agencies that need multiple pages and autonomous content management. Includes:</p>
<ul>
<li>Premium multi-page design (5-10 pages)</li>
<li>Advanced SEO with integrated analytics</li>
<li>CMS to update content independently</li>
<li>Optional integrated blog</li>
<li>2 revision rounds</li>
<li>30 days post-launch support</li>
</ul>

<h3>E-commerce and Booking: €4,500 - €6,000</h3>
<p>For online stores, restaurants, hotels, and B&Bs that need to sell or manage online bookings. Includes Stripe payments, order management, and e-commerce SEO.</p>

<h2>What affects the price?</h2>
<ul>
<li><strong>Number of pages</strong>: a landing page costs less than a 20-page site</li>
<li><strong>Features</strong>: e-commerce, booking, private areas increase the cost</li>
<li><strong>Design</strong>: fully custom design costs more than an adapted theme</li>
<li><strong>Integrations</strong>: CRM, AI chatbot, email marketing add cost</li>
<li><strong>Content</strong>: having texts and images ready saves time and cost</li>
</ul>

<h2>Prices to avoid: red flags</h2>
<ul>
<li><strong>Prices under €500</strong>: impossible to do professional work at these prices</li>
<li><strong>No written contract</strong>: without written guarantees, you're exposed to risks</li>
<li><strong>Undefined timelines</strong>: "when it's ready it's ready" is not a work plan</li>
<li><strong>Lifetime hosting included</strong>: doesn't exist, someone always pays</li>
</ul>

<h2>Recurring costs: what to expect each year</h2>
<ul>
<li>Hosting: €150-300/year</li>
<li>Domain: €15-30/year</li>
<li>Maintenance (optional): €150-400/month</li>
<li>SSL: included in most hosting plans</li>
</ul>

<h2>How much does NOT having a professional website cost?</h2>
<p>The real cost is not the website itself, but the missed opportunities. A slow, outdated, or unconvincing website can cost far more than its development cost in lost clients.</p>
<p>To get a precise, free quote within 24 hours, <a href="/en/preventivo">request it here</a>.</p>`,
      },
      cs: {
        title: 'Kolik stojí profesionální webové stránky v roce 2025?',
        excerpt:
          'Kompletní průvodce reálnými cenami webů: od landing page po e-shop, se všemi faktory, které ovlivňují cenu.',
        metaTitle: 'Kolik stojí web v roce 2025? Reálné ceny',
        metaDescription:
          'Zjistěte reálné ceny profesionálního webu v roce 2025. Landing page od 1 200 €, firemní web od 2 500 €, e-shop od 4 500 €. Kompletní průvodce.',
        content: `<h2>Reálné ceny webů v roce 2025</h2>
<p>Toto je nejčastější otázka, kterou dostáváme: <strong>kolik stojí web?</strong> Upřímná odpověď je: záleží. Ale v tomto průvodci vám dáme reálná čísla bez marketingových frází.</p>

<h2>3 hlavní cenové kategorie</h2>

<h3>Landing Page: 1 200 € - 1 500 €</h3>
<p>Profesionální landing page je ideální výchozí bod pro freelancery, profesionály a marketingové kampaně. Zahrnuje:</p>
<ul>
<li>Vlastní jednostránkový design</li>
<li>Základní SEO (meta tagy, sitemap, robots.txt)</li>
<li>Integrovaný kontaktní formulář</li>
<li>Hosting a doménu na první rok</li>
<li>Responzivní na všech zařízeních</li>
<li>Garantované dodání za 7 dní</li>
</ul>

<h3>Firemní web: 2 500 € - 3 500 €</h3>
<p>Firemní web je správnou volbou pro SME, profesní firmy a agentury, které potřebují více stránek a autonomní správu obsahu. Zahrnuje:</p>
<ul>
<li>Prémiový vícestránkový design (5-10 stránek)</li>
<li>Pokročilé SEO s integrovanou analytikou</li>
<li>CMS pro samostatnou aktualizaci obsahu</li>
<li>Volitelný integrovaný blog</li>
<li>2 kola revizí</li>
<li>30 dní podpory po spuštění</li>
</ul>

<h3>E-shop a Rezervace: 4 500 € - 6 000 €</h3>
<p>Pro online obchody, restaurace, hotely a penziony, které potřebují prodávat nebo spravovat online rezervace. Zahrnuje platby Stripe, správu objednávek a SEO pro e-shop.</p>

<h2>Co ovlivňuje cenu?</h2>
<ul>
<li><strong>Počet stránek</strong>: landing page stojí méně než web s 20 stránkami</li>
<li><strong>Funkce</strong>: e-shop, rezervace, privátní oblasti zvyšují cenu</li>
<li><strong>Design</strong>: plně vlastní design stojí více než upravená šablona</li>
<li><strong>Integrace</strong>: CRM, AI chatbot, e-mail marketing přidávají náklady</li>
<li><strong>Obsah</strong>: mít připravené texty a obrázky šetří čas a náklady</li>
</ul>

<h2>Ceny, kterým se vyhnout: varovné signály</h2>
<ul>
<li><strong>Ceny pod 500 €</strong>: při těchto cenách je profesionální práce nemožná</li>
<li><strong>Žádná písemná smlouva</strong>: bez písemných záruk jste vystaveni rizikům</li>
<li><strong>Neurčité termíny</strong>: "až bude hotovo" není pracovní plán</li>
<li><strong>Hosting na celý život zdarma</strong>: neexistuje, někdo vždy platí</li>
</ul>

<h2>Opakující se náklady: co očekávat každý rok</h2>
<ul>
<li>Hosting: 150-300 €/rok</li>
<li>Doména: 15-30 €/rok</li>
<li>Údržba (volitelná): 150-400 €/měsíc</li>
<li>SSL: zahrnuto ve většině hostingových plánů</li>
</ul>

<p>Pro přesnou a bezplatnou nabídku do 24 hodin si ji můžete <a href="/cs/preventivo">vyžádat zde</a>.</p>`,
      },
    },
  },
  {
    slug: 'landing-page-vs-sito-aziendale',
    publishedAt: '2025-02-10',
    readingTime: 5,
    category: 'Guide',
    content: {
      it: {
        title: 'Landing page o sito aziendale? Come scegliere nel 2025',
        excerpt:
          "La differenza tra landing page e sito aziendale, quando scegliere uno o l'altro e come capire qual è la soluzione giusta per il tuo business.",
        metaTitle: 'Landing page vs sito aziendale: quale scegliere?',
        metaDescription:
          "Landing page o sito aziendale? Scopri le differenze, i costi e quando scegliere uno o l'altro per il tuo business. Guida pratica con esempi reali.",
        content: `<h2>Landing page e sito aziendale: non è la stessa cosa</h2>
<p>Molti imprenditori usano questi termini in modo intercambiabile, ma sono soluzioni molto diverse con obiettivi diversi. Scegliere quella sbagliata può costare tempo e denaro.</p>

<h2>Cos'è una landing page?</h2>
<p>Una <strong>landing page</strong> è una singola pagina web progettata per un obiettivo specifico: raccogliere contatti, promuovere un prodotto, lanciare una campagna. È il punto di "atterraggio" di una campagna pubblicitaria o SEO.</p>

<h3>Quando scegliere una landing page:</h3>
<ul>
<li>Hai un'offerta o servizio specifico da promuovere</li>
<li>Stai lanciando una campagna Google Ads o Meta Ads</li>
<li>Vuoi raccogliere lead per un singolo servizio</li>
<li>Hai un budget limitato e vuoi partire velocemente</li>
<li>Sei un freelancer o professionista con un'offerta chiara</li>
</ul>

<h2>Cos'è un sito aziendale?</h2>
<p>Un <strong>sito aziendale</strong> è una presenza web completa con più pagine: home, chi siamo, servizi, portfolio, contatti, blog. Racconta la storia dell'azienda e costruisce autorevolezza nel tempo.</p>

<h3>Quando scegliere un sito aziendale:</h3>
<ul>
<li>Hai più servizi o prodotti da presentare</li>
<li>Vuoi costruire credibilità e fiducia nel lungo periodo</li>
<li>Il tuo processo di vendita è lungo e informativo</li>
<li>Hai bisogno di un blog per il content marketing</li>
<li>Vuoi gestire i contenuti in autonomia</li>
</ul>

<h2>Il confronto diretto</h2>
<p><strong>Landing page</strong>: €1.200-1.500, consegna in 7 giorni, 1 pagina, conversione immediata, ideale per campagne.</p>
<p><strong>Sito aziendale</strong>: €2.500-3.500, consegna in 10 giorni, 5-10 pagine, costruisce autorevolezza, ideale per presenza duratura.</p>

<h2>Puoi avere entrambi?</h2>
<p>Assolutamente sì, ed è spesso la strategia migliore. Un sito aziendale come base di credibilità, più landing page dedicate per campagne specifiche. Molti nostri clienti iniziano con una landing page e aggiungono il sito aziendale dopo 6-12 mesi.</p>

<h2>La nostra raccomandazione</h2>
<p>Se stai partendo da zero e hai un budget limitato: <strong>inizia con una landing page</strong>. Se hai già una presenza online o più servizi da comunicare: <strong>investi nel sito aziendale</strong>.</p>
<p>Non sicuro? <a href="/prenota">Prenota una call gratuita</a> di 30 minuti e ti aiutiamo a scegliere la soluzione giusta per il tuo caso specifico.</p>`,
      },
      en: {
        title: 'Landing page or business website? How to choose in 2025',
        excerpt:
          'The difference between a landing page and a business website, when to choose one over the other, and how to find the right solution for your business.',
        metaTitle: 'Landing page vs business website: which to choose?',
        metaDescription:
          'Landing page or business website? Discover the differences, costs, and when to choose one or the other for your business. Practical guide with real examples.',
        content: `<h2>Landing page and business website: not the same thing</h2>
<p>Many entrepreneurs use these terms interchangeably, but they are very different solutions with different objectives. Choosing the wrong one can cost time and money.</p>

<h2>What is a landing page?</h2>
<p>A <strong>landing page</strong> is a single web page designed for a specific goal: collecting contacts, promoting a product, launching a campaign. It is the "landing" point of an advertising or SEO campaign.</p>

<h3>When to choose a landing page:</h3>
<ul>
<li>You have a specific offer or service to promote</li>
<li>You are launching a Google Ads or Meta Ads campaign</li>
<li>You want to collect leads for a single service</li>
<li>You have a limited budget and want to start quickly</li>
<li>You are a freelancer or professional with a clear offer</li>
</ul>

<h2>What is a business website?</h2>
<p>A <strong>business website</strong> is a complete web presence with multiple pages: home, about us, services, portfolio, contacts, blog. It tells the company story and builds authority over time.</p>

<h3>When to choose a business website:</h3>
<ul>
<li>You have multiple services or products to present</li>
<li>You want to build credibility and trust long-term</li>
<li>Your sales process is long and informative</li>
<li>You need a blog for content marketing</li>
<li>You want to manage content independently</li>
</ul>

<h2>Direct comparison</h2>
<p><strong>Landing page</strong>: €1,200-1,500, delivery in 7 days, 1 page, immediate conversion, ideal for campaigns.</p>
<p><strong>Business website</strong>: €2,500-3,500, delivery in 10 days, 5-10 pages, builds authority, ideal for lasting presence.</p>

<h2>Can you have both?</h2>
<p>Absolutely, and it is often the best strategy. A business website as a credibility base, plus dedicated landing pages for specific campaigns. Many of our clients start with a landing page and add the business website after 6-12 months.</p>

<h2>Our recommendation</h2>
<p>Starting from scratch with a limited budget: <strong>start with a landing page</strong>. Already have an online presence or multiple services to communicate: <strong>invest in a business website</strong>.</p>
<p>Not sure? <a href="/en/prenota">Book a free 30-minute call</a> and we will help you choose the right solution for your specific case.</p>`,
      },
      cs: {
        title: 'Landing page nebo firemní web? Jak vybrat v roce 2025',
        excerpt:
          'Rozdíl mezi landing page a firemním webem, kdy vybrat jedno nebo druhé a jak najít správné řešení pro vaše podnikání.',
        metaTitle: 'Landing page vs firemní web: co vybrat?',
        metaDescription:
          'Landing page nebo firemní web? Zjistěte rozdíly, náklady a kdy vybrat jedno nebo druhé pro vaše podnikání. Praktický průvodce s reálnými příklady.',
        content: `<h2>Landing page a firemní web: není to totéž</h2>
<p>Mnoho podnikatelů tyto pojmy používá zaměnitelně, ale jsou to velmi odlišná řešení s různými cíli. Výběr špatného může stát čas a peníze.</p>

<h2>Co je landing page?</h2>
<p><strong>Landing page</strong> je jediná webová stránka navržená pro konkrétní cíl: sbírání kontaktů, propagace produktu, spuštění kampaně. Je to "přistávací" bod reklamní nebo SEO kampaně.</p>

<h3>Kdy vybrat landing page:</h3>
<ul>
<li>Máte konkrétní nabídku nebo službu k propagaci</li>
<li>Spouštíte kampaň Google Ads nebo Meta Ads</li>
<li>Chcete sbírat leady pro jednu službu</li>
<li>Máte omezený rozpočet a chcete začít rychle</li>
<li>Jste freelancer nebo profesionál s jasnou nabídkou</li>
</ul>

<h2>Co je firemní web?</h2>
<p><strong>Firemní web</strong> je kompletní webová přítomnost s více stránkami: home, o nás, služby, portfolio, kontakty, blog. Vypráví příběh firmy a buduje autoritu v průběhu času.</p>

<h3>Kdy vybrat firemní web:</h3>
<ul>
<li>Máte více služeb nebo produktů k prezentaci</li>
<li>Chcete budovat důvěryhodnost a důvěru dlouhodobě</li>
<li>Váš prodejní proces je dlouhý a informativní</li>
<li>Potřebujete blog pro content marketing</li>
<li>Chcete spravovat obsah samostatně</li>
</ul>

<h2>Přímé srovnání</h2>
<p><strong>Landing page</strong>: 1 200-1 500 €, dodání za 7 dní, 1 stránka, okamžitá konverze, ideální pro kampaně.</p>
<p><strong>Firemní web</strong>: 2 500-3 500 €, dodání za 10 dní, 5-10 stránek, buduje autoritu, ideální pro trvalou přítomnost.</p>

<h2>Naše doporučení</h2>
<p>Začínáte od nuly s omezeným rozpočtem: <strong>začněte s landing page</strong>. Máte již online přítomnost nebo více služeb ke komunikaci: <strong>investujte do firemního webu</strong>.</p>
<p>Nejste si jisti? <a href="/cs/prenota">Rezervujte si bezplatný 30minutový hovor</a> a pomůžeme vám vybrat správné řešení pro váš konkrétní případ.</p>`,
      },
    },
  },
  {
    slug: 'scegliere-agenzia-web',
    publishedAt: '2025-03-05',
    readingTime: 6,
    category: 'Guide',
    content: {
      it: {
        title: "Come scegliere un'agenzia web: 7 criteri essenziali",
        excerpt:
          "I 7 criteri indispensabili per scegliere l'agenzia web giusta, le domande da fare prima di firmare e i segnali di allarme da evitare.",
        metaTitle: "Come scegliere un'agenzia web: 7 criteri essenziali nel 2025",
        metaDescription:
          "Come scegliere la giusta agenzia web? 7 criteri essenziali, le domande giuste da fare e i campanelli d'allarme da evitare. Guida pratica per imprenditori.",
        content: `<h2>Perché scegliere l'agenzia sbagliata è costoso</h2>
<p>Un sito web mal fatto non è solo un investimento sprecato — è un danno attivo al tuo business. Ogni giorno che i visitatori trovano un sito lento, vecchio o confuso, perdi potenziali clienti. Per questo, scegliere bene è fondamentale.</p>

<h2>I 7 criteri per scegliere un'agenzia web</h2>

<h3>1. Portfolio con risultati misurabili</h3>
<p>Non basta vedere "bei siti". Cerca agenzie che mostrano risultati concreti: +X% conversioni, +Y% traffico, posizionamento in top 5 Google. Se non hanno case study con numeri, non hanno la mentalità orientata ai risultati.</p>

<h3>2. Tempi di consegna garantiti per iscritto</h3>
<p>Qualsiasi agenzia può promettere 2 settimane. Poche mettono questa promessa in un contratto con penali. Chiedi sempre: "Cosa succede se consegnate in ritardo?" Se non hanno una risposta chiara, è un segnale di allarme.</p>

<h3>3. Stack tecnologico moderno</h3>
<p>Il sito che costruiscono oggi dovrà funzionare per i prossimi 3-5 anni. Chiedi quale tecnologia usano. WordPress è ancora valido per molti casi, ma Next.js, React e TypeScript garantiscono performance e scalabilità superiori.</p>

<h3>4. SEO incluso, non venduto come extra</h3>
<p>Un sito senza SEO è come un negozio in una strada senza accesso. Il SEO base (meta tags, sitemap, velocità, mobile) deve essere incluso nel prezzo standard, non un add-on a pagamento.</p>

<h3>5. Contratto chiaro e trasparente</h3>
<p>Leggi il contratto con attenzione. Deve specificare: cosa è incluso, cosa non è incluso, i tempi di consegna, le condizioni di pagamento, la proprietà del codice sorgente (deve essere tua) e le condizioni di recesso.</p>

<h3>6. Comunicazione diretta</h3>
<p>Testa la comunicazione prima di firmare. Quanto tempo impiegano a rispondere? Rispondono in modo chiaro o con tecnicismi incomprensibili? La qualità della comunicazione pre-vendita riflette quella del progetto.</p>

<h3>7. Garanzia post-lancio</h3>
<p>I bug capitano. La domanda è: chi li risolve e in quanto tempo? Cerca agenzie che offrono almeno 30 giorni di supporto gratuito post-lancio.</p>

<h2>Le 5 domande da fare prima di firmare</h2>
<ol>
<li>Posso vedere 3 case study con risultati misurabili?</li>
<li>Quali sono le penali se consegnate in ritardo?</li>
<li>Il codice sorgente sarà di mia proprietà?</li>
<li>Come funziona il supporto post-lancio?</li>
<li>Posso aggiornare il sito da solo dopo?</li>
</ol>

<h2>I campanelli d'allarme da evitare</h2>
<ul>
<li>Portfolio senza case study e senza risultati</li>
<li>Nessun contratto scritto o contratto vago</li>
<li>Prezzi molto bassi senza spiegazione</li>
<li>Tempi di risposta lenti già in fase di preventivo</li>
<li>Hosting proprietario dell'agenzia senza possibilità di migrazione</li>
</ul>

<p>Hai domande sulla nostra agenzia? <a href="/prenota">Prenota una call gratuita</a> — rispondiamo a tutte le domande senza impegno.</p>`,
      },
      en: {
        title: 'How to choose a web agency: 7 essential criteria',
        excerpt:
          'The 7 indispensable criteria for choosing the right web agency, questions to ask before signing, and red flags to avoid.',
        metaTitle: 'How to choose a web agency: 7 essential criteria in 2025',
        metaDescription:
          'How to choose the right web agency? 7 essential criteria, the right questions to ask, and red flags to avoid. Practical guide for entrepreneurs.',
        content: `<h2>Why choosing the wrong agency is expensive</h2>
<p>A poorly built website is not just a wasted investment — it actively harms your business. Every day visitors find a slow, outdated, or confusing site, you lose potential clients.</p>

<h2>The 7 criteria for choosing a web agency</h2>

<h3>1. Portfolio with measurable results</h3>
<p>Looking at "nice websites" is not enough. Look for agencies that show concrete results: +X% conversions, +Y% traffic, top 5 Google rankings. If they have no case studies with numbers, they don't have a results-oriented mindset.</p>

<h3>2. Delivery times guaranteed in writing</h3>
<p>Any agency can promise 2 weeks. Few put this promise in a contract with penalties. Always ask: "What happens if you deliver late?" If they don't have a clear answer, that's a red flag.</p>

<h3>3. Modern technology stack</h3>
<p>The site they build today needs to work for the next 3-5 years. Ask what technology they use. WordPress is still valid for many cases, but Next.js, React, and TypeScript guarantee superior performance and scalability.</p>

<h3>4. SEO included, not sold as an extra</h3>
<p>A website without SEO is like a store on a road with no access. Basic SEO (meta tags, sitemap, speed, mobile) must be included in the standard price, not a paid add-on.</p>

<h3>5. Clear and transparent contract</h3>
<p>Read the contract carefully. It must specify: what is included, what is not, delivery times, payment terms, source code ownership (must be yours), and withdrawal conditions.</p>

<h3>6. Direct communication</h3>
<p>Test communication before signing. How long do they take to respond? Do they respond clearly or with incomprehensible jargon? Pre-sale communication quality reflects the project quality.</p>

<h3>7. Post-launch guarantee</h3>
<p>Bugs happen. The question is: who fixes them and how quickly? Look for agencies that offer at least 30 days of free post-launch support.</p>

<h2>The 5 questions to ask before signing</h2>
<ol>
<li>Can I see 3 case studies with measurable results?</li>
<li>What are the penalties if you deliver late?</li>
<li>Will I own the source code?</li>
<li>How does post-launch support work?</li>
<li>Can I update the site myself afterward?</li>
</ol>

<p>Have questions about our agency? <a href="/en/prenota">Book a free call</a> — we answer all questions with no commitment.</p>`,
      },
      cs: {
        title: 'Jak vybrat webovou agenturu: 7 základních kritérií',
        excerpt:
          'Sedm nezbytných kritérií pro výběr správné webové agentury, otázky k zodpovězení před podpisem a varovné signály, kterým se vyhnout.',
        metaTitle: 'Jak vybrat webovou agenturu: 7 základních kritérií v roce 2025',
        metaDescription:
          'Jak vybrat správnou webovou agenturu? 7 základních kritérií, správné otázky a varovné signály. Praktický průvodce pro podnikatele.',
        content: `<h2>Proč je výběr špatné agentury drahý</h2>
<p>Špatně vytvořený web není jen zmařená investice — aktivně poškozuje vaše podnikání. Každý den, kdy návštěvníci narazí na pomalý, zastaralý nebo matoucí web, ztrácíte potenciální klienty.</p>

<h2>7 kritérií pro výběr webové agentury</h2>

<h3>1. Portfolio s měřitelnými výsledky</h3>
<p>Nestačí se dívat na "pěkné weby". Hledejte agentury, které ukazují konkrétní výsledky: +X% konverzí, +Y% návštěvnosti, Top 5 Google. Pokud nemají případové studie s čísly, nemají myšlení orientované na výsledky.</p>

<h3>2. Termíny dodání zaručené písemně</h3>
<p>Každá agentura může slíbit 2 týdny. Málokterá tento slib dá do smlouvy s penále. Vždy se ptejte: "Co se stane, když dodáte se zpožděním?"</p>

<h3>3. Moderní technologický stack</h3>
<p>Web, který dnes vytvoří, musí fungovat příštích 3-5 let. Ptejte se, jakou technologii používají. WordPress je stále platný pro mnoho případů, ale Next.js, React a TypeScript zaručují lepší výkon a škálovatelnost.</p>

<h3>4. SEO zahrnuto, ne prodáváno jako extra</h3>
<p>Web bez SEO je jako obchod na nepřístupné ulici. Základní SEO (meta tagy, sitemap, rychlost, mobilní verze) musí být zahrnuto ve standardní ceně.</p>

<h2>5 otázek před podpisem smlouvy</h2>
<ol>
<li>Mohu vidět 3 případové studie s měřitelnými výsledky?</li>
<li>Jaká jsou penále za pozdní dodání?</li>
<li>Budu vlastnit zdrojový kód?</li>
<li>Jak funguje podpora po spuštění?</li>
<li>Mohu si web sám aktualizovat?</li>
</ol>

<p>Máte otázky ohledně naší agentury? <a href="/cs/prenota">Rezervujte si bezplatný hovor</a> — odpovídáme na všechny otázky bez závazků.</p>`,
      },
    },
  },
]
