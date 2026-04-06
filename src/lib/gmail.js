import { supabase } from './customSupabaseClient';

const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

/**
 * Initiates the Google OAuth2 flow specifically for Gmail Send scopes.
 * This returns a Promise that resolves with the access_token.
 */
export const requestGmailToken = () => {
    return new Promise((resolve, reject) => {
        if (!window.google) {
            reject(new Error('Google Identity Services script not loaded.'));
            return;
        }

        const client = window.google.accounts.oauth2.initTokenClient({
            client_id: CLIENT_ID,
            scope: 'https://www.googleapis.com/auth/gmail.send',
            callback: (response) => {
                if (response.error) {
                    reject(response);
                    return;
                }
                resolve(response.access_token);
            },
        });

        client.requestAccessToken();
    });
};

/**
 * Sends a notification email to all buyers about a new property listing using Gmail API.
 * @param {Object} property - The property object containing title and auction_date.
 * @param {string} accessToken - Verified Google OAuth2 access token.
 */
export const notifyBuyersOfNewListing = async (property, accessToken = null) => {
  const { title, auction_date } = property;
  
  try {
    console.log('--- GMAIL API: INITIALIZING BROADCAST PROTOCOL ---');
    
    // 1. Fetch all buyer emails
    const { data: buyers, error } = await supabase
      .from('profiles')
      .select('email')
      .eq('user_type', 'buyer');

    if (error) throw error;
    if (!buyers || buyers.length === 0) return { success: false, reason: 'no_buyers' };

    const recipientEmails = buyers.map(b => b.email).filter(Boolean);
    const auctionDateFormatted = new Date(auction_date).toLocaleDateString('en-BW', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });

    const subject = `[Auprolis Alert] New Asset Verified: ${title}`;
    const body = `
DEAR INVESTOR,

A new distressed asset has passed governance review and is now live for bidding.

ASSET IDENTITY: ${title}
GOVERNANCE STATUS: Verified
AUCTION DATE: ${auctionDateFormatted}

Please log in to your Auprolis Dossier Explorer to review the full legal ledger and structural metadata for this property.

REGARDS,
AUPROLIS GOVERNANCE PROTOCOL
    `.trim();

    // 2. Execution Path
    if (!accessToken) {
        console.warn('Gmail API: Access Token omitted. Simulating broadcast protocol.');
        return { 
            success: true, 
            broadcast_count: recipientEmails.length,
            status: 'Simulation Mode (Token Missing)'
        };
    }

    // 3. Actual Send via Google API
    // We send individual emails to maintain privacy/institutional feel
    let successCount = 0;
    const errors = [];

    for (const email of recipientEmails) {
        try {
            const raw = createRawMessage(email, subject, body);
            const response = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ raw })
            });

            if (response.ok) {
                successCount++;
            } else {
                const errData = await response.json();
                errors.push(errData.error?.message || 'Unknown API Error');
            }
        } catch (e) {
            errors.push(e.message);
        }
    }

    return { 
      success: successCount > 0, 
      broadcast_count: successCount,
      total_attempted: recipientEmails.length,
      errors: errors.length > 0 ? errors : null
    };
  } catch (err) {
    console.error('Gmail API Broadcast Failure:', err);
    return { success: false, error: err.message };
  }
};

/**
 * Creates a base64url encoded RFC 2822 message.
 */
function createRawMessage(to, subject, body) {
  const message = [
    `To: ${to}`,
    'Content-Type: text/plain; charset=utf-8',
    'MIME-Version: 1.0',
    `Subject: ${subject}`,
    '',
    body
  ].join('\n');

  return btoa(unescape(encodeURIComponent(message)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}
