"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
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

// ─── TYPES ───────────────────────────────────────────────────────────────────

type Video = { href: string; title: string; sub: string };

// ─── SUB-COMPONENTS ──────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        fontSize: 12,
        letterSpacing: "0.24em",
        textTransform: "uppercase",
        color: "var(--epk-accent)",
        fontWeight: 400,
        margin: "0 0 1.25rem 0",
      }}
    >
      {children}
    </p>
  );
}

function ShowRow({ venue, loc, tag }: { venue: string; loc: string; tag: string }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "baseline",
        justifyContent: "space-between",
        gap: "1rem",
        padding: "0.75rem 0",
        borderBottom: "1px solid var(--epk-rule)",
      }}
    >
      <span style={{ fontSize: 13, color: "var(--epk-paper)", flex: 1 }}>{venue}</span>
      <span style={{ fontSize: 11, color: "var(--epk-dim)", flex: 1 }}>{loc}</span>
      <span
        style={{
          fontSize: 9,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "var(--epk-accent)",
          whiteSpace: "nowrap",
        }}
      >
        {tag}
      </span>
    </div>
  );
}

// ─── VIDEO MODAL ─────────────────────────────────────────────────────────────

function VideoModal({ video, onClose }: { video: Video | null; onClose: () => void }) {
  useEffect(() => {
    if (!video) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [video, onClose]);

  if (!video) return null;

  const match = video.href.match(/instagram\.com\/p\/([^/]+)/);
  const shortcode = match?.[1];
  const embedUrl = shortcode ? `https://www.instagram.com/p/${shortcode}/embed/` : null;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(12,11,9,0.95)",
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 540,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          marginBottom: "1rem",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <p
            style={{
              fontFamily: "'Libre Baskerville', Georgia, serif",
              fontStyle: "italic",
              fontSize: "1.1rem",
              color: "#f0ece4",
              margin: 0,
            }}
          >
            {video.title}
          </p>
          <p
            style={{
              fontSize: 10,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "rgba(240,236,228,0.35)",
              margin: "4px 0 0",
            }}
          >
            {video.sub}
          </p>
        </div>
        <button
          onClick={onClose}
          style={{
            background: "transparent",
            border: "1px solid rgba(240,236,228,0.2)",
            color: "#f0ece4",
            padding: "6px 14px",
            fontSize: 10,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            cursor: "pointer",
            fontFamily: "inherit",
          }}
        >
          Close ✕
        </button>
      </div>

      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: 540,
          background: "#0f0d0a",
          border: "1px solid rgba(240,236,228,0.1)",
        }}
      >
        {embedUrl ? (
          <iframe
            src={embedUrl}
            width="100%"
            height="680"
            frameBorder="0"
            scrolling="no"
            allowTransparency
            style={{ display: "block" }}
            title={video.title}
          />
        ) : (
          <div
            style={{
              padding: "3rem",
              textAlign: "center",
              color: "rgba(240,236,228,0.5)",
              fontSize: 13,
            }}
          >
            <p style={{ marginBottom: "1rem" }}>This video is hosted on Instagram.</p>
            <Link
              href={video.href}
              target="_blank"
              style={{
                background: "#a2401f",
                color: "#f0ece4",
                padding: "0.6rem 1.2rem",
                fontSize: 11,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                textDecoration: "none",
                display: "inline-block",
              }}
            >
              Watch on Instagram ↗
            </Link>
          </div>
        )}
      </div>

      {embedUrl && (
        <div style={{ marginTop: "0.75rem" }} onClick={(e) => e.stopPropagation()}>
          <Link
            href={video.href}
            target="_blank"
            style={{
              fontSize: 10,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "rgba(240,236,228,0.35)",
              textDecoration: "none",
            }}
          >
            Open on Instagram ↗
          </Link>
        </div>
      )}
    </div>
  );
}

// ─── INSTAGRAM EMBED THUMBNAIL ────────────────────────────────────────────────

