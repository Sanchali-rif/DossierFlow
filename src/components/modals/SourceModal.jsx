import { useState } from "react";
import Modal from "./Modal";
import Btn from "../ui/Btn";
import { Field, inputStyle } from "../ui/Field";
import { fontSans, T } from "../../constants/theme";

export default function SourceModal({ onClose, onSubmit }) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [note, setNote] = useState("");

  return (
    <Modal onClose={onClose}>
      <h3 style={{ fontFamily: fontSans, fontSize: 16, fontWeight: 600, color: T.ink, marginBottom: 16 }}>
        New Source
      </h3>
      <Field label="Title">
        <input
          style={inputStyle}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Companies House filing"
        />
      </Field>
      <Field label="URL">
        <input
          style={inputStyle}
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://…"
        />
      </Field>
      <Field label="Note">
        <textarea
          style={{ ...inputStyle, minHeight: 64, resize: "vertical" }}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="What does this source establish?"
        />
      </Field>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 18 }}>
        <Btn variant="secondary" onClick={onClose}>
          Cancel
        </Btn>
        <Btn onClick={() => title.trim() && onSubmit(title.trim(), url.trim(), note.trim())}>Add source</Btn>
      </div>
    </Modal>
  );
}

