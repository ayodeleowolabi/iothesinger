# iothesinger: Official Artist Site

**Live site:** [iothesinger.com](https://iothesinger.com)

The official site for **iothesinger**, a soul and rock singer-songwriter working between DC and NYC. Besides the usual artist pages, the site sells the album directly to fans: payment goes through Stripe, and an automated email delivers the download.

## Features

- **Pages for Listen, Tour, Video, EPK, Sign-up and Download**, built with the Next.js App Router.
- **Electronic press kit (`/epk`)** with stats, press quotes, media appearances and downloadable press photos. All of it comes from one typed data file (`app/data/siteData.ts`).
- **Direct-to-fan album sales**:
  1. A Stripe Buy Button handles checkout.
  2. A **Netlify Function webhook** checks the Stripe signature on `checkout.session.completed`.
  3. The webhook then sends the buyer the download link through the Sender.net transactional email API.
- **Bilingual download page (EN/ES)** with step-by-step instructions for adding the album to Apple Music, Spotify and other players.
- **Mailing-list sign-up**, segmented by city.
- Large audio files stay out of the repo (`public/*.zip` is git-ignored).

## Tech stack

| Layer | Tools |
|---|---|
| Framework | Next.js 16 (App Router), React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS 4 |
| Payments | Stripe (Buy Button + webhooks) |
| Email | Sender.net API |
| Hosting | Netlify + Netlify Functions |
| Icons | lucide-react |

## Project structure

```
app/
  listen/ tour/ video/ epk/ signup/ download/ info/   routes
  components/       Navbar, ArtistBio, StripeButton
  data/siteData.ts  press, stats, media, photos (content lives here)
netlify/functions/
  webhook.js        Stripe → email delivery
```

## Running locally

```bash
npm install
npm run dev
```

Environment variables (set in Netlify, or `.env` locally, which git ignores):

```
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
SENDER_API_KEY=
FROM_EMAIL=
FROM_NAME=
YOUR_EMAIL=
ALBUM_URL=
ALBUM_PASSWORD=
```

---
Designed and developed by **Ayodele Owolabi**, [AO Studio](https://github.com/ayodeleowolabi).
