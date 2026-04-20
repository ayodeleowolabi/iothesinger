"use client";

import { RollerCoaster } from "lucide-react";
import { useState } from "react";

const ACCESS_CODE = "SEVERED2026";

export default function DownloadPage() {
  const [input, setInput] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState(false);

  function handleSubmit() {
    if (input.trim().toUpperCase() === ACCESS_CODE) {
      setUnlocked(true);
      setError(false);
    } else {
      setError(true);
    }
  }

  return (
    <main style={{
      minHeight: "100vh",
      backgroundColor: "#000",
      color: "#fff",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: unlocked ? "flex-start" : "center",
      padding: "2rem",
      fontFamily: "sans-serif",
      textAlign: "center",
    }}>

      {!unlocked ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem", width: "100%", maxWidth: "320px" }}>
          <h1 style={{ fontSize: "1.5rem", letterSpacing: "0.1em", marginBottom: "0.5rem" }}>
            ENTER ACCESS CODE
          </h1>
          <p style={{ color: "#888", fontSize: "0.85rem" }}>
            This album is not on streaming. You have something rare.
          </p>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            placeholder="ACCESS CODE"
            style={{
              background: "transparent",
              border: "1px solid #444",
              color: "#fff",
              padding: "0.75rem 1rem",
              fontSize: "1rem",
              letterSpacing: "0.15em",
              textAlign: "center",
              outline: "none",
              width: "100%",
            }}
          />
          {error && (
            <p style={{ color: "#ff4444", fontSize: "0.8rem" }}>
              Incorrect code. Check your merch insert.
            </p>
          )}
          <button
            onClick={handleSubmit}
            style={{
              background: "#fff",
              color: "#000",
              border: "none",
              padding: "0.75rem",
              fontSize: "0.9rem",
              letterSpacing: "0.1em",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            UNLOCK
          </button>
        </div>
      ) : (
        <div style={{ padding: "2rem 1rem 3rem", maxWidth: "560px", width: "100%", textAlign: "left" }}>

          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <img
              src="/SEVERED.JPG"
              alt="Severed album cover"
              style={{ width: "200px", height: "200px", objectFit: "cover", display: "block", margin: "0 auto 1.5rem" }}
            />
            <p style={{ fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#888", margin: "0 0 4px" }}>Io</p>
            <h1 style={{ fontSize: "1.75rem", fontWeight: "500", letterSpacing: "0.18em", textTransform: "uppercase", margin: "0 0 6px" }}>Severed</h1>
            <p style={{ fontSize: "0.75rem", color: "#666", letterSpacing: "0.08em" }}>13 tracks · 37 minutes · 2026</p>
          </div>

          <hr style={{ border: "none", borderTop: "0.5px solid rgba(255,255,255,0.12)", margin: "1.5rem 0" }} />

          {/* Tracklist */}
          <p style={{ fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#555", marginBottom: "1rem" }}>Tracklist</p>
          <ul style={{ listStyle: "none", padding: 0, margin: "0 0 2rem" }}>
            {[
              ["1","beautifully broken","3:26"],
              ["2","red n blue (blackbird)","2:18"],
              ["3","tell my why","4:34"],
              ["4","never alone","1:09"],
              ["5","after all","4:45"],
              ["6","can't pay it anyway","2:32"],
              ["7","stand","3:39"],
              ["8","NEVER ALONE","0:53"],
              ["9","tomorrow","3:13"],
              ["10","life is a journey","4:40"],
              ["11","neveralone","1:01"],
              ["12","get there","3:27"],
              ["13","epilogue","1:11"],
            ].map(([num, name, dur]) => (
              <li key={num} style={{ display: "flex", gap: "12px", alignItems: "baseline", padding: "10px 0", borderBottom: "0.5px solid rgba(255,255,255,0.08)" }}>
                <span style={{ fontSize: "0.75rem", color: "#555", minWidth: "18px", textAlign: "right" }}>{num}</span>
                <span style={{ flex: 1, fontSize: "0.95rem", color: "#f0e6d3" }}>{name}</span>
                <span style={{ fontSize: "0.75rem", color: "#555" }}>{dur}</span>
              </li>
            ))}
          </ul>

          <hr style={{ border: "none", borderTop: "0.5px solid rgba(255,255,255,0.12)", margin: "1.5rem 0" }} />

          {/* The Band */}
          <p style={{ fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#555", marginBottom: "1rem" }}>The Production Team</p>
          <div style={{ marginBottom: "2rem" }}>
            {[
              { name: "Jean-Francis Varre", role: "Vocals, Bass" },
              { name: "Jon Laine", role: "Drums" },
              { name: "Austin Stahle", role: "Guitar" },
              { name: "Chris Fischer", role: "Keys, Synths" },
              { name: "Frank Marchand", role: "Mixing engineer" },
            ].map(({ name, role }) => (
              <div key={name} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "7px 0", borderBottom: "0.5px solid rgba(255,255,255,0.08)" }}>
                <span style={{ fontSize: "0.85rem", color: "#f0e6d3" }}>{name}</span>
                {role && <span style={{ fontSize: "0.75rem", color: "#555", letterSpacing: "0.05em" }}>{role}</span>}
              </div>
            ))}
          </div>

          <hr style={{ border: "none", borderTop: "0.5px solid rgba(255,255,255,0.12)", margin: "1.5rem 0" }} />

          {/* Special Thanks */}
          <p style={{ fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#555", marginBottom: "1rem" }}>Special thanks</p>
          <p style={{ fontSize: "0.85rem", color: "#aaa", lineHeight: 1.7, marginBottom: "1.25rem" }}>
            This album exists because of these people. Their generosity made the music possible and held me together while I made it.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 10px", marginBottom: "2rem" }}>
            {[
              "Bayo Oyewole","Nathaniel Rossoff","Margie Foster","Ben Lutz",
              "Thomas Saacks","Hallie Andrews","Seyi Olaiya", "Madelyn Sugg","Bryant Carthan",
              "Jean-Francis Varre", "Aline Varre","Ginny Randall","Amparo Rodriguez", "Sarah Anderson","Ife James",
              "Laura Powis","Trevor Coleman",
            ].map((name, i, arr) => (
              <span key={name} style={{ fontSize: "0.85rem", color: "#aaa" }}>
                {name}{i < arr.length - 1 ? " ·" : ""}
              </span>
            ))}
          </div>

          <hr style={{ border: "none", borderTop: "0.5px solid rgba(255,255,255,0.12)", margin: "1.5rem 0" }} />

          <a href="/severed the album.zip" download style={{ display: "block", width: "100%", padding: "1rem", background: "#fff", color: "#000", textAlign: "center", textDecoration: "none", fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: "bold", boxSizing: "border-box" }}>
            Download album
          </a>

        </div>
      )}
    </main>
  );
}
