import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Head>
        <title>SM Consulting - Recrutement IT Haut de Gamme</title>
        <meta name="description" content="SM Consulting - Recrutement IT Haut de Gamme" />
      </Head>

      <main>
        {/* Hero Section with Urgent CTA */}
        <section className="hero">
          <div className="container">
            <div className="hero-with-image">
              <div className="hero-content">
                <h1 className="hero-title">
                  Trouvez les talents <span className="gradient-text">qui font la différence</span>
                </h1>
                <p className="hero-subtitle">
                  SM Consulting connecte les entreprises aux meilleurs profils IT. Notre approche sur mesure et notre expertise du marché vous garantissent des recrutements réussis.
                </p>
                
                {/* Urgent CTA */}
                <div className="urgent-cta">
                  <div className="urgent-badge">🔥 URGENT - Places limitées cette semaine!</div>
                  <p className="urgent-text">
                    Nos 3 meilleurs consultants React sont réservés d'ici 48h. 
                    Obtenez un accès exclusif en prenant un appel de 15 minutes avec notre expert.
                  </p>
                </div>
                
                <div className="hero-actions">
                  <Link href="/inscription-recruteur" className="btn btn-primary btn-large">
                    🚀 Recruter un talent (urgent!)
                  </Link>
                  <Link href="/candidats" className="btn btn-secondary btn-large">
                    Découvrir nos candidats
                  </Link>
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
                    <div className="stat-label">Taux de réussite</div>
                  </div>
                </div>
              </div>
              <div className="hero-image">
                <div className="hero-img">🚀 Image Professionnelle<br/>Recrutement IT</div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="features">
          <div className="container">
            <h2 className="section-title">Notre expertise à votre service</h2>
            <p className="section-subtitle">Des solutions complètes pour répondre à tous vos besoins en recrutement IT</p>
            
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">💼</div>
                <h3>Recrutement Permanent</h3>
                <p>Recrutement de profils CDI et CDD avec une garantie de réussite et un processus optimisé.</p>
                <Link href="/inscription-recruteur" className="btn btn-secondary">Découvrir</Link>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon">🚀</div>
                <h3>Mission Freelance</h3>
                <p>Accédez à notre réseau de consultants indépendants pour vos projets spécifiques et temporaires.</p>
                <Link href="/inscription-recruteur" className="btn btn-secondary">Explorer</Link>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon">🎯</div>
                <h3>Chasse de Têtes</h3>
                <p>Approche discrète et ciblée pour dénicher les talents les plus rares sur le marché.</p>
                <Link href="/inscription-recruteur" className="btn btn-secondary">En savoir plus</Link>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="testimonials">
          <div className="container">
            <h2 className="section-title">Ils nous font confiance</h2>
            <p className="section-subtitle">Découvrez les témoignages de nos clients satisfaits</p>
            
            <div className="testimonials-grid">
              <div className="testimonial-card">
                <div className="testimonial-content">
                  "SM Consulting a trouvé le profil parfait pour notre projet en seulement 5 jours. Leur expertise est impressionnante!"
                </div>
                <div className="testimonial-author">
                  <div className="author-name">Marie Dubois</div>
                  <div className="author-title">CTO, TechInnov</div>
                </div>
              </div>
              
              <div className="testimonial-card">
                <div className="testimonial-content">
                  "Grâce à SM Consulting, nous avons recruté un développeur senior qui a doublé notre productivité en 3 mois."
                </div>
                <div className="testimonial-author">
                  <div className="author-name">Thomas Martin</div>
                  <div className="author-title">Directeur Technique, WebScale</div>
                </div>
              </div>
              
              <div className="testimonial-card">
                <div className="testimonial-content">
                  "Leur approche personnalisée et leur réseau de talents exceptionnels font toute la différence."
                </div>
                <div className="testimonial-author">
                  <div className="author-name">Sophie Laurent</div>
                  <div className="author-title">RH, DigitalFirst</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="cta">
          <div className="container">
            <h2 className="cta-title">Prêt à transformer votre recrutement ?</h2>
            <p className="cta-subtitle">Rejoignez les entreprises qui nous font confiance et accédez à des talents vérifiés et qualifiés.</p>
            <div className="cta-actions">
              <Link href="/inscription-recruteur" className="btn btn-accent btn-large">
                🚀 Commencer maintenant (urgent!)
              </Link>
              <Link href="/contact" className="btn btn-secondary btn-large">
                Nous contacter
              </Link>
            </div>
            
            {/* Social Proof */}
            <div className="social-proof">
              <p>✅ Déjà 50+ entreprises nous ont fait confiance cette semaine</p>
              <p>✅ 98% de nos clients recommandent nos services</p>
              <p>✅ Placement garanti ou satisfaction totale</p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}