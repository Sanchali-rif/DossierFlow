import { useState } from "react";
import Modal from "./Modal";
import Btn from "../ui/Btn";
import { Field, inputStyle } from "../ui/Field";
import { fontSans, T } from "../../constants/theme";

export default function NoteModal({ onClose, onSubmit }) {
  const [text, setText] = useState("");
  return (
    <Modal onClose={onClose}>
      <h3 style={{ fontFamily: fontSans, fontSize: 16, fontWeight: 600, color: T.ink, marginBottom: 16 }}>
        New Note
      </h3>
      <Field label="Note">
        <textarea
          style={{ ...inputStyle, minHeight: 100, resize: "vertical" }}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Observation, lead, question…"
        />
      </Field>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 18 }}>
        <Btn variant="secondary" onClick={onClose}>
          Cancel
        </Btn>
        <Btn onClick={() => text.trim() && onSubmit(text.trim())}>Add note</Btn>
      </div>
    </Modal>
  );
}

