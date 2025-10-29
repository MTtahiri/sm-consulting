import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Offres() {
  const [toutesLesOffres, setToutesLesOffres] = useState([]);
  const [offresAffichees, setOffresAffichees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageActuelle, setPageActuelle] = useState(1);
  const [filtres, setFiltres] = useState({
    techno: '',
    type: '',
    experience: '',
    localisation: ''
  });

  const offresParPage = 6;

  // Données simulées (fallback)
  const offresSimulees = [
    {
      id: 1,
      titre: "Développeur Fullstack React/Node.js",
      entreprise: "Scale-Up FinTech",
      localisation: "Paris / Remote",
      type_contrat: "CDI",
      experience: "3-5 ans",
      salaire: "55-70K€",
      description: "Rejoignez une scale-up FinTech en pleine croissance pour développer de nouvelles features sur leur plateforme de paiement. Stack moderne : React, Node.js, TypeScript, AWS.",
      competences: ["React", "Node.js", "TypeScript", "AWS", "PostgreSQL"],
      featured: true,
      date_publication: "2024-01-15"
    },
    {
      id: 2,
      titre: "Data Engineer Python",
      entreprise: "Groupe Retail",
      localisation: "Lyon",
      type_contrat: "CDI",
      experience: "4-6 ans",
      salaire: "50-65K€",
      description: "Créez et optimisez les pipelines de données pour un groupe retail leader. Travail sur l'architecture data et les outils d'analyse.",
      competences: ["Python", "SQL", "Airflow", "Spark", "BigQuery"],
      featured: false,
      date_publication: "2024-01-14"
    },
    {
      id: 3,
      titre: "DevOps Engineer",
      entreprise: "EdTech Innovante",
      localisation: "Full Remote",
      type_contrat: "Freelance",
      experience: "5+ ans",
      salaire: "500-700€/j",
      description: "Mission freelance pour accompagner une EdTech dans sa transformation cloud et l'optimisation de son infrastructure.",
      competences: ["AWS", "Kubernetes", "Terraform", "Docker", "CI/CD"],
      featured: true,
      date_publication: "2024-01-13"
    },
    {
      id: 4,
      titre: "Product Manager",
      entreprise: "SaaS B2B",
      localisation: "Paris",
      type_contrat: "CDI",
      experience: "4-7 ans",
      salaire: "60-75K€",
      description: "Drivez la roadmap produit d'une solution SaaS B2B leader sur son marché. Interface entre tech, design et business.",
      competences: ["Product Strategy", "Agile", "Analytics", "UX", "Roadmapping"],
      featured: false,
      date_publication: "2024-01-12"
    }
  ];

  useEffect(() => {
    chargerOffres();
  }, []);

  useEffect(() => {
    filtrerOffres();
  }, [filtres, toutesLesOffres]);

  const chargerOffres = async () => {
    try {
      const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
      const AIRTABLE_BASE_ID = 'appG0HD7kW6ejvCkG';
      const AIRTABLE_TABLE_OFFRES = 'Offres';

      const response = await fetch(
        `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_OFFRES}?sort[0][field]=date_publication&sort[0][direction]=desc`,
        {
          headers: {
            Authorization: `Bearer ${AIRTABLE_API_KEY}`
          }
        }
      );

      if (!response.ok) throw new Error('Erreur API Airtable');

      const data = await response.json();
      const offres = data.records.map(record => ({
        id: record.id,
        titre: record.fields.titre || 'Titre non spécifié',
        entreprise: record.fields.entreprise || 'Entreprise confidentielle',
        localisation: record.fields.localisation || 'Non spécifié',
        type_contrat: record.fields.type_contrat || 'CDI',
        experience: record.fields.experience || 'Non spécifié',
        salaire: record.fields.salaire || 'À négocier',
        description: record.fields.description || 'Description non disponible',
        competences: record.fields.competences || [],
        featured: record.fields.featured || false,
        date_publication: record.fields.date_publication || new Date().toISOString()
      }));

      setToutesLesOffres(offres);
      setLoading(false);
    } catch (error) {
      console.error('Erreur Airtable:', error);
      setToutesLesOffres(offresSimulees);
      setLoading(false);
    }
  };

  const filtrerOffres = () => {
    let offresFiltrees = toutesLesOffres.filter(offre => {
      if (filtres.techno && Array.isArray(offre.competences) && !offre.competences.includes(filtres.techno)) return false;
      if (filtres.type && offre.type_contrat !== filtres.type) return false;
      if (filtres.experience && !offre.experience.includes(filtres.experience)) return false;
      if (filtres.localisation && !offre.localisation.includes(filtres.localisation)) return false;
      return true;
    });

    setOffresAffichees(offresFiltrees);
    setPageActuelle(1);
  };

  const handleFiltreChange = (e) => {
    const { name, value } = e.target;
    setFiltres(prev => ({ ...prev, [name]: value }));
  };

  const totalPages = Math.ceil(offresAffichees.length / offresParPage);
  const offresPage = offresAffichees.slice(
    (pageActuelle - 1) * offresParPage,
    pageActuelle * offresParPage
  );

  return (
    <>
      <section className="offres-hero">
        <div className="container">
          <h1>Opportunités IT Exceptionnelles</h1>
          <p>Découvrez nos offres d'emploi et missions chez les entreprises les plus innovantes</p>

          <div className="offres-actions">
            <a href="#offres" className="btn btn-primary btn-large">📋 Voir les offres</a>
            <Link href="/inscription-recruteur" className="btn btn-secondary btn-large">
              🏢 Publier une offre
            </Link>
          </div>
        </div>
      </section>

      {/* Filtres */}
      <section className="filters-section">
        <div className="container">
          <div className="filters-grid">
            <div className="filter-group">
              <label htmlFor="filterTechno">Technologie</label>
              <select
                id="filterTechno"
                name="techno"
                className="filter-select"
                value={filtres.techno}
                onChange={handleFiltreChange}
              >
                <option value="">Toutes les technologies</option>
                <option value="React">React</option>
                <option value="Vue.js">Vue.js</option>
                <option value="Angular">Angular</option>
                <option value="Node.js">Node.js</option>
                <option value="Python">Python</option>
                <option value="Java">Java</option>
                <option value="AWS">AWS</option>
                <option value="Azure">Azure</option>
              </select>
            </div>

            <div className="filter-group">
              <label htmlFor="filterType">Type de contrat</label>
              <select
                id="filterType"
                name="type"
                className="filter-select"
                value={filtres.type}
                onChange={handleFiltreChange}
              >
                <option value="">Tous les contrats</option>
                <option value="CDI">CDI</option>
                <option value="CDD">CDD</option>
                <option value="Freelance">Freelance</option>
                <option value="Stage">Stage</option>
                <option value="Alternance">Alternance</option>
              </select>
            </div>

            <div className="filter-group">
              <label htmlFor="filterExperience">Expérience</label>
              <select
                id="filterExperience"
                name="experience"
                className="filter-select"
                value={filtres.experience}
                onChange={handleFiltreChange}
              >
                <option value="">Tous niveaux</option>
                <option value="Débutant">Débutant (0-2 ans)</option>
                <option value="Intermédiaire">Intermédiaire (2-5 ans)</option>
                <option value="Senior">Senior (5+ ans)</option>
                <option value="Expert">Expert (8+ ans)</option>
              </select>
            </div>

            <div className="filter-group">
              <label htmlFor="filterLocalisation">Localisation</label>
              <select
                id="filterLocalisation"
                name="localisation"
                className="filter-select"
                value={filtres.localisation}
                onChange={handleFiltreChange}
              >
                <option value="">Partout en France</option>
                <option value="Île-de-France">Île-de-France</option>
                <option value="Remote">Full Remote</option>
                <option value="Hybride">Hybride</option>
                <option value="Lyon">Lyon</option>
                <option value="Bordeaux">Bordeaux</option>
                <option value="Toulouse">Toulouse</option>
                <option value="Nantes">Nantes</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Liste des offres */}
      <section id="offres" className="features" style={{ paddingTop: 0 }}>
        <div className="container">
          {loading && (
            <div style={{ textAlign: 'center', padding: '60px' }}>
              <div style={{ fontSize: '18px', color: 'var(--text-light)' }}>
                Chargement des offres...
              </div>
            </div>
          )}

          {!loading && offresAffichees.length === 0 && (
            <div style={{ textAlign: 'center', padding: '60px' }}>
              <div style={{ fontSize: '18px', color: 'var(--text-light)', marginBottom: '16px' }}>
                Aucune offre ne correspond à vos critères
              </div>
              <Link href="/inscription-recruteur" className="btn btn-primary">
                Publier la première offre
              </Link>
            </div>
          )}

          {!loading && offresAffichees.length > 0 && (
            <>
              <div className="offres-grid">
                {offresPage.map(offre => (
                  <div key={offre.id} className={`offre-card ${offre.featured ? 'featured' : ''}`}>
                    <div className="offre-header">
                      <h3 className="offre-title">{offre.titre}</h3>
                      {offre.featured ? (
                        <span className="offre-badge featured">⭐ Offre à la une</span>
                      ) : (
                        <span className="offre-badge">Nouveau</span>
                      )}
                    </div>

                    <div className="offre-company">
                      <strong>{offre.entreprise}</strong>
                    </div>

                    <div className="offre-info">
                      <div>📍 {offre.localisation}</div>
                      <div>📄 {offre.type_contrat}</div>
                      <div>💼 {offre.experience}</div>
                      <div>💰 {offre.salaire}</div>
                    </div>

                    <p className="offre-description">{offre.description}</p>

                    <div className="offre-skills">
                      {Array.isArray(offre.competences) ? (
                        offre.competences.map((competence, index) => (
                          <span key={index} className="skill-tag">{competence}</span>
                        ))
                      ) : (
                        <span className="skill-tag">Compétences diverses</span>
                      )}
                    </div>

                    <div className="offre-actions">
                      <Link href={`/postuler?offre=${offre.id}`} className="btn-apply">
                        Postuler maintenant
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="pagination">
                  {pageActuelle > 1 && (
                    <button
                      onClick={() => setPageActuelle(pageActuelle - 1)}
                      className="pagination-btn"
                    >
                      ← Précédent
                    </button>
                  )}

                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => setPageActuelle(i + 1)}
                      className={`pagination-btn ${i + 1 === pageActuelle ? 'active' : ''}`}
                    >
                      {i + 1}
                    </button>
                  ))}

                  {pageActuelle < totalPages && (
                    <button
                      onClick={() => setPageActuelle(pageActuelle + 1)}
                      className="pagination-btn"
                    >
                      Suivant →
                    </button>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* CTA Recruteurs */}
      <section className="offres-cta">
        <div className="container">
          <h2 style={{ color: 'white', marginBottom: '16px' }}>Vous recrutez ?</h2>
          <p style={{ color: 'rgba(255,255,255,0.9)', marginBottom: '32px', fontSize: '18px' }}>
            Publiez vos offres et accédez à notre réseau de talents qualifiés
          </p>
          <Link href="/inscription-recruteur" className="btn btn-accent btn-large">
            🚀 Publier une offre
          </Link>
        </div>
      </section>
    </>
  );
}