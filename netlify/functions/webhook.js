import Stripe from 'stripe'
 
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
 
export async function handler(event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' }
  }
 
  const sig = event.headers['stripe-signature']
 
  let stripeEvent
  try {
    stripeEvent = stripe.webhooks.constructEvent(
      event.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    )
  } catch (err) {
    console.error('Webhook signature failed:', err.message)
    return { statusCode: 400, body: `Webhook Error: ${err.message}` }
  }
 
  if (stripeEvent.type === 'checkout.session.completed') {
    const session = stripeEvent.data.object
    const buyerEmail = session.customer_details?.email
 
    if (!buyerEmail) {
      console.error('No email on session:', session.id)
      return { statusCode: 200, body: 'OK' }
    }
 
    try {
      await sendAlbumEmail(buyerEmail)
      console.log(`Email sent to ${buyerEmail}`)
    } catch (err) {
      console.error('Sender.net error:', err)
    }
  }
 
  return { statusCode: 200, body: 'OK' }
}
 
async function sendAlbumEmail(buyerEmail) {
  const response = await fetch('https://api.sender.net/v2/message/send', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.SENDER_API_KEY}`
    },
    body: JSON.stringify({
      from: {
        email: process.env.FROM_EMAIL,
        name: process.env.FROM_NAME
      },
      to: { email: buyerEmail },
      reply_to: process.env.YOUR_EMAIL,
      subject: 'severed — your access is here 🖤',
      html: buildEmail()
    })
  })
 
  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Sender.net responded ${response.status}: ${error}`)
  }
 
  return response.json()
}
 
function buildEmail() {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body style="margin:0;padding:0;background:#0f0d0b;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0f0d0b;padding:48px 24px;">
    <tr>
      <td align="center">
        <table width="480" cellpadding="0" cellspacing="0" style="max-width:480px;width:100%;">
 
          <!-- NFC Card Image -->
          <tr>
            <td align="center" style="padding-bottom:36px;">
              <img
                src="https://iothesinger.com/severednfcsize.jpg"
                alt="severed — Chapter 1"
                width="320"
                style="width:320px;max-width:100%;border-radius:8px;display:block;"
              />
            </td>
          </tr>
 
          <!-- Access link -->
          <tr>
            <td align="center" style="padding-bottom:8px;">
              <p style="margin:0;font-size:9px;letter-spacing:0.25em;color:#7a6a5a;text-transform:uppercase;">Access link</p>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding-bottom:28px;">
              <a href="${process.env.ALBUM_URL}" style="font-size:14px;color:#c9a882;font-family:Arial,sans-serif;word-break:break-all;">${process.env.ALBUM_URL}</a>
            </td>
          </tr>
 
          <!-- Password -->
          <tr>
            <td align="center" style="padding-bottom:8px;">
              <p style="margin:0;font-size:9px;letter-spacing:0.25em;color:#7a6a5a;text-transform:uppercase;">Password</p>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding-bottom:40px;">
              <p style="margin:0;font-size:22px;letter-spacing:0.2em;color:#f0e8dc;font-family:Arial,sans-serif;">${process.env.ALBUM_PASSWORD}</p>
            </td>
          </tr>
 
          <!-- Divider -->
          <tr>
            <td style="border-top:0.5px solid #2a1a10;padding-bottom:32px;"></td>
          </tr>
 
          <!-- Thank you -->
          <tr>
            <td align="center" style="padding-bottom:8px;">
              <p style="margin:0;font-size:15px;font-style:italic;color:#d4c5b0;line-height:1.8;font-family:Georgia,serif;">
                Thank you. This means more than you know.
              </p>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding-bottom:40px;">
              <p style="margin:0;font-size:12px;color:#5a4a3a;line-height:1.8;">
                Keep this email safe — it's the only way back in.<br>
                Questions? Reply anytime.
              </p>
            </td>
          </tr>
 
          <!-- Heart -->
          <tr>
            <td align="center">
              <p style="margin:0;font-size:16px;">🖤</p>
            </td>
          </tr>
 
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `
}
 