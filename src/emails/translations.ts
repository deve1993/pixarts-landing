// ============================================================================
// EMAIL TRANSLATIONS - IT/EN/CS
// ============================================================================

import { it, enUS, cs } from 'date-fns/locale'
import type { Locale } from 'date-fns'

export type EmailLocale = 'it' | 'en' | 'cs'

// Date-fns locale mapping
export const dateLocales: Record<EmailLocale, Locale> = {
  it: it,
  en: enUS,
  cs: cs,
}

// Date format patterns per locale
export const datePatterns: Record<EmailLocale, string> = {
  it: "EEEE d MMMM yyyy 'alle' HH:mm",
  en: "EEEE, MMMM d, yyyy 'at' HH:mm",
  cs: "EEEE d. MMMM yyyy 'v' HH:mm",
}

// ============================================================================
// CLIENT EMAIL TRANSLATIONS
// ============================================================================

export const clientEmailTranslations: Record<EmailLocale, {
  subject: string
  preview: (date: string) => string
  headerSubtitle: string
  greeting: (name: string) => string
  intro: string
  dateLabel: string
  durationLabel: string
  durationValue: string
  whereLabel: string
  whereValue: string
  joinButton: string
  linkNote: string
  whatToExpectTitle: string
  whatToExpect1: string
  whatToExpect2: string
  whatToExpect3: string
  howToPrepareTitle: string
  howToPrepareIntro: string
  howToPrepare1: string
  howToPrepare2: string
  howToPrepare3: string
  rescheduleNote: string
  signature: string
}> = {
  it: {
    subject: 'Prenotazione confermata - Pixarts',
    preview: (date) => `La tua chiamata con Pixarts è confermata per ${date}`,
    headerSubtitle: 'Prenotazione Confermata',
    greeting: (name) => `Ciao ${name},`,
    intro: 'Grazie per aver prenotato una chiamata con noi! Siamo entusiasti di conoscerti e discutere insieme del tuo progetto.',
    dateLabel: 'Data e Ora',
    durationLabel: 'Durata',
    durationValue: '1 ora',
    whereLabel: 'Dove',
    whereValue: 'Google Meet (link sotto)',
    joinButton: 'Partecipa alla chiamata',
    linkNote: "Il link sarà attivo 5 minuti prima dell'appuntamento",
    whatToExpectTitle: 'Cosa aspettarti dalla chiamata',
    whatToExpect1: 'Analizzeremo insieme le tue esigenze e obiettivi',
    whatToExpect2: 'Ti mostrerò esempi di lavori simili al tuo progetto',
    whatToExpect3: 'Riceverai una proposta personalizzata entro 24h',
    howToPrepareTitle: 'Come prepararti',
    howToPrepareIntro: 'Per sfruttare al meglio la nostra chiamata, ti consiglio di:',
    howToPrepare1: "Avere chiaro l'obiettivo principale del tuo sito",
    howToPrepare2: 'Pensare a 2-3 siti che ti piacciono come riferimento',
    howToPrepare3: 'Preparare eventuali domande o dubbi',
    rescheduleNote: "Hai un imprevisto? Puoi riprogrammare o cancellare la chiamata direttamente dall'invito Google Calendar che hai ricevuto, oppure rispondendo a questa email.",
    signature: 'A presto,',
  },
  en: {
    subject: 'Booking confirmed - Pixarts',
    preview: (date) => `Your call with Pixarts is confirmed for ${date}`,
    headerSubtitle: 'Booking Confirmed',
    greeting: (name) => `Hi ${name},`,
    intro: "Thank you for booking a call with us! We're excited to meet you and discuss your project together.",
    dateLabel: 'Date & Time',
    durationLabel: 'Duration',
    durationValue: '1 hour',
    whereLabel: 'Where',
    whereValue: 'Google Meet (link below)',
    joinButton: 'Join the call',
    linkNote: 'The link will be active 5 minutes before the appointment',
    whatToExpectTitle: 'What to expect from the call',
    whatToExpect1: "We'll analyze your needs and goals together",
    whatToExpect2: "I'll show you examples of work similar to your project",
    whatToExpect3: "You'll receive a personalized proposal within 24h",
    howToPrepareTitle: 'How to prepare',
    howToPrepareIntro: 'To make the most of our call, I suggest:',
    howToPrepare1: 'Having a clear main goal for your website',
    howToPrepare2: 'Thinking of 2-3 websites you like as references',
    howToPrepare3: 'Preparing any questions or concerns',
    rescheduleNote: 'Something came up? You can reschedule or cancel the call directly from the Google Calendar invite you received, or by replying to this email.',
    signature: 'See you soon,',
  },
  cs: {
    subject: 'Rezervace potvrzena - Pixarts',
    preview: (date) => `Váš hovor s Pixarts je potvrzen na ${date}`,
    headerSubtitle: 'Rezervace Potvrzena',
    greeting: (name) => `Ahoj ${name},`,
    intro: 'Děkujeme za rezervaci hovoru s námi! Těšíme se na setkání s vámi a na diskuzi o vašem projektu.',
    dateLabel: 'Datum a čas',
    durationLabel: 'Délka',
    durationValue: '1 hodina',
    whereLabel: 'Kde',
    whereValue: 'Google Meet (odkaz níže)',
    joinButton: 'Připojit se k hovoru',
    linkNote: 'Odkaz bude aktivní 5 minut před schůzkou',
    whatToExpectTitle: 'Co očekávat od hovoru',
    whatToExpect1: 'Společně probereme vaše potřeby a cíle',
    whatToExpect2: 'Ukážu vám příklady podobných projektů',
    whatToExpect3: 'Do 24 hodin obdržíte personalizovanou nabídku',
    howToPrepareTitle: 'Jak se připravit',
    howToPrepareIntro: 'Abyste z hovoru vytěžili maximum, doporučuji:',
    howToPrepare1: 'Mít jasný hlavní cíl vašeho webu',
    howToPrepare2: 'Promyslet si 2-3 weby, které se vám líbí jako reference',
    howToPrepare3: 'Připravit si případné dotazy nebo nejasnosti',
    rescheduleNote: 'Něco vám přišlo do cesty? Hovor můžete přeplánovat nebo zrušit přímo z pozvánky Google Calendar, kterou jste obdrželi, nebo odpovědí na tento email.',
    signature: 'Brzy na viděnou,',
  },
}

