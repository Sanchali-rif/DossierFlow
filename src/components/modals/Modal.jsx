import { T } from "../../constants/theme";

export default function Modal({ onClose, children }) {
  return (
    <div
      onClick={(e) => e.target === e.currentTarget && onClose()}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(30,30,30,0.55)",
        backdropFilter: "blur(2px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 50,
      }}
    >
      <div
        style={{
          background: T.panel,
          border: `1px solid ${T.line}`,
          borderRadius: 6,
          boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
          width: 460,
          maxWidth: "92vw",
          maxHeight: "86vh",
          overflowY: "auto",
          padding: 24,
        }}
      >
        {children}
      </div>
    </div>
  );
}

