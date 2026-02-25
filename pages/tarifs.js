import Link from 'next/link';

export default function Tarifs() {
  return (
    <>
      {/* Header Section */}
      <section className="pricing-hero">
        <div className="container">
          <h1 className="page-title">Tarifs transparents et compétitifs</h1>
          <p className="page-subtitle">
            Choisissez la formule qui correspond à vos besoins. Sans frais cachés, sans surprise.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pricing-section">
        <div className="container">
          <div className="pricing-grid">
            {/* Recrutement Permanent */}
            <div className="pricing-card">
              <div className="pricing-header">
                <h3>Recrutement Permanent</h3>
                <div className="pricing-icon">💼</div>
              </div>
              <div className="pricing-price">
                <span className="price-amount">15%</span>
                <span className="price-unit">du salaire annuel brut</span>
              </div>
              <ul className="pricing-features">
                <li>✓ Recherche ciblée et qualification</li>
                <li>✓ 3-5 candidats présélectionnés</li>
                <li>✓ Accompagnement aux entretiens</li>
                <li>✓ Garantie de remplacement 3 mois</li>
                <li>✓ Suivi d'intégration</li>
                <li>✓ Délai moyen : 14 jours</li>
              </ul>
              <div className="pricing-example">
                <strong>Exemple :</strong> Pour un salaire de 50k€/an = 7 500€ HT
              </div>
              <Link href="/inscription-recruteur" className="btn btn-primary btn-block">
                Commencer
              </Link>
            </div>

            {/* Mission Freelance */}
            <div className="pricing-card featured">
              <div className="popular-tag">⭐ Plus populaire</div>
              <div className="pricing-header">
                <h3>Mission Freelance</h3>
                <div className="pricing-icon">🚀</div>
              </div>
              <div className="pricing-price">
                <span className="price-amount">8-12%</span>
                <span className="price-unit">de commission mensuelle</span>
              </div>
              <ul className="pricing-features">
                <li>✓ Consultants indépendants qualifiés</li>
                <li>✓ Disponibilité immédiate ou sous 1 semaine</li>
                <li>✓ Contrats flexibles (mission/régie)</li>
                <li>✓ Gestion administrative simplifiée</li>
                <li>✓ Remplacement rapide si besoin</li>
                <li>✓ Facturation mensuelle</li>
              </ul>
              <div className="pricing-example">
                <strong>Exemple :</strong> TJM 500€ × 20j = 10 000€, commission 1 000€/mois
              </div>
              <Link href="/inscription-recruteur" className="btn btn-accent btn-block">
                Démarrer maintenant
              </Link>
            </div>

            {/* Chasse de Têtes */}
            <div className="pricing-card">
              <div className="pricing-header">
                <h3>Chasse de Têtes</h3>
                <div className="pricing-icon">🎯</div>
              </div>
              <div className="pricing-price">
                <span className="price-amount">Sur devis</span>
                <span className="price-unit">18-25% du salaire annuel</span>
              </div>
              <ul className="pricing-features">
                <li>✓ Approche directe et discrète</li>
                <li>✓ Profils très qualifiés et rares</li>
                <li>✓ Recherche proactive sur le marché</li>
                <li>✓ Accompagnement VIP</li>
                <li>✓ Garantie 6 mois</li>
                <li>✓ Confidentialité totale</li>
              </ul>
              <div className="pricing-example">
                <strong>Profils :</strong> CTO, Lead Tech, Architecte Senior, etc.
              </div>
              <Link href="/contact" className="btn btn-secondary btn-block">
                Demander un devis
              </Link>
            </div>
          </div>

          {/* Additional Info */}
          <div className="pricing-info">
            <div className="info-card">
              <h3>🎁 Offre de lancement</h3>
              <p>
                <strong>Les 10 premiers clients bénéficient de :</strong><br />
                • 20% de réduction sur le premier recrutement<br />
                • Audit gratuit de vos processus RH (valeur 500€)<br />
                • Support prioritaire pendant 6 mois
              </p>
              <Link href="/inscription-recruteur" className="btn btn-primary">
                Profiter de l'offre
              </Link>
            </div>

            <div className="info-card">
              <h3>🤝 Partenariat volume</h3>
              <p>
                <strong>Vous recrutez régulièrement ?</strong><br />
                • Tarifs dégressifs selon le volume<br />
                • Compte dédié avec gestionnaire attitré<br />
                • Reporting mensuel et statistiques<br />
                • Processus sur mesure
              </p>
              <Link href="/contact" className="btn btn-secondary">
                Discuter d'un partenariat
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Pricing */}
      <section className="faq-pricing">
        <div className="container">
          <h2 className="section-title">Questions sur nos tarifs</h2>
          <div className="faq-list">
            <div className="faq-item-expanded">
              <h3>💳 Quand dois-je payer ?</h3>
              <p>
                <strong>Recrutement permanent :</strong> Facturation à l'embauche effective du candidat. Aucun frais avant.<br />
                <strong>Freelance :</strong> Commission mensuelle prélevée sur la facturation.<br />
                <strong>Chasse de têtes :</strong> 30% à la signature du mandat, 70% à l'embauche.
              </p>
            </div>

            <div className="faq-item-expanded">
              <h3>🛡️ Que comprend la garantie ?</h3>
              <p>
                Si le candidat quitte l'entreprise pendant la période de garantie (3 ou 6 mois selon la formule), 
                nous recherchons et présentons un remplaçant <strong>sans frais supplémentaires</strong>. 
                Cela inclut toutes les étapes : recherche, sélection, présentation.
              </p>
            </div>

            <div className="faq-item-expanded">
              <h3>📊 Y a-t-il des frais cachés ?</h3>
              <p>
                <strong>Non, aucun frais caché.</strong> Le tarif annoncé est celui que vous payez. 
                Pas de frais de dossier, pas de frais d'annonce, pas de frais administratifs supplémentaires.
              </p>
            </div>

            <div className="faq-item-expanded">
              <h3>🔄 Puis-je combiner plusieurs services ?</h3>
              <p>
                Oui ! Beaucoup de nos clients utilisent le recrutement permanent pour leurs CDI 
                et le freelance pour leurs projets ponctuels. Nous proposons des packages sur mesure 
                avec des tarifs préférentiels pour les clients multi-services.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <div className="container">
          <h2 className="cta-title">Besoin d'un devis personnalisé ?</h2>
          <p className="cta-subtitle">
            Parlons de vos besoins et trouvons la solution la plus adaptée à votre budget.
          </p>
          <div className="cta-actions">
            <Link href="/contact" className="btn btn-accent btn-large">
              Demander un devis gratuit
            </Link>
            <Link href="/inscription-recruteur" className="btn btn-secondary btn-large">
              Commencer sans engagement
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
