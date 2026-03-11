import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import artwork1 from "@/assets/artwork-1.jpg";
import artwork2 from "@/assets/artwork-2.jpg";
import artwork4 from "@/assets/artwork-4.jpg";
import artwork5 from "@/assets/artwork-5.jpg";
import artwork6 from "@/assets/artwork-6.jpg";

const interiorPhotos = [
  { src: artwork1, title: "Rəsm otağı", category: "Studio" },
  { src: artwork2, title: "Sərgi guşəsi", category: "Qaleriya" },
  { src: artwork4, title: "İş masaları", category: "Atelier" },
  { src: artwork5, title: "Material guşəsi", category: "Resurslar" },
  { src: artwork6, title: "Giriş", category: "Lobby" },
];

const GallerySection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="section-padding">
      <div className="container mx-auto px-6">
        <div className="mx-auto mb-20 max-w-2xl text-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            className="mb-4 font-body text-[11px] tracking-[0.3em] uppercase text-primary"
          >
            Məkanımız
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-4xl font-bold text-accent md:text-5xl lg:text-6xl"
          >
            Artmonia <span className="italic text-primary">interyeri</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 font-body text-sm text-muted-foreground"
          >
            Yaradıcılıq üçün ilham verən mühit
          </motion.p>
        </div>

        <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-3 md:grid-rows-2">
          {interiorPhotos.map((photo, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 + i * 0.08 }}
              className={`group relative overflow-hidden rounded-lg ${
                i === 0 ? "md:row-span-2" : ""
              }`}
            >
              <img
                src={photo.src}
                alt={photo.title}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                style={{ minHeight: i === 0 ? "100%" : "240px", maxHeight: i === 0 ? "none" : "320px" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-accent/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-full transition-transform duration-300 group-hover:translate-y-0">
                <p className="font-body text-[10px] tracking-[0.2em] uppercase text-primary">
                  {photo.category}
                </p>
                <p className="font-display text-xl font-semibold text-primary-foreground">{photo.title}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
