import Link from 'next/link';

export default function Confidentialite() {
  const sections = [
    {
      id: 1,
      icon: '🏢',
      title: 'Responsable du traitement',
      content: (
        <>
          <p>Le responsable du traitement des données est :</p>
          <div className="info-box">
            <strong>SM Consulting</strong><br />
            SIRET : 438 184 707 00083<br />
            Email : <a href="mailto:contact@rh-prospects.fr">contact@rh-prospects.fr</a>
          </div>
        </>
      )
    },
    {
      id: 2,
      icon: '📊',
      title: 'Données collectées',
      content: (
        <>
          <p>Nous collectons uniquement les données nécessaires à :</p>
          <ul className="legal-list">
            <li>La gestion des candidatures et des missions de conseil</li>
            <li>La relation commerciale et contractuelle avec nos clients</li>
            <li>Le suivi de nos partenaires et consultants</li>
            <li>La navigation et la performance du site internet (cookies techniques et analytiques)</li>
          </ul>
        </>
      )
    },
    {
      id: 3,
      icon: '🎯',
      title: 'Finalités du traitement',
      content: (
        <p>
          Les données sont utilisées exclusivement à des fins professionnelles : prospection, 
          gestion de contrats, communication d'informations, et amélioration des services. 
          <strong> Aucune donnée n'est vendue, cédée ou transférée à des tiers sans consentement explicite.</strong>
        </p>
      )
    },
    {
      id: 4,
      icon: '⏱️',
      title: 'Durée de conservation',
      content: (
        <p>
          Les données sont conservées pour la durée strictement nécessaire à la finalité pour 
          laquelle elles ont été collectées, et au maximum <strong>3 ans après le dernier contact</strong> pour 
          les données de prospection.
        </p>
      )
    },
    {
      id: 5,
      icon: '✅',
      title: 'Vos droits',
      content: (
        <>
          <p>Conformément au Règlement Général sur la Protection des Données (UE 2016/679), vous disposez des droits suivants :</p>
          <ul className="legal-list">
            <li>Droit d'accès, de rectification et d'effacement de vos données</li>
            <li>Droit d'opposition et de limitation du traitement</li>
            <li>Droit à la portabilité des données</li>
            <li>Droit d'introduire une réclamation auprès de la <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer">CNIL</a></li>
          </ul>
          <div className="cta-box">
            <p><strong>Pour exercer vos droits :</strong></p>
            <a href="mailto:contact@rh-prospects.fr" className="btn btn-primary">
              ✉️ Nous contacter
            </a>
          </div>
        </>
      )
    }
  ];

  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <h1 className="hero-title">Politique de confidentialité</h1>
            <p className="hero-subtitle">Protection des données personnelles - RGPD</p>
          </div>
        </div>
      </section>

      {/* Navigation rapide */}
      <section style={{ background: 'var(--surface)', padding: '32px 0', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <div className="legal-nav">
            {sections.map((section) => (
              <a key={section.id} href={`#section-${section.id}`} className="legal-nav-item">
                <span className="legal-nav-icon">{section.icon}</span>
                <span>{section.title}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Contenu */}
      <section className="features">
        <div className="container">
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            {/* Intro */}
            <div className="legal-intro">
              <p>
                <strong>SM Consulting</strong>, immatriculée sous le SIRET <strong>438 184 707 00083</strong>, 
                s'engage à assurer la protection, la confidentialité et la sécurité des données personnelles 
                de ses clients, candidats, partenaires et visiteurs de son site internet.
              </p>
            </div>

            {/* Sections */}
            {sections.map((section) => (
              <div key={section.id} id={`section-${section.id}`} className="legal-section">
                <div className="legal-section-header">
                  <span className="legal-section-icon">{section.icon}</span>
                  <h2>{section.id}. {section.title}</h2>
                </div>
                <div className="legal-section-content">
                  {section.content}
                </div>
              </div>
            ))}

            {/* Footer de page */}
            <div className="legal-footer">
              <p>
                <strong>Dernière mise à jour :</strong> Janvier 2024
              </p>
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
                <Link href="/mentions" className="btn btn-secondary">
                  Mentions légales
                </Link>
                <Link href="/cgu" className="btn btn-secondary">
                  CGU
                </Link>
                <Link href="/cookies" className="btn btn-secondary">
                  Cookies
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}