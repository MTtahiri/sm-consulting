export default function CGU() {
  return (
    <>
      {/* Section Hero */}
      <section className="hero">
        <div className="container">
          <h1 className="hero-title">Conditions Générales d'Utilisation</h1>
          <p className="hero-subtitle">CGU</p>
        </div>
      </section>

      {/* Contenu CGU */}
      <section className="features">
        <div className="feature-card">
          <p>
            L'accès et l'utilisation du site SM Consulting impliquent l'acceptation pleine et entière des présentes CGU.
            L'utilisateur s'engage à utiliser le site conformément à la loi, aux bonnes mœurs et à la finalité du service proposé.
          </p>
          <h3>Responsabilités</h3>
          <p>
            SM Consulting s'efforce d'assurer l'exactitude et la mise à jour des informations publiées, sans pour autant
            pouvoir être tenue responsable des erreurs, omissions ou indisponibilités temporaires du site.
          </p>
          <p>
            L'utilisateur est responsable de l'usage qu'il fait du site et des informations qu'il y consulte.
          </p>
          <p>
            SM Consulting ne saurait être tenue responsable en cas de dommages matériels ou immatériels liés à l'utilisation
            du site ou à un accès non autorisé.
          </p>
          <h3>Sécurité</h3>
          <p>
            L'utilisateur s'engage à ne pas perturber le fonctionnement du site, ni à tenter d'accéder à des données non autorisées.
          </p>
        </div>
      </section>

      {/* Ici, PAS de footer local : il sera injecté par le Layout */}

      <style jsx>{`
        :root {
          --primary: #2563eb;
          --primary-dark: #1d4ed8;
          --secondary: #00c4b4;
          --text: #1e293b;
          --text-light: #64748b;
          --background: #ffffff;
          --surface: #f8fafc;
          --border: #e2e8f0;
          --shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Inter', Arial, sans-serif;
        }
        body {
          background: var(--background);
          color: var(--text);
          line-height: 1.6;
        }
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }
        .hero {
          padding: 160px 0 80px;
          background: var(--surface);
          text-align: center;
        }
        .hero-title {
          font-size: 32px;
          font-weight: 700;
          color: var(--text);
          margin-bottom: 12px;
        }
        .hero-subtitle {
          color: var(--text-light);
          margin-bottom: 40px;
          font-size: 18px;
        }
        .features {
          max-width: 800px;
          margin: 0 auto 80px;
          padding: 0 20px;
        }
        .feature-card {
          background: var(--background);
          padding: 24px;
          border-radius: 12px;
          border: 1px solid var(--border);
          box-shadow: var(--shadow);
          color: var(--text);
          line-height: 1.8;
        }
        .feature-card h3 {
          margin-bottom: 1rem;
          color: var(--primary);
        }
      `}</style>
    </>
  );
}
