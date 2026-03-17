import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, BookOpen, Play } from "lucide-react";
import { Link } from "react-router-dom";

const teasers = [
  {
    type: "article" as const,
    title: "Kompozisiyanın 3 Qızıl Qaydası",
    desc: "Hər rəsmin güclü olmasının arxasında dayanan sadə prinsiplər.",
    icon: BookOpen,
    gradient: "from-primary/20 to-primary/5",
  },
  {
    type: "article" as const,
    title: "Rəng Harmoniyası: Başlanğıc Bələdçisi",
    desc: "Rəngləri necə uyğunlaşdırmağı öyrən — sadə və aydın.",
    icon: BookOpen,
    gradient: "from-accent/20 to-accent/5",
  },
  {
    type: "video" as const,
    title: "Portretdə Proporsiyalar",
    desc: "5 dəqiqədə üz proporsiyalarının əsas qanunlarını öyrən.",
    icon: Play,
    gradient: "from-secondary/30 to-secondary/10",
  },
];

const KnowledgeTeaser = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="section-padding">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <p className="mb-4 font-body text-[11px] tracking-[0.3em] uppercase text-primary">
              Pulsuz Resurslar
            </p>
            <div className="flex items-end justify-between flex-wrap gap-4">
              <h2 className="font-display text-4xl font-bold text-accent md:text-5xl">
                Sənət haqqında <span className="italic text-primary">pulsuz öyrən.</span>
              </h2>
              <Link
                to="/blog"
                className="group inline-flex items-center gap-2 font-body text-sm font-semibold text-primary hover:text-accent transition-colors"
              >
                Bütün yazılar
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>

          <div className="grid gap-5 md:grid-cols-3">
            {teasers.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 25 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
              >
                <Link
                  to="/blog"
                  className="group block rounded-2xl border border-border bg-background p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:-translate-y-1"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${t.gradient} flex items-center justify-center mb-5 transition-transform group-hover:scale-110`}>
                    <t.icon size={20} className="text-primary" />
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`font-body text-[9px] tracking-[0.2em] uppercase font-semibold px-2 py-0.5 rounded-full ${
                      t.type === "video" ? "bg-accent/10 text-accent" : "bg-primary/10 text-primary"
                    }`}>
                      {t.type === "video" ? "Video" : "Məqalə"}
                    </span>
                  </div>
                  <h3 className="font-display text-lg font-bold text-accent mb-2 group-hover:text-primary transition-colors">
                    {t.title}
                  </h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">
                    {t.desc}
                  </p>
                  <div className="mt-4 flex items-center gap-1.5 font-body text-xs font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    {t.type === "video" ? "İzlə" : "Oxu"}
                    <ArrowRight size={12} />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default KnowledgeTeaser;
