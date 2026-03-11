import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";

const CtaSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 md:py-32 bg-accent">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="mb-6 font-display text-4xl font-bold text-white md:text-5xl lg:text-6xl">
            Gözləmə. <span className="italic text-primary">Başla.</span>
          </h2>
          <p className="mb-12 font-body text-lg text-white/60 md:text-xl">
            Növbəti qrup tezliklə başlayır. Yerini indi ayır və rəsm səyahətinə başla.
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href="#lead-form"
              className="group flex items-center gap-3 bg-primary px-10 py-4 text-sm font-semibold tracking-wide text-primary-foreground rounded-full transition-all hover:scale-105 hover:shadow-[0_8px_30px_hsl(33_89%_51%/0.4)]"
            >
              Akademiyaya qoşul
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CtaSection;
