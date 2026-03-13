import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Check, ArrowRight } from "lucide-react";
import { getGoUrl } from "@/lib/whatsapp";
import { useSettings } from "@/hooks/use-settings";

const basePlans = [
  {
    name: "Mini",
    key: "mini",
    fallbackPrice: "99",
    fallbackDesc: "Rəsmə giriş — əsasları öyrən.",
    fallbackFeatures: "2 modul (Əsaslar + İşıq/Kölgə), Video dərslər, Topluluq çatı, Sertifikat",
    featured: false,
  },
  {
    name: "Standart",
    key: "standard",
    fallbackPrice: "199",
    fallbackDesc: "Tam proqram — bütün modullar + feedback.",
    fallbackFeatures: "6 modul — tam proqram, Həftəlik canlı sessiya, Fərdi feedback, Portfolyo layihəsi, Sertifikat, 6 ay material girişi",
    featured: true,
  },
  {
    name: "Premium",
    key: "premium",
    fallbackPrice: "349",
    fallbackDesc: "1-on-1 mentorluq + VIP dəstək.",
    fallbackFeatures: "Standart-ın hər şeyi, 4 fərdi mentorluq sessiyası, Portfolyo review, Karyera məsləhəti, Ömürlük material girişi, VIP WhatsApp qrup",
    featured: false,
  },
];

const PricingCards = () => {
  const { getSetting } = useSettings();
  const plans = basePlans.map((p) => ({
    name: p.name,
    featured: p.featured,
    price: getSetting(`price_${p.key}`, p.fallbackPrice),
    desc: getSetting(`plan_${p.key}_desc`, p.fallbackDesc),
    features: getSetting(`plan_${p.key}_features`, p.fallbackFeatures).split(",").map((f) => f.trim()).filter(Boolean),
  }));
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} id="pricing" className="section-padding">
      <div className="container mx-auto px-6">
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          className="mb-4 text-center font-body text-[11px] tracking-[0.3em] uppercase text-primary"
        >
          Paketlər
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mb-20 text-center font-display text-4xl font-bold text-accent md:text-5xl"
        >
          Sənə uyğun <span className="italic text-primary">paketi seç.</span>
        </motion.h2>

        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
              className={`relative rounded-xl border p-8 transition-all ${
                plan.featured
                  ? "border-primary bg-accent text-white shadow-xl scale-[1.02]"
                  : "border-border bg-background hover:border-primary/20 hover:shadow-lg"
              }`}
            >
              {plan.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary px-5 py-1 text-[10px] font-semibold tracking-[0.2em] text-primary-foreground uppercase rounded-full">
                  Populyar
                </div>
              )}
              <h3 className="mb-2 font-display text-2xl font-bold">{plan.name}</h3>
              <p className={`mb-4 font-body text-sm ${plan.featured ? "text-white/70" : "text-muted-foreground"}`}>{plan.desc}</p>
              <div className="mb-6">
                <span className="font-display text-5xl font-bold">{plan.price}</span>
                <span className={`ml-1 font-body text-sm ${plan.featured ? "text-white/60" : "text-muted-foreground"}`}>AZN</span>
              </div>
              <ul className="mb-8 space-y-3">
                {plan.features.map((f, fi) => (
                  <li key={fi} className={`flex items-start gap-2 font-body text-sm ${plan.featured ? "text-white/80" : "text-muted-foreground"}`}>
                    <Check size={15} className={`mt-0.5 shrink-0 ${plan.featured ? "text-primary" : "text-primary"}`} />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href={getGoUrl("landing", `pricing-${plan.name.toLowerCase()}`)}
                className={`group flex w-full items-center justify-center gap-2 py-3.5 text-sm font-semibold tracking-wide rounded-full transition-all ${
                  plan.featured
                    ? "bg-primary text-primary-foreground hover:scale-105 hover:shadow-lg"
                    : "border border-border text-accent hover:border-primary hover:text-primary"
                }`}
              >
                Seç və yaz
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingCards;
