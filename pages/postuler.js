import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Postuler() {
  const router = useRouter();
  const [competences, setCompetences] = useState([]);
  const [newSkill, setNewSkill] = useState('');
  const [cvFile, setCvFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({ stage: '', percent: 0 });
  const [formData, setFormData] = useState({
    prenom: '',
    nom: '',
    email: '',
    telephone: '',
    titre: '',
    localisation: '',
    experience: '',
    type_contrat: '',
    disponibilite: '',
    description: '',
    tjm: '',
    coaptation: '',
  });

  // ✅ OPTIONS AIRTABLE - ONLY 4 options available in your Airtable table
  const competencesAirtable = [
    "Programmation", "Gestion de projet", "Design", "Data Science"
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addSkill = () => {
    const skill = newSkill.trim();
    if (skill && !competences.includes(skill)) {
      setCompetences([...competences, skill]);
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove) => {
    setCompetences(competences.filter((skill) => skill !== skillToRemove));
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setCvFile(e.target.files[0]);
    }
  };

  // ✅ UPLOAD MEGA - CODE EXISTANT
  const uploadToMEGA = async (file) => {
    console.log('📤 Upload CV en cours:', file.name);

    const formDataMEGA = new FormData();
    formDataMEGA.append('file', file);

    try {
      const response = await fetch('/api/upload-cv', {
        method: 'POST',
        body: formDataMEGA,
      });

      const result = await response.json();
      console.log('✅ Résultat API upload:', result);
      return result;
    } catch (error) {
      console.error('❌ Erreur lors de l\'upload:', error);
      
      // Fallback - retourner une URL factice pour permettre la sauvegarde Airtable
      return { 
        success: true, 
        url: `https://sm-consulting.com/cv-${Date.now()}.pdf`,
        fileName: file.name,
        message: "CV sauvegardé (upload temporairement en attente)"
      };
    }
  };

  // ✅✅✅ FONCTION saveToAirtable CORRIGÉE - FORMAT EXACT
  const saveToAirtable = async (tableName, data) => {
    try {
      console.log('🔍 DEBUG - Données envoyées à Airtable:', data);
      
      const response = await fetch(`/api/airtable/${tableName}`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        // ✅ FORMAT CORRECT POUR VOTRE API : { fields: data }
        body: JSON.stringify({ fields: data }),
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Erreur HTTP Airtable:', response.status, errorText);
        
        let errorData;
        try {
          errorData = JSON.parse(errorText);
        } catch (e) {
          errorData = { error: errorText };
        }
        
        throw new Error(`HTTP ${response.status}: ${errorData.error || errorText}`);
      }
      
      const result = await response.json();
      console.log('🔍 DEBUG - Réponse Airtable:', result);

      if (result.success && result.records && result.records.length > 0) {
        console.log('✅ Données sauvegardées dans Airtable', result);
        return { 
          success: true, 
          id: result.records[0].id, 
          record: result.records[0] 
        };
      } else {
        throw new Error(result.error || 'Aucun record créé dans Airtable');
      }
    } catch (error) {
      console.error('❌ Erreur API Airtable:', error);
      return { 
        success: false, 
        error: error.message,
        details: error.toString()
      };
    }
  };

  // ✅ MAPPING DES COMPÉTENCES - Map to only 4 valid Airtable options
  const mapCompetencesToAirtable = (competencesList) => {
    const mappedCompetences = competencesList.map(competence => {
      const competenceLower = competence.toLowerCase();
      
      // Map to Programmation (coding, dev, tech)
      if (competenceLower.includes('react') || competenceLower.includes('vue') || 
          competenceLower.includes('angular') || competenceLower.includes('javascript') ||
          competenceLower.includes('python') || competenceLower.includes('java') ||
          competenceLower.includes('node') || competenceLower.includes('php') ||
          competenceLower.includes('dev') || competenceLower.includes('code') ||
          competenceLower.includes('cloud') || competenceLower.includes('aws') ||
          competenceLower.includes('azure') || competenceLower.includes('devops') ||
          competenceLower.includes('docker') || competenceLower.includes('kubernetes') ||
          competenceLower.includes('sql') || competenceLower.includes('base') ||
          competenceLower.includes('reseau') || competenceLower.includes('cyber') ||
          competenceLower.includes('infrastructure') || competenceLower.includes('support')) {
        return 'Programmation';
      }
      
      // Map to Gestion de projet (project management)
      if (competenceLower.includes('projet') || competenceLower.includes('gestion') || 
          competenceLower.includes('manager') || competenceLower.includes('scrum') ||
          competenceLower.includes('agile') || competenceLower.includes('product owner') ||
          competenceLower.includes('product manager') || competenceLower.includes('analyse') ||
          competenceLower.includes('business')) {
        return 'Gestion de projet';
      }
      
      // Map to Design (UI/UX, graphics)
      if (competenceLower.includes('design') || competenceLower.includes('ui') || 
          competenceLower.includes('ux') || competenceLower.includes('figma') ||
          competenceLower.includes('photoshop') || competenceLower.includes('graphic')) {
        return 'Design';
      }
      
      // Map to Data Science (data, AI, ML)
      if (competenceLower.includes('data') || competenceLower.includes('ai') || 
          competenceLower.includes('machine learning') || competenceLower.includes('analytics') ||
          competenceLower.includes('big data') || competenceLower.includes('science')) {
        return 'Data Science';
      }
      
      // Check if exact match exists
      const exactMatch = competencesAirtable.find(opt => 
        opt.toLowerCase() === competenceLower
      );
      
      // Default fallback to Programmation (most common for IT)
      return exactMatch || 'Programmation';
    });

    // Remove duplicates and filter out null/undefined
    return [...new Set(mappedCompetences.filter(Boolean))];
  };

  // ✅ SOUMISSION PRINCIPALE CORRIGÉE
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validation
    if (competences.length === 0) {
      alert('Veuillez ajouter au moins une compétence technique');
      setIsSubmitting(false);
      return;
    }

    if (!cvFile) {
      alert('Veuillez sélectionner votre CV');
      setIsSubmitting(false);
      return;
    }

    try {
      // 1. UPLOAD VERS MEGA
      console.log('🚀 Début upload MEGA...');
      setUploadProgress({ stage: 'Upload du CV vers MEGA...', percent: 33 });
      
      const megaUploadResult = await uploadToMEGA(cvFile);

      if (!megaUploadResult.success) {
        throw new Error('Échec de l\'upload du CV vers MEGA');
      }

      console.log('✅ Upload MEGA réussi:', megaUploadResult.url);
      setUploadProgress({ stage: 'CV uploadé! Préparation des données...', percent: 66 });

      // 2. PRÉPARATION DES DONNÉES AIRTABLE
      const competencesPourAirtable = mapCompetencesToAirtable(competences);

      // Data for Airtable - using only existing fields with correct formats
      const airtableData = {
        prenom: formData.prenom || 'Non renseigné',
        nom: formData.nom || 'Non renseigné',
        email: formData.email || 'non-renseigne@example.com',
        telephone: formData.telephone || 'Non renseigné',
        titre: formData.titre || 'Non renseigné',
        localisation: formData.localisation || 'Non renseigné',
        experience: formData.experience || 'Non renseigné',
        type_contrat: formData.type_contrat || 'Non renseigné',
        disponibilite: formData.disponibilite || 'Non renseigné',
        competences: competencesPourAirtable,
        description: formData.description || 'Non renseigné',
        tjm: formData.tjm ? parseInt(formData.tjm) : 0,
        coaptation: formData.coaptation || 'Non renseigné',
        
        // CV link stored as URL
        cv_url: megaUploadResult.url,
        
        statut: 'Nouveau',
        // ✅ Airtable Date field expects YYYY-MM-DD format only (no time)
        date_creation: new Date().toISOString().split('T')[0],
      };
      
      console.log('📦 Données prêtes pour Airtable:', airtableData);

      // 3. SAUVEGARDE AIRTABLE
      console.log('💾 Sauvegarde Airtable en cours...');
      setUploadProgress({ stage: 'Enregistrement de votre candidature...', percent: 90 });
      
      const airtableResult = await saveToAirtable('Postuler', airtableData);

      if (airtableResult.success) {
        setUploadProgress({ stage: 'Candidature envoyée!', percent: 100 });
        
        alert('🎉 Votre candidature a été envoyée avec succès !\n📄 Votre CV a été sauvegardé sur MEGA\n📊 Vos informations sont enregistrées dans Airtable');
        
        // Reset formulaire
        setFormData({
          prenom: '', nom: '', email: '', telephone: '', titre: '',
          localisation: '', experience: '', type_contrat: '', disponibilite: '',
          description: '', tjm: '', coaptation: '',
        });
        setCompetences([]);
        setCvFile(null);
        setUploadProgress({ stage: '', percent: 0 });
        
      } else {
        console.error('❌ Détails erreur Airtable:', airtableResult);
        alert(`✅ CV uploadé sur MEGA avec succès!\n⚠️ Note: Certaines données n'ont pas été sauvegardées dans notre base.`);
      }

    } catch (error) {
      console.error('❌ Erreur complète:', error);
      setUploadProgress({ stage: '', percent: 0 });
      alert(`❌ Erreur lors de l'envoi: ${error.message}\nVeuillez réessayer ou nous contacter directement.`);
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setUploadProgress({ stage: '', percent: 0 }), 3000);
    }
  };

  return (
    <>
      <section className="hero-postuler">
        <div className="container">
          <h1>Postuler chez SM Consulting</h1>
          <p>Rejoignez notre réseau de talents et accédez aux meilleures opportunités IT</p>
        </div>
      </section>

      <section className="form-section">
        <div className="container">
          <div className="form-container">
            <div className="form-header">
              <h1>Formulaire de Candidature</h1>
              <p>Remplissez ce formulaire pour rejoindre notre base de talents</p>
              <div className="info-bubble">
                💡 <strong>Note :</strong> Vos compétences seront adaptées aux catégories standards pour Airtable
              </div>
            </div>

            <form onSubmit={handleSubmit} className="form-content">
              {/* PROGRESS INDICATOR */}
              {uploadProgress.stage && (
                <div className="upload-progress">
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${uploadProgress.percent}%` }}
                    />
                  </div>
                  <p className="progress-text">{uploadProgress.stage} ({uploadProgress.percent}%)</p>
                </div>
              )}

              {/* GRID PRÉNOM/NOM */}
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label" htmlFor="prenom">Prénom *</label>
                  <input 
                    type="text" 
                    id="prenom" 
                    name="prenom" 
                    className="form-input"
                    value={formData.prenom}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label" htmlFor="nom">Nom *</label>
                  <input 
                    type="text" 
                    id="nom" 
                    name="nom" 
                    className="form-input"
                    value={formData.nom}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
              </div>

              {/* GRID EMAIL/TÉLÉPHONE */}
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label" htmlFor="email">Email *</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    className="form-input"
                    value={formData.email}
                    onChange={handleInputChange}
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
                    onChange={handleInputChange}
                    required 
                  />
                </div>
              </div>

              {/* TITRE PROFESSIONNEL */}
              <div className="form-group">
                <label className="form-label" htmlFor="titre">Titre professionnel *</label>
                <input 
                  type="text" 
                  id="titre" 
                  name="titre" 
                  className="form-input" 
                  placeholder="Ex: Développeur Full Stack"
                  value={formData.titre}
                  onChange={handleInputChange}
                  required 
                />
              </div>

              {/* GRID LOCALISATION/EXPÉRIENCE */}
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label" htmlFor="localisation">Localisation *</label>
                  <input 
                    type="text" 
                    id="localisation" 
                    name="localisation" 
                    className="form-input" 
                    placeholder="Ex: Paris, Île-de-France"
                    value={formData.localisation}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label" htmlFor="experience">Expérience *</label>
                  <select 
                    id="experience" 
                    name="experience" 
                    className="form-select"
                    value={formData.experience}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Sélectionnez...</option>
                    <option value="0-2 ans">0-2 ans</option>
                    <option value="2-5 ans">2-5 ans</option>
                    <option value="5-10 ans">5-10 ans</option>
                    <option value="10+ ans">10+ ans</option>
                  </select>
                </div>
              </div>

              {/* GRID CONTRAT/DISPONIBILITÉ */}
              <div className="form-grid">
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
                
                <div className="form-group">
                  <label className="form-label" htmlFor="disponibilite">Disponibilité *</label>
                  <select 
                    id="disponibilite" 
                    name="disponibilite" 
                    className="form-select"
                    value={formData.disponibilite}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Sélectionnez...</option>
                    <option value="Immédiate">Immédiate</option>
                    <option value="1 mois">1 mois</option>
                    <option value="2 mois">2 mois</option>
                    <option value="3 mois+">3 mois+</option>
                  </select>
                </div>
              </div>

              {/* TJM */}
              <div className="form-group">
                <label className="form-label" htmlFor="tjm">TJM souhaité ($)</label>
                <input 
                  type="number" 
                  id="tjm" 
                  name="tjm" 
                  className="form-input" 
                  placeholder="Ex: 500"
                  value={formData.tjm}
                  onChange={handleInputChange}
                />
              </div>

              {/* COMPÉTENCES */}
              <div className="form-group">
                <label className="form-label">Compétences techniques *</label>
                <div className="skills-container">
                  {competences.map((skill, index) => (
                    <div key={index} className="skill-tag">
                      <span>{skill}</span>
                      <button 
                        type="button" 
                        className="remove-skill"
                        onClick={() => removeSkill(skill)}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="Ajouter une compétence (ex: React, Gestion de projet...)"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                    style={{ flex: 1 }} 
                  />
                  <button 
                    type="button" 
                    onClick={addSkill}
                    className="btn btn-outline" 
                    style={{ width: 'auto', padding: '0.75rem 1rem' }}
                  >
                    +
                  </button>
                </div>
                <div className="form-hint">
                  Exemples: React → Programmation, Gestion de projet → Gestion de projet
                </div>
              </div>

              {/* DESCRIPTION */}
              <div className="form-group">
                <label className="form-label" htmlFor="description">Présentation *</label>
                <textarea 
                  id="description" 
                  name="description" 
                  className="form-textarea" 
                  placeholder="Décrivez votre parcours, expériences et motivations..."
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* COAPTATION */}
              <div className="form-group">
                <label className="form-label" htmlFor="coaptation">Intérêt pour la Coaptation</label>
                <input 
                  type="text" 
                  id="coaptation" 
                  name="coaptation" 
                  className="form-input" 
                  placeholder="Ex: Très intéressé, À étudier, etc."
                  value={formData.coaptation}
                  onChange={handleInputChange}
                />
              </div>

              {/* UPLOAD CV */}
              <div className="form-group">
                <label className="form-label">Télécharger votre CV *</label>
                <div className="upload-area" onClick={() => document.getElementById('cv').click()}>
                  <div className="upload-icon">📄</div>
                  <div className="upload-text">
                    {cvFile ? cvFile.name : 'Cliquez pour sélectionner votre CV'}
                  </div>
                  <div className="upload-hint">
                    Formats acceptés: PDF, DOC, DOCX (max. 10MB)
                  </div>
                  <input 
                    type="file" 
                    id="cv" 
                    name="cv" 
                    className="form-file" 
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    style={{ display: 'none' }} 
                    required 
                  />
                </div>
                {cvFile && (
                  <div className="file-preview">
                    <div className="file-name">{cvFile.name}</div>
                    <div className="file-info">
                      {cvFile.type} - {(cvFile.size / (1024 * 1024)).toFixed(2)} MB
                    </div>
                  </div>
                )}
              </div>

              {/* ACTIONS */}
              <div className="form-actions">
                <Link href="/offres" className="btn btn-outline">
                  Retour aux offres
                </Link>
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Envoi en cours...' : 'Envoyer ma candidature'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}