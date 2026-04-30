"use client";

import { useState, useRef } from "react";

const ACCESS_CODE = "SEVERED2026";
const R2_BASE = "https://pub-f51c3e744c2840778c59174e2cd6eda5.r2.dev";

const TRACKS = [
  { num: "1",  name: "beautifully broken",    dur: "3:26", file: "01.mp3" },
  { num: "2",  name: "red n blue (blackbird)", dur: "2:18", file: "02.mp3" },
  { num: "3",  name: "tell my why",            dur: "4:34", file: "03.mp3" },
  { num: "4",  name: "never alone",            dur: "1:09", file: "04.mp3" },
  { num: "5",  name: "after all",              dur: "4:45", file: "05.mp3" },
  { num: "6",  name: "can't pay it anyway",    dur: "2:32", file: "06.mp3" },
  { num: "7",  name: "stand",                  dur: "3:39", file: "07.mp3" },
  { num: "8",  name: "NEVER ALONE",            dur: "0:53", file: "08.mp3" },
  { num: "9",  name: "tomorrow",               dur: "3:13", file: "09.mp3" },
  { num: "10", name: "life is a journey",      dur: "4:40", file: "10.mp3" },
  { num: "11", name: "neveralone",             dur: "1:01", file: "11.mp3" },
  { num: "12", name: "get there",              dur: "3:27", file: "12.mp3" },
  { num: "13", name: "epilogue",               dur: "1:11", file: "13.mp3" },
];

