import { useState, useRef } from 'react';

export default function CandidatureForm() {
  const formRef = useRef(null);
  const fileInputRef = useRef(null);

  const [competences, setCompetences] = useState([]);
  const [newSkill, setNewSkill] = useState('');
  const [cvFile, setCvFile] = useState(null);
  const [loading, setLoading] = useState(false);

  function addSkill() {
    const skill = newSkill.trim();
    if (skill && !competences.includes(skill)) {
      setCompetences(prev => [...prev, skill]);
      setNewSkill('');
    }
  }

  function removeSkill(skill) {
    setCompetences(prev => prev.filter(s => s !== skill));
  }

  function handleFileChange(e) {
    if (e.target.files.length > 0) {
      setCvFile(e.target.files[0]);
    } else {
      setCvFile(null);
    }
  }

  async function uploadToMEGA(file) {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/api/upload-cv', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Erreur lors de l\'upload du CV');
    }

    const result = await response.json();
    if (!result.success) {
      throw new Error(result.message || 'Erreur upload');
    }
    return result.fileUrl;
  }

  async function saveToAirtable(data) {
    const response = await fetch('/api/submit-application', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Erreur lors de l\'enregistrement de la candidature');
    }
    return await response.json();
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!cvFile) {
      alert('Veuillez sélectionner un CV');
      return;
    }
    if (competences.length === 0) {
      alert('Veuillez ajouter au moins une compétence');
      return;
    }

    setLoading(true);

    try {
      const cvUrl = await uploadToMEGA(cvFile);

      const form = formRef.current;
      const formData = {
        nom: form.nom.value.trim(),
        email: form.email.value.trim(),
        telephone: form.telephone.value.trim(),
        poste: form.poste.value.trim(),
        competences,
        cvUrl,
      };

      await saveToAirtable(formData);

      alert('Candidature envoyée avec succès !');
      form.reset();
      setCompetences([]);
      setCvFile(null);
      fileInputRef.current.value = null;
    } catch (error) {
      console.error(error);
      alert(`Erreur lors de l'envoi : ${error.message}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} id="applicationForm">
      <div>
        <label htmlFor="nom">Nom *</label>
        <input type="text" id="nom" name="nom" required />
      </div>

      <div>
        <label htmlFor="email">Email *</label>
        <input type="email" id="email" name="email" required />
      </div>

      <div>
        <label htmlFor="telephone">Téléphone *</label>
        <input type="tel" id="telephone" name="telephone" required />
      </div>

      <div>
        <label htmlFor="poste">Poste *</label>
        <input type="text" id="poste" name="poste" required />
      </div>

      <div>
        <label>Compétences techniques *</label>
        <div>
          {competences.map(skill => (
            <span key={skill} style={{ marginRight: '8px' }}>
              {skill} <button type="button" onClick={() => removeSkill(skill)}>×</button>
            </span>
          ))}
        </div>
        <input
          type="text"
          value={newSkill}
          onChange={e => setNewSkill(e.target.value)}
          placeholder="Ajouter une compétence"
        />
        <button type="button" onClick={addSkill} disabled={!newSkill.trim()}>
          Ajouter
        </button>
      </div>

      <div>
        <label htmlFor="cvFile">CV *</label>
        <input
          type="file"
          id="cvFile"
          name="cvFile"
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
          ref={fileInputRef}
          required
        />
        {cvFile && <p>Fichier sélectionné : {cvFile.name} ({(cvFile.size / 1024 / 1024).toFixed(2)} MB)</p>}
      </div>

      <button type="submit" disabled={loading}>
        {loading ? 'Envoi en cours...' : 'Envoyer ma candidature'}
      </button>
    </form>
  );
}
