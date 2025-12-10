import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import { Link } from '@/i18n/routing'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'cookiePolicy' })

  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
  }
}

function CookiePolicyContent() {
  const t = useTranslations('cookiePolicy')

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
            {/* Section 1 - Cosa sono i Cookie */}
            <section className="mb-12">
              <h2 className="text-2xl font-heading font-bold text-text-primary mb-4 border-b border-border pb-2">
                1. {t('section1.title')}
              </h2>
              <p className="text-text-secondary mb-4">{t('section1.intro')}</p>
              <p className="text-text-secondary">{t('section1.technologies')}</p>
            </section>

            {/* Section 2 - Titolare del Trattamento */}
            <section className="mb-12">
              <h2 className="text-2xl font-heading font-bold text-text-primary mb-4 border-b border-border pb-2">
                2. {t('section2.title')}
              </h2>
              <div className="bg-bg-surface/50 border border-border rounded-xl p-6">
                <p className="font-semibold text-text-primary mb-2">Fl1 s.r.o.</p>
                <p className="text-text-secondary text-sm">
                  {t('section2.operatingAs')} &quot;Pixarts&quot;<br />
                  Moskevská 1464/61, Vršovice, 101 00 Praha 10, Repubblica Ceca<br />
                  IČO: 04626664<br />
                  Email: bo2@fl1.cz
                </p>
              </div>
            </section>

            {/* Section 3 - Tipologie di Cookie */}
            <section className="mb-12">
              <h2 className="text-2xl font-heading font-bold text-text-primary mb-4 border-b border-border pb-2">
                3. {t('section3.title')}
              </h2>

              {/* 3.1 Cookie Tecnici */}
              <h3 className="text-xl font-semibold text-text-primary mt-6 mb-3">
                3.1 {t('section3.technical.title')}
              </h3>
              <p className="text-text-secondary mb-4">{t('section3.technical.intro')}</p>
              <div className="overflow-x-auto mb-6">
                <table className="w-full text-sm border border-border rounded-xl overflow-hidden">
                  <thead className="bg-bg-surface">
                    <tr>
                      <th className="px-4 py-3 text-left text-text-primary font-semibold border-b border-border">{t('section3.table.name')}</th>
                      <th className="px-4 py-3 text-left text-text-primary font-semibold border-b border-border">{t('section3.table.provider')}</th>
                      <th className="px-4 py-3 text-left text-text-primary font-semibold border-b border-border">{t('section3.table.purpose')}</th>
                      <th className="px-4 py-3 text-left text-text-primary font-semibold border-b border-border">{t('section3.table.duration')}</th>
                    </tr>
                  </thead>
                  <tbody className="text-text-secondary">
                    <tr className="border-b border-border/50">
                      <td className="px-4 py-3 font-mono text-xs">session_id</td>
                      <td className="px-4 py-3">pixarts.eu</td>
                      <td className="px-4 py-3">{t('section3.technical.session')}</td>
                      <td className="px-4 py-3">{t('section3.duration.session')}</td>
                    </tr>
                    <tr className="border-b border-border/50 bg-bg-surface/30">
                      <td className="px-4 py-3 font-mono text-xs">cookie_consent</td>
                      <td className="px-4 py-3">pixarts.eu</td>
                      <td className="px-4 py-3">{t('section3.technical.consent')}</td>
                      <td className="px-4 py-3">12 {t('section3.duration.months')}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-mono text-xs">csrf_token</td>
                      <td className="px-4 py-3">pixarts.eu</td>
                      <td className="px-4 py-3">{t('section3.technical.csrf')}</td>
                      <td className="px-4 py-3">{t('section3.duration.session')}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* 3.2 Cookie Analitici */}
              <h3 className="text-xl font-semibold text-text-primary mt-6 mb-3">
                3.2 {t('section3.analytics.title')}
              </h3>
              <p className="text-text-secondary mb-4">{t('section3.analytics.intro')}</p>
              <div className="overflow-x-auto mb-4">
                <table className="w-full text-sm border border-border rounded-xl overflow-hidden">
                  <thead className="bg-bg-surface">
                    <tr>
                      <th className="px-4 py-3 text-left text-text-primary font-semibold border-b border-border">{t('section3.table.name')}</th>
                      <th className="px-4 py-3 text-left text-text-primary font-semibold border-b border-border">{t('section3.table.provider')}</th>
                      <th className="px-4 py-3 text-left text-text-primary font-semibold border-b border-border">{t('section3.table.purpose')}</th>
                      <th className="px-4 py-3 text-left text-text-primary font-semibold border-b border-border">{t('section3.table.duration')}</th>
                      <th className="px-4 py-3 text-left text-text-primary font-semibold border-b border-border">{t('section3.table.consent')}</th>
                    </tr>
                  </thead>
                  <tbody className="text-text-secondary">
                    <tr className="border-b border-border/50">
                      <td className="px-4 py-3 font-mono text-xs">_ga</td>
                      <td className="px-4 py-3">Google Analytics</td>
                      <td className="px-4 py-3">{t('section3.analytics.distinguish')}</td>
                      <td className="px-4 py-3">2 {t('section3.duration.years')}</td>
                      <td className="px-4 py-3"><span className="text-accent-orange">{t('section3.required')}</span></td>
                    </tr>
                    <tr className="border-b border-border/50 bg-bg-surface/30">
                      <td className="px-4 py-3 font-mono text-xs">_ga_*</td>
                      <td className="px-4 py-3">Google Analytics</td>
                      <td className="px-4 py-3">{t('section3.analytics.sessionState')}</td>
                      <td className="px-4 py-3">2 {t('section3.duration.years')}</td>
                      <td className="px-4 py-3"><span className="text-accent-orange">{t('section3.required')}</span></td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="px-4 py-3 font-mono text-xs">_gid</td>
                      <td className="px-4 py-3">Google Analytics</td>
                      <td className="px-4 py-3">{t('section3.analytics.distinguish')}</td>
                      <td className="px-4 py-3">24 {t('section3.duration.hours')}</td>
                      <td className="px-4 py-3"><span className="text-accent-orange">{t('section3.required')}</span></td>
                    </tr>
                    <tr className="bg-bg-surface/30">
                      <td className="px-4 py-3 font-mono text-xs">_gat</td>
                      <td className="px-4 py-3">Google Analytics</td>
                      <td className="px-4 py-3">{t('section3.analytics.rateLimit')}</td>
                      <td className="px-4 py-3">1 {t('section3.duration.minute')}</td>
                      <td className="px-4 py-3"><span className="text-accent-orange">{t('section3.required')}</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="bg-bg-surface/50 border border-border rounded-xl p-4 mb-6">
                <p className="text-text-secondary text-sm">
                  <strong className="text-text-primary">{t('section3.note')}:</strong> {t('section3.analytics.ipNote')}
                </p>
              </div>

              {/* 3.3 Cookie Marketing */}
              <h3 className="text-xl font-semibold text-text-primary mt-6 mb-3">
                3.3 {t('section3.marketing.title')}
              </h3>
              <p className="text-text-secondary mb-4">{t('section3.marketing.intro')}</p>
              <div className="overflow-x-auto mb-6">
                <table className="w-full text-sm border border-border rounded-xl overflow-hidden">
                  <thead className="bg-bg-surface">
                    <tr>
                      <th className="px-4 py-3 text-left text-text-primary font-semibold border-b border-border">{t('section3.table.name')}</th>
                      <th className="px-4 py-3 text-left text-text-primary font-semibold border-b border-border">{t('section3.table.provider')}</th>
                      <th className="px-4 py-3 text-left text-text-primary font-semibold border-b border-border">{t('section3.table.purpose')}</th>
                      <th className="px-4 py-3 text-left text-text-primary font-semibold border-b border-border">{t('section3.table.duration')}</th>
                    </tr>
                  </thead>
                  <tbody className="text-text-secondary">
                    <tr className="border-b border-border/50">
                      <td className="px-4 py-3 font-mono text-xs">_fbp</td>
                      <td className="px-4 py-3">Meta (Facebook)</td>
                      <td className="px-4 py-3">{t('section3.marketing.browserId')}</td>
                      <td className="px-4 py-3">3 {t('section3.duration.months')}</td>
                    </tr>
                    <tr className="border-b border-border/50 bg-bg-surface/30">
                      <td className="px-4 py-3 font-mono text-xs">_fbc</td>
                      <td className="px-4 py-3">Meta (Facebook)</td>
                      <td className="px-4 py-3">{t('section3.marketing.clickTracking')}</td>
                      <td className="px-4 py-3">3 {t('section3.duration.months')}</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="px-4 py-3 font-mono text-xs">fr</td>
                      <td className="px-4 py-3">Meta (Facebook)</td>
                      <td className="px-4 py-3">{t('section3.marketing.adsMeasurement')}</td>
                      <td className="px-4 py-3">3 {t('section3.duration.months')}</td>
                    </tr>
                    <tr className="border-b border-border/50 bg-bg-surface/30">
                      <td className="px-4 py-3 font-mono text-xs">_gcl_au</td>
                      <td className="px-4 py-3">Google Ads</td>
                      <td className="px-4 py-3">{t('section3.marketing.conversions')}</td>
                      <td className="px-4 py-3">3 {t('section3.duration.months')}</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="px-4 py-3 font-mono text-xs">IDE</td>
                      <td className="px-4 py-3">Google DoubleClick</td>
                      <td className="px-4 py-3">{t('section3.marketing.personalizedAds')}</td>
                      <td className="px-4 py-3">13 {t('section3.duration.months')}</td>
                    </tr>
                    <tr className="bg-bg-surface/30">
                      <td className="px-4 py-3 font-mono text-xs">test_cookie</td>
                      <td className="px-4 py-3">Google DoubleClick</td>
                      <td className="px-4 py-3">{t('section3.marketing.cookieSupport')}</td>
                      <td className="px-4 py-3">15 {t('section3.duration.minutes')}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* 3.4 Cookie Terze Parti */}
              <h3 className="text-xl font-semibold text-text-primary mt-6 mb-3">
                3.4 {t('section3.thirdParty.title')}
              </h3>
              <p className="text-text-secondary mb-4">{t('section3.thirdParty.intro')}</p>

              <h4 className="text-lg font-semibold text-text-primary mt-4 mb-2">YouTube</h4>
              <div className="overflow-x-auto mb-4">
                <table className="w-full text-sm border border-border rounded-xl overflow-hidden">
                  <thead className="bg-bg-surface">
                    <tr>
                      <th className="px-4 py-3 text-left text-text-primary font-semibold border-b border-border">{t('section3.table.name')}</th>
                      <th className="px-4 py-3 text-left text-text-primary font-semibold border-b border-border">{t('section3.table.purpose')}</th>
                      <th className="px-4 py-3 text-left text-text-primary font-semibold border-b border-border">{t('section3.table.duration')}</th>
                    </tr>
                  </thead>
                  <tbody className="text-text-secondary">
                    <tr className="border-b border-border/50">
                      <td className="px-4 py-3 font-mono text-xs">VISITOR_INFO1_LIVE</td>
                      <td className="px-4 py-3">{t('section3.thirdParty.youtube.bandwidth')}</td>
                      <td className="px-4 py-3">6 {t('section3.duration.months')}</td>
                    </tr>
                    <tr className="border-b border-border/50 bg-bg-surface/30">
                      <td className="px-4 py-3 font-mono text-xs">YSC</td>
                      <td className="px-4 py-3">{t('section3.thirdParty.youtube.session')}</td>
                      <td className="px-4 py-3">{t('section3.duration.session')}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-mono text-xs">GPS</td>
                      <td className="px-4 py-3">{t('section3.thirdParty.youtube.geo')}</td>
                      <td className="px-4 py-3">30 {t('section3.duration.minutes')}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="bg-bg-surface/50 border border-border rounded-xl p-4 mb-6">
                <p className="text-text-secondary text-sm">
                  <strong className="text-text-primary">{t('section3.note')}:</strong> {t('section3.thirdParty.youtube.note')}
                </p>
              </div>

              <h4 className="text-lg font-semibold text-text-primary mt-4 mb-2">Google Maps</h4>
              <div className="overflow-x-auto mb-4">
                <table className="w-full text-sm border border-border rounded-xl overflow-hidden">
                  <thead className="bg-bg-surface">
                    <tr>
                      <th className="px-4 py-3 text-left text-text-primary font-semibold border-b border-border">{t('section3.table.name')}</th>
                      <th className="px-4 py-3 text-left text-text-primary font-semibold border-b border-border">{t('section3.table.purpose')}</th>
                      <th className="px-4 py-3 text-left text-text-primary font-semibold border-b border-border">{t('section3.table.duration')}</th>
                    </tr>
                  </thead>
                  <tbody className="text-text-secondary">
                    <tr className="border-b border-border/50">
                      <td className="px-4 py-3 font-mono text-xs">NID</td>
                      <td className="px-4 py-3">{t('section3.thirdParty.maps.preferences')}</td>
                      <td className="px-4 py-3">6 {t('section3.duration.months')}</td>
                    </tr>
                    <tr className="bg-bg-surface/30">
                      <td className="px-4 py-3 font-mono text-xs">1P_JAR</td>
                      <td className="px-4 py-3">{t('section3.thirdParty.maps.stats')}</td>
                      <td className="px-4 py-3">1 {t('section3.duration.month')}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h4 className="text-lg font-semibold text-text-primary mt-4 mb-2">{t('section3.thirdParty.social.title')}</h4>
              <p className="text-text-secondary">{t('section3.thirdParty.social.desc')}</p>
            </section>

            {/* Section 4 - Base Giuridica */}
            <section className="mb-12">
              <h2 className="text-2xl font-heading font-bold text-text-primary mb-4 border-b border-border pb-2">
                4. {t('section4.title')}
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border border-border rounded-xl overflow-hidden">
                  <thead className="bg-bg-surface">
                    <tr>
                      <th className="px-4 py-3 text-left text-text-primary font-semibold border-b border-border">{t('section4.table.type')}</th>
                      <th className="px-4 py-3 text-left text-text-primary font-semibold border-b border-border">{t('section4.table.legalBasis')}</th>
                    </tr>
                  </thead>
                  <tbody className="text-text-secondary">
                    <tr className="border-b border-border/50">
                      <td className="px-4 py-3">{t('section4.types.technical')}</td>
                      <td className="px-4 py-3">{t('section4.basis.legitimate')}</td>
                    </tr>
                    <tr className="border-b border-border/50 bg-bg-surface/30">
                      <td className="px-4 py-3">{t('section4.types.analytics')}</td>
                      <td className="px-4 py-3">{t('section4.basis.consent')}</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="px-4 py-3">{t('section4.types.marketing')}</td>
                      <td className="px-4 py-3">{t('section4.basis.consent')}</td>
                    </tr>
                    <tr className="bg-bg-surface/30">
                      <td className="px-4 py-3">{t('section4.types.thirdParty')}</td>
                      <td className="px-4 py-3">{t('section4.basis.consent')}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Section 5 - Gestione Preferenze */}
            <section className="mb-12">
              <h2 className="text-2xl font-heading font-bold text-text-primary mb-4 border-b border-border pb-2">
                5. {t('section5.title')}
              </h2>

              <h3 className="text-xl font-semibold text-text-primary mt-6 mb-3">
                5.1 {t('section5.banner.title')}
              </h3>
              <p className="text-text-secondary mb-4">{t('section5.banner.intro')}</p>
              <ul className="text-text-secondary space-y-2 mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-accent-orange">•</span>
                  <span><strong>{t('section5.banner.acceptAll')}</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent-orange">•</span>
                  <span><strong>{t('section5.banner.reject')}</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent-orange">•</span>
                  <span><strong>{t('section5.banner.customize')}</strong></span>
                </li>
              </ul>
              <p className="text-text-secondary">{t('section5.banner.modify')}</p>

              <h3 className="text-xl font-semibold text-text-primary mt-6 mb-3">
                5.2 {t('section5.browser.title')}
              </h3>
              <p className="text-text-secondary mb-4">{t('section5.browser.intro')}</p>
              <div className="overflow-x-auto mb-4">
                <table className="w-full text-sm border border-border rounded-xl overflow-hidden">
                  <thead className="bg-bg-surface">
                    <tr>
                      <th className="px-4 py-3 text-left text-text-primary font-semibold border-b border-border">Browser</th>
                      <th className="px-4 py-3 text-left text-text-primary font-semibold border-b border-border">{t('section5.browser.guide')}</th>
                    </tr>
                  </thead>
                  <tbody className="text-text-secondary">
                    <tr className="border-b border-border/50">
                      <td className="px-4 py-3">Chrome</td>
                      <td className="px-4 py-3"><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-accent-orange hover:underline">{t('section5.browser.manageCookies')}</a></td>
                    </tr>
                    <tr className="border-b border-border/50 bg-bg-surface/30">
                      <td className="px-4 py-3">Firefox</td>
                      <td className="px-4 py-3"><a href="https://support.mozilla.org/it/kb/Gestione%20dei%20cookie" target="_blank" rel="noopener noreferrer" className="text-accent-orange hover:underline">{t('section5.browser.cookiesData')}</a></td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="px-4 py-3">Safari</td>
                      <td className="px-4 py-3"><a href="https://support.apple.com/it-it/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-accent-orange hover:underline">{t('section5.browser.manageCookies')}</a></td>
                    </tr>
                    <tr className="bg-bg-surface/30">
                      <td className="px-4 py-3">Edge</td>
                      <td className="px-4 py-3"><a href="https://support.microsoft.com/it-it/microsoft-edge/eliminare-i-cookie-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="text-accent-orange hover:underline">{t('section5.browser.cookiesEdge')}</a></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="bg-bg-surface/50 border border-warning/30 rounded-xl p-4 mb-6">
                <p className="text-text-secondary text-sm">
                  <strong className="text-warning">{t('section5.browser.warning')}:</strong> {t('section5.browser.warningText')}
                </p>
              </div>

              <h3 className="text-xl font-semibold text-text-primary mt-6 mb-3">
                5.3 {t('section5.optout.title')}
              </h3>
              <p className="text-text-secondary mb-4">{t('section5.optout.intro')}</p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border border-border rounded-xl overflow-hidden">
                  <thead className="bg-bg-surface">
                    <tr>
                      <th className="px-4 py-3 text-left text-text-primary font-semibold border-b border-border">{t('section5.optout.service')}</th>
                      <th className="px-4 py-3 text-left text-text-primary font-semibold border-b border-border">{t('section5.optout.link')}</th>
                    </tr>
                  </thead>
                  <tbody className="text-text-secondary">
                    <tr className="border-b border-border/50">
                      <td className="px-4 py-3">Google Analytics</td>
                      <td className="px-4 py-3"><a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-accent-orange hover:underline">tools.google.com/dlpage/gaoptout</a></td>
                    </tr>
                    <tr className="border-b border-border/50 bg-bg-surface/30">
                      <td className="px-4 py-3">Google Ads</td>
                      <td className="px-4 py-3"><a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-accent-orange hover:underline">adssettings.google.com</a></td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="px-4 py-3">Facebook</td>
                      <td className="px-4 py-3"><a href="https://www.facebook.com/ads/preferences" target="_blank" rel="noopener noreferrer" className="text-accent-orange hover:underline">facebook.com/ads/preferences</a></td>
                    </tr>
                    <tr className="bg-bg-surface/30">
                      <td className="px-4 py-3">Your Online Choices</td>
                      <td className="px-4 py-3"><a href="https://www.youronlinechoices.eu/" target="_blank" rel="noopener noreferrer" className="text-accent-orange hover:underline">youronlinechoices.eu</a></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Section 6 - Trasferimento Dati */}
            <section className="mb-12">
              <h2 className="text-2xl font-heading font-bold text-text-primary mb-4 border-b border-border pb-2">
                6. {t('section6.title')}
              </h2>
              <p className="text-text-secondary mb-4">{t('section6.intro')}</p>
              <p className="text-text-secondary mb-2">{t('section6.basedOn')}</p>
              <ul className="text-text-secondary space-y-2 mb-4">
                <li className="flex items-start gap-2">
                  <span className="text-accent-orange">•</span>
                  EU-US Data Privacy Framework
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent-orange">•</span>
                  {t('section6.scc')}
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent-orange">•</span>
                  {t('section6.measures')}
                </li>
              </ul>
              <p className="text-text-secondary">
                {t('section6.moreInfo')}{' '}
                <Link href="/privacy-policy" className="text-accent-orange hover:underline">
                  Privacy Policy
                </Link>.
              </p>
            </section>

            {/* Section 7 - Periodo di Conservazione */}
            <section className="mb-12">
              <h2 className="text-2xl font-heading font-bold text-text-primary mb-4 border-b border-border pb-2">
                7. {t('section7.title')}
              </h2>
              <p className="text-text-secondary">{t('section7.content')}</p>
            </section>

            {/* Section 8 - I Tuoi Diritti */}
            <section className="mb-12">
              <h2 className="text-2xl font-heading font-bold text-text-primary mb-4 border-b border-border pb-2">
                8. {t('section8.title')}
              </h2>
              <p className="text-text-secondary mb-4">{t('section8.intro')}</p>
              <ul className="text-text-secondary space-y-2 mb-4">
                <li className="flex items-start gap-2">
                  <span className="text-accent-orange">•</span>
                  {t('section8.rights.informed')}
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent-orange">•</span>
                  {t('section8.rights.accept')}
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent-orange">•</span>
                  {t('section8.rights.modify')}
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent-orange">•</span>
                  {t('section8.rights.request')}
                </li>
              </ul>
              <p className="text-text-secondary">
                {t('section8.moreInfo')}{' '}
                <Link href="/privacy-policy" className="text-accent-orange hover:underline">
                  Privacy Policy
                </Link>{' '}
                {t('section8.orContact')} bo2@fl1.cz.
              </p>
            </section>

            {/* Section 9 - Aggiornamenti */}
            <section className="mb-12">
              <h2 className="text-2xl font-heading font-bold text-text-primary mb-4 border-b border-border pb-2">
                9. {t('section9.title')}
              </h2>
              <p className="text-text-secondary mb-4">{t('section9.content1')}</p>
              <p className="text-text-secondary">{t('section9.content2')}</p>
            </section>

            {/* Section 10 - Contatti */}
            <section className="mb-12">
              <h2 className="text-2xl font-heading font-bold text-text-primary mb-4 border-b border-border pb-2">
                10. {t('section10.title')}
              </h2>
              <p className="text-text-secondary mb-4">{t('section10.intro')}</p>
              <div className="bg-bg-surface/50 border border-accent-orange/30 rounded-xl p-6">
                <p className="font-semibold text-text-primary mb-2">Fl1 s.r.o. (Pixarts)</p>
                <p className="text-text-secondary text-sm">
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

export default function CookiePolicyPage() {
  return <CookiePolicyContent />
}
