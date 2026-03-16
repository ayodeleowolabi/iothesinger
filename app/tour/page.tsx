import Image from "next/image";
import Link from "next/link";

const shows = [
  {
    date: "Mar 20, 2026",
    venue: "Sofar Sounds",
    city: "Washington, DC",
    url: "https://www.sofarsounds.com/events/64851",
  },
  {
    date: "Mar 26, 2026",
    venue: "Purgatory",
    city: "New York, NY",
    url: "https://dice.fm/event/dkmw6q-iothesinger-w-umami-house-and-tahirah-26th-mar-purgatory-new-york-tickets",
  },
  {
    date: "Apr 17, 2026",
    venue: "Sofar Sounds",
    city: "Washington, DC",
    url: "https://www.sofarsounds.com/events/65081",
  },
  {
    date: "Apr 30, 2026",
    venue: "Songbyrd",
    city: "Washington, DC",
    url: null,
  },
  {
    date: "May 15, 2026",
    venue: "Big Bear Cafe",
    city: "Washington, DC",
    url: null,
  },
  {
    date: "Jun 11, 2026",
    venue: "Allegro Ma Non Troppo",
    city: "Seville, Spain",
    url: null,
  },
  {
    date: "Jun 17, 2026",
    venue: "Carmona",
    city: "Seville, Spain",
    url: null,
  },
  {
    date: "Jun 19, 2026",
    venue: "TBA",
    city: "Seville, Spain",
    url: null,
  },
  {
    date: "Jul 3, 2026",
    venue: "Lady Drama Rock Bar",
    city: "Seville, Spain",
    url: null,
  },
  {
    date: "Jul 15, 2026",
    venue: "Cafe La Palma",
    city: "Madrid, Spain",
    url: null,
  },
  {
    date: "Jul 24, 2026",
    venue: "Tina Turner Tribute",
    city: "Spain",
    url: null,
  },
  {
    date: "Aug 22, 2026",
    venue: "IO Originals y Tina Turner",
    city: "Extremadura, Spain",
    url: null,
  },
  {
    date: "Nov 6, 2026",
    venue: "TBA",
    city: "TBA",
    url: null,
  },
];

const navLinks = [
  { name: "Tour", href: "/tour" },
  { name: "Info", href: "/info" },
  { name: "Video", href: "/video" },
  { name: "Sign Up", href: "/signup" },
];

export default function TourPage() {
  return (
    <main style={{
      position: "fixed",
      top: 0, left: 0, right: 0, bottom: 0,
      width: "100vw",
      height: "100vh",
      overflow: "hidden",
    }}>
      {/* Background image */}
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

      {/* Top gradient */}
      <div style={{
        position: "absolute",
        top: 0, left: 0, right: 0,
        height: "120px",
        background: "linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, transparent 100%)",
        zIndex: 9,
      }} />

      {/* Nav */}
      <div style={{
        position: "absolute",
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

        {/* Show list */}
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
              {/* Date */}
              <div style={{
                color: "#c45c2e",
                fontSize: "0.85rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                fontWeight: "600",
                minWidth: "140px",
              }}>
                {show.date}
              </div>

              {/* Venue */}
              <div style={{
                color: "#f0e6d3",
                fontSize: "1rem",
                fontWeight: "500",
                flex: 1,
              }}>
                {show.venue}
              </div>

              {/* City */}
              <div style={{
                color: "rgba(240,230,211,0.6)",
                fontSize: "0.85rem",
                letterSpacing: "0.05em",
                minWidth: "160px",
              }}>
                {show.city}
              </div>

              {/* Ticket button */}
              <div style={{ minWidth: "120px", textAlign: "right" }}>
                {show.url ? (
                  
                <a    href={show.url}
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
                      transition: "all 0.2s",
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