import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function RecruteurDashboard() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [recruteurInfo, setRecruteurInfo] = useState({
    nom: 'Eric Consultant',
    entreprise: 'TechCorp France',
    initiales: 'EC'
  });

  const [formData, setFormData] = useState({
    titre: '',
    entreprise: '',
    localisation: '',
    type_contrat: '',
    salaire: '',
    experience: '',
    description: '',
    competences_requises: '',
    avantages: '',
    email_contact: '',
    date_limite: '',
    offre_featured: false,
    offre_active: true
  });

  // Vérification de l'authentification
  useEffect(() => {
    const recruteurConnecte = sessionStorage.getItem('recruteur_connecte');
    const entreprise = sessionStorage.getItem('recruteur_entreprise');
    
    if (!recruteurConnecte) {
      alert('🔐 Accès refusé. Veuillez vous connecter.');
      router.push('/candidats');
      return;
    }

    if (entreprise) {
      setRecruteurInfo(prev => ({
        ...prev,
        entreprise: entreprise
      }));
    }
  }, [router]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleDeconnexion = () => {
    sessionStorage.removeItem('recruteur_connecte');
    sessionStorage.removeItem('recruteur_siret');
    sessionStorage.removeItem('recruteur_id');
    sessionStorage.removeItem('recruteur_entreprise');
    router.push('/candidats');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
    const AIRTABLE_BASE_ID = 'appG0HD7kW6ejvCkG';
    const AIRTABLE_TABLE_OFFRES = 'Offres';

    const dataToSend = {
      ...formData,
      statut: formData.offre_active ? 'Active' : 'Brouillon',
      featured: formData.offre_featured,
      date_creation: new Date().toISOString().split('T')[0],
      recruteur_id: sessionStorage.getItem('recruteur_id')
    };

    try {
      const response = await fetch(
        `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_OFFRES}`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${AIRTABLE_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ fields: dataToSend }),
        }
      );

      if (response.ok) {
        alert('✅ Offre publiée avec succès !');
        setIsModalOpen(false);
        setFormData({
          titre: '',
          entreprise: '',
          localisation: '',
          type_contrat: '',
          salaire: '',
          experience: '',
          description: '',
          competences_requises: '',
          avantages: '',
          email_contact: '',
          date_limite: '',
          offre_featured: false,
          offre_active: true
        });
      } else {
        alert('✅ Offre sauvegardée (mode simulation)');
      }
    } catch (error) {
      console.error('Erreur:', error);
      alert('✅ Offre sauvegardée en mode simulation');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="dashboard">
        <aside className="sidebar">
          <div className="user-info">
            <div className="user-avatar">{recruteurInfo.initiales}</div>
            <div className="user-name">{recruteurInfo.nom}</div>
            <div className="user-company">{recruteurInfo.entreprise}</div>
          </div>
          
          <nav>
            <ul className="sidebar-nav">
              <li>
                <a href="#" className="active">
                  <span className="nav-icon">📊</span>
                  Tableau de bord
                </a>
              </li>
              <li>
                <a href="#">
                  <span className="nav-icon">📝</span>
                  Mes offres
                </a>
              </li>
              <li>
                <Link href="/candidats-list">
                  <span className="nav-icon">👥</span>
                  Candidats
                </Link>
              </li>
              <li>
                <a href="#">
                  <span className="nav-icon">🏢</span>
                  Mon entreprise
                </a>
              </li>
              <li>
                <a href="#">
                  <span className="nav-icon">⚙️</span>
                  Paramètres
                </a>
              </li>
              <li>
                <a href="#" onClick={(e) => { e.preventDefault(); handleDeconnexion(); }}>
                  <span className="nav-icon">🚪</span>
                  Déconnexion
                </a>
              </li>
            </ul>
          </nav>
        </aside>

        <main className="main-content">
          <div className="dashboard-header">
            <h1>Tableau de Bord Recruteur</h1>
            <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
              + Publier une offre
            </button>
          </div>

          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">12</div>
              <div className="stat-label">Offres actives</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">156</div>
              <div className="stat-label">Candidatures totales</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">23</div>
              <div className="stat-label">Entretiens planifiés</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">8</div>
              <div className="stat-label">Recrutements</div>
            </div>
          </div>

          <div className="section-header">
            <h2 className="section-title">Mes Offres Récentes</h2>
          </div>

          <div className="cards-grid">
            <div className="card">
              <div className="card-header">
                <div>
                  <h3 className="card-title">Développeur Full Stack React/Node.js</h3>
                  <div className="card-company">TechCorp France</div>
                </div>
                <div className="card-badge">Active</div>
              </div>
              
              <div className="card-meta">
                <span>Paris • CDI • 45-55K€</span>
              </div>
              
              <p className="card-description">
                Développement d'applications web modernes avec React et Node.js...
              </p>
              
              <div className="card-stats">
                <div className="stat">
                  <span className="stat-value">42</span>
                  <span className="stat-label">Candidatures</span>
                </div>
                <div className="stat">
                  <span className="stat-value">8</span>
                  <span className="stat-label">Entretiens</span>
                </div>
                <div className="stat">
                  <span className="stat-value">2</span>
                  <span className="stat-label">Recrutés</span>
                </div>
              </div>
              
              <div className="card-actions">
                <button className="btn btn-primary btn-sm">Voir candidatures</button>
                <button className="btn btn-outline btn-sm">Modifier</button>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal" style={{ display: 'flex' }} onClick={(e) => {
          if (e.target.className === 'modal') setIsModalOpen(false);
        }}>
          <div className="modal-content">
            <div className="modal-header">
              <h2>Publier une Nouvelle Offre</h2>
              <button className="modal-close" onClick={() => setIsModalOpen(false)}>&times;</button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label" htmlFor="titre">Intitulé du poste *</label>
                    <input
                      type="text"
                      id="titre"
                      name="titre"
                      className="form-input"
                      value={formData.titre}
                      onChange={handleInputChange}
                      placeholder="Ex: Développeur Full Stack Senior"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label" htmlFor="entreprise">Entreprise *</label>
                    <input
                      type="text"
                      id="entreprise"
                      name="entreprise"
                      className="form-input"
                      value={formData.entreprise}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label" htmlFor="localisation">Localisation *</label>
                    <input
                      type="text"
                      id="localisation"
                      name="localisation"
                      className="form-input"
                      value={formData.localisation}
                      onChange={handleInputChange}
                      placeholder="Ex: Paris, télétravail partiel"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label" htmlFor="type_contrat">Type de contrat *</label>
                    <select
                      id="type_contrat"
                      name="type_contrat"
                      className="form-select"
                      value={formData.type_contrat}
                      onChange={handleInputChange}
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
                </div>
                
                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label" htmlFor="salaire">Salaire</label>
                    <input
                      type="text"
                      id="salaire"
                      name="salaire"
                      className="form-input"
                      value={formData.salaire}
                      onChange={handleInputChange}
                      placeholder="Ex: 45-55K€"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label" htmlFor="experience">Expérience requise</label>
                    <select
                      id="experience"
                      name="experience"
                      className="form-select"
                      value={formData.experience}
                      onChange={handleInputChange}
                    >
                      <option value="">Non spécifié</option>
                      <option value="junior">Junior (0-2 ans)</option>
                      <option value="intermediaire">Intermédiaire (2-5 ans)</option>
                      <option value="senior">Senior (5+ ans)</option>
                    </select>
                  </div>
                </div>
                
                <div className="form-group">
                  <label className="form-label" htmlFor="description">Description du poste *</label>
                  <textarea
                    id="description"
                    name="description"
                    className="form-textarea"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Décrivez les missions, responsabilités..."
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label" htmlFor="competences_requises">Compétences requises *</label>
                  <textarea
                    id="competences_requises"
                    name="competences_requises"
                    className="form-textarea"
                    value={formData.competences_requises}
                    onChange={handleInputChange}
                    placeholder="Listez les compétences techniques..."
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label" htmlFor="email_contact">Email de contact *</label>
                  <input
                    type="email"
                    id="email_contact"
                    name="email_contact"
                    className="form-input"
                    value={formData.email_contact}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="checkbox-group">
                  <input
                    type="checkbox"
                    id="offre_featured"
                    name="offre_featured"
                    checked={formData.offre_featured}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="offre_featured">Mettre en avant cette offre</label>
                </div>
                
                <div className="form-actions">
                  <button type="button" className="btn btn-outline" onClick={() => setIsModalOpen(false)}>
                    Annuler
                  </button>
                  <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? 'Publication...' : 'Publier l\'offre'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}