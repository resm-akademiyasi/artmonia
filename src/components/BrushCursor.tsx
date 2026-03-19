import { useEffect, useRef, useCallback } from "react";

const TRAIL_LENGTH = 20;
const COLORS = [
  "hsla(33, 89%, 51%,",   // orange
  "hsla(263, 87%, 55%,",  // purple
  "hsla(33, 89%, 65%,",   // light orange
];

interface TrailPoint {
  x: number;
  y: number;
}

const BrushCursor = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<TrailPoint>({ x: -100, y: -100 });
  const trailRef = useRef<TrailPoint[]>([]);
  const rafRef = useRef(0);
  const isMovingRef = useRef(false);
  const fadeRef = useRef(0);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio, 2);
    const w = window.innerWidth;
    const h = window.innerHeight;

    if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    ctx.clearRect(0, 0, w, h);

    const trail = trailRef.current;
    const mouse = mouseRef.current;

    // Smoothly follow mouse
    if (trail.length === 0) {
      trail.push({ x: mouse.x, y: mouse.y });
    }

    // Add new point at head
    const head = trail[0];
    const dx = mouse.x - head.x;
    const dy = mouse.y - head.y;
    const speed = Math.sqrt(dx * dx + dy * dy);

    // Smooth interpolation for head
    const newHead = {
      x: head.x + dx * 0.35,
      y: head.y + dy * 0.35,
    };

    trail.unshift(newHead);
    if (trail.length > TRAIL_LENGTH) trail.pop();

    // Each subsequent point follows the one before it
    for (let i = 1; i < trail.length; i++) {
      const prev = trail[i - 1];
      const curr = trail[i];
      curr.x += (prev.x - curr.x) * 0.28;
      curr.y += (prev.y - curr.y) * 0.28;
    }

    // Fade control
    if (speed > 1) {
      isMovingRef.current = true;
      fadeRef.current = Math.min(fadeRef.current + 0.08, 1);
    } else {
      isMovingRef.current = false;
      fadeRef.current = Math.max(fadeRef.current - 0.03, 0);
    }

    const globalAlpha = fadeRef.current;
    if (globalAlpha < 0.01) {
      rafRef.current = requestAnimationFrame(draw);
      return;
    }

    // Draw trail
    for (let i = 0; i < trail.length; i++) {
      const t = i / trail.length; // 0 = head, 1 = tail
      const size = (1 - t) * 8 + 1;
      const alpha = (1 - t * t) * 0.6 * globalAlpha;

      if (alpha < 0.01) continue;

      const color = COLORS[i % COLORS.length];
      const p = trail[i];

      // Main dot
      ctx.beginPath();
      ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
      ctx.fillStyle = color + alpha + ")";
      ctx.fill();

      // Soft glow
      ctx.beginPath();
      ctx.arc(p.x, p.y, size * 2.5, 0, Math.PI * 2);
      ctx.fillStyle = color + (alpha * 0.15) + ")";
      ctx.fill();
    }

    // Connecting line through trail
    if (trail.length > 2) {
      ctx.beginPath();
      ctx.moveTo(trail[0].x, trail[0].y);
      for (let i = 1; i < trail.length - 1; i++) {
        const xc = (trail[i].x + trail[i + 1].x) / 2;
        const yc = (trail[i].y + trail[i + 1].y) / 2;
        ctx.quadraticCurveTo(trail[i].x, trail[i].y, xc, yc);
      }
      ctx.strokeStyle = `hsla(33, 89%, 51%, ${0.12 * globalAlpha})`;
      ctx.lineWidth = 2;
      ctx.stroke();
    }

    // Main cursor dot (bright)
    ctx.beginPath();
    ctx.arc(newHead.x, newHead.y, 4, 0, Math.PI * 2);
    ctx.fillStyle = `hsla(33, 89%, 51%, ${0.9 * globalAlpha})`;
    ctx.fill();

    // Outer ring
    ctx.beginPath();
    ctx.arc(newHead.x, newHead.y, 12, 0, Math.PI * 2);
    ctx.strokeStyle = `hsla(33, 89%, 51%, ${0.25 * globalAlpha})`;
    ctx.lineWidth = 1;
    ctx.stroke();

    rafRef.current = requestAnimationFrame(draw);
  }, []);

  useEffect(() => {
    if ("ontouchstart" in window) return;

    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    document.addEventListener("mousemove", onMove, { passive: true });
    rafRef.current = requestAnimationFrame(draw);

    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, [draw]);

  if (typeof window !== "undefined" && "ontouchstart" in window) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 99999, willChange: "transform" }}
    />
  );
};

export default BrushCursor;
