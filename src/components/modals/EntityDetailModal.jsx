import Modal from "./Modal";
import Btn from "../ui/Btn";
import { Field } from "../ui/Field";
import { fontDisplay, fontMono, T, CategoryColors } from "../../constants/theme";

export default function EntityDetailModal({ entity, relations, entities, sources, onClose, onDelete }) {
  const rels = relations.filter((r) => r.from === entity.id || r.to === entity.id);
  const cat = CategoryColors[entity.type] || CategoryColors.other;

  return (
    <Modal onClose={onClose}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <h3 style={{ fontFamily: fontDisplay, fontSize: 16, color: T.ink, margin: 0 }}>{entity.name}</h3>
        <span
          style={{
            fontFamily: fontMono,
            fontSize: 10,
            fontWeight: 700,
            textTransform: "uppercase",
            padding: "3px 8px",
            borderRadius: 3,
            background: cat.bgLight,
            color: cat.main,
            border: `1px solid ${cat.border}`,
          }}
        >
          {cat.label}
        </span>
      </div>
      <Field label="Note">
        <div style={{ fontSize: 13, color: T.inkDim, lineHeight: 1.5 }}>{entity.note || "No context added."}</div>
      </Field>
      <Field label={`Relationships (${rels.length})`}>
        {rels.length === 0 ? (
          <div style={{ fontSize: 12, color: T.inkDim }}>No linked entities</div>
        ) : (
          rels.map((r) => {
            const other = entities.find((e) => e.id === (r.from === entity.id ? r.to : r.from));
            const src = sources.find((s) => s.id === r.sourceId);
            return (
              <div key={r.id} style={{ fontSize: 12.5, color: T.ink, padding: "8px 0", borderBottom: `1px solid ${T.line}` }}>
                <span style={{ color: T.inkDim, marginRight: 4 }}>{r.label}</span> →{" "}
                <strong style={{ color: T.ink }}>{other ? other.name : "?"}</strong>
                {src && (
                  <div style={{ fontFamily: fontMono, fontSize: 10, color: CategoryColors.organization.main, marginTop: 3 }}>
                    source: {src.title}
                  </div>
                )}
              </div>
            );
          })
        )}
      </Field>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 18 }}>
        {onDelete ? (
          <button
            onClick={() => { onDelete(entity.id); onClose(); }}
            style={{
              background: "transparent",
              border: "1px solid #C0392B",
              color: "#C0392B",
              borderRadius: 3,
              padding: "6px 12px",
              fontSize: 12,
              fontWeight: 600,
              cursor: "pointer",
              letterSpacing: "0.04em",
            }}
          >
            Delete entity
          </button>
        ) : <span />}
        <Btn variant="secondary" onClick={onClose}>
          Close
        </Btn>
      </div>
    </Modal>
  );
}

