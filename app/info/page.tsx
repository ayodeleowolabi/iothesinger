import Link from "next/link";
import Image from "next/image";
import Navbar from "../components/Navbar";

const navLinks = [
  { name: "Tour", href: "/tour" },
  { name: "Info", href: "/info" },
  { name: "Video", href: "/video" },
  { name: "Sign Up", href: "/signup" },
];

const pressPhotos = [
  { file: "/IO1.jpg", label: "Press Photo 1" },
  { file: "/IO2.jpg", label: "Press Photo 2" },
  { file: "/IO3.jpg", label: "Press Photo 3" },
  { file: "/IO4.jpg", label: "Press Photo 4" },
  { file: "/IO5.jpg", label: "Press Photo 5" },
  { file: "/IO6.jpg", label: "Press Photo 6" },
];

export default function InfoPage() {
  return (
    <main style={{
      minHeight: "100vh",
      width: "100%",
      background: "#0f0d0b",
      overflowY: "auto",
      fontFamily: "var(--font-cormorant)",
    }}>

      {/* Background image — subtle */}
      <div style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        opacity: 0.12,
      }}>
        <Image
          src="/albumcover.jpg"
          alt=""
          fill
          style={{ objectFit: "cover", objectPosition: "center 25%" }}
        />
      </div>

<Navbar />
      {/* Content */}
      <div style={{
        position: "relative",
        zIndex: 5,
        padding: "140px 40px 80px",
        maxWidth: "1100px",
        margin: "0 auto",
      }}>

        {/* Two column layout */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 300px",
          gap: "80px",
          marginBottom: "80px",
        }}>

          {/* Left — bio */}
          <div>
            {/* Pull quote */}
            <p style={{
              color: "#c45c2e",
              fontSize: "1.6rem",
              fontStyle: "italic",
              lineHeight: 1.5,
              marginBottom: "48px",
              borderLeft: "3px solid #c45c2e",
              paddingLeft: "24px",
              fontFamily: "var(--font-cormorant)",
              fontWeight: "300",
            }}>
              "iothesinger is a rock and soul artist whose performances don't just move rooms, they change them."
            </p>

            {/* Personal bio */}
            {[
              "IO is an artist who has spent her whole life turning displacement into devotion. Born in Atlanta, raised between Macon and Nigeria, Ayodele Owolabi arrived at her voice the hard way, through years of uncertainty, faith, loss, and an unwillingness to let any of it go to waste.",
              "She makes rock and soul music that doesn't ask permission. Her live performances have stopped rooms mid-breath. Audiences have called for encores before the last note faded. People have cried without expecting to. Because IO doesn't just sing songs she holds a room still and asks it to reckon with itself.",
              "Her debut album Severed arrives spring 2026. It is a record about grief, liberation, and the terrifying space in between; the place where you've let go of who you were but haven't yet become who you're meant to be.",
            ].map((para, i) => (
              <p key={i} style={{
                color: "rgba(240,230,211,0.85)",
                fontSize: "1.2rem",
                lineHeight: 1.9,
                marginBottom: "24px",
                fontFamily: "var(--font-cormorant)",
                fontWeight: "400",
              }}>
                {para}
              </p>
            ))}

            {/* Download full bio */}
            
            <a  href="/IO_EPK.pdf"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-block",
                marginTop: "16px",
                color: "#c45c2e",
                fontSize: "0.85rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                textDecoration: "none",
                borderBottom: "1px solid #c45c2e",
                paddingBottom: "2px",
                fontFamily: "var(--font-cormorant)",
                fontWeight: "600",
              }}
            >
              Download Full Bio + Press Kit →
            </a>
          </div>

          {/* Right — facts + actions */}
          <div style={{ paddingTop: "8px" }}>
            <div style={{
              borderTop: "1px solid rgba(240,230,211,0.15)",
              paddingTop: "24px",
              marginBottom: "40px",
            }}>
              {[
                { label: "Based in", value: "Washington DC / Seville, Spain" },
                { label: "Education", value: "Howard University" },
                { label: "Streams", value: "200K+ Spotify" },
                { label: "Press", value: "EARMILK · Washington Post · The Hype Magazine" },
                { label: "Debut Album", value: "Severed — 2026" },
              ].map((fact) => (
                <div key={fact.label} style={{ marginBottom: "20px" }}>
                  <div style={{
                    color: "rgba(240,230,211,0.45)",
                    fontSize: "0.7rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    marginBottom: "4px",
                    fontFamily: "var(--font-cormorant)",
                  }}>
                    {fact.label}
                  </div>
                  <div style={{
                    color: "#f0e6d3",
                    fontSize: "1rem",
                    lineHeight: 1.5,
                    fontFamily: "var(--font-cormorant)",
                    fontWeight: "500",
                  }}>
                    {fact.value}
                  </div>
                </div>
              ))}
            </div>

            
            <a  href="/IO_EPK.pdf"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "block",
                background: "#c45c2e",
                color: "white",
                padding: "14px 24px",
                fontSize: "0.8rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                textDecoration: "none",
                fontWeight: "600",
                textAlign: "center",
                marginBottom: "12px",
                fontFamily: "var(--font-cormorant)",
              }}
            >
              Download Bio/EPK
            </a>

            
            <a  href="mailto:contact@iothesinger.com"
              style={{
                display: "block",
                border: "1px solid rgba(240,230,211,0.4)",
                color: "#f0e6d3",
                padding: "14px 24px",
                fontSize: "0.8rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                textDecoration: "none",
                textAlign: "center",
                fontFamily: "var(--font-cormorant)",
              }}
            >
              contact@iothesinger.com
            </a>
          </div>
        </div>

        {/* Press Photos */}
        <div style={{
          borderTop: "1px solid rgba(240,230,211,0.15)",
          paddingTop: "48px",
        }}>
          <h2 style={{
            fontFamily: "var(--font-playfair)",
            color: "#f0e6d3",
            fontSize: "1.5rem",
            fontWeight: "900",
            letterSpacing: "-0.01em",
            textTransform: "uppercase",
            marginBottom: "32px",
          }}>
            Press Photos
          </h2>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "16px",
          }}>
            {pressPhotos.map((photo) => (
              <div key={photo.file}>
                <div style={{
                  position: "relative",
                  paddingBottom: "100%",
                  overflow: "hidden",
                  background: "#1a1a1a",
                }}>
                  <Image
                    src={photo.file}
                    alt={photo.label}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
                
              <a   href={photo.file}
                  download
                  style={{
                    display: "block",
                    marginTop: "8px",
                    border: "1px solid rgba(240,230,211,0.3)",
                    color: "rgba(240,230,211,0.7)",
                    padding: "8px 16px",
                    fontSize: "0.75rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    textDecoration: "none",
                    textAlign: "center",
                    fontFamily: "var(--font-cormorant)",
                  }}
                >
                  Download
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}