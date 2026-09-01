import { useEffect, useState } from "react";
import logoSrc from "../../assets/logo.svg";

export default function LoadingScreen({ onDone }) {
  const [phase, setPhase] = useState("enter");

  useEffect(() => {
    const holdTimer = setTimeout(() => setPhase("exit"), 1800);
    return () => clearTimeout(holdTimer);
  }, []);

  useEffect(() => {
    if (phase !== "exit") return;
    const doneTimer = setTimeout(onDone, 600);
    return () => clearTimeout(doneTimer);
  }, [phase, onDone]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#fff",
        opacity: phase === "exit" ? 0 : 1,
        transition: phase === "exit" ? "opacity 0.6s ease" : "none",
        pointerEvents: "none",
      }}
    >
      <div style={{ animation: "df-logo-pop 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) forwards" }}>
        <img src={logoSrc} alt="DossierFlow" style={{ width: 72, height: 72, display: "block" }} />
      </div>

      <div
        style={{
          marginTop: 20,
          fontFamily: "var(--font-sans, sans-serif)",
          fontSize: 22,
          fontWeight: 700,
          letterSpacing: "0.06em",
          color: "#111827",
          animation: "df-fade-up 0.6s 0.3s ease both",
        }}
      >
        DossierFlow
      </div>

      <div
        style={{
          marginTop: 6,
          fontFamily: "var(--font-sans, sans-serif)",
          fontSize: 13,
          color: "var(--text)",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          animation: "df-fade-up 0.6s 0.5s ease both",
        }}
      >
        Investigation Intelligence
      </div>

      <div style={{ marginTop: 36, display: "flex", gap: 8, animation: "df-fade-up 0.6s 0.7s ease both" }}>
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: "var(--accent)",
              display: "inline-block",
              animation: `df-bounce 1.1s ${i * 0.18}s ease-in-out infinite`,
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes df-logo-pop {
          from { opacity: 0; transform: scale(0.6) rotate(-8deg); }
          to   { opacity: 1; transform: scale(1) rotate(0deg); }
        }
        @keyframes df-fade-up {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes df-bounce {
          0%, 80%, 100% { transform: translateY(0);   opacity: 0.35; }
          40%            { transform: translateY(-8px); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
