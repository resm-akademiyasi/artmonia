import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";

interface StudentResult {
  id: string;
  student_name: string;
  achievement: string | null;
  before_image_url: string | null;
  after_image_url: string | null;
  display_order: number;
}

const ComparisonCard = ({ result }: { result: StudentResult }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="group relative flex-shrink-0 w-[300px] md:w-[340px] cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-border bg-muted">
        {/* Before image */}
        {result.before_image_url && (
          <img
            src={result.before_image_url}
            alt={`${result.student_name} - əvvəl`}
            className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700"
            style={{ opacity: hovered ? 0 : 1 }}
          />
        )}
        {/* After image */}
        {result.after_image_url && (
          <img
            src={result.after_image_url}
            alt={`${result.student_name} - sonra`}
            className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700"
            style={{ opacity: hovered ? 1 : 0 }}
          />
        )}

        {/* Label */}
        <div className="absolute top-4 left-4 z-10">
          <span
            className="inline-block rounded-full px-3 py-1 font-body text-[10px] font-semibold tracking-[0.15em] uppercase transition-all duration-500"
            style={{
              backgroundColor: hovered ? "hsl(33 89% 51%)" : "hsl(246 96% 18% / 0.8)",
              color: "white",
            }}
          >
            {hovered ? "Sonra" : "Əvvəl"}
          </span>
        </div>

        {/* Gradient overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[hsl(246_96%_18%/0.9)] to-transparent" />
      </div>

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
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });
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
      if (data) setResults(data);
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
    <section className="section-padding overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="mx-auto mb-20 max-w-2xl text-center">
          <p className="mb-4 font-body text-[11px] tracking-[0.3em] uppercase text-primary">
            Nəticələr
          </p>
          <h2 className="font-display text-4xl font-bold text-accent md:text-5xl lg:text-6xl">
            Tələbə <span className="italic text-primary">nəticələri</span>
          </h2>
          <p className="mt-4 font-body text-sm text-muted-foreground">
            Kartın üzərinə gəl — əvvəl/sonra fərqini gör
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
          to="/about"
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
