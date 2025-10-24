// Revenue Tracker API - Track lead value and conversion metrics
import Airtable from 'airtable';

export default async function handler(req, res) {
  if (req.method !== 'POST' && req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // GET request - return revenue metrics
  if (req.method === 'GET') {
    try {
      const metrics = await getRevenueMetrics();
      return res.status(200).json({
        success: true,
        metrics
      });
    } catch (error) {
      console.error('❌ Revenue metrics error:', error);
      return res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  // POST request - track lead conversion
  const { leadId, action, value } = req.body;

  try {
    // Track conversion event
    const conversionEvent = {
      lead_id: leadId,
      action: action, // 'appointment_booked', 'email_sent', 'call_made', 'deal_closed'
      value: value || 0, // € value of the action
      timestamp: new Date().toISOString()
    };

    // In a real implementation, you would save this to a database
    // For now, we'll just log it
    console.log('💰 Revenue tracking event:', conversionEvent);

    return res.status(200).json({
      success: true,
      message: 'Revenue event tracked',
      event: conversionEvent
    });

  } catch (error) {
    console.error('❌ Revenue tracking error:', error);
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
}

// Calculate revenue metrics from Airtable data
async function getRevenueMetrics() {
  try {
    const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
      .base(process.env.AIRTABLE_BASE_ID);

    // Fetch all leads
    const leads = [];
    await base('Leads').select({
      sort: [{ field: 'date_creation', direction: 'desc' }]
    }).eachPage((records, fetchNextPage) => {
      records.forEach(record => {
        leads.push({
          id: record.id,
          score: record.get('score') || 0,
          statut: record.get('statut') || 'Tiède',
          date_creation: record.get('date_creation'),
          entreprise: record.get('entreprise') || 'N/A'
        });
      });
      fetchNextPage();
    });

    // Calculate metrics
    const totalLeads = leads.length;
    const hotLeads = leads.filter(lead => lead.score >= 7).length;
    const appointmentsBooked = leads.filter(lead => 
      lead.statut === 'Chaud' && lead.score >= 8
    ).length;
    
    // Estimated revenue values (adjust based on your business)
    const avgLeadValue = 2500; // € average value per lead
    const avgAppointmentValue = 7500; // € average value per appointment
    const conversionRate = totalLeads > 0 ? (appointmentsBooked / totalLeads * 100) : 0;
    
    const estimatedPipelineValue = hotLeads * avgLeadValue;
    const estimatedRevenue = appointmentsBooked * avgAppointmentValue;

    return {
      totalLeads,
      hotLeads,
      appointmentsBooked,
      conversionRate: conversionRate.toFixed(1),
      estimatedPipelineValue,
      estimatedRevenue,
      avgLeadValue,
      avgAppointmentValue
    };

  } catch (error) {
    console.error('❌ Metrics calculation error:', error);
    throw error;
  }
}