import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect, memo, useCallback } from "react";

const stats = [
  { value: 500, suffix: "+", label: "Tələbə", icon: "🎨" },
  { value: 10, suffix: "+", label: "Sərgi", icon: "🖼️" },
  { value: 50, suffix: "+", label: "Uğur hekayəsi", icon: "⭐" },
  { value: 3, suffix: "", label: "Beynəlxalq səfər", icon: "✈️" },
];

const Counter = memo(({ target, suffix, inView }: { target: number; suffix: string; inView: boolean }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);
  return <>{count}{suffix}</>;
});

Counter.displayName = "Counter";

/* ── Floating paint particles drawn on canvas ── */
interface Particle {
  x: number; y: number; vx: number; vy: number;
  r: number; color: string; alpha: number; life: number; maxLife: number;
}

const COLORS = [
  "hsla(33, 89%, 51%,",   // primary orange
  "hsla(263, 87%, 55%,",  // purple
  "hsla(246, 96%, 30%,",  // deep navy-purple
  "hsla(33, 89%, 65%,",   // light orange
  "hsla(0, 0%, 100%,",    // white accent
];

const ParticleCanvas = memo(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const rafId = useRef(0);
  const mouseRef = useRef({ x: -1, y: -1 });

  const createParticle = useCallback((w: number, h: number): Particle => {
    const maxLife = 200 + Math.random() * 300;
    return {
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.4,
      vy: -0.2 - Math.random() * 0.5,
      r: 2 + Math.random() * 4,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      alpha: 0,
      life: 0,
      maxLife,
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let w = 0, h = 0;
    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (!rect) return;
      const dpr = Math.min(window.devicePixelRatio, 2);
      w = rect.width; h = rect.height;
      canvas.width = w * dpr; canvas.height = h * dpr;
      canvas.style.width = w + "px"; canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    // Seed particles
    const count = Math.min(60, Math.floor(w * h / 8000));
    particles.current = Array.from({ length: count }, () => {
      const p = createParticle(w, h);
      p.life = Math.random() * p.maxLife; // stagger start
      return p;
    });

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    canvas.addEventListener("mousemove", onMove, { passive: true });

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      for (const p of particles.current) {
        p.life++;
        if (p.life > p.maxLife) {
          Object.assign(p, createParticle(w, h));
          p.life = 0;
        }

        // fade in → sustain → fade out
        const progress = p.life / p.maxLife;
        p.alpha = progress < 0.1 ? progress / 0.1
          : progress > 0.8 ? (1 - progress) / 0.2
          : 1;
        p.alpha *= 0.55;

        // Gentle mouse repulsion
        if (mx >= 0) {
          const dx = p.x - mx, dy = p.y - my;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            const force = (120 - dist) / 120 * 0.3;
            p.vx += (dx / dist) * force;
            p.vy += (dy / dist) * force;
          }
        }

        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.99;
        p.vy *= 0.99;

        // Wrap around
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) { p.y = h + 10; }
        if (p.y > h + 10) p.y = -10;

        // Draw soft circle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color + p.alpha + ")";
        ctx.fill();

        // Glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = p.color + (p.alpha * 0.15) + ")";
        ctx.fill();
      }

      // Connecting lines between nearby particles
      const pts = particles.current;
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const dist = dx * dx + dy * dy;
          if (dist < 12000) {
            const alpha = (1 - dist / 12000) * 0.08 * Math.min(pts[i].alpha, pts[j].alpha);
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = `hsla(33, 89%, 51%, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      rafId.current = requestAnimationFrame(draw);
    };

    rafId.current = requestAnimationFrame(draw);

    window.addEventListener("resize", resize, { passive: true });
    return () => {
      cancelAnimationFrame(rafId.current);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", onMove);
    };
  }, [createParticle]);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0" />;
});

ParticleCanvas.displayName = "ParticleCanvas";

/* ── Floating brush stroke SVG shapes ── */
const FloatingStrokes = memo(() => (
  <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden" aria-hidden="true">
    {/* Large orange arc */}
    <motion.svg
      className="absolute -top-20 -right-20 w-[500px] h-[500px] opacity-[0.12]"
      viewBox="0 0 500 500" fill="none"
      animate={{ rotate: [0, 360] }}
      transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
    >
      <circle cx="250" cy="250" r="200" stroke="hsl(var(--primary))" strokeWidth="3" strokeDasharray="20 30" fill="none" />
      <circle cx="250" cy="250" r="160" stroke="hsl(var(--secondary))" strokeWidth="1.5" strokeDasharray="10 25" fill="none" />
    </motion.svg>

    {/* Small purple orbit */}
    <motion.svg
      className="absolute -bottom-10 -left-16 w-[350px] h-[350px] opacity-[0.10]"
      viewBox="0 0 350 350" fill="none"
      animate={{ rotate: [360, 0] }}
      transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
    >
      <circle cx="175" cy="175" r="140" stroke="hsl(var(--secondary))" strokeWidth="2" strokeDasharray="15 20" fill="none" />
    </motion.svg>

    {/* Floating paint blob — top left */}
    <motion.div
      className="absolute top-[15%] left-[8%] w-32 h-32 rounded-full bg-primary/[0.06] blur-2xl"
      animate={{ y: [-15, 15, -15], x: [-8, 8, -8], scale: [1, 1.15, 1] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
    />

    {/* Floating paint blob — bottom right */}
    <motion.div
      className="absolute bottom-[20%] right-[12%] w-40 h-40 rounded-full bg-secondary/[0.05] blur-3xl"
      animate={{ y: [10, -20, 10], x: [5, -10, 5], scale: [1.1, 0.95, 1.1] }}
      transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
    />

    {/* Diagonal brush stroke line */}
    <motion.div
      className="absolute top-1/2 left-0 right-0 h-px"
      style={{ background: "linear-gradient(90deg, transparent 0%, hsl(var(--primary) / 0.08) 30%, hsl(var(--primary) / 0.15) 50%, hsl(var(--primary) / 0.08) 70%, transparent 100%)" }}
      animate={{ opacity: [0.3, 0.7, 0.3] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    />
  </div>
));

FloatingStrokes.displayName = "FloatingStrokes";

const StatsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section ref={ref} className="relative -mt-20 overflow-hidden bg-accent py-32 md:-mt-28 md:py-44">
      {/* Top fade — seamless merge from Hero */}
      <div
        className="pointer-events-none absolute -top-1 left-0 right-0 z-20 h-40 md:h-56"
        style={{
          background:
            "linear-gradient(to bottom, hsl(var(--accent)) 0%, hsl(var(--accent) / 0.6) 40%, transparent 100%)",
        }}
      />
      {/* Bottom fade */}
      <div
        className="pointer-events-none absolute -bottom-1 left-0 right-0 z-20 h-72 md:h-96"
        style={{
          background:
            "linear-gradient(to top, hsl(var(--background)) 0%, hsl(var(--background) / 0.95) 10%, hsl(var(--background) / 0.7) 30%, hsl(var(--background) / 0.4) 50%, hsl(var(--background) / 0.15) 70%, hsl(var(--background) / 0.05) 85%, transparent 100%)",
        }}
      />

      {/* Animated background — lightweight canvas + CSS */}
      <motion.div
        className="absolute inset-0 z-0 -top-[10%] -bottom-[10%] will-change-transform"
        style={{ y: bgY }}
      >
        <ParticleCanvas />
        <FloatingStrokes />
      </motion.div>

      {/* Stats */}
      <div className="container relative z-10 mx-auto px-6">
        <div className="mx-auto grid max-w-4xl grid-cols-2 gap-12 md:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12, type: "spring", stiffness: 200 }}
              className="group text-center"
            >
              {/* Emoji icon */}
              <motion.span
                className="inline-block text-2xl mb-3 opacity-60"
                animate={inView ? { rotate: [0, -10, 10, 0] } : {}}
                transition={{ duration: 0.6, delay: 0.5 + i * 0.15 }}
              >
                {s.icon}
              </motion.span>
              <p className="font-display text-5xl font-bold text-primary-foreground md:text-6xl drop-shadow-lg">
                <Counter target={s.value} suffix={s.suffix} inView={inView} />
              </p>
              <p className="mt-2 font-body text-xs tracking-[0.2em] uppercase text-primary-foreground/70">
                {s.label}
              </p>
              {/* Underline accent */}
              <motion.div
                className="mx-auto mt-3 h-0.5 rounded-full bg-primary/40"
                initial={{ width: 0 }}
                animate={inView ? { width: 32 } : {}}
                transition={{ duration: 0.8, delay: 0.3 + i * 0.12 }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
