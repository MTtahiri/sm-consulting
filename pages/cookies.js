export default function Cookies() {
  return (
    <>
      <section className="hero">
        <div className="container">
          <h1 className="hero-title">Cookies & traceurs</h1>
          <p className="hero-subtitle">Politique de gestion des cookies</p>
        </div>
      </section>

      <section className="features">
        <div className="feature-card">
          <p>
            Lors de votre navigation, des cookies techniques et analytiques anonymes peuvent être déposés sur votre terminal
            afin d&apos;assurer le bon fonctionnement du site et l&apos;analyse statistique de la fréquentation (Google Analytics,
            Matomo ou équivalent RGPD).
          </p>
          <h3>Gestion des cookies</h3>
          <p>
            Vous pouvez accepter, refuser ou paramétrer les cookies via le bandeau prévu à cet effet lors de votre première visite.
            Aucune donnée nominative n&apos;est transmise à des tiers sans consentement explicite.
          </p>
          <h3>Engagement de conformité RGPD</h3>
          <p>
            SM Consulting applique les principes suivants :
          </p>
          <ul>
            <li><strong>Minimisation :</strong> seules les données strictement nécessaires sont collectées.</li>
            <li><strong>Sécurité :</strong> toutes les informations sont hébergées sur des serveurs conformes aux standards européens.</li>
            <li><strong>Transparence :</strong> l&apos;utilisateur est informé de toute finalité de traitement.</li>
            <li><strong>Droit de regard :</strong> chaque personne peut contrôler, corriger ou supprimer ses données à tout moment.</li>
          </ul>
          <p>
            Pour toute question concernant notre politique de cookies ou pour exercer vos droits,
            contactez-nous à :&nbsp;
            <a href="mailto:contact@rh-prospects.fr">contact@rh-prospects.fr</a>
          </p>
        </div>
      </section>
    </>
  );
}
import Link from 'next/link';

