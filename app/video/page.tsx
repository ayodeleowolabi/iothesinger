import Link from "next/link";
import Image from "next/image";

const videos = [
  {
    id: "KEOMLJTqgtg",
    title: "Music Video",
  },
  {
    id: "3op04o7ofm0",
    title: "Searching — Acoustic",
  },
  {
    id: "Y69wyJ209DE",
    title: "Live on WUSA",
  },
  {
    id: "8CgiPg0uqL4",
    title: "Live Performance",
  },
  {
    id: "2N-6a1A2Nvg",
    title: "Invaded",
  },
];

const navLinks = [
  { name: "Tour", href: "/tour" },
  { name: "Info", href: "/info" },
  { name: "Video", href: "/video" },
  { name: "Sign Up", href: "/signup" },
];

export default function VideoPage() {
  return (
    <main style={{
      minHeight: "100vh",
      width: "100%",
      background: "#0f0d0b",
      overflowY: "auto",
    }}>

      {/* Background image — subtle */}
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

      {/* Top gradient */}
      <div style={{
        position: "fixed",
        top: 0, left: 0, right: 0,
        height: "120px",
        background: "linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, transparent 100%)",
        zIndex: 9,
      }} />

      {/* Nav */}
      <div style={{
        position: "fixed",
        top: 0, left: 0, right: 0,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "28px 40px",
        zIndex: 10,
      }}>
        <Link href="/" style={{
          fontFamily: "var(--font-playfair)",
          color: "#f0e6d3",
          fontSize: "2.4rem",
          fontWeight: "900",
          letterSpacing: "-0.04em",
          textTransform: "uppercase",
          textDecoration: "none",
          lineHeight: 1,
        }}>
          iothesinger
        </Link>

        <nav style={{ display: "flex", gap: "28px", alignItems: "center" }}>
          {navLinks.map((link) => (
            <Link
              key={link.name}
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
            </Link>
          ))}
        </nav>
      </div>

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

        {/* Grid */}
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