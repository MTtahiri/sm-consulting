import '../styles/global.css';

const MAINTENANCE = true;

function MaintenancePage() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #2557a7 0%, #00c4b4 100%)',
      fontFamily: "'Inter', -apple-system, sans-serif",
      padding: '24px',
      textAlign: 'center',
    }}>
      <div style={{
        background: 'white',
        borderRadius: '24px',
        padding: '60px 48px',
        maxWidth: '560px',
        width: '100%',
        boxShadow: '0 25px 60px rgba(0,0,0,0.2)',
      }}>
        <div style={{ fontSize: '64px', marginBottom: '16px' }}>🔧</div>

        <div style={{
          fontSize: '22px',
          fontWeight: 700,
          color: '#2557a7',
          marginBottom: '8px',
          letterSpacing: '-0.3px',
        }}>
          SM Consulting<span style={{
            background: 'linear-gradient(135deg, #2557a7, #00c4b4)',
            color: 'white',
            fontSize: '12px',
            padding: '2px 7px',
            borderRadius: '4px',
            marginLeft: '8px',
            verticalAlign: 'middle',
          }}>PRO</span>
        </div>

        <h1 style={{
          fontSize: '28px',
          fontWeight: 700,
          color: '#2d3748',
          margin: '24px 0 16px',
          lineHeight: 1.3,
        }}>
          Site en maintenance
        </h1>

        <p style={{
          color: '#718096',
          fontSize: '16px',
          lineHeight: 1.7,
          marginBottom: '32px',
        }}>
          Nous effectuons des améliorations pour mieux vous servir.
          Le site sera de retour très prochainement.
        </p>

        <div style={{
          background: 'linear-gradient(135deg, rgba(37,87,167,0.06), rgba(0,196,180,0.06))',
          border: '1px solid rgba(37,87,167,0.15)',
          borderRadius: '12px',
          padding: '20px',
          marginBottom: '32px',
        }}>
          <p style={{ margin: 0, color: '#2d3748', fontSize: '14px', fontWeight: 500 }}>
            Une question urgente ? Contactez-nous directement :
          </p>
          <a href="mailto:contact@rh-prospects.fr" style={{
            display: 'inline-block',
            marginTop: '10px',
            color: '#2557a7',
            fontWeight: 600,
            fontSize: '15px',
            textDecoration: 'none',
          }}>
            ✉ contact@rh-prospects.fr
          </a>
        </div>

        <p style={{ margin: 0, fontSize: '13px', color: '#a0aec0' }}>
          © 2025 SM Consulting — Merci de votre compréhension
        </p>
      </div>
    </div>
  );
}

import Layout from '../components/Layout';

export default function MyApp({ Component, pageProps }) {
  if (MAINTENANCE) {
    return <MaintenancePage />;
  }
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
