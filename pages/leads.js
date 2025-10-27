// Admin Dashboard - Lead Management
// View and manage leads captured by the AI chatbot

import { useState, useEffect } from 'react';
import Head from 'next/head';

export default function LeadsDashboard() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, hot, warm, cold
  const [sortBy, setSortBy] = useState('date'); // date, score

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      // Fetch leads from Airtable via API
      const response = await fetch('/api/crm/get-leads');
      const data = await response.json();
      
      if (data.success && data.leads) {
        setLeads(data.leads);
      } else {
        console.error('Failed to fetch leads:', data.error);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching leads:', error);
      setLoading(false);
    }
  };

  const filteredLeads = leads.filter(lead => {
    if (filter === 'all') return true;
    if (filter === 'hot') return lead.score >= 7;
    if (filter === 'warm') return lead.score >= 4 && lead.score < 7;
    if (filter === 'cold') return lead.score < 4;
    return true;
  });

  const sortedLeads = [...filteredLeads].sort((a, b) => {
    if (sortBy === 'score') return b.score - a.score;
    if (sortBy === 'date') return new Date(b.timestamp) - new Date(a.timestamp);
    return 0;
  });

  const getScoreBadge = (score) => {
    if (score >= 7) return { color: '#10b981', label: 'Chaud 🔥' };
    if (score >= 4) return { color: '#f59e0b', label: 'Tiède 🌡️' };
    return { color: '#6b7280', label: 'Froid ❄️' };
  };

  return (
    <>
      <Head>
        <title>Leads Dashboard - SM Consulting</title>
      </Head>

      <div className="dashboard-container">
        <header className="dashboard-header">
          <h1>📊 Dashboard des Leads</h1>
          <p>Leads capturés par l'assistant IA</p>
        </header>

        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-label">Total Leads</div>
            <div className="stat-value">{leads.length}</div>
          </div>
          <div className="stat-card hot">
            <div className="stat-label">Leads Chauds</div>
            <div className="stat-value">{leads.filter(l => l.score >= 7).length}</div>
          </div>
          <div className="stat-card warm">
            <div className="stat-label">Leads Tièdes</div>
            <div className="stat-value">{leads.filter(l => l.score >= 4 && l.score < 7).length}</div>
          </div>
          <div className="stat-card cold">
            <div className="stat-label">Leads Froids</div>
            <div className="stat-value">{leads.filter(l => l.score < 4).length}</div>
          </div>
        </div>

        {/* Filters */}
        <div className="controls">
          <div className="filters">
            <button 
              className={filter === 'all' ? 'active' : ''}
              onClick={() => setFilter('all')}
            >
              Tous
            </button>
            <button 
              className={filter === 'hot' ? 'active' : ''}
              onClick={() => setFilter('hot')}
            >
              🔥 Chauds
            </button>
            <button 
              className={filter === 'warm' ? 'active' : ''}
              onClick={() => setFilter('warm')}
            >
              🌡️ Tièdes
            </button>
            <button 
              className={filter === 'cold' ? 'active' : ''}
              onClick={() => setFilter('cold')}
            >
              ❄️ Froids
            </button>
          </div>

          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="date">Trier par date</option>
            <option value="score">Trier par score</option>
          </select>
        </div>

        {/* Leads Table */}
        <div className="leads-table">
          {loading ? (
            <div className="loading">Chargement des leads...</div>
          ) : sortedLeads.length === 0 ? (
            <div className="empty-state">
              <p>Aucun lead pour le moment</p>
              <small>Les leads capturés par le chatbot apparaîtront ici</small>
            </div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Entreprise</th>
                  <th>Contact</th>
                  <th>Email</th>
                  <th>Besoin</th>
                  <th>Urgence</th>
                  <th>Score</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {sortedLeads.map((lead, idx) => {
                  const badge = getScoreBadge(lead.score);
                  return (
                    <tr key={idx}>
                      <td>{new Date(lead.timestamp).toLocaleDateString('fr-FR')}</td>
                      <td><strong>{lead.entreprise || 'N/A'}</strong></td>
                      <td>{lead.nom || 'N/A'}</td>
                      <td>
                        {lead.email ? (
                          <a href={`mailto:${lead.email}`}>{lead.email}</a>
                        ) : 'N/A'}
                      </td>
                      <td className="besoin">{lead.besoin || 'N/A'}</td>
                      <td>
                        <span className={`urgence-badge ${lead.urgence?.toLowerCase()}`}>
                          {lead.urgence || 'N/A'}
                        </span>
                      </td>
                      <td>
                        <span 
                          className="score-badge" 
                          style={{ backgroundColor: badge.color }}
                        >
                          {lead.score}/10
                        </span>
                      </td>
                      <td>
                        <div className="action-buttons">
                          {lead.email && (
                            <button 
                              className="btn-small"
                              onClick={() => window.location.href = `mailto:${lead.email}`}
                            >
                              📧
                            </button>
                          )}
                          <button className="btn-small">👁️</button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
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

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
          margin-bottom: 30px;
        }

        .stat-card {
          background: white;
          padding: 24px;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          border-left: 4px solid #6366f1;
        }

        .stat-card.hot {
          border-left-color: #10b981;
        }

        .stat-card.warm {
          border-left-color: #f59e0b;
        }

        .stat-card.cold {
          border-left-color: #6b7280;
        }

        .stat-label {
          font-size: 14px;
          color: #6b7280;
          margin-bottom: 8px;
        }

        .stat-value {
          font-size: 32px;
          font-weight: bold;
          color: #1f2937;
        }

        .controls {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
          flex-wrap: wrap;
          gap: 16px;
        }

        .filters {
          display: flex;
          gap: 8px;
        }

        .filters button {
          padding: 8px 16px;
          border: 2px solid #e5e7eb;
          background: white;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .filters button.active {
          background: #6366f1;
          color: white;
          border-color: #6366f1;
        }

        .filters button:hover:not(.active) {
          border-color: #6366f1;
        }

        select {
          padding: 8px 16px;
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          background: white;
          cursor: pointer;
        }

        .leads-table {
          background: white;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }

        table {
          width: 100%;
          border-collapse: collapse;
        }

        thead {
          background: #f9fafb;
        }

        th {
          text-align: left;
          padding: 16px;
          font-weight: 600;
          color: #374151;
          border-bottom: 2px solid #e5e7eb;
        }

        td {
          padding: 16px;
          border-bottom: 1px solid #f3f4f6;
        }

        tbody tr:hover {
          background: #f9fafb;
        }

        .besoin {
          max-width: 200px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .score-badge {
          display: inline-block;
          padding: 4px 12px;
          border-radius: 12px;
          color: white;
          font-weight: 600;
          font-size: 14px;
        }

        .urgence-badge {
          display: inline-block;
          padding: 4px 12px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 600;
        }

        .urgence-badge.haute {
          background: #fee2e2;
          color: #991b1b;
        }

        .urgence-badge.moyenne {
          background: #fef3c7;
          color: #92400e;
        }

        .urgence-badge.basse {
          background: #e5e7eb;
          color: #374151;
        }

        .action-buttons {
          display: flex;
          gap: 8px;
        }

        .btn-small {
          padding: 6px 12px;
          border: 1px solid #e5e7eb;
          background: white;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-small:hover {
          background: #f3f4f6;
        }

        .loading, .empty-state {
          text-align: center;
          padding: 60px 20px;
          color: #6b7280;
        }

        .empty-state small {
          display: block;
          margin-top: 8px;
          font-size: 14px;
        }

        @media (max-width: 768px) {
          .leads-table {
            overflow-x: auto;
          }

          table {
            min-width: 800px;
          }
        }
      `}</style>
    </>
  );
}
