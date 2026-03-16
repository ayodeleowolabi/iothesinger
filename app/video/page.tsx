import Image from "next/image";
import Navbar from "../components/Navbar";
import { videos } from "../data/siteData";

export default function VideoPage() {
  return (
    <main style={{
      minHeight: "100vh",
      width: "100%",
      background: "#0f0d0b",
      overflowY: "auto",
    }}>

      {/* Background */}
      <div style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        opacity: 0.15,
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
        maxWidth: "1400px",
        margin: "0 auto",
      }}>

        <h1 style={{
          fontFamily: "var(--font-playfair)",
          color: "#f0e6d3",
          fontSize: "3rem",
          fontWeight: "900",
          letterSpacing: "-0.02em",
          marginBottom: "48px",
          textTransform: "uppercase",
          textAlign: "center",
        }}>
          Video
        </h1>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(380px, 1fr))",
          gap: "32px",
        }}>
          {videos.map((video) => (
            <div key={video.id}>
              <div style={{
                position: "relative",
                paddingBottom: "56.25%",
                height: 0,
                overflow: "hidden",
                background: "#1a1a1a",
              }}>
                <iframe
                  src={`https://www.youtube.com/embed/${video.id}`}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{
                    position: "absolute",
                    top: 0, left: 0,
                    width: "100%",
                    height: "100%",
                    border: "none",
                  }}
                />
              </div>
              <p style={{
                color: "#f0e6d3",
                fontSize: "0.8rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginTop: "12px",
                opacity: 0.7,
                fontFamily: "var(--font-cormorant)",
              }}>
                {video.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}