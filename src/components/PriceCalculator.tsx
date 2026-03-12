import { useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Calculator, ArrowRight } from "lucide-react";

const levels = [
  { label: "Başlanğıc", value: "beginner" },
  { label: "Orta", value: "intermediate" },
  { label: "İrəliləmiş", value: "advanced" },
];

const durations = [
  { label: "1 ay", value: 1, discount: 0 },
  { label: "3 ay", value: 3, discount: 10 },
  { label: "6 ay", value: 6, discount: 20 },
];

const formats = [
  { label: "Qrup dərsi", value: "group", multiplier: 1 },
  { label: "Fərdi dərs", value: "individual", multiplier: 1.8 },
];

const basePrice = 99;

const PriceCalculator = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [level, setLevel] = useState("beginner");
  const [duration, setDuration] = useState(3);
  const [format, setFormat] = useState("group");

  const levelMultiplier = level === "beginner" ? 1 : level === "intermediate" ? 1.3 : 1.6;
  const selectedDuration = durations.find((d) => d.value === duration)!;
  const selectedFormat = formats.find((f) => f.value === format)!;

  const monthlyPrice = Math.round(basePrice * levelMultiplier * selectedFormat.multiplier);
  const totalBeforeDiscount = monthlyPrice * duration;
  const discount = selectedDuration.discount;
  const totalPrice = Math.round(totalBeforeDiscount * (1 - discount / 100));
  const savings = totalBeforeDiscount - totalPrice;

  return (
    <section ref={ref} className="section-padding bg-muted/30">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-2xl"
        >
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 mb-4">
              <Calculator size={14} className="text-primary" />
              <span className="font-body text-[11px] font-semibold tracking-[0.15em] uppercase text-primary">
                Qiymət Kalkulyatoru
              </span>
            </div>
            <h2 className="font-display text-3xl font-bold text-accent md:text-4xl">
              Sənə uyğun <span className="italic text-primary">qiyməti hesabla</span>
            </h2>
          </div>

          <div className="rounded-2xl border border-border/60 bg-background p-8 shadow-lg space-y-6">
            {/* Level */}
            <div>
              <label className="font-body text-xs font-semibold tracking-wider uppercase text-muted-foreground mb-3 block">
                Səviyyə
              </label>
              <div className="grid grid-cols-3 gap-2">
                {levels.map((l) => (
                  <button
                    key={l.value}
                    onClick={() => setLevel(l.value)}
                    className={`py-2.5 rounded-xl font-body text-xs font-medium transition-all border ${
                      level === l.value
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border text-muted-foreground hover:border-primary/30"
                    }`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Duration */}
            <div>
              <label className="font-body text-xs font-semibold tracking-wider uppercase text-muted-foreground mb-3 block">
                Müddət
              </label>
              <div className="grid grid-cols-3 gap-2">
                {durations.map((d) => (
                  <button
                    key={d.value}
                    onClick={() => setDuration(d.value)}
                    className={`relative py-2.5 rounded-xl font-body text-xs font-medium transition-all border ${
                      duration === d.value
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border text-muted-foreground hover:border-primary/30"
                    }`}
                  >
                    {d.label}
                    {d.discount > 0 && (
                      <span className="absolute -top-2 -right-1 bg-green-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                        -{d.discount}%
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Format */}
            <div>
              <label className="font-body text-xs font-semibold tracking-wider uppercase text-muted-foreground mb-3 block">
                Format
              </label>
              <div className="grid grid-cols-2 gap-2">
                {formats.map((f) => (
                  <button
                    key={f.value}
                    onClick={() => setFormat(f.value)}
                    className={`py-2.5 rounded-xl font-body text-xs font-medium transition-all border ${
                      format === f.value
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border text-muted-foreground hover:border-primary/30"
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Result */}
            <div className="border-t border-border pt-6">
              <div className="flex items-end justify-between">
                <div>
                  <p className="font-body text-xs text-muted-foreground mb-1">Aylıq</p>
                  <p className="font-display text-3xl font-bold text-accent">
                    {monthlyPrice} <span className="text-lg text-muted-foreground">AZN</span>
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-body text-xs text-muted-foreground mb-1">
                    {duration} aylıq cəmi
                  </p>
                  <p className="font-display text-2xl font-bold text-primary">
                    {totalPrice} AZN
                  </p>
                  {savings > 0 && (
                    <p className="font-body text-xs font-semibold text-green-600">
                      {savings} AZN qənaət!
                    </p>
                  )}
                </div>
              </div>

              <a
                href="#lead-form"
                className="group mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 font-body text-sm font-semibold text-primary-foreground transition-all hover:shadow-lg hover:scale-[1.02]"
              >
                Bu paketlə qeydiyyat
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PriceCalculator;
