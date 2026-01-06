# Skill: payload-global

Crea o modifica un Global Payload CMS (contenuto singleton come Navigation, Footer, SiteSettings).

## Quando usare
Usa `/payload-global` quando l'utente vuole:
- Creare una nuova configurazione globale
- Modificare globals esistenti (Navigation, Footer, SiteSettings, HomePage)
- Aggiungere campi a globals esistenti

## Globals esistenti nel progetto
- `site-settings` - Configurazioni generali del sito
- `home-page` - Contenuto della homepage
- `navigation` - Menu di navigazione
- `footer` - Footer del sito

## Istruzioni

### 1. Analizza la richiesta
Chiedi all'utente:
- Nome del global (singolare)
- Campi necessari
- Se richiede localizzazione
- Gruppo admin (default: ⚙️ Impostazioni)

### 2. Struttura file
Crea il file in: `src/payload/globals/{NomeGlobal}.ts`

### 3. Pattern da seguire

```typescript
import type { GlobalConfig } from 'payload'

export const NomeGlobal: GlobalConfig = {
  slug: 'nome-global', // kebab-case
  label: 'Nome Visualizzato',
  access: {
    read: () => true, // pubblico in lettura
  },
  admin: {
    group: '⚙️ Impostazioni',
    description: 'Descrizione per l\'admin',
  },
  fields: [
    // Usa collapsible per organizzare i campi
    {
      type: 'collapsible',
      label: 'Sezione 1',
      admin: {
        initCollapsed: false, // aperto di default
      },
      fields: [
        // campi...
      ],
    },
    {
      type: 'collapsible',
      label: 'Sezione 2',
      admin: {
        initCollapsed: true, // chiuso di default
      },
      fields: [
        // altri campi...
      ],
    },
  ],
}
```

### 4. Esempi di strutture comuni

#### Navigation (menu)
```typescript
{
  name: 'links',
  label: 'Link Menu',
  type: 'array',
  maxRows: 6,
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'label',
          label: 'Testo',
          type: 'text',
          required: true,
          localized: true,
          admin: { width: '50%' },
        },
        {
          name: 'href',
          label: 'Destinazione',
          type: 'text',
          required: true,
          admin: {
            placeholder: '/pagina o #sezione',
            width: '50%',
          },
        },
      ],
    },
  ],
}
```

#### Footer (colonne di link)
```typescript
{
  name: 'columns',
  label: 'Colonne',
  type: 'array',
  maxRows: 3,
  fields: [
    {
      name: 'title',
      label: 'Titolo',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'links',
      label: 'Link',
      type: 'array',
      maxRows: 6,
      fields: [
        { name: 'label', type: 'text', required: true, localized: true },
        { name: 'href', type: 'text', required: true },
      ],
    },
  ],
}
```

#### Site Settings (contatti, social)
```typescript
{
  type: 'collapsible',
  label: 'Contatti',
  fields: [
    { name: 'email', type: 'email' },
    { name: 'phone', type: 'text' },
    { name: 'address', type: 'textarea', localized: true },
  ],
},
{
  type: 'collapsible',
  label: 'Social Media',
  fields: [
    {
      name: 'social',
      type: 'array',
      fields: [
        {
          name: 'platform',
          type: 'select',
          options: [
            { label: 'Facebook', value: 'facebook' },
            { label: 'Instagram', value: 'instagram' },
            { label: 'LinkedIn', value: 'linkedin' },
            { label: 'Twitter/X', value: 'twitter' },
          ],
        },
        { name: 'url', type: 'text', required: true },
      ],
    },
  ],
}
```

### 5. Registra il global

Aggiungi in `payload.config.ts`:

```typescript
import { NomeGlobal } from './src/payload/globals/NomeGlobal'

// In globals array:
globals: [
  SiteSettings,
  HomePage,
  Navigation,
  Footer,
  NomeGlobal, // <-- aggiungi qui
],
```

### 6. Abilita Live Preview (opzionale)

In `payload.config.ts`, aggiungi lo slug del global:

```typescript
livePreview: {
  globals: ['home-page', 'site-settings', 'navigation', 'footer', 'nome-global'],
}
```

### 7. Genera i types

```bash
npx payload generate:types
```

## Validazioni comuni

Importa da `../hooks/slugify`:
```typescript
import { validateHref } from '../hooks/slugify'

// Usa nei campi href
{
  name: 'href',
  type: 'text',
  validate: validateHref, // valida /path o #anchor
}
```

## Best practices
- Usa `collapsible` per raggruppare campi correlati
- Usa `localized: true` per tutti i testi visibili agli utenti
- Limita gli array con `maxRows` per evitare abusi
- Usa `admin.placeholder` per guidare l'utente
- Usa `admin.description` per spiegazioni aggiuntive
