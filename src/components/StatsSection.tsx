import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Play } from "lucide-react";

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

  // TODO: Replace with real video URL
  const videoUrl = "";

  return (
    <section ref={ref} className="relative overflow-hidden py-20 md:py-28 my-0">
      {/* Top fade */}
      <div className="pointer-events-none absolute -top-1 left-0 right-0 z-20 h-24 bg-gradient-to-b from-background to-transparent" />
      {/* Bottom fade */}
      <div className="pointer-events-none absolute -bottom-1 left-0 right-0 z-20 h-24 bg-gradient-to-t from-background to-transparent" />
      {/* Video Background with parallax */}
      <motion.div className="absolute inset-0 z-0 -top-[20%] -bottom-[20%]" style={{ y: bgY }}>
        {videoUrl ? (
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            className="h-full w-full object-cover"
          >
            <source src={videoUrl} type="video/mp4" />
          </video>
        ) : (
          /* Placeholder cinematic background */
          <div className="h-full w-full bg-gradient-to-r from-accent via-accent/90 to-secondary/80 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 0.15, scale: 1 } : {}}
              transition={{ duration: 1.2 }}
              className="flex flex-col items-center gap-4"
            >
              <Play className="h-20 w-20 text-primary-foreground" />
              <p className="font-body text-sm text-primary-foreground tracking-widest uppercase">
                Video tezliklə əlavə olunacaq
              </p>
            </motion.div>
          </div>
        )}
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-accent/60 backdrop-blur-[2px]" />
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
