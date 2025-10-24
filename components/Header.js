import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="container">
        <Link href="/" className="logo">
          SM Consulting<span className="logo-badge">PRO</span>
        </Link>
        
        <button 
          className="menu-toggle" 
          aria-label="Toggle navigation"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰
        </button>
        
        <nav className={`nav ${isMenuOpen ? 'open' : ''}`}>
          <Link href="/" className="nav-link">Accueil</Link>
          <Link href="/candidats" className="nav-link">Candidats</Link>
          <Link href="/postuler" className="nav-link">Postuler</Link>
          <Link href="/offres" className="nav-link">Offres</Link>
          <Link href="/coaptation" className="nav-link">Coaptation</Link>
          
          {/* Admin links - visible only in admin section */}
          {typeof window !== 'undefined' && window.location.pathname.startsWith('/admin') && (
            <>
              <Link href="/admin/leads" className="nav-link">Leads</Link>
              <Link href="/admin/revenue" className="nav-link">Revenue</Link>
            </>
          )}
        </nav>
        
        <div className="header-actions">
          <Link href="/inscription-recruteur" className="btn btn-primary">
            Espace Recruteurs
          </Link>
        </div>
      </div>
      
      <style jsx>{`
        .header {
          background: white;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 70px;
        }

        .logo {
          font-size: 24px;
          font-weight: 700;
          color: var(--primary);
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .logo-badge {
          background: linear-gradient(135deg, var(--primary), var(--secondary));
          color: white;
          font-size: 12px;
          padding: 2px 6px;
          border-radius: 4px;
        }

        .menu-toggle {
          display: none;
          background: none;
          border: none;
          font-size: 24px;
          cursor: pointer;
          color: var(--primary);
        }

        .nav {
          display: flex;
          align-items: center;
          gap: 30px;
        }

        .nav-link {
          text-decoration: none;
          color: var(--text);
          font-weight: 500;
          transition: color 0.2s;
          position: relative;
        }

        .nav-link:hover {
          color: var(--primary);
        }

        .nav-link.active {
          color: var(--primary);
        }

        .nav-link.active::after {
          content: '';
          position: absolute;
          bottom: -24px;
          left: 0;
          right: 0;
          height: 3px;
          background: var(--primary);
          border-radius: 3px;
        }

        .header-actions {
          display: flex;
          gap: 15px;
        }

        .btn {
          text-decoration: none;
          padding: 10px 20px;
          border-radius: 8px;
          font-weight: 600;
          transition: all 0.2s;
          cursor: pointer;
          border: none;
          font-size: 14px;
        }

        .btn-primary {
          background: linear-gradient(135deg, var(--primary), var(--secondary));
          color: white;
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        @media (max-width: 768px) {
          .menu-toggle {
            display: block;
          }

          .nav {
            position: fixed;
            top: 70px;
            left: 0;
            right: 0;
            background: white;
            flex-direction: column;
            gap: 0;
            clip-path: polygon(0 0, 100% 0, 100% 0, 0 0);
            transition: clip-path 0.3s ease;
            box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
          }

          .nav.open {
            clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
          }

          .nav-link {
            padding: 15px 20px;
            border-bottom: 1px solid #eee;
            width: 100%;
          }

          .nav-link.active::after {
            display: none;
          }

          .header-actions {
            display: none;
          }
        }
      `}</style>
    </header>
  );
}