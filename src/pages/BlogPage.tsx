import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar } from "lucide-react";
import { format } from "date-fns";

interface NewsItem {
  id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  created_at: string;
  link: string | null;
}

const BlogPage = () => {
  const [articles, setArticles] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      const { data } = await supabase
        .from("news")
        .select("*")
        .eq("is_published", true)
        .order("created_at", { ascending: false });
      if (data) setArticles(data);
      setLoading(false);
    };
    fetchArticles();
  }, []);

  return (
    <main className="pt-24 pb-20">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16 text-center"
          >
            <p className="mb-4 font-body text-[11px] tracking-[0.3em] uppercase text-primary">
              Blog & Məqalələr
            </p>
            <h1 className="font-display text-4xl font-bold text-accent md:text-5xl lg:text-6xl">
              Sənət <span className="italic text-primary">dünyası</span>
            </h1>
            <p className="mt-4 font-body text-sm text-muted-foreground">
              Rəsm, sənət tarixi və yaradıcılıq haqqında məqalələr
            </p>
          </motion.div>

          {loading ? (
            <div className="grid gap-8 md:grid-cols-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="animate-pulse rounded-2xl bg-muted h-72" />
              ))}
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2">
              {articles.map((article, i) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <Link
                    to={`/news/${article.id}`}
                    className="group block overflow-hidden rounded-2xl border border-border/60 bg-background transition-all hover:shadow-xl hover:border-primary/20"
                  >
                    {article.image_url && (
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={article.image_url}
                          alt={article.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <Calendar size={12} className="text-muted-foreground" />
                        <span className="font-body text-[10px] text-muted-foreground">
                          {format(new Date(article.created_at), "dd MMM yyyy")}
                        </span>
                      </div>
                      <h2 className="font-display text-xl font-bold text-accent group-hover:text-primary transition-colors mb-2">
                        {article.title}
                      </h2>
                      {article.description && (
                        <p className="font-body text-sm text-muted-foreground line-clamp-2">
                          {article.description}
                        </p>
                      )}
                      <span className="mt-4 inline-flex items-center gap-1.5 font-body text-xs font-semibold text-primary">
                        Daha ətraflı
                        <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}

          {!loading && articles.length === 0 && (
            <p className="text-center font-body text-sm text-muted-foreground">
              Hələlik məqalə yoxdur.
            </p>
          )}
        </div>
      </div>
    </main>
  );
};

export default BlogPage;
