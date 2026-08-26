import { fontMono, T } from "../../constants/theme";

export default function Btn({ children, onClick, variant = "primary", style }) {
  const base = { fontFamily: fontMono, fontSize: 11, letterSpacing: 0.3, border: "none", padding: "8px 14px", borderRadius: 3, cursor: "pointer", fontWeight: 600, textTransform: "uppercase" };
  const variants = { primary: { background: T.amber, color: "#fff8f5" }, secondary: { background: T.panel2, color: T.ink, border: `1px solid ${T.line}` }, danger: { background: "transparent", color: T.danger, border: `1px solid ${T.danger}` } };
  return <button onClick={onClick} style={{ ...base, ...variants[variant], ...style }}>{children}</button>;
}
