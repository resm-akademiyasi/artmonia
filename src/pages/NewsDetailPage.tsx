import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface NewsItem {
  id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  link: string | null;
  created_at: string;
}

const NewsDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [item, setItem] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      if (!id) return;
      const { data } = await supabase
        .from("news")
        .select("*")
        .eq("id", id)
        .eq("is_published", true)
        .single();
      if (data) setItem(data);
      setLoading(false);
    };
    fetch();
  }, [id]);

  if (loading) {
    return (
      <main className="pt-20">
        <div className="container mx-auto px-6 py-20 text-center">
          <p className="text-muted-foreground text-sm">Yüklənir...</p>
        </div>
      </main>
    );
  }

  if (!item) {
    return (
      <main className="pt-20">
        <div className="container mx-auto px-6 py-20 text-center">
          <h1 className="font-display text-3xl font-bold text-accent mb-4">Xəbər tapılmadı</h1>
          <Link to="/" className="font-body text-sm text-primary hover:text-accent transition-colors">
            ← Ana səhifəyə qayıt
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-20">
      <article className="section-padding">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-3xl">
            <Link
              to="/"
              className="group mb-8 inline-flex items-center gap-2 font-body text-xs font-semibold tracking-wider uppercase text-primary hover:text-accent transition-colors"
            >
              <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
              Geri qayıt
            </Link>

            <p className="mb-4 font-body text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
              {new Date(item.created_at).toLocaleDateString("az", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>

            <h1 className="font-display text-3xl font-bold text-accent md:text-4xl lg:text-5xl mb-8">
              {item.title}
            </h1>

            {item.image_url && (
              <div className="mb-10 overflow-hidden rounded-2xl">
                <img
                  src={item.image_url}
                  alt={item.title}
                  className="w-full object-cover"
                />
              </div>
            )}

            {item.description && (
              <div className="font-body text-base leading-relaxed text-foreground/80 whitespace-pre-line">
                {item.description}
              </div>
            )}

            {item.link && (
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-2 font-body text-sm font-semibold text-primary hover:text-accent transition-colors"
              >
                Xarici linkə keç →
              </a>
            )}
          </div>
        </div>
      </article>
    </main>
  );
};

export default NewsDetailPage;
