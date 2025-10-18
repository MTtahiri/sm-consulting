// CONFIGURATION AIRTABLE SM CONSULTING
const AIRTABLE_CONFIG = {
  baseId: 'YOUR_BASE_ID_HERE',           // Remplace par ton base ID
  apiKey: 'YOUR_API_KEY_HERE',           // Remplace par ta clé API
  tables: {
    candidats: 'Candidats',
    recruteurs: 'Recruteurs',
    offres: 'Offres',
    contacts: 'Contacts',
  }
};

// Fonction simplifiée pour sauvegarder un enregistrement
async function saveToAirtable(tableName, data) {
  console.log('💾 Sauvegarde Airtable:', data);

  // Mode simulation si config non faite
  if (AIRTABLE_CONFIG.baseId === 'YOUR_BASE_ID_HERE' || AIRTABLE_CONFIG.apiKey === 'YOUR_API_KEY_HERE') {
    return {
      success: true,
      id: 'simulated_' + Date.now(),
      message: 'Mode simulation - Configurez Airtable',
    };
  }

  try {
    const url = `https://api.airtable.com/v0/${AIRTABLE_CONFIG.baseId}/${tableName}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${AIRTABLE_CONFIG.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ fields: data }),
    });

    if (response.ok) {
      const result = await response.json();
      return { success: true, id: result.id };
    } else {
      throw new Error(`Erreur Airtable: ${response.status} ${response.statusText}`);
    }
  } catch (error) {
    console.error('❌ Erreur Airtable:', error);
    return { success: false, error: error.message };
  }
}

// Fonction simplifiée pour récupérer les enregistrements d’une table
async function getFromAirtable(tableName) {
  console.log('📥 Récupération Airtable');

  if (AIRTABLE_CONFIG.baseId === 'YOUR_BASE_ID_HERE' || AIRTABLE_CONFIG.apiKey === 'YOUR_API_KEY_HERE') {
    return { records: [] };
  }

  try {
    const url = `https://api.airtable.com/v0/${AIRTABLE_CONFIG.baseId}/${tableName}`;
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${AIRTABLE_CONFIG.apiKey}`,
      },
    });

    if (response.ok) {
      return await response.json();
    } else {
      throw new Error(`Erreur récupération Airtable: ${response.status} ${response.statusText}`);
    }
  } catch (error) {
    console.error('Erreur Airtable:', error);
    return { records: [] };
  }
}

// Export global
window.AirtableService = {
  saveToAirtable,
  getFromAirtable,
  AIRTABLE_CONFIG,
};

console.log('✅ Service Airtable chargé');
