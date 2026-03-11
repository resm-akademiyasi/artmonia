import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  { q: "Proqram kimə uyğundur?", a: "Tam başlayanlardan tutmuş orta səviyyəlilərə qədər — hər kəs üçün uyğun modullar var." },
  { q: "Hər həftə nə qədər vaxt ayırmalıyam?", a: "Təxminən 4-6 saat. Dərslər + tapşırıqlar bu müddətə planlaşdırılıb." },
  { q: "Online formatda keyfiyyət necə təmin olunur?", a: "Video dərslər + canlı sessiyalar + hər tapşırığa fərdi feedback." },
  { q: "Materiallar nə qədər əlçatan olur?", a: "Kurs müddətində və bitdikdən sonra 6 ay ərzində bütün materiallara girişiniz var." },
  { q: "Ödəniş necə edilir?", a: "Bank kartı, köçürmə və ya hissə-hissə ödəniş variantları mövcuddur." },
  { q: "Əgər proqram mənə uyğun deyilsə?", a: "İlk 7 gün ərzində tam geri qaytarma təminatı var." },
  { q: "Sertifikat verilirmi?", a: "Bəli, proqramı uğurla tamamlayanlara Artmonia sertifikatı verilir." },
  { q: "Qrup böyüklüyü nə qədərdir?", a: "Hər qrupda maksimum 20 nəfər — fərdi diqqət təmin olunur." },
];

const FaqSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} id="faq" className="section-padding bg-gradient-section">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-3xl">
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            className="mb-4 text-center font-body text-[11px] tracking-[0.3em] uppercase text-primary"
          >
            FAQ
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mb-16 text-center font-display text-4xl font-bold text-accent md:text-5xl"
          >
            Tez-tez verilən <span className="italic text-primary">suallar</span>
          </motion.h2>

          <Accordion type="single" collapsible className="space-y-2">
            {faqs.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.05 }}
              >
                <AccordionItem value={`item-${i}`} className="border-border">
                  <AccordionTrigger className="font-body text-left text-base text-accent hover:text-primary hover:no-underline">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="font-body text-muted-foreground leading-relaxed">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
