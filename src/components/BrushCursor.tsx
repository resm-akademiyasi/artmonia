import { useEffect, useRef, useCallback } from "react";

/**
 * Antigravity-style confetti cursor effect.
 * Colorful dashes/dots scatter outward from the cursor path as you move,
 * then slowly drift and fade away.
 */

const PARTICLE_COLORS = [
  "#F28E14", // orange (brand)
  "#6929F2", // purple (brand)
  "#3B82F6", // blue
  "#EF4444", // red
  "#10B981", // green
  "#F59E0B", // amber
  "#8B5CF6", // violet
  "#EC4899", // pink
];

interface ConfettiParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  rotationSpeed: number;
  width: number;
  height: number;
  color: string;
  alpha: number;
  life: number;
  maxLife: number;
  shape: "dash" | "dot" | "square";
}

const BrushCursor = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<ConfettiParticle[]>([]);
  const mouseRef = useRef({ x: -200, y: -200 });
  const prevMouseRef = useRef({ x: -200, y: -200 });
  const rafRef = useRef(0);
  const spawnAccum = useRef(0);

  const spawnParticle = useCallback((x: number, y: number, speed: number) => {
    const angle = Math.random() * Math.PI * 2;
    const force = 0.5 + Math.random() * 1.5 + speed * 0.02;
    const shapes: ConfettiParticle["shape"][] = ["dash", "dash", "dot", "square"];
    const maxLife = 80 + Math.random() * 100;

    return {
      x,
      y,
      vx: Math.cos(angle) * force,
      vy: Math.sin(angle) * force - 0.3,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.08,
      width: 3 + Math.random() * 6,
      height: 1.5 + Math.random() * 2,
      color: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
      alpha: 0.7 + Math.random() * 0.3,
      life: 0,
      maxLife,
      shape: shapes[Math.floor(Math.random() * shapes.length)],
    } satisfies ConfettiParticle;
  }, []);

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

    const mx = mouseRef.current.x;
    const my = mouseRef.current.y;
    const pmx = prevMouseRef.current.x;
    const pmy = prevMouseRef.current.y;

    const dx = mx - pmx;
    const dy = my - pmy;
    const speed = Math.sqrt(dx * dx + dy * dy);

    // Spawn particles based on movement speed
    if (speed > 2) {
      spawnAccum.current += Math.min(speed * 0.3, 4);
      while (spawnAccum.current >= 1) {
        const t = Math.random();
        const sx = pmx + dx * t + (Math.random() - 0.5) * 10;
        const sy = pmy + dy * t + (Math.random() - 0.5) * 10;
        particles.current.push(spawnParticle(sx, sy, speed));
        spawnAccum.current -= 1;
      }
    }

    prevMouseRef.current = { x: mx, y: my };

    // Update & draw particles
    const alive: ConfettiParticle[] = [];
    for (const p of particles.current) {
      p.life++;
      if (p.life > p.maxLife) continue;

      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.01; // very gentle gravity
      p.vx *= 0.995;
      p.vy *= 0.995;
      p.rotation += p.rotationSpeed;

      // Fade: quick fade-in, long sustain, fade-out
      const progress = p.life / p.maxLife;
      let alpha: number;
      if (progress < 0.05) {
        alpha = progress / 0.05;
      } else if (progress > 0.6) {
        alpha = (1 - progress) / 0.4;
      } else {
        alpha = 1;
      }
      alpha *= p.alpha;

      if (alpha < 0.01) continue;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.globalAlpha = alpha;

      if (p.shape === "dash") {
        // Short colored dash/line
        ctx.beginPath();
        ctx.roundRect(-p.width / 2, -p.height / 2, p.width, p.height, 1);
        ctx.fillStyle = p.color;
        ctx.fill();
      } else if (p.shape === "dot") {
        ctx.beginPath();
        ctx.arc(0, 0, p.height, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      } else {
        // small square
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.height, -p.height, p.height * 2, p.height * 2);
      }

      ctx.restore();
      alive.push(p);
    }

    // Cap max particles
    particles.current = alive.length > 300 ? alive.slice(-300) : alive;

    rafRef.current = requestAnimationFrame(draw);
  }, [spawnParticle]);

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
      style={{ zIndex: 99998, willChange: "transform" }}
    />
  );
};

export default BrushCursor;
