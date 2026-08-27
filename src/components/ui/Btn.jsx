import { fontSans, T } from "../../constants/theme";

export default function Btn({ children, onClick, variant = "primary", style }) {
  const base = {
    fontFamily: fontSans,
    fontSize: 11,
    letterSpacing: "0.04em",

    border: "none",
    padding: "8px 14px",
    borderRadius: 3,
    cursor: "pointer",
    fontWeight: 600,
    textTransform: "uppercase",
    transition: "all 0.15s ease",
  };
  const variants = {
    primary: { background: "#1E1E1E", color: "#FFFFFF", border: "1px solid #1E1E1E" },
    secondary: { background: T.panel, color: T.ink, border: `1px solid ${T.line}` },
    danger: { background: "transparent", color: T.danger, border: `1px solid ${T.danger}` },
  };
  return (
    <button onClick={onClick} style={{ ...base, ...variants[variant], ...style }}>
      {children}
    </button>
  );
}

