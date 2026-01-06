# Skill: payload-collection

Crea una nuova collection Payload CMS seguendo i pattern del progetto.

## Quando usare
Usa `/payload-collection` quando l'utente vuole:
- Creare una nuova collection per il CMS
- Aggiungere un nuovo tipo di contenuto gestibile dall'admin

## Istruzioni

### 1. Analizza la richiesta
Chiedi all'utente:
- Nome della collection (singolare e plurale)
- Campi necessari (nome, tipo, localizzato?)
- Se deve essere in un gruppo admin specifico
- Permessi di accesso (pubblico, solo admin, editor)

### 2. Struttura file
Crea il file in: `src/payload/collections/{NomeCollection}.ts`

### 3. Pattern da seguire

```typescript
import type { CollectionConfig } from 'payload'
import { contentAccess, adminOnlyField } from '../access'
import { generateSlug } from '../hooks/slugify'

export const NomeCollection: CollectionConfig = {
  slug: 'nome-collection', // kebab-case
  labels: {
    singular: 'Nome Singolare',
    plural: 'Nome Plurale',
  },
  admin: {
    useAsTitle: 'title', // campo usato come titolo
    group: '📂 Contenuti', // o '⚙️ Impostazioni'
    defaultColumns: ['title', 'status', 'updatedAt'],
    description: 'Descrizione per l\'admin',
  },
  access: contentAccess, // usa access predefiniti
  fields: [
    // Usa tabs per organizzare campi complessi
    {
      type: 'tabs',
      tabs: [
        {
          label: '📋 Info',
          fields: [
            // Campi principali
          ],
        },
        {
          label: '🖼️ Media',
          fields: [
            // Immagini/file
          ],
        },
      ],
    },
  ],
}
```

### 4. Tipi di campo comuni

```typescript
// Testo semplice
{
  name: 'title',
  label: 'Titolo',
  type: 'text',
  required: true,
  localized: true, // se serve traduzione
}

// Slug auto-generato
{
  name: 'slug',
  type: 'text',
  required: true,
  unique: true,
  hooks: {
    beforeValidate: [generateSlug],
  },
  admin: { hidden: true },
}

// Select
{
  name: 'category',
  label: 'Categoria',
  type: 'select',
  options: [
    { label: 'Opzione 1', value: 'opt1' },
    { label: 'Opzione 2', value: 'opt2' },
  ],
}

// Upload immagine
{
  name: 'image',
  label: 'Immagine',
  type: 'upload',
  relationTo: 'media',
  required: true,
}

// Array di elementi
{
  name: 'items',
  label: 'Elementi',
  type: 'array',
  fields: [
    { name: 'name', type: 'text', required: true },
  ],
}

// Rich text
{
  name: 'content',
  label: 'Contenuto',
  type: 'richText',
  localized: true,
}

// Checkbox
{
  name: 'featured',
  label: 'In Evidenza',
  type: 'checkbox',
  defaultValue: false,
}

// Row per campi affiancati
{
  type: 'row',
  fields: [
    { name: 'field1', type: 'text', admin: { width: '50%' } },
    { name: 'field2', type: 'text', admin: { width: '50%' } },
  ],
}
```

### 5. Registra la collection

Aggiungi in `payload.config.ts`:

```typescript
import { NomeCollection } from './src/payload/collections/NomeCollection'

// In collections array:
collections: [
  Users,
  Media,
  // ... altre
  NomeCollection, // <-- aggiungi qui
],
```

### 6. Genera i types

```bash
npx payload generate:types
```

## Gruppi Admin disponibili
- `📂 Contenuti` - Per contenuti pubblici (Projects, Services, etc.)
- `⚙️ Impostazioni` - Per configurazioni globali
- `👥 Utenti` - Per gestione utenti

## Access patterns disponibili
Importa da `../access`:
- `contentAccess` - Lettura pubblica, scrittura per editor/admin
- `adminOnlyAccess` - Solo admin
- `adminOnlyField` - Per campi specifici riservati agli admin
