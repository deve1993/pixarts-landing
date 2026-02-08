import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'termsConditions' })

  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
  }
}

function TermsConditionsContent() {
  const t = useTranslations('termsConditions')

  return (
    <>
      <Header />
      <main className="relative min-h-screen pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-6">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-text-primary mb-4">
              {t('title')}
            </h1>
            <p className="text-text-muted">
              {t('lastUpdate')}: 8 dicembre 2024
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-invert prose-orange max-w-none">
            {/* Section 1 - Premesse e Definizioni */}
            <section className="mb-12">
              <h2 className="text-2xl font-heading font-bold text-text-primary mb-4 border-b border-border pb-2">
                1. {t('section1.title')}
              </h2>

              <h3 className="text-xl font-semibold text-text-primary mt-6 mb-3">
                1.1 {t('section1.identification.title')}
              </h3>
              <p className="text-text-secondary mb-4">{t('section1.identification.intro')}</p>
              <div className="bg-bg-surface/50 border border-border rounded-xl p-6 mb-6">
                <p className="font-semibold text-text-primary mb-2">Fl1 s.r.o.</p>
                <p className="text-text-secondary text-sm">
                  {t('section1.identification.operatingAs')} &quot;Pixarts&quot;<br />
                  {t('section1.identification.address')}: Moskevská 1464/61, Vršovice, 101 00 Praha 10, Repubblica Ceca<br />
                  IČO: 04626664<br />
                  Email: bo2@fl1.cz<br />
                  {t('section1.identification.website')}: www.pixarts.eu
                </p>
              </div>

              <h3 className="text-xl font-semibold text-text-primary mt-6 mb-3">
                1.2 {t('section1.definitions.title')}
              </h3>
              <ul className="text-text-secondary space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-accent-orange">•</span>
                  <span><strong>{t('section1.definitions.client')}:</strong> {t('section1.definitions.clientDesc')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent-orange">•</span>
                  <span><strong>{t('section1.definitions.services')}:</strong> {t('section1.definitions.servicesDesc')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent-orange">•</span>
                  <span><strong>{t('section1.definitions.project')}:</strong> {t('section1.definitions.projectDesc')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent-orange">•</span>
                  <span><strong>{t('section1.definitions.deliverable')}:</strong> {t('section1.definitions.deliverableDesc')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent-orange">•</span>
                  <span><strong>{t('section1.definitions.briefing')}:</strong> {t('section1.definitions.briefingDesc')}</span>
                </li>
              </ul>
            </section>

            {/* Section 2 - Oggetto del Contratto */}
            <section className="mb-12">
              <h2 className="text-2xl font-heading font-bold text-text-primary mb-4 border-b border-border pb-2">
                2. {t('section2.title')}
              </h2>

              <h3 className="text-xl font-semibold text-text-primary mt-6 mb-3">
                2.1 {t('section2.offered.title')}
              </h3>
              <p className="text-text-secondary mb-4">{t('section2.offered.intro')}</p>
              <ul className="text-text-secondary space-y-2 mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-accent-orange">•</span>
                  <span><strong>Landing Page:</strong> {t('section2.offered.landing')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent-orange">•</span>
                  <span><strong>{t('section2.offered.businessSite')}:</strong> {t('section2.offered.businessDesc')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent-orange">•</span>
                  <span><strong>E-commerce e Booking:</strong> {t('section2.offered.ecommerce')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent-orange">•</span>
                  <span><strong>{t('section2.offered.maintenance')}:</strong> {t('section2.offered.maintenanceDesc')}</span>
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-text-primary mt-6 mb-3">
                2.2 {t('section2.exclusions.title')}
              </h3>
              <p className="text-text-secondary mb-4">{t('section2.exclusions.intro')}</p>
              <ul className="text-text-secondary space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-accent-orange">•</span>
                  <span>{t('section2.exclusions.copywriting')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent-orange">•</span>
                  <span>{t('section2.exclusions.photo')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent-orange">•</span>
                  <span>{t('section2.exclusions.ads')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent-orange">•</span>
                  <span>{t('section2.exclusions.domains')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent-orange">•</span>
                  <span>{t('section2.exclusions.hosting')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent-orange">•</span>
                  <span>{t('section2.exclusions.translations')}</span>
                </li>
              </ul>
            </section>

            {/* Section 3 - Processo di Lavoro */}
            <section className="mb-12">
              <h2 className="text-2xl font-heading font-bold text-text-primary mb-4 border-b border-border pb-2">
                3. {t('section3.title')}
              </h2>

              <h3 className="text-xl font-semibold text-text-primary mt-6 mb-3">
                3.1 {t('section3.phases.title')}
              </h3>
              <p className="text-text-secondary mb-4">{t('section3.phases.intro')}</p>
              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-4 p-4 bg-bg-surface/50 border border-border rounded-xl">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent-orange to-accent-amber flex items-center justify-center text-white font-bold text-sm">1</div>
                  <div>
                    <p className="font-semibold text-text-primary">Briefing ({t('section3.phases.day')} 1-2)</p>
                    <p className="text-text-secondary text-sm">{t('section3.phases.briefingDesc')}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-bg-surface/50 border border-border rounded-xl">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent-orange to-accent-amber flex items-center justify-center text-white font-bold text-sm">2</div>
                  <div>
                    <p className="font-semibold text-text-primary">Design ({t('section3.phases.day')} 3-5)</p>
                    <p className="text-text-secondary text-sm">{t('section3.phases.designDesc')}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-bg-surface/50 border border-border rounded-xl">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent-orange to-accent-amber flex items-center justify-center text-white font-bold text-sm">3</div>
                  <div>
                    <p className="font-semibold text-text-primary">{t('section3.phases.development')} ({t('section3.phases.day')} 6-8)</p>
                    <p className="text-text-secondary text-sm">{t('section3.phases.developmentDesc')}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-bg-surface/50 border border-border rounded-xl">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent-orange to-accent-amber flex items-center justify-center text-white font-bold text-sm">4</div>
                  <div>
                    <p className="font-semibold text-text-primary">{t('section3.phases.launch')} ({t('section3.phases.day')} 9-10)</p>
                    <p className="text-text-secondary text-sm">{t('section3.phases.launchDesc')}</p>
                  </div>
                </div>
              </div>
              <p className="text-text-muted text-sm italic">{t('section3.phases.note')}</p>

              <h3 className="text-xl font-semibold text-text-primary mt-6 mb-3">
                3.2 {t('section3.communication.title')}
              </h3>
              <ul className="text-text-secondary space-y-2 mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-accent-orange">•</span>
                  <span>{t('section3.communication.email')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent-orange">•</span>
                  <span>{t('section3.communication.updates')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent-orange">•</span>
                  <span>{t('section3.communication.response')}</span>
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-text-primary mt-6 mb-3">
                3.3 {t('section3.approvals.title')}
              </h3>
              <ul className="text-text-secondary space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-accent-orange">•</span>
                  <span>{t('section3.approvals.design')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent-orange">•</span>
                  <span>{t('section3.approvals.changes')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent-orange">•</span>
                  <span>{t('section3.approvals.tacit')}</span>
                </li>
              </ul>
            </section>

            {/* Section 4 - Obblighi del Cliente */}
            <section className="mb-12">
              <h2 className="text-2xl font-heading font-bold text-text-primary mb-4 border-b border-border pb-2">
                4. {t('section4.title')}
              </h2>

              <h3 className="text-xl font-semibold text-text-primary mt-6 mb-3">
                4.1 {t('section4.materials.title')}
              </h3>
              <p className="text-text-secondary mb-4">{t('section4.materials.intro')}</p>
              <ul className="text-text-secondary space-y-2 mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-accent-orange">•</span>
                  <span>{t('section4.materials.logo')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent-orange">•</span>
                  <span>{t('section4.materials.texts')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent-orange">•</span>
                  <span>{t('section4.materials.images')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent-orange">•</span>
                  <span>{t('section4.materials.credentials')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent-orange">•</span>
                  <span>{t('section4.materials.feedback')}</span>
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-text-primary mt-6 mb-3">
                4.2 {t('section4.responsibility.title')}
              </h3>
              <p className="text-text-secondary mb-4">{t('section4.responsibility.intro')}</p>
              <ul className="text-text-secondary space-y-2 mb-4">
                <li className="flex items-start gap-2">
                  <span className="text-accent-orange">•</span>
                  <span>{t('section4.responsibility.rights')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent-orange">•</span>
                  <span>{t('section4.responsibility.truthful')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent-orange">•</span>
                  <span>{t('section4.responsibility.usage')}</span>
                </li>
              </ul>
              <p className="text-text-secondary">{t('section4.responsibility.disclaimer')}</p>

              <h3 className="text-xl font-semibold text-text-primary mt-6 mb-3">
                4.3 {t('section4.collaboration.title')}
              </h3>
              <p className="text-text-secondary mb-4">{t('section4.collaboration.intro')}</p>
              <ul className="text-text-secondary space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-accent-orange">•</span>
                  <span>{t('section4.collaboration.referent')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent-orange">•</span>
                  <span>{t('section4.collaboration.participate')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent-orange">•</span>
                  <span>{t('section4.collaboration.respond')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent-orange">•</span>
                  <span>{t('section4.collaboration.communicate')}</span>
                </li>
              </ul>
            </section>

            {/* Section 5 - Prezzi e Pagamenti */}
            <section className="mb-12">
              <h2 className="text-2xl font-heading font-bold text-text-primary mb-4 border-b border-border pb-2">
                5. {t('section5.title')}
              </h2>

              <h3 className="text-xl font-semibold text-text-primary mt-6 mb-3">
                5.1 {t('section5.priceList.title')}
              </h3>
              <div className="overflow-x-auto mb-6">
                <table className="w-full text-sm border border-border rounded-xl overflow-hidden">
                  <thead className="bg-bg-surface">
                    <tr>
                      <th className="px-4 py-3 text-left text-text-primary font-semibold border-b border-border">{t('section5.priceList.service')}</th>
                      <th className="px-4 py-3 text-left text-text-primary font-semibold border-b border-border">{t('section5.priceList.price')}</th>
                      <th className="px-4 py-3 text-left text-text-primary font-semibold border-b border-border">{t('section5.priceList.delivery')}</th>
                    </tr>
                  </thead>
                  <tbody className="text-text-secondary">
                    <tr className="border-b border-border/50">
                      <td className="px-4 py-3">Landing Page</td>
                      <td className="px-4 py-3">€1.200 - €1.500</td>
                      <td className="px-4 py-3">7 {t('section5.priceList.days')}</td>
                    </tr>
                    <tr className="border-b border-border/50 bg-bg-surface/30">
                      <td className="px-4 py-3">{t('section5.priceList.businessSite')}</td>
                      <td className="px-4 py-3">€2.500 - €3.500</td>
                      <td className="px-4 py-3">10 {t('section5.priceList.days')}</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="px-4 py-3">E-commerce / Booking</td>
                      <td className="px-4 py-3">€4.500 - €6.000</td>
                      <td className="px-4 py-3">14 {t('section5.priceList.days')}</td>
                    </tr>
                    <tr className="bg-bg-surface/30">
                      <td className="px-4 py-3">{t('section5.priceList.monthlyMaintenance')}</td>
                      <td className="px-4 py-3">€200 - €400/{t('section5.priceList.month')}</td>
                      <td className="px-4 py-3">{t('section5.priceList.continuous')}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-text-muted text-sm italic mb-6">{t('section5.priceList.note')}</p>

              <h3 className="text-xl font-semibold text-text-primary mt-6 mb-3">
                5.2 {t('section5.paymentTerms.title')}
              </h3>
              <p className="text-text-secondary mb-4">{t('section5.paymentTerms.intro')}</p>
              <ul className="text-text-secondary space-y-2 mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-accent-orange">•</span>
                  <span><strong>50% {t('section5.paymentTerms.atOrder')}:</strong> {t('section5.paymentTerms.atOrderDesc')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent-orange">•</span>
                  <span><strong>50% {t('section5.paymentTerms.atDelivery')}:</strong> {t('section5.paymentTerms.atDeliveryDesc')}</span>
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-text-primary mt-6 mb-3">
                5.3 {t('section5.paymentMethods.title')}
              </h3>
              <ul className="text-text-secondary space-y-2 mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-accent-orange">•</span>
                  <span>{t('section5.paymentMethods.bankTransfer')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent-orange">•</span>
                  <span>{t('section5.paymentMethods.card')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent-orange">•</span>
                  <span>Stripe ({t('section5.paymentMethods.secure')})</span>
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-text-primary mt-6 mb-3">
                5.4 {t('section5.invoicing.title')}
              </h3>
              <ul className="text-text-secondary space-y-2 mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-accent-orange">•</span>
                  <span>{t('section5.invoicing.regular')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent-orange">•</span>
                  <span>{t('section5.invoicing.electronic')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent-orange">•</span>
                  <span>{t('section5.invoicing.vat')}</span>
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-text-primary mt-6 mb-3">
                5.5 {t('section5.latePayment.title')}
              </h3>
              <p className="text-text-secondary mb-4">{t('section5.latePayment.intro')}</p>
              <ul className="text-text-secondary space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-accent-orange">•</span>
                  <span>{t('section5.latePayment.suspend')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent-orange">•</span>
                  <span>{t('section5.latePayment.interest')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent-orange">•</span>
                  <span>{t('section5.latePayment.noPublish')}</span>
                </li>
              </ul>
            </section>

            {/* Section 6 - Garanzie Pixarts */}
            <section className="mb-12">
              <h2 className="text-2xl font-heading font-bold text-text-primary mb-4 border-b border-border pb-2">
                6. {t('section6.title')}
              </h2>

              <h3 className="text-xl font-semibold text-text-primary mt-6 mb-3">
                6.1 {t('section6.delivery.title')}
              </h3>
              <p className="text-text-secondary mb-4">{t('section6.delivery.intro')}</p>
              <div className="bg-bg-surface/50 border border-accent-orange/30 rounded-xl p-4 mb-4">
                <p className="text-text-secondary">
                  <strong className="text-accent-orange">{t('section6.delivery.discount')}</strong> {t('section6.delivery.discountDesc')}
                </p>
              </div>
              <ul className="text-text-secondary space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-accent-orange">•</span>
                  <span>{t('section6.delivery.maxDiscount')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent-orange">•</span>
                  <span>{t('section6.delivery.notApplicable')}</span>
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-text-primary mt-6 mb-3">
                6.2 {t('section6.satisfaction.title')}
              </h3>
              <p className="text-text-secondary mb-4">{t('section6.satisfaction.intro')}</p>
              <div className="bg-bg-surface/50 border border-success/30 rounded-xl p-4 mb-4">
                <p className="text-text-secondary">
                  <strong className="text-success">{t('section6.satisfaction.refund')}</strong> {t('section6.satisfaction.refundDesc')}
                </p>
              </div>
              <ul className="text-text-secondary space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-accent-orange">•</span>
                  <span>{t('section6.satisfaction.applicable')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent-orange">•</span>
                  <span>{t('section6.satisfaction.written')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent-orange">•</span>
                  <span>{t('section6.satisfaction.notAfter')}</span>
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-text-primary mt-6 mb-3">
                6.3 {t('section6.revisions.title')}
              </h3>
              <p className="text-text-secondary mb-4">{t('section6.revisions.intro')}</p>
              <ul className="text-text-secondary space-y-2 mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-accent-orange">•</span>
                  <span><strong>{t('section6.revisions.unlimited')}</strong> {t('section6.revisions.unlimitedDesc')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent-orange">•</span>
                  <span><strong>{t('section6.revisions.twoRounds')}</strong> {t('section6.revisions.twoRoundsDesc')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent-orange">•</span>
                  <span><strong>{t('section6.revisions.support')}</strong> {t('section6.revisions.supportDesc')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent-orange">•</span>
                  <span>{t('section6.revisions.bugs')}</span>
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-text-primary mt-6 mb-3">
                6.4 {t('section6.exclusions.title')}
              </h3>
              <p className="text-text-secondary mb-4">{t('section6.exclusions.intro')}</p>
              <ul className="text-text-secondary space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-accent-orange">•</span>
                  <span>{t('section6.exclusions.clientDelay')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent-orange">•</span>
                  <span>{t('section6.exclusions.majorChanges')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent-orange">•</span>
                  <span>{t('section6.exclusions.thirdParty')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent-orange">•</span>
                  <span>{t('section6.exclusions.unauthorized')}</span>
                </li>
              </ul>
            </section>

            {/* Section 7 - Proprietà Intellettuale */}
            <section className="mb-12">
              <h2 className="text-2xl font-heading font-bold text-text-primary mb-4 border-b border-border pb-2">
                7. {t('section7.title')}
              </h2>

              <h3 className="text-xl font-semibold text-text-primary mt-6 mb-3">
                7.1 {t('section7.clientMaterials.title')}
              </h3>
              <p className="text-text-secondary mb-4">{t('section7.clientMaterials.intro')}</p>
              <ul className="text-text-secondary space-y-2 mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-accent-orange">•</span>
                  <span>{t('section7.clientMaterials.logo')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent-orange">•</span>
                  <span>{t('section7.clientMaterials.content')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent-orange">•</span>
                  <span>{t('section7.clientMaterials.data')}</span>
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-text-primary mt-6 mb-3">
                7.2 {t('section7.deliverables.title')}
              </h3>
              <p className="text-text-secondary mb-4">{t('section7.deliverables.intro')}</p>
              <ul className="text-text-secondary space-y-2 mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-accent-orange">•</span>
                  <span>{t('section7.deliverables.code')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent-orange">•</span>
                  <span>{t('section7.deliverables.design')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent-orange">•</span>
                  <span>{t('section7.deliverables.licenses')}</span>
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-text-primary mt-6 mb-3">
                7.3 {t('section7.portfolio.title')}
              </h3>
              <p className="text-text-secondary mb-4">{t('section7.portfolio.intro')}</p>
              <ul className="text-text-secondary space-y-2 mb-4">
                <li className="flex items-start gap-2">
                  <span className="text-accent-orange">•</span>
                  <span>{t('section7.portfolio.include')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent-orange">•</span>
                  <span>{t('section7.portfolio.cite')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent-orange">•</span>
                  <span>{t('section7.portfolio.screenshots')}</span>
                </li>
              </ul>
              <p className="text-text-secondary">{t('section7.portfolio.removal')}</p>

              <h3 className="text-xl font-semibold text-text-primary mt-6 mb-3">
                7.4 {t('section7.tools.title')}
              </h3>
              <p className="text-text-secondary mb-4">{t('section7.tools.intro')}</p>
              <ul className="text-text-secondary space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-accent-orange">•</span>
                  <span>{t('section7.tools.methodologies')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent-orange">•</span>
                  <span>{t('section7.tools.libraries')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent-orange">•</span>
                  <span>{t('section7.tools.knowhow')}</span>
                </li>
              </ul>
            </section>

            {/* Section 8 - Responsabilità e Limitazioni */}
            <section className="mb-12">
              <h2 className="text-2xl font-heading font-bold text-text-primary mb-4 border-b border-border pb-2">
                8. {t('section8.title')}
              </h2>

              <h3 className="text-xl font-semibold text-text-primary mt-6 mb-3">
                8.1 {t('section8.pixartsResp.title')}
              </h3>
              <p className="text-text-secondary mb-4">{t('section8.pixartsResp.intro')}</p>
              <ul className="text-text-secondary space-y-2 mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-accent-orange">•</span>
                  <span>{t('section8.pixartsResp.professional')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent-orange">•</span>
                  <span>{t('section8.pixartsResp.timing')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent-orange">•</span>
                  <span>{t('section8.pixartsResp.defects')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent-orange">•</span>
                  <span>{t('section8.pixartsResp.specs')}</span>
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-text-primary mt-6 mb-3">
                8.2 {t('section8.limitation.title')}
              </h3>
              <p className="text-text-secondary mb-4">{t('section8.limitation.intro')}</p>
              <ul className="text-text-secondary space-y-2 mb-4">
                <li className="flex items-start gap-2">
                  <span className="text-accent-orange">•</span>
                  <span>{t('section8.limitation.indirect')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent-orange">•</span>
                  <span>{t('section8.limitation.profits')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent-orange">•</span>
                  <span>{t('section8.limitation.thirdParty')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent-orange">•</span>
                  <span>{t('section8.limitation.misuse')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent-orange">•</span>
                  <span>{t('section8.limitation.results')}</span>
                </li>
              </ul>
              <p className="text-text-secondary">{t('section8.limitation.maxLiability')}</p>

              <h3 className="text-xl font-semibold text-text-primary mt-6 mb-3">
                8.3 {t('section8.forceMajeure.title')}
              </h3>
              <p className="text-text-secondary">{t('section8.forceMajeure.desc')}</p>
            </section>

            {/* Section 9 - Riservatezza */}
            <section className="mb-12">
              <h2 className="text-2xl font-heading font-bold text-text-primary mb-4 border-b border-border pb-2">
                9. {t('section9.title')}
              </h2>

              <h3 className="text-xl font-semibold text-text-primary mt-6 mb-3">
                9.1 {t('section9.confidential.title')}
              </h3>
              <p className="text-text-secondary mb-4">{t('section9.confidential.intro')}</p>
              <ul className="text-text-secondary space-y-2 mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-accent-orange">•</span>
                  <span>{t('section9.confidential.commercial')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent-orange">•</span>
                  <span>{t('section9.confidential.technical')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent-orange">•</span>
                  <span>{t('section9.confidential.economic')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent-orange">•</span>
                  <span>{t('section9.confidential.marked')}</span>
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-text-primary mt-6 mb-3">
                9.2 {t('section9.duration.title')}
              </h3>
              <p className="text-text-secondary mb-6">{t('section9.duration.desc')}</p>

              <h3 className="text-xl font-semibold text-text-primary mt-6 mb-3">
                9.3 {t('section9.exceptions.title')}
              </h3>
              <p className="text-text-secondary mb-4">{t('section9.exceptions.intro')}</p>
              <ul className="text-text-secondary space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-accent-orange">•</span>
                  <span>{t('section9.exceptions.public')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent-orange">•</span>
                  <span>{t('section9.exceptions.thirdParty')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent-orange">•</span>
                  <span>{t('section9.exceptions.authorities')}</span>
                </li>
              </ul>
            </section>

            {/* Section 10 - Risoluzione e Recesso */}
            <section className="mb-12">
              <h2 className="text-2xl font-heading font-bold text-text-primary mb-4 border-b border-border pb-2">
                10. {t('section10.title')}
              </h2>

              <h3 className="text-xl font-semibold text-text-primary mt-6 mb-3">
                10.1 {t('section10.clientWithdrawal.title')}
              </h3>
              <p className="text-text-secondary mb-4">{t('section10.clientWithdrawal.intro')}</p>
              <div className="overflow-x-auto mb-6">
                <table className="w-full text-sm border border-border rounded-xl overflow-hidden">
                  <thead className="bg-bg-surface">
                    <tr>
                      <th className="px-4 py-3 text-left text-text-primary font-semibold border-b border-border">{t('section10.clientWithdrawal.moment')}</th>
                      <th className="px-4 py-3 text-left text-text-primary font-semibold border-b border-border">{t('section10.clientWithdrawal.consequences')}</th>
                    </tr>
                  </thead>
                  <tbody className="text-text-secondary">
                    <tr className="border-b border-border/50">
                      <td className="px-4 py-3">{t('section10.clientWithdrawal.beforeStart')}</td>
                      <td className="px-4 py-3">{t('section10.clientWithdrawal.refund100')}</td>
                    </tr>
                    <tr className="border-b border-border/50 bg-bg-surface/30">
                      <td className="px-4 py-3">{t('section10.clientWithdrawal.duringBriefing')}</td>
                      <td className="px-4 py-3">{t('section10.clientWithdrawal.refund80')}</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="px-4 py-3">{t('section10.clientWithdrawal.duringDesign')}</td>
                      <td className="px-4 py-3">{t('section10.clientWithdrawal.refund50')}</td>
                    </tr>
                    <tr className="bg-bg-surface/30">
                      <td className="px-4 py-3">{t('section10.clientWithdrawal.afterApproval')}</td>
                      <td className="px-4 py-3">{t('section10.clientWithdrawal.noRefund')}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className="text-xl font-semibold text-text-primary mt-6 mb-3">
                10.2 {t('section10.pixartsWithdrawal.title')}
              </h3>
              <p className="text-text-secondary mb-4">{t('section10.pixartsWithdrawal.intro')}</p>
              <ul className="text-text-secondary space-y-2 mb-4">
                <li className="flex items-start gap-2">
                  <span className="text-accent-orange">•</span>
                  <span>{t('section10.pixartsWithdrawal.nonPayment')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent-orange">•</span>
                  <span>{t('section10.pixartsWithdrawal.nonCollaborative')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent-orange">•</span>
                  <span>{t('section10.pixartsWithdrawal.illegal')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent-orange">•</span>
                  <span>{t('section10.pixartsWithdrawal.impossibility')}</span>
                </li>
              </ul>
              <p className="text-text-secondary">{t('section10.pixartsWithdrawal.noRefund')}</p>

              <h3 className="text-xl font-semibold text-text-primary mt-6 mb-3">
                10.3 {t('section10.termination.title')}
              </h3>
              <p className="text-text-secondary">{t('section10.termination.desc')}</p>
            </section>

            {/* Section 11 - Disposizioni Finali */}
            <section className="mb-12">
              <h2 className="text-2xl font-heading font-bold text-text-primary mb-4 border-b border-border pb-2">
                11. {t('section11.title')}
              </h2>

              <h3 className="text-xl font-semibold text-text-primary mt-6 mb-3">
                11.1 {t('section11.applicableLaw.title')}
              </h3>
              <p className="text-text-secondary mb-6">{t('section11.applicableLaw.desc')}</p>

              <h3 className="text-xl font-semibold text-text-primary mt-6 mb-3">
                11.2 {t('section11.jurisdiction.title')}
              </h3>
              <p className="text-text-secondary mb-4">{t('section11.jurisdiction.desc')}</p>
              <p className="text-text-secondary mb-6">{t('section11.jurisdiction.amicable')}</p>

              <h3 className="text-xl font-semibold text-text-primary mt-6 mb-3">
                11.3 {t('section11.severability.title')}
              </h3>
              <p className="text-text-secondary mb-6">{t('section11.severability.desc')}</p>

              <h3 className="text-xl font-semibold text-text-primary mt-6 mb-3">
                11.4 {t('section11.modifications.title')}
              </h3>
              <p className="text-text-secondary mb-4">{t('section11.modifications.desc')}</p>
              <p className="text-text-secondary mb-6">{t('section11.modifications.existing')}</p>

              <h3 className="text-xl font-semibold text-text-primary mt-6 mb-3">
                11.5 {t('section11.communications.title')}
              </h3>
              <p className="text-text-secondary mb-4">{t('section11.communications.desc')}</p>
              <div className="bg-bg-surface/50 border border-border rounded-xl p-6 mb-6">
                <p className="font-semibold text-text-primary mb-2">Pixarts (Fl1 s.r.o.)</p>
                <p className="text-text-secondary text-sm">
                  Email: bo2@fl1.cz<br />
                  {t('section1.identification.address')}: Moskevská 1464/61, Vršovice, 101 00 Praha 10, Repubblica Ceca
                </p>
              </div>

              <h3 className="text-xl font-semibold text-text-primary mt-6 mb-3">
                11.6 {t('section11.entireAgreement.title')}
              </h3>
              <p className="text-text-secondary">{t('section11.entireAgreement.desc')}</p>
            </section>

            {/* Section 12 - Accettazione */}
            <section className="mb-12">
              <h2 className="text-2xl font-heading font-bold text-text-primary mb-4 border-b border-border pb-2">
                12. {t('section12.title')}
              </h2>
              <p className="text-text-secondary mb-4">{t('section12.intro')}</p>
              <p className="text-text-secondary mb-4">{t('section12.acceptance')}</p>
              <ul className="text-text-secondary space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-accent-orange">•</span>
                  <span>{t('section12.methods.signature')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent-orange">•</span>
                  <span>{t('section12.methods.payment')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent-orange">•</span>
                  <span>{t('section12.methods.email')}</span>
                </li>
              </ul>
            </section>

            {/* Footer note */}
            <div className="border-t border-border pt-6 mt-12">
              <p className="text-text-muted text-sm italic">
                {t('footer')}
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default function TermsConditionsPage() {
  return <TermsConditionsContent />
}
