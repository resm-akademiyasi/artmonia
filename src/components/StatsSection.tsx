import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect, memo } from "react";

const stats = [
  { value: 500, suffix: "+", label: "Tələbə" },
  { value: 10, suffix: "+", label: "Sərgi" },
  { value: 50, suffix: "+", label: "Uğur hekayəsi" },
  { value: 3, suffix: "", label: "Beynəlxalq səfər" },
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

const StatsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [loadVideo, setLoadVideo] = useState(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  const youtubeId = "5BviDLRa67U";

  // Lazy load YouTube iframe only when section is near viewport
  useEffect(() => {
    if (inView) setLoadVideo(true);
  }, [inView]);

  return (
    <section ref={ref} className="relative -mt-10 overflow-hidden bg-accent py-32 md:-mt-14 md:py-44">
      {/* Top fade */}
      <div
        className="pointer-events-none absolute -top-1 left-0 right-0 z-20 h-72 md:h-96"
        style={{
          background:
            "linear-gradient(to bottom, hsl(var(--accent) / 0.97) 0%, hsl(var(--accent) / 0.82) 20%, hsl(var(--accent) / 0.55) 45%, hsl(var(--accent) / 0.25) 70%, hsl(var(--accent) / 0.08) 88%, transparent 100%)",
        }}
      />
      {/* Bottom fade */}
      <div className="pointer-events-none absolute -bottom-1 left-0 right-0 z-20 h-72 md:h-96" style={{ background: "linear-gradient(to top, hsl(var(--background)) 0%, hsl(var(--background) / 0.95) 10%, hsl(var(--background) / 0.7) 30%, hsl(var(--background) / 0.4) 50%, hsl(var(--background) / 0.15) 70%, hsl(var(--background) / 0.05) 85%, transparent 100%)" }} />
      
      {/* YouTube Background with parallax */}
      <motion.div className="absolute inset-0 z-0 -top-[15%] -bottom-[15%] will-change-transform" style={{ y: bgY }}>
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
          {loadVideo ? (
            <iframe
              src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&loop=1&playlist=${youtubeId}&controls=0&showinfo=0&modestbranding=1&rel=0&disablekb=1&playsinline=1&start=4&vq=hd1080`}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
              style={{ border: 0, aspectRatio: "16/9", minWidth: "100%", minHeight: "100%", width: "max(100%, 177.78vh)", height: "max(100%, 56.25vw)" }}
              allow="autoplay; encrypted-media"
              loading="lazy"
              title="Artmoniya təqdimat videosu"
            />
          ) : (
            <div className="absolute inset-0 bg-accent" />
          )}
        </div>
        <div className="absolute inset-0 bg-accent/20" />
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-40 md:w-56" style={{ background: "linear-gradient(to right, hsl(var(--accent)) 0%, hsl(var(--accent) / 0.7) 30%, hsl(var(--accent) / 0.3) 60%, transparent 100%)" }} />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-40 md:w-56" style={{ background: "linear-gradient(to left, hsl(var(--accent)) 0%, hsl(var(--accent) / 0.7) 30%, hsl(var(--accent) / 0.3) 60%, transparent 100%)" }} />
      </motion.div>

      {/* Stats */}
      <div className="container relative z-10 mx-auto px-6">
        <div className="mx-auto grid max-w-4xl grid-cols-2 gap-12 md:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center"
            >
              <p className="font-display text-5xl font-bold text-primary-foreground md:text-6xl drop-shadow-lg">
                <Counter target={s.value} suffix={s.suffix} inView={inView} />
              </p>
              <p className="mt-2 font-body text-xs tracking-[0.2em] uppercase text-primary-foreground/70">
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
