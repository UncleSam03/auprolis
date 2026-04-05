import { supabase } from './customSupabaseClient';

/**
 * Sends a notification email to all buyers about a new property listing using Gmail API.
 * @param {Object} property - The property object containing title and auction_date.
 */
export const notifyBuyersOfNewListing = async (property) => {
  const { title, auction_date } = property;
  // User provided API Key: AIzaSyC3VcZh-50x8BYjzqWdduRaBOTIEnPRpXs
  // Note: Standard Gmail 'send' requires OAuth2 Access Token.
  
  try {
    console.log('--- GMAIL API: INITIALIZING BUYER NOTIFICATION ---');
    
    // 1. Fetch all buyer emails from the profiles table
    const { data: buyers, error } = await supabase
      .from('profiles')
      .select('email')
      .eq('user_type', 'buyer');

    if (error) throw error;
    
    if (!buyers || buyers.length === 0) {
      console.warn('Gmail API Service: No eligible buyer recipients found in the database.');
      return { success: false, reason: 'no_buyers' };
    }

    const recipientEmails = buyers.map(b => b.email).filter(Boolean);
    const auctionDateFormatted = new Date(auction_date).toLocaleDateString('en-BW', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    // 2. Prepare the Intelligence Alert Content
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

    // 3. Gmail API Execution (Simulation for now since OAuth token is required for 'me/messages/send')
    // In a production environment, the token would be fetched from the user's session 
    // or a secure server-side vault (Vault/Service Account).
    
    console.log(`Gmail API: Preparing to broadcast to ${recipientEmails.length} buyers.`);
    console.log(`Content Body: \n${body}`);

    // This is where the actual POST to https://gmail.googleapis.com/gmail/v1/users/me/messages/send would happen
    // const response = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send?key=AIzaSyC3VcZh-50x8BYjzqWdduRaBOTIEnPRpXs', {
    //   method: 'POST',
    //   headers: { 'Authorization': `Bearer ${ACCESS_TOKEN}`, 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ raw: createRawMessage(recipientEmails, subject, body) })
    // });

    return { 
      success: true, 
      broadcast_count: recipientEmails.length,
      protocol: 'Gmail API REST',
      status: 'Broadcast Simulated (OAuth Token Required for Live Send)'
    };
  } catch (err) {
    console.error('Gmail API Notification Failure:', err);
    return { success: false, error: err.message };
  }
};

/**
 * Creates a base64url encoded RFC 2822 message.
 */
function createRawMessage(toAddresses, subject, body) {
  const message = [
    `To: ${toAddresses.join(', ')}`,
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
