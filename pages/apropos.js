export default function Apropos() {
  return (
    <>
      {/* Section Hero */}
      <section className="hero">
        <div className="container">
          <h1 className="hero-title">À propos de SM Consulting</h1>
          <p className="hero-subtitle">Notre vision, notre mission et notre approche</p>
        </div>
      </section>

      {/* Section Contenu */}
      <section className="features">
        <div className="feature-card">
          <h2>Notre Philosophie</h2>
          <p>
            Chez SM Consulting, nous croyons que la réussite d'une organisation dépend de sa capacité à anticiper,
            à s'adapter et à exécuter vite et bien. Nos consultants combinent rigueur analytique, maîtrise
            technologique et compréhension humaine des dynamiques d'entreprise.
          </p>

          <h3>Notre Approche</h3>
          <p>
            Chaque mission est pensée comme un partenariat : nous challengeons, conseillons et co-construisons
            avec nos clients pour transformer leurs ambitions en leviers de performance. Notre ADN repose sur
            la lucidité stratégique, l'excellence opérationnelle et le sens du concret.
          </p>

          <h3>Notre Engagement</h3>
          <p>
            Nous nous engageons à délivrer des résultats mesurables et durables, alignés sur les enjeux réels
            du terrain. Notre objectif est de créer un impact significatif pour chaque client, en alliant
            expertise technique et vision business.
          </p>
        </div>
      </section>

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
        }
        .feature-card h2,
        .feature-card h3 {
          margin-bottom: 8px;
          color: var(--primary);
        }
        .feature-card p {
          margin-bottom: 1.5rem;
          line-height: 1.8;
          color: var(--text);
        }
        @media (max-width: 768px) {
          .hero {
            padding: 120px 0 60px;
          }
        }
      `}</style>
    </>
  );
}
