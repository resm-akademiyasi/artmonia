import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Target, TrendingUp, Users, Award } from "lucide-react";

const promises = [
  { icon: Target, title: "Sistem var", desc: "Hər addım planlaşdırılıb — təsadüfi yox, ölçülən inkişaf." },
  { icon: TrendingUp, title: "Nəticə görünür", desc: "Həftəlik tapşırıqlar + feedback = real progress." },
  { icon: Users, title: "Mentor dəstəyi", desc: "Peşəkar rəssamlardan birbaşa rəy alırsan." },
  { icon: Award, title: "Portfolyo qurulur", desc: "Kurs sonunda göstərə biləcəyin işlər olur." },
];

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
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
                className="group rounded-xl border border-border bg-background p-8 text-left transition-all hover:border-primary/20 hover:shadow-lg"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <p.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mb-2 font-display text-2xl font-semibold text-accent">{p.title}</h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromiseSection;
