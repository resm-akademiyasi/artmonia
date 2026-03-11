import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";


const stats = [
  { value: 500, suffix: "+", label: "Tələbə" },
  { value: 10, suffix: "+", label: "Sərgi" },
  { value: 50, suffix: "+", label: "Uğur hekayəsi" },
  { value: 3, suffix: "", label: "Beynəlxalq səfər" },
];

const Counter = ({ target, suffix, inView }: { target: number; suffix: string; inView: boolean }) => {
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
};

const StatsSection = () => {
  const ref = useRef(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  const youtubeId = "5BviDLRa67U";

  return (
    <section ref={ref} className="relative overflow-hidden py-14 md:py-20 my-0">
      {/* Top fade - very long and soft */}
      <div className="pointer-events-none absolute -top-1 left-0 right-0 z-20 h-40 md:h-56 bg-gradient-to-b from-background via-background/80 to-transparent" />
      {/* Bottom fade - very long and soft */}
      <div className="pointer-events-none absolute -bottom-1 left-0 right-0 z-20 h-40 md:h-56 bg-gradient-to-t from-background via-background/80 to-transparent" />
      {/* YouTube Background with parallax */}
      <motion.div className="absolute inset-0 z-0 -top-[15%] -bottom-[15%]" style={{ y: bgY }}>
        <div className="relative w-full h-full flex items-center justify-center">
          <iframe
            src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&loop=1&playlist=${youtubeId}&controls=0&showinfo=0&modestbranding=1&rel=0&disablekb=1&playsinline=1`}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            style={{ border: 0, width: "177.78vh", height: "100vh", minWidth: "100%", minHeight: "56.25vw" }}
            allow="autoplay; encrypted-media"
            allowFullScreen
            title="Artmoniya təqdimat videosu"
          />
        </div>
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-accent/35" />
      </motion.div>

      {/* Stats on top */}
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
