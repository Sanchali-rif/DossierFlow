import { fontMono, T } from "../../constants/theme";

export default function Legend({ color, label }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
      <span style={{ width: 10, height: 10, borderRadius: "50%", background: color, border: `1px solid rgba(0,0,0,0.15)`, display: "inline-block", flexShrink: 0 }} />
      <span style={{ fontFamily: fontMono, fontSize: 11, fontWeight: 500, letterSpacing: "0.02em", color: T.ink }}>{label}</span>
    </div>
  );
}


