import { fontMono, fontSans, T } from "../../constants/theme";

export function Field({ label, children }) {
  return <div style={{ marginBottom: 14 }}><label style={{ display: "block", fontFamily: fontMono, fontSize: 10, textTransform: "uppercase", letterSpacing: 0.5, color: T.inkDim, marginBottom: 6 }}>{label}</label>{children}</div>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const inputStyle = { width: "100%", background: T.bg, border: `1px solid ${T.line}`, color: T.ink, padding: "9px 10px", borderRadius: 3, fontFamily: fontSans, fontSize: 13 };
