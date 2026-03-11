import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2, Eye, EyeOff, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

interface Teacher {
  id: string;
  full_name: string;
  title: string | null;
  bio: string | null;
  photo_url: string | null;
  specialties: string[];
  display_order: number;
  is_published: boolean;
}

const TeachersManager = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [specialtyInput, setSpecialtyInput] = useState("");
  const [form, setForm] = useState({
    full_name: "",
    title: "",
    bio: "",
    photo_url: "",
    specialties: [] as string[],
    is_published: true,
  });
  const { toast } = useToast();

  const fetchTeachers = async () => {
    const { data } = await supabase
      .from("teachers")
      .select("*")
      .order("display_order", { ascending: true });
    if (data) setTeachers(data as unknown as Teacher[]);
    setLoading(false);
  };

  useEffect(() => { fetchTeachers(); }, []);

  const uploadPhoto = async (file: File) => {
    setUploading(true);
    const ext = file.name.split(".").pop();
    const path = `teachers/${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from("media").upload(path, file);
    if (error) {
      toast({ title: "Yükləmə xətası", description: error.message, variant: "destructive" });
      setUploading(false);
      return;
    }
    const { data: urlData } = supabase.storage.from("media").getPublicUrl(path);
    setForm((prev) => ({ ...prev, photo_url: urlData.publicUrl }));
    setUploading(false);
    toast({ title: "Şəkil yükləndi" });
  };

  const addSpecialty = () => {
    const val = specialtyInput.trim();
    if (val && !form.specialties.includes(val)) {
      setForm((prev) => ({ ...prev, specialties: [...prev.specialties, val] }));
      setSpecialtyInput("");
    }
  };

  const removeSpecialty = (s: string) => {
    setForm((prev) => ({ ...prev, specialties: prev.specialties.filter((x) => x !== s) }));
  };

  const handleSubmit = async () => {
    if (!form.full_name) {
      toast({ title: "Ad tələb olunur", variant: "destructive" });
      return;
    }
    const { error } = await supabase.from("teachers").insert({
      full_name: form.full_name,
      title: form.title || null,
      bio: form.bio || null,
      photo_url: form.photo_url || null,
      specialties: form.specialties,
      is_published: form.is_published,
      display_order: teachers.length,
    });
    if (error) {
      toast({ title: "Xəta", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Müəllim əlavə edildi" });
    setForm({ full_name: "", title: "", bio: "", photo_url: "", specialties: [], is_published: true });
    setShowForm(false);
    fetchTeachers();
  };

  const togglePublish = async (id: string, current: boolean) => {
    await supabase.from("teachers").update({ is_published: !current }).eq("id", id);
    fetchTeachers();
  };

  const deleteTeacher = async (id: string) => {
    if (!confirm("Silmək istədiyinizə əminsiniz?")) return;
    await supabase.from("teachers").delete().eq("id", id);
    toast({ title: "Silindi" });
    fetchTeachers();
  };

  if (loading) return <p className="text-muted-foreground text-sm py-8 text-center">Yüklənir...</p>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-lg font-bold text-accent">Müəllimlər</h3>
        <Button onClick={() => setShowForm(!showForm)} size="sm" className="gap-1.5">
          <Plus size={14} /> Yeni müəllim
        </Button>
      </div>

      {showForm && (
        <div className="rounded-xl border border-border bg-card p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-xs text-muted-foreground">Ad Soyad *</Label>
              <Input
                value={form.full_name}
                onChange={(e) => setForm({ ...form, full_name: e.target.value })}
                placeholder="Müəllimin adı"
              />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Titul / Vəzifə</Label>
              <Input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="Baş müəllim, Rəsm ustası..."
              />
            </div>
          </div>

          <div>
            <Label className="text-xs text-muted-foreground">Haqqında</Label>
            <Textarea
              value={form.bio}
              onChange={(e) => setForm({ ...form, bio: e.target.value })}
              placeholder="Müəllim haqqında qısa məlumat..."
              rows={3}
            />
          </div>

          {/* Photo */}
          <div>
            <Label className="text-xs text-muted-foreground">Şəkil</Label>
            <div className="flex gap-2 mt-1">
              <Input
                value={form.photo_url}
                onChange={(e) => setForm({ ...form, photo_url: e.target.value })}
                placeholder="URL və ya yüklə"
                className="flex-1"
              />
              <label className="cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => e.target.files?.[0] && uploadPhoto(e.target.files[0])}
                />
                <Button type="button" variant="outline" size="icon" asChild disabled={uploading}>
                  <span><Upload size={14} /></span>
                </Button>
              </label>
            </div>
            {form.photo_url && (
              <img src={form.photo_url} alt="" className="mt-2 h-24 w-24 rounded-xl object-cover" />
            )}
          </div>

          {/* Specialties */}
          <div>
            <Label className="text-xs text-muted-foreground">İxtisaslar</Label>
            <div className="flex gap-2 mt-1">
              <Input
                value={specialtyInput}
                onChange={(e) => setSpecialtyInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSpecialty())}
                placeholder="Rəsm, Heykəltəraşlıq..."
                className="flex-1"
              />
              <Button type="button" variant="outline" size="sm" onClick={addSpecialty}>
                Əlavə et
              </Button>
            </div>
            {form.specialties.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {form.specialties.map((s) => (
                  <Badge key={s} variant="secondary" className="gap-1 cursor-pointer" onClick={() => removeSpecialty(s)}>
                    {s} <X size={12} />
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Switch
              checked={form.is_published}
              onCheckedChange={(v) => setForm({ ...form, is_published: v })}
            />
            <Label className="text-xs">Dərc et</Label>
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
        {teachers.map((t) => (
          <div key={t.id} className="flex items-center gap-4 rounded-xl border border-border bg-card p-4">
            {t.photo_url ? (
              <img src={t.photo_url} alt="" className="h-14 w-14 rounded-full object-cover flex-shrink-0" />
            ) : (
              <div className="h-14 w-14 rounded-full bg-muted flex-shrink-0 flex items-center justify-center font-display text-lg font-bold text-muted-foreground">
                {t.full_name.charAt(0)}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="font-display text-sm font-bold text-accent">{t.full_name}</p>
              {t.title && <p className="font-body text-xs text-primary">{t.title}</p>}
              {t.specialties.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-1">
                  {t.specialties.map((s) => (
                    <span key={s} className="text-[10px] bg-muted px-2 py-0.5 rounded-full text-muted-foreground">{s}</span>
                  ))}
                </div>
              )}
            </div>
            <button
              onClick={() => togglePublish(t.id, t.is_published)}
              className="text-muted-foreground hover:text-accent transition-colors"
            >
              {t.is_published ? <Eye size={16} /> : <EyeOff size={16} />}
            </button>
            <button
              onClick={() => deleteTeacher(t.id)}
              className="text-muted-foreground hover:text-destructive transition-colors"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
        {!teachers.length && (
          <p className="text-center text-sm text-muted-foreground py-8">Hələ müəllim yoxdur.</p>
        )}
      </div>
    </div>
  );
};

export default TeachersManager;
