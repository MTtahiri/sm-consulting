import Airtable from 'airtable';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  
  const { nom, email, telephone, poste, competences, cvUrl } = req.body;

  if (!nom || !email || !poste) {
    return res.status(400).json({ error: 'Champs obligatoires manquants' });
  }
  
  try {
    const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
      .base(process.env.AIRTABLE_BASE_ID);
    
    // Séparation prénom / nom simple
    const nomParts = nom.trim().split(' ');
    const prenom = nomParts[0];
    const nomFamille = nomParts.slice(1).join(' ') || '';

    await base('CV consulting').create([
      {
        fields: {
          prenom,
          nom: nomFamille,
          email,
          telephone,
          poste,
          competences,
          cv_file_path: cvUrl,
          statut: 'Nouveau',
          date_ajout: new Date().toISOString(),
        }
      }
    ]);
    
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
