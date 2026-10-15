const API_KEY = 'txb_vErR8QBKgQSyL0E4z9jHhiW7P9jwWHSj';
const DEVICE_ID = '6ad1021874e21da91a605a11';
const BASE_URL = 'https://api.textbee.dev/api/v1/gateway/devices';

// List of recipient phone numbers
const recipients = [
    '+12287600179'
];

const messageText = 'Hello from Bayou View Studio! Here is your ministry update and schedule for this week.';

// Helper function to create a delay between messages
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function sendSMS(phoneNumber, message) {
  try {
    const response = await fetch(`${BASE_URL}/${DEVICE_ID}/send-sms`, {
      method: 'POST',
      headers: {
        'x-api-key': API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        recipients: [phoneNumber],
        message: message,
      }),
    });

    const data = await response.json();
    if (response.ok) {
      console.log(`[SUCCESS] Sent to ${phoneNumber}`);
    } else {
      console.error(`[FAILED] Error sending to ${phoneNumber}:`, data.message || data);
    }
  } catch (error) {
    console.error(`[ERROR] Network error for ${phoneNumber}:`, error.message);
  }
}

async function startBroadcast() {
  console.log(`Starting broadcast to ${recipients.length} recipients...`);
  
  for (let i = 0; i < recipients.length; i++) {
    await sendSMS(recipients[i], messageText);
    
    // Stagger by 2 seconds if there are more recipients in the queue
    if (i < recipients.length - 1) {
      await delay(2000);
    }
  }
  
  console.log('Broadcast complete!');
}

startBroadcast();