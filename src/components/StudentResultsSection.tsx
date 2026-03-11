import { useRef, useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

interface StudentResult {
  id: string;
  student_name: string;
  achievement: string | null;
  before_image_url: string | null;
  after_image_url: string | null;
  display_order: number;
}

const ComparisonCard = ({ result }: { result: StudentResult }) => {
  return (
    <div className="flex-shrink-0 w-[340px] md:w-[400px]">
      <div className="overflow-hidden rounded-2xl border border-border bg-muted">
        <div className="grid grid-cols-2">
          {/* Before */}
          <div className="relative aspect-[3/4]">
            {result.before_image_url && (
              <img
                src={result.before_image_url}
                alt={`${result.student_name} - əvvəl`}
                className="h-full w-full object-cover"
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
              <img
                src={result.after_image_url}
                alt={`${result.student_name} - sonra`}
                className="h-full w-full object-cover"
              />
            )}
            <div className="absolute bottom-0 inset-x-0 bg-primary/90 py-1.5">
              <p className="text-center font-display text-[11px] font-bold tracking-[0.15em] uppercase text-white">
                Sonra
              </p>
            </div>
          </div>
        </div>
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

  const sectionRef = useScrollReveal<HTMLElement>();

  return (
    <section ref={sectionRef} className="section-padding overflow-hidden scroll-reveal">
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
