import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Candidats() {
  const [siret, setSiret] = useState('');
  const [status, setStatus] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [accessGranted, setAccessGranted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
  const AIRTABLE_BASE_ID = 'appG0HD7kW6ejvCkG';
  const AIRTABLE_TABLE_RECRUTEURS = 'Recruteurs';

  // Validation Luhn (structure du SIRET)
  const validateSIRETLuhn = (siret) => {
    if (siret.length !== 14) return false;
    
    let sum = 0;
    let isEven = false;
    
    for (let i = siret.length - 1; i >= 0; i--) {
      let digit = parseInt(siret[i], 10);
      
      if (isEven) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      
      sum += digit;
      isEven = !isEven;
    }
    
    return sum % 10 === 0;
  };

  // Vérification dans Airtable
  const checkSIRETInDatabase = async (siretValue) => {
    try {
      const response = await fetch(
        `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_RECRUTEURS}?filterByFormula=AND({siret}='${siretValue}', {statut}='Validé')`,
        {
          headers: {
            Authorization: `Bearer ${AIRTABLE_API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Erreur API Airtable');
      }

      const data = await response.json();
      return data.records.length > 0 ? data.records[0] : null;
    } catch (error) {
      console.error('Erreur vérification SIRET:', error);
      return null;
    }
  };

  const handleSiretChange = (e) => {
    const value = e.target.value.replace(/\s/g, '');
    setSiret(value);
    setErrorMessage('');
    
    if (value.length === 14 && /^\d+$/.test(value)) {
      validateSIRET(value);
    } else if (value.length > 0) {
      setStatus('invalid');
      setIsValid(false);
      setErrorMessage('Le SIRET doit contenir 14 chiffres');
    } else {
      setStatus('');
      setIsValid(false);
    }
  };

  const validateSIRET = async (siretValue) => {
    setStatus('loading');
    setIsLoading(true);
    setIsValid(false);
    setErrorMessage('');

    // 1. Vérifier la structure (Luhn)
    const structureValide = validateSIRETLuhn(siretValue);
    
    if (!structureValide) {
      setStatus('invalid');
      setIsValid(false);
      setIsLoading(false);
      setErrorMessage('❌ SIRET invalide (structure incorrecte)');
      return;
    }

    // 2. Vérifier dans la base de données
    const recruteur = await checkSIRETInDatabase(siretValue);

    setIsLoading(false);

    if (recruteur) {
      // SIRET trouvé et validé dans la base
      setStatus('valid');
      setIsValid(true);
      setErrorMessage('');
      
      // Stocker les infos du recruteur en session
      sessionStorage.setItem('recruteur_siret', siretValue);
      sessionStorage.setItem('recruteur_id', recruteur.id);
      sessionStorage.setItem('recruteur_entreprise', recruteur.fields.entreprise || '');
      sessionStorage.setItem('recruteur_connecte', 'true');
    } else {
      // SIRET non trouvé ou non validé
      setStatus('invalid');
      setIsValid(false);
      setErrorMessage('❌ SIRET non autorisé. Veuillez d\'abord vous inscrire ou attendre la validation de votre compte.');
    }
  };

  const handleValidate = () => {
    setAccessGranted(true);
    
    // Redirection après validation
    setTimeout(() => {
      router.push('/candidats-list');
    }, 1500);
  };

  return (
    <section className="protected-section">
      <div className="container">
        <div className="protected-container">
          <div className="protected-icon">🔒</div>
          <h1 className="protected-title">Accès Réservé aux Recruteurs Validés</h1>
          <p className="protected-subtitle">
            Cette section est exclusivement réservée aux recruteurs partenaires validés. 
            Veuillez entrer votre numéro SIRET pour accéder à notre base de candidats.
          </p>
          
          <div className="siret-form">
            <div className="form-group">
              <label htmlFor="siret">Numéro SIRET de votre entreprise</label>
              <input 
                type="text" 
                id="siret" 
                value={siret}
                onChange={handleSiretChange}
                maxLength="14" 
                placeholder="14 chiffres (ex: 12345678901234)"
              />
              <div className="siret-status">
                {status === 'loading' && (
                  <span className="status-loading">⏳ Vérification en cours...</span>
                )}
                {status === 'valid' && (
                  <span className="status-valid">
                    ✅ SIRET validé - Entreprise reconnue
                  </span>
                )}
                {status === 'invalid' && errorMessage && (
                  <span className="status-invalid">{errorMessage}</span>
                )}
              </div>
            </div>
            <button 
              onClick={handleValidate}
              className="btn btn-primary" 
              disabled={!isValid}
            >
              Valider et accéder
            </button>
          </div>
          
          {accessGranted && (
            <div className="access-granted">
              <h3>✅ Accès autorisé !</h3>
              <p>Redirection vers notre base de candidats...</p>
            </div>
          )}

          <div style={{ marginTop: '32px', textAlign: 'center' }}>
            <p style={{ color: 'var(--text-light)', marginBottom: '16px' }}>
              Vous n'avez pas encore de compte ?
            </p>
            <Link href="/inscription-recruteur" className="btn btn-secondary">
              📝 S'inscrire comme recruteur
            </Link>
          </div>

          <div style={{ marginTop: '24px' }}>
            <Link href="/" className="nav-link">← Retour à l'accueil</Link>
          </div>
        </div>
      </div>
    </section>
  );
}