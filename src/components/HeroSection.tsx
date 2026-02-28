import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import { getGoUrl } from "@/lib/whatsapp";

const HeroSection = () => {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-dark">
      {/* Subtle gold accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      
      <div className="container mx-auto px-4 pt-20">
        <div className="mx-auto max-w-4xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 font-body text-xs tracking-[0.3em] uppercase text-primary"
          >
            Online Rəsm Akademiyası
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="mb-8 font-display text-4xl font-bold leading-tight tracking-tight md:text-6xl lg:text-7xl"
          >
            Rəsm çəkirsən —{" "}
            <span className="text-gradient-gold">amma sistem yoxdursa</span>{" "}
            irəliləyiş ləngiyir.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mx-auto mb-12 max-w-2xl font-body text-lg leading-relaxed text-muted-foreground md:text-xl"
          >
            Addım-addım proqram. Nəticə ölçülən. Hər həftə dərs, tapşırıq və peşəkar feedback.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          >
            <a
              href={getGoUrl("landing", "hero")}
              className="group flex items-center gap-3 bg-gradient-gold px-8 py-4 text-sm font-semibold tracking-wide text-primary-foreground rounded-sm transition-all hover:scale-105 gold-glow"
            >
              <MessageCircle size={18} />
              WhatsApp-da yaz
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#lead-form"
              className="flex items-center gap-3 border border-primary/30 px-8 py-4 text-sm font-semibold tracking-wide text-primary rounded-sm transition-all hover:border-primary hover:bg-primary/5"
            >
              Ön Qeydiyyat
            </a>
          </motion.div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