function IGThumbnail({ video, onClick }: { video: Video; onClick: () => void }) {
  const match = video.href.match(/instagram\.com\/p\/([^/]+)/);
  const shortcode = match?.[1];
  const embedUrl = shortcode ? `https://www.instagram.com/p/${shortcode}/embed/` : null;

  return (
    <button
      onClick={onClick}
      style={{
        width: "100%",
        textAlign: "left",
        cursor: "pointer",
        background: "rgba(240,236,228,0.03)",
        border: "1px solid var(--epk-rule)",
        padding: 0,
        display: "flex",
        flexDirection: "column",
        transition: "border-color 0.2s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--epk-accent)")}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--epk-rule)")}
    >
      <div
        style={{
          width: "100%",
          aspectRatio: "4/3",
          overflow: "hidden",
          position: "relative",
          pointerEvents: "none",
        }}
      >
        {embedUrl ? (
          <iframe
            src={embedUrl}
            width="100%"
            height="100%"
            frameBorder="0"
            scrolling="no"
            allowTransparency
            style={{ display: "block", border: "none" }}
            title={video.title}
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              background: "rgba(240,236,228,0.05)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: 30,
                height: 30,
                border: "1px solid var(--epk-accent)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  width: 0,
                  height: 0,
                  borderTop: "5px solid transparent",
                  borderBottom: "5px solid transparent",
                  borderLeft: "10px solid var(--epk-accent)",
                  marginLeft: 2,
                }}
              />
            </div>
          </div>
        )}
        {/* Click-capture overlay with play icon */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(12,11,9,0.25)",
          }}
        >
          <div
            style={{
              width: 40,
              height: 40,
              border: "1.5px solid var(--epk-accent)",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(12,11,9,0.6)",
            }}
          >
            <div
              style={{
                width: 0,
                height: 0,
                borderTop: "7px solid transparent",
                borderBottom: "7px solid transparent",
                borderLeft: "13px solid var(--epk-accent)",
                marginLeft: 3,
              }}
            />
          </div>
        </div>
      </div>
      <div style={{ padding: "0.75rem" }}>
        <p
          style={{
            fontSize: 11,
            fontWeight: 500,
            color: "var(--epk-paper)",
            margin: "0 0 2px 0",
            lineHeight: 1.4,
          }}
        >
          {video.title}
        </p>
        <p style={{ fontSize: 10, color: "var(--epk-dimmer)", margin: 0 }}>{video.sub}</p>
      </div>
    </button>
  );
}

// ─── PAGE ────────────────────────────────────────────────────────────────────

