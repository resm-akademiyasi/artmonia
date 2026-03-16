import { motion, useInView, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useRef, useState, memo } from "react";
import { Palette, Music, Sparkles, Coffee, Sun } from "lucide-react";
import interiorStudio from "@/assets/interior-studio.jpg";
import interiorLounge from "@/assets/interior-lounge.jpg";
import interiorSupplies from "@/assets/interior-supplies.jpg";
import interiorEntrance from "@/assets/interior-entrance.jpg";
import interiorClass from "@/assets/interior-class.jpg";

const interiorPhotos = [
  {
    src: interiorStudio,
    title: "Professional Molbertlər",
    subtitle: "Hər tələbə üçün fərdi iş stansiyası",
    icon: Palette,
    span: "md:col-span-2 md:row-span-2",
  },
  {
    src: interiorLounge,
    title: "Qaleriya & İstirahət",
    subtitle: "İlham verən sənət əsərləri arasında",
    icon: Coffee,
    span: "",
  },
  {
    src: interiorSupplies,
    title: "Premium Materiallar",
    subtitle: "Ən keyfiyyətli boyalar və fırçalar",
    icon: Sparkles,
    span: "",
  },
  {
    src: interiorEntrance,
    title: "Unikal Dizayn",
    subtitle: "Yaradıcılığa ilham verən məkan",
    icon: Sun,
    span: "md:col-span-2",
  },
  {
    src: interiorClass,
    title: "Canlı Dərslər",
    subtitle: "Xoş atmosfer, peşəkar təlim",
    icon: Music,
    span: "",
  },
];

const highlights = [
  { icon: Palette, label: "Professional molbertlər" },
  { icon: Coffee, label: "Rahat atmosfer" },
  { icon: Music, label: "Xoş musiqi" },
  { icon: Sparkles, label: "Unikal dizayn" },
];

const GalleryCard = memo(({
  photo,
  index,
  inView,
}: {
  photo: (typeof interiorPhotos)[0];
  index: number;
  inView: boolean;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), { stiffness: 200, damping: 20 });
  const scale = useSpring(hovered ? 1.02 : 1, { stiffness: 300, damping: 20 });

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

  const Icon = photo.icon;
  const isLarge = index === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.1 + index * 0.08 }}
      className={photo.span}
      style={{ perspective: 900 }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, scale, transformStyle: "preserve-3d" }}
        className="group relative overflow-hidden rounded-2xl cursor-pointer h-full"
      >
        {/* Image */}
        <img
          src={photo.src}
          alt={photo.title}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-700"
          style={{
            minHeight: isLarge ? "420px" : "220px",
            transform: hovered ? "scale(1.06)" : "scale(1)",
          }}
        />

        {/* Permanent subtle gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-accent/60 via-transparent to-transparent" />

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-accent/90 via-accent/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Always visible label */}
        <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
          <motion.div
            initial={false}
            animate={{ y: hovered ? -4 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center gap-2 mb-1.5">
              <div className="flex items-center justify-center w-7 h-7 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/30">
                <Icon size={14} className="text-primary" />
              </div>
              <p className="font-body text-[10px] tracking-[0.2em] uppercase text-primary font-semibold">
                Artmonia
              </p>
            </div>
            <p className="font-display text-lg md:text-xl font-bold text-primary-foreground drop-shadow-lg">
              {photo.title}
            </p>
          </motion.div>

          {/* Subtitle on hover */}
          <motion.p
            initial={false}
            animate={{ y: hovered ? 0 : 10, opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.3, delay: 0.05 }}
            className="font-body text-sm text-primary-foreground/80 mt-1"
          >
            {photo.subtitle}
          </motion.p>
        </div>

        {/* Corner accents */}
        <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-primary/0 group-hover:border-primary/50 transition-all duration-500 rounded-tr-lg" />
        <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-primary/0 group-hover:border-primary/50 transition-all duration-500 rounded-bl-lg" />
      </motion.div>
    </motion.div>
  );
});

GalleryCard.displayName = "GalleryCard";

const GallerySection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="interior" ref={ref} className="section-padding overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            className="mb-4 font-body text-[11px] tracking-[0.3em] uppercase text-primary font-semibold"
          >
            Məkanımız
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-4xl font-bold text-accent md:text-5xl lg:text-6xl"
          >
            Burada sənətə <span className="italic text-primary">aşiq olacaqsan</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-5 font-body text-base text-muted-foreground max-w-xl mx-auto"
          >
            Professional molbertlər, keyfiyyətli materiallar, xoş musiqi və ilham verən atmosfer — 
            Artmonia-da hər detal sənin yaradıcılığın üçün düşünülüb.
          </motion.p>
        </div>

        {/* Highlights strip */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="flex flex-wrap justify-center gap-3 md:gap-5 mb-12"
        >
          {highlights.map((h, i) => (
            <div
              key={i}
              className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-muted/60 border border-border/50 backdrop-blur-sm"
            >
              <h.icon size={16} className="text-primary" />
              <span className="font-body text-xs font-medium text-foreground/80 tracking-wide">
                {h.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Masonry-style grid */}
        <div className="mx-auto grid max-w-6xl gap-3 md:gap-4 grid-cols-1 md:grid-cols-3 md:grid-rows-[auto_auto_auto] auto-rows-[220px] md:auto-rows-[240px]">
          {interiorPhotos.map((photo, i) => (
            <GalleryCard key={i} photo={photo} index={i} inView={inView} />
          ))}
        </div>

        {/* Bottom CTA text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="font-body text-sm text-muted-foreground italic">
            "Artmonia-ya girən hər kəs burada qalmaq istəyir" ✨
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default GallerySection;
