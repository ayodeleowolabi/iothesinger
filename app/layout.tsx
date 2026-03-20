import type { Metadata } from "next";
import { Playfair_Display, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
});

export const metadata: Metadata = {
  title: {
    default: "iothesinger | Live Music Washington DC & New York City",
    template: "%s | Io The Singer",
  },
  description:
    "Io is a Washington DC and New York City-based singer-songwriter performing original soul, rock, and pop music. Honest lyrics for people questioning faith, seeking community, and living fully. Catch her live on the East Coast.",
  keywords: [
    "live music Washington DC",
    "live music New York City",
    "East Coast singer songwriter",
    "original soul music DC",
    "indie pop Washington DC",
    "live rock music NYC",
    "spiritual but not religious music",
    "mental health community music",
    "anthemic soul artist",
    "DC local music",
    "NYC indie artist",
    "original music East Coast",
    "faith deconstruction music",
    "healing through music",
    "live music 2026",
    "folk rock singer songwriter",
"pop rock ballads",
"cinematic indie music",
"alternative soul music",
"emotional rock music",
"storytelling songwriter",
"jesse welles music",
"lady gaga concert dc",
"music about trauma healing",
"songs about mental health",
"music about surviving depression",
"songs about generational trauma",
"empowerment music for women",
"music for people in recovery",
"music like Tracy Chapman",
"artists like Florence and the Machine",
"music like Alanis Morissette",
"rock music",
"artists like Brandi Carlile",
"artists like Noah Kahan",
  ],  
  openGraph: {
    title: "iothesinger | Live Soul & Rock Music | DC & NYC",
    description:
      "Original music for the questioning, the healing, and the searching. Io performs live soul, rock, and pop across Washington DC, New York City, and the East Coast.",
    url: "https://iothesinger.com",
    siteName: "iothesinger",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "iothesinger | Live Music DC & NYC",
    description:
      "Anthemic soul and rock for people who are questioning, healing, and searching. Live on the East Coast.",
  },
  alternates: {
    canonical: "https://iothesinger.com",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${cormorant.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}