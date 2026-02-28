import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, MessageCircle } from "lucide-react";
import { getGoUrl } from "@/lib/whatsapp";

const CtaSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="section-padding bg-gradient-section">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="mb-6 font-display text-3xl font-bold md:text-5xl lg:text-6xl">
            Gözləmə. <span className="text-gradient-gold">Başla.</span>
          </h2>
          <p className="mb-10 font-body text-lg text-muted-foreground md:text-xl">
            Növbəti qrup tezliklə başlayır. Yerini indi ayır və rəsm səyahətinə başla.
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href={getGoUrl("landing", "cta-bottom")}
              className="group flex items-center gap-3 bg-gradient-gold px-10 py-4 text-sm font-semibold tracking-wide text-primary-foreground rounded-sm transition-all hover:scale-105 gold-glow"
            >
              <MessageCircle size={18} />
              İndi yaz
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#lead-form"
              className="flex items-center gap-3 border border-primary/30 px-10 py-4 text-sm font-semibold tracking-wide text-primary rounded-sm transition-all hover:border-primary hover:bg-primary/5"
            >
              Ön Qeydiyyat
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CtaSection;
