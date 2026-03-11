import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { ArrowRight, ExternalLink } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface NewsItem {
  id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  link: string | null;
  created_at: string;
}

const NewsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      const { data } = await supabase
        .from("news")
        .select("*")
        .eq("is_published", true)
        .order("created_at", { ascending: false })
        .limit(6);
      if (data) setNews(data);
      setLoading(false);
    };
    fetchNews();
  }, []);

  if (loading) return null;
  if (!news.length) return null;

  return (
    <section className="section-padding bg-gradient-section">
      <div className="container mx-auto px-6">
        <div className="mx-auto mb-20 max-w-2xl text-center">
          <p className="mb-4 font-body text-[11px] tracking-[0.3em] uppercase text-primary">
            Yeniliklər
          </p>
          <h2 className="font-display text-4xl font-bold text-accent md:text-5xl lg:text-6xl">
            Son <span className="italic text-primary">xəbərlər</span>
          </h2>
        </div>

        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-3">
          {news.map((item) => (
            <div key={item.id}>
              <a
                href={item.link || "#"}
                target={item.link ? "_blank" : undefined}
                rel={item.link ? "noopener noreferrer" : undefined}
                className="group block overflow-hidden rounded-2xl border border-border bg-background transition-all duration-300 hover:border-primary/20 hover:shadow-xl"
              >
                {item.image_url && (
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={item.image_url}
                      alt={item.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                )}
                <div className="p-6">
                  <p className="mb-2 font-body text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
                    {new Date(item.created_at).toLocaleDateString("az", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                  <h3 className="mb-2 font-display text-xl font-bold text-accent group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="mb-4 font-body text-sm leading-relaxed text-muted-foreground line-clamp-2">
                      {item.description}
                    </p>
                  )}
                  <span className="inline-flex items-center gap-1.5 font-body text-xs font-semibold tracking-wider uppercase text-primary">
                    Ətraflı
                    {item.link ? (
                      <ExternalLink size={12} className="transition-transform group-hover:translate-x-0.5" />
                    ) : (
                      <ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" />
                    )}
                  </span>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
