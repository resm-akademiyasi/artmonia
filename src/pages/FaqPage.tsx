import { motion } from "framer-motion";
import FaqSection from "@/components/FaqSection";

const FaqPage = () => {
  return (
    <main className="pt-20">
      <section className="section-padding bg-gradient-dark">
        <div className="container mx-auto px-4 text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-display text-4xl font-bold md:text-6xl">
            Sualların <span className="text-gradient-gold">var?</span>
          </motion.h1>
        </div>
      </section>
      <FaqSection />
    </main>
  );
};

export default FaqPage;
