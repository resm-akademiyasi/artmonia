import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Star } from "lucide-react";

const testimonials = [
  { name: "Aynur M.", text: "İlk dəfə öz portretimi çəkə bildim. Mentor feedback-i hər şeyi dəyişdi.", role: "Başlayan" },
  { name: "Rəşad K.", text: "YouTube-da 2 il itirdim. Burada 6 həftədə daha çox irəlilədim.", role: "Peşəkar keçid" },
  { name: "Günel H.", text: "Struktur — budur fərq. Hər həftə nə edəcəyimi bilirdim.", role: "Hobbi rəssam" },
  { name: "Tural A.", text: "Portfolyom artıq var. İndi freelance sifarişlər alıram.", role: "Freelancer" },
  { name: "Leyla S.", text: "Uşaqlarıma dərs verirəm, amma özüm də çox şey öyrəndim.", role: "Müəllim" },
  { name: "Orxan V.", text: "Qiymətinə görə aldığın dəyər inanılmazdır.", role: "Tələbə" },
];

const TestimonialsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="section-padding">
      <div className="container mx-auto px-4">
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          className="mb-4 text-center font-body text-xs tracking-[0.3em] uppercase text-primary"
        >
          Nəticələr
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mb-16 text-center font-display text-3xl font-bold md:text-5xl"
        >
          Onlar artıq <span className="text-gradient-gold">nəticə aldı.</span>
        </motion.h2>

        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.08 }}
              className="rounded-sm border border-border bg-card p-6 transition-all hover:border-primary/20"
            >
              <div className="mb-3 flex gap-1">
                {[...Array(5)].map((_, s) => (
                  <Star key={s} size={14} className="fill-primary text-primary" />
                ))}
              </div>
              <p className="mb-4 font-body text-sm leading-relaxed text-muted-foreground">"{t.text}"</p>
              <div>
                <p className="font-body text-sm font-semibold">{t.name}</p>
                <p className="font-body text-xs text-muted-foreground">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
