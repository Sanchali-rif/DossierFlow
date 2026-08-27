import { useState } from "react";
import { fontSans } from "../../constants/theme";

export default function Legend({ color, label }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        marginBottom: 6,
        opacity: hovered ? 1 : 0.88,
        transition: "opacity 0.15s ease",
        cursor: "default",
      }}
    >
      <span
        style={{
          width: 12,
          height: 12,
          borderRadius: "50%",
          background: "rgba(250, 247, 242, 0.9)",
          border: `2px solid ${color}`,
          position: "relative",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          boxSizing: "border-box",
          flexShrink: 0,
          overflow: "hidden",
        }}
      >
        <span
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            background: color,
            opacity: 0.18,
          }}
        />
      </span>
      <span style={{ fontFamily: fontSans, fontSize: 12, fontWeight: 600, color: "#1E1E1E", letterSpacing: "0.01em" }}>
        {label}
      </span>
    </div>
  );
}



