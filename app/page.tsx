import Image from "next/image";
import Navbar from "./components/Navbar";

export default function Home() {
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
        alt="iothesinger"
        fill
        priority
        style={{ objectFit: "cover", objectPosition: "center 25%" }}
      />

      <div style={{
        position: "absolute",
        inset: 0,
        background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.05) 50%, transparent 100%)",
      }} />

      <Navbar />
    </main>
  );
}