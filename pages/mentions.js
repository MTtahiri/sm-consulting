export default function Mentions() {
  return (
    <>
      {/* Section Hero */}
      <section className="hero">
        <div className="container">
          <h1 className="hero-title">Mentions légales</h1>
          <p className="hero-subtitle">Informations légales et conditions d'utilisation</p>
        </div>
      </section>

      {/* Contenu */}
      <section className="features">
        <div className="container">
          <div className="feature-card" style={{ maxWidth: 800, margin: '0 auto' }}>
            <h2>Éditeur du site</h2>
            <p style={{ lineHeight: 1.8, marginBottom: '2rem' }}>
              SM Consulting<br />
              SIRET : 438 184 707 00083<br />
              Email : <a href="mailto:contact@rh-prospects.fr">contact@rh-prospects.fr</a>
            </p>

            <h2>Hébergement</h2>
            <p style={{ lineHeight: 1.8, marginBottom: '2rem' }}>
              Le site est hébergé par Vercel Inc<br />
              440 N Barranca Ave #4133, Covina, CA 91723, États-Unis<br />
              Site : <a href="https://vercel.com" target="_blank" rel="noopener noreferrer">https://vercel.com</a>
            </p>

            <h2>Propriété intellectuelle</h2>
            <p style={{ lineHeight: 1.8, marginBottom: '2rem' }}>
              L&apos;ensemble des éléments constituant le site (textes, images, logos, etc.) est la propriété exclusive&nbsp;
              de SM Consulting. Toute reproduction ou représentation totale ou partielle de ce site par quelque procédé&nbsp;
              que ce soit, sans autorisation expresse, est interdite.
            </p>

            <h2>Responsabilité</h2>
            <p style={{ lineHeight: 1.8, marginBottom: '2rem' }}>
              SM Consulting ne pourra être tenue pour responsable des dommages directs ou indirects résultant de&nbsp;
              l&apos;accès ou de l&apos;utilisation du site, y compris l&apos;inaccessibilité, les pertes de données, détériorations,&nbsp;
              destructions ou virus qui pourraient affecter l&apos;équipement informatique de l&apos;utilisateur.
            </p>

            <h2>Liens hypertextes</h2>
            <p style={{ lineHeight: 1.8 }}>
              Le site peut contenir des liens vers d&apos;autres sites. SM Consulting n&apos;exerce aucun contrôle sur ces sites&nbsp;
              et décline toute responsabilité concernant leur contenu et leurs pratiques en matière de protection des&nbsp;
              données personnelles.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
