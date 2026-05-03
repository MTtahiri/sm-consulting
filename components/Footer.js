import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <Link href="/" className="footer-logo">
              SM Consulting <span>PRO</span>
            </Link>
            <p>
              Votre partenaire de confiance pour le recrutement IT en France.
              Nous connectons entreprises et talents depuis plus de 15 ans.
            </p>
            <a href="mailto:contact@rh-prospects.fr" className="footer-email">
              ✉ contact@rh-prospects.fr
            </a>
          </div>

          <div className="footer-links">
            <h4>Navigation</h4>
            <Link href="/">Accueil</Link>
            <Link href="/candidats">Candidats</Link>
            <Link href="/offres">Offres d'emploi</Link>
            <Link href="/tarifs">Tarifs</Link>
            <Link href="/cooptation">Cooptation</Link>
            <Link href="/contact">Contact</Link>
          </div>

          <div className="footer-links">
            <h4>Légal &amp; Services</h4>
            <Link href="/postuler">Postuler</Link>
            <Link href="/inscription-recruteur">Espace Recruteurs</Link>
            <Link href="/cgu">CGU</Link>
            <Link href="/confidentialite">Confidentialité</Link>
            <Link href="/mentions">Mentions légales</Link>
            <Link href="/cookies">Cookies</Link>
          </div>
        </div>

        <div className="footer-bottom">
          © 2025 SM Consulting. Tous droits réservés.
        </div>
      </div>

      <style jsx>{`
        .footer-logo {
          display: inline-block;
          font-size: 20px;
          font-weight: 700;
          color: var(--primary);
          text-decoration: none;
          margin-bottom: 16px;
        }

        .footer-logo span {
          background: linear-gradient(135deg, var(--primary), var(--secondary));
          color: white;
          font-size: 11px;
          padding: 2px 6px;
          border-radius: 4px;
          margin-left: 6px;
          vertical-align: middle;
        }

        .footer-email {
          display: inline-block;
          margin-top: 14px;
          color: var(--primary);
          text-decoration: none;
          font-weight: 500;
          font-size: 14px;
        }

        .footer-email:hover {
          text-decoration: underline;
        }
      `}</style>
    </footer>
  );
}
