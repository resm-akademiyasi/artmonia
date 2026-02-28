import { motion } from "framer-motion";
import { Mail, MessageCircle, MapPin } from "lucide-react";
import { getGoUrl, BRAND } from "@/lib/whatsapp";

const ContactPage = () => {
  return (
    <main className="pt-20">
      <section className="section-padding bg-gradient-dark">
        <div className="container mx-auto px-4 text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6 font-display text-4xl font-bold md:text-6xl">
            <span className="text-gradient-gold">Əlaqə</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="font-body text-lg text-muted-foreground">
            Sualın var? Birbaşa bizə yaz.
          </motion.p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="mx-auto grid max-w-3xl gap-8 md:grid-cols-3">
            {[
              { icon: MessageCircle, title: "WhatsApp", value: "Yaz →", href: getGoUrl("contact", "whatsapp") },
              { icon: Mail, title: "Email", value: "info@artmonia.az", href: "mailto:info@artmonia.az" },
              { icon: MapPin, title: "Ünvan", value: "Bakı, Azərbaycan", href: "#" },
            ].map((c, i) => (
              <motion.a
                key={i}
                href={c.href}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="group rounded-sm border border-border bg-card p-8 text-center transition-all hover:border-primary/30"
              >
                <c.icon className="mx-auto mb-3 h-8 w-8 text-primary" />
                <h3 className="mb-1 font-display text-lg font-bold">{c.title}</h3>
                <p className="font-body text-sm text-muted-foreground group-hover:text-primary transition-colors">{c.value}</p>
              </motion.a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default ContactPage;
