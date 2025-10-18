import { useState } from 'react';

export default function Candidats() {
  const [siret, setSiret] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [statusClass, setStatusClass] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [accessGranted, setAccessGranted] = useState(false);
  const [validating, setValidating] = useState(false);

  function handleInputChange(e) {
    const value = e.target.value.replace(/\s/g, '');
    setSiret(value);
    if (value.length === 14 && /^\d+$/.test(value)) {
      validateSIRET(value);
    } else if (value.length > 0) {
      setStatusClass('status-invalid');
      setStatusMessage('Le SIRET doit contenir 14 chiffres');
      setIsValid(false);
    } else {
      setStatusMessage('');
      setStatusClass('');
      setIsValid(false);
    }
  }

  function validateSIRET(siretNumber) {
    setValidating(true);
    setStatusClass('');
    setStatusMessage('Validation en cours...');
    setIsValid(false);
    setTimeout(() => {
      const valid = luhnCheck(siretNumber);
      if (valid) {
        setStatusClass('status-valid');
        setStatusMessage('✅ SIRET valide - Entreprise vérifiée');
        setIsValid(true);
      } else {
        setStatusClass('status-invalid');
        setStatusMessage('❌ SIRET invalide ou entreprise non trouvée');
        setIsValid(false);
      }
      setValidating(false);
    }, 1500);
  }

  function luhnCheck(value) {
    if (value.length !== 14) return false;
    let sum = 0;
    let even = false;
    for (let i = value.length - 1; i >= 0; i--) {
      let digit = parseInt(value[i], 10);
      if (even) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      sum += digit;
      even = !even;
    }
    return sum % 10 === 0;
  }

  function handleValidateClick() {
    setAccessGranted(true);
    setIsValid(false);
    setTimeout(() => {
      window.location.href = '/candidats-list';
    }, 2000);
  }

  return (
    <>
      <section className="protected-section">
        <div className="container">
          <div className="protected-container">
            <div className="protected-icon" aria-hidden="true">🔒</div>
            <h1 className="protected-title">Accès Réservé aux Recruteurs</h1>
            <p className="protected-subtitle">
              Cette section est exclusivement réservée aux recruteurs partenaires.
              Veuillez valider votre numéro SIRET pour accéder à notre base de candidats.
            </p>

            <div className="siret-form">
              <div className="form-group">
                <label htmlFor="siret">Numéro SIRET de votre entreprise</label>
                <input
                  type="text"
                  id="siret"
                  value={siret}
                  maxLength={14}
                  placeholder="14 chiffres (ex: 12345678901234)"
                  onChange={handleInputChange}
                  aria-describedby="siretStatus"
                />
                <div
                  id="siretStatus"
                  className={`siret-status ${statusClass}`}
                  role={statusClass === 'status-invalid' ? 'alert' : undefined}
                  aria-live="polite"
                >
                  {statusMessage}
                </div>
              </div>
              <button
                className="btn"
                onClick={handleValidateClick}
                disabled={!isValid || validating}
                aria-disabled={!isValid || validating}
              >
                Valider et accéder
              </button>
            </div>

            {accessGranted && (
              <div className="access-granted" role="alert">
                <h3>✅ Accès autorisé !</h3>
                <p>Redirection vers notre base de candidats...</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
