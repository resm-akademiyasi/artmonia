import { motion, useInView, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useRef, useState } from "react";
import { Target, TrendingUp, Users, Award } from "lucide-react";

const promises = [
  { icon: Target, title: "Sistem var", desc: "Hər addım planlaşdırılıb — təsadüfi yox, ölçülən inkişaf." },
  { icon: TrendingUp, title: "Nəticə görünür", desc: "Həftəlik tapşırıqlar + feedback = real progress." },
  { icon: Users, title: "Mentor dəstəyi", desc: "Peşəkar rəssamlardan birbaşa rəy alırsan." },
  { icon: Award, title: "Portfolyo qurulur", desc: "Kurs sonunda göstərə biləcəyin işlər olur." },
];

// Longer, more organic brush stroke paths with variation
const brushStrokes = [
  // Top edge - thick sweeping stroke
  `M 2 12 C 15 3, 40 8, 70 5 S 120 10, 160 4 S 220 9, 260 6 S 285 3, 298 10`,
  // Right edge - dripping downward
  `M 292 6 C 297 20, 290 50, 295 80 S 288 130, 293 170 S 296 220, 290 260 S 295 280, 292 296`,
  // Bottom edge - rough sweep
  `M 296 290 C 280 298, 250 288, 210 295 S 150 290, 110 296 S 60 288, 30 294 S 10 298, 4 292`,
  // Left edge - organic crawl
  `M 8 296 C 3 275, 10 245, 5 210 S 8 170, 4 130 S 10 80, 6 50 S 3 25, 8 6`,
];

const PromiseCard = ({
  p,
  index,
  inView,
}: {
  p: (typeof promises)[0];
  index: number;
  inView: boolean;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-6, 6]), { stiffness: 200, damping: 20 });
  const cardScale = useSpring(hovered ? 1.02 : 1, { stiffness: 300, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    mx.set(0);
    my.set(0);
  };

  const Icon = p.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
      style={{ perspective: 800 }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, scale: cardScale, transformStyle: "preserve-3d" }}
        className="group relative rounded-xl border border-border bg-background p-8 text-left transition-shadow hover:shadow-lg cursor-pointer overflow-visible"
      >
        {/* Brush stroke SVG borders */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 300 300"
          preserveAspectRatio="none"
          fill="none"
          style={{ overflow: "visible" }}
        >
          {brushStrokes.map((d, i) => (
            <motion.path
              key={i}
              d={d}
              stroke="hsl(var(--primary))"
              strokeWidth={hovered ? 3 : 0}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: hovered ? 1 : 0,
                opacity: hovered ? 0.7 : 0,
              }}
              transition={{
                pathLength: { duration: 0.4, delay: i * 0.08 },
                opacity: { duration: 0.2, delay: i * 0.08 },
              }}
              style={{
                filter: "url(#brush-texture)",
              }}
            />
          ))}
          {/* Extra decorative splatter strokes */}
          <motion.path
            d="M 20 20 Q 30 10 50 18 Q 70 6 80 15"
            stroke="hsl(var(--secondary))"
            strokeWidth={hovered ? 2 : 0}
            strokeLinecap="round"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: hovered ? 1 : 0,
              opacity: hovered ? 0.4 : 0,
            }}
            transition={{ duration: 0.5, delay: 0.3 }}
          />
          <motion.path
            d="M 220 280 Q 240 290 260 282 Q 275 292 285 285"
            stroke="hsl(var(--secondary))"
            strokeWidth={hovered ? 2 : 0}
            strokeLinecap="round"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: hovered ? 1 : 0,
              opacity: hovered ? 0.4 : 0,
            }}
            transition={{ duration: 0.5, delay: 0.35 }}
          />
          <defs>
            <filter id="brush-texture">
              <feTurbulence type="turbulence" baseFrequency="0.04" numOctaves="4" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" xChannelSelector="R" yChannelSelector="G" />
            </filter>
          </defs>
        </svg>

        {/* Glare */}
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-xl"
          style={{
            background: useTransform(
              mx,
              [-0.5, 0, 0.5],
              [
                "linear-gradient(105deg, rgba(255,255,255,0.08) 0%, transparent 50%)",
                "linear-gradient(105deg, transparent 0%, transparent 100%)",
                "linear-gradient(255deg, rgba(255,255,255,0.08) 0%, transparent 50%)",
              ]
            ),
          }}
        />

        <motion.div
          className="relative mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10"
          animate={{ rotate: hovered ? 5 : 0 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Icon className="h-5 w-5 text-primary" />
        </motion.div>
        <h3 className="relative mb-2 font-display text-2xl font-semibold text-accent">{p.title}</h3>
        <p className="relative font-body text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
      </motion.div>
    </motion.div>
  );
};

const PromiseSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="section-padding bg-gradient-section">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-4xl text-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            className="mb-4 font-body text-[11px] tracking-[0.3em] uppercase text-primary"
          >
            Transformasiya
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mb-20 font-display text-4xl font-bold text-accent md:text-5xl"
          >
            Proqram sənə <span className="italic text-primary">nə verir?</span>
          </motion.h2>

          <div className="grid gap-8 md:grid-cols-2">
            {promises.map((p, i) => (
              <PromiseCard key={i} p={p} index={i} inView={inView} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromiseSection;
