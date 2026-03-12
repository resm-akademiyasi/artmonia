import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Save } from "lucide-react";
import { invalidateSettings } from "@/hooks/use-settings";

interface Setting {
  id: string;
  key: string;
  value: string;
  label: string | null;
}

const SettingsManager = () => {
  const [settings, setSettings] = useState<Setting[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.from("site_settings").select("*").order("key");
      if (data) setSettings(data as Setting[]);
      setLoading(false);
    };
    fetch();
  }, []);

  const updateValue = (id: string, value: string) => {
    setSettings((prev) => prev.map((s) => (s.id === id ? { ...s, value } : s)));
  };

  const handleSave = async () => {
    setSaving(true);
    for (const s of settings) {
      await supabase.from("site_settings").update({ value: s.value, updated_at: new Date().toISOString() }).eq("id", s.id);
    }
    invalidateSettings();
    setSaving(false);
    toast({ title: "Parametrlər yadda saxlanıldı!" });
  };

  if (loading) return <p className="text-sm text-muted-foreground">Yüklənir...</p>;

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-border bg-card p-6 space-y-4">
        <h3 className="font-display text-lg font-bold text-accent">Sayt parametrləri</h3>
        <p className="font-body text-xs text-muted-foreground">Qiymətləri, Google Reviews məlumatlarını və digər dəyərləri buradan dəyişə bilərsiniz.</p>
        <div className="grid gap-4 md:grid-cols-2">
          {settings.map((s) => (
            <div key={s.id}>
              <label className="mb-1 block font-body text-xs font-medium text-muted-foreground">
                {s.label || s.key}
              </label>
              <input
                value={s.value}
                onChange={(e) => updateValue(s.id, e.target.value)}
                className="w-full border border-border bg-background px-4 py-2.5 font-body text-sm rounded-lg outline-none focus:border-primary"
              />
            </div>
          ))}
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 bg-primary px-6 py-2.5 font-body text-sm font-semibold text-primary-foreground rounded-full hover:scale-105 transition-all disabled:opacity-50"
        >
          <Save size={15} />
          {saving ? "Saxlanılır..." : "Yadda saxla"}
        </button>
      </div>
    </div>
  );
};

export default SettingsManager;
