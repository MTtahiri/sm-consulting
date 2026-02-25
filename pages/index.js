import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="container">
          <div className="hero-with-image">
            <div className="hero-content">
              <div className="trust-badge">✓ Approuvé par 50+ entreprises IT</div>
              <h1 className="hero-title">
                Trouvez les talents <span className="gradient-text">qui font la différence</span>
              </h1>
              <p className="hero-subtitle">
                SM Consulting connecte les entreprises aux meilleurs profils IT. Notre approche sur mesure et notre expertise du marché vous garantissent des recrutements réussis.
              </p>
              <div className="value-props">
                <div className="value-item">✓ Recrutement en 14 jours</div>
                <div className="value-item">✓ Garantie satisfait ou remboursé</div>
                <div className="value-item">✓ Premier entretien offert</div>
              </div>
              <div className="hero-actions">
                <Link href="/inscription-recruteur" className="btn btn-primary btn-large">
                  🚀 Recruter un talent maintenant
                </Link>
                <Link href="/candidats" className="btn btn-secondary btn-large">Voir nos profils</Link>
              </div>
              <div className="hero-stats">
                <div className="stat">
                  <div className="stat-number">15+</div>
                  <div className="stat-label">Années d'expertise</div>
                </div>
                <div className="stat">
                  <div className="stat-number">200+</div>
                  <div className="stat-label">Talents placés</div>
                </div>
                <div className="stat">
                  <div className="stat-number">98%</div>
                  <div className="stat-label">Clients satisfaits</div>
                </div>
              </div>
            </div>
            <div className="hero-image">
              <Image 
                src="/images/hero-recrutement.jpg" 
                alt="Équipe professionnelle en réunion de recrutement IT"
                width={600}
                height={500}
                priority
                className="hero-img-actual"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="social-proof">
        <div className="container">
          <p className="trust-text">Ils nous font confiance</p>
          <div className="logos-marquee">
            <span className="company-name">🏢 Capgemini</span>
            <span className="company-name">🏢 Atos</span>
            <span className="company-name">🏢 Sopra Steria</span>
            <span className="company-name">🏢 Thales</span>
            <span className="company-name">🏢 Orange</span>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="features">
        <div className="container">
          <h2 className="section-title">Notre expertise à votre service</h2>
          <p className="section-subtitle">
            Des solutions complètes pour répondre à tous vos besoins en recrutement IT
          </p>
          <div className="features-grid">
            <div className="feature-card featured">
              <div className="popular-badge">⭐ Plus populaire</div>
              <div className="feature-icon">💼</div>
              <h3>Recrutement Permanent</h3>
              <p>
                Recrutement de profils CDI et CDD avec une garantie de réussite et un processus optimisé.
              </p>
              <div className="pricing-hint">À partir de 15% du salaire annuel brut</div>
              <Link href="/inscription-recruteur" className="btn btn-primary">Commencer</Link>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🚀</div>
              <h3>Mission Freelance</h3>
              <p>
                Accédez à notre réseau de consultants indépendants pour vos projets spécifiques et temporaires.
              </p>
              <div className="pricing-hint">Commission 8-12%</div>
              <Link href="/inscription-recruteur" className="btn btn-secondary">Explorer</Link>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3>Chasse de Têtes</h3>
              <p>
                Approche discrète et ciblée pour dénicher les talents les plus rares sur le marché.
              </p>
              <div className="pricing-hint">Tarif sur mesure</div>
              <Link href="/inscription-recruteur" className="btn btn-secondary">En savoir plus</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials">
        <div className="container">
          <h2 className="section-title">Ce que disent nos clients</h2>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="stars">⭐⭐⭐⭐⭐</div>
              <p className="testimonial-text">
                "SM Consulting a trouvé notre Lead Developer en moins de 2 semaines. Processus fluide et candidats de qualité."
              </p>
              <div className="testimonial-author">
                <strong>Marie Dubois</strong>
                <span>DRH, Tech Startup Paris</span>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="stars">⭐⭐⭐⭐⭐</div>
              <p className="testimonial-text">
                "Un vrai partenaire de confiance. Ils comprennent nos besoins et nous proposent toujours des profils pertinents."
              </p>
              <div className="testimonial-author">
                <strong>Thomas Martin</strong>
                <span>CTO, Scale-up Lyon</span>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="stars">⭐⭐⭐⭐⭐</div>
              <p className="testimonial-text">
                "Après 3 mois de recherche infructueuse, SM Consulting a trouvé notre DevOps Senior en 10 jours. Impressionnant!"
              </p>
              <div className="testimonial-author">
                <strong>Sophie Laurent</strong>
                <span>Responsable IT, PME Toulouse</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="process">
        <div className="container">
          <h2 className="section-title">Comment ça marche ?</h2>
          <p className="section-subtitle">Un processus simple et efficace en 4 étapes</p>
          <div className="process-steps">
            <div className="process-step">
              <div className="step-number">1</div>
              <h3>Décrivez votre besoin</h3>
              <p>Remplissez le formulaire en 2 minutes. Gratuit et sans engagement.</p>
            </div>
            <div className="process-step">
              <div className="step-number">2</div>
              <h3>Recevez des profils qualifiés</h3>
              <p>Nous vous présentons 3-5 candidats pré-sélectionnés sous 48h.</p>
            </div>
            <div className="process-step">
              <div className="step-number">3</div>
              <h3>Rencontrez les candidats</h3>
              <p>Organisez des entretiens avec nos experts présents pour vous guider.</p>
            </div>
            <div className="process-step">
              <div className="step-number">4</div>
              <h3>Recrutez sereinement</h3>
              <p>Nous vous accompagnons jusqu'à l'intégration complète du candidat.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Urgency Banner */}
      <section className="urgency-banner">
        <div className="container">
          <div className="urgency-content">
            <span className="urgency-icon">🔥</span>
            <p className="urgency-text">
              <strong>Offre limitée :</strong> Les 10 premiers recruteurs bénéficient de 20% de réduction + 1 audit gratuit de vos processus RH (valeur 500€)
            </p>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="cta">
        <div className="container">
          <h2 className="cta-title">Prêt à recruter votre prochain talent ?</h2>
          <p className="cta-subtitle">
            Rejoignez 50+ entreprises qui nous font confiance. Premier échange gratuit et sans engagement.
          </p>
          <div className="cta-benefits">
            <div className="benefit-item">✓ Réponse en 24h</div>
            <div className="benefit-item">✓ Devis personnalisé gratuit</div>
            <div className="benefit-item">✓ Accompagnement dédié</div>
          </div>
          <div className="cta-actions">
            <Link href="/inscription-recruteur" className="btn btn-accent btn-large btn-pulse">
              🚀 Commencer gratuitement
            </Link>
            <Link href="/contact" className="btn btn-secondary btn-large">📞 Être rappelé sous 2h</Link>
          </div>
          <p className="cta-guarantee">
            <span className="guarantee-icon">🛡️</span>
            Garantie satisfait ou remboursé - Aucun risque
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq">
        <div className="container">
          <h2 className="section-title">Questions fréquentes</h2>
          <div className="faq-grid">
            <div className="faq-item">
              <h3>💰 Quels sont vos tarifs ?</h3>
              <p>Recrutement permanent : 15% du salaire annuel brut. Freelance : commission 8-12%. Chasse de têtes : sur devis. Premier audit RH offert.</p>
            </div>
            <div className="faq-item">
              <h3>⏱️ Combien de temps prend un recrutement ?</h3>
              <p>En moyenne 14 jours entre votre demande et la présentation de candidats qualifiés. Les profils les plus demandés peuvent être trouvés en 7 jours.</p>
            </div>
            <div className="faq-item">
              <h3>🎯 Quelle est votre garantie ?</h3>
              <p>Si le candidat quitte l'entreprise dans les 3 premiers mois, nous recherchons un remplaçant gratuitement. Satisfaction garantie à 100%.</p>
            </div>
            <div className="faq-item">
              <h3>📋 Quels profils IT recrutez-vous ?</h3>
              <p>Développeurs (Full-stack, Front, Back), DevOps, Data Scientists, Chefs de projet, Architectes, Product Owners, SCRUM Masters, et plus encore.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}