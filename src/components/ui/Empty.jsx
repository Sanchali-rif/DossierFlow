import { fontMono, T } from "../../constants/theme";

export default function Empty({ text }) { return <div style={{ color: T.inkDim, fontSize: 13, padding: "40px 0", textAlign: "center", fontFamily: fontMono }}>{text}</div>; }
