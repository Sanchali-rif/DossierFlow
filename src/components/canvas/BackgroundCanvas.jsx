import { useEffect, useRef } from "react";
import { T } from "../../constants/theme";

export default function BackgroundCanvas() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let w, h;
    const SPACING = 24;
    const DOT_RADIUS = 0.75;
    const DOT_COLOR = "rgba(45, 35, 35, 0.15)";


    function draw() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = T.bg;
      ctx.fillRect(0, 0, w, h);

      ctx.fillStyle = DOT_COLOR;
      for (let x = SPACING / 2; x < w; x += SPACING) {
        for (let y = SPACING / 2; y < h; y += SPACING) {
          ctx.beginPath();
          ctx.arc(x, y, DOT_RADIUS, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    window.addEventListener("resize", draw);
    draw();
    return () => window.removeEventListener("resize", draw);
  }, []);

  return (
    <canvas
      ref={ref}
      style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}
    />
  );
}

