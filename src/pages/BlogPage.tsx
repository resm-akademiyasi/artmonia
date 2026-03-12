import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Tag } from "lucide-react";
import { format } from "date-fns";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  image_url: string | null;
  category: string | null;
  created_at: string;
}

const BlogPage = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await supabase
        .from("blog_posts")
        .select("id, title, slug, excerpt, image_url, category, created_at")
        .eq("is_published", true)
        .order("created_at", { ascending: false });
      if (data) setPosts(data as BlogPost[]);
      setLoading(false);
    };
    fetchPosts();
  }, []);

  const categories = [...new Set(posts.map((p) => p.category).filter(Boolean))];
  const filtered = activeCategory ? posts.filter((p) => p.category === activeCategory) : posts;

  return (
    <main className="pt-24 pb-20">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-16 text-center">
            <p className="mb-4 font-body text-[11px] tracking-[0.3em] uppercase text-primary">İncəsənət dünyası</p>
            <h1 className="font-display text-4xl font-bold text-accent md:text-5xl lg:text-6xl">
              Sənət <span className="italic text-primary">bloqu</span>
            </h1>
            <p className="mt-4 font-body text-sm text-muted-foreground">Rəsm texnikaları, sənət tarixi və yaradıcılıq haqqında maraqlı məqalələr</p>
          </motion.div>

          {/* Categories */}
          {categories.length > 0 && (
            <div className="mb-10 flex flex-wrap justify-center gap-2">
              <button onClick={() => setActiveCategory(null)} className={`px-4 py-1.5 rounded-full font-body text-xs font-medium transition-all ${!activeCategory ? "bg-primary text-primary-foreground" : "border border-border text-muted-foreground hover:border-primary hover:text-primary"}`}>
                Hamısı
              </button>
              {categories.map((cat) => (
                <button key={cat} onClick={() => setActiveCategory(cat!)} className={`px-4 py-1.5 rounded-full font-body text-xs font-medium transition-all ${activeCategory === cat ? "bg-primary text-primary-foreground" : "border border-border text-muted-foreground hover:border-primary hover:text-primary"}`}>
                  {cat}
                </button>
              ))}
            </div>
          )}

          {loading ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, i) => <div key={i} className="animate-pulse rounded-2xl bg-muted h-72" />)}
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((post, i) => (
                <motion.div key={post.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: i * 0.08 }}>
                  <Link to={`/blog/${post.slug}`} className="group block overflow-hidden rounded-2xl border border-border/60 bg-background transition-all hover:shadow-xl hover:border-primary/20">
                    {post.image_url && (
                      <div className="aspect-video overflow-hidden">
                        <img src={post.image_url} alt={post.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                      </div>
                    )}
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        {post.category && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-0.5 font-body text-[10px] font-medium text-primary">
                            <Tag size={10} /> {post.category}
                          </span>
                        )}
                        <span className="flex items-center gap-1 font-body text-[10px] text-muted-foreground">
                          <Calendar size={10} /> {format(new Date(post.created_at), "dd MMM yyyy")}
                        </span>
                      </div>
                      <h2 className="font-display text-lg font-bold text-accent group-hover:text-primary transition-colors mb-2">{post.title}</h2>
                      {post.excerpt && <p className="font-body text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>}
                      <span className="mt-4 inline-flex items-center gap-1.5 font-body text-xs font-semibold text-primary">
                        Oxu <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}

          {!loading && filtered.length === 0 && <p className="text-center font-body text-sm text-muted-foreground">Bu kateqoriyada məqalə yoxdur.</p>}
        </div>
      </div>
    </main>
  );
};

export default BlogPage;
