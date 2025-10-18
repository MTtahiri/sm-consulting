import formidable from 'formidable';
import fs from 'fs';
import mega from 'megajs';

// Désactive le bodyParser natif de Next.js pour le multipart/form-data
export const config = {
  api: {
    bodyParser: false,
  },
};

// Utilitaire pour convertir méthode callback MEGA en Promise
function uploadFilePromise(folder, filename, buffer) {
  return new Promise((resolve, reject) => {
    folder.uploadFile(filename, buffer, (err, fileEntry) => {
      if (err) return reject(err);
      resolve(fileEntry);
    });
  });
}

function getLinkPromise(fileEntry) {
  return new Promise((resolve, reject) => {
    fileEntry.link((err, link) => {
      if (err) return reject(err);
      resolve(link);
    });
  });
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const form = new formidable.IncomingForm();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('Error parsing form:', err);
      return res.status(500).json({ error: 'Error parsing form data' });
    }

    const file = files.file;

    if (!file) {
      return res.status(400).json({ error: 'No file provided' });
    }

    try {
      // Connexion MEGA
      const storage = await mega.login({
        email: process.env.MEGA_EMAIL,
        password: process.env.MEGA_PASSWORD,
      });

      // Récupère dossier racine (avec await qui gère bien la promesse)
      const root = await new Promise((resolve, reject) => {
        storage.rootFolder().loadAttributes((err, rootFolder) => {
          if (err) reject(err);
          else resolve(rootFolder);
        });
      });

      // Recherche ou création du dossier "CVs_Candidats"
      const folderName = 'CVs_Candidats';
      let targetFolder = root.children.find(c => c.name === folderName && c.directory);

      if (!targetFolder) {
        targetFolder = await new Promise((resolve, reject) => {
          root.uploadFolder(folderName, (err, newFolder) => {
            if (err) reject(err);
            else resolve(newFolder);
          });
        });
      }

      // Lit le fichier en buffer
      const fileBuffer = fs.readFileSync(file.filepath);

      // Prépare nom unique pour fichier
      const timestamp = Date.now();
      const sanitizedFilename = `${timestamp}-${file.originalFilename}`;

      // Upload fichier vers MEGA
      const fileEntry = await uploadFilePromise(targetFolder, sanitizedFilename, fileBuffer);

      // Récupère lien public MEGA
      const link = await getLinkPromise(fileEntry);

      return res.status(200).json({
        success: true,
        fileUrl: link,
      });
    } catch (uploadError) {
      console.error('MEGA upload error:', uploadError);
      return res.status(500).json({ error: 'MEGA upload failed' });
    }
  });
}
