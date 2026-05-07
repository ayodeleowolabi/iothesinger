"use client";

import Image from "next/image";
import Navbar from "../components/Navbar";
import { listenLinks, socialLinks } from "../data/siteData";
import { Instagram, Youtube, Facebook } from "lucide-react";

const platformIcons: Record<string, string> = {
  Spotify: "♫",
  "Apple Music": "♪",
  Bandcamp: "◉",
  YouTube: "▶",
};

const TikTokIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z" />
  </svg>
);

const socialIcons: Record<string, React.ReactNode> = {
  Instagram: <Instagram size={18} />,
  TikTok: <TikTokIcon />,
  Facebook: <Facebook size={18} />,
  YouTube: <Youtube size={18} />,
};

export default function ListenPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        width: "100%",
        background: "#0f0d0b",
        fontFamily: "var(--font-cormorant)",
      }}
    >
      {/* Background image */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0, opacity: 0.12 }}>
        <Image
          src="/albumcover.jpg"
          alt=""
          fill
          style={{ objectFit: "cover", objectPosition: "center 25%" }}
        />
      </div>

      <Navbar />

      <div
        style={{
          position: "relative",
          zIndex: 5,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "120px 40px 80px",
        }}
      >
        {/* NFC card image — credit card proportions at display size */}
        <div
          style={{
            width: "700px",
            height: "480px",
            position: "relative",
            marginBottom: "28px",
            borderRadius: "8px",
            overflow: "hidden",
            border: "1px solid rgba(240,230,211,0.12)",
            boxShadow: "0 12px 40px rgba(0,0,0,0.6)",
          }}
        >
          <Image
            src="/severednfcsize.jpg"
            alt="severed — Chapter 1 NFC card by iothesinger"
            fill
            style={{ objectFit: "cover" }}
          />
        </div>

        {/* Album meta */}
        <p
          style={{
            color: "rgba(240,230,211,0.45)",
            fontSize: "0.7rem",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            marginBottom: "2px",
            fontFamily: "var(--font-cormorant)",
          }}
        >
          iothesinger — severed: chapter 1
        </p>

    

        {/* Thin divider */}
        <div
          style={{
            borderTop: "0.5px solid rgba(240,230,211,0.2)",
            marginBottom: "10px",
          }}
        />

        {/* Purchase copy — wider block, sans-serif */}
        <div
          style={{
            width: "100%",
            maxWidth: "600px",
            marginBottom: "20px",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "0.95rem",
              fontWeight: "300",
              color: "rgba(240,230,211,0.75)",
              lineHeight: "1.9",
              marginBottom: "4px",
              letterSpacing: "0.01em",
            }}
          >
          In 2023 I renamed myself IO after Jupiter's moon.<br></br>
IO is the most volcanically active body in the solar system. Constantly erupting. Constantly rebuilding. Shaped by forces it didn't choose, producing something no other world can.
That is this album. <br></br>
Severed is Chapter 1 of a universe I am building out of the ashes of a past I didn't choose. It is not on streaming. It lives here, in the hands of people who actually crave hearing a story of severing away to build something new. <br></br>
For $10 you receive the physical record mailed to you. Inside: a full download link, a lyric booklet, and a personal artifact from the making of this record.
US only. Limited to what I can mail before I leave the country. When it's gone, it's gone.  </p>
        </div>

          <div>
          <p
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "0.875rem",
              fontWeight: "300",
              color: "rgba(245, 239, 227, 0.45)",
              lineHeight: "1.9",
              marginBottom: "4px",
              letterSpacing: "0.01em",
              textAlign: "center",
            }}
          >
            Once you purchase, you will receive a password and website where you
            can access the record. Thanks for your support it means more than
            you know. 
          </p>
        </div>

        {/* Purchase button */}
        <a
          href="https://buy.stripe.com/9B67sL5T64766DRdDG0RG02"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-block",
            padding: "14px 40px",
            background: "#000000",
            color: "#FFFFFa",
            fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
            fontSize: "0.7rem",
            fontWeight: "500",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            textDecoration: "none",
            marginBottom: "52px",
            transition: "background 0.2s",
            borderRadius: "2px",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#FFFFFa";
            e.currentTarget.style.color = "#000000";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#000000";
            e.currentTarget.style.color = "#FFFFFa";
          }}
        >
          Purchase - $10
        </a>

        {/* Streaming platforms */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            width: "100%",
            maxWidth: "420px",
          }}
        >
          {listenLinks.map((platform) => (
            <a
              key={platform.name}
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "18px 24px",
                border: "1px solid rgba(240,230,211,0.15)",
                color: "#f0e6d3",
                textDecoration: "none",
                fontFamily: "var(--font-cormorant)",
                fontSize: "1rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                fontWeight: "500",
                transition: "all 0.2s",
                background: "rgba(240,230,211,0.03)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#c45c2e";
                e.currentTarget.style.color = "#0f0d0b";
                e.currentTarget.style.borderColor = "#c45c2e";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(240,230,211,0.03)";
                e.currentTarget.style.color = "#f0e6d3";
                e.currentTarget.style.borderColor = "rgba(240,230,211,0.15)";
              }}
            >
              <span>{platform.name}</span>
              <span style={{ fontSize: "1.1rem", opacity: 0.55 }}>
                {platformIcons[platform.name] ?? "→"}
              </span>
            </a>
          ))}
        </div>

        {/* Divider */}
        <div
          style={{
            width: "100%",
            maxWidth: "420px",
            borderTop: "1px solid rgba(240,230,211,0.1)",
            margin: "44px 0 28px",
          }}
        />

        {/* Socials label */}
        <p
          style={{
            color: "rgba(240,230,211,0.35)",
            fontSize: "0.65rem",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            marginBottom: "18px",
            fontFamily: "var(--font-cormorant)",
          }}
        >
          Follow
        </p>

        {/* Social icon buttons */}
        <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              title={social.name}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "42px",
                height: "42px",
                border: "1px solid rgba(240,230,211,0.2)",
                color: "rgba(240,230,211,0.55)",
                textDecoration: "none",
                transition: "all 0.2s",
                background: "transparent",
                borderRadius: "50%",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#f0e6d3";
                e.currentTarget.style.borderColor = "#c45c2e";
                e.currentTarget.style.background = "rgba(196,92,46,0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "rgba(240,230,211,0.55)";
                e.currentTarget.style.borderColor = "rgba(240,230,211,0.2)";
                e.currentTarget.style.background = "transparent";
              }}
            >
              {socialIcons[social.name]}
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}
