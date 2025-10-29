import Link from 'next/link';

export default function Carrieres() {
  const benefits = [
    {
      icon: '💰',
      title: 'Rémunération attractive',
      description: 'Commission à la performance avec des taux compétitifs'
    },
    {
      icon: '🎯',
      title: 'Autonomie totale',
      description: 'Liberté d\'action et gestion de votre temps'
    },
    {
      icon: '🤝',
      title: 'Réseau qualifié',
      description: 'Accès à notre base de consultants experts'
    },
    {
      icon: '📈',
      title: 'Croissance partagée',
      description: 'Votre réussite alimente la nôtre'
    }
  ];

  const requirements = [
    {
      category: 'Statut',
      items: ['Auto-entrepreneur', 'Freelance', 'Portage salarial']
    },
    {
      category: 'Expérience',
      items: ['Prospection B2B confirmée', 'Vente de services', 'Secteur conseil ou placement']
    },
    {
      category: 'Qualités',
      items: ['Autonomie', 'Rigueur', 'Sens du résultat', 'Relation humaine']
    }
  ];

  return (
    <>
      {/* Section Hero */}
      <section className="hero">
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <h1 className="hero-title">
              Rejoignez <span className="gradient-text">l'aventure</span>
            </h1>
            <p className="hero-subtitle">
              Devenez partenaire commercial de SM Consulting et développez votre activité 
              avec un réseau d'experts reconnus
            </p>
            <div className="hero-actions">
              <a href="#poste" className="btn btn-primary btn-large">
                Découvrir le poste
              </a>
              <Link href="/contact" className="btn btn-secondary btn-large">
                Nous contacter
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Section présentation */}
      <section className="features">
        <div className="container">
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <div className="career-intro">
              <h2 className="section-title">Commercial Indépendant B2B</h2>
              <p className="section-subtitle">
                Chez SM Consulting, nous construisons un réseau d'experts et de partenaires 
                engagés autour d'un même objectif : créer de la valeur pour nos clients 
                grâce à la performance de nos consultants.
              </p>
            </div>

            {/* Mission */}
            <div className="career-section">
              <div className="career-section-header">
                <span className="career-icon">🎯</span>
                <h3>Votre mission</h3>
              </div>
              <p>
                Nous recherchons actuellement un <strong>Commercial Indépendant B2B</strong> pour 
                développer notre présence auprès d'entreprises partenaires. Votre mission : 
                identifier, prospecter et fidéliser des clients à la recherche de compétences 
                en conseil et en expertise technique, afin de placer nos consultants sur des 
                missions à forte valeur ajoutée.
              </p>
            </div>

            {/* Rôle */}
            <div className="career-section">
              <div className="career-section-header">
                <span className="career-icon">💼</span>
                <h3>Votre rôle au quotidien</h3>
              </div>
              <ul className="career-list">
                <li>Développer un portefeuille clients dans les secteurs clés (industrie, services, finance, IT…)</li>
                <li>Comprendre les besoins métiers et techniques des entreprises</li>
                <li>Proposer les consultants ou profils experts les plus adaptés</li>
                <li>Suivre la relation client dans la durée et garantir la satisfaction</li>
              </ul>
            </div>

            {/* Profil recherché */}
            <div className="career-section">
              <div className="career-section-header">
                <span className="career-icon">👤</span>
                <h3>Le profil recherché</h3>
              </div>
              <div className="requirements-grid">
                {requirements.map((req, index) => (
                  <div key={index} className="requirement-card">
                    <h4>{req.category}</h4>
                    <ul>
                      {req.items.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Avantages */}
            <div className="career-section">
              <div className="career-section-header">
                <span className="career-icon">⭐</span>
                <h3>Pourquoi nous rejoindre ?</h3>
              </div>
              <div className="benefits-grid">
                {benefits.map((benefit, index) => (
                  <div key={index} className="benefit-card">
                    <div className="benefit-icon">{benefit.icon}</div>
                    <h4>{benefit.title}</h4>
                    <p>{benefit.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Citation */}
            <div className="career-quote">
              <p>
                "Ensemble, développons un réseau solide où les meilleures opportunités 
                rencontrent les meilleurs talents."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <div className="container">
          <h2 className="cta-title">Prêt à nous rejoindre ?</h2>
          <p className="cta-subtitle">
            Envoyez-nous votre candidature et commençons cette aventure ensemble
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact" className="btn btn-accent btn-large">
              Postuler maintenant
            </Link>
            <Link href="/equipe" className="btn btn-secondary btn-large">
              Découvrir l'équipe
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}