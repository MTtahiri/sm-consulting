import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Candidats() {
  const AIRTABLE_API_KEY = '***REMOVED***';
  const AIRTABLE_BASE_ID = '***REMOVED***';
  const AIRTABLE_TABLE_NAME = 'CV consulting';

  const [tousLesCandidats, setTousLesCandidats] = useState([]);
  const [filteredCandidats, setFilteredCandidats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterCompetence, setFilterCompetence] = useState('');
  const [filterExperience, setFilterExperience] = useState('');
  const [filterDisponibilite, setFilterDisponibilite] = useState('');

  useEffect(() => {
    async function fetchCandidats() {
      setLoading(true);
      try {
        const res = await fetch(
          `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}?sort[0][field]=date_ajout&sort[0][direction]=desc`,
          {
            headers: {
              Authorization: `Bearer ${AIRTABLE_API_KEY}`,
              'Content-Type': 'application/json',
            },
          }
        );
        if (!res.ok) throw new Error(`Erreur Airtable: ${res.statusText}`);
        const data = await res.json();

        const candidats = data.records.map((record) => {
          const fields = record.fields;

          const prenom = fields.prenom || '';
          const nomInitiale = fields.nom ? fields.nom.charAt(0).toUpperCase() + '.' : '';
          const nomCompletAnonyme = `${prenom} ${nomInitiale}`.trim();

          let statutAffichage = fields.statut || 'Disponible';
          if (fields.statut === 'nouveau') statutAffichage = 'Nouveau';
          else if (fields.statut === 'en cours') statutAffichage = "En cours d'entretien";
          else if (fields.statut === 'embauché') statutAffichage = 'Embauché';

          return {
            id: record.id,
            prenom,
            nomInitiale,
            nomCompletAnonyme,
            titre: fields.poste || 'Profil IT',
            email: fields.email || '',
            telephone: fields.telephone || '',
            competences:
              Array.isArray(fields.competences)
                ? fields.competences
                : typeof fields.competences === 'string'
                ? fields.competences.split(',').map((c) => c.trim())
                : ['Compétences diverses'],
            cv_url: fields.cv_file_path || '',
            statut: statutAffichage,
            description: fields.description || 'Candidat motivé avec un bon profil technique.',
            localisation: 'Île-de-France',
            disponibilite: statutAffichage,
          };
        });

        setTousLesCandidats(candidats);
        setFilteredCandidats(candidats);
        setLoading(false);
      } catch (error) {
        console.error('Erreur chargement candidats:', error);
        setLoading(false);
        setTousLesCandidats([]);
        setFilteredCandidats([]);
      }
    }
    fetchCandidats();
  }, []);

  useEffect(() => {
    let filtered = tousLesCandidats;

    if (filterCompetence) {
      filtered = filtered.filter((c) =>
        c.competences.some((comp) => comp.toLowerCase().includes(filterCompetence.toLowerCase()))
      );
    }
    if (filterExperience) {
      filtered = filtered.filter((c) => c.experience === filterExperience);
    }
    if (filterDisponibilite) {
      filtered = filtered.filter((c) => c.disponibilite === filterDisponibilite);
    }

    setFilteredCandidats(filtered);
  }, [filterCompetence, filterExperience, filterDisponibilite, tousLesCandidats]);

  function CarteCandidat({ candidat }) {
    let badgeStyle = { background: '#d1fae5', color: '#065f46' };
    if (candidat.statut === 'En mission') badgeStyle = { background: '#fef3c7', color: '#92400e' };
    else if (candidat.statut === "En cours d'entretien") badgeStyle = { background: '#dbeafe', color: '#1e40af' };
    else if (candidat.statut === 'Embauché') badgeStyle = { background: '#f3e8ff', color: '#6b21a8' };
    else if (candidat.statut === 'Nouveau') badgeStyle = { background: '#f1f5f9', color: '#475569' };

    return (
      <div className="candidate-card" key={candidat.id}>
        <div className="candidate-header">
          <h3 className="candidate-title">{candidat.titre}</h3>
          <span className="candidate-badge" style={badgeStyle}>{candidat.statut}</span>
        </div>

        {candidat.nomCompletAnonyme && (
          <div style={{ color: 'var(--primary)', fontWeight: '600', marginBottom: 8 }}>
            {candidat.nomCompletAnonyme}
          </div>
        )}

        <div className="candidate-info">
          <span>📍 {candidat.localisation}</span>
          <span>💼 Profil vérifié</span>
        </div>

        <p className="candidate-description">{candidat.description}</p>

        <div className="candidate-skills">
          {candidat.competences.map((comp, i) => (
            <span key={i} className="skill-tag">{comp}</span>
          ))}
        </div>

        <div className="candidate-actions">
          <a
            href={`contact.html?candidat=${candidat.id}&nom=${encodeURIComponent(candidat.nomCompletAnonyme)}&poste=${encodeURIComponent(candidat.titre)}&email=${encodeURIComponent(candidat.email)}`}
            className="btn btn-primary"
            style={{ flex: 1 }}
          >
            📧 Contacter
          </a>
          {candidat.cv_url && (
            <a href={candidat.cv_url} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
              📄 CV
            </a>
          )}
        </div>
      </div>
    );
  }

  return (
    <>
      <section className="candidates-hero">
        <div className="container">
          <h1>Notre Base de Talents IT</h1>
          <p>Découvrez nos candidats vérifiés et qualifiés</p>

          <div className="filters">
            <select
              className="filter-select"
              value={filterCompetence}
              onChange={e => setFilterCompetence(e.target.value)}
            >
              <option value="">Toutes les compétences</option>
              <option>React</option>
              <option>Node.js</option>
              <option>Python</option>
              <option>Java</option>
              <option>AWS</option>
              <option>TypeScript</option>
              <option>Vue.js</option>
              <option>Angular</option>
              <option>PHP</option>
              <option>Symfony</option>
              <option>Laravel</option>
            </select>
            <select
              className="filter-select"
              value={filterExperience}
              onChange={e => setFilterExperience(e.target.value)}
            >
              <option value="">Tous les niveaux</option>
              <option>Débutant</option>
              <option>Intermédiaire</option>
              <option>Senior</option>
              <option>Expert</option>
            </select>
            <select
              className="filter-select"
              value={filterDisponibilite}
              onChange={e => setFilterDisponibilite(e.target.value)}
            >
              <option value="">Toutes disponibilités</option>
              <option>Disponible</option>
              <option>En mission</option>
              <option>1 mois</option>
              <option>2 mois</option>
              <option>3 mois+</option>
            </select>
          </div>
        </div>
      </section>

      <section style={{ padding: '60px 0' }}>
        <div className="container">
          {loading ? (
            <div style={{ textAlign: 'center', padding: 60, color: 'var(--text-light)', fontSize: 18 }}>
              Chargement des candidats depuis CV consulting...
            </div>
          ) : filteredCandidats.length === 0 ? (
            <div style={{ textAlign: 'center', padding: 60, color: 'var(--text-light)', fontSize: 18, marginBottom: 16 }}>
              Aucun candidat ne correspond à vos critères dans CV consulting
              <br />
              <Link href="/postuler" className="btn btn-primary" style={{ marginTop: 24 }}>
                Postuler comme candidat
              </Link>
            </div>
          ) : (
            <div className="candidates-grid">
              {filteredCandidats.map(candidat => (
                <CarteCandidat key={candidat.id} candidat={candidat} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
