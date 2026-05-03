import { useState } from 'react';
import Link from 'next/link';

export default function Cooptation() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: ''
  });
  const [showMessage, setShowMessage] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setShowMessage(false);

    // ✅ CORRECTION : Utiliser votre API Next.js au lieu d'Airtable directement
    // ✅ CORRECTION : Adapter aux champs EXACTS de votre table "Coaptation"
    const dataToSend = {
      prenom: formData.name.split(' ')[0] || 'Non renseigné', // Extraire le prénom
      nom: formData.name.split(' ').slice(1).join(' ') || 'Non renseigné', // Extraire le nom
      email: formData.email || 'non-renseigne@example.com',
      telephone: formData.phone || 'Non renseigné',
      entreprise_actuelle: formData.company || 'Non renseigné',
      statut: 'Nouveau',
      date_inscription: new Date().toISOString().split('T')[0],
      source: 'Site Web'
    };

    console.log('🚀 Données envoyées à Airtable:', dataToSend);

    try {
      // ✅ CORRECTION : Utiliser votre propre API route
      const response = await fetch('/api/airtable/Coaptation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fields: dataToSend }),
      });

      const result = await response.json();
      console.log('🔍 Réponse Airtable:', result);

      if (result.success) {
        setShowMessage(true);
        setFormData({ name: '', email: '', phone: '', company: '' });
        setTimeout(() => {
          document.getElementById('formMessage')?.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
          });
        }, 100);
      } else {
        console.error('Erreur Airtable détaillée:', result.error);
        alert('Erreur lors de l\'envoi. Veuillez réessayer.');
      }
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur lors de l\'envoi. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <h1 className="hero-title">
              Programme <span className="gradient-text">Cooptation</span>
            </h1>
            <p className="hero-subtitle">
              Générez des revenus passifs en recommandant des clients recruteurs. 
              Bénéficiez de <strong>50% de commission</strong> avec un processus 100% transparent 
              et des délais de paiement optimisés.
            </p>
            <div className="hero-actions">
              <a href="#inscription" className="btn btn-primary btn-large">
                Devenir Cooptant
              </a>
              <a href="#fonctionnement" className="btn btn-secondary btn-large">
                Comment ça marche
              </a>
            </div>
            
            <div className="hero-stats">
              <div className="stat">
                <div className="stat-number">50%</div>
                <div className="stat-label">Commission</div>
              </div>
              <div className="stat">
                <div className="stat-number">36k€</div>
                <div className="stat-label">Gains annuels max</div>
              </div>
              <div className="stat">
                <div className="stat-number">24h</div>
                <div className="stat-label">Activation compte</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Fonctionnement */}
      <section id="fonctionnement" className="features">
        <div className="container">
          <h2 className="section-title">Notre processus en 3 étapes</h2>
          <p className="section-subtitle">
            Un système simple et transparent pour maximiser vos revenus
          </p>
          
          <div className="features-grid">
            <div className="feature-card">
              <h3>Recommandation</h3>
              <p>
                Partagez nos services à votre réseau professionnel : 
                anciens employeurs, partenaires ou contacts recruteurs.
              </p>
            </div>
            
            <div className="feature-card">
              <h3>Accompagnement</h3>
              <p>
                Notre équipe prend en charge tout le processus de recrutement 
                et la relation client pour vous.
              </p>
            </div>
            
            <div className="feature-card">
              <h3>Rémunération</h3>
              <p>
                Recevez <strong>50% de la commission</strong> dès le début 
                de la mission du consultant.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section Témoignages */}
      <section className="features" style={{ background: 'var(--surface)' }}>
        <div className="container">
          <h2 className="section-title">Ils nous font confiance</h2>
          <p className="section-subtitle">
            Découvrez les retours d'expérience de nos cooptants
          </p>
          
          <div className="features-grid">
            <div className="feature-card">
              <div style={{ fontStyle: 'italic', marginBottom: '20px' }}>
                "J'ai recommandé <strong>3 clients cette année</strong> et j'ai déjà perçu 
                plus de <strong>21k€ de commission</strong>. La transparence du processus 
                et le suivi personnalisé font toute la différence."
              </div>
              <div>
                <strong>Sophie Martin</strong><br />
                <span style={{ color: 'var(--text-light)' }}>Développeuse Full Stack</span>
              </div>
            </div>
            
            <div className="feature-card">
              <div style={{ fontStyle: 'italic', marginBottom: '20px' }}>
                "Mon ancien employeur recherchait un Data Scientist. 
                SM Consulting a parfaitement matché le profil, et j'ai touché 
                <strong>12k€ de commission</strong>. Un partenariat gagnant-gagnant !"
              </div>
              <div>
                <strong>Thomas Leroy</strong><br />
                <span style={{ color: 'var(--text-light)' }}>DevOps Engineer</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Calcul des Gains */}
      <section className="features">
        <div className="container">
          <h2 className="section-title">Simulateur de gains</h2>
          <p className="section-subtitle">
            Estimez vos revenus potentiels avec notre programme
          </p>
          
          <div className="features-grid">
            {[
              {
                title: 'Startup Tech',
                employees: '50 employés',
                description: 'Recrutement de 2 développeurs React et 1 DevOps Engineer',
                total: '48k€',
                part: '24k€'
              },
              {
                title: 'PME E-commerce',
                employees: '150 employés',
                description: 'Recrutement d\'1 Architecte Solution et 1 Data Engineer',
                total: '12k€',
                part: '6k€'
              },
              {
                title: 'Grand Groupe',
                employees: '5000+ employés',
                description: 'Recrutement d\'une équipe de 8 développeurs full-stack',
                total: '115.2k€',
                part: '57.6k€'
              }
            ].map((item, index) => (
              <div key={index} className="feature-card">
                <div className="gain-card-header">
                  <h3 style={{ margin: 0, fontSize: '1.3rem', color: 'white' }}>{item.title}</h3>
                  <div className="gain-badge">{item.employees}</div>
                </div>
                <p style={{ color: 'var(--text-light)', marginBottom: '20px' }}>
                  {item.description}
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div className="gain-row">
                    <span style={{ color: 'var(--text-light)' }}>Commission totale</span>
                    <strong style={{ color: 'var(--text)' }}>{item.total}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: 'var(--text-light)' }}>Votre part (50%)</span>
                    <strong style={{ color: 'var(--primary)', fontSize: '1.2rem' }}>{item.part}</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section CTA Inscription */}
      <section id="inscription" className="cta">
        <div className="container">
          <h2 className="cta-title">Rejoignez notre programme Cooptation</h2>
          <p className="cta-subtitle">
            Démarrez dès maintenant et générez des revenus complémentaires 
            en recommandant des clients de qualité.
          </p>
          
          <div className="coaptation-form-wrapper">
            {showMessage && (
              <div id="formMessage" className="form-success-message">
                Merci ! Nous vous recontacterons sous 24h pour activer votre compte cooptation.
              </div>
            )}
            
            <form onSubmit={handleSubmit} id="coaptationForm">
              <div className="coaptation-form-grid">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Votre nom complet (Prénom Nom)"
                  className="coaptation-input"
                  required
                />
                
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Votre email professionnel"
                  className="coaptation-input"
                  required
                />
                
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Votre téléphone"
                  className="coaptation-input"
                />
                
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  placeholder="Entreprise actuelle (optionnel)"
                  className="coaptation-input"
                />
              </div>
              
              <button
                type="submit"
                className="btn btn-primary btn-large"
                disabled={isSubmitting}
                style={{ width: '100%' }}
              >
                {isSubmitting ? 'Envoi en cours...' : 'Devenir Cooptant'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}