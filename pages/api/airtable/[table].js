// /pages/api/airtable/[table].js

import Airtable from 'airtable';

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;

if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
  throw new Error('Variables AIRTABLE_API_KEY et AIRTABLE_BASE_ID sont requises');
}

const base = new Airtable({ apiKey: AIRTABLE_API_KEY }).base(AIRTABLE_BASE_ID);

export default async function handler(req, res) {
  const { table } = req.query;

  if (!['Candidats', 'Recruteurs', 'Offres', 'Contacts', 'Candidatures'].includes(table)) {
    return res.status(400).json({ success: false, error: 'Table Airtable invalide' });
  }

  try {
    switch (req.method) {
      case 'GET':
        // Exemple : supporte pagination, filtrage simple via query params
        const { filterByFormula, sortField, sortDirection = 'desc', pageSize = 100 } = req.query;

        const records = [];
        await base(table)
          .select({
            filterByFormula: filterByFormula || undefined,
            sort: sortField ? [{ field: sortField, direction: sortDirection }] : undefined,
            pageSize: Number(pageSize),
          })
          .eachPage((pageRecords, fetchNextPage) => {
            records.push(...pageRecords);
            fetchNextPage();
          });

        return res.status(200).json({
          success: true,
          records: records.map(record => ({
            id: record.id,
            fields: record.fields,
          })),
        });

      case 'POST':
        const fields = req.body.fields;
        if (!fields || typeof fields !== 'object') {
          return res.status(400).json({ success: false, error: 'Champs invalides' });
        }

        const createdRecords = await base(table).create([{ fields }]);
        return res.status(200).json({
          success: true,
          records: createdRecords.map(record => ({
            id: record.id,
            fields: record.fields,
          })),
        });

      case 'PATCH':
        // Nécessite id et fields
        const { id, updateFields } = req.body;
        if (!id || !updateFields) {
          return res.status(400).json({ success: false, error: 'ID et champs à mettre à jour requis' });
        }
        const updatedRecord = await base(table).update([{ id, fields: updateFields }]);
        return res.status(200).json({
          success: true,
          records: updatedRecord.map(record => ({
            id: record.id,
            fields: record.fields,
          })),
        });

      default:
        res.setHeader('Allow', ['GET', 'POST', 'PATCH']);
        return res.status(405).json({ success: false, error: `Méthode ${req.method} non autorisée` });
    }
  } catch (err) {
    console.error('Airtable API error:', err);
    return res.status(500).json({ success: false, error: 'Erreur serveur Airtable' });
  }
}
