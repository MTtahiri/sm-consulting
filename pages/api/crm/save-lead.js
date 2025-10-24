// CRM API - Save Lead to Airtable
// Auto-captures qualified leads from AI chatbot conversations

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { type, nom, email, entreprise, besoin, urgence, score, timestamp } = req.body;

  // Validate lead data
  if (!type || type !== 'Entreprise') {
    return res.status(400).json({ error: 'Invalid lead type' });
  }

  try {
    const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
    const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
    const TABLE_NAME = 'Leads'; // You'll need to create this table in Airtable

    const leadRecord = {
      fields: {
        nom_contact: nom || 'Non renseigné',
        email: email || '',
        entreprise: entreprise || 'Non renseignée',
        besoin: besoin || '',
        urgence: urgence || 'Moyenne',
        score: score || 5,
        statut: score >= 7 ? 'Chaud' : score >= 4 ? 'Tiède' : 'Froid',
        source: 'Chatbot IA',
        date_creation: new Date().toISOString().split('T')[0],
        timestamp_conversation: timestamp,
      }
    };

    // Save to Airtable
    const airtableResponse = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${TABLE_NAME}`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(leadRecord),
      }
    );

    if (!airtableResponse.ok) {
      const errorData = await airtableResponse.json();
      console.error('❌ Airtable Error:', errorData);
      
      // If table doesn't exist, just log and return success (graceful degradation)
      if (errorData.error?.type === 'TABLE_NOT_FOUND') {
        console.warn('⚠️ Leads table not found in Airtable. Lead data logged but not saved.');
        console.log('📋 Lead Data:', leadRecord.fields);
        return res.status(200).json({ 
          success: true, 
          warning: 'Lead logged but Airtable table not configured',
          data: leadRecord.fields 
        });
      }
      
      throw new Error(`Airtable error: ${errorData.error?.message || 'Unknown error'}`);
    }

    const savedLead = await airtableResponse.json();

    console.log('✅ Lead saved successfully:', savedLead.id);

    // Send instant notification for hot leads
    if (score >= 8) {
      try {
        await sendHotLeadNotification(leadRecord.fields);
      } catch (notificationError) {
        console.error('⚠️ Failed to send hot lead notification:', notificationError);
      }
    }

    return res.status(200).json({
      success: true,
      leadId: savedLead.id,
      message: 'Lead saved to CRM',
    });

  } catch (error) {
    console.error('❌ CRM Save Error:', error);
    
    // Log lead data even if save fails
    console.log('📋 Lead Data (not saved):', { nom, email, entreprise, besoin, urgence, score });
    
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}

// Function to send instant notifications for hot leads
async function sendHotLeadNotification(leadData) {
  // Send to Slack if configured
  if (process.env.SLACK_WEBHOOK_URL) {
    try {
      await fetch(process.env.SLACK_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: `🔥 *HOT LEAD ALERT - ${leadData.entreprise || 'Entreprise'}*`,
          blocks: [
            {
              type: "header",
              text: {
                type: "plain_text",
                text: "🔥 HOT LEAD CAPTURED!"
              }
            },
            {
              type: "section",
              fields: [
                { 
                  type: "mrkdwn", 
                  text: `*Company:*\n${leadData.entreprise || 'N/A'}` 
                },
                { 
                  type: "mrkdwn", 
                  text: `*Contact:*\n${leadData.nom_contact || 'N/A'}` 
                },
                { 
                  type: "mrkdwn", 
                  text: `*Email:*\n${leadData.email || 'N/A'}` 
                },
                { 
                  type: "mrkdwn", 
                  text: `*Score:*\n${leadData.score}/10 🔥` 
                }
              ]
            },
            {
              type: "section",
              text: {
                type: "mrkdwn",
                text: `*Need:*\n${leadData.besoin || 'N/A'}`
              }
            },
            {
              type: "actions",
              elements: [
                {
                  type: "button",
                  text: { 
                    type: "plain_text", 
                    text: "📧 Contact Now" 
                  },
                  url: `mailto:${leadData.email}`,
                  style: "primary"
                },
                {
                  type: "button",
                  text: { 
                    type: "plain_text", 
                    text: "📅 Schedule Call" 
                  },
                  url: "https://calendly.com/moha-tahiri",
                  style: "danger"
                }
              ]
            }
          ]
        })
      });
    } catch (slackError) {
      console.error('⚠️ Slack notification failed:', slackError);
    }
  }

  // Send SMS notification if Twilio is configured
  if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN && process.env.TWILIO_PHONE_NUMBER) {
    try {
      const twilio = require('twilio');
      const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
      
      const message = `🔥 HOT LEAD: ${leadData.entreprise || 'Company'} - ${leadData.nom_contact || 'Contact'} - Score: ${leadData.score}/10`;
      
      await client.messages.create({
        body: message,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: process.env.SALES_MANAGER_PHONE // Sales manager's phone number
      });
    } catch (smsError) {
      console.error('⚠️ SMS notification failed:', smsError);
    }
  }
}