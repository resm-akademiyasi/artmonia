import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import founderImg from "@/assets/founder.png";

const problems = [
  "YouTube-dan öyrənirsən, amma sistem yoxdur.",
  "Başlayırsan, yarımçıq qoyursan.",
  "Feedback almırsan — səhvlərini görmürsən.",
  "Nə vaxt keçid etməli olduğunu bilmirsən.",
];

const ProblemSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="section-padding">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-16">
          {/* Left — text */}
          <div className="flex-1 max-w-2xl">
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6 }}
              className="mb-4 font-body text-[11px] tracking-[0.3em] uppercase text-primary"
            >
              Problem
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mb-14 font-display text-4xl font-bold text-accent md:text-5xl"
            >
              Tanış gəlir?
            </motion.h2>

            <div className="space-y-6">
              {problems.map((p, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -30 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
                  className="flex items-start gap-4 border-l-2 border-primary/30 pl-6 py-3"
                >
                  <p className="font-body text-lg text-muted-foreground md:text-xl">{p}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right — founder image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative flex-shrink-0 hidden lg:block"
          >
            <div className="absolute -inset-8 rounded-full bg-gradient-to-br from-primary/15 via-secondary/10 to-transparent blur-2xl" />
            <div className="absolute -inset-4 rounded-[2rem] border-2 border-dashed border-primary/20 rotate-3" />
            <div className="absolute -top-3 -right-3 w-6 h-6 rounded-full bg-primary/40" />
            <div className="absolute -bottom-2 -left-2 w-4 h-4 rounded-full bg-secondary/40" />
            <div className="absolute top-1/2 -right-6 w-3 h-3 rounded-full bg-primary/30" />

            <div className="relative w-[340px] h-[420px] overflow-hidden rounded-2xl">
              <img
                src={founderImg}
                alt="Artmonia rəssam"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-accent/60 to-transparent" />
            </div>

            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-6 -right-6 bg-primary text-primary-foreground px-5 py-3 rounded-xl shadow-lg"
            >
              <p className="font-display text-lg font-bold">🎨</p>
            </motion.div>

            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute -top-4 -left-4 bg-accent text-accent-foreground px-4 py-2 rounded-xl shadow-lg"
            >
              <p className="font-display text-sm font-bold">✨ Sənət</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
