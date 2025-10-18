import { useState, useEffect } from 'react';

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  // Montrer le bouton quand on descend de 300px
  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {visible && (
        <button onClick={scrollToTop} className="scroll-to-top" aria-label="Retour en haut">
          ↑
        </button>
      )}
      <style jsx>{`
        .scroll-to-top {
          position: fixed;
          bottom: 40px;
          right: 40px;
          background-color: var(--primary);
          color: white;
          border: none;
          border-radius: 50%;
          width: 50px;
          height: 50px;
          font-size: 28px;
          cursor: pointer;
          box-shadow: var(--shadow-lg);
          transition: background-color 0.3s, transform 0.3s;
          z-index: 10000;
        }
        .scroll-to-top:hover {
          background-color: var(--primary-dark);
          transform: scale(1.1);
        }
      `}</style>
    </>
  );
}
