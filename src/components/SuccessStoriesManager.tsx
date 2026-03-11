import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2, GripVertical, Eye, EyeOff, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface SuccessStory {
  id: string;
  student_name: string;
  testimonial: string;
  thumbnail_url: string | null;
  video_url: string | null;
  display_order: number;
  is_published: boolean;
}

const SuccessStoriesManager = () => {
  const [stories, setStories] = useState<SuccessStory[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    student_name: "",
    testimonial: "",
    thumbnail_url: "",
    video_url: "",
    is_published: true,
  });
  const { toast } = useToast();

  const fetchStories = async () => {
    const { data } = await supabase
      .from("success_stories")
      .select("*")
      .order("display_order", { ascending: true });
    if (data) setStories(data as unknown as SuccessStory[]);
    setLoading(false);
  };

  useEffect(() => { fetchStories(); }, []);

  const uploadFile = async (file: File, type: "thumbnail" | "video") => {
    setUploading(true);
    const ext = file.name.split(".").pop();
    const path = `stories/${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from("media").upload(path, file);
    if (error) {
      toast({ title: "Yükləmə xətası", description: error.message, variant: "destructive" });
      setUploading(false);
      return;
    }
    const { data: urlData } = supabase.storage.from("media").getPublicUrl(path);
    setForm((prev) => ({
      ...prev,
      [type === "thumbnail" ? "thumbnail_url" : "video_url"]: urlData.publicUrl,
    }));
    setUploading(false);
    toast({ title: `${type === "thumbnail" ? "Şəkil" : "Video"} yükləndi` });
  };

  const handleSubmit = async () => {
    if (!form.student_name || !form.testimonial) {
      toast({ title: "Ad və rəy tələb olunur", variant: "destructive" });
      return;
    }
    const { error } = await supabase.from("success_stories").insert({
      student_name: form.student_name,
      testimonial: form.testimonial,
      thumbnail_url: form.thumbnail_url || null,
      video_url: form.video_url || null,
      is_published: form.is_published,
      display_order: stories.length,
    });
    if (error) {
      toast({ title: "Xəta", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Hekayə əlavə edildi" });
    setForm({ student_name: "", testimonial: "", thumbnail_url: "", video_url: "", is_published: true });
    setShowForm(false);
    fetchStories();
  };

  const togglePublish = async (id: string, current: boolean) => {
    await supabase.from("success_stories").update({ is_published: !current }).eq("id", id);
    fetchStories();
  };

  const deleteStory = async (id: string) => {
    if (!confirm("Silmək istədiyinizə əminsiniz?")) return;
    await supabase.from("success_stories").delete().eq("id", id);
    toast({ title: "Silindi" });
    fetchStories();
  };

  if (loading) return <p className="text-muted-foreground text-sm py-8 text-center">Yüklənir...</p>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-lg font-bold text-accent">Uğur Hekayələri</h3>
        <Button onClick={() => setShowForm(!showForm)} size="sm" className="gap-1.5">
          <Plus size={14} /> Yeni hekayə
        </Button>
      </div>

      {showForm && (
        <div className="rounded-xl border border-border bg-card p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-xs text-muted-foreground">Tələbə adı *</Label>
              <Input
                value={form.student_name}
                onChange={(e) => setForm({ ...form, student_name: e.target.value })}
                placeholder="Ad Soyad"
              />
            </div>
            <div className="flex items-center gap-2 pt-5">
              <Switch
                checked={form.is_published}
                onCheckedChange={(v) => setForm({ ...form, is_published: v })}
              />
              <Label className="text-xs">Dərc et</Label>
            </div>
          </div>

          <div>
            <Label className="text-xs text-muted-foreground">Rəy *</Label>
            <Textarea
              value={form.testimonial}
              onChange={(e) => setForm({ ...form, testimonial: e.target.value })}
              placeholder="Artmonia yaradıcılığa baxışımı dəyişdi..."
              rows={2}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-xs text-muted-foreground">Thumbnail şəkil</Label>
              <div className="flex gap-2 mt-1">
                <Input
                  value={form.thumbnail_url}
                  onChange={(e) => setForm({ ...form, thumbnail_url: e.target.value })}
                  placeholder="URL və ya yüklə"
                  className="flex-1"
                />
                <label className="cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => e.target.files?.[0] && uploadFile(e.target.files[0], "thumbnail")}
                  />
                  <Button type="button" variant="outline" size="icon" asChild disabled={uploading}>
                    <span><Upload size={14} /></span>
                  </Button>
                </label>
              </div>
              {form.thumbnail_url && (
                <img src={form.thumbnail_url} alt="" className="mt-2 h-20 rounded-lg object-cover" />
              )}
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Video</Label>
              <div className="flex gap-2 mt-1">
                <Input
                  value={form.video_url}
                  onChange={(e) => setForm({ ...form, video_url: e.target.value })}
                  placeholder="Video URL və ya yüklə"
                  className="flex-1"
                />
                <label className="cursor-pointer">
                  <input
                    type="file"
                    accept="video/*"
                    className="hidden"
                    onChange={(e) => e.target.files?.[0] && uploadFile(e.target.files[0], "video")}
                  />
                  <Button type="button" variant="outline" size="icon" asChild disabled={uploading}>
                    <span><Upload size={14} /></span>
                  </Button>
                </label>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" size="sm" onClick={() => setShowForm(false)}>Ləğv et</Button>
            <Button size="sm" onClick={handleSubmit} disabled={uploading}>
              {uploading ? "Yüklənir..." : "Əlavə et"}
            </Button>
          </div>
        </div>
      )}

      {/* List */}
      <div className="space-y-3">
        {stories.map((s) => (
          <div key={s.id} className="flex items-center gap-4 rounded-xl border border-border bg-card p-4">
            <GripVertical size={16} className="text-muted-foreground/40" />
            {s.thumbnail_url ? (
              <img src={s.thumbnail_url} alt="" className="h-16 w-12 rounded-lg object-cover flex-shrink-0" />
            ) : (
              <div className="h-16 w-12 rounded-lg bg-muted flex-shrink-0" />
            )}
            <div className="flex-1 min-w-0">
              <p className="font-display text-sm font-bold text-accent truncate">{s.student_name}</p>
              <p className="font-body text-xs text-muted-foreground truncate italic">"{s.testimonial}"</p>
              <p className="font-body text-[10px] text-muted-foreground/60 mt-0.5">
                {s.video_url ? "🎬 Video var" : "⏳ Video yoxdur"}
              </p>
            </div>
            <button
              onClick={() => togglePublish(s.id, s.is_published)}
              className="text-muted-foreground hover:text-accent transition-colors"
              title={s.is_published ? "Gizlət" : "Dərc et"}
            >
              {s.is_published ? <Eye size={16} /> : <EyeOff size={16} />}
            </button>
            <button
              onClick={() => deleteStory(s.id)}
              className="text-muted-foreground hover:text-destructive transition-colors"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
        {!stories.length && (
          <p className="text-center text-sm text-muted-foreground py-8">Hələ hekayə yoxdur.</p>
        )}
      </div>
    </div>
  );
};

export default SuccessStoriesManager;
