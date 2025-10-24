// Admin Dashboard - Revenue Tracking
// View revenue metrics and conversion performance

import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function RevenueDashboard() {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('30'); // 7, 30, 90 days

  useEffect(() => {
    fetchMetrics();
  }, [timeRange]);

  const fetchMetrics = async () => {
    try {
      const response = await fetch('/api/analytics/revenue-tracker');
      const data = await response.json();
      
      if (data.success && data.metrics) {
        setMetrics(data.metrics);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching metrics:', error);
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Revenue Dashboard - SM Consulting</title>
      </Head>

      <div className="dashboard-container">
        <header className="dashboard-header">
          <h1>💰 Revenue Dashboard</h1>
          <p>Suivi des performances de génération de revenus</p>
        </header>

        {/* Time Range Selector */}
        <div className="time-selector">
          <button 
            className={timeRange === '7' ? 'active' : ''}
            onClick={() => setTimeRange('7')}
          >
            7 jours
          </button>
          <button 
            className={timeRange === '30' ? 'active' : ''}
            onClick={() => setTimeRange('30')}
          >
            30 jours
          </button>
          <button 
            className={timeRange === '90' ? 'active' : ''}
            onClick={() => setTimeRange('90')}
          >
            90 jours
          </button>
        </div>

        {/* Revenue Metrics */}
        {loading ? (
          <div className="loading">Chargement des métriques...</div>
        ) : metrics ? (
          <div className="metrics-grid">
            <div className="metric-card primary">
              <div className="metric-label">Valeur estimée du pipeline</div>
              <div className="metric-value">€{metrics.estimatedPipelineValue.toLocaleString()}</div>
              <div className="metric-desc">{metrics.hotLeads} leads chauds</div>
            </div>
            
            <div className="metric-card success">
              <div className="metric-label">Revenus estimés</div>
              <div className="metric-value">€{metrics.estimatedRevenue.toLocaleString()}</div>
              <div className="metric-desc">{metrics.appointmentsBooked} rendez-vous</div>
            </div>
            
            <div className="metric-card warning">
              <div className="metric-label">Taux de conversion</div>
              <div className="metric-value">{metrics.conversionRate}%</div>
              <div className="metric-desc">Rendez-vous / Total leads</div>
            </div>
            
            <div className="metric-card info">
              <div className="metric-label">Valeur moyenne par lead</div>
              <div className="metric-value">€{metrics.avgLeadValue.toLocaleString()}</div>
              <div className="metric-desc">Basé sur l'historique</div>
            </div>
          </div>
        ) : (
          <div className="error">Erreur lors du chargement des métriques</div>
        )}

        {/* Performance Insights */}
        <div className="insights-section">
          <h2>🚀 Recommandations pour accélérer les revenus</h2>
          
          <div className="insights-grid">
            <div className="insight-card">
              <h3>📞 Priorité aux leads chauds</h3>
              <p>Contactez immédiatement les leads avec un score ≥ 8 pour maximiser les conversions.</p>
              <div className="priority high">Haute priorité</div>
            </div>
            
            <div className="insight-card">
              <h3>⏰ Suivi rapide</h3>
              <p>Les leads contactés dans les 30 minutes ont 3x plus de chances de convertir.</p>
              <div className="priority medium">Priorité moyenne</div>
            </div>
            
            <div className="insight-card">
              <h3>🎯 Personnalisation</h3>
              <p>Mentionnez le nom de l'entreprise et les besoins spécifiques dans vos premiers contacts.</p>
              <div className="priority medium">Priorité moyenne</div>
            </div>
            
            <div className="insight-card">
              <h3>📈 Upselling</h3>
              <p>Proposez des packages de services supplémentaires aux clients qui réservent.</p>
              <div className="priority low">Basse priorité</div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="actions-section">
          <h2>⚡ Actions rapides</h2>
          
          <div className="actions-grid">
            <Link href="/admin/leads" className="action-button primary">
              📋 Voir tous les leads
            </Link>
            
            <a href="https://calendly.com/moha-tahiri" target="_blank" rel="noopener noreferrer" className="action-button success">
              📅 Vérifier Calendly
            </a>
            
            <a href="https://plausible.io/rh-prospects.fr" target="_blank" rel="noopener noreferrer" className="action-button warning">
              📊 Voir analytics
            </a>
            
            <a href="https://airtable.com" target="_blank" rel="noopener noreferrer" className="action-button info">
              📁 Accéder Airtable
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        .dashboard-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 40px 20px;
        }

        .dashboard-header {
          margin-bottom: 40px;
        }

        .dashboard-header h1 {
          font-size: 32px;
          margin: 0 0 8px 0;
          color: #1f2937;
        }

        .dashboard-header p {
          color: #6b7280;
          margin: 0;
        }

        .time-selector {
          display: flex;
          gap: 12px;
          margin-bottom: 30px;
        }

        .time-selector button {
          padding: 10px 20px;
          border: 2px solid #e5e7eb;
          background: white;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s;
          font-weight: 500;
        }

        .time-selector button.active {
          background: #6366f1;
          color: white;
          border-color: #6366f1;
        }

        .time-selector button:hover:not(.active) {
          border-color: #6366f1;
        }

        .loading, .error {
          text-align: center;
          padding: 60px 20px;
          color: #6b7280;
          font-size: 18px;
        }

        .error {
          color: #ef4444;
        }

        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          margin-bottom: 40px;
        }

        .metric-card {
          background: white;
          padding: 24px;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          border-left: 4px solid #6366f1;
        }

        .metric-card.primary {
          border-left-color: #6366f1;
        }

        .metric-card.success {
          border-left-color: #10b981;
        }

        .metric-card.warning {
          border-left-color: #f59e0b;
        }

        .metric-card.info {
          border-left-color: #3b82f6;
        }

        .metric-label {
          font-size: 14px;
          color: #6b7280;
          margin-bottom: 8px;
          font-weight: 500;
        }

        .metric-value {
          font-size: 32px;
          font-weight: bold;
          color: #1f2937;
          margin-bottom: 4px;
        }

        .metric-desc {
          font-size: 14px;
          color: #6b7280;
        }

        .insights-section {
          margin-bottom: 40px;
        }

        .insights-section h2 {
          font-size: 24px;
          margin: 0 0 20px 0;
          color: #1f2937;
        }

        .insights-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
        }

        .insight-card {
          background: white;
          padding: 24px;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .insight-card h3 {
          margin: 0 0 12px 0;
          color: #1f2937;
          font-size: 18px;
        }

        .insight-card p {
          color: #6b7280;
          margin: 0 0 16px 0;
          line-height: 1.5;
        }

        .priority {
          display: inline-block;
          padding: 4px 12px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 600;
        }

        .priority.high {
          background: #fee2e2;
          color: #991b1b;
        }

        .priority.medium {
          background: #fef3c7;
          color: #92400e;
        }

        .priority.low {
          background: #e5e7eb;
          color: #374151;
        }

        .actions-section {
          margin-bottom: 40px;
        }

        .actions-section h2 {
          font-size: 24px;
          margin: 0 0 20px 0;
          color: #1f2937;
        }

        .actions-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
        }

        .action-button {
          padding: 16px 24px;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
          font-size: 16px;
          transition: all 0.2s;
          text-align: center;
          text-decoration: none;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .action-button.primary {
          background: #6366f1;
          color: white;
        }

        .action-button.success {
          background: #10b981;
          color: white;
        }

        .action-button.warning {
          background: #f59e0b;
          color: white;
        }

        .action-button.info {
          background: #3b82f6;
          color: white;
        }

        .action-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        @media (max-width: 768px) {
          .metrics-grid, .insights-grid, .actions-grid {
            grid-template-columns: 1fr;
          }
          
          .dashboard-container {
            padding: 20px 16px;
          }
          
          .metric-value {
            font-size: 24px;
          }
        }
      `}</style>
    </>
  );
}