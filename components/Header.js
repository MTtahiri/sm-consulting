import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const navLinks = [
    { href: '/', label: 'Accueil' },
    { href: '/candidats', label: 'Candidats' },
    { href: '/postuler', label: 'Postuler' },
    { href: '/offres', label: 'Offres' },
    { href: '/coaptation', label: 'Coaptation' },
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="logo">SM Consulting</div>
        <button onClick={toggleMenu} className="menu-toggle" aria-label="Toggle navigation">
          ☰
        </button>
        <nav className={`nav ${isOpen ? 'open' : ''}`}>
          {navLinks.map(({ href, label }) => (
            <Link key={href} href={href} legacyBehavior>
              <a className={router.pathname === href ? 'nav-link active' : 'nav-link'} onClick={() => setIsOpen(false)}>
                {label}
              </a>
            </Link>
          ))}
        </nav>
      </div>

      <style jsx>{`
        .menu-toggle {
          display: none;
          font-size: 24px;
          background: none;
          border: none;
          cursor: pointer;
        }
        .nav {
          display: flex;
          gap: 32px;
        }
        @media (max-width: 768px) {
          .menu-toggle {
            display: block;
          }
          .nav {
            position: absolute;
            top: 64px;
            right: 0;
            background: white;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            flex-direction: column;
            align-items: start;
            width: 200px;
            padding: 1rem;
            display: none;
            z-index: 1001;
          }
          .nav.open {
            display: flex;
          }
          .nav-link {
            padding: 10px 0;
            width: 100%;
            border-bottom: 1px solid var(--border);
          }
        }
      `}</style>
    </header>
  );
}
