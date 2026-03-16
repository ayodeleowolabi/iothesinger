"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const navLinks = [
  { name: "Tour", href: "/tour" },
  { name: "Store", href: "/store" },
  { name: "Info", href: "/info" },
  { name: "Video", href: "/video" },
  { name: "Sign Up", href: "/signup" },
];

const cities = ["DC", "NYC", "Atlanta", "Madrid", "London", "Paris", "Amsterdam"];

const FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLScPhiJ_NWz5kgkowPUS8jIhtU8Akjeog0giH9BzUEAwbtBW5w/formResponse";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [city, setCity] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cityOpen, setCityOpen] = useState(false);

  const handleSubmit = async () => {
    if (!email) return;
    setLoading(true);

    const body = new FormData();
    body.append("entry.1290756164", email);
    body.append("entry.1771943854", firstName);
    body.append("entry.1586619356", city);

    try {
      await fetch(FORM_URL, {
        method: "POST",
        mode: "no-cors",
        body,
      });
    } catch (_) {
      // no-cors will always throw — that's expected
    }

    setSubmitted(true);
    setLoading(false);
  };

  const inputStyle = {
    width: "100%",
    background: "rgba(240,230,211,0.06)",
    border: "1px solid rgba(240,230,211,0.2)",
    color: "#f0e6d3",
    padding: "16px 20px",
    fontSize: "1.1rem",
    fontFamily: "var(--font-cormorant)",
    outline: "none",
    boxSizing: "border-box" as const,
  };

  const labelStyle = {
    display: "block",
    color: "rgba(240,230,211,0.5)",
    fontSize: "0.7rem",
    letterSpacing: "0.15em",
    textTransform: "uppercase" as const,
    marginBottom: "8px",
    fontFamily: "var(--font-cormorant)",
  };

  return (
    <main style={{
      minHeight: "100vh",
      width: "100%",
      background: "#0f0d0b",
      overflowY: "auto",
      fontFamily: "var(--font-cormorant)",
    }}>

      {/* Background */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0, opacity: 0.12 }}>
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
                fontFamily: "var(--font-cormorant)",
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
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "120px 40px 80px",
      }}>
        <div style={{ width: "100%", maxWidth: "560px" }}>

          <p style={{
            color: "rgba(240,230,211,0.5)",
            fontSize: "0.85rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            marginBottom: "12px",
          }}>
            iothesinger
          </p>

          <h1 style={{
            fontFamily: "var(--font-playfair)",
            color: "#f0e6d3",
            fontSize: "3.5rem",
            fontWeight: "900",
            lineHeight: 1.1,
            marginBottom: "20px",
            letterSpacing: "-0.02em",
          }}>
            Stay close.<br />
            Severed is coming.
          </h1>

          <p style={{
            color: "rgba(240,230,211,0.65)",
            fontSize: "1.15rem",
            lineHeight: 1.7,
            marginBottom: "48px",
          }}>
            Be the first to hear about the album drop, shows near you, and moments you won't want to miss.
          </p>

          {submitted ? (
            <div style={{
              textAlign: "center",
              padding: "48px 0",
            }}>
              <p style={{
                fontFamily: "var(--font-playfair)",
                color: "#f0e6d3",
                fontSize: "2rem",
                fontWeight: "900",
                marginBottom: "16px",
              }}>
                You're in.
              </p>
              <p style={{
                color: "rgba(240,230,211,0.6)",
                fontSize: "1.1rem",
              }}>
                Welcome to the inner circle. See you at the show.
              </p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>

              {/* Email */}
              <div>
                <label style={labelStyle}>Email Address *</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  style={inputStyle}
                />
              </div>

              {/* First Name */}
              <div>
                <label style={labelStyle}>First Name</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Your name"
                  style={inputStyle}
                />
              </div>

              {/* City */}
            {/* City */}
<div style={{ position: "relative" }}>
  <label style={labelStyle}>Nearest Major City</label>
  <button
    onClick={() => setCityOpen(!cityOpen)}
    style={{
      ...inputStyle,
      width: "100%",
      textAlign: "left",
      cursor: "pointer",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      color: city ? "#f0e6d3" : "rgba(240,230,211,0.35)",
    }}
  >
    <span>{city || "— select your city —"}</span>
    <span style={{ fontSize: "0.7rem", opacity: 0.6 }}>{cityOpen ? "▲" : "▼"}</span>
  </button>

  {cityOpen && (
    <div style={{
      position: "absolute",
      top: "100%",
      left: 0,
      right: 0,
      background: "#1a1209",
      border: "1px solid rgba(240,230,211,0.2)",
      borderTop: "none",
      zIndex: 20,
    }}>
      {cities.map((c) => (
        <button
          key={c}
          onClick={() => { setCity(c); setCityOpen(false); }}
          style={{
            display: "block",
            width: "100%",
            textAlign: "left",
            padding: "14px 20px",
            background: city === c ? "rgba(196,92,46,0.2)" : "transparent",
            color: city === c ? "#c45c2e" : "rgba(240,230,211,0.8)",
            border: "none",
            borderBottom: "1px solid rgba(240,230,211,0.08)",
            fontSize: "1.1rem",
            fontFamily: "var(--font-cormorant)",
            cursor: "pointer",
            letterSpacing: "0.05em",
          }}
        >
          {c}
        </button>
      ))}
    </div>
  )}
</div>

              {/* Submit */}
              <button
                onClick={handleSubmit}
                disabled={loading || !email}
                style={{
                  background: email ? "#c45c2e" : "rgba(196,92,46,0.4)",
                  color: "white",
                  border: "none",
                  padding: "18px 32px",
                  fontSize: "0.85rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  cursor: email ? "pointer" : "not-allowed",
                  fontFamily: "var(--font-cormorant)",
                  fontWeight: "600",
                  transition: "background 0.2s",
                }}
              >
                {loading ? "Joining..." : "Join the List"}
              </button>

              <p style={{
                color: "rgba(240,230,211,0.3)",
                fontSize: "0.85rem",
                letterSpacing: "0.05em",
                textAlign: "center",
              }}>
                No spam. No selling your info. Just IO.
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}