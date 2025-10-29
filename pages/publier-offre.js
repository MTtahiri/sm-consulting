import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function PublierOffre() {
  const router = useRouter();
  const [recruteur, setRecruteur] = useState(null);
  const [isSiretValid, setIsSiretValid] = useState(false);
  const [offers, setOffers] = useState([
    {
      id: 1,
      titre: '',
      description: '',
      competences: '',
      lieu: '',
      typeContrat: '',
      salaire: '',
      dateDebut: '',
      contact: ''
    }
  ]);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    // Check if recruiter is logged in
    const recruteurSession = sessionStorage.getItem('recruteur_connecte');
    if (recruteurSession) {
      const recruteurData = JSON.parse(recruteurSession);
      setRecruteur(recruteurData);
      
      // In a real implementation, we would check if the SIRET is validated
      // For now, we'll assume it's valid if the recruiter is logged in
      setIsSiretValid(true);
    } else {
      // Redirect to login if not authenticated
      router.push('/connexion-recruteur');
    }
  }, [router]);

  const handleInputChange = (id, field, value) => {
    setOffers(prevOffers => 
      prevOffers.map(offer => 
        offer.id === id ? { ...offer, [field]: value } : offer
      )
    );
  };

  const addNewOffer = () => {
    setOffers(prevOffers => [
      ...prevOffers,
      {
        id: prevOffers.length + 1,
        titre: '',
        description: '',
        competences: '',
        lieu: '',
        typeContrat: '',
        salaire: '',
        dateDebut: '',
        contact: ''
      }
    ]);
  };

  const removeOffer = (id) => {
    if (offers.length > 1) {
      setOffers(prevOffers => prevOffers.filter(offer => offer.id !== id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // In a real implementation, we would save to Airtable or another database
    console.log('Offers to publish:', offers);
    
    // Show success message
    setShowSuccess(true);
    
    // Reset form after a delay
    setTimeout(() => {
      setOffers([
        {
          id: 1,
          titre: '',
          description: '',
          competences: '',
          lieu: '',
          typeContrat: '',
          salaire: '',
          dateDebut: '',
          contact: ''
        }
      ]);
      setShowSuccess(false);
    }, 3000);
  };

  if (!recruteur) {
    return (
      <div className="container">
        <div className="loading">Chargement...</div>
      </div>
    );
  }

  return (
    <>
      <section className="hero">
        <div className="container">
          <h1>Publier une offre d'emploi</h1>
          <p>Renseignez les détails de votre poste à pourvoir.</p>
        </div>
      </section>

      <section className="form-section">
        <div className="container">
          {!isSiretValid ? (
            <div className="validation-message">
              <h2>Votre profil doit être validé avant de publier une offre.</h2>
              <p>Veuillez contacter le support pour valider votre numéro de SIRET.</p>
              <Link href="/connexion-recruteur" className="btn btn-primary">
                Retour à l'espace recruteur
              </Link>
            </div>
          ) : (
            <div className="form-container">
              {showSuccess && (
                <div className="success-message">
                  Vos offres ont bien été publiées !
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                {offers.map((offer, index) => (
                  <div className="offer-form" key={offer.id}>
                    {offers.length > 1 && (
                      <div className="offer-header">
                        <h3>Offre #{index + 1}</h3>
                        {offers.length > 1 && (
                          <button 
                            type="button" 
                            className="btn btn-outline remove-offer"
                            onClick={() => removeOffer(offer.id)}
                          >
                            Supprimer
                          </button>
                        )}
                      </div>
                    )}
                    
                    <div className="form-grid">
                      <div className="form-group">
                        <label className="form-label" htmlFor={`titre-${offer.id}`}>
                          Intitulé du poste *
                        </label>
                        <input
                          type="text"
                          id={`titre-${offer.id}`}
                          className="form-input"
                          value={offer.titre}
                          onChange={(e) => handleInputChange(offer.id, 'titre', e.target.value)}
                          required
                        />
                      </div>
                      
                      <div className="form-group">
                        <label className="form-label" htmlFor={`lieu-${offer.id}`}>
                          Lieu du poste *
                        </label>
                        <input
                          type="text"
                          id={`lieu-${offer.id}`}
                          className="form-input"
                          value={offer.lieu}
                          onChange={(e) => handleInputChange(offer.id, 'lieu', e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="form-group">
                      <label className="form-label" htmlFor={`description-${offer.id}`}>
                        Description du poste *
                      </label>
                      <textarea
                        id={`description-${offer.id}`}
                        className="form-textarea"
                        rows="4"
                        value={offer.description}
                        onChange={(e) => handleInputChange(offer.id, 'description', e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="form-group">
                      <label className="form-label" htmlFor={`competences-${offer.id}`}>
                        Compétences requises *
                      </label>
                      <textarea
                        id={`competences-${offer.id}`}
                        className="form-textarea"
                        rows="3"
                        value={offer.competences}
                        onChange={(e) => handleInputChange(offer.id, 'competences', e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="form-grid">
                      <div className="form-group">
                        <label className="form-label" htmlFor={`typeContrat-${offer.id}`}>
                          Type de contrat *
                        </label>
                        <select
                          id={`typeContrat-${offer.id}`}
                          className="form-select"
                          value={offer.typeContrat}
                          onChange={(e) => handleInputChange(offer.id, 'typeContrat', e.target.value)}
                          required
                        >
                          <option value="">Sélectionnez...</option>
                          <option value="CDI">CDI</option>
                          <option value="CDD">CDD</option>
                          <option value="Freelance">Freelance</option>
                          <option value="Stage">Stage</option>
                          <option value="Alternance">Alternance</option>
                        </select>
                      </div>
                      
                      <div className="form-group">
                        <label className="form-label" htmlFor={`salaire-${offer.id}`}>
                          TJM ou salaire (facultatif)
                        </label>
                        <input
                          type="text"
                          id={`salaire-${offer.id}`}
                          className="form-input"
                          value={offer.salaire}
                          onChange={(e) => handleInputChange(offer.id, 'salaire', e.target.value)}
                        />
                      </div>
                    </div>
                    
                    <div className="form-grid">
                      <div className="form-group">
                        <label className="form-label" htmlFor={`dateDebut-${offer.id}`}>
                          Date de début souhaitée
                        </label>
                        <input
                          type="date"
                          id={`dateDebut-${offer.id}`}
                          className="form-input"
                          value={offer.dateDebut}
                          onChange={(e) => handleInputChange(offer.id, 'dateDebut', e.target.value)}
                        />
                      </div>
                      
                      <div className="form-group">
                        <label className="form-label" htmlFor={`contact-${offer.id}`}>
                          Contact (email ou téléphone) *
                        </label>
                        <input
                          type="text"
                          id={`contact-${offer.id}`}
                          className="form-input"
                          value={offer.contact}
                          onChange={(e) => handleInputChange(offer.id, 'contact', e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </div>
                ))}
                
                <div className="form-actions">
                  <button 
                    type="button" 
                    className="btn btn-secondary"
                    onClick={addNewOffer}
                  >
                    + Nouvelle offre
                  </button>
                  
                  <button type="submit" className="btn btn-primary">
                    Publier
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </section>

      <style jsx>{`
        .hero {
          background: linear-gradient(135deg, var(--primary), var(--secondary));
          color: white;
          padding: 60px 0;
          text-align: center;
        }
        
        .hero h1 {
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }
        
        .hero p {
          font-size: 1.2rem;
          opacity: 0.9;
          max-width: 600px;
          margin: 0 auto;
        }
        
        .form-section {
          padding: 60px 0;
        }
        
        .validation-message {
          text-align: center;
          padding: 60px 20px;
          background: var(--surface);
          border-radius: 8px;
        }
        
        .validation-message h2 {
          margin-bottom: 1rem;
          color: var(--primary);
        }
        
        .form-container {
          background: white;
          border-radius: 8px;
          box-shadow: var(--shadow);
          padding: 30px;
          max-width: 800px;
          margin: 0 auto;
        }
        
        .success-message {
          background: #d1fae5;
          color: #065f46;
          padding: 15px;
          border-radius: 8px;
          margin-bottom: 30px;
          text-align: center;
          font-weight: 600;
        }
        
        .offer-form {
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 25px;
          margin-bottom: 30px;
          background: var(--surface);
        }
        
        .offer-form:last-child {
          margin-bottom: 30px;
        }
        
        .offer-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          padding-bottom: 15px;
          border-bottom: 1px solid var(--border);
        }
        
        .offer-header h3 {
          margin: 0;
          color: var(--primary);
        }
        
        .remove-offer {
          padding: 8px 16px;
          font-size: 0.9rem;
        }
        
        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 20px;
        }
        
        .form-group {
          margin-bottom: 20px;
        }
        
        .form-label {
          display: block;
          margin-bottom: 8px;
          font-weight: 600;
          color: var(--text);
        }
        
        .form-input,
        .form-select,
        .form-textarea {
          width: 100%;
          padding: 12px 15px;
          border: 1px solid var(--border);
          border-radius: 8px;
          font-family: inherit;
          font-size: 1rem;
          transition: border-color 0.2s;
        }
        
        .form-input:focus,
        .form-select:focus,
        .form-textarea:focus {
          outline: none;
          border-color: var(--primary);
          box-shadow: 0 0 0 3px rgba(37, 87, 167, 0.1);
        }
        
        .form-textarea {
          min-height: 120px;
          resize: vertical;
        }
        
        .form-actions {
          display: flex;
          justify-content: space-between;
          margin-top: 30px;
          padding-top: 30px;
          border-top: 1px solid var(--border);
        }
        
        .btn {
          padding: 12px 24px;
          border-radius: 8px;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          border: none;
          transition: all 0.2s;
          text-decoration: none;
          display: inline-block;
          text-align: center;
        }
        
        .btn-primary {
          background: linear-gradient(135deg, var(--primary), var(--secondary));
          color: white;
        }
        
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-lg);
        }
        
        .btn-secondary {
          background: var(--surface);
          color: var(--text);
          border: 1px solid var(--border);
        }
        
        .btn-secondary:hover {
          background: #e2e8f0;
        }
        
        .btn-outline {
          background: transparent;
          color: var(--primary);
          border: 1px solid var(--primary);
        }
        
        .btn-outline:hover {
          background: rgba(37, 87, 167, 0.1);
        }
        
        @media (max-width: 768px) {
          .hero h1 {
            font-size: 2rem;
          }
          
          .hero p {
            font-size: 1rem;
          }
          
          .form-container {
            padding: 20px;
          }
          
          .offer-form {
            padding: 20px;
          }
          
          .form-grid {
            grid-template-columns: 1fr;
            gap: 15px;
          }
          
          .form-actions {
            flex-direction: column;
            gap: 15px;
          }
          
          .btn {
            width: 100%;
          }
        }
      `}</style>
    </>
  );
}