// ============================================================================
// ADMIN EMAIL TRANSLATIONS (sempre in italiano per l'admin)
// ============================================================================

export const adminEmailTranslations = {
  subject: (name: string, surname: string) => `Nuova prenotazione: ${name} ${surname}`,
  preview: (name: string, surname: string, date: string) => `Nuova prenotazione: ${name} ${surname} - ${date}`,
  headerSubtitle: 'Nuova Prenotazione',
  title: 'Nuova Prenotazione!',
  intro: 'Hai ricevuto una nuova richiesta di Briefing Call. Ecco i dettagli:',
  dateLabel: 'Data e Ora',
  durationLabel: 'Durata',
  durationValue: '1 ora',
  openMeet: 'Apri Google Meet',
  viewCalendar: 'Vedi su Calendar',
  clientDetailsTitle: 'Dettagli Cliente',
  nameLabel: 'Nome',
  emailLabel: 'Email',
  phoneLabel: 'Telefono',
  companyLabel: 'Azienda',
  roleLabel: 'Ruolo',
  messageTitle: 'Messaggio del Cliente',
  quickActionsTitle: 'Azioni Rapide',
  replyEmail: 'Rispondi via Email',
  contactWhatsApp: 'Contatta su WhatsApp',
  footerNote: 'Questa email è stata generata automaticamente dal sistema di prenotazione di pixarts.eu',
}