export default function Cookies() {
  const cookieTypes = [
    {
      icon: '🔧',
      type: 'Cookies techniques',
      description: 'Nécessaires au bon fonctionnement du site',
      examples: ['Session utilisateur', 'Préférences de langue', 'Panier d\'achat'],
      duration: 'Session ou 12 mois',
      required: true
    },
    {
      icon: '📊',
      type: 'Cookies analytiques',
      description: 'Permettent d\'analyser l\'utilisation du site',
      examples: ['Google Analytics', 'Statistiques de visite', 'Parcours utilisateur'],
      duration: '13 mois',
      required: false
    },
    {
      icon: '🎯',
      type: 'Cookies marketing',
      description: 'Utilisés pour la publicité ciblée',
      examples: ['Publicités personnalisées', 'Réseaux sociaux', 'Retargeting'],
      duration: '13 mois',
      required: false
    }
  ];

  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <h1 className="hero-title">Politique de cookies</h1>
            <p className="hero-subtitle">Gestion et utilisation des cookies sur notre site</p>
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
                <strong>SM Consulting</strong> utilise des cookies pour améliorer votre expérience 
                de navigation, analyser le trafic et personnaliser le contenu. Cette page vous explique 
                ce que sont les cookies, comment nous les utilisons et comment vous pouvez les gérer.
              </p>
            </div>

            {/* Qu'est-ce qu'un cookie */}
            <div className="legal-section">
              <div className="legal-section-header">
                <span className="legal-section-icon">🍪</span>
                <h2>Qu'est-ce qu'un cookie ?</h2>
              </div>
              <div className="legal-section-content">
                <p>
                  Un cookie est un petit fichier texte déposé sur votre terminal (ordinateur, tablette, 
                  smartphone) lors de la visite d'un site web. Il permet de conserver des informations 
                  relatives à votre navigation et de vous reconnaître lors de vos prochaines visites.
                </p>
              </div>
            </div>

            {/* Types de cookies */}
            <div className="legal-section">
              <div className="legal-section-header">
                <span className="legal-section-icon">📋</span>
                <h2>Types de cookies utilisés</h2>
              </div>
              <div className="legal-section-content">
                <div style={{ display: 'grid', gap: '20px' }}>
                  {cookieTypes.map((cookie, index) => (
                    <div key={index} className="cookie-type-card">
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                        <span style={{ fontSize: '32px' }}>{cookie.icon}</span>
                        <div>
                          <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 600 }}>{cookie.type}</h3>
                          {cookie.required && (
                            <span className="required-badge">Obligatoire</span>
                          )}
                        </div>
                      </div>
                      <p style={{ color: 'var(--text-light)', marginBottom: '12px' }}>
                        {cookie.description}
                      </p>
                      <div style={{ fontSize: '14px', color: 'var(--text-light)' }}>
                        <strong>Exemples :</strong> {cookie.examples.join(', ')}
                      </div>
                      <div style={{ fontSize: '14px', color: 'var(--text-light)', marginTop: '8px' }}>
                        <strong>Durée :</strong> {cookie.duration}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Gestion des cookies */}
            <div className="legal-section">
              <div className="legal-section-header">
                <span className="legal-section-icon">⚙️</span>
                <h2>Comment gérer vos cookies ?</h2>
              </div>
              <div className="legal-section-content">
                <p>Vous disposez de plusieurs moyens pour gérer les cookies :</p>
                
                <h4 style={{ marginTop: '20px', marginBottom: '12px' }}>1. Via notre bannière de consentement</h4>
                <p>
                  Lors de votre première visite, une bannière vous permet d'accepter ou refuser 
                  les cookies non essentiels.
                </p>

                <h4 style={{ marginTop: '20px', marginBottom: '12px' }}>2. Via les paramètres de votre navigateur</h4>
                <ul className="legal-list">
                  <li><strong>Chrome :</strong> Paramètres → Confidentialité et sécurité → Cookies</li>
                  <li><strong>Firefox :</strong> Options → Vie privée et sécurité → Cookies</li>
                  <li><strong>Safari :</strong> Préférences → Confidentialité → Cookies</li>
                  <li><strong>Edge :</strong> Paramètres → Confidentialité → Cookies</li>
                </ul>

                <div className="info-box" style={{ marginTop: '20px' }}>
                  <p>
                    ⚠️ <strong>Attention :</strong> La désactivation de certains cookies peut affecter 
                    le fonctionnement du site et votre expérience de navigation.
                  </p>
                </div>
              </div>
            </div>

            {/* Cookies tiers */}
            <div className="legal-section">
              <div className="legal-section-header">
                <span className="legal-section-icon">🔗</span>
                <h2>Cookies tiers</h2>
              </div>
              <div className="legal-section-content">
                <p>Notre site peut contenir des cookies provenant de services tiers :</p>
                <ul className="legal-list">
                  <li><strong>Google Analytics :</strong> Analyse d'audience et statistiques</li>
                  <li><strong>LinkedIn :</strong> Partage de contenu et publicités</li>
                  <li><strong>Facebook :</strong> Partage de contenu et publicités</li>
                </ul>
                <p>
                  Ces cookies sont soumis aux politiques de confidentialité de ces tiers. 
                  Nous vous invitons à consulter leurs politiques respectives.
                </p>
              </div>
            </div>

            {/* Contact */}
            <div className="legal-section">
              <div className="legal-section-header">
                <span className="legal-section-icon">📧</span>
                <h2>Questions sur les cookies</h2>
              </div>
              <div className="legal-section-content">
                <p>
                  Pour toute question concernant notre utilisation des cookies, contactez-nous :
                </p>
                <div className="cta-box">
                  <a href="mailto:contact@rh-prospects.fr" className="btn btn-primary">
                    ✉️ contact@rh-prospects.fr
                  </a>
                </div>
              </div>
            </div>

            {/* Footer de page */}
            <div className="legal-footer">
              <p>
                <strong>Dernière mise à jour :</strong> Janvier 2024
              </p>
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
                <Link href="/confidentialite" className="btn btn-secondary">
                  Confidentialité
                </Link>
                <Link href="/mentions" className="btn btn-secondary">
                  Mentions légales
                </Link>
                <Link href="/cgu" className="btn btn-secondary">
                  CGU
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}