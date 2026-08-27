import { useState } from "react";
import Modal from "./Modal";
import Btn from "../ui/Btn";
import { Field, inputStyle } from "../ui/Field";
import { fontSans, T } from "../../constants/theme";

export default function TimelineModal({ onClose, onSubmit }) {
  const [date, setDate] = useState("");
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  return (
    <Modal onClose={onClose}>
      <h3 style={{ fontFamily: fontSans, fontSize: 16, fontWeight: 600, color: T.ink, marginBottom: 16 }}>
        New Timeline Event
      </h3>
      <Field label="Date">
        <input type="date" style={inputStyle} value={date} onChange={(e) => setDate(e.target.value)} />
      </Field>
      <Field label="Title">
        <input
          style={inputStyle}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Company incorporated"
        />
      </Field>
      <Field label="Detail">
        <textarea
          style={{ ...inputStyle, minHeight: 64, resize: "vertical" }}
          value={detail}
          onChange={(e) => setDetail(e.target.value)}
          placeholder="Optional detail"
        />
      </Field>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 18 }}>
        <Btn variant="secondary" onClick={onClose}>
          Cancel
        </Btn>
        <Btn
          onClick={() =>
            title.trim() && onSubmit(date || new Date().toISOString().slice(0, 10), title.trim(), detail.trim())
          }
        >
          Add event
        </Btn>
      </div>
    </Modal>
  );
}

