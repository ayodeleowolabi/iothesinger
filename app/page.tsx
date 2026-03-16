"use client";

import Image from "next/image";
import { useState } from "react";
import Navbar from "./components/Navbar";
import { listenLinks } from "./data/siteData";

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

      <Navbar />

      {/* Bottom center — Listen button */}
      <div style={{
        position: "absolute",
        bottom: 40,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        zIndex: 10,
      }}>
        <div style={{ position: "relative" }}>
          <button
            onClick={() => setListenOpen(!listenOpen)}
            style={{
              background: "#c45c2e",
              color: "white",
              border: "none",
              padding: "14px 32px",
              fontSize: "0.75rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              cursor: "pointer",
              whiteSpace: "nowrap",
              fontWeight: "600",
              fontFamily: "var(--font-cormorant)",
            }}
          >
            Listen {listenOpen ? "▲" : "▼"}
          </button>

          {listenOpen && (
            <div style={{
              position: "absolute",
              bottom: "100%",
              left: "50%",
              transform: "translateX(-50%)",
              marginBottom: 8,
              background: "rgba(0,0,0,0.92)",
              minWidth: 200,
              zIndex: 20,
            }}>
              {listenLinks.map((p) => (
                
                <a  key={p.name}
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "block",
                    padding: "12px 24px",
                    color: "rgba(255,255,255,0.85)",
                    textDecoration: "none",
                    fontSize: "0.85rem",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    fontFamily: "var(--font-cormorant)",
                  }}
                >
                  {p.name}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}