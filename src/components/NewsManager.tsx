import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2, Eye, EyeOff, Upload } from "lucide-react";

interface NewsItem {
  id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  link: string | null;
  is_published: boolean;
  created_at: string;
}

const NewsManager = () => {
  const [items, setItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();
  const [form, setForm] = useState({ title: "", description: "", link: "" });
  const [imageFile, setImageFile] = useState<File | null>(null);

  const fetchNews = async () => {
    const { data } = await supabase
      .from("news")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setItems(data);
    setLoading(false);
  };

  useEffect(() => { fetchNews(); }, []);

  const uploadImage = async (file: File): Promise<string | null> => {
    const ext = file.name.split(".").pop();
    const path = `news/${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from("media").upload(path, file);
    if (error) {
      toast({ title: "Şəkil yüklənmədi", description: error.message, variant: "destructive" });
      return null;
    }
    const { data } = supabase.storage.from("media").getPublicUrl(path);
    return data.publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) {
      toast({ title: "Başlıq lazımdır", variant: "destructive" });
      return;
    }

    setUploading(true);
    let image_url: string | null = null;
    if (imageFile) {
      image_url = await uploadImage(imageFile);
    }

    const { error } = await supabase.from("news").insert({
      title: form.title.trim(),
      description: form.description.trim() || null,
      link: form.link.trim() || null,
      image_url,
    });

    setUploading(false);
    if (error) {
      toast({ title: "Xəta", description: error.message, variant: "destructive" });
      return;
    }

    toast({ title: "Xəbər əlavə edildi!" });
    setForm({ title: "", description: "", link: "" });
    setImageFile(null);
    fetchNews();
  };

  const togglePublish = async (id: string, current: boolean) => {
    await supabase.from("news").update({ is_published: !current }).eq("id", id);
    fetchNews();
  };

  const deleteItem = async (id: string) => {
    await supabase.from("news").delete().eq("id", id);
    fetchNews();
  };

  return (
    <div className="space-y-6">
      {/* Add form */}
      <form onSubmit={handleSubmit} className="rounded-xl border border-border bg-card p-6 space-y-4">
        <h3 className="font-display text-lg font-bold text-accent">Yeni xəbər əlavə et</h3>
        <input
          value={form.title}
          onChange={(e) => setForm(p => ({ ...p, title: e.target.value }))}
          placeholder="Başlıq *"
          maxLength={200}
          className="w-full border border-border bg-background px-4 py-3 font-body text-sm rounded-lg outline-none focus:border-primary"
        />
        <textarea
          value={form.description}
          onChange={(e) => setForm(p => ({ ...p, description: e.target.value }))}
          placeholder="Qısa təsvir"
          maxLength={500}
          rows={2}
          className="w-full border border-border bg-background px-4 py-3 font-body text-sm rounded-lg outline-none focus:border-primary resize-none"
        />
        <input
          value={form.link}
          onChange={(e) => setForm(p => ({ ...p, link: e.target.value }))}
          placeholder="Link (isteğe bağlı)"
          type="url"
          className="w-full border border-border bg-background px-4 py-3 font-body text-sm rounded-lg outline-none focus:border-primary"
        />
        <div>
          <label className="flex items-center gap-2 cursor-pointer border border-dashed border-border rounded-lg px-4 py-3 hover:border-primary transition-colors">
            <Upload size={16} className="text-muted-foreground" />
            <span className="font-body text-sm text-muted-foreground">
              {imageFile ? imageFile.name : "Şəkil seç"}
            </span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => setImageFile(e.target.files?.[0] || null)}
            />
          </label>
        </div>
        <button
          type="submit"
          disabled={uploading}
          className="flex items-center gap-2 bg-primary px-6 py-2.5 font-body text-sm font-semibold text-primary-foreground rounded-full hover:scale-105 transition-all disabled:opacity-50"
        >
          <Plus size={15} />
          {uploading ? "Yüklənir..." : "Əlavə et"}
        </button>
      </form>

      {/* List */}
      {loading ? (
        <p className="text-muted-foreground text-sm">Yüklənir...</p>
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-4 rounded-xl border border-border bg-background p-4">
              {item.image_url && (
                <img src={item.image_url} alt="" className="h-14 w-14 rounded-lg object-cover flex-shrink-0" />
              )}
              <div className="flex-1 min-w-0">
                <p className="font-body text-sm font-semibold text-accent truncate">{item.title}</p>
                <p className="font-body text-xs text-muted-foreground">
                  {new Date(item.created_at).toLocaleDateString("az")}
                  {!item.is_published && " • Gizli"}
                </p>
              </div>
              <button onClick={() => togglePublish(item.id, item.is_published)} className="p-2 text-muted-foreground hover:text-primary transition-colors">
                {item.is_published ? <Eye size={16} /> : <EyeOff size={16} />}
              </button>
              <button onClick={() => deleteItem(item.id)} className="p-2 text-muted-foreground hover:text-destructive transition-colors">
                <Trash2 size={16} />
              </button>
            </div>
          ))}
          {!items.length && <p className="text-center text-sm text-muted-foreground py-8">Hələ xəbər yoxdur.</p>}
        </div>
      )}
    </div>
  );
};

export default NewsManager;
