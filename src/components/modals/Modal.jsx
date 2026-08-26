import { T } from "../../constants/theme";

export default function Modal({ onClose, children }) { return <div onClick={(e) => e.target === e.currentTarget && onClose()} style={{ position: "fixed", inset: 0, background: "rgba(8,10,14,0.7)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 50 }}><div style={{ background: T.panel, border: `1px solid ${T.line}`, borderRadius: 4, width: 440, maxWidth: "92vw", maxHeight: "86vh", overflowY: "auto", padding: 22 }}>{children}</div></div>; }
