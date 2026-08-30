import { useState } from "react";
import { T } from "../../constants/theme";

export default function Card({ children, onDelete }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ position: "relative", background: T.panel, border: `1px solid ${T.line}`, borderRadius: 3, padding: "14px 16px", marginBottom: 10 }}
    >
      {children}
      {onDelete && (
        <button
          onClick={onDelete}
          title="Delete"
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.15s ease",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            padding: 3,
            color: "#C0392B",
            lineHeight: 1,
            fontSize: 14,
          }}
        >
          ✕
        </button>
      )}
    </div>
  );
}
