import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2, Eye, EyeOff } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  image_url: string | null;
  category: string | null;
  is_published: boolean;
  created_at: string;
}

const BlogManager = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const [form, setForm] = useState({ title: "", slug: "", content: "", excerpt: "", category: "Ümumi", image_url: "" });

  const fetchPosts = async () => {
    const { data } = await supabase.from("blog_posts").select("*").order("created_at", { ascending: false });
    if (data) setPosts(data as BlogPost[]);
    setLoading(false);
  };

  useEffect(() => { fetchPosts(); }, []);

  const generateSlug = (title: string) =>
    title.toLowerCase().replace(/[^a-z0-9əüöğıçş]+/g, "-").replace(/^-|-$/g, "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.content.trim()) {
      toast({ title: "Başlıq və məzmun lazımdır", variant: "destructive" });
      return;
    }
    const slug = form.slug.trim() || generateSlug(form.title);
    const { error } = await supabase.from("blog_posts").insert({
      title: form.title.trim(),
      slug,
      content: form.content.trim(),
      excerpt: form.excerpt.trim() || null,
      category: form.category || "Ümumi",
      image_url: form.image_url.trim() || null,
    });
    if (error) {
      toast({ title: "Xəta", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Blog yazısı əlavə edildi!" });
    setForm({ title: "", slug: "", content: "", excerpt: "", category: "Ümumi", image_url: "" });
    fetchPosts();
  };

  const togglePublish = async (id: string, current: boolean) => {
    await supabase.from("blog_posts").update({ is_published: !current }).eq("id", id);
    fetchPosts();
  };

  const deletePost = async (id: string) => {
    await supabase.from("blog_posts").delete().eq("id", id);
    fetchPosts();
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="rounded-xl border border-border bg-card p-6 space-y-4">
        <h3 className="font-display text-lg font-bold text-accent">Yeni blog yazısı</h3>
        <input value={form.title} onChange={(e) => setForm(p => ({ ...p, title: e.target.value }))} placeholder="Başlıq *" className="w-full border border-border bg-background px-4 py-3 font-body text-sm rounded-lg outline-none focus:border-primary" />
        <input value={form.slug} onChange={(e) => setForm(p => ({ ...p, slug: e.target.value }))} placeholder="Slug (avtomatik yaradılır)" className="w-full border border-border bg-background px-4 py-3 font-body text-sm rounded-lg outline-none focus:border-primary" />
        <input value={form.category} onChange={(e) => setForm(p => ({ ...p, category: e.target.value }))} placeholder="Kateqoriya" className="w-full border border-border bg-background px-4 py-3 font-body text-sm rounded-lg outline-none focus:border-primary" />
        <input value={form.image_url} onChange={(e) => setForm(p => ({ ...p, image_url: e.target.value }))} placeholder="Şəkil URL" className="w-full border border-border bg-background px-4 py-3 font-body text-sm rounded-lg outline-none focus:border-primary" />
        <textarea value={form.excerpt} onChange={(e) => setForm(p => ({ ...p, excerpt: e.target.value }))} placeholder="Qısa təsvir" rows={2} className="w-full border border-border bg-background px-4 py-3 font-body text-sm rounded-lg outline-none focus:border-primary resize-none" />
        <textarea value={form.content} onChange={(e) => setForm(p => ({ ...p, content: e.target.value }))} placeholder="Məzmun (Markdown dəstəklənir) *" rows={8} className="w-full border border-border bg-background px-4 py-3 font-body text-sm rounded-lg outline-none focus:border-primary resize-y" />
        <button type="submit" className="flex items-center gap-2 bg-primary px-6 py-2.5 font-body text-sm font-semibold text-primary-foreground rounded-full hover:scale-105 transition-all">
          <Plus size={15} /> Əlavə et
        </button>
      </form>

      {loading ? <p className="text-sm text-muted-foreground">Yüklənir...</p> : (
        <div className="space-y-3">
          {posts.map((post) => (
            <div key={post.id} className="flex items-center gap-4 rounded-xl border border-border bg-background p-4">
              <div className="flex-1 min-w-0">
                <p className="font-body text-sm font-semibold text-accent truncate">{post.title}</p>
                <p className="font-body text-xs text-muted-foreground">{post.category} • {new Date(post.created_at).toLocaleDateString("az")}{!post.is_published && " • Gizli"}</p>
              </div>
              <button onClick={() => togglePublish(post.id, post.is_published)} className="p-2 text-muted-foreground hover:text-primary transition-colors">
                {post.is_published ? <Eye size={16} /> : <EyeOff size={16} />}
              </button>
              <button onClick={() => deletePost(post.id)} className="p-2 text-muted-foreground hover:text-destructive transition-colors">
                <Trash2 size={16} />
              </button>
            </div>
          ))}
          {!posts.length && <p className="text-center text-sm text-muted-foreground py-8">Hələ blog yazısı yoxdur.</p>}
        </div>
      )}
    </div>
  );
};

export default BlogManager;
