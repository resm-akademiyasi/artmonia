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
    <section ref={ref} className="section-padding">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            className="mb-4 font-body text-xs tracking-[0.3em] uppercase text-primary"
          >
            Transformasiya
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mb-16 font-display text-3xl font-bold md:text-5xl"
          >
            Proqram sənə <span className="text-gradient-gold">nə verir?</span>
          </motion.h2>

          <div className="grid gap-8 md:grid-cols-2">
            {promises.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
                className="group rounded-sm border border-border bg-card p-8 text-left transition-all hover:border-primary/30 hover:gold-glow"
              >
                <p.icon className="mb-4 h-8 w-8 text-primary" />
                <h3 className="mb-2 font-display text-xl font-semibold">{p.title}</h3>
                <p className="font-body text-muted-foreground leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromiseSection;
