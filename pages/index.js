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
        {/* Urgent Banner */}
        <section className="urgent-banner">
          <div className="container">
            <div className="urgent-content">
              <div className="urgent-badge">🔥 URGENT - Places limitées cette semaine!</div>
              <p className="urgent-text">
                Nos 3 meilleurs consultants React sont réservés d'ici 48h. 
                Obtenez un accès exclusif en prenant un appel de 15 minutes avec notre expert.
              </p>
              <div className="urgent-cta">
                <Link href="/inscription-recruteur" className="btn btn-primary btn-large">
                  🚀 Réserver mon appel (48 places restantes)
                </Link>
              </div>
              <div className="kpi-display">
                <span className="kpi-number">48</span>
                <span className="kpi-label">Places restantes</span>
              </div>
            </div>
          </div>
        </section>

        {/* Hero */}
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
                <div className="hero-actions">
                  <Link href="/inscription-recruteur" className="btn btn-primary btn-large">Recruter un talent</Link>
                  <Link href="/candidats" className="btn btn-secondary btn-large">Découvrir nos candidats</Link>
                </div>
                <div className="hero-stats">
                  <div className="stat">
                    <div className="stat-number">15+</div>
                    <div className="stat-label">Années d'expertise</div>
                  </div>
                  <div className="stat">
                    <div className="stat-number">20+</div>
                    <div className="stat-label">Talents placés</div>
                  </div>
                  <div className="stat">
                    <div className="stat-number">98%</div>
                    <div className="stat-label">Taux de réussite</div>
                  </div>
                </div>
              </div>
              <div className="hero-image">
                <div className="hero-img">
                  🚀 Image Professionnelle<br />Recrutement IT
                </div>
              </div>
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
              <div className="feature-card">
                <div className="feature-icon">💼</div>
                <h3>Recrutement Permanent</h3>
                <p>
                  Recrutement de profils CDI et CDD avec une garantie de réussite et un processus optimisé.
                </p>
                <Link href="/inscription-recruteur" className="btn btn-secondary">Découvrir</Link>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🚀</div>
                <h3>Mission Freelance</h3>
                <p>
                  Accédez à notre réseau de consultants indépendants pour vos projets spécifiques et temporaires.
                </p>
                <Link href="/inscription-recruteur" className="btn btn-secondary">Explorer</Link>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🎯</div>
                <h3>Chasse de Têtes</h3>
                <p>
                  Approche discrète et ciblée pour dénicher les talents les plus rares sur le marché.
                </p>
                <Link href="/inscription-recruteur" className="btn btn-secondary">En savoir plus</Link>
              </div>
            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="cta">
          <div className="container">
            <h2 className="cta-title">Prêt à transformer votre recrutement ?</h2>
            <p className="cta-subtitle">
              Rejoignez les entreprises qui nous font confiance et accédez à des talents vérifiés et qualifiés.
            </p>
            <div className="cta-actions">
              <Link href="/inscription-recruteur" className="btn btn-accent btn-large">Commencer maintenant</Link>
              <Link href="/contact" className="btn btn-secondary btn-large">Nous contacter</Link>
            </div>
          </div>
        </section>
      </main>

      <style jsx>{`
        /* Urgent Banner Styles */
        .urgent-banner {
          background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%);
          padding: 30px 0;
          border-bottom: 4px solid #ef4444;
        }

        .urgent-content {
          text-align: center;
          max-width: 800px;
          margin: 0 auto;
        }

        .urgent-badge {
          background: #ef4444;
          color: white;
          display: inline-block;
          padding: 8px 16px;
          border-radius: 20px;
          font-weight: 600;
          font-size: 16px;
          margin-bottom: 16px;
        }

        .urgent-text {
          color: #991b1b;
          font-weight: 500;
          margin-bottom: 24px;
          font-size: 18px;
          line-height: 1.5;
        }

        .urgent-cta {
          margin-bottom: 20px;
        }

        .kpi-display {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: white;
          padding: 8px 16px;
          border-radius: 20px;
          font-weight: 600;
        }

        .kpi-number {
          font-size: 24px;
          color: #ef4444;
        }

        .kpi-label {
          font-size: 14px;
          color: #991b1b;
        }

        /* Existing styles from global.css */
        .hero {
          padding: 80px 0;
          background: linear-gradient(135deg, #f8f9ff 0%, #ffffff 100%);
        }

        .hero-with-image {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
        }

        .hero-content {
          max-width: 600px;
        }

        .hero-title {
          font-size: 48px;
          font-weight: 800;
          line-height: 1.2;
          margin-bottom: 20px;
          color: #1f2937;
        }

        .gradient-text {
          background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-subtitle {
          font-size: 18px;
          color: #6b7280;
          margin-bottom: 30px;
          line-height: 1.6;
        }

        .hero-actions {
          display: flex;
          gap: 16px;
          margin-bottom: 40px;
          flex-wrap: wrap;
        }

        .btn {
          text-decoration: none;
          padding: 12px 24px;
          border-radius: 8px;
          font-weight: 600;
          transition: all 0.2s;
          cursor: pointer;
          border: none;
          font-size: 16px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }

        .btn-large {
          padding: 16px 32px;
          font-size: 18px;
        }

        .btn-primary {
          background: linear-gradient(135deg, var(--primary), var(--secondary));
          color: white;
        }

        .btn-secondary {
          background: white;
          color: var(--primary);
          border: 2px solid var(--primary);
        }

        .btn-accent {
          background: linear-gradient(135deg, #f59e0b, #d97706);
          color: white;
        }

        .btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .hero-stats {
          display: flex;
          gap: 40px;
        }

        .stat {
          text-align: center;
        }

        .stat-number {
          font-size: 36px;
          font-weight: 800;
          color: var(--primary);
          line-height: 1;
        }

        .stat-label {
          font-size: 14px;
          color: #6b7280;
          margin-top: 8px;
        }

        .hero-image {
          display: flex;
          justify-content: center;
        }

        .hero-img {
          width: 100%;
          max-width: 500px;
          height: 400px;
          background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 600;
          text-align: center;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        }

        .features {
          padding: 100px 0;
          background: white;
        }

        .section-title {
          text-align: center;
          font-size: 36px;
          font-weight: 800;
          color: #1f2937;
          margin-bottom: 16px;
        }

        .section-subtitle {
          text-align: center;
          font-size: 18px;
          color: #6b7280;
          margin-bottom: 60px;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 30px;
        }

        .feature-card {
          background: #f8f9ff;
          padding: 40px 30px;
          border-radius: 16px;
          text-align: center;
          transition: all 0.3s ease;
          border: 1px solid #e5e7eb;
        }

        .feature-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          border-color: var(--primary);
        }

        .feature-icon {
          font-size: 48px;
          margin-bottom: 20px;
        }

        .feature-card h3 {
          font-size: 24px;
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 16px;
        }

        .feature-card p {
          color: #6b7280;
          margin-bottom: 24px;
          line-height: 1.6;
        }

        .cta {
          padding: 100px 0;
          background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
          color: white;
          text-align: center;
        }

        .cta-title {
          font-size: 40px;
          font-weight: 800;
          margin-bottom: 20px;
        }

        .cta-subtitle {
          font-size: 18px;
          opacity: 0.9;
          margin-bottom: 40px;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .cta-actions {
          display: flex;
          gap: 20px;
          justify-content: center;
          margin-bottom: 40px;
          flex-wrap: wrap;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
        }

        @media (max-width: 768px) {
          .hero {
            padding: 40px 0;
          }

          .hero-with-image {
            grid-template-columns: 1fr;
            gap: 40px;
          }

          .hero-title {
            font-size: 36px;
          }

          .hero-actions {
            flex-direction: column;
          }

          .hero-stats {
            gap: 20px;
          }

          .stat-number {
            font-size: 28px;
          }

          .features, .cta {
            padding: 60px 0;
          }

          .section-title {
            font-size: 28px;
          }

          .cta-title {
            font-size: 32px;
          }

          .cta-actions {
            flex-direction: column;
          }
        }
      `}</style>
    </>
  );
}