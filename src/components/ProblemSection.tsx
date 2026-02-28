import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const problems = [
  "YouTube-dan öyrənirsən, amma struktur yoxdur.",
  "Başlayırsan, yarımçıq qoyursan.",
  "Feedback almırsan — səhvlərini görmürsən.",
  "Nə vaxt keçid etməli olduğunu bilmirsən.",
];

const ProblemSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="section-padding bg-gradient-section">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl">
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-4 font-body text-xs tracking-[0.3em] uppercase text-primary"
          >
            Problem
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mb-12 font-display text-3xl font-bold md:text-5xl"
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
                className="flex items-start gap-4 border-l-2 border-primary/30 pl-6 py-2"
              >
                <p className="font-body text-lg text-muted-foreground md:text-xl">{p}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
