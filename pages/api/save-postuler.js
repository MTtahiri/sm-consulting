// /pages/api/save-postuler.js
import Airtable from 'airtable';

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
const AIRTABLE_TABLE_NAME = 'Postuler';

if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
  throw new Error("Variables d'environnement AIRTABLE_API_KEY et AIRTABLE_BASE_ID manquantes");
}

const base = new Airtable({ apiKey: AIRTABLE_API_KEY }).base(AIRTABLE_BASE_ID);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ success: false, error: 'Méthode non autorisée. Utilisez POST.' });
  }

  try {
    const data = req.body;

    // Validation minimale obligatoire
    if (
      !data.Prenom || !data.Nom || !data.Email || !data.Telephone ||
      !data.Titre || !data.Localisation || !data.Experience ||
      !data.Type_de_contrat || !data.Disponibilite || !data.TJM ||
      !data.Competences || !data.Description
    ) {
      return res.status(400).json({ success: false, error: 'Champs obligatoires manquants.' });
    }

    // Préparation des champs correspondant aux noms Airtable
    const fields = {
      'Prénom': data.Prenom,
      'Nom': data.Nom,
      'Email': data.Email,
      'Téléphone': data.Telephone,
      'Titre': data.Titre,
      'Localisation': data.Localisation,
      'Expérience': data.Experience,
      'Type de contrat': data.Type_de_contrat,
      'Disponibilité': data.Disponibilite,
      'Compétences': Array.isArray(data.Competences) ? data.Competences.join(', ') : data.Competences,
      'Description': data.Description,
      'TJM': Number(data.TJM),
      'Cooptation': Boolean(data.Cooptation),
      'CV URL': data.CV_URL || '',
      'Statut': data.Statut || 'Inactif',
      'Date de création': data.Date_de_creation || new Date().toISOString().split('T')[0],
      'Note de synthèse AI': data.Note_de_synthese_AI || '',
      'Catégorisation de séniorité AI': data.Categorisation_de_seniorite_AI || ''
    };

    const createdRecord = await base(AIRTABLE_TABLE_NAME).create([{ fields }]);

    return res.status(200).json({ success: true, record: createdRecord[0] });

  } catch (error) {
    console.error('Erreur save-postuler:', error);
    return res.status(500).json({ success: false, error: error.message || 'Erreur serveur' });
  }
}
