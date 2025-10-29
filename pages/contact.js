import { useState } from 'react';
import Link from 'next/link';

export default function Contact() {
  const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
  const AIRTABLE_BASE_ID = 'appG0HD7kW6ejvCkG';
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
        // Scroll vers le message de succès
        setTimeout(() => {
          document.querySelector('.success-message')?.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
          });
        }, 100);
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

  const contactInfo = [
    {
      icon: '📧',
      title: 'Email',
      value: 'contact@rh-prospects.fr',
      link: 'mailto:contact@rh-prospects.fr'
    },
    {
      icon: '📞',
      title: 'Téléphone',
      value: '+33 (0)19 25 75 88',
      link: 'tel:+33619257588'
    },
    {
      icon: '🏢',
      title: 'SIRET',
      value: '438 184 707 00083',
      link: null
    }
  ];

  const reasons = [
    {
      icon: '💼',
      title: 'Recruter',
      description: 'Trouvez les meilleurs talents IT pour votre entreprise',
      link: '/inscription-recruteur'
    },
    {
      icon: '🎯',
      title: 'Postuler',
      description: 'Rejoignez notre réseau de consultants experts',
      link: '/postuler'
    },
    {
      icon: '🤝',
      title: 'Partenariat',
      description: 'Devenez partenaire et développez votre activité',
      link: '/coaptation'
    }
  ];

  return (
    <>
      {/* Hero */}
      <section className="contact-hero">
        <div className="container">
          <h1>Contactez-nous</h1>
          <p>Une question ? Un projet ? Nous sommes à votre écoute</p>
        </div>
      </section>

      {/* Informations de contact */}
      <section style={{ padding: '60px 0', background: 'var(--surface)' }}>
        <div className="container">
          <div className="contact-info-grid">
            {contactInfo.map((info, index) => (
              <div key={index} className="contact-info-card">
                <div className="contact-info-icon">{info.icon}</div>
                <h3>{info.title}</h3>
                {info.link ? (
                  <a href={info.link} className="contact-info-value">
                    {info.value}
                  </a>
                ) : (
                  <p className="contact-info-value">{info.value}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pourquoi nous contacter */}
      <section style={{ padding: '60px 0' }}>
        <div className="container">
          <h2 className="section-title">Pourquoi nous contacter ?</h2>
          <p className="section-subtitle">Plusieurs bonnes raisons de nous écrire</p>
          <div className="reasons-grid">
            {reasons.map((reason, index) => (
              <Link key={index} href={reason.link} className="reason-card">
                <div className="reason-icon">{reason.icon}</div>
                <h3>{reason.title}</h3>
                <p>{reason.description}</p>
                <span className="reason-arrow">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Formulaire */}
      <section className="features">
        <div className="container">
          <div className="contact-form-container">
            <div className="form-header">
              <h2>Formulaire de Contact</h2>
              <p>Laissez-nous un message, nous vous recontacterons sous 24h</p>
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
                <label htmlFor="nom" className="form-label">Nom complet *</label>
                <input
                  type="text"
                  id="nom"
                  name="nom"
                  className="form-input"
                  placeholder="Jean Dupont"
                  value={formData.nom}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="email" className="form-label">Email professionnel *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-input"
                    placeholder="jean.dupont@entreprise.com"
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
                    placeholder="+33 6 12 34 56 78"
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
                  placeholder="Nom de votre entreprise"
                  value={formData.company}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="sujet" className="form-label">Sujet de votre demande *</label>
                <select
                  id="sujet"
                  name="sujet"
                  className="form-select"
                  value={formData.sujet}
                  onChange={handleChange}
                  required
                >
                  <option value="">Sélectionnez un sujet</option>
                  <option value="recrutement">Recrutement de talents IT</option>
                  <option value="portage">Portage salarial</option>
                  <option value="candidature">Candidature spontanée</option>
                  <option value="partenariat">Partenariat / Coaptation</option>
                  <option value="information">Demande d'information</option>
                  <option value="autre">Autre sujet</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="message" className="form-label">Votre message *</label>
                <textarea
                  id="message"
                  name="message"
                  className="form-textarea"
                  placeholder="Décrivez votre projet, vos besoins ou posez-nous vos questions..."
                  value={formData.message}
                  onChange={handleChange}
                  rows="6"
                  required
                />
              </div>

              <button 
                type="submit" 
                className="btn btn-primary btn-large" 
                disabled={loading}
                style={{ width: '100%' }}
              >
                {loading ? '⏳ Envoi en cours...' : '📤 Envoyer le message'}
              </button>

              <p style={{ fontSize: '14px', color: 'var(--text-light)', textAlign: 'center', marginTop: '16px' }}>
                En soumettant ce formulaire, vous acceptez notre{' '}
                <Link href="/confidentialite" style={{ color: 'var(--primary)' }}>
                  politique de confidentialité
                </Link>
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ rapide */}
      <section style={{ padding: '60px 0', background: 'var(--surface)' }}>
        <div className="container">
          <h2 className="section-title">Questions fréquentes</h2>
          <div className="faq-grid">
            <div className="faq-card">
              <h3>⏱️ Délai de réponse</h3>
              <p>Nous nous engageons à vous répondre sous 24h ouvrées</p>
            </div>
            <div className="faq-card">
              <h3>💼 Secteurs d'activité</h3>
              <p>Nous travaillons avec tous les secteurs nécessitant des profils IT</p>
            </div>
            <div className="faq-card">
              <h3>🌍 Zone géographique</h3>
              <p>France entière et missions internationales possibles</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}