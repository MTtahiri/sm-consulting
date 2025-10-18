import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function ConnexionRecruteur() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    const recruteur = sessionStorage.getItem('recruteur_connecte');
    if (recruteur) {
      router.replace('/recruteur-dashboard');
    }
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowError(false);

    try {
      const storedRecruteur = localStorage.getItem('recruteur_' + email);
      let recruteur = null;
      if (storedRecruteur) {
        const data = JSON.parse(storedRecruteur);
        if (data.password === password) {
          recruteur = data;
        }
      }

      if (recruteur) {
        sessionStorage.setItem('recruteur_connecte', JSON.stringify(recruteur));
        alert('🔐 Connexion réussie !');
        router.push('/recruteur-dashboard');
      } else {
        setShowError(true);
      }
    } catch (error) {
      console.error(error);
      setShowError(true);
    }
  };

  return (
    <>
      <section className="hero">
        <div className="container">
          <h1>Espace Recruteur</h1>
          <p>Connectez-vous pour gérer vos offres et candidatures</p>
        </div>
      </section>

      <section className="form-section">
        <div className="container">
          <div className="form-container">
            <div className="form-header">
              <h1>Connexion</h1>
              <p>Accédez à votre espace recruteur</p>
            </div>

            <form id="connexionForm" className="form-content" onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label" htmlFor="email">Email professionnel *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-input"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="password">Mot de passe *</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="form-input"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
                {showError && (
                  <div className="error-message" role="alert">
                    Email ou mot de passe incorrect
                  </div>
                )}
              </div>

              <button type="submit" className="btn btn-primary">Se connecter</button>

              <div className="inscription-link">
                Pas encore de compte ? <Link href="/inscription-recruteur" className="nav-link">S'inscrire</Link>
              </div>
            </form>
          </div>
        </div>
      </section>

      <style jsx>{`
        /* Style conservé identique */
        :root {
          --primary-color: #2563eb;
          --primary-dark: #1d4ed8;
          --secondary-color: #64748b;
          --light-color: #f8fafc;
          --dark-color: #1e293b;
          --success-color: #10b981;
        }
        /* Styles pour formulaire, conteneur, etc. */
        ...
      `}</style>
    </>
  );
}
