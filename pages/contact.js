import { useState } from 'react';

export default function Contact() {
  const AIRTABLE_API_KEY = '***REMOVED***';
  const AIRTABLE_BASE_ID = '***REMOVED***';
  const AIRTABLE_TABLE_CONTACTS = 'Contacts';

  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    telephone: '',
    company: '',
    sujet: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [successVisible, setSuccessVisible] = useState(false);
  const [errorVisible, setErrorVisible] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessVisible(false);
    setErrorVisible(false);

    const dataToSend = {
      ...formData,
      source: 'page_contact',
      date_contact: new Date().toISOString().split('T')[0],
    };

    try {
      const res = await fetch(
        `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_CONTACTS}`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${AIRTABLE_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ fields: dataToSend }),
        }
      );

      if (res.ok) {
        setSuccessVisible(true);
        setFormData({
          nom: '',
          email: '',
          telephone: '',
          company: '',
          sujet: '',
          message: ''
        });
      } else {
        setErrorVisible(true);
      }
    } catch (error) {
      console.error('Erreur envoi contact:', error);
      setErrorVisible(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="contact-hero">
        <div className="container">
          <h1>Contactez-nous</h1>
          <p>Une question ? Un projet ? Nous sommes à votre écoute</p>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <div className="contact-form-container">
            <div className="form-header">
              <h2>Formulaire de Contact</h2>
              <p>Laissez-nous un message, nous vous recontacterons rapidement</p>
            </div>
            <form className="form-content" onSubmit={handleSubmit}>
              {successVisible && (
                <div className="success-message" role="alert">
                  ✅ Votre message a été envoyé avec succès ! Nous vous recontacterons rapidement.
                </div>
              )}
              {errorVisible && (
                <div className="error-message" role="alert">
                  ❌ Une erreur est survenue. Veuillez réessayer.
                </div>
              )}
              <div className="form-group">
                <label htmlFor="nom" className="form-label">Nom *</label>
                <input
                  type="text"
                  id="nom"
                  name="nom"
                  className="form-input"
                  value={formData.nom}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="email" className="form-label">Email *</label>
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
                  <label htmlFor="telephone" className="form-label">Téléphone *</label>
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
              <div className="form-group">
                <label htmlFor="company" className="form-label">Entreprise</label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  className="form-input"
                  value={formData.company}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="sujet" className="form-label">Sujet *</label>
                <select
                  id="sujet"
                  name="sujet"
                  className="form-select"
                  value={formData.sujet}
                  onChange={handleChange}
                  required
                >
                  <option value="">Sélectionnez un sujet</option>
                  <option value="recrutement">Recrutement</option>
                  <option value="portage">Portage</option>
                  <option value="candidature">Candidature</option>
                  <option value="partenariat">Partenariat</option>
                  <option value="autre">Autre</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="message" className="form-label">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  className="form-textarea"
                  placeholder="Décrivez votre projet, vos besoins ou posez-nous vos questions..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Envoi en cours...' : 'Envoyer le message'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
