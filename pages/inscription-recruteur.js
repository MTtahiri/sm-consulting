import { useState } from 'react';
import Link from 'next/link';

export default function InscriptionRecruteur() {
  const [formData, setFormData] = useState({
    entreprise: '',
    siret: '',
    nom_contact: '',
    prenom_contact: '',
    email: '',
    telephone: '',
    secteur_activite: '',
    taille_entreprise: '',
    besoins: '',
    accepte_cgu: false
  });
  const [loading, setLoading] = useState(false);
  const [successVisible, setSuccessVisible] = useState(false);
  const [errorVisible, setErrorVisible] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessVisible(false);
    setErrorVisible(false);

    // ✅ CORRECTION : Adapter aux champs EXACTS de votre table
    const dataToSend = {
      entreprise: formData.entreprise || 'Non renseigné',
      siret: formData.siret || 'Non renseigné',
      nom_contact: formData.nom_contact || 'Non renseigné',
      prenom_contact: formData.prenom_contact || 'Non renseigné',
      email: formData.email || 'non-renseigne@example.com',
      telephone: formData.telephone || 'Non renseigné',
      // ❌ SUPPRIMER les champs qui n'existent pas dans la table
      // secteur_activite: formData.secteur_activite, // N'EXISTE PAS
      // taille_entreprise: formData.taille_entreprise, // N'EXISTE PAS
      // besoins: formData.besoins, // N'EXISTE PAS
      statut: 'En attente',
      date_inscription: new Date().toISOString().split('T')[0]
    };

    console.log('🚀 Données envoyées à Airtable:', dataToSend);

    try {
      const response = await fetch('/api/airtable/Recruteurs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fields: dataToSend }),
      });

      const result = await response.json();
      console.log('🔍 Réponse Airtable:', result);

      if (result.success) {
        setSuccessVisible(true);
        setFormData({
          entreprise: '',
          siret: '',
          nom_contact: '',
          prenom_contact: '',
          email: '',
          telephone: '',
          secteur_activite: '',
          taille_entreprise: '',
          besoins: '',
          accepte_cgu: false
        });
        
        setTimeout(() => {
          document.querySelector('.success-message')?.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
          });
        }, 100);
      } else {
        console.error('Erreur Airtable détaillée:', result.error);
        setErrorVisible(true);
      }
    } catch (error) {
      console.error('Erreur envoi:', error);
      setErrorVisible(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="hero-postuler">
        <div className="container">
          <h1>Inscription Recruteur</h1>
          <p>Accédez à notre réseau de talents IT qualifiés</p>
        </div>
      </section>

      <section className="form-section">
        <div className="container">
          <div className="form-container">
            <div className="form-header">
              <h1>Créez votre compte recruteur</h1>
              <p>Remplissez ce formulaire pour accéder à notre base de candidats</p>
            </div>

            <form onSubmit={handleSubmit} className="form-content">
              {successVisible && (
                <div className="success-message" role="alert">
                  ✅ Inscription réussie ! Votre compte sera validé sous 24h. Vous recevrez un email de confirmation.
                </div>
              )}
              {errorVisible && (
                <div className="error-message" role="alert">
                  ❌ Une erreur est survenue. Veuillez réessayer ou nous contacter.
                </div>
              )}

              <div className="form-group">
                <label className="form-label" htmlFor="entreprise">Nom de l'entreprise *</label>
                <input
                  type="text"
                  id="entreprise"
                  name="entreprise"
                  className="form-input"
                  value={formData.entreprise}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="siret">Numéro SIRET *</label>
                <input
                  type="text"
                  id="siret"
                  name="siret"
                  className="form-input"
                  maxLength="14"
                  placeholder="14 chiffres"
                  value={formData.siret}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label" htmlFor="prenom_contact">Prénom *</label>
                  <input
                    type="text"
                    id="prenom_contact"
                    name="prenom_contact"
                    className="form-input"
                    value={formData.prenom_contact}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="nom_contact">Nom *</label>
                  <input
                    type="text"
                    id="nom_contact"
                    name="nom_contact"
                    className="form-input"
                    value={formData.nom_contact}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label" htmlFor="email">Email professionnel *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-input"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="telephone">Téléphone *</label>
                  <input
                    type="tel"
                    id="telephone"
                    name="telephone"
                    className="form-input"
                    value={formData.telephone}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* ❌ SUPPRIMER les champs qui n'existent pas dans la table */}
              {/* 
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label" htmlFor="secteur_activite">Secteur d'activité</label>
                  <select
                    id="secteur_activite"
                    name="secteur_activite"
                    className="form-select"
                    value={formData.secteur_activite}
                    onChange={handleChange}
                  >
                    <option value="">Sélectionnez...</option>
                    <option value="IT/Tech">IT/Tech</option>
                    <option value="Finance">Finance</option>
                    <option value="E-commerce">E-commerce</option>
                    <option value="Industrie">Industrie</option>
                    <option value="Services">Services</option>
                    <option value="Autre">Autre</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="taille_entreprise">Taille de l'entreprise</label>
                  <select
                    id="taille_entreprise"
                    name="taille_entreprise"
                    className="form-select"
                    value={formData.taille_entreprise}
                    onChange={handleChange}
                  >
                    <option value="">Sélectionnez...</option>
                    <option value="1-10">1-10 employés</option>
                    <option value="11-50">11-50 employés</option>
                    <option value="51-200">51-200 employés</option>
                    <option value="201-500">201-500 employés</option>
                    <option value="500+">500+ employés</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="besoins">Vos besoins en recrutement</label>
                <textarea
                  id="besoins"
                  name="besoins"
                  className="form-textarea"
                  placeholder="Décrivez les profils que vous recherchez..."
                  value={formData.besoins}
                  onChange={handleChange}
                />
              </div>
              */}

              <div className="checkbox-group">
                <input
                  type="checkbox"
                  id="accepte_cgu"
                  name="accepte_cgu"
                  checked={formData.accepte_cgu}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="accepte_cgu">
                  J'accepte les <Link href="/cgu" style={{ color: 'var(--primary)' }}>CGU</Link> et la{' '}
                  <Link href="/confidentialite" style={{ color: 'var(--primary)' }}>politique de confidentialité</Link> *
                </label>
              </div>

              <div className="form-actions" style={{ justifyContent: 'center' }}>
                <button type="submit" className="btn btn-primary btn-large" disabled={loading}>
                  {loading ? '⏳ Envoi en cours...' : '✅ Créer mon compte'}
                </button>
              </div>

              <p style={{ textAlign: 'center', marginTop: '24px', color: 'var(--text-light)' }}>
                Déjà inscrit ? <Link href="/candidats" style={{ color: 'var(--primary)', fontWeight: 600 }}>Se connecter</Link>
              </p>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}