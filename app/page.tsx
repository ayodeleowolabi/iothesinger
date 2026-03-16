"use client";

import Image from "next/image";
import { useState } from "react";

const listenLinks = [
  { name: "Spotify", url: "https://open.spotify.com/artist/12jmhK2iFMAeOGYAo59v9C" },
  { name: "Apple Music", url: "https://music.apple.com/us/artist/iothesinger/1768147527" },
  { name: "Bandcamp", url: "https://iothesinger.bandcamp.com/" },
  { name: "YouTube", url: "https://www.youtube.com/@iothesinger" },
];

const navLinks = [
  { name: "Tour", href: "/tour" },
  { name: "Press", href: "/press" },
  { name: "Store", href: "/store" },
  { name: "Info", href: "/info" },
  { name: "Video", href: "/video" },
  { name: "Sign Up", href: "/signup" },
];

export default function Home() {
  const [listenOpen, setListenOpen] = useState(false);

  return (
    <main style={{
      position: "fixed",
      top: 0, left: 0, right: 0, bottom: 0,
      width: "100vw",
      height: "100vh",
      overflow: "hidden",
    }}>
      <Image
        src="/albumcover.jpg"
        alt="Io The Singer"
        fill
        priority
        style={{ objectFit: "cover", objectPosition: "center 25%" }}
      />

      {/* Bottom gradient */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.05) 50%, transparent 100%)",
      }} />

      {/* Top gradient — darkens nav area */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: "120px",
        background: "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, transparent 100%)",
        zIndex: 9,
      }} />

      {/* Top bar */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "28px 40px",
        zIndex: 10,
      }}>

        {/* Logo — left, tight letter spacing like Canva design */}
        <div style={{
          fontFamily: "var(--font-playfair)",
          color: "#f0e6d3",
          fontSize: "2.4rem",
          fontWeight: "900",
          letterSpacing: "-0.04em",
          lineHeight: 1,
          textTransform: "uppercase",
        }}>
          iothesinger
        </div>

        {/* Nav — right */}
        <nav style={{
          display: "flex",
          gap: "28px",
          alignItems: "center",
        }}>
          {navLinks.map((link) => (
            
            <a  key={link.name}
              href={link.href}
              style={{
                color: "#f0e6d3",
                textDecoration: "none",
                fontSize: "0.75rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                fontWeight: "500",
              }}
            >
              {link.name}
            </a>
          ))}
        </nav>

      </div>
    </main>
  );
}