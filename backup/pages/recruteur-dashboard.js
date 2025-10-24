import { useState } from 'react';
import Link from 'next/link';

export default function RecruteurDashboard() {
  const [modalOpen, setModalOpen] = useState(false);

  // Offres simulées
  const [offres, setOffres] = useState([
    {
      id: 1,
      titre: "Développeur Full Stack React/Node.js",
      entreprise: "TechCorp France",
      statut: "Active",
      localisation: "Paris",
      type_contrat: "CDI",
      salaire: "45-55K€",
      description: "Développement d'applications web modernes avec React et Node.js. Collaboration avec l'équipe produit...",
      candidatures: 42,
      entretiens: 8,
      recrutes: 2,
    },
    {
      id: 2,
      titre: "Data Scientist Senior",
      entreprise: "DataInnov",
      statut: "En pause",
      localisation: "Lyon",
      type_contrat: "CDI",
      salaire: "55-65K€",
      description: "Analyse de données complexes et développement de modèles prédictifs pour optimiser les processus métier...",
      candidatures: 28,
      entretiens: 5,
      recrutes: 1,
    },
  ]);

  function openModal() {
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;

    const formData = {
      titre: form.titre.value,
      entreprise: form.entreprise.value,
      localisation: form.localisation.value,
      type_contrat: form.type_contrat.value,
      salaire: form.salaire.value,
      experience: form.experience.value,
      description: form.description.value,
      competences_requises: form.competences_requises.value,
      avantages: form.avantages.value,
      email_contact: form.email_contact.value,
      date_limite: form.date_limite.value,
      featured: form.offre_featured.checked,
      statut: form.offre_active.checked ? "Active" : "Brouillon",
      date_creation: new Date().toISOString().split("T")[0],
      recruteur_id: "recruteur_actuel",
    };

    try {
      // Simulation sauvegarde
      console.log("📊 Données offre :", formData);
      alert("✅ Offre publiée (mode simulation)");

      closeModal();
      form.reset();

      // Actualiser liste offres si besoin
    } catch (error) {
      console.error(error);
      alert("Erreur lors de la publication, mode simulation active");
      closeModal();
      form.reset();
    }
  }

  function editOffer(id) {
    alert(`Édition de l'offre #${id} - fonction à implémenter.`);
  }

  return (
    <>
      {/* Pas de header local*/}
      <div className="dashboard">
        <aside className="sidebar">
          <div className="user-info">
            <div className="user-avatar">EC</div>
            <div className="user-name">Eric Consultant</div>
            <div className="user-company">TechCorp France</div>
          </div>
          <nav>
            <ul className="sidebar-nav">
              <li><a href="#" className="active"><span className="nav-icon">📊</span>Tableau de bord</a></li>
              <li><a href="#"><span className="nav-icon">📝</span>Mes offres</a></li>
              <li><a href="#"><span className="nav-icon">👥</span>Candidatures</a></li>
              <li><a href="#"><span className="nav-icon">🏢</span>Mon entreprise</a></li>
              <li><a href="#"><span className="nav-icon">⚙️</span>Paramètres</a></li>
              <li><a href="#" onClick={() => {
                sessionStorage.removeItem('recruteur_connecte');
                window.location.href = '/connexion-recruteur';
              }}><span className="nav-icon">🚪</span>Déconnexion</a></li>
            </ul>
          </nav>
        </aside>

        <main className="main-content">
          <div className="dashboard-header">
            <h1>Tableau de Bord Recruteur</h1>
            <button className="btn btn-primary" id="newOfferBtn" onClick={openModal}>+ Publier une offre</button>
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
            {offres.map(offre => (
              <div key={offre.id} className="card">
                <div className="card-header">
                  <div>
                    <h3 className="card-title">{offre.titre}</h3>
                    <div className="card-company">{offre.entreprise}</div>
                  </div>
                  <div className={`card-badge${offre.statut !== 'Active' ? ' inactive' : ''}`}>
                    {offre.statut}
                  </div>
                </div>

                <div className="card-meta">
                  <span>{offre.localisation} • {offre.type_contrat} • {offre.salaire}</span>
                </div>

                <p className="card-description">{offre.description}</p>

                <div className="card-stats">
                  <div className="stat">
                    <span className="stat-value">{offre.candidatures}</span>
                    <span className="stat-label">Candidatures</span>
                  </div>
                  <div className="stat">
                    <span className="stat-value">{offre.entretiens}</span>
                    <span className="stat-label">Entretiens</span>
                  </div>
                  <div className="stat">
                    <span className="stat-value">{offre.recrutes}</span>
                    <span className="stat-label">Recrutés</span>
                  </div>
                </div>

                <div className="card-actions">
                  <button className="btn btn-primary btn-sm">Voir candidatures</button>
                  <button className="btn btn-outline btn-sm" onClick={() => editOffer(offre.id)}>Modifier</button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      {modalOpen && (
        <div className="modal" style={{ display: 'flex' }}>
          <div className="modal-content" role="dialog" aria-modal="true" aria-labelledby="modalTitle">
            <div className="modal-header">
              <h2 id="modalTitle">Publier une Nouvelle Offre</h2>
              <button className="modal-close" onClick={closeModal} aria-label="Fermer la fenêtre modale">&times;</button>
            </div>
            <div className="modal-body">
              <form id="offerForm" onSubmit={handleSubmit}>
                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label" htmlFor="titre">Intitulé du poste *</label>
                    <input
                      type="text"
                      id="titre"
                      name="titre"
                      className="form-input"
                      required
                      placeholder="Ex: Développeur Full Stack Senior"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="entreprise">Entreprise *</label>
                    <input
                      type="text"
                      id="entreprise"
                      name="entreprise"
                      className="form-input"
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
                      required
                      placeholder="Ex: Paris, télétravail partiel"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="type_contrat">Type de contrat *</label>
                    <select id="type_contrat" name="type_contrat" className="form-select" required>
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
                    <label className="form-label" htmlFor="salaire">Salaire (fourchette)</label>
                    <input
                      type="text"
                      id="salaire"
                      name="salaire"
                      className="form-input"
                      placeholder="Ex: 45-55K€"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="experience">Expérience requise</label>
                    <select id="experience" name="experience" className="form-select">
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
                    required
                    placeholder="Décrivez les missions, responsabilités et environnement de travail..."
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="competences_requises">Compétences requises *</label>
                  <textarea
                    id="competences_requises"
                    name="competences_requises"
                    className="form-textarea"
                    required
                    placeholder="Listez les compétences techniques et soft skills requises..."
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="avantages">Avantages</label>
                  <textarea
                    id="avantages"
                    name="avantages"
                    className="form-textarea"
                    placeholder="Tickets restaurant, mutuelle, télétravail, formations..."
                  />
                </div>

                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label" htmlFor="email_contact">Email de contact *</label>
                    <input
                      type="email"
                      id="email_contact"
                      name="email_contact"
                      className="form-input"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="date_limite">Date limite (optionnel)</label>
                    <input
                      type="date"
                      id="date_limite"
                      name="date_limite"
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="checkbox-group">
                  <input type="checkbox" id="offre_featured" name="offre_featured" />
                  <label htmlFor="offre_featured">Mettre en avant cette offre (offre "à la une")</label>
                </div>

                <div className="checkbox-group">
                  <input type="checkbox" id="offre_active" name="offre_active" defaultChecked />
                  <label htmlFor="offre_active">Publier immédiatement l'offre</label>
                </div>

                <div className="form-actions">
                  <button type="button" className="btn btn-outline" onClick={closeModal}>Annuler</button>
                  <button type="submit" className="btn btn-primary">Publier l'offre</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        /* Ajoute ici les styles spécifiques comme dans ta version originale */
      `}</style>
    </>
  );
}
