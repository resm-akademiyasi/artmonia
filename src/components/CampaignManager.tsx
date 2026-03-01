import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2, Power, PowerOff } from "lucide-react";

interface Campaign {
  id: string;
  title: string;
  description: string | null;
  discount_percent: number | null;
  badge_text: string;
  start_date: string;
  end_date: string;
  is_active: boolean;
  created_at: string;
}

const CampaignManager = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    discount_percent: "",
    badge_text: "Endirim",
    end_date: "",
  });
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const fetchCampaigns = async () => {
    const { data } = await supabase
      .from("campaigns")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setCampaigns(data);
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const { error } = await supabase.from("campaigns").insert({
      title: form.title,
      description: form.description || null,
      discount_percent: form.discount_percent ? parseInt(form.discount_percent) : null,
      badge_text: form.badge_text,
      end_date: new Date(form.end_date).toISOString(),
    });
    setSaving(false);
    if (error) {
      toast({ title: "Xəta", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Kampaniya yaradıldı!" });
    setForm({ title: "", description: "", discount_percent: "", badge_text: "Endirim", end_date: "" });
    setShowForm(false);
    fetchCampaigns();
  };

  const toggleActive = async (id: string, current: boolean) => {
    await supabase.from("campaigns").update({ is_active: !current }).eq("id", id);
    fetchCampaigns();
  };

  const deleteCampaign = async (id: string) => {
    await supabase.from("campaigns").delete().eq("id", id);
    fetchCampaigns();
  };

  const isExpired = (end: string) => new Date(end).getTime() < Date.now();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-lg font-bold">Kampaniyalar</h3>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-gradient-gold px-4 py-2 text-sm font-semibold text-primary-foreground rounded-sm transition-all hover:scale-[1.02]"
        >
          <Plus size={14} /> Yeni
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleCreate} className="rounded-sm border border-border bg-card p-6 space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block font-body text-xs text-muted-foreground">Başlıq *</label>
              <input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
                placeholder="3 günlük xüsusi endirim!"
                className="w-full border border-border bg-background px-3 py-2 font-body text-sm text-foreground outline-none focus:border-primary rounded-sm"
              />
            </div>
            <div>
              <label className="mb-1 block font-body text-xs text-muted-foreground">Badge mətni</label>
              <input
                value={form.badge_text}
                onChange={(e) => setForm({ ...form, badge_text: e.target.value })}
                placeholder="Endirim"
                className="w-full border border-border bg-background px-3 py-2 font-body text-sm text-foreground outline-none focus:border-primary rounded-sm"
              />
            </div>
            <div>
              <label className="mb-1 block font-body text-xs text-muted-foreground">Endirim %</label>
              <input
                type="number"
                value={form.discount_percent}
                onChange={(e) => setForm({ ...form, discount_percent: e.target.value })}
                min={1}
                max={100}
                placeholder="20"
                className="w-full border border-border bg-background px-3 py-2 font-body text-sm text-foreground outline-none focus:border-primary rounded-sm"
              />
            </div>
            <div>
              <label className="mb-1 block font-body text-xs text-muted-foreground">Bitmə tarixi *</label>
              <input
                type="datetime-local"
                value={form.end_date}
                onChange={(e) => setForm({ ...form, end_date: e.target.value })}
                required
                className="w-full border border-border bg-background px-3 py-2 font-body text-sm text-foreground outline-none focus:border-primary rounded-sm"
              />
            </div>
          </div>
          <div>
            <label className="mb-1 block font-body text-xs text-muted-foreground">Açıqlama</label>
            <input
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Qeydiyyatdan keçən ilk 10 nəfərə xüsusi endirim"
              className="w-full border border-border bg-background px-3 py-2 font-body text-sm text-foreground outline-none focus:border-primary rounded-sm"
            />
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={saving}
              className="bg-gradient-gold px-6 py-2 text-sm font-semibold text-primary-foreground rounded-sm disabled:opacity-50"
            >
              {saving ? "Yaradılır..." : "Yarat"}
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="border border-border px-4 py-2 text-sm text-muted-foreground rounded-sm hover:text-foreground"
            >
              Ləğv et
            </button>
          </div>
        </form>
      )}

      {/* Campaign list */}
      <div className="space-y-3">
        {campaigns.map((c) => {
          const expired = isExpired(c.end_date);
          return (
            <div
              key={c.id}
              className={`flex items-center justify-between rounded-sm border p-4 ${
                expired
                  ? "border-border/30 bg-muted/20 opacity-60"
                  : c.is_active
                  ? "border-primary/30 bg-card"
                  : "border-border bg-card opacity-70"
              }`}
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-body text-sm font-semibold">{c.title}</span>
                  {c.discount_percent && (
                    <span className="rounded bg-primary/20 px-2 py-0.5 text-[10px] font-bold text-primary">
                      −{c.discount_percent}%
                    </span>
                  )}
                  {expired && (
                    <span className="rounded bg-destructive/20 px-2 py-0.5 text-[10px] text-destructive">
                      Bitib
                    </span>
                  )}
                  {!expired && c.is_active && (
                    <span className="rounded bg-green-500/20 px-2 py-0.5 text-[10px] text-green-400">
                      Aktiv
                    </span>
                  )}
                </div>
                <p className="mt-1 font-body text-xs text-muted-foreground">
                  {new Date(c.start_date).toLocaleDateString("az")} → {new Date(c.end_date).toLocaleDateString("az")} {new Date(c.end_date).toLocaleTimeString("az", { hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleActive(c.id, c.is_active)}
                  className="rounded-sm p-2 text-muted-foreground hover:text-foreground transition-colors"
                  title={c.is_active ? "Deaktiv et" : "Aktiv et"}
                >
                  {c.is_active ? <Power size={14} /> : <PowerOff size={14} />}
                </button>
                <button
                  onClick={() => deleteCampaign(c.id)}
                  className="rounded-sm p-2 text-muted-foreground hover:text-destructive transition-colors"
                  title="Sil"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          );
        })}
        {!campaigns.length && (
          <p className="text-center font-body text-sm text-muted-foreground py-8">
            Hələ kampaniya yoxdur.
          </p>
        )}
      </div>
    </div>
  );
};

export default CampaignManager;
