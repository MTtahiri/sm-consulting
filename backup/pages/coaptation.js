import Link from 'next/link';

export default function Carrieres() {
  return (
    <>
      {/* Le header et footer sont gérés par layout global, je ne les redéfini pas ici */}
      
      {/* Section Hero */}
      <section className="hero">
        <div className="container">
          <h1 className="hero-title">Carrières</h1>
          <p className="hero-subtitle">Rejoignez notre équipe d'experts</p>
        </div>
      </section>

      {/* Section Contenu */}
      <section className="features">
        <div className="feature-card">
          <h2>Commercial Indépendant B2B</h2>
          <p>
            Chez SM Consulting, nous construisons un réseau d'experts et de partenaires engagés autour d'un même objectif :
            créer de la valeur pour nos clients grâce à la performance de nos consultants.
          </p>
          <h3>Votre mission</h3>
          <p>
            Nous recherchons actuellement un Commercial Indépendant B2B pour développer notre présence auprès d'entreprises partenaires.
            Votre mission : identifier, prospecter et fidéliser des clients à la recherche de compétences en conseil et en expertise technique,
            afin de placer nos consultants sur des missions à forte valeur ajoutée.
          </p>
          <h3>Votre rôle</h3>
          <ul>
            <li>Développer un portefeuille clients dans les secteurs clés (industrie, services, finance, IT…)</li>
            <li>Comprendre les besoins métiers et techniques des entreprises</li>
            <li>Proposer les consultants ou profils experts les plus adaptés</li>
            <li>Suivre la relation client dans la durée et garantir la satisfaction</li>
          </ul>
          <h3>Votre profil</h3>
          <ul>
            <li>Statut indépendant (auto-entrepreneur, freelance, portage, etc.)</li>
            <li>Expérience confirmée en prospection B2B / vente de services</li>
            <li>Solide compréhension du secteur du conseil ou du placement</li>
            <li>Autonomie, rigueur, sens du résultat et de la relation humaine</li>
          </ul>
          <h3>Pourquoi nous rejoindre ?</h3>
          <ul>
            <li>Liberté d'action et rémunération attractive à la performance</li>
            <li>Accès à un réseau de consultants qualifiés</li>
            <li>Collaboration transparente, durable et fondée sur la confiance</li>
            <li>Un partenariat où votre réussite alimente la nôtre</li>
          </ul>
          <p style={{ fontStyle: 'italic' }}>
            Ensemble, développons un réseau solide où les meilleures opportunités rencontrent les meilleurs talents.
          </p>
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link href="/contact" className="btn btn-primary">Postuler maintenant</Link>
          </div>
        </div>
      </section>

      {/* Le footer sera injecté via le layout global, pas besoin de le redéfinir ici */}

      <style jsx>{`
        /* Styles inchangés, selon ton système global, je n'ajoute pas ici pour éviter doublons */
      `}</style>
    </>
  );
}
