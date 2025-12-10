import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'privacyPolicy' })

  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
  }
}

function PrivacyPolicyContent() {
  const t = useTranslations('privacyPolicy')

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
          {/* Section 1 */}
          <section className="mb-12">
            <h2 className="text-2xl font-heading font-bold text-text-primary mb-4 border-b border-border pb-2">
              1. {t('section1.title')}
            </h2>
            <p className="text-text-secondary mb-4">{t('section1.intro')}</p>
            <div className="bg-bg-surface/50 border border-border rounded-xl p-6">
              <p className="font-semibold text-text-primary mb-2">Fl1 s.r.o.</p>
              <p className="text-text-secondary text-sm">
                {t('section1.operatingAs')} &quot;Pixarts&quot;<br />
                {t('section1.address')}: Moskevská 1464/61, Vršovice, 101 00 Praha 10, Repubblica Ceca<br />
                IČO (Partita IVA ceca): 04626664<br />
                Email: bo2@fl1.cz
              </p>
            </div>
          </section>

          {/* Section 2 */}
          <section className="mb-12">
            <h2 className="text-2xl font-heading font-bold text-text-primary mb-4 border-b border-border pb-2">
              2. {t('section2.title')}
            </h2>

            <h3 className="text-xl font-semibold text-text-primary mt-6 mb-3">
              2.1 {t('section2.voluntary.title')}
            </h3>
            <p className="text-text-secondary mb-3">{t('section2.voluntary.intro')}</p>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-bg-surface/50 border border-border rounded-xl p-4">
                <h4 className="font-semibold text-accent-orange mb-2">{t('section2.voluntary.required')}</h4>
                <ul className="text-text-secondary text-sm space-y-1">
                  <li>• {t('section2.voluntary.name')}</li>
                  <li>• {t('section2.voluntary.email')}</li>
                  <li>• {t('section2.voluntary.phone')}</li>
                </ul>
              </div>
              <div className="bg-bg-surface/50 border border-border rounded-xl p-4">
                <h4 className="font-semibold text-text-muted mb-2">{t('section2.voluntary.optional')}</h4>
                <ul className="text-text-secondary text-sm space-y-1">
                  <li>• {t('section2.voluntary.projectDesc')}</li>
                  <li>• {t('section2.voluntary.budget')}</li>
                  <li>• {t('section2.voluntary.timeline')}</li>
                </ul>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-text-primary mt-6 mb-3">
              2.2 {t('section2.automatic.title')}
            </h3>
            <p className="text-text-secondary mb-3">{t('section2.automatic.intro')}</p>
            <ul className="text-text-secondary space-y-1 mb-6">
              <li>• {t('section2.automatic.ip')}</li>
              <li>• {t('section2.automatic.browser')}</li>
              <li>• {t('section2.automatic.os')}</li>
              <li>• {t('section2.automatic.pages')}</li>
              <li>• {t('section2.automatic.referrer')}</li>
              <li>• {t('section2.automatic.interaction')}</li>
            </ul>

            <h3 className="text-xl font-semibold text-text-primary mt-6 mb-3">
              2.3 {t('section2.cookies.title')}
            </h3>
            <p className="text-text-secondary">
              {t('section2.cookies.intro')}{' '}
              <Link href="/cookie-policy" className="text-accent-orange hover:underline">
                Cookie Policy
              </Link>.
            </p>
          </section>

          {/* Section 3 */}
          <section className="mb-12">
            <h2 className="text-2xl font-heading font-bold text-text-primary mb-4 border-b border-border pb-2">
              3. {t('section3.title')}
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-border rounded-xl overflow-hidden">
                <thead className="bg-bg-surface">
                  <tr>
                    <th className="px-4 py-3 text-left text-text-primary font-semibold border-b border-border">{t('section3.table.purpose')}</th>
                    <th className="px-4 py-3 text-left text-text-primary font-semibold border-b border-border">{t('section3.table.legalBasis')}</th>
                    <th className="px-4 py-3 text-left text-text-primary font-semibold border-b border-border">{t('section3.table.data')}</th>
                  </tr>
                </thead>
                <tbody className="text-text-secondary">
                  <tr className="border-b border-border/50">
                    <td className="px-4 py-3">{t('section3.purposes.contact')}</td>
                    <td className="px-4 py-3">Art. 6.1.b GDPR</td>
                    <td className="px-4 py-3">{t('section3.data.contact')}</td>
                  </tr>
                  <tr className="border-b border-border/50 bg-bg-surface/30">
                    <td className="px-4 py-3">{t('section3.purposes.services')}</td>
                    <td className="px-4 py-3">Art. 6.1.b GDPR</td>
                    <td className="px-4 py-3">{t('section3.data.identification')}</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="px-4 py-3">{t('section3.purposes.invoicing')}</td>
                    <td className="px-4 py-3">Art. 6.1.c GDPR</td>
                    <td className="px-4 py-3">{t('section3.data.billing')}</td>
                  </tr>
                  <tr className="border-b border-border/50 bg-bg-surface/30">
                    <td className="px-4 py-3">{t('section3.purposes.analytics')}</td>
                    <td className="px-4 py-3">Art. 6.1.f GDPR</td>
                    <td className="px-4 py-3">{t('section3.data.navigation')}</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="px-4 py-3">{t('section3.purposes.marketing')}</td>
                    <td className="px-4 py-3">Art. 6.1.a GDPR</td>
                    <td className="px-4 py-3">Email</td>
                  </tr>
                  <tr className="bg-bg-surface/30">
                    <td className="px-4 py-3">{t('section3.purposes.profiling')}</td>
                    <td className="px-4 py-3">Art. 6.1.a GDPR</td>
                    <td className="px-4 py-3">{t('section3.data.profiling')}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 4 */}
          <section className="mb-12">
            <h2 className="text-2xl font-heading font-bold text-text-primary mb-4 border-b border-border pb-2">
              4. {t('section4.title')}
            </h2>
            <p className="text-text-secondary mb-4">{t('section4.intro')}</p>

            <h3 className="text-xl font-semibold text-text-primary mt-6 mb-3">
              {t('section4.security.title')}
            </h3>
            <ul className="text-text-secondary space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-accent-orange">✓</span>
                {t('section4.security.ssl')}
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent-orange">✓</span>
                {t('section4.security.access')}
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent-orange">✓</span>
                {t('section4.security.backup')}
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent-orange">✓</span>
                {t('section4.security.servers')}
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent-orange">✓</span>
                {t('section4.security.incidents')}
              </li>
            </ul>
          </section>

          {/* Section 5 */}
          <section className="mb-12">
            <h2 className="text-2xl font-heading font-bold text-text-primary mb-4 border-b border-border pb-2">
              5. {t('section5.title')}
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-border rounded-xl overflow-hidden">
                <thead className="bg-bg-surface">
                  <tr>
                    <th className="px-4 py-3 text-left text-text-primary font-semibold border-b border-border">{t('section5.table.dataType')}</th>
                    <th className="px-4 py-3 text-left text-text-primary font-semibold border-b border-border">{t('section5.table.retention')}</th>
                  </tr>
                </thead>
                <tbody className="text-text-secondary">
                  <tr className="border-b border-border/50">
                    <td className="px-4 py-3">{t('section5.types.leads')}</td>
                    <td className="px-4 py-3">{t('section5.periods.leads')}</td>
                  </tr>
                  <tr className="border-b border-border/50 bg-bg-surface/30">
                    <td className="px-4 py-3">{t('section5.types.contract')}</td>
                    <td className="px-4 py-3">{t('section5.periods.contract')}</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="px-4 py-3">{t('section5.types.navigation')}</td>
                    <td className="px-4 py-3">{t('section5.periods.navigation')}</td>
                  </tr>
                  <tr className="border-b border-border/50 bg-bg-surface/30">
                    <td className="px-4 py-3">{t('section5.types.marketing')}</td>
                    <td className="px-4 py-3">{t('section5.periods.marketing')}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">{t('section5.types.cookies')}</td>
                    <td className="px-4 py-3">{t('section5.periods.cookies')}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 6 */}
          <section className="mb-12">
            <h2 className="text-2xl font-heading font-bold text-text-primary mb-4 border-b border-border pb-2">
              6. {t('section6.title')}
            </h2>

            <h3 className="text-xl font-semibold text-text-primary mt-6 mb-3">
              6.1 {t('section6.providers.title')}
            </h3>
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border border-border rounded-xl overflow-hidden">
                <thead className="bg-bg-surface">
                  <tr>
                    <th className="px-4 py-3 text-left text-text-primary font-semibold border-b border-border">{t('section6.providers.provider')}</th>
                    <th className="px-4 py-3 text-left text-text-primary font-semibold border-b border-border">{t('section6.providers.service')}</th>
                  </tr>
                </thead>
                <tbody className="text-text-secondary">
                  <tr className="border-b border-border/50">
                    <td className="px-4 py-3">Google Ireland Limited</td>
                    <td className="px-4 py-3">Google Analytics 4</td>
                  </tr>
                  <tr className="border-b border-border/50 bg-bg-surface/30">
                    <td className="px-4 py-3">Stripe, Inc.</td>
                    <td className="px-4 py-3">{t('section6.providers.payments')}</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="px-4 py-3">Meta Platforms Ireland Ltd</td>
                    <td className="px-4 py-3">Facebook Pixel</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">Google LLC</td>
                    <td className="px-4 py-3">Google Ads</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-xl font-semibold text-text-primary mt-6 mb-3">
              6.2 {t('section6.thirdParty.title')}
            </h3>
            <p className="text-text-secondary mb-2">{t('section6.thirdParty.intro')}</p>
            <ul className="text-text-secondary space-y-1 mb-6">
              <li>• YouTube ({t('section6.thirdParty.videos')})</li>
              <li>• Google Maps ({t('section6.thirdParty.maps')})</li>
              <li>• Social network (widget)</li>
            </ul>

            <h3 className="text-xl font-semibold text-text-primary mt-6 mb-3">
              6.3 {t('section6.others.title')}
            </h3>
            <ul className="text-text-secondary space-y-1">
              <li>• {t('section6.others.authorities')}</li>
              <li>• {t('section6.others.consultants')}</li>
            </ul>
          </section>

          {/* Section 7 */}
          <section className="mb-12">
            <h2 className="text-2xl font-heading font-bold text-text-primary mb-4 border-b border-border pb-2">
              7. {t('section7.title')}
            </h2>
            <p className="text-text-secondary mb-4">{t('section7.intro')}</p>
            <p className="text-text-secondary mb-2">{t('section7.basedOn')}</p>
            <ul className="text-text-secondary space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-accent-orange">•</span>
                <span><strong>{t('section7.adequacy.title')}</strong> - {t('section7.adequacy.desc')}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent-orange">•</span>
                <span><strong>{t('section7.scc.title')}</strong> - {t('section7.scc.desc')}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent-orange">•</span>
                <span><strong>{t('section7.measures.title')}</strong> - {t('section7.measures.desc')}</span>
              </li>
            </ul>
          </section>

          {/* Section 8 */}
          <section className="mb-12">
            <h2 className="text-2xl font-heading font-bold text-text-primary mb-4 border-b border-border pb-2">
              8. {t('section8.title')}
            </h2>
            <p className="text-text-secondary mb-4">{t('section8.intro')}</p>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-bg-surface/50 border border-border rounded-xl p-4">
                <h4 className="font-semibold text-accent-orange mb-1">{t('section8.rights.access')}</h4>
                <p className="text-text-secondary text-sm">{t('section8.rights.accessDesc')}</p>
              </div>
              <div className="bg-bg-surface/50 border border-border rounded-xl p-4">
                <h4 className="font-semibold text-accent-orange mb-1">{t('section8.rights.rectification')}</h4>
                <p className="text-text-secondary text-sm">{t('section8.rights.rectificationDesc')}</p>
              </div>
              <div className="bg-bg-surface/50 border border-border rounded-xl p-4">
                <h4 className="font-semibold text-accent-orange mb-1">{t('section8.rights.erasure')}</h4>
                <p className="text-text-secondary text-sm">{t('section8.rights.erasureDesc')}</p>
              </div>
              <div className="bg-bg-surface/50 border border-border rounded-xl p-4">
                <h4 className="font-semibold text-accent-orange mb-1">{t('section8.rights.restriction')}</h4>
                <p className="text-text-secondary text-sm">{t('section8.rights.restrictionDesc')}</p>
              </div>
              <div className="bg-bg-surface/50 border border-border rounded-xl p-4">
                <h4 className="font-semibold text-accent-orange mb-1">{t('section8.rights.portability')}</h4>
                <p className="text-text-secondary text-sm">{t('section8.rights.portabilityDesc')}</p>
              </div>
              <div className="bg-bg-surface/50 border border-border rounded-xl p-4">
                <h4 className="font-semibold text-accent-orange mb-1">{t('section8.rights.objection')}</h4>
                <p className="text-text-secondary text-sm">{t('section8.rights.objectionDesc')}</p>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-text-primary mt-6 mb-3">
              {t('section8.howTo.title')}
            </h3>
            <p className="text-text-secondary mb-4">{t('section8.howTo.intro')}</p>
            <div className="bg-bg-surface/50 border border-border rounded-xl p-4 mb-4">
              <p className="text-text-secondary">
                <strong>Email:</strong> bo2@fl1.cz
              </p>
            </div>
            <p className="text-text-secondary">{t('section8.howTo.response')}</p>

            <h3 className="text-xl font-semibold text-text-primary mt-6 mb-3">
              {t('section8.complaint.title')}
            </h3>
            <p className="text-text-secondary mb-4">{t('section8.complaint.intro')}</p>
            <div className="space-y-3">
              <div className="bg-bg-surface/50 border border-border rounded-xl p-4">
                <p className="font-semibold text-text-primary">{t('section8.complaint.italy')}</p>
                <p className="text-text-secondary text-sm">Garante per la Protezione dei Dati Personali - www.garanteprivacy.it</p>
              </div>
              <div className="bg-bg-surface/50 border border-border rounded-xl p-4">
                <p className="font-semibold text-text-primary">{t('section8.complaint.czech')}</p>
                <p className="text-text-secondary text-sm">Úřad pro ochranu osobních údajů (ÚOOÚ) - www.uoou.cz</p>
              </div>
            </div>
          </section>

          {/* Section 9 */}
          <section className="mb-12">
            <h2 className="text-2xl font-heading font-bold text-text-primary mb-4 border-b border-border pb-2">
              9. {t('section9.title')}
            </h2>
            <p className="text-text-secondary mb-4">{t('section9.content')}</p>
          </section>

          {/* Section 10 */}
          <section className="mb-12">
            <h2 className="text-2xl font-heading font-bold text-text-primary mb-4 border-b border-border pb-2">
              10. {t('section10.title')}
            </h2>
            <p className="text-text-secondary">{t('section10.content')}</p>
          </section>

          {/* Section 11 */}
          <section className="mb-12">
            <h2 className="text-2xl font-heading font-bold text-text-primary mb-4 border-b border-border pb-2">
              11. {t('section11.title')}
            </h2>
            <p className="text-text-secondary">{t('section11.content')}</p>
          </section>

          {/* Section 12 */}
          <section className="mb-12">
            <h2 className="text-2xl font-heading font-bold text-text-primary mb-4 border-b border-border pb-2">
              12. {t('section12.title')}
            </h2>
            <p className="text-text-secondary">{t('section12.content')}</p>
          </section>

          {/* Section 13 */}
          <section className="mb-12">
            <h2 className="text-2xl font-heading font-bold text-text-primary mb-4 border-b border-border pb-2">
              13. {t('section13.title')}
            </h2>
            <p className="text-text-secondary mb-4">{t('section13.intro')}</p>
            <div className="bg-bg-surface/50 border border-accent-orange/30 rounded-xl p-6">
              <p className="font-semibold text-text-primary mb-2">Fl1 s.r.o. (Pixarts)</p>
              <p className="text-text-secondary text-sm">
                Moskevská 1464/61, Vršovice<br />
                101 00 Praha 10, Repubblica Ceca<br />
                Email: bo2@fl1.cz
              </p>
            </div>
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

export default function PrivacyPolicyPage() {
  return <PrivacyPolicyContent />
}
