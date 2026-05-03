import Link from 'next/link';

export default function CGU() {
  const sections = [
    {
      id: 1,
      icon: '📋',
      title: 'Acceptation des CGU',
      content: (
        <p>
          L'accès et l'utilisation du site <strong>SM Consulting</strong> impliquent l'acceptation 
          pleine et entière des présentes Conditions Générales d'Utilisation. L'utilisateur s'engage 
          à utiliser le site conformément à la loi, aux bonnes mœurs et à la finalité du service proposé.
        </p>
      )
    },
    {
      id: 2,
      icon: '⚖️',
      title: 'Responsabilités',
      content: (
        <>
          <p>
            SM Consulting s'efforce d'assurer l'exactitude et la mise à jour des informations publiées, 
            sans pour autant pouvoir être tenue responsable des erreurs, omissions ou indisponibilités 
            temporaires du site.
          </p>
          <div className="info-box">
            <p><strong>Responsabilité de l'utilisateur :</strong></p>
            <p>
              L'utilisateur est responsable de l'usage qu'il fait du site et des informations qu'il y consulte.
            </p>
          </div>
          <p>
            SM Consulting ne saurait être tenue responsable en cas de dommages matériels ou immatériels 
            liés à l'utilisation du site ou à un accès non autorisé.
          </p>
        </>
      )
    },
    {
      id: 3,
      icon: '🔒',
      title: 'Sécurité et bon usage',
      content: (
        <>
          <p>L'utilisateur s'engage à :</p>
          <ul className="legal-list">
            <li>Ne pas perturber le fonctionnement du site</li>
            <li>Ne pas tenter d'accéder à des données non autorisées</li>
            <li>Ne pas utiliser le site à des fins illégales ou frauduleuses</li>
            <li>Respecter les droits de propriété intellectuelle</li>
            <li>Maintenir la confidentialité de ses identifiants de connexion</li>
          </ul>
        </>
      )
    },
    {
      id: 4,
      icon: '©️',
      title: 'Propriété intellectuelle',
      content: (
        <p>
          L'ensemble du contenu du site (textes, images, logos, vidéos, éléments graphiques) est protégé 
          par le droit d'auteur et demeure la propriété exclusive de SM Consulting. Toute reproduction, 
          diffusion ou utilisation sans autorisation préalable est strictement interdite.
        </p>
      )
    },
    {
      id: 5,
      icon: '🔄',
      title: 'Modifications des CGU',
      content: (
        <p>
          SM Consulting se réserve le droit de modifier à tout moment les présentes CGU. Les nouvelles 
          conditions prendront effet dès leur publication sur le site. Il est de la responsabilité de 
          l'utilisateur de consulter régulièrement cette page.
        </p>
      )
    },
    {
      id: 6,
      icon: '⚠️',
      title: 'Limitation de responsabilité',
      content: (
        <>
          <p>SM Consulting décline toute responsabilité concernant :</p>
          <ul className="legal-list">
            <li>Les interruptions temporaires du service pour maintenance</li>
            <li>Les liens hypertextes vers des sites tiers</li>
            <li>L'usage fait par l'utilisateur des informations du site</li>
            <li>Les virus informatiques ou attaques malveillantes</li>
          </ul>
        </>
      )
    },
    {
      id: 7,
      icon: '📞',
      title: 'Contact et réclamations',
      content: (
        <>
          <p>
            Pour toute question relative aux présentes CGU ou au fonctionnement du site, vous pouvez 
            nous contacter :
          </p>
          <div className="cta-box">
            <p><strong>Service Client SM Consulting</strong></p>
            <a href="mailto:contact@rh-prospects.fr" className="btn btn-primary">
              ✉️ contact@rh-prospects.fr
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
            <h1 className="hero-title">Conditions Générales d'Utilisation</h1>
            <p className="hero-subtitle">Règles d'utilisation du site SM Consulting</p>
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
                Bienvenue sur le site de <strong>SM Consulting</strong>. En accédant à ce site et en 
                l'utilisant, vous acceptez d'être lié par les présentes Conditions Générales d'Utilisation. 
                Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser ce site.
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
                <Link href="/confidentialite" className="btn btn-secondary">
                  Confidentialité
                </Link>
                <Link href="/mentions" className="btn btn-secondary">
                  Mentions légales
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