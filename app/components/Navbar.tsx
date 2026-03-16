"use client";

import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { name: "Tour", href: "/tour" },
  { name: "Info", href: "/info" },
  { name: "Video", href: "/video" },
  { name: "Sign Up", href: "/signup" },
];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Top gradient */}
      <div style={{
        position: "fixed",
        top: 0, left: 0, right: 0,
        height: "120px",
        background: "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, transparent 100%)",
        zIndex: 9,
        pointerEvents: "none",
      }} />

      {/* Nav bar */}
      <div style={{
        position: "fixed",
        top: 0, left: 0, right: 0,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "24px 40px",
        zIndex: 20,
      }}>

        {/* Logo */}
        <Link href="/" style={{
          fontFamily: "var(--font-playfair)",
          color: "#f0e6d3",
          fontSize: "2rem",
          fontWeight: "900",
          letterSpacing: "-0.04em",
          textTransform: "uppercase",
          textDecoration: "none",
          lineHeight: 1,
        }}>
          iothesinger
        </Link>

        {/* Desktop nav */}
        <nav style={{
          display: "flex",
          gap: "28px",
          alignItems: "center",
        }}
          className="desktop-nav"
        >
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

        {/* Hamburger — mobile only */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="hamburger"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            display: "none",
            flexDirection: "column",
            gap: "5px",
            padding: "4px",
          }}
          aria-label="Menu"
        >
          <span style={{
            display: "block",
            width: "24px",
            height: "2px",
            background: "#f0e6d3",
            transition: "all 0.3s",
            transform: menuOpen ? "rotate(45deg) translate(5px, 5px)" : "none",
          }} />
          <span style={{
            display: "block",
            width: "24px",
            height: "2px",
            background: "#f0e6d3",
            transition: "all 0.3s",
            opacity: menuOpen ? 0 : 1,
          }} />
          <span style={{
            display: "block",
            width: "24px",
            height: "2px",
            background: "#f0e6d3",
            transition: "all 0.3s",
            transform: menuOpen ? "rotate(-45deg) translate(5px, -5px)" : "none",
          }} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          position: "fixed",
          top: 0, left: 0, right: 0, bottom: 0,
          background: "rgba(10,8,6,0.97)",
          zIndex: 19,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "40px",
        }}>
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                color: "#f0e6d3",
                textDecoration: "none",
                fontSize: "2.5rem",
                fontFamily: "var(--font-playfair)",
                fontWeight: "900",
                letterSpacing: "-0.02em",
                textTransform: "uppercase",
              }}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }
          .hamburger {
            display: flex !important;
          }
        }
      `}</style>
    </>
  );
}

export default Navbar;