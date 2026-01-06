# Skill: payload-seed

Popola il database Payload CMS con dati di esempio o migra dati esistenti.

## Quando usare
Usa `/payload-seed` quando l'utente vuole:
- Popolare il database con dati iniziali
- Resettare e ricaricare i contenuti
- Aggiungere dati di test
- Migrare dati da costanti TypeScript al CMS

## Script esistente
Il progetto ha già uno script di seed completo:
- **File:** `scripts/seed-payload.ts`
- **Esegui:** `npx tsx scripts/seed-payload.ts`

## Cosa fa lo script esistente

1. **Upload immagini** - Carica le immagini da `/public/portfolio/`
2. **Progetti** - Importa da `PORTFOLIO_PROJECTS_V2` con traduzioni it/en/cs
3. **Servizi** - Importa i piani pricing
4. **Testimonials** - Importa le testimonianze
5. **FAQs** - Importa le domande frequenti
6. **Globals** - Aggiorna HomePage, Navigation, SiteSettings, Footer

## Istruzioni

### 1. Seed completo (tutto)

```bash
npx tsx scripts/seed-payload.ts
```

### 2. Creare seed per nuova collection

Se l'utente vuole un seed per una nuova collection, segui questo pattern:

```typescript
import { getPayload } from 'payload'
import config from '../payload.config'

async function seedNuovaCollection() {
  const payload = await getPayload({ config })

  const locales = ['it', 'en', 'cs'] as const

  // Dati da inserire
  const items = [
    {
      name: 'Item 1',
      translations: {
        it: { title: 'Titolo IT', description: 'Desc IT' },
        en: { title: 'Title EN', description: 'Desc EN' },
        cs: { title: 'Název CS', description: 'Popis CS' },
      },
    },
    // ...altri items
  ]

  for (let i = 0; i < items.length; i++) {
    const item = items[i]

    try {
      // Crea in italiano (default locale)
      const created = await payload.create({
        collection: 'nuova-collection',
        locale: 'it',
        data: {
          name: item.name,
          title: item.translations.it.title,
          description: item.translations.it.description,
          order: i,
        },
      })

      console.log(`✓ ${item.name} (IT) → ID ${created.id}`)

      // Aggiorna altre lingue
      for (const locale of ['en', 'cs'] as const) {
        await payload.update({
          collection: 'nuova-collection',
          id: created.id,
          locale,
          data: {
            title: item.translations[locale].title,
            description: item.translations[locale].description,
          },
        })
        console.log(`  → ${locale.toUpperCase()} aggiornato`)
      }
    } catch (error: any) {
      console.log(`✗ Errore ${item.name}: ${error.message}`)
    }
  }

  process.exit(0)
}

seedNuovaCollection()
```

### 3. Seed con upload media

```typescript
import fs from 'fs'
import path from 'path'

// Upload immagine
const filePath = path.join(process.cwd(), 'public', 'images', 'foto.webp')
const buffer = fs.readFileSync(filePath)

const uploaded = await payload.create({
  collection: 'media',
  data: { alt: 'Descrizione immagine' },
  file: {
    data: buffer,
    mimetype: 'image/webp',
    name: 'foto.webp',
    size: buffer.length,
  },
})

// Usa l'ID per relazioni
const mediaId = uploaded.id
```

### 4. Seed global

```typescript
await payload.updateGlobal({
  slug: 'nome-global',
  locale: 'it',
  data: {
    campo1: 'valore',
    campo2: 'altro valore',
  },
})
```

### 5. Reset database prima del seed

Se vuoi ripartire da zero:

```bash
# Backup (opzionale)
cp payload.db payload.db.backup

# Elimina database
rm payload.db

# Rigenera schema
npx payload migrate:create

# Esegui seed
npx tsx scripts/seed-payload.ts
```

## Pattern importanti

### Gestione traduzioni
- Crea prima in `locale: 'it'` (default)
- Aggiorna con `payload.update()` per altre lingue
- I campi non localizzati non servono nelle update

### Gestione relazioni (upload)
- Prima carica i media
- Salva gli ID in una Map
- Usa gli ID nelle relazioni

```typescript
const mediaMap = new Map<string, number>()

// Upload
const uploaded = await payload.create({ collection: 'media', ... })
mediaMap.set('chiave-immagine', uploaded.id)

// Usa nella collection
const project = await payload.create({
  collection: 'projects',
  data: {
    images: [{ image: mediaMap.get('chiave-immagine') }],
  },
})
```

### Gestione errori
```typescript
try {
  // operazione
} catch (error: any) {
  console.log(`✗ Errore: ${error.message}`)
  // continua con il prossimo item
}
```

## Comandi utili

```bash
# Esegui seed
npx tsx scripts/seed-payload.ts

# Genera types dopo modifiche schema
npx payload generate:types

# Crea migrazione
npx payload migrate:create

# Esegui migrazioni
npx payload migrate
```
