"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import {
  STATS,
  PRESS,
  pressPhotos,
  VIDEOS,
  UPCOMING,
  CREDITS,
  CONFIGS,
  socialLinks,
} from "@/app/data/siteData";

// ─── TRACK DATA ──────────────────────────────────────────────────────────────

const TRACKS = [
  {
    title: "Beautifully Broken",
    album: "Severed",
    year: "2026",
    youtubeId: "Z0GycADydBk",
    start: 136,
  },
  {
    title: "Direction",
    album: "Searchin' EP",
    year: "2023",
    youtubeId: "caIpajohwOI",
    start: 150,
  },
  {
    title: "Red N Blue",
    album: "Blackbird Remix",
    year: "2022",
    youtubeId: "HzbwjxIJa4Y",
    start: 103,
  },
  {
    title: "Tomorrow",
    album: "Music Video",
    year: "2024",
    youtubeId: "KEOMLJTqgtg",
    start: 91,
  },
];

// ─── SUB-COMPONENTS ──────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ margin: "0 0 1.25rem 0" }}>
      <div style={{ height: "0.5px", background: "rgba(240,236,228,0.18)", marginBottom: "0.5rem" }} />
      <p style={{
        fontSize: 10,
        letterSpacing: "0.3em",
        textTransform: "uppercase",
        color: "var(--epk-accent)",
        fontWeight: 600,
        margin: "0 0 0.5rem 0",
        fontFamily: "'Josefin Sans', sans-serif",
        lineHeight: 1,
      }}>
        {children}
      </p>
      <div style={{ height: "0.5px", background: "rgba(240,236,228,0.18)" }} />
    </div>
  );
}

function ShowRow({ venue, loc, tag }: { venue: string; loc: string; tag: string }) {
  return (
    <div style={{
      display: "flex",
      alignItems: "baseline",
      justifyContent: "space-between",
      gap: "1rem",
      padding: "0.75rem 0",
      borderBottom: "0.5px solid var(--epk-rule)",
    }}>
      <span style={{ fontSize: 13, color: "var(--epk-paper)", flex: 1, fontFamily: "'Josefin Sans', sans-serif" }}>{venue}</span>
      <span style={{ fontSize: 11, color: "var(--epk-dim)", flex: 1, fontFamily: "'Josefin Sans', sans-serif" }}>{loc}</span>
      <span style={{
        fontSize: 9,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color: "var(--epk-accent)",
        whiteSpace: "nowrap",
        fontFamily: "'Josefin Sans', sans-serif",
      }}>{tag}</span>
    </div>
  );
}

// ─── PAGE ────────────────────────────────────────────────────────────────────

