import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import mod01 from "@/assets/module-01-basics.jpg";
import mod02 from "@/assets/module-02-light.jpg";
import mod03 from "@/assets/module-03-color.jpg";
import mod04 from "@/assets/module-04-composition.jpg";
import mod05 from "@/assets/module-05-portrait.jpg";
import mod06 from "@/assets/module-06-final.jpg";

const modules = [
  { num: "01", title: "Əsaslar & Proporsiya", desc: "Xətt, forma, ölçü — hər şeyin təməli. Geometrik formalardan başlayıb, proporsiya qanunlarını mənimsəyirsən.", img: mod01, color: "from-primary/20" },
  { num: "02", title: "İşıq və Kölgə", desc: "Həcm yaratmağın sirləri. Chiaroscuro texnikası ilə rəsmlərinə dərinlik ver.", img: mod02, color: "from-accent/20" },
  { num: "03", title: "Rəng Nəzəriyyəsi", desc: "Rəng dairəsi, harmoniya, kontrast. Rənglərin dilini öyrən, əsərlərinə ruh qat.", img: mod03, color: "from-primary/20" },
  { num: "04", title: "Kompozisiya", desc: "Baxışı idarə etmək sənəti. Qızıl nisbət, üçlər qaydası və vizual tarazlıq.", img: mod04, color: "from-accent/20" },
  { num: "05", title: "Portret & Fiqur", desc: "İnsan formasını düzgün çəkmək. Üz proporsiyaları, ifadə, bədən anatomiyası.", img: mod05, color: "from-primary/20" },
  { num: "06", title: "Final Layihə", desc: "Bütün bilikləri bir əsərdə birləşdir. Öz unikal üslubunu kəşf et.", img: mod06, color: "from-accent/20" },
];

const ModulesSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section ref={ref} id="modules" className="section-padding">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-6xl">
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            className="mb-4 font-body text-[11px] tracking-[0.3em] uppercase text-primary"
          >
            Kurikulum
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mb-6 font-display text-4xl font-bold text-accent md:text-5xl"
          >
            6 modul. <span className="italic text-primary">6 həftə.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-16 max-w-xl font-body text-sm text-muted-foreground leading-relaxed"
          >
            Hər modul praktiki nümunələr, video dərslər və fərdi feedback ilə dəstəklənir.
          </motion.p>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {modules.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.08 }}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="group relative overflow-hidden rounded-2xl border border-border bg-background transition-all duration-500 hover:border-primary/30 hover:shadow-xl hover:-translate-y-1 cursor-pointer"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <motion.img
                    src={m.img}
                    alt={m.title}
                    className="h-full w-full object-cover"
                    animate={{ scale: hoveredIndex === i ? 1.08 : 1 }}
                    transition={{ duration: 0.6 }}
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${m.color} to-transparent opacity-60`} />
                  
                  {/* Module number overlay */}
                  <div className="absolute top-4 left-4">
                    <span className="font-display text-4xl font-bold text-white/30 group-hover:text-primary/60 transition-colors duration-500">
                      {m.num}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="mb-2 font-display text-lg font-bold text-accent group-hover:text-primary transition-colors">
                    {m.title}
                  </h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">
                    {m.desc}
                  </p>
                </div>

                {/* Hover accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModulesSection;
