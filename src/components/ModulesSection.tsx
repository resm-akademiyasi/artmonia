import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const modules = [
  { num: "01", title: "Əsaslar & Proporsiya", desc: "Xətt, forma, ölçü — hər şeyin təməli." },
  { num: "02", title: "İşıq və Kölgə", desc: "Həcm yaratmağın sirləri." },
  { num: "03", title: "Rəng Nəzəriyyəsi", desc: "Rəng dairəsi, harmoniya, kontrast." },
  { num: "04", title: "Kompozisiya", desc: "Baxışı idarə etmək sənəti." },
  { num: "05", title: "Portret & Fiqur", desc: "İnsan formasını düzgün çəkmək." },
  { num: "06", title: "Final Layihə", desc: "Bütün bilikləri bir əsərdə birləşdir." },
];

const ModulesSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="section-padding bg-gradient-section">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl">
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            className="mb-4 font-body text-xs tracking-[0.3em] uppercase text-primary"
          >
            Proqram
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mb-16 font-display text-3xl font-bold md:text-5xl"
          >
            6 modul. <span className="text-gradient-gold">6 həftə.</span>
          </motion.h2>

          <div className="space-y-0">
            {modules.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.08 }}
                className="group flex items-start gap-6 border-b border-border py-8 transition-colors hover:border-primary/30"
              >
                <span className="font-display text-3xl font-bold text-primary/30 transition-colors group-hover:text-primary">
                  {m.num}
                </span>
                <div>
                  <h3 className="mb-1 font-display text-xl font-semibold">{m.title}</h3>
                  <p className="font-body text-muted-foreground">{m.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModulesSection;
