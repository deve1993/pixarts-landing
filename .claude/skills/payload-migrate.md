# Skill: payload-migrate

Gestisce le migrazioni del database Payload CMS (SQLite).

## Quando usare
Usa `/payload-migrate` quando l'utente vuole:
- Creare una nuova migrazione dopo modifiche allo schema
- Applicare migrazioni pendenti
- Risolvere problemi di migrazione
- Reset del database

## Comandi principali

### 1. Creare nuova migrazione

Dopo aver modificato collections o globals:

```bash
npx payload migrate:create
```

Questo genera un file in `src/migrations/` con timestamp.

### 2. Applicare migrazioni

```bash
npx payload migrate
```

### 3. Generare TypeScript types

Dopo migrazioni o modifiche schema:

```bash
npx payload generate:types
```

Output: `src/payload/payload-types.ts`

## Scenari comuni

### Scenario 1: Aggiunta nuovo campo

1. Modifica la collection in `src/payload/collections/`
2. Crea migrazione:
   ```bash
   npx payload migrate:create
   ```
3. Applica:
   ```bash
   npx payload migrate
   ```
4. Rigenera types:
   ```bash
   npx payload generate:types
   ```

### Scenario 2: Nuova collection

1. Crea file collection in `src/payload/collections/NuovaCollection.ts`
2. Registra in `payload.config.ts`:
   ```typescript
   import { NuovaCollection } from './src/payload/collections/NuovaCollection'

   collections: [
     // ...esistenti
     NuovaCollection,
   ],
   ```
3. Crea e applica migrazione:
   ```bash
   npx payload migrate:create && npx payload migrate
   ```
4. Rigenera types:
   ```bash
   npx payload generate:types
   ```

### Scenario 3: Reset completo database

⚠️ **ATTENZIONE: Elimina tutti i dati!**

```bash
# 1. Backup (opzionale ma consigliato)
cp payload.db payload.db.backup-$(date +%Y%m%d-%H%M%S)

# 2. Elimina database
rm payload.db

# 3. Avvia dev per rigenerare schema
pnpm dev
# oppure
npx payload migrate

# 4. Seed dati
npx tsx scripts/seed-payload.ts
```

### Scenario 4: Database bloccato (Windows)

Se il database è bloccato da un processo Node:

```powershell
# Termina tutti i processi Node
taskkill /F /IM node.exe

# Attendi
timeout /t 2

# Elimina database
del payload.db

# Riavvia
pnpm dev
```

### Scenario 5: Errore migrazione

Se una migrazione fallisce:

1. **Controlla errore** - Leggi il messaggio
2. **Fix schema** - Correggi la collection/global
3. **Elimina migrazione fallita** - Rimuovi file da `src/migrations/`
4. **Ricrea migrazione**:
   ```bash
   npx payload migrate:create
   ```
5. **Riprova**:
   ```bash
   npx payload migrate
   ```

### Scenario 6: Rinominare campo

1. **NON rinominare direttamente** - Perderesti i dati
2. Aggiungi nuovo campo
3. Crea migrazione
4. Crea script per copiare dati:
   ```typescript
   // scripts/migrate-field.ts
   import { getPayload } from 'payload'
   import config from '../payload.config'

   async function migrateField() {
     const payload = await getPayload({ config })

     const items = await payload.find({
       collection: 'nome-collection',
       limit: 1000,
     })

     for (const item of items.docs) {
       await payload.update({
         collection: 'nome-collection',
         id: item.id,
         data: {
           nuovoCampo: item.vecchioCampo,
         },
       })
     }
   }

   migrateField()
   ```
5. Esegui: `npx tsx scripts/migrate-field.ts`
6. Rimuovi vecchio campo
7. Crea nuova migrazione

## Struttura migrazioni

Le migrazioni sono in: `src/migrations/`

```
src/migrations/
├── 20241222_000000_initial.ts
├── 20241222_120000_add_projects.ts
└── index.ts
```

Ogni migrazione ha:
```typescript
import { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-sqlite'

export async function up({ payload }: MigrateUpArgs): Promise<void> {
  // Modifiche al database
}

export async function down({ payload }: MigrateDownArgs): Promise<void> {
  // Rollback (opzionale)
}
```

## Database SQLite

- **File:** `payload.db` nella root
- **Client:** `@payloadcms/db-sqlite`
- **URI:** `file:./payload.db`

### Ispezionare database

```bash
# Con sqlite3 CLI
sqlite3 payload.db ".schema"

# Vedere tabelle
sqlite3 payload.db ".tables"

# Query
sqlite3 payload.db "SELECT * FROM projects LIMIT 5"
```

## Troubleshooting

### "Database is locked"
- Chiudi `pnpm dev`
- Termina processi Node
- Riprova

### "Migration already exists"
- Una migrazione con lo stesso hash esiste già
- Modifica qualcosa nello schema
- Ricrea migrazione

### "Cannot find module"
- Esegui `pnpm install`
- Verifica import in `payload.config.ts`

### Types non aggiornati
```bash
npx payload generate:types
```

## Comandi riassunto

| Comando | Descrizione |
|---------|-------------|
| `npx payload migrate:create` | Crea nuova migrazione |
| `npx payload migrate` | Applica migrazioni pendenti |
| `npx payload generate:types` | Rigenera TypeScript types |
| `npx payload migrate:status` | Stato migrazioni |
| `npx payload migrate:reset` | Reset migrazioni (⚠️ perde dati) |
