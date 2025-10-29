import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CandidatsList() {
  const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
  const AIRTABLE_BASE_ID = 'appG0HD7kW6ejvCkG';
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
          `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(AIRTABLE_TABLE_NAME)}?sort[0][field]=date_ajout&sort[0][direction]=desc`,
          {
            headers: {
              Authorization: `Bearer ${AIRTABLE_API_KEY}`,
              'Content-Type': 'application/json',
            },
          }
        );
        
        if (!res.ok) {
          throw new Error(`Erreur Airtable: ${res.statusText}`);
        }
        
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
            localisation: fields.localisation || 'Île-de-France',
            disponibilite: statutAffichage,
            experience: fields.experience || 'Intermédiaire',
          };
        });

        setTousLesCandidats(candidats);
        setFilteredCandidats(candidats);
        setLoading(false);
      } catch (error) {
        console.error('Erreur chargement candidats:', error);
        setLoading(false);
        // Données de fallback pour la démo
        const candidatsDemo = [
          {
            id: 'demo1',
            nomCompletAnonyme: 'Sophie M.',
            titre: 'Développeuse Full Stack',
            competences: ['React', 'Node.js', 'TypeScript', 'AWS'],
            statut: 'Disponible',
            description: 'Développeuse passionnée avec 5 ans d\'expérience en développement web moderne.',
            localisation: 'Paris',
            disponibilite: 'Disponible',
            email: 'contact@sm-consulting.fr',
            cv_url: '',
            experience: 'Senior'
          },
          {
            id: 'demo2',
            nomCompletAnonyme: 'Marc D.',
            titre: 'DevOps Engineer',
            competences: ['AWS', 'Kubernetes', 'Terraform', 'Docker'],
            statut: 'Nouveau',
            description: 'Expert DevOps avec une solide expérience en automatisation et cloud.',
            localisation: 'Lyon',
            disponibilite: 'Disponible',
            email: 'contact@sm-consulting.fr',
            cv_url: '',
            experience: 'Expert'
          }
        ];
        setTousLesCandidats(candidatsDemo);
        setFilteredCandidats(candidatsDemo);
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
      <div className="candidate-card">
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
          <Link
            href={`/contact?candidat=${candidat.id}&nom=${encodeURIComponent(candidat.nomCompletAnonyme)}&poste=${encodeURIComponent(candidat.titre)}&email=${encodeURIComponent(candidat.email)}`}
            className="btn btn-primary"
            style={{ flex: 1 }}
          >
            📧 Contacter
          </Link>
          {candidat.cv_url && (
            <a 
              href={candidat.cv_url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-secondary"
            >
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
              <option value="React">React</option>
              <option value="Node.js">Node.js</option>
              <option value="Python">Python</option>
              <option value="Java">Java</option>
              <option value="AWS">AWS</option>
              <option value="TypeScript">TypeScript</option>
              <option value="Vue.js">Vue.js</option>
              <option value="Angular">Angular</option>
              <option value="PHP">PHP</option>
              <option value="Symfony">Symfony</option>
              <option value="Laravel">Laravel</option>
            </select>
            <select
              className="filter-select"
              value={filterExperience}
              onChange={e => setFilterExperience(e.target.value)}
            >
              <option value="">Tous les niveaux</option>
              <option value="Débutant">Débutant</option>
              <option value="Intermédiaire">Intermédiaire</option>
              <option value="Senior">Senior</option>
              <option value="Expert">Expert</option>
            </select>
            <select
              className="filter-select"
              value={filterDisponibilite}
              onChange={e => setFilterDisponibilite(e.target.value)}
            >
              <option value="">Toutes disponibilités</option>
              <option value="Disponible">Disponible</option>
              <option value="En mission">En mission</option>
              <option value="1 mois">1 mois</option>
              <option value="2 mois">2 mois</option>
              <option value="3 mois+">3 mois+</option>
            </select>
          </div>
        </div>
      </section>

      <section style={{ padding: '60px 0' }}>
        <div className="container">
          {loading ? (
            <div style={{ textAlign: 'center', padding: 60, color: 'var(--text-light)', fontSize: 18 }}>
              Chargement des candidats depuis Airtable...
            </div>
          ) : filteredCandidats.length === 0 ? (
            <div style={{ textAlign: 'center', padding: 60 }}>
              <div style={{ color: 'var(--text-light)', fontSize: 18, marginBottom: 16 }}>
                Aucun candidat ne correspond à vos critères
              </div>
              <Link href="/postuler" className="btn btn-primary" style={{ marginTop: 24 }}>
                Postuler comme candidat
              </Link>
            </div>
          ) : (
            <>
              <div style={{ marginBottom: 24, color: 'var(--text-light)', textAlign: 'center' }}>
                {filteredCandidats.length} candidat{filteredCandidats.length > 1 ? 's' : ''} trouvé{filteredCandidats.length > 1 ? 's' : ''}
              </div>
              <div className="candidates-grid">
                {filteredCandidats.map(candidat => (
                  <CarteCandidat key={candidat.id} candidat={candidat} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}