export default function EPKPage() {
  const [activeTrack, setActiveTrack] = useState<number | null>(null);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,600&family=Josefin+Sans:wght@300;400;600&display=swap');

        :root {
          --epk-accent:  #a2401f;
          --epk-accent2: #c25a30;
          --epk-ink:     #0c0b09;
          --epk-paper:   #f0ece4;
          --epk-darkpaper: #d4d0c9;
          --epk-dim:     rgba(240,236,228,0.45);
          --epk-dimmer:  rgba(240,236,228,0.45);
          --epk-rule:    rgba(240,236,228,0.12);
        }

        .epk-page * { box-sizing: border-box; }
        .epk-page { background: var(--epk-ink); color: var(--epk-paper); font-family: 'Josefin Sans', sans-serif; font-weight: 300; min-height: 100vh; }
        .epk-section { padding: 2rem; border-bottom: 0.5px solid var(--epk-rule); }
        .epk-stat-block { padding: 1.25rem 1.5rem; border-bottom: 0.5px solid var(--epk-rule); }
        .epk-font-display { font-family: 'Cormorant Garamond', serif; font-weight: 700; }
        .epk-font-serif { font-family: 'Cormorant Garamond', serif; font-style: italic; font-weight: 400; }
        .epk-config-block { background: var(--epk-ink); padding: 1.1rem; }
        .epk-btn-primary { background: var(--epk-accent); color: var(--epk-paper); border: none; padding: 0.7rem 1.4rem; font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; font-family: 'Josefin Sans', sans-serif; text-decoration: none; display: inline-block; transition: background 0.2s; cursor: pointer; }
        .epk-btn-primary:hover { background: var(--epk-accent2); }
        .epk-btn-secondary { background: transparent; color: var(--epk-paper); border: 1px solid var(--epk-dimmer); padding: 0.7rem 1.4rem; font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; font-family: 'Josefin Sans', sans-serif; text-decoration: none; display: inline-block; transition: border-color 0.2s, color 0.2s; cursor: pointer; }
        .epk-btn-secondary:hover { border-color: var(--epk-accent); color: var(--epk-accent); }
        .epk-flink { font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--epk-darkpaper); text-decoration: none; transition: color 0.2s; font-family: 'Josefin Sans', sans-serif; }
        .epk-flink:hover { color: var(--epk-accent); }
        .epk-press-quote { font-family: 'Cormorant Garamond', serif; font-size: 1.4rem; line-height: 1.5; color: var(--epk-paper); border-left: 2.5px solid var(--epk-accent); padding-left: 1.1rem; margin: 0 0 0.5rem 0; font-weight: 400; }
        .epk-press-source { font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--epk-dim); padding-left: 1.1rem; margin: 0 0 1.4rem 0; display: block; text-decoration: none; font-family: 'Josefin Sans', sans-serif; }
        .epk-press-source:hover { color: var(--epk-accent); }

        /* Grain */
        .epk-grain { position: absolute; inset: 0; pointer-events: none; opacity: 0.35; background-image: url("data:image/svg+xml,<svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.07'/></svg>"); }

        /* Track card */
        .epk-track { display: flex; align-items: center; gap: 1rem; padding: 1rem 0; border-bottom: 0.5px solid var(--epk-rule); cursor: pointer; transition: background 0.2s; }
        .epk-track:hover { background: rgba(162,64,31,0.06); }
        .epk-track:last-child { border-bottom: none; }
        .epk-track-play { width: 36px; height: 36px; border: 1px solid var(--epk-accent); border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: background 0.2s; }
        .epk-track:hover .epk-track-play { background: rgba(162,64,31,0.15); }
        .epk-track-active .epk-track-play { background: var(--epk-accent); }

        /* ── MOBILE MEDIA QUERIES ── */
        @media (max-width: 640px) {
          .epk-hero-photo {
            padding: 1rem !important;
            height: 70vh !important;
          }
          .epk-video-grid {
            grid-template-columns: 1fr !important;
            gap: 1.5rem !important;
          }
          .epk-stats-press-grid {
            grid-template-columns: 1fr !important;
          }
          .epk-stats-col {
            border-right: none !important;
            border-bottom: 0.5px solid var(--epk-rule);
          }
          .epk-shows-grid {
            grid-template-columns: 1fr !important;
          }
          .epk-config-grid {
            grid-template-columns: 1fr !important;
          }
          .epk-photos-grid {
            grid-template-columns: 1fr !important;
          }
          .epk-photos-grid > div:first-child {
            border-right: none !important;
            border-bottom: 0.5px solid var(--epk-rule);
          }
          .epk-footer-inner {
            flex-direction: column !important;
            gap: 1rem !important;
            align-items: flex-start !important;
          }
          .epk-footer-links {
            flex-wrap: wrap !important;
            gap: 1rem !important;
          }
          .epk-cta-section {
            margin: 0 !important;
          }
          .epk-track-embed {
            height: 200px !important;
          }
        }
      `}</style>

      <div className="epk-page">

        {/* ── HERO ── */}
        <div style={{ borderBottom: "0.5px solid var(--epk-rule)" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "3rem 2rem 2rem" }}>
            <p style={{ fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--epk-accent)", marginBottom: "1.25rem", fontWeight: 600, fontFamily: "'Josefin Sans', sans-serif" }}>
              Electronic Press Kit · 2026
            </p>
            <h1 className="epk-font-display" style={{ fontSize: "clamp(5rem, 16vw, 10rem)", lineHeight: 0.9, fontWeight: 700, color: "var(--epk-darkpaper)", textAlign: "center", letterSpacing: "-0.02em", margin: 0 }}>
              IO
            </h1>
            <p style={{ fontSize: 11, letterSpacing: "0.18em", color: "rgba(240,236,228,0.35)", textAlign: "center", marginTop: "0.4rem", fontWeight: 300, fontFamily: "'Josefin Sans', sans-serif" }}>
              iothesinger
            </p>
            <p style={{ fontSize: 14, letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--epk-accent)", textAlign: "center", marginTop: "0.75rem", fontWeight: 600, fontFamily: "'Josefin Sans', sans-serif" }}>
              Pop &nbsp;·&nbsp; Rock &nbsp;·&nbsp; Soul
            </p>
            <div style={{ width: 40, height: 2, background: "var(--epk-accent)", margin: "1.25rem auto 0" }} />
          </div>

          <div className="epk-hero-photo" style={{
            position: "relative",
            width: "100vw",
            height: "100vh",
            background: "#0c0b09",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden",
            padding: "4rem",
            boxSizing: "border-box",
          }}>
            <div style={{ position: "relative", width: "100%", height: "100%" }}>
              <Image
                src={pressPhotos[6].file}
                alt={pressPhotos[6].label || "IO press photo 2026"}
                fill
                priority
                style={{
                  objectFit: "contain",
                  objectPosition: "center center",
                  filter: "grayscale(40%) contrast(1.15) sepia(10%)",
                }}
              />
            </div>
            <div aria-hidden className="epk-grain" />
            <div aria-hidden style={{
              position: "absolute", inset: 0, pointerEvents: "none",
              background: "radial-gradient(ellipse at center, transparent 40%, rgba(12,11,9,0.75) 100%)",
            }} />
            <p style={{
              position: "absolute", bottom: "1.5rem", left: "1.5rem",
              fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase",
              color: "rgba(240,236,228,0.35)", margin: 0, fontFamily: "'Josefin Sans', sans-serif",
            }}>
              IO — press photo 2026
            </p>
          </div>
        </div>


        {/* ── LIVE PERFORMANCE VIDEOS ── */}
        <section style={{ width: "100%", padding: "4rem 2rem", boxSizing: "border-box", borderBottom: "0.5px solid var(--epk-rule)" }}>
          <p className="epk-font-display" style={{ fontSize: "clamp(2rem, 4vw, 5rem)", lineHeight: 0.9, color: "var(--epk-accent)", textAlign: "center", letterSpacing: "-0.02em", margin: "0 0 3rem" }}>
            Live Performance Videos
          </p>
          <div className="epk-video-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(280px, 420px))", justifyContent: "center", gap: "3rem", maxWidth: "1000px", margin: "0 auto" }}>
            {[
              { title: "\u201cI Got a Ticket & Covers\u201d", location: "Adams Morgan Porchfest · Washington DC · 2026", src: "https://customer-bhx35sxtf94ncmdm.cloudflarestream.com/154c01d9c35239191ac227878658f584/iframe?poster=https%3A%2F%2Fcustomer-bhx35sxtf94ncmdm.cloudflarestream.com%2F154c01d9c35239191ac227878658f584%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D%26height%3D600" },
              { title: "\u201cTomorrow\u201d", location: "Songbyrd DC · 2026", src: "https://customer-bhx35sxtf94ncmdm.cloudflarestream.com/718213477ee3be05bb2069d1ff0f0b46/iframe?poster=https%3A%2F%2Fcustomer-bhx35sxtf94ncmdm.cloudflarestream.com%2F718213477ee3be05bb2069d1ff0f0b46%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D%26height%3D600" },
              { title: "Just the Two of Us", location: "Adams Morgan Porchfest · Washington DC · 2026", src: "https://customer-bhx35sxtf94ncmdm.cloudflarestream.com/e3b6bc542e309640daa70ca4c006553a/iframe?poster=https%3A%2F%2Fcustomer-bhx35sxtf94ncmdm.cloudflarestream.com%2Fe3b6bc542e309640daa70ca4c006553a%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D%26height%3D600" },
              { title: "\u201cIt\u2019s Too Much\u201d", location: "Washington DC · 2026", src: "https://customer-bhx35sxtf94ncmdm.cloudflarestream.com/6edea4301a0c51cf1b30096456616d59/iframe?poster=https%3A%2F%2Fcustomer-bhx35sxtf94ncmdm.cloudflarestream.com%2F6edea4301a0c51cf1b30096456616d59%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D%26height%3D600" },
            ].map((video) => (
              <div key={video.title} style={{ border: "0.5px solid var(--epk-rule)", background: "#0c0b09" }}>
                <div style={{ position: "relative", paddingTop: "177.77%" }}>
                  <iframe src={video.src} loading="lazy" style={{ border: "none", position: "absolute", inset: 0, width: "100%", height: "100%" }} allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture" allowFullScreen title={video.title} />
                </div>
                <div style={{ padding: "0.75rem 1rem", borderTop: "0.5px solid var(--epk-rule)" }}>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 15, color: "var(--epk-paper)", margin: 0, fontStyle: "italic" }}>{video.title}</p>
                  <p style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--epk-dim)", margin: "5px 0 0", fontFamily: "'Josefin Sans', sans-serif" }}>{video.location}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── STATS + PRESS ── */}
        <div className="epk-cta-section" style={{ margin: "3rem 2rem 0", borderBottom: "0.5px solid var(--epk-rule)" }}>
          <div className="epk-stats-press-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", alignItems: "start" }}>
            <div className="epk-stats-col" style={{ borderRight: "0.5px solid var(--epk-rule)", padding: "2rem" }}>
              {STATS.map((s) => (
                <div key={s.label} className="epk-stat-block">
                  <p className="epk-font-display" style={{ fontSize: "2.5rem", color: "var(--epk-paper)", lineHeight: 1, margin: 0 }}>
                    {s.accent ? (<>{s.num.replace(/[K+]/g, "")}<span style={{ color: "var(--epk-accent)" }}>{s.num.match(/[K+]+/)?.[0]}</span></>) : s.num}
                  </p>
                  <p style={{ fontSize: 9, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--epk-dim)", lineHeight: 1.4, marginTop: 6, whiteSpace: "pre-line", fontFamily: "'Josefin Sans', sans-serif" }}>{s.label}</p>
                </div>
              ))}
            </div>
            <div style={{ padding: "2rem" }}>
              <SectionLabel>Press</SectionLabel>
              {PRESS.map((p) => (
                <div key={p.source}>
                  <blockquote className="epk-press-quote">&ldquo;{p.quote}&rdquo;</blockquote>
                  {p.href ? (
                    <Link href={p.href} target="_blank" className="epk-press-source">{p.source} ↗</Link>
                  ) : (
                    <span className="epk-press-source">{p.source}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── BIO ── */}
        <div className="epk-section">
          <p className="epk-font-display" style={{ fontSize: "clamp(2rem, 4vw, 5rem)", lineHeight: 0.9, color: "var(--epk-accent)", textAlign: "center", letterSpacing: "-0.02em", margin: "0 0 2rem" }}>About</p>
          <div style={{ fontSize: 14, color: "rgba(240,236,228,0.7)", textAlign: "center", lineHeight: 1.9, maxWidth: 900, margin: "0 auto", fontFamily: "'Josefin Sans', sans-serif" }}>
            <p>Some artists write about the world. IO writes about surviving it.</p>
            <p style={{ marginTop: "0.9rem" }}>
              The DC-based, Nigerian-American artist Howard University alumna, top-8 finalist on BET&apos;s Sunday Best, and three-time Kennedy Center performer including the prestigious Betty Carter Jazz Ahead residency. She arrives in 2026 with her debut full-length{" "}
              <em style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.05em" }}>Severed</em>: a record about what it costs to leave the life you were handed, the grief of losing a faith that was your whole world, and the terrifying, necessary work of building yourself back from nothing.
            </p>
            <p style={{ marginTop: "0.9rem" }}>
              Severed, her debut album is rooted in the era of classic rock, from the folk tradition that makes a room go quiet to the bombastic glam rock that makes it erupt. Her voice is technically ferocious and always in service of the song. Before this record, IO opened for Grammy winner Paquito D&apos;Rivera at the Ubeda Jazz Festival in Spain, sold 530+ tickets across 7 shows, and has been featured in the Washington City Paper, EARMILK, and the Spanish press.
            </p>
          </div>
        </div>

        {/* ── LISTEN ── */}
        <div className="epk-section">
          <SectionLabel>Listen</SectionLabel>
          <p style={{ fontSize: 12, color: "var(--epk-dim)", fontFamily: "'Josefin Sans', sans-serif", marginBottom: "1.5rem", letterSpacing: "0.04em" }}>
            Select a track to preview
          </p>

          {/* Track list */}
          <div style={{ marginBottom: "1.5rem" }}>
            {TRACKS.map((track, i) => (
              <div
                key={track.youtubeId}
                className={`epk-track${activeTrack === i ? " epk-track-active" : ""}`}
                onClick={() => setActiveTrack(activeTrack === i ? null : i)}
              >
                <div className="epk-track-play">
                  {activeTrack === i ? (
                    <div style={{ display: "flex", gap: 3, alignItems: "center" }}>
                      <div style={{ width: 3, height: 12, background: "var(--epk-paper)", borderRadius: 1 }} />
                      <div style={{ width: 3, height: 12, background: "var(--epk-paper)", borderRadius: 1 }} />
                    </div>
                  ) : (
                    <div style={{ width: 0, height: 0, borderTop: "6px solid transparent", borderBottom: "6px solid transparent", borderLeft: "10px solid var(--epk-accent)", marginLeft: 2 }} />
                  )}
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: 16, color: "var(--epk-paper)", margin: 0, lineHeight: 1.2 }}>
                    {track.title}
                  </p>
                  <p style={{ fontFamily: "'Josefin Sans', sans-serif", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--epk-dim)", margin: "3px 0 0" }}>
                    {track.album} · {track.year}
                  </p>
                </div>
                <span style={{ fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--epk-accent)", fontFamily: "'Josefin Sans', sans-serif" }}>
                  {activeTrack === i ? "close" : "preview"}
                </span>
              </div>
            ))}
          </div>

          {/* YouTube embed — shows when track is selected */}
          {activeTrack !== null && (
            <div className="epk-track-embed" style={{ width: "100%", height: 280, background: "#0f0d0a", border: "0.5px solid var(--epk-rule)" }}>
              <iframe
                key={activeTrack}
                src={`https://www.youtube.com/embed/${TRACKS[activeTrack].youtubeId}?start=${TRACKS[activeTrack].start}&autoplay=1&rel=0&modestbranding=1`}
                width="100%"
                height="100%"
                style={{ display: "block", border: "none" }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={TRACKS[activeTrack].title}
              />
            </div>
          )}

          {/* Streaming links */}
          <div style={{ marginTop: "1.5rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <Link href="https://open.spotify.com/artist/12jmhK2iFMAeOGYAo59v9C" target="_blank" className="epk-btn-secondary" style={{ fontSize: 10 }}>
              Spotify
            </Link>
            <Link href="https://music.apple.com/us/artist/iothesinger/1768147527" target="_blank" className="epk-btn-secondary" style={{ fontSize: 10 }}>
              Apple Music
            </Link>
            <Link href="https://www.youtube.com/@iothesinger." target="_blank" className="epk-btn-secondary" style={{ fontSize: 10 }}>
              YouTube
            </Link>
          </div>
        </div>

        {/* ── SHOWS ── */}
        <div className="epk-section">
          <div className="epk-shows-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
            <div>
              <SectionLabel>Upcoming — Spain 2026</SectionLabel>
              {UPCOMING.map((s) => <ShowRow key={s.venue} venue={s.venue} loc={s.loc} tag={s.tag} />)}
            </div>
            <div>
              <SectionLabel>Selected credits</SectionLabel>
              {CREDITS.map((s) => <ShowRow key={s.venue + s.tag} venue={s.venue} loc={s.loc} tag={s.tag} />)}
            </div>
          </div>
        </div>

        {/* ── LIVE CONFIG ── */}
        <div className="epk-section">
          <SectionLabel>Live configuration</SectionLabel>
          <div className="epk-config-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1, background: "var(--epk-rule)", border: "0.5px solid var(--epk-rule)", marginBottom: "1.5rem" }}>
            {CONFIGS.map((c) => (
              <div key={c.title} className="epk-config-block">
                <p style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--epk-accent)", marginBottom: "0.4rem", fontFamily: "'Josefin Sans', sans-serif" }}>{c.title}</p>
                <p style={{ fontSize: 12, color: "var(--epk-paper)", lineHeight: 1.6, margin: 0, fontFamily: "'Josefin Sans', sans-serif" }}>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── CTA ── */}
        <div style={{ borderBottom: "0.5px solid var(--epk-rule)" }}>
          <div className="epk-photos-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
            <div style={{ borderRight: "0.5px solid var(--epk-rule)" }}>
              <div style={{ position: "relative", height: 480, overflow: "hidden" }}>
                <Image src="/audience-dc-photo.jpg" alt="IO live — Songbyrd DC Spring 2026" fill style={{ objectFit: "cover", objectPosition: "center" }} />
              </div>
              <div style={{ padding: "0.75rem 1rem", borderTop: "0.5px solid var(--epk-rule)" }}>
                <p style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--epk-darkpaper)", margin: 0, fontFamily: "'Josefin Sans', sans-serif" }}>Songbyrd DC · Spring 2026</p>
              </div>
            </div>
            <div>
              <div style={{ position: "relative", height: 480, overflow: "hidden" }}>
                <Image src="/audience-spain.jpg" alt="IO live — Bar Mutante Sevilla Fall 2025" fill style={{ objectFit: "cover", objectPosition: "center" }} />
              </div>
              <div style={{ padding: "0.75rem 1rem", borderTop: "0.5px solid var(--epk-rule)" }}>
                <p style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--epk-darkpaper)", margin: 0, fontFamily: "'Josefin Sans', sans-serif" }}>Bar Mutante · Sevilla · Fall 2025</p>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem", alignItems: "center", padding: "2.5rem 2rem" }}>
            <SectionLabel>Booking &amp; press</SectionLabel>
            <p className="epk-font-serif" style={{ fontSize: "1.8rem", color: "var(--epk-paper)", lineHeight: 1.45, maxWidth: 900, textAlign: "center", margin: 0 }}>
              Building a European touring presence with an established audience in Spain and Portugal, seeking strategic booking partnerships in the UK, wider Europe, and US
            </p>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
              <Link href="mailto:contact@iothesinger.com" className="epk-btn-primary">contact@iothesinger.com</Link>
              <Link href="https://iothesinger.com/info" target="_blank" className="epk-btn-secondary">Download press kit</Link>
            </div>
          </div>
        </div>

        {/* ── FOOTER ── */}
        <div style={{ padding: "1.25rem 2rem", borderTop: "0.5px solid var(--epk-rule)" }}>
          <div className="epk-footer-inner" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span className="epk-font-display" style={{ fontSize: "1.4rem", color: "var(--epk-dimmer)" }}>IO</span>
            <div className="epk-footer-links" style={{ display: "flex", gap: "1.5rem" }}>
              <Link href="https://iothesinger.com" target="_blank" className="epk-flink">Website</Link>
              {socialLinks.map((s) => (
                <Link key={s.name} href={s.url} target="_blank" className="epk-flink">{s.name}</Link>
              ))}
              <Link href="mailto:contact@iothesinger.com" className="epk-flink">Contact</Link>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}
