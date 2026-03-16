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
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"/>
  </svg>
);

const socialIcons: Record<string, React.ReactNode> = {
  Instagram: <Instagram size={20} />,
  TikTok: <TikTokIcon />,
  Facebook: <Facebook size={20} />,
  YouTube: <Youtube size={20} />,
};

export default function ListenPage() {
  return (
    <main style={{
      minHeight: "100vh", width: "100%",
      background: "#0f0d0b", fontFamily: "var(--font-cormorant)",
    }}>
      <div style={{ position: "fixed", inset: 0, zIndex: 0, opacity: 0.12 }}>
        <Image src="/albumcover.jpg" alt="" fill style={{ objectFit: "cover", objectPosition: "center 25%" }} />
      </div>

      <Navbar />

      <div style={{
        position: "relative", zIndex: 5, minHeight: "100vh",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        padding: "120px 40px 80px",
      }}>

        <p style={{
          color: "#c45c2e", fontSize: "0.75rem", letterSpacing: "0.2em",
          textTransform: "uppercase", marginBottom: "16px",
          fontFamily: "var(--font-cormorant)",
        }}>
          Now Streaming
        </p>

        <h1 style={{
          fontFamily: "var(--font-playfair)", color: "#f0e6d3",
          fontSize: "clamp(2.5rem, 6vw, 5rem)", fontWeight: "900",
          letterSpacing: "-0.02em", textTransform: "uppercase",
          marginBottom: "8px", textAlign: "center",
        }}>
          Severed
        </h1>

        <p style={{
          color: "rgba(240,230,211,0.45)", fontSize: "0.85rem",
          letterSpacing: "0.12em", textTransform: "uppercase",
          marginBottom: "64px", fontFamily: "var(--font-cormorant)",
        }}>
          iothesinger — 2026
        </p>

        {/* Streaming platforms */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px", width: "100%", maxWidth: "420px" }}>
          {listenLinks.map((platform) => (
            
            <a  key={platform.name}
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "20px 28px", border: "1px solid rgba(240,230,211,0.15)",
                color: "#f0e6d3", textDecoration: "none",
                fontFamily: "var(--font-cormorant)", fontSize: "1.1rem",
                letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: "500",
                transition: "all 0.2s", background: "rgba(240,230,211,0.03)",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = "#c45c2e";
                e.currentTarget.style.color = "#0f0d0b";
                e.currentTarget.style.borderColor = "#c45c2e";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = "rgba(240,230,211,0.03)";
                e.currentTarget.style.color = "#f0e6d3";
                e.currentTarget.style.borderColor = "rgba(240,230,211,0.15)";
              }}
            >
              <span>{platform.name}</span>
              <span style={{ fontSize: "1.2rem", opacity: 0.6 }}>
                {platformIcons[platform.name] ?? "→"}
              </span>
            </a>
          ))}
        </div>

        {/* Divider */}
        <div style={{
          width: "100%", maxWidth: "420px",
          borderTop: "1px solid rgba(240,230,211,0.1)",
          margin: "48px 0 32px",
        }} />

        {/* Socials label */}
        <p style={{
          color: "rgba(240,230,211,0.4)", fontSize: "0.7rem",
          letterSpacing: "0.2em", textTransform: "uppercase",
          marginBottom: "20px", fontFamily: "var(--font-cormorant)",
        }}>
          Follow
        </p>

        {/* Social icon buttons */}
        <div style={{ display: "flex", gap: "16px", justifyContent: "center" }}>
          {socialLinks.map((social) => (
            
             <a key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              title={social.name}
              style={{
                display: "flex", alignItems: "center", justifyContent: "center",
                width: "44px", height: "44px",
                border: "1px solid rgba(240,230,211,0.2)",
                color: "rgba(240,230,211,0.6)", textDecoration: "none",
                transition: "all 0.2s", background: "transparent",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.color = "#f0e6d3";
                e.currentTarget.style.borderColor = "#c45c2e";
                e.currentTarget.style.background = "rgba(196,92,46,0.1)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = "rgba(240,230,211,0.6)";
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