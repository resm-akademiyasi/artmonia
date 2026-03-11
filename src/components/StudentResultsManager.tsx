import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2, Eye, EyeOff, Upload } from "lucide-react";

interface StudentResult {
  id: string;
  student_name: string;
  achievement: string | null;
  before_image_url: string | null;
  after_image_url: string | null;
  is_published: boolean;
  display_order: number;
  created_at: string;
}

const StudentResultsManager = () => {
  const [items, setItems] = useState<StudentResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();
  const [form, setForm] = useState({ student_name: "", achievement: "", display_order: "0", duration_months: "" });
  const [beforeFile, setBeforeFile] = useState<File | null>(null);
  const [afterFile, setAfterFile] = useState<File | null>(null);

  const fetchResults = async () => {
    const { data } = await supabase
      .from("student_results")
      .select("*")
      .order("display_order", { ascending: true });
    if (data) setItems(data);
    setLoading(false);
  };

  useEffect(() => { fetchResults(); }, []);

  const uploadImage = async (file: File, prefix: string): Promise<string | null> => {
    const ext = file.name.split(".").pop();
    const path = `results/${prefix}-${Date.now()}.${ext}`;
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
    if (!form.student_name.trim()) {
      toast({ title: "Tələbə adı lazımdır", variant: "destructive" });
      return;
    }

    setUploading(true);
    let before_image_url: string | null = null;
    let after_image_url: string | null = null;

    if (beforeFile) before_image_url = await uploadImage(beforeFile, "before");
    if (afterFile) after_image_url = await uploadImage(afterFile, "after");

    const { error } = await supabase.from("student_results").insert({
      student_name: form.student_name.trim(),
      achievement: form.achievement.trim() || null,
      before_image_url,
      after_image_url,
      display_order: parseInt(form.display_order) || 0,
    });

    setUploading(false);
    if (error) {
      toast({ title: "Xəta", description: error.message, variant: "destructive" });
      return;
    }

    toast({ title: "Nəticə əlavə edildi!" });
    setForm({ student_name: "", achievement: "", display_order: "0" });
    setBeforeFile(null);
    setAfterFile(null);
    fetchResults();
  };

  const togglePublish = async (id: string, current: boolean) => {
    await supabase.from("student_results").update({ is_published: !current }).eq("id", id);
    fetchResults();
  };

  const deleteItem = async (id: string) => {
    await supabase.from("student_results").delete().eq("id", id);
    fetchResults();
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="rounded-xl border border-border bg-card p-6 space-y-4">
        <h3 className="font-display text-lg font-bold text-accent">Yeni nəticə əlavə et</h3>
        <input
          value={form.student_name}
          onChange={(e) => setForm(p => ({ ...p, student_name: e.target.value }))}
          placeholder="Tələbə adı *"
          maxLength={100}
          className="w-full border border-border bg-background px-4 py-3 font-body text-sm rounded-lg outline-none focus:border-primary"
        />
        <input
          value={form.achievement}
          onChange={(e) => setForm(p => ({ ...p, achievement: e.target.value }))}
          placeholder="Nailiyyət (məs: '300 AZN-ə satıldı')"
          maxLength={200}
          className="w-full border border-border bg-background px-4 py-3 font-body text-sm rounded-lg outline-none focus:border-primary"
        />
        <input
          value={form.display_order}
          onChange={(e) => setForm(p => ({ ...p, display_order: e.target.value }))}
          placeholder="Sıra (0, 1, 2...)"
          type="number"
          className="w-full border border-border bg-background px-4 py-3 font-body text-sm rounded-lg outline-none focus:border-primary"
        />
        <div className="grid grid-cols-2 gap-4">
          <label className="flex items-center gap-2 cursor-pointer border border-dashed border-border rounded-lg px-4 py-3 hover:border-primary transition-colors">
            <Upload size={16} className="text-muted-foreground" />
            <span className="font-body text-xs text-muted-foreground truncate">
              {beforeFile ? beforeFile.name : "Əvvəl şəkli"}
            </span>
            <input type="file" accept="image/*" className="hidden" onChange={(e) => setBeforeFile(e.target.files?.[0] || null)} />
          </label>
          <label className="flex items-center gap-2 cursor-pointer border border-dashed border-border rounded-lg px-4 py-3 hover:border-primary transition-colors">
            <Upload size={16} className="text-muted-foreground" />
            <span className="font-body text-xs text-muted-foreground truncate">
              {afterFile ? afterFile.name : "Sonra şəkli"}
            </span>
            <input type="file" accept="image/*" className="hidden" onChange={(e) => setAfterFile(e.target.files?.[0] || null)} />
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

      {loading ? (
        <p className="text-muted-foreground text-sm">Yüklənir...</p>
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-4 rounded-xl border border-border bg-background p-4">
              <div className="flex gap-1 flex-shrink-0">
                {item.before_image_url && <img src={item.before_image_url} alt="" className="h-12 w-12 rounded-lg object-cover" />}
                {item.after_image_url && <img src={item.after_image_url} alt="" className="h-12 w-12 rounded-lg object-cover" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-body text-sm font-semibold text-accent truncate">{item.student_name}</p>
                <p className="font-body text-xs text-muted-foreground truncate">
                  {item.achievement || "—"} • Sıra: {item.display_order}
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
          {!items.length && <p className="text-center text-sm text-muted-foreground py-8">Hələ nəticə yoxdur.</p>}
        </div>
      )}
    </div>
  );
};

export default StudentResultsManager;
