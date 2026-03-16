import Image from "next/image";
import Navbar from "../components/Navbar";
import ArtistBio from "../components/ArtistBio";

export default function InfoPage() {
  return (
    <main style={{
      minHeight: "100vh",
      width: "100%",
      background: "#0f0d0b",
      overflowY: "auto",
      fontFamily: "var(--font-cormorant)",
    }}>

      {/* Background image */}
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

      <div style={{
        position: "relative",
        zIndex: 5,
        padding: "140px 40px 80px",
        maxWidth: "1100px",
        margin: "0 auto",
      }}>
        <ArtistBio />
      </div>
    </main>
  );
}