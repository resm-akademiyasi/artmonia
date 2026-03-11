import { useRef, useEffect, useState } from "react";
import { ArrowRight, ChevronRight } from "lucide-react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";

interface StudentResult {
  id: string;
  student_name: string;
  achievement: string | null;
  before_image_url: string | null;
  after_image_url: string | null;
  display_order: number;
  duration_months: number | null;
}

export const ComparisonCard = ({ result }: { result: StudentResult }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 20 });
  const scale = useSpring(hovered ? 1.03 : 1, { stiffness: 300, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    mx.set(0);
    my.set(0);
  };

  return (
    <div className="flex-shrink-0 w-[340px] md:w-[400px]" style={{ perspective: 800 }}>
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, scale, transformStyle: "preserve-3d" }}
        className="overflow-hidden rounded-2xl border border-border bg-muted relative cursor-pointer"
      >
        <div className="grid grid-cols-2">
          {/* Before */}
          <div className="relative aspect-[3/4]">
            {result.before_image_url && (
              <motion.img
                src={result.before_image_url}
                alt={`${result.student_name} - əvvəl`}
                className="h-full w-full object-cover"
                animate={{ scale: hovered ? 1.06 : 1 }}
                transition={{ duration: 0.5 }}
              />
            )}
            <div className="absolute bottom-0 inset-x-0 bg-accent/80 py-1.5">
              <p className="text-center font-display text-[11px] font-bold tracking-[0.15em] uppercase text-white">
                Əvvəl
              </p>
            </div>
          </div>
          {/* After */}
          <div className="relative aspect-[3/4]">
            {result.after_image_url && (
              <motion.img
                src={result.after_image_url}
                alt={`${result.student_name} - sonra`}
                className="h-full w-full object-cover"
                animate={{ scale: hovered ? 1.06 : 1 }}
                transition={{ duration: 0.5 }}
              />
            )}
            <div className="absolute bottom-0 inset-x-0 bg-primary/90 py-1.5">
              <p className="text-center font-display text-[11px] font-bold tracking-[0.15em] uppercase text-white">
                Sonra
              </p>
            </div>
          </div>
        </div>

        {/* Glare effect */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-20"
          style={{
            background: useTransform(
              mx,
              [-0.5, 0, 0.5],
              [
                "linear-gradient(105deg, rgba(255,255,255,0.12) 0%, transparent 50%)",
                "linear-gradient(105deg, transparent 0%, transparent 100%)",
                "linear-gradient(255deg, rgba(255,255,255,0.12) 0%, transparent 50%)",
              ]
            ),
          }}
        />

        {/* Center Arrow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="w-10 h-10 rounded-full bg-primary shadow-lg flex items-center justify-center border-2 border-white">
            <ChevronRight size={20} className="text-white" />
          </div>
        </div>

        {/* Duration Badge */}
        {result.duration_months && (
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10">
            <div className="bg-accent/90 backdrop-blur-sm px-4 py-1.5 rounded-full border border-white/20 shadow-lg">
              <p className="font-display text-[11px] font-bold tracking-[0.1em] text-white whitespace-nowrap">
                {result.duration_months} ay
              </p>
            </div>
          </div>
        )}

        {/* Corner accents */}
        <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-primary/0 group-hover:border-primary/50 transition-all duration-500 rounded-tr-lg z-20" style={{ borderColor: hovered ? "hsl(var(--primary) / 0.5)" : "transparent" }} />
        <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-primary/0 group-hover:border-primary/50 transition-all duration-500 rounded-bl-lg z-20" style={{ borderColor: hovered ? "hsl(var(--primary) / 0.5)" : "transparent" }} />
      </motion.div>

      {/* Info */}
      <div className="mt-4 px-1">
        <p className="font-display text-lg font-bold text-accent">{result.student_name}</p>
        {result.achievement && (
          <p className="font-body text-xs text-primary font-medium mt-0.5">{result.achievement}</p>
        )}
      </div>
    </div>
  );
};

const StudentResultsSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [results, setResults] = useState<StudentResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      const { data } = await supabase
        .from("student_results")
        .select("*")
        .eq("is_published", true)
        .order("display_order", { ascending: true });
      if (data) setResults(data as unknown as StudentResult[]);
      setLoading(false);
    };
    fetchResults();
  }, []);

  // Auto-scroll animation
  useEffect(() => {
    if (!results.length || !scrollRef.current) return;

    const el = scrollRef.current;
    let animationId: number;
    let scrollPos = 0;
    const speed = 0.5;

    const animate = () => {
      scrollPos += speed;
      if (scrollPos >= el.scrollWidth / 2) {
        scrollPos = 0;
      }
      el.scrollLeft = scrollPos;
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    const pause = () => cancelAnimationFrame(animationId);
    const resume = () => { animationId = requestAnimationFrame(animate); };

    el.addEventListener("mouseenter", pause);
    el.addEventListener("mouseleave", resume);

    return () => {
      cancelAnimationFrame(animationId);
      el.removeEventListener("mouseenter", pause);
      el.removeEventListener("mouseleave", resume);
    };
  }, [results]);

  if (loading) return null;
  if (!results.length) return null;

  // Duplicate for infinite loop
  const duplicated = [...results, ...results];

  return (
    <section className="section-padding overflow-hidden animate-fade-in">
      <div className="container mx-auto px-6">
        <div className="mx-auto mb-20 max-w-2xl text-center">
          <p className="mb-4 font-body text-[11px] tracking-[0.3em] uppercase text-primary">
            Nəticələr
          </p>
          <h2 className="font-display text-4xl font-bold text-accent md:text-5xl lg:text-6xl">
            Tələbə <span className="italic text-primary">nəticələri</span>
          </h2>
          <p className="mt-4 font-body text-sm text-muted-foreground">
            Əvvəl və sonra fərqini gör
          </p>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-hidden px-6"
        style={{ scrollBehavior: "auto" }}
      >
        {duplicated.map((result, i) => (
          <ComparisonCard key={`${result.id}-${i}`} result={result} />
        ))}
      </div>

      <div className="container mx-auto px-6 mt-12 text-center">
        <Link
          to="/results"
          className="group inline-flex items-center gap-2 font-body text-sm font-semibold tracking-wider uppercase text-primary hover:text-accent transition-colors"
        >
          Bütün nəticələri gör
          <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
};

export default StudentResultsSection;