export default function DownloadPage() {
  const [input, setInput] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  function handleSubmit() {
    if (input.trim().toUpperCase() === ACCESS_CODE) {
      setUnlocked(true);
      setError(false);
    } else {
      setError(true);
    }
  }

  function setMediaSession(index: number) {
    if ("mediaSession" in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: TRACKS[index].name,
        artist: "Io",
        album: "Severed",
        artwork: [{ src: "/SEVERED.JPG", sizes: "512x512", type: "image/jpeg" }],
      });
      navigator.mediaSession.setActionHandler("previoustrack", () => {
        if (index > 0) handleTrackClick(index - 1);
      });
      navigator.mediaSession.setActionHandler("nexttrack", () => {
        if (index < TRACKS.length - 1) handleTrackClick(index + 1);
      });
    }
  }

  function handleTrackClick(index: number) {
    const audio = audioRef.current;
    if (!audio) return;

    if (currentTrack === index) {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        audio.play();
        setIsPlaying(true);
      }
    } else {
      audio.src = `${R2_BASE}/${TRACKS[index].file}`;
      audio.play();
      setCurrentTrack(index);
      setIsPlaying(true);
      setMediaSession(index);
    }
  }

  function handleTrackEnd() {
    if (currentTrack !== null && currentTrack < TRACKS.length - 1) {
      const next = currentTrack + 1;
      const audio = audioRef.current;
      if (!audio) return;
      audio.src = `${R2_BASE}/${TRACKS[next].file}`;
      audio.play();
      setCurrentTrack(next);
      setIsPlaying(true);
      setMediaSession(next);
    } else {
      setIsPlaying(false);
      setCurrentTrack(null);
    }
  }

  function handlePrev() {
    if (currentTrack !== null && currentTrack > 0) {
      handleTrackClick(currentTrack - 1);
    }
  }

  function handleNext() {
    if (currentTrack !== null && currentTrack < TRACKS.length - 1) {
      handleTrackClick(currentTrack + 1);
    }
  }

  const activeTrack = currentTrack !== null ? TRACKS[currentTrack] : null;

  return (
    <>
      <main style={{
        minHeight: "100vh",
        backgroundColor: "#000",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: unlocked ? "flex-start" : "center",
        padding: "2rem",
        paddingBottom: activeTrack ? "6rem" : "2rem",
        fontFamily: "sans-serif",
        textAlign: "center",
      }}>

        {/* Hidden audio element */}
        <audio ref={audioRef} onEnded={handleTrackEnd} />

        {!unlocked ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem", width: "100%", maxWidth: "320px" }}>
            <h1 style={{ fontSize: "1.5rem", letterSpacing: "0.1em", marginBottom: "0.5rem" }}>
              ENTER ACCESS CODE
            </h1>
            <p style={{ color: "#888", fontSize: "0.85rem" }}>
              This album is not currently streaming. You have something rare.
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
              {TRACKS.map((track, index) => {
                const isActive = currentTrack === index;
                const isThisPlaying = isActive && isPlaying;
                return (
                  <li
                    key={track.num}
                    onClick={() => handleTrackClick(index)}
                    style={{
                      display: "flex",
                      gap: "12px",
                      alignItems: "center",
                      padding: "10px 0",
                      borderBottom: "0.5px solid rgba(255,255,255,0.08)",
                      cursor: "pointer",
                      background: isActive ? "rgba(255,255,255,0.04)" : "transparent",
                      transition: "background 0.2s",
                      borderRadius: "2px",
                      paddingLeft: isActive ? "6px" : "0",
                    }}
                  >
                    <span style={{ fontSize: "0.75rem", color: isActive ? "#f0e6d3" : "#555", minWidth: "18px", textAlign: "right" }}>
                      {isThisPlaying ? "▶" : isActive ? "❙❙" : track.num}
                    </span>
                    <span style={{ flex: 1, fontSize: "0.95rem", color: isActive ? "#fff" : "#f0e6d3" }}>
                      {track.name}
                    </span>
                    <span style={{ fontSize: "0.75rem", color: "#555" }}>{track.dur}</span>
                  </li>
                );
              })}
            </ul>

            <hr style={{ border: "none", borderTop: "0.5px solid rgba(255,255,255,0.12)", margin: "1.5rem 0" }} />

            {/* The Production Team */}
            <p style={{ fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#555", marginBottom: "1rem" }}>The Production Team</p>
            <div style={{ marginBottom: "2rem" }}>
              {[
                { name: "Jean-Francis Varre", role: "Vocals, Bass" },
                { name: "Jon Laine", role: "Drums" },
                { name: "Austin Stahle", role: "Guitar" },
                { name: "Chris Fischer", role: "Keys, Synths" },
                { name: "Frank Marchand", role: "Mixing and Recording Engineer" },
                { name: "Jose Bejaraño Arca", role: "Recording Engineer" },
                { name: "Alan Douches", role: "Mastering Engineer" },

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
                "Thomas Saacks","Hallie Andrews","Seyi Olaiya","Madelyn Sugg","Bryant Carthan",
                "Jean-Francis Varre","Aline Varre","Ginny Randall","Amparo Rodriguez","Sarah Anderson","Ife James",
                "Laura Powis","Trevor Coleman",
              ].map((name, i, arr) => (
                <span key={name} style={{ fontSize: "0.85rem", color: "#aaa" }}>
                  {name}{i < arr.length - 1 ? " ·" : ""}
                </span>
              ))}
            </div>

            <hr style={{ border: "none", borderTop: "0.5px solid rgba(255,255,255,0.12)", margin: "1.5rem 0" }} />

        {/* Download Instructions */}
<hr style={{ border: "none", borderTop: "0.5px solid rgba(255,255,255,0.12)", margin: "1.5rem 0" }} />

<p style={{ fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#555", marginBottom: "1.5rem" }}>How to download</p>

<div style={{ marginBottom: "2rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
  {[
    ["01", "Click Download Album below. A file called Severed-The-Album.zip will save to your device (211 MB — give it a moment)."],
    ["02", "Open the zip to find 13 tracks and a PDF booklet."],
    ["03", "The files are numbered 01–13. That's normal. Once you add them to a music app, track names and album art will appear automatically from the embedded metadata."],
  ].map(([num, text]) => (
    <div key={num} style={{ display: "flex", gap: "1.25rem", alignItems: "flex-start" }}>
      <span style={{ fontSize: "0.65rem", letterSpacing: "0.15em", color: "#444", paddingTop: "3px", minWidth: "16px" }}>{num}</span>
      <p style={{ fontSize: "0.8rem", color: "#888", lineHeight: 1.8, margin: 0, letterSpacing: "0.03em" }}>{text}</p>
    </div>
  ))}

  {/* Step 04 with platform sub-lines */}
  <div style={{ display: "flex", gap: "1.25rem", alignItems: "flex-start" }}>
    <span style={{ fontSize: "0.65rem", letterSpacing: "0.15em", color: "#444", paddingTop: "3px", minWidth: "16px" }}>04</span>
    <div style={{ fontSize: "0.8rem", color: "#888", lineHeight: 1.8, letterSpacing: "0.03em" }}>
      <span style={{ display: "block" }}><strong style={{ color: "#ccc" }}>Mac:</strong> double-click the zip → drag into Apple Music.</span>
      <span style={{ display: "block" }}><strong style={{ color: "#ccc" }}>Windows:</strong> right-click → Extract All → drag into your library.</span>
      <span style={{ display: "block" }}><strong style={{ color: "#ccc" }}>iPhone:</strong> open zip in Files app → import into Doppler or similar.</span>
      <span style={{ display: "block" }}><strong style={{ color: "#ccc" }}>Android:</strong> tap zip in Downloads → Extract → open in any music player.</span>
    </div>
  </div>
</div>

<hr style={{ border: "none", borderTop: "0.5px solid rgba(255,255,255,0.12)", margin: "1.5rem 0" }} />

<a href="/severed-album-package.pdf" download style={{
    display: "block",
    width: "100%",
    padding: "1rem",
    background: "#fff",
    color: "#000",
    textAlign: "center",
    textDecoration: "none",
    fontSize: "0.75rem",
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    fontWeight: "bold",
    boxSizing: "border-box",
  }}>
  Download Booklet
</a>

<br />

{/* Download button */}

  <a href="https://pub-958e3a333ce34130ac2d28678cff1d91.r2.dev/severed-the-album.zip"
  download="Severed-The-Album.zip"
  style={{
    display: "block",
    width: "100%",
    padding: "1rem",
    background: "#fff",
    color: "#000",
    textAlign: "center",
    textDecoration: "none",
    fontSize: "0.75rem",
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    fontWeight: "bold",
    boxSizing: "border-box",
  }}
>
  Download Album
</a>

          </div>
        )}
      </main>

      {/* Sticky player bar — only shows when a track is active */}
      {activeTrack && (
        <div style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: "#111",
          borderTop: "0.5px solid rgba(255,255,255,0.15)",
          padding: "10px 16px",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          zIndex: 100,
        }}>
          {/* Album art */}
          <img
            src="/SEVERED.JPG"
            alt="Severed"
            style={{ width: "38px", height: "38px", objectFit: "cover", borderRadius: "2px", flexShrink: 0 }}
          />

          {/* Track info */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: "0.85rem", color: "#fff", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {activeTrack.name}
            </div>
            <div style={{ fontSize: "0.65rem", color: "#666", letterSpacing: "0.05em" }}>
              Io · Severed
            </div>
          </div>

          {/* Controls */}
          <div style={{ display: "flex", alignItems: "center", gap: "18px", flexShrink: 0 }}>
            <button
              onClick={handlePrev}
              disabled={currentTrack === 0}
              style={{ background: "none", border: "none", cursor: currentTrack === 0 ? "default" : "pointer", color: currentTrack === 0 ? "#333" : "#888", fontSize: "1rem", padding: 0 }}
            >
              ⏮
            </button>
            <button
              onClick={() => currentTrack !== null && handleTrackClick(currentTrack)}
              style={{
                width: "32px", height: "32px",
                borderRadius: "50%",
                background: "#fff",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.65rem",
                color: "#000",
                flexShrink: 0,
              }}
            >
              {isPlaying ? "❙❙" : "▶"}
            </button>
            <button
              onClick={handleNext}
              disabled={currentTrack === TRACKS.length - 1}
              style={{ background: "none", border: "none", cursor: currentTrack === TRACKS.length - 1 ? "default" : "pointer", color: currentTrack === TRACKS.length - 1 ? "#333" : "#888", fontSize: "1rem", padding: 0 }}
            >
              ⏭
            </button>
          </div>
        </div>
      )}
    </>
  );
}
