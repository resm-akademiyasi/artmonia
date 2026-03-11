import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(246_96%_18%/0.7)] via-[hsl(246_96%_18%/0.5)] to-[hsl(246_96%_18%/0.85)]" />
      </div>

      <div className="container relative z-10 mx-auto px-6 pt-20">
        <div className="mx-auto max-w-4xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 font-body text-[11px] tracking-[0.4em] uppercase text-white/60"
          >
            Rəssamlıq Akademiyası
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="mb-8 font-display text-5xl font-bold leading-[1.1] tracking-tight text-white md:text-7xl lg:text-8xl"
          >
            Sənətini{" "}
            <span className="italic text-primary">kəşf et,</span>
            <br />
            peşəkar ol.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="mx-auto mb-14 max-w-xl font-body text-base leading-relaxed text-white/70 md:text-lg"
          >
            Akademik rəsm, rəng nəzəriyyəsi və kompozisiya — peşəkar mentorlarla addım-addım irəlilə.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          >
            <a
              href="#lead-form"
              className="group flex items-center gap-3 bg-primary px-10 py-4 font-body text-sm font-semibold tracking-wide text-primary-foreground rounded-full transition-all hover:scale-105 hover:shadow-[0_8px_30px_hsl(33_89%_51%/0.4)]"
            >
              Akademiyaya qoşul
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="/program"
              className="flex items-center gap-3 border border-white/25 px-10 py-4 font-body text-sm font-semibold tracking-wide text-white rounded-full transition-all hover:border-white/50 hover:bg-white/5"
            >
              Proqramı gör
            </a>
          </motion.div>
        </div>
      </div>

      {/* Bottom fade - seamless blend to stats video section */}
      <div
        className="pointer-events-none absolute -bottom-1 left-0 right-0 h-56"
        style={{
          background:
            "linear-gradient(to top, hsl(var(--accent) / 0.88) 0%, hsl(var(--accent) / 0.62) 35%, hsl(var(--accent) / 0.26) 70%, transparent 100%)",
        }}
      />
    </section>
  );
};

export default HeroSection;
