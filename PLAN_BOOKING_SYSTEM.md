# Piano Implementazione Sistema Booking Pixarts

## Panoramica
Sistema di prenotazione appuntamenti "Briefing Call Gratuito" (1 ora) integrato con Google Calendar e Resend per email transazionali.

---

## FASE 1: Setup Base e Configurazione

### 1.1 Installazione Dipendenze
```bash
npm install googleapis date-fns date-fns-tz
```
> Le altre dipendenze (resend, zod, react-hook-form, framer-motion) sono già installate.

### 1.2 File di Configurazione
- `src/lib/booking-config.ts` - Configurazione appuntamenti (orari, durata, timezone)

### 1.3 Types TypeScript
- `src/types/booking.ts` - Interfacce TimeSlot, DayAvailability, BookingFormData, etc.

---

## FASE 2: Integrazione Google Calendar

### 2.1 Setup Client Google Calendar
- `src/lib/google-calendar.ts`
  - OAuth2 client con refresh token
  - Funzioni: `getMonthAvailability()`, `getDaySlots()`, `checkSlotAvailability()`, `createBooking()`

### 2.2 Variabili Ambiente
```env
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_REFRESH_TOKEN=
GOOGLE_CALENDAR_ID=
```

---

## FASE 3: API Routes

### 3.1 Endpoint Disponibilità Mese
- `src/app/api/booking/availability/route.ts`
  - GET `?month=YYYY-MM`
  - Ritorna giorni con slots disponibili

### 3.2 Endpoint Slots Giorno
- `src/app/api/booking/slots/route.ts`
  - GET `?date=YYYY-MM-DD`
  - Ritorna slots orari per giorno specifico

### 3.3 Endpoint Creazione Prenotazione
- `src/app/api/booking/create/route.ts`
  - POST con slot + dati cliente
  - Crea evento Google Calendar
  - Invia email conferma + notifica admin
  - Rate limiting (3 req/ora per IP)

---

## FASE 4: Validazione

### 4.1 Schema Zod Booking
- `src/lib/validations/booking.ts`
  - `bookingFormSchema` - Validazione dati cliente
  - `timeSlotSchema` - Validazione slot
  - `bookingRequestSchema` - Schema completo richiesta

---

## FASE 5: Template Email

### 5.1 Email Conferma Cliente
- `src/emails/booking-confirmation-client.tsx`
  - Data/ora appuntamento
  - Link Google Meet
  - Cosa aspettarsi dalla chiamata
  - Come prepararsi

### 5.2 Email Notifica Admin
- `src/emails/booking-notification-admin.tsx`
  - Dati completi cliente
  - Link a Google Calendar
  - Quick actions (email, telefono)

### 5.3 Email Reminder 24h (Opzionale)
- `src/emails/booking-reminder-client.tsx`
  - Promemoria giorno prima

---

## FASE 6: Componenti UI Booking

### 6.1 Componenti Base
- `src/components/booking/BookingSteps.tsx` - Progress indicator (4 step)
- `src/components/booking/BookingSummary.tsx` - Riepilogo selezione

### 6.2 Calendario
- `src/components/booking/CalendarMonth.tsx` - Calendario mensile navigabile
- `src/components/booking/CalendarDay.tsx` - Singolo giorno con stato disponibilità

### 6.3 Selezione Orario
- `src/components/booking/TimeSlotGrid.tsx` - Griglia orari disponibili
- `src/components/booking/TimeSlot.tsx` - Singolo slot orario

### 6.4 Form e Conferma
- `src/components/booking/BookingForm.tsx` - Form dati cliente (react-hook-form)
- `src/components/booking/BookingConfirmation.tsx` - Schermata successo

### 6.5 Widget Principale
- `src/components/booking/BookingWidget.tsx` - Container con state machine per flow

---

## FASE 7: Custom Hooks

### 7.1 Hook Gestione Flow
- `src/lib/hooks/useBookingFlow.ts`
  - State: step corrente, giorno selezionato, slot selezionato, form data
  - Actions: nextStep, prevStep, selectDay, selectSlot, submitBooking

### 7.2 Hook Fetch Disponibilità
- `src/lib/hooks/useAvailability.ts`
  - Fetch disponibilità mese con SWR/React Query pattern
  - Cache e revalidation

---

## FASE 8: Pagina Prenotazione

### 8.1 Pagina Route
- `src/app/[locale]/prenota/page.tsx`
  - Layout responsive
  - SEO metadata
  - BookingWidget integrato

### 8.2 Traduzioni
- Aggiornare `src/messages/it.json`, `en.json`, `cs.json` con namespace `booking`

---

## FASE 9: Navigazione e CTA

### 9.1 Aggiornamenti
- Header: Aggiungere link "Prenota"
- Hero/CTA sections: Aggiornare bottoni per puntare a /prenota
- Footer: Link pagina prenotazione

---

## Struttura File Finale

```
src/
├── app/
│   ├── api/
│   │   └── booking/
│   │       ├── availability/route.ts
│   │       ├── slots/route.ts
│   │       └── create/route.ts
│   └── [locale]/
│       └── prenota/
│           └── page.tsx
├── components/
│   └── booking/
│       ├── BookingWidget.tsx
│       ├── BookingSteps.tsx
│       ├── CalendarMonth.tsx
│       ├── CalendarDay.tsx
│       ├── TimeSlotGrid.tsx
│       ├── TimeSlot.tsx
│       ├── BookingForm.tsx
│       ├── BookingConfirmation.tsx
│       ├── BookingSummary.tsx
│       └── index.ts
├── lib/
│   ├── booking-config.ts
│   ├── google-calendar.ts
│   ├── validations/
│   │   └── booking.ts
│   └── hooks/
│       ├── useBookingFlow.ts
│       └── useAvailability.ts
├── emails/
│   ├── booking-confirmation-client.tsx
│   ├── booking-notification-admin.tsx
│   └── booking-reminder-client.tsx
└── types/
    └── booking.ts
```

---

## Ordine di Implementazione

1. **Setup** - Config, types, dipendenze
2. **Backend** - Google Calendar integration + API routes
3. **Validazione** - Schema Zod
4. **Email** - Template conferma e notifica
5. **UI Components** - Dal basso verso l'alto (TimeSlot → Calendar → Widget)
6. **Hooks** - State management
7. **Pagina** - Route + traduzioni
8. **Integrazione** - Link nel sito

---

## Note Tecniche

- **Timezone**: Sempre `Europe/Rome`, usare `date-fns-tz`
- **Locale date-fns**: Importare `it` per formattazione italiana
- **Rate Limiting**: Stessa implementazione di `/api/contact`
- **Loading States**: Skeleton per calendario, spinner per slots
- **Error Handling**: Toast con retry, messaggi user-friendly
- **Responsive**: Mobile-first, calendario usabile su smartphone
- **Accessibility**: Focus states, aria-labels, keyboard navigation
