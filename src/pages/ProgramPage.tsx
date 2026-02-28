import { motion } from "framer-motion";
import { Check, Clock, BookOpen, Users, Award } from "lucide-react";
import { getGoUrl } from "@/lib/whatsapp";
import LeadFormSection from "@/components/LeadFormSection";

const modules = [
  { num: "01", title: "Əsaslar & Proporsiya", weeks: "Həftə 1", topics: ["Xətt çəkiliş texnikası", "Geometrik formalar", "Proporsiya qaydaları", "Perspektiv əsasları"] },
  { num: "02", title: "İşıq və Kölgə", weeks: "Həftə 2", topics: ["İşıq mənbələri", "Kölgə növləri", "Həcm yaratma", "Tonallıq"] },
  { num: "03", title: "Rəng Nəzəriyyəsi", weeks: "Həftə 3", topics: ["Rəng dairəsi", "Soyuq-isti rənglər", "Rəng harmoniyası", "Akvarel texnikası"] },
  { num: "04", title: "Kompozisiya", weeks: "Həftə 4", topics: ["Qızıl nisbət", "Üçdəbir qaydası", "Vizual balans", "Diqqət nöqtəsi"] },
  { num: "05", title: "Portret & Fiqur", weeks: "Həftə 5", topics: ["Üz proporsiyası", "Bədən anatomiyası", "İfadə çəkiliş", "Poza və hərəkət"] },
  { num: "06", title: "Final Layihə", weeks: "Həftə 6", topics: ["Konsept hazırlığı", "Texnika seçimi", "İcra və tamamlama", "Portfolyo təqdimatı"] },
];

const ProgramPage = () => {
  return (
    <main className="pt-20">
      {/* Hero */}
      <section className="section-padding bg-gradient-dark">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-4 font-body text-xs tracking-[0.3em] uppercase text-primary">
              Proqram Detalları
            </motion.p>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-6 font-display text-4xl font-bold md:text-6xl">
              6 həftə. <span className="text-gradient-gold">6 modul.</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="font-body text-lg text-muted-foreground">
              Hər modul bir bacarığa fokuslanır. Hər həftə dərs + tapşırıq + fərdi feedback.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-border py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {[
              { icon: Clock, label: "Müddət", value: "6 həftə" },
              { icon: BookOpen, label: "Dərslər", value: "30+" },
              { icon: Users, label: "Qrup", value: "Maks 20" },
              { icon: Award, label: "Sertifikat", value: "Bəli" },
            ].map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * i }} className="text-center">
                <s.icon className="mx-auto mb-2 h-6 w-6 text-primary" />
                <p className="font-display text-2xl font-bold">{s.value}</p>
                <p className="font-body text-xs text-muted-foreground uppercase tracking-wider">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Modules detail */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl space-y-8">
            {modules.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i }}
                className="border border-border rounded-sm bg-card p-8"
              >
                <div className="flex items-start gap-4 mb-4">
                  <span className="font-display text-3xl font-bold text-primary/30">{m.num}</span>
                  <div>
                    <h3 className="font-display text-xl font-bold">{m.title}</h3>
                    <p className="font-body text-xs text-primary tracking-wider uppercase">{m.weeks}</p>
                  </div>
                </div>
                <ul className="grid grid-cols-2 gap-2">
                  {m.topics.map((t, ti) => (
                    <li key={ti} className="flex items-center gap-2 font-body text-sm text-muted-foreground">
                      <Check size={14} className="text-primary shrink-0" />{t}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-gradient-section text-center">
        <div className="container mx-auto px-4">
          <h2 className="mb-6 font-display text-3xl font-bold md:text-5xl">Hazırsan?</h2>
          <a href={getGoUrl("program", "cta")} className="inline-flex items-center gap-2 bg-gradient-gold px-10 py-4 text-sm font-semibold text-primary-foreground rounded-sm transition-transform hover:scale-105 gold-glow">
            WhatsApp-da yaz
          </a>
        </div>
      </section>

      <LeadFormSection />
    </main>
  );
};

export default ProgramPage;
