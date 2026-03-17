import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Check, ArrowRight, X, Star, Clock } from "lucide-react";
import { getGoUrl } from "@/lib/whatsapp";
import { useSettings } from "@/hooks/use-settings";

const basePlans = [
  {
    name: "Mini",
    key: "mini",
    fallbackPrice: "99",
    fallbackDesc: "Rəsmə giriş — əsasları öyrən.",
    fallbackFeatures: "2 modul (Əsaslar + İşıq/Kölgə),Video dərslər,Topluluq çatı,Sertifikat",
    featured: false,
    badge: null,
    limit: null,
  },
  {
    name: "Standart",
    key: "standard",
    fallbackPrice: "199",
    fallbackDesc: "Tam proqram — bütün modullar + feedback.",
    fallbackFeatures: "6 modul — tam proqram,Həftəlik canlı sessiya,Fərdi feedback,Portfolyo layihəsi,Sertifikat,6 ay material girişi",
    featured: true,
    badge: "Ən Populyar",
    limit: null,
  },
  {
    name: "Premium",
    key: "premium",
    fallbackPrice: "349",
    fallbackDesc: "1-on-1 mentorluq + VIP dəstək.",
    fallbackFeatures: "Standart-ın hər şeyi,4 fərdi mentorluq sessiyası,Portfolyo review,Karyera məsləhəti,Ömürlük material girişi,VIP WhatsApp qrup",
    featured: false,
    badge: null,
    limit: "Yalnız 5 yer qaldı",
  },
];

// Comparison features grid
const comparisonFeatures = [
  { label: "Modul sayı", mini: "2", standard: "6", premium: "6" },
  { label: "Video dərslər", mini: true, standard: true, premium: true },
  { label: "Canlı sessiya", mini: false, standard: true, premium: true },
  { label: "Fərdi feedback", mini: false, standard: true, premium: true },
  { label: "1-on-1 mentorluq", mini: false, standard: false, premium: true },
  { label: "Portfolyo review", mini: false, standard: true, premium: true },
  { label: "Karyera məsləhəti", mini: false, standard: false, premium: true },
  { label: "Material girişi", mini: "3 ay", standard: "6 ay", premium: "Ömürlük" },
  { label: "VIP qrup", mini: false, standard: false, premium: true },
  { label: "Sertifikat", mini: true, standard: true, premium: true },
];

const PricingCards = () => {
  const { getSetting } = useSettings();
  const plans = basePlans.map((p) => ({
    ...p,
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
          className="mb-6 text-center font-display text-4xl font-bold text-accent md:text-5xl"
        >
          Sənə uyğun <span className="italic text-primary">paketi seç.</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="mb-16 text-center font-body text-sm text-muted-foreground max-w-md mx-auto"
        >
          Hər paket sənin səviyyənə və məqsədlərinə uyğun hazırlanıb
        </motion.p>

        {/* Cards */}
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3 mb-20">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
              className={`relative rounded-2xl border p-8 transition-all duration-300 ${
                plan.featured
                  ? "border-primary bg-accent text-white shadow-2xl scale-[1.03] ring-2 ring-primary/20"
                  : "border-border bg-background hover:border-primary/20 hover:shadow-lg"
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-primary px-5 py-1.5 text-[10px] font-bold tracking-[0.2em] text-primary-foreground uppercase rounded-full shadow-lg">
                  <Star size={10} className="fill-current" />
                  {plan.badge}
                </div>
              )}
              {plan.limit && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-accent px-5 py-1.5 text-[10px] font-bold tracking-[0.15em] text-white uppercase rounded-full border border-primary/40 shadow-lg">
                  <Clock size={10} className="text-primary" />
                  {plan.limit}
                </div>
              )}

              <h3 className="mb-2 font-display text-2xl font-bold">{plan.name}</h3>
              <p className={`mb-5 font-body text-sm ${plan.featured ? "text-white/70" : "text-muted-foreground"}`}>
                {plan.desc}
              </p>
              <div className="mb-6">
                <span className="font-display text-5xl font-bold">{plan.price}</span>
                <span className={`ml-1 font-body text-sm ${plan.featured ? "text-white/60" : "text-muted-foreground"}`}>AZN</span>
              </div>
              <ul className="mb-8 space-y-3">
                {plan.features.map((f, fi) => (
                  <li key={fi} className={`flex items-start gap-2.5 font-body text-sm ${plan.featured ? "text-white/85" : "text-muted-foreground"}`}>
                    <Check size={15} className="mt-0.5 shrink-0 text-primary" />
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

        {/* Comparison Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mx-auto max-w-4xl"
        >
          <h3 className="text-center font-display text-2xl font-bold text-accent mb-8">
            Ətraflı <span className="text-primary">müqayisə</span>
          </h3>
          <div className="rounded-2xl border border-border overflow-hidden">
            {/* Header */}
            <div className="grid grid-cols-4 bg-muted/50">
              <div className="p-4 font-body text-xs font-semibold tracking-[0.15em] uppercase text-muted-foreground">
                Xüsusiyyət
              </div>
              {["Mini", "Standart", "Premium"].map((name) => (
                <div key={name} className={`p-4 text-center font-body text-xs font-bold tracking-[0.15em] uppercase ${
                  name === "Standart" ? "text-primary bg-primary/5" : "text-accent"
                }`}>
                  {name}
                </div>
              ))}
            </div>
            {/* Rows */}
            {comparisonFeatures.map((f, i) => (
              <div key={i} className={`grid grid-cols-4 border-t border-border/50 ${i % 2 === 0 ? "" : "bg-muted/20"}`}>
                <div className="p-4 font-body text-sm text-accent font-medium">
                  {f.label}
                </div>
                {[f.mini, f.standard, f.premium].map((val, vi) => (
                  <div key={vi} className={`p-4 flex items-center justify-center ${vi === 1 ? "bg-primary/[0.03]" : ""}`}>
                    {typeof val === "boolean" ? (
                      val ? (
                        <Check size={16} className="text-primary" />
                      ) : (
                        <X size={16} className="text-muted-foreground/30" />
                      )
                    ) : (
                      <span className="font-body text-sm font-medium text-accent">{val}</span>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingCards;
