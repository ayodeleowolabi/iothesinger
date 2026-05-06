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
<body style="margin:0;padding:0;background:#1a0e0a;font-family:Georgia,serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#1a0e0a;padding:48px 24px;">
    <tr>
      <td align="center">
        <table width="480" cellpadding="0" cellspacing="0" style="max-width:480px;width:100%;">
          <tr>
            <td style="padding-bottom:8px;">
              <p style="margin:0;font-size:10px;letter-spacing:0.25em;color:#c9a882;text-transform:uppercase;font-family:Arial,sans-serif;">Chapter 1</p>
            </td>
          </tr>
          <tr>
            <td style="padding-bottom:4px;">
              <h1 style="margin:0;font-size:42px;font-weight:300;font-style:italic;color:#f0e8dc;letter-spacing:0.04em;line-height:1;">severed</h1>
            </td>
          </tr>
          <tr>
            <td style="padding-bottom:32px;">
              <p style="margin:0;font-size:10px;letter-spacing:0.3em;color:#b89a7a;text-transform:uppercase;font-family:Arial,sans-serif;">iothesinger</p>
            </td>
          </tr>
          <tr>
            <td style="padding-bottom:24px;border-top:0.5px solid #c9a88240;"></td>
          </tr>
          <tr>
            <td style="padding-bottom:16px;">
              <p style="margin:0;font-size:17px;font-style:italic;color:#d4c5b0;line-height:1.7;">
                Thank you. This means more than you know.
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding-bottom:32px;">
              <p style="margin:0;font-size:13px;color:#9a8270;line-height:1.8;font-family:Arial,sans-serif;letter-spacing:0.04em;">
                Here's everything you need to access the record.
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:24px;background:#2a1510;border-radius:4px;">
              <p style="margin:0 0 8px;font-size:10px;letter-spacing:0.2em;color:#9a8270;text-transform:uppercase;font-family:Arial,sans-serif;">Access link</p>
              <a href="${process.env.ALBUM_URL}" style="font-size:14px;color:#c9a882;word-break:break-all;font-family:Arial,sans-serif;">${process.env.ALBUM_URL}</a>
              <p style="margin:20px 0 8px;font-size:10px;letter-spacing:0.2em;color:#9a8270;text-transform:uppercase;font-family:Arial,sans-serif;">Password</p>
              <p style="margin:0;font-size:18px;letter-spacing:0.15em;color:#f0e8dc;font-family:Arial,sans-serif;">${process.env.ALBUM_PASSWORD}</p>
            </td>
          </tr>
          <tr><td style="padding:16px 0;"></td></tr>
          <tr>
            <td>
              <p style="margin:0;font-size:13px;font-style:italic;color:#7a6a5a;line-height:1.8;">
                Keep this email somewhere safe — it's the only way back in.<br>
                Questions? Reply to this email anytime.
              </p>
            </td>
          </tr>
          <tr><td style="padding:24px 0;"></td></tr>
          <tr>
            <td>
              <p style="margin:0;font-size:11px;color:#3d2010;font-family:Arial,sans-serif;">🖤</p>
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