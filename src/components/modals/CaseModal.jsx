import { useState } from "react";
import Modal from "./Modal";
import Btn from "../ui/Btn";
import { Field, inputStyle } from "../ui/Field";
import { fontSans, T } from "../../constants/theme";

export default function CaseModal({ onClose, onSubmit }) {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  return (
    <Modal onClose={onClose}>
      <h3 style={{ fontFamily: fontSans, fontSize: 16, fontWeight: 600, color: T.ink, marginBottom: 16 }}>
        New Research Case
      </h3>
      <Field label="Case name">
        <input
          style={inputStyle}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Supply chain audit — Northline Corp"
        />
      </Field>
      <Field label="Description">
        <textarea
          style={{ ...inputStyle, minHeight: 64, resize: "vertical" }}
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          placeholder="What are you investigating?"
        />
      </Field>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 18 }}>
        <Btn variant="secondary" onClick={onClose}>
          Cancel
        </Btn>
        <Btn onClick={() => name.trim() && onSubmit(name.trim(), desc.trim())}>Create case</Btn>
      </div>
    </Modal>
  );
}