export default function EPKPage() {
  const [activeVideo, setActiveVideo] = useState<Video | null>(null);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap');

        :root {
          --epk-accent:  #a2401f;
          --epk-accent2: #c25a30;
          --epk-ink:     #0c0b09;
          --epk-paper:   #f0ece4;
          --epk-dim:     rgba(240,236,228,0.45);
          --epk-dimmer:  rgba(240,236,228,0.18);
          --epk-rule:    rgba(240,236,228,0.10);
        }

        .epk-page * { box-sizing: border-box; }
        .epk-page { background: var(--epk-ink); color: var(--epk-paper); font-family: 'Inter', sans-serif; font-weight: 300; min-height: 100vh; }
        .epk-section { padding: 2rem; border-bottom: 1px solid var(--epk-rule); }
        .epk-stat-block { padding: 1.25rem 1.5rem; border-bottom: 1px solid var(--epk-rule); }
        .epk-font-display { font-family: 'Libre Baskerville', Georgia, serif; font-weight: 700; }
        .epk-font-serif { font-family: 'Libre Baskerville', Georgia, serif; font-style: italic; font-weight: 400; }
        .epk-config-block { background: var(--epk-ink); padding: 1.1rem; }
        .epk-btn-primary { background: var(--epk-accent); color: var(--epk-paper); border: none; padding: 0.7rem 1.4rem; font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; font-family: inherit; text-decoration: none; display: inline-block; transition: background 0.2s; cursor: pointer; }
        .epk-btn-primary:hover { background: var(--epk-accent2); }
        .epk-btn-secondary { background: transparent; color: var(--epk-paper); border: 1px solid var(--epk-dimmer); padding: 0.7rem 1.4rem; font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; font-family: inherit; text-decoration: none; display: inline-block; transition: border-color 0.2s, color 0.2s; cursor: pointer; }
        .epk-btn-secondary:hover { border-color: var(--epk-accent); color: var(--epk-accent); }
        .epk-flink { font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--epk-dimmer); text-decoration: none; transition: color 0.2s; }
        .epk-flink:hover { color: var(--epk-accent); }
        .epk-vid-more { font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--epk-accent); text-decoration: none; display: inline-flex; align-items: center; gap: 5px; border-bottom: 1px solid transparent; margin-top: 1rem; transition: border-color 0.2s; }
        .epk-vid-more:hover { border-color: var(--epk-accent); }
        .epk-press-quote { font-family: 'Libre Baskerville', Georgia, serif; font-style: italic; font-size: 1.2rem; line-height: 1.5; color: var(--epk-paper); border-left: 2.5px solid var(--epk-accent); padding-left: 1.1rem; margin: 0 0 0.5rem 0; }
        .epk-press-source { font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--epk-dimmer); padding-left: 1.1rem; margin: 0 0 1.4rem 0; display: block; text-decoration: none; }
        .epk-press-source:hover { color: var(--epk-accent); }
      `}</style>

      <VideoModal video={activeVideo} onClose={() => setActiveVideo(null)} />

      <div className="epk-page">

        {/* ── HERO: title then full-bleed photo ── */}
        <div style={{ borderBottom: "1px solid var(--epk-rule)" }}>

          {/* Centered title */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "3rem 2rem 2rem" }}>
            <p style={{ fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--epk-accent)", marginBottom: "1.25rem", fontWeight: 400 }}>
              Electronic Press Kit · 2026
            </p>
            <h1 className="epk-font-display" style={{ fontSize: "clamp(5rem, 16vw, 10rem)", lineHeight: 0.9, color: "var(--epk-paper)", textAlign: "center", letterSpacing: "-0.02em", margin: 0 }}>
              IO
            </h1>
            <p style={{ fontSize: 14, letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--epk-accent)", textAlign: "center", marginTop: "1rem", fontWeight: 600 }}>
              Folk &nbsp;·&nbsp; Rock &nbsp;·&nbsp; Soul
            </p>
            <div style={{ width: 40, height: 2, background: "var(--epk-accent)", margin: "1.25rem auto 0" }} />
          </div>

          {/* Full-bleed photo */}
          <div style={{ position: "relative", width: "100vw", marginLeft: "calc(50% - 50vw)", height: "100vh", background: "#1a1410", overflow: "hidden" }}>
            <Image
              src={pressPhotos[6].file}
              alt={pressPhotos[6].label || "IO press photo 2026"}
              fill
              style={{
                objectFit: "cover",
                objectPosition: "center 40%",
                filter: "grayscale(20%) contrast(1.05)",
              }}
              priority
            />
            <p style={{ position: "absolute", bottom: "1rem", left: "1rem", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(240,236,228,0.35)", margin: 0 }}>
              IO — press photo 2026
            </p>
          </div>
        </div>

        {/* ── STATS LEFT + PRESS RIGHT ── */}
        <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", borderBottom: "1px solid var(--epk-rule)" }}>
          <div style={{ borderRight: "1px solid var(--epk-rule)" }}>
            {STATS.map((s) => (
              <div key={s.label} className="epk-stat-block">
                <p className="epk-font-display" style={{ fontSize: "2.5rem", color: "var(--epk-paper)", lineHeight: 1, margin: 0 }}>
                  {s.accent ? (
                    <>
                      {s.num.replace(/[K+]/g, "")}
                      <span style={{ color: "var(--epk-accent)" }}>{s.num.match(/[K+]+/)?.[0]}</span>
                    </>
                  ) : s.num}
                </p>
                <p style={{ fontSize: 9, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--epk-dim)", lineHeight: 1.4, marginTop: 6, whiteSpace: "pre-line" }}>
                  {s.label}
                </p>
              </div>
            ))}
          </div>
          

        {/* ── BIO ── */}
        <div className="epk-section">
          <SectionLabel>About</SectionLabel>
          <div style={{ fontSize: 14, color: "rgba(240,236,228,0.7)", lineHeight: 1.9, maxWidth: 620 }}>
            <p>Some artists write about the world. IO writes about surviving it.</p>
            <p style={{ marginTop: "0.9rem" }}>
              The DC-based, Nigerian-American artist Howard University alumna,
              top-8 finalist on BET&apos;s Sunday Best, and three-time Kennedy Center
              performer including the prestigious Betty Carter Jazz Ahead residency
              arrives in 2026 with her debut full-length{" "}
              <em>Severed</em>: a record about what it costs to leave the life you
              were handed, the grief of losing a faith that was your whole world, and
              the terrifying, necessary work of building yourself back from nothing.
            </p>
            
            <p style={{ marginTop: "0.9rem" }}>
              Rooted in Carole King, James Taylor, and the folk tradition that makes
              a room go quiet then Queen, U2, and Green Day for the moment it needs
              to erupt. Her voice is technically ferocious and always in service of
              the song. Before this record, IO opened for Grammy winner Paquito
              D&apos;Rivera at the Ubeda Jazz Festival in Spain, sold 530+ tickets
              across 7 self-booked shows, and has been featured in the Washington
              City Paper, EARMILK, and the Spanish press.
            </p>
          </div>
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
        {/* ── LIVE FOOTAGE ── */}
        <div className="epk-section">
          <SectionLabel>Live footage</SectionLabel>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
            {VIDEOS.map((v) => (
              <IGThumbnail key={v.href} video={v} onClick={() => setActiveVideo(v)} />
            ))}
          </div>
          <Link href="https://iothesinger.com/video" target="_blank" className="epk-vid-more">
            ↗ More videos at iothesinger.com
          </Link>
        </div>

        {/* ── SHOWS ── */}
        <div className="epk-section">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
            <div>
              <SectionLabel>Upcoming — Spain 2026</SectionLabel>
              {UPCOMING.map((s) => (
                <ShowRow key={s.venue} venue={s.venue} loc={s.loc} tag={s.tag} />
              ))}
            </div>
            <div>
              <SectionLabel>Selected credits</SectionLabel>
              {CREDITS.map((s) => (
                <ShowRow key={s.venue + s.tag} venue={s.venue} loc={s.loc} tag={s.tag} />
              ))}
            </div>
          </div>
        </div>

        {/* ── LIVE CONFIG ── */}
        <div className="epk-section">
          <SectionLabel>Live configuration</SectionLabel>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1, background: "var(--epk-rule)", border: "1px solid var(--epk-rule)", marginBottom: "1.5rem" }}>
            {CONFIGS.map((c) => (
              <div key={c.title} className="epk-config-block">
                <p style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--epk-accent)", marginBottom: "0.4rem" }}>
                  {c.title}
                </p>
                <p style={{ fontSize: 12, color: "var(--epk-dim)", lineHeight: 1.6, margin: 0 }}>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── CTA ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", padding: "2.5rem 2rem" }}>
          <SectionLabel>Booking &amp; press</SectionLabel>
          <p className="epk-font-serif" style={{ fontSize: "1.5rem", color: "var(--epk-paper)", lineHeight: 1.45, maxWidth: 420 }}>
            Actively seeking festival support slots and opening opportunities in folk, rock, and pop.
          </p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <Link href="mailto:contact@iothesinger.com" className="epk-btn-primary">
              contact@iothesinger.com
            </Link>
            <Link href="/io-press-kit-2026.pdf" target="_blank" className="epk-btn-secondary">
              Download press kit
            </Link>
          </div>
        </div>

        {/* ── FOOTER ── */}
        <div style={{ padding: "1.25rem 2rem", borderTop: "1px solid var(--epk-rule)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span className="epk-font-display" style={{ fontSize: "1.2rem", color: "var(--epk-dimmer)" }}>
            IO
          </span>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            <Link href="https://iothesinger.com" target="_blank" className="epk-flink">Website</Link>
            {socialLinks.map((s) => (
              <Link key={s.name} href={s.url} target="_blank" className="epk-flink">{s.name}</Link>
            ))}
            <Link href="mailto:contact@iothesinger.com" className="epk-flink">Contact</Link>
          </div>
        </div>

      </div>
    </>
  );
}
