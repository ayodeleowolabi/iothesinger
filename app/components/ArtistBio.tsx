"use client";

import Image from "next/image";
import { bio, facts, pullQuote, pressPhotos, pressFeatures } from "../data/siteData";

export default function ArtistBio() {
  return (
    <>
      <style>{`
        .info-grid {
          display: grid;
          grid-template-columns: 1fr 300px;
          gap: 80px;
          margin-bottom: 80px;
        }
        .info-pull-quote { font-size: 1.6rem; }
        .info-bio-para { font-size: 1.2rem; }
        .press-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 16px;
        }
        .press-feature-card {
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: 32px;
          align-items: center;
          border: 1px solid rgba(240,230,211,0.12);
          background: rgba(240,230,211,0.02);
          transition: border-color 0.2s, background 0.2s;
        }
        @media (max-width: 768px) {
          .info-grid { grid-template-columns: 1fr; gap: 40px; margin-bottom: 48px; }
          .info-pull-quote { font-size: 1.25rem; margin-bottom: 32px; }
          .info-bio-para { font-size: 1rem; line-height: 1.8; }
          .press-grid { grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 12px; }
          .press-feature-card { grid-template-columns: 1fr; }
          .press-feature-image { height: 220px !important; }
        }
        @media (max-width: 480px) {
          .info-pull-quote { font-size: 1.1rem; }
          .press-grid { grid-template-columns: 1fr 1fr; gap: 10px; }
        }
      `}</style>

      {/* ── Bio + Facts grid ── */}
      <div className="info-grid">
        <div>
          <p className="info-pull-quote" style={{
            color: "#c45c2e", fontStyle: "italic", lineHeight: 1.5,
            marginBottom: "48px", borderLeft: "3px solid #c45c2e",
            paddingLeft: "24px", fontFamily: "var(--font-cormorant)", fontWeight: "300",
          }}>
            "{pullQuote}"
          </p>

          {bio.map((para, i) => (
            <p key={i} className="info-bio-para" style={{
              color: "rgba(240,230,211,0.85)", lineHeight: 1.9,
              marginBottom: "24px", fontFamily: "var(--font-cormorant)", fontWeight: "400",
            }}>
              {para}
            </p>
          ))}

          <a href="/IO_EPK.pdf" target="_blank" rel="noopener noreferrer" style={{
            display: "inline-block", marginTop: "16px", color: "#c45c2e",
            fontSize: "0.85rem", letterSpacing: "0.12em", textTransform: "uppercase",
            textDecoration: "none", borderBottom: "1px solid #c45c2e",
            paddingBottom: "2px", fontFamily: "var(--font-cormorant)", fontWeight: "600",
          }}>
            Download Full Bio + Press Kit →
          </a>
        </div>

        <div style={{ paddingTop: "8px" }}>
          <div style={{ borderTop: "1px solid rgba(240,230,211,0.15)", paddingTop: "24px", marginBottom: "40px" }}>
            {facts.map((fact) => (
              <div key={fact.label} style={{ marginBottom: "20px" }}>
                <div style={{
                  color: "rgba(240,230,211,0.45)", fontSize: "0.7rem",
                  letterSpacing: "0.12em", textTransform: "uppercase",
                  marginBottom: "4px", fontFamily: "var(--font-cormorant)",
                }}>
                  {fact.label}
                </div>
                <div style={{
                  color: "#f0e6d3", fontSize: "1rem", lineHeight: 1.5,
                  fontFamily: "var(--font-cormorant)", fontWeight: "500",
                }}>
                  {fact.value}
                </div>
              </div>
            ))}
          </div>

          <a href="/IO_EPK.pdf" target="_blank" rel="noopener noreferrer" style={{
            display: "block", background: "#c45c2e", color: "white",
            padding: "14px 24px", fontSize: "0.8rem", letterSpacing: "0.15em",
            textTransform: "uppercase", textDecoration: "none", fontWeight: "600",
            textAlign: "center", marginBottom: "12px", fontFamily: "var(--font-cormorant)",
          }}>
            Download Bio/EPK
          </a>

          <a href="mailto:contact@iothesinger.com" style={{
            display: "block", border: "1px solid rgba(240,230,211,0.4)",
            color: "#f0e6d3", padding: "14px 24px", fontSize: "0.8rem",
            letterSpacing: "0.15em", textTransform: "uppercase",
            textDecoration: "none", textAlign: "center", fontFamily: "var(--font-cormorant)",
          }}>
            contact@iothesinger.com
          </a>
        </div>
      </div>

      {/* ── Press Features ── */}
      {pressFeatures.length > 0 && (
        <div style={{ borderTop: "1px solid rgba(240,230,211,0.15)", paddingTop: "48px", marginBottom: "80px" }}>
          <h2 style={{
            fontFamily: "var(--font-playfair)", color: "#f0e6d3", fontSize: "1.5rem",
            fontWeight: "900", letterSpacing: "-0.01em", textTransform: "uppercase", marginBottom: "32px",
          }}>
            Press
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            {pressFeatures.map((feature) => (
              <a
                key={feature.url}
                href={feature.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none", display: "block" }}
              >
                <div
                  className="press-feature-card"
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = "#c45c2e";
                    (e.currentTarget as HTMLDivElement).style.background = "rgba(196,92,46,0.05)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(240,230,211,0.12)";
                    (e.currentTarget as HTMLDivElement).style.background = "rgba(240,230,211,0.02)";
                  }}
                >
                  {/* Photo */}
                  <div className="press-feature-image" style={{ position: "relative", height: "180px", overflow: "hidden" }}>
                    <Image
                      src="https://i0.wp.com/newspack-washingtoncitypaper.s3.amazonaws.com/uploads/2026/04/ayo-2_Josh-Jones-scaled-e1777473247686.jpg?w=1822&ssl=1"
                      alt={feature.headline}
                      fill
                      style={{ objectFit: "cover", objectPosition: "center top" }}
                      unoptimized
                    />
                  </div>

                  {/* Text */}
                  <div style={{ padding: "24px 24px 24px 0" }}>
                    <div style={{
                      color: "#c45c2e", fontSize: "0.7rem", letterSpacing: "0.15em",
                      textTransform: "uppercase", marginBottom: "10px",
                      fontFamily: "var(--font-cormorant)", fontWeight: "600",
                    }}>
                      {feature.outlet} · {feature.date}
                    </div>
                    <div style={{
                      color: "#f0e6d3", fontSize: "1.3rem", lineHeight: 1.4,
                      fontFamily: "var(--font-playfair)", fontWeight: "700",
                    }}>
                      {feature.headline}
                    </div>
                    <div style={{
                      marginTop: "16px", color: "#c45c2e", fontSize: "0.75rem",
                      letterSpacing: "0.12em", textTransform: "uppercase",
                      fontFamily: "var(--font-cormorant)", fontWeight: "600",
                    }}>
                      Read Article →
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* ── Press Photos ── */}
      <div style={{ borderTop: "1px solid rgba(240,230,211,0.15)", paddingTop: "48px" }}>
        <h2 style={{
          fontFamily: "var(--font-playfair)", color: "#f0e6d3", fontSize: "1.5rem",
          fontWeight: "900", letterSpacing: "-0.01em", textTransform: "uppercase", marginBottom: "32px",
        }}>
          Press Photos
        </h2>

        <div className="press-grid">
          {pressPhotos.map((photo) => (
            <div key={photo.file}>
              <div style={{ position: "relative", paddingBottom: "100%", overflow: "hidden", background: "#1a1a1a" }}>
                <Image src={photo.file} alt={photo.label} fill style={{ objectFit: "cover" }} />
              </div>
              <a href={photo.file} download style={{
                display: "block", marginTop: "8px",
                border: "1px solid rgba(240,230,211,0.3)", color: "rgba(240,230,211,0.7)",
                padding: "8px 16px", fontSize: "0.75rem", letterSpacing: "0.12em",
                textTransform: "uppercase", textDecoration: "none",
                textAlign: "center", fontFamily: "var(--font-cormorant)",
              }}>
                Download
              </a>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
