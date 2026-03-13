import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Save, ChevronDown } from "lucide-react";
import { invalidateSettings } from "@/hooks/use-settings";

interface Setting {
  id: string;
  key: string;
  value: string;
  label: string | null;
}

const categoryMap: Record<string, string> = {
  price_mini: "Qiymətlər",
  price_standard: "Qiymətlər",
  price_premium: "Qiymətlər",
  calc_base_price: "Qiymətlər",
  plan_mini_desc: "Plan detalları",
  plan_standard_desc: "Plan detalları",
  plan_premium_desc: "Plan detalları",
  plan_mini_features: "Plan detalları",
  plan_standard_features: "Plan detalları",
  plan_premium_features: "Plan detalları",
  google_review_rating: "Google Reviews",
  google_review_count: "Google Reviews",
  whatsapp_number: "Əlaqə",
};

const categoryOrder = ["Qiymətlər", "Plan detalları", "Google Reviews", "Əlaqə", "Digər"];

const SettingsManager = () => {
  const [settings, setSettings] = useState<Setting[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});
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

  const grouped = settings.reduce<Record<string, Setting[]>>((acc, s) => {
    const cat = categoryMap[s.key] || "Digər";
    (acc[cat] = acc[cat] || []).push(s);
    return acc;
  }, {});

  const toggle = (cat: string) => setCollapsed((p) => ({ ...p, [cat]: !p[cat] }));

  if (loading) return <p className="text-sm text-muted-foreground">Yüklənir...</p>;

  return (
    <div className="space-y-4">
      {categoryOrder.filter((c) => grouped[c]?.length).map((cat) => (
        <div key={cat} className="rounded-xl border border-border bg-card overflow-hidden">
          <button
            onClick={() => toggle(cat)}
            className="flex w-full items-center justify-between px-6 py-4 hover:bg-muted/30 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="font-display text-base font-bold text-accent">{cat}</span>
              <span className="rounded-full bg-primary/10 px-2.5 py-0.5 font-body text-[10px] font-semibold text-primary">
                {grouped[cat].length}
              </span>
            </div>
            <ChevronDown
              size={16}
              className={`text-muted-foreground transition-transform duration-200 ${collapsed[cat] ? "" : "rotate-180"}`}
            />
          </button>
          {!collapsed[cat] && (
            <div className="border-t border-border px-6 pb-5 pt-4 grid gap-4 md:grid-cols-2">
              {grouped[cat].map((s) => (
                <div key={s.id}>
                  <label className="mb-1 block font-body text-xs font-medium text-muted-foreground">
                    {s.label || s.key}
                  </label>
                  {s.key.includes("features") || s.key.includes("desc") ? (
                    <textarea
                      value={s.value}
                      onChange={(e) => updateValue(s.id, e.target.value)}
                      rows={s.key.includes("features") ? 3 : 2}
                      className="w-full border border-border bg-background px-4 py-2.5 font-body text-sm rounded-lg outline-none focus:border-primary resize-none"
                    />
                  ) : (
                    <input
                      value={s.value}
                      onChange={(e) => updateValue(s.id, e.target.value)}
                      className="w-full border border-border bg-background px-4 py-2.5 font-body text-sm rounded-lg outline-none focus:border-primary"
                    />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

      <button
        onClick={handleSave}
        disabled={saving}
        className="flex items-center gap-2 bg-primary px-6 py-2.5 font-body text-sm font-semibold text-primary-foreground rounded-full hover:scale-105 transition-all disabled:opacity-50"
      >
        <Save size={15} />
        {saving ? "Saxlanılır..." : "Yadda saxla"}
      </button>
    </div>
  );
};

export default SettingsManager;
