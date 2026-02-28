import { motion } from "framer-motion";
import { Palette, Heart, Target } from "lucide-react";

const team = [
  { name: "Aida Həsənova", role: "Baş Müəllim — Akvarel & Rəng", bio: "15+ il təcrübə. Bakı Rəssamlıq Akademiyası məzunu." },
  { name: "Kamran Əliyev", role: "Müəllim — Portret & Fiqur", bio: "Beynəlxalq sərgilərdə iştirak. 10+ il pedaqoji təcrübə." },
  { name: "Nərmin Sadıqova", role: "Müəllim — Kompozisiya & Dizayn", bio: "Qrafik dizayner + rəssam. Gənc rəssamlara mentorluq." },
];

const AboutPage = () => {
  return (
    <main className="pt-20">
      <section className="section-padding bg-gradient-dark">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-4 font-body text-xs tracking-[0.3em] uppercase text-primary">
              Haqqımızda
            </motion.p>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-6 font-display text-4xl font-bold md:text-6xl">
              <span className="text-gradient-gold">Artmonia</span> — sənət sistemi.
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="font-body text-lg text-muted-foreground leading-relaxed">
              Biz inanırıq ki, hər kəs rəsm çəkə bilər — düzgün sistem və doğru rəhbərlik olduqda. Artmonia Academy peşəkar rəssamlar tərəfindən yaradılmış strukturlaşdırılmış proqramdır.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-3">
            {[
              { icon: Palette, title: "Sistem", desc: "Təsadüfi yox — addım-addım, ölçülən irəliləyiş." },
              { icon: Heart, title: "Fərdi Yanaşma", desc: "Hər tələbəyə fərdi feedback və dəstək." },
              { icon: Target, title: "Nəticə", desc: "Kurs sonunda portfolyo və real bacarıq." },
            ].map((v, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.1 }} className="text-center rounded-sm border border-border bg-card p-8">
                <v.icon className="mx-auto mb-4 h-8 w-8 text-primary" />
                <h3 className="mb-2 font-display text-xl font-bold">{v.title}</h3>
                <p className="font-body text-sm text-muted-foreground">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding bg-gradient-section">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center font-display text-3xl font-bold md:text-5xl">
            <span className="text-gradient-gold">Komandamız</span>
          </h2>
          <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-3">
            {team.map((t, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.1 }} className="rounded-sm border border-border bg-card p-6">
                <div className="mb-4 h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center font-display text-xl font-bold text-primary">
                  {t.name.charAt(0)}
                </div>
                <h3 className="font-display text-lg font-bold">{t.name}</h3>
                <p className="mb-2 font-body text-xs text-primary">{t.role}</p>
                <p className="font-body text-sm text-muted-foreground">{t.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutPage;
