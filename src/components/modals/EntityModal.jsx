import { useState } from "react";
import Modal from "./Modal";
import Btn from "../ui/Btn";
import { Field, inputStyle } from "../ui/Field";
import { fontDisplay, T } from "../../constants/theme";

export default function EntityModal({ onClose, onSubmit }) {
  const [name, setName] = useState("");
  const [type, setType] = useState("person");
  const [note, setNote] = useState("");

  return (
    <Modal onClose={onClose}>
      <h3 style={{ fontFamily: fontDisplay, fontSize: 16, color: T.ink, marginBottom: 16 }}>New Entity</h3>
      <Field label="Name">
        <input
          style={inputStyle}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Jane Doe / Riverbend Holdings"
        />
      </Field>
      <Field label="Category Type">
        <select style={inputStyle} value={type} onChange={(e) => setType(e.target.value)}>
          <option value="person">Person (Coral / Warm Amber)</option>
          <option value="organization">Organization (Slate Blue)</option>
          <option value="other">Other (Emerald / Muted Forest)</option>
        </select>
      </Field>
      <Field label="Note">
        <textarea
          style={{ ...inputStyle, minHeight: 64, resize: "vertical" }}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Optional context or description"
        />
      </Field>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 18 }}>
        <Btn variant="secondary" onClick={onClose}>
          Cancel
        </Btn>
        <Btn onClick={() => name.trim() && onSubmit(name.trim(), type, note.trim())}>Add Entity</Btn>
      </div>
    </Modal>
  );
}

