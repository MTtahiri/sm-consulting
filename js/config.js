// CONFIGURATION AIRTABLE - À MODIFIER AVEC VOS CLÉS
const AIRTABLE_CONFIG = {
    API_KEY: '***REMOVED***', // Votre clé API Airtable
    BASE_ID: '***REMOVED***', // ID de votre base Airtable
    TABLES: {
        CANDIDATS: 'Candidats',
        RECRUTEURS: 'Recruteurs', 
        OFFRES: 'Offres',
        CONTACTS: 'Contacts'
    }
};

// STRUCTURE AIRTABLE RECOMMANDÉE

/* TABLE CANDidats :
- titre (texte)
- localisation (texte) 
- experience (texte)
- disponibilite (texte)
- description (texte long)
- competences (multiple select)
- type_contrat (select)
- cv_url (url)
- date_creation (date)
*/

/* TABLE RECRUTEURS :
- siret (texte)
- entreprise (texte)
- prenom (texte)
- nom (texte) 
- poste (texte)
- telephone (texte)
- email (email)
- besoins (texte)
- nombre_recrutements (select)
- message (texte long)
- date_inscription (date)
- statut (select)
*/
