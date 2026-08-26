import { T } from "../../constants/theme";

export default function Card({ children }) { return <div style={{ background: T.panel, border: `1px solid ${T.line}`, borderRadius: 3, padding: "14px 16px", marginBottom: 10 }}>{children}</div>; }
