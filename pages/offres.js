import { useState, useEffect } from 'react';
import Link from 'next/link';

const AIRTABLE_API_KEY = '...'; // (Idem dans ton code)
const AIRTABLE_BASE_ID = '...';
const AIRTABLE_TABLE_OFFRES = 'Offres';

const offresSimulees = [
  // Tes données simulées comme dans ton code
];

export default function Offres() {
  const [toutesLesOffres, setToutesLesOffres] = useState([]);
  const [offresAffichees, setOffresAffichees] = useState([]);
  const [filtres, setFiltres] = useState({
    techno: '',
    type: '',
    experience: '',
    localisation: '',
  });
  const [pageActuelle, setPageActuelle] = useState(1);
  const offresParPage = 6;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOffres() {
      setLoading(true);
      try {
        const res = await fetch(
          `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_OFFRES}?sort[0][field]=date_publication&sort[0][direction]=desc`,
          {
            headers: { Authorization: `Bearer ${AIRTABLE_API_KEY}` },
          }
        );
        if (!res.ok) throw new Error('Erreur API Airtable');
        const data = await res.json();
        const offres = data.records.map(record => ({
          // map comme dans ton code
        }));
        setToutesLesOffres(offres);
        setPageActuelle(1);
        setLoading(false);
      } catch (error) {
        console.error('Erreur API Airtable, chargement fallback:', error);
        setToutesLesOffres(offresSimulees);
        setPageActuelle(1);
        setLoading(false);
      }
    }
    fetchOffres();
  }, []);

  useEffect(() => {
    filtrerEtPaginer();
  }, [toutesLesOffres, filtres, pageActuelle]);

  function filtrerEtPaginer() {
    // Idem ta fonction
  }

  function handleChangeFilter(e) {
    // Idem ta fonction
  }

  function changerPage(numero) {
    setPageActuelle(numero);
  }

  const totalPages = Math.ceil(
    // Idem ta fonction
  );

  return (
    <>
      {/* Retire le header local */}
      <section className="offres-hero">
        {/* ... contenu hero, filtres, offres ... */}
      </section>

      <section id="offres" className="features" style={{ paddingTop: '0' }}>
        <div className="container">
          {loading ? (
            <div style={{ textAlign: 'center', padding: 60, fontSize: 18, color: 'var(--text-light)' }}>
              Chargement des offres...
            </div>
          ) : offresAffichees.length === 0 ? (
            <div style={{ textAlign: 'center', padding: 60, fontSize: 18, color: 'var(--text-light)', marginBottom: 16 }}>
              Aucune offre ne correspond à vos critères
              <br />
              <Link href="/inscription-recruteur" className="btn btn-primary" style={{ marginTop: 24 }}>
                Publier la première offre
              </Link>
            </div>
          ) : (
            <>
              {/* Ta grille d'offres et pagination */}
            </>
          )}
        </div>
      </section>

      <section className="offres-cta">
        {/* ... CTA ... */}
      </section>

      {/* Pas de footer local */}

      <style jsx>{`
        /* Place ta CSS ici ou mieux dans un fichier global */
      `}</style>
    </>
  );
}
