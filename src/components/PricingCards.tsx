import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Check, ArrowRight } from "lucide-react";
import { getGoUrl } from "@/lib/whatsapp";

const plans = [
  {
    name: "Mini",
    price: "99",
    desc: "Rəsmə giriş — əsasları öyrən.",
    features: ["2 modul (Əsaslar + İşıq/Kölgə)", "Video dərslər", "Topluluq çatı", "Sertifikat"],
    featured: false,
  },
  {
    name: "Standart",
    price: "199",
    desc: "Tam proqram — bütün modullar + feedback.",
    features: ["6 modul — tam proqram", "Həftəlik canlı sessiya", "Fərdi feedback", "Portfolyo layihəsi", "Sertifikat", "6 ay material girişi"],
    featured: true,
  },
  {
    name: "Premium",
    price: "349",
    desc: "1-on-1 mentorluq + VIP dəstək.",
    features: ["Standart-ın hər şeyi", "4 fərdi mentorluq sessiyası", "Portfolyo review", "Karyera məsləhəti", "Ömürlük material girişi", "VIP WhatsApp qrup"],
    featured: false,
  },
];

const PricingCards = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="section-padding">
      <div className="container mx-auto px-4">
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          className="mb-4 text-center font-body text-xs tracking-[0.3em] uppercase text-primary"
        >
          Paketlər
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mb-16 text-center font-display text-3xl font-bold md:text-5xl"
        >
          Sənə uyğun <span className="text-gradient-gold">paketi seç.</span>
        </motion.h2>

        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
              className={`relative rounded-sm border p-8 transition-all ${
                plan.featured
                  ? "border-primary bg-card gold-glow"
                  : "border-border bg-card hover:border-primary/20"
              }`}
            >
              {plan.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-gold px-4 py-1 text-xs font-semibold tracking-wider text-primary-foreground uppercase">
                  Populyar
                </div>
              )}
              <h3 className="mb-2 font-display text-2xl font-bold">{plan.name}</h3>
              <p className="mb-4 font-body text-sm text-muted-foreground">{plan.desc}</p>
              <div className="mb-6">
                <span className="font-display text-4xl font-bold text-gradient-gold">{plan.price}</span>
                <span className="ml-1 font-body text-sm text-muted-foreground">AZN</span>
              </div>
              <ul className="mb-8 space-y-3">
                {plan.features.map((f, fi) => (
                  <li key={fi} className="flex items-start gap-2 font-body text-sm text-muted-foreground">
                    <Check size={16} className="mt-0.5 shrink-0 text-primary" />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href={getGoUrl("landing", `pricing-${plan.name.toLowerCase()}`)}
                className={`group flex w-full items-center justify-center gap-2 py-3 text-sm font-semibold tracking-wide rounded-sm transition-all ${
                  plan.featured
                    ? "bg-gradient-gold text-primary-foreground hover:scale-105"
                    : "border border-primary/30 text-primary hover:bg-primary/5"
                }`}
              >
                Seç və yaz
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingCards;
