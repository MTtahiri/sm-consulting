import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function InscriptionRecruteur() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    entreprise: '',
    siret: '',
    email: '',
    telephone: '',
    password: '',
    confirm_password: '',
    secteur: '',
  });
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrorMsg('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirm_password) {
      setErrorMsg('Les mots de passe ne correspondent pas');
      return;
    }
    if (formData.password.length < 6) {
      setErrorMsg('Le mot de passe doit contenir au moins 6 caractères');
      return;
    }

    const dataToSave = {
      entreprise: formData.entreprise,
      siret: formData.siret,
      email: formData.email,
      telephone: formData.telephone,
      password: formData.password,
      secteur: formData.secteur,
      date_inscription: new Date().toISOString().split('T')[0],
      statut: 'Actif',
    };

    try {
      if (typeof window.AirtableService !== 'undefined') {
        const result = await window.AirtableService.saveToAirtable('Recruteurs', dataToSave);
        if (result.success) {
          alert('🎉 Compte créé avec succès ! Vous pouvez maintenant vous connecter.');
          router.push('/connexion-recruteur');
          return;
        }
      }

      localStorage.setItem('recruteur_' + dataToSave.email, JSON.stringify(dataToSave));
      alert('✅ Compte créé avec succès ! Vous pouvez maintenant vous connecter.');
      router.push('/connexion-recruteur');
    } catch (error) {
      console.error('Erreur inscription recruteur:', error);
      alert('Erreur lors de la création du compte. Veuillez réessayer.');
    }
  };

  return (
    <>
      {/* Section Hero */}
      <section className="hero">
        <div className="container">
          <h1>Inscription Recruteur</h1>
          <p>Créez votre compte pour publier des offres et trouver des talents</p>
        </div>
      </section>

      {/* Section Formulaire */}
      <section className="form-section">
        <div className="container">
          <div className="form-container">
            <div className="form-header">
              <h1>Créer un compte recruteur</h1>
              <p>Remplissez ce formulaire pour accéder à l&apos;espace recruteur</p>
            </div>
            <form className="form-content" onSubmit={handleSubmit} noValidate>
              {errorMsg && (
                <p style={{ color: 'red', marginTop: '1rem', fontWeight: '600' }} role="alert">
                  {errorMsg}
                </p>
              )}

              <div className="form-group">
                <label>Entreprise</label>
                <input
                  type="text"
                  name="entreprise"
                  value={formData.entreprise}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>SIRET</label>
                <input
                  type="text"
                  name="siret"
                  value={formData.siret}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Téléphone</label>
                <input
                  type="tel"
                  name="telephone"
                  value={formData.telephone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Secteur d&apos;activité</label>
                <input
                  type="text"
                  name="secteur"
                  value={formData.secteur}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Mot de passe</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Confirmer le mot de passe</label>
                <input
                  type="password"
                  name="confirm_password"
                  value={formData.confirm_password}
                  onChange={handleChange}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary">Créer mon compte</button>

              <div className="login-link">
                Déjà un compte ? <Link href="/connexion-recruteur">Se connecter</Link>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
