import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Palette, PenTool, Monitor, Brush, Layers, Camera } from "lucide-react";

const programs = [
  {
    icon: PenTool,
    title: "Akademik Rəsm",
    desc: "Proporsiya, anatomiya və klassik çəkim texnikaları ilə möhkəm təməl.",
    duration: "12 həftə",
  },
  {
    icon: Palette,
    title: "Rəng & Boyama",
    desc: "Yağlı boya, akrilik və akvarel texnikaları ilə rəng nəzəriyyəsi.",
    duration: "10 həftə",
  },
  {
    icon: Monitor,
    title: "Rəqəmsal Sənət",
    desc: "Procreate və Photoshop ilə müasir rəqəmsal illüstrasiya.",
    duration: "8 həftə",
  },
  {
    icon: Brush,
    title: "Kompozisiya",
    desc: "Vizual tarazlıq, ritm və baxışı idarə etmək sənəti.",
    duration: "6 həftə",
  },
  {
    icon: Layers,
    title: "Portret Sənəti",
    desc: "İnsan üzünün anatomiyası, ifadə və işıq-kölgə ustalığı.",
    duration: "8 həftə",
  },
  {
    icon: Camera,
    title: "Portfolyo Hazırlığı",
    desc: "Karyera üçün peşəkar portfolyo yaratma və təqdimat.",
    duration: "4 həftə",
  },
];

const ProgramsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} id="programs" className="section-padding bg-gradient-section">
      <div className="container mx-auto px-6">
        <div className="mx-auto mb-20 max-w-2xl text-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            className="mb-4 font-body text-[11px] tracking-[0.3em] uppercase text-primary"
          >
            Proqramlar
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-4xl font-bold text-accent md:text-5xl lg:text-6xl"
          >
            Peşəkar <span className="italic text-primary">kurslar</span>
          </motion.h2>
        </div>

        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2 lg:grid-cols-3">
          {programs.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.08 }}
              className="group rounded-xl border border-border bg-background p-8 transition-all duration-300 hover:border-primary/30 hover:shadow-lg"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <p.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="mb-2 font-display text-2xl font-bold text-accent">{p.title}</h3>
              <p className="mb-4 font-body text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
              <p className="font-body text-[10px] tracking-[0.2em] uppercase text-primary">{p.duration}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProgramsSection;
