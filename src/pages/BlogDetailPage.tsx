import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import { format } from "date-fns";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  image_url: string | null;
  category: string | null;
  created_at: string;
}

const BlogDetailPage = () => {
  const { slug } = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      const { data } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug)
        .eq("is_published", true)
        .maybeSingle();
      if (data) setPost(data as BlogPost);
      setLoading(false);
    };
    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-3xl animate-pulse space-y-4">
            <div className="h-8 w-2/3 rounded bg-muted" />
            <div className="h-64 rounded-2xl bg-muted" />
          </div>
        </div>
      </main>
    );
  }

  if (!post) {
    return (
      <main className="flex min-h-screen items-center justify-center pt-20">
        <div className="text-center">
          <h1 className="font-display text-2xl font-bold text-accent">Məqalə tapılmadı</h1>
          <Link to="/blog" className="mt-4 inline-flex items-center gap-2 font-body text-sm text-primary hover:underline">
            <ArrowLeft size={14} /> Bloqa qayıt
          </Link>
        </div>
      </main>
    );
  }

  // Simple markdown-like rendering
  const renderContent = (content: string) => {
    return content.split("\n").map((line, i) => {
      if (line.startsWith("# ")) return <h1 key={i} className="font-display text-3xl font-bold text-accent mt-8 mb-4">{line.slice(2)}</h1>;
      if (line.startsWith("## ")) return <h2 key={i} className="font-display text-2xl font-bold text-accent mt-6 mb-3">{line.slice(3)}</h2>;
      if (line.startsWith("### ")) return <h3 key={i} className="font-display text-xl font-bold text-accent mt-4 mb-2">{line.slice(4)}</h3>;
      if (line.startsWith("- ")) return <li key={i} className="ml-6 font-body text-base leading-relaxed text-foreground/80 list-disc">{line.slice(2)}</li>;
      if (line.match(/^\d+\. /)) return <li key={i} className="ml-6 font-body text-base leading-relaxed text-foreground/80 list-decimal">{line.replace(/^\d+\. /, "")}</li>;
      if (line.trim() === "") return <br key={i} />;
      // bold — safe: escape HTML first, then apply bold
      const escaped = line.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
      const boldParsed = escaped.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      return <p key={i} className="font-body text-base leading-relaxed text-foreground/80 mb-2" dangerouslySetInnerHTML={{ __html: boldParsed }} />;
    });
  };

  return (
    <main className="pt-24 pb-20">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-3xl">
          <Link to="/blog" className="mb-8 inline-flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft size={14} /> Bloqa qayıt
          </Link>

          <motion.article initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-3 mb-4">
              {post.category && (
                <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 font-body text-xs font-medium text-primary">
                  <Tag size={12} /> {post.category}
                </span>
              )}
              <span className="flex items-center gap-1 font-body text-xs text-muted-foreground">
                <Calendar size={12} /> {format(new Date(post.created_at), "dd MMM yyyy")}
              </span>
            </div>

            <h1 className="font-display text-3xl font-bold text-accent md:text-4xl lg:text-5xl mb-6">{post.title}</h1>

            {post.image_url && (
              <div className="mb-8 overflow-hidden rounded-2xl">
                <img src={post.image_url} alt={post.title} className="w-full object-cover" />
              </div>
            )}

            <div className="prose-custom">{renderContent(post.content)}</div>
          </motion.article>
        </div>
      </div>
    </main>
  );
};

export default BlogDetailPage;
