import { useState } from "react";
import { fontSans, T } from "../../constants/theme";

export default function Btn({ children, onClick, variant = "primary", style }) {
  const [hovered, setHovered] = useState(false);

  const base = {
    fontFamily: fontSans,
    fontSize: 11.5,
    letterSpacing: "0.04em",
    border: "1px solid transparent",
    padding: "8px 14px",
    borderRadius: 6,
    cursor: "pointer",
    fontWeight: 600,
    textTransform: "uppercase",
    transition: "all 0.15s ease",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    userSelect: "none",
  };

  const variants = {
    primary: {
      background: hovered ? "#2E2E2E" : "#1E1E1E",
      color: "#FAF7F2",
      border: "1px solid #1E1E1E",
      boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
    },
    secondary: {
      background: hovered ? "#EFE9DF" : "#FAF7F2",
      color: "#1E1E1E",
      border: "1px solid #D5CCC0",
      boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
    },
    danger: {
      background: hovered ? "rgba(181, 54, 73, 0.08)" : "transparent",
      color: T.danger,
      border: `1px solid ${T.danger}`,
    },
  };

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ ...base, ...variants[variant], ...style }}
    >
      {children}
    </button>
  );
}


