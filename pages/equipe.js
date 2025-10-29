import Link from 'next/link';

export default function Equipe() {
  const teamMembers = [
    {
      name: 'Mohamed Tahiri',
      role: 'CEO & Fondateur',
      photo: '👩‍💼',
      description: '5 ans d\'expérience en recrutement IT et transformation digitale',
      specialties: ['Stratégie', 'Leadership', 'Innovation']
    },
  ];

  const values = [
    {
      icon: '🎯',
      title: 'Excellence',
      description: 'Nous visons l\'excellence dans chaque mission et délivrons des résultats tangibles.'
    },
    {
      icon: '🤝',
      title: 'Collaboration',
      description: 'L\'entraide et la synergie d\'équipe sont au cœur de notre culture.'
    },
    {
      icon: '🚀',
      title: 'Innovation',
      description: 'Nous cultivons la curiosité et la remise en question permanente.'
    },
    {
      icon: '💡',
      title: 'Expertise',
      description: 'Des profils hybrides alliant technique, business et adaptation.'
    }
  ];

  return (
    <>
      {/* Section Hero */}
      <section className="hero">
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <h1 className="hero-title">S.M. Consulting</h1>
            <p className="hero-subtitle">
              Un expert passionné réunis par l'excellence et l'envie de faire la différence
            </p>
          </div>
        </div>
      </section>

      {/* Section présentation */}
      <section className="features">
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto 60px', textAlign: 'center' }}>
            <h2 className="section-title">Une équipe d'exception</h2>
            <p className="section-subtitle">
              S.M.Consulting réunit des profils hybrides — stratèges, ingénieurs, analystes, 
              experts métiers et développeurs — tous animés par la même exigence : 
              délivrer des résultats tangibles. Chaque consultant de SM Consulting allie 
              expertise technique, vision business et capacité d'adaptation.
            </p>
          </div>

          {/* Grid membres de l'équipe */}
          <div className="team-grid">
            {teamMembers.map((member, index) => (
              <div key={index} className="team-card">
                <div className="team-photo">{member.photo}</div>
                <h3 className="team-name">{member.name}</h3>
                <div className="team-role">{member.role}</div>
                <p className="team-description">{member.description}</p>
                <div className="team-specialties">
                  {member.specialties.map((specialty, i) => (
                    <span key={i} className="specialty-tag">{specialty}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section valeurs */}
      <section className="features" style={{ background: 'var(--surface)' }}>
        <div className="container">
          <h2 className="section-title">Nos valeurs</h2>
          <p className="section-subtitle">
            Nous cultivons une culture d'équipe basée sur la curiosité, l'entraide 
            et la remise en question permanente
          </p>

          <div className="features-grid">
            {values.map((value, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon" style={{ fontSize: '32px' }}>{value.icon}</div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section expertise collective */}
      <section className="features">
        <div className="container">
          <div className="feature-card" style={{ maxWidth: '900px', margin: '0 auto' }}>
            <h2 className="section-title" style={{ marginBottom: '24px' }}>Expertise collective</h2>
            <p style={{ fontSize: '18px', lineHeight: '1.8', color: 'var(--text)', marginBottom: '32px' }}>
              La force de SM Consulting réside dans la complémentarité de nos compétences 
              et notre capacité à travailler en synergie pour répondre aux défis les plus 
              complexes de nos clients.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
              <div className="stat-card">
                <div className="stat-number">15+</div>
                <div className="stat-label">Années d'expérience moyenne</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">50+</div>
                <div className="stat-label">Projets réussis</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">98%</div>
                <div className="stat-label">Taux de satisfaction client</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Rejoindre l'équipe */}
      <section className="cta">
        <div className="container">
          <h2 className="cta-title">Rejoignez notre équipe</h2>
          <p className="cta-subtitle">
            Vous partagez nos valeurs et souhaitez faire partie de l'aventure ?
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/carrieres" className="btn btn-accent btn-large">
              Voir nos offres
            </Link>
            <Link href="/contact" className="btn btn-secondary btn-large">
              Nous contacter
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}