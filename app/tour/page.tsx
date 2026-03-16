import Image from "next/image";
import Navbar from "../components/Navbar";
import { shows } from "../data/siteData";

export default function TourPage() {
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

      {/* Dark overlay */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: "rgba(0,0,0,0.75)",
      }} />

      <Navbar />

      {/* Scrollable content */}
      <div style={{
        position: "absolute",
        top: "100px",
        bottom: 0,
        left: 0,
        right: 0,
        overflowY: "auto",
        zIndex: 10,
        padding: "40px 40px 60px",
      }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          {shows.map((show, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "20px 0",
                borderBottom: "1px solid rgba(240,230,211,0.15)",
                gap: "16px",
                flexWrap: "wrap",
              }}
            >
              <div style={{
                color: "#c45c2e",
                fontSize: "0.85rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                fontWeight: "600",
                minWidth: "140px",
                fontFamily: "var(--font-cormorant)",
              }}>
                {show.date}
              </div>

              <div style={{
                color: "#f0e6d3",
                fontSize: "1rem",
                fontWeight: "500",
                flex: 1,
                fontFamily: "var(--font-cormorant)",
              }}>
                {show.venue}
              </div>

              <div style={{
                color: "rgba(240,230,211,0.6)",
                fontSize: "0.85rem",
                letterSpacing: "0.05em",
                minWidth: "160px",
                fontFamily: "var(--font-cormorant)",
              }}>
                {show.city}
              </div>

              <div style={{ minWidth: "120px", textAlign: "right" }}>
                {show.url ? (
                  
                   <a href={show.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-block",
                      border: "1px solid #f0e6d3",
                      color: "#f0e6d3",
                      padding: "8px 20px",
                      fontSize: "0.7rem",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      textDecoration: "none",
                    }}
                  >
                    Tickets
                  </a>
                ) : (
                  <span style={{
                    color: "rgba(240,230,211,0.35)",
                    fontSize: "0.7rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                  }}>
                    TBA
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}