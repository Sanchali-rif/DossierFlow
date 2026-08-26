import { useEffect, useRef } from "react";
import { T } from "../../constants/theme";

export default function BackgroundCanvas() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current; const ctx = canvas.getContext("2d"); let w, h, particles, raf; const COUNT = 46; const COLORS = [T.amber, T.teal, T.inkDim];
    function resize() { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; }
    function init() { resize(); particles = Array.from({ length: COUNT }, () => ({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - 0.5) * 0.18, vy: (Math.random() - 0.5) * 0.18, r: 1 + Math.random() * 1.6, color: COLORS[Math.floor(Math.random() * COLORS.length)] })); }
    function step() {
      ctx.clearRect(0, 0, w, h); for (const p of particles) { p.x += p.vx; p.y += p.vy; if (p.x < 0 || p.x > w) p.vx *= -1; if (p.y < 0 || p.y > h) p.vy *= -1; }
      const maxDist = 150; for (let i = 0; i < particles.length; i++) for (let j = i + 1; j < particles.length; j++) { const a = particles[i], b = particles[j]; const dx = a.x - b.x, dy = a.y - b.y; const dist = Math.sqrt(dx * dx + dy * dy); if (dist < maxDist) { ctx.strokeStyle = `rgba(168,98,74,${0.1 * (1 - dist / maxDist)})`; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); } }
      for (const p of particles) { ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fillStyle = p.color; ctx.globalAlpha = 0.35; ctx.fill(); ctx.globalAlpha = 1; } raf = requestAnimationFrame(step);
    }
    window.addEventListener("resize", resize); init(); raf = requestAnimationFrame(step); return () => { window.removeEventListener("resize", resize); cancelAnimationFrame(raf); };
  }, []);
  return <canvas ref={ref} style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }} />;
}
