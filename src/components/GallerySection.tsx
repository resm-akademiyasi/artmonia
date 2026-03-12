import { motion, useInView, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useRef, useState, memo } from "react";
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

const TiltCard = memo(({
  photo,
  index,
  inView,
  isLarge,
}: {
  photo: (typeof interiorPhotos)[0];
  index: number;
  inView: boolean;
  isLarge: boolean;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 20 });
  const scale = useSpring(hovered ? 1.03 : 1, { stiffness: 300, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotateX: 5 }}
      animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.15 + index * 0.1 }}
      className={`${isLarge ? "md:row-span-2" : ""}`}
      style={{ perspective: 800 }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, scale, transformStyle: "preserve-3d" }}
        className="group relative overflow-hidden rounded-2xl cursor-pointer h-full"
      >
        <img
          src={photo.src}
          alt={photo.title}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-600"
          style={{
            minHeight: isLarge ? "100%" : "240px",
            maxHeight: isLarge ? "none" : "320px",
            transform: hovered ? "scale(1.08)" : "scale(1)",
          }}
        />

        {/* Bottom gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-accent/70 via-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

        {/* Floating label */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 p-5"
          style={{ transform: "translateZ(30px)" }}
          initial={false}
          animate={{ y: hovered ? 0 : 20, opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <p className="font-body text-[10px] tracking-[0.25em] uppercase text-primary drop-shadow-lg">
            {photo.category}
          </p>
          <p className="font-display text-xl font-semibold text-primary-foreground drop-shadow-lg">
            {photo.title}
          </p>
        </motion.div>

        {/* Corner accent */}
        <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-primary/0 group-hover:border-primary/60 transition-all duration-500 rounded-tr-lg" />
        <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-primary/0 group-hover:border-primary/60 transition-all duration-500 rounded-bl-lg" />
      </motion.div>
    </motion.div>
  );
});

TiltCard.displayName = "TiltCard";

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
            <TiltCard key={i} photo={photo} index={i} inView={inView} isLarge={i === 0} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
