import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ComparisonCard } from "@/components/StudentResultsSection";

interface StudentResult {
  id: string;
  student_name: string;
  achievement: string | null;
  before_image_url: string | null;
  after_image_url: string | null;
  display_order: number;
  duration_months: number | null;
}

const ResultsPage = () => {
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

  return (
    <main className="pt-20">
      <section className="section-padding">
        <div className="container mx-auto px-6">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <p className="mb-4 font-body text-[11px] tracking-[0.3em] uppercase text-primary">
              Nəticələr
            </p>
            <h1 className="font-display text-4xl font-bold text-accent md:text-5xl lg:text-6xl">
              Bütün tələbə <span className="italic text-primary">nəticələri</span>
            </h1>
            <p className="mt-4 font-body text-sm text-muted-foreground">
              Tələbələrimizin əvvəl və sonra fərqini kəşf edin
            </p>
          </div>

          {loading ? (
            <p className="text-center text-muted-foreground text-sm">Yüklənir...</p>
          ) : !results.length ? (
            <p className="text-center text-muted-foreground text-sm py-12">Hələ nəticə yoxdur.</p>
          ) : (
            <div className="grid gap-8 justify-items-center sm:grid-cols-2 lg:grid-cols-3">
              {results.map((result) => (
                <ComparisonCard key={result.id} result={result} />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default ResultsPage;
