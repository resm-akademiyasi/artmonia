import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { LogOut, Download, Users, BarChart3, Megaphone, Newspaper, Image, Video, GraduationCap, Settings, BookOpen } from "lucide-react";
import CampaignManager from "@/components/CampaignManager";
import NewsManager from "@/components/NewsManager";
import StudentResultsManager from "@/components/StudentResultsManager";
import SuccessStoriesManager from "@/components/SuccessStoriesManager";
import TeachersManager from "@/components/TeachersManager";
import SettingsManager from "@/components/SettingsManager";
import BlogManager from "@/components/BlogManager";
import type { Tables } from "@/integrations/supabase/types";

type TabType = "leads" | "events" | "campaigns" | "news" | "results" | "stories" | "teachers";

const AdminPage = () => {
  const [leads, setLeads] = useState<Tables<"leads">[]>([]);
  const [events, setEvents] = useState<Tables<"events">[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<TabType>("leads");
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { navigate("/auth"); return; }

      const { data: role } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", session.user.id)
        .eq("role", "admin")
        .maybeSingle();

      if (!role) {
        toast({ title: "İcazə yoxdur", description: "Admin hüququnuz yoxdur.", variant: "destructive" });
        await supabase.auth.signOut();
        navigate("/auth");
        return;
      }

      const [leadsRes, eventsRes] = await Promise.all([
        supabase.from("leads").select("*").order("created_at", { ascending: false }),
        supabase.from("events").select("*").order("created_at", { ascending: false }),
      ]);

      if (leadsRes.data) setLeads(leadsRes.data);
      if (eventsRes.data) setEvents(eventsRes.data);
      setLoading(false);
    };

    checkAuth();
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_OUT") navigate("/auth");
    });
    return () => subscription.unsubscribe();
  }, [navigate, toast]);

  const exportCSV = (data: Record<string, unknown>[], filename: string) => {
    if (!data.length) return;
    const headers = Object.keys(data[0]);
    const csv = [
      headers.join(","),
      ...data.map((row) => headers.map((h) => `"${String(row[h] ?? "").replace(/"/g, '""')}"`).join(",")),
    ].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${filename}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center pt-20">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  const eventsBySource = events.reduce<Record<string, number>>((acc, e) => {
    const key = `${e.src || "unknown"}/${e.cta || "unknown"}`;
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  const tabs: { key: TabType; label: string; icon?: React.ReactNode; count?: number }[] = [
    { key: "leads", label: "Leads", count: leads.length },
    { key: "events", label: "Events", count: events.length },
    { key: "campaigns", label: "Kampaniyalar", icon: <Megaphone size={14} /> },
    { key: "news", label: "Xəbərlər", icon: <Newspaper size={14} /> },
    { key: "results", label: "Nəticələr", icon: <Image size={14} /> },
    { key: "stories", label: "Hekayələr", icon: <Video size={14} /> },
    { key: "teachers", label: "Müəllimlər", icon: <GraduationCap size={14} /> },
  ];

  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-6">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="font-display text-3xl font-bold text-accent">Admin Panel</h1>
          <button onClick={handleLogout} className="flex items-center gap-2 border border-border px-4 py-2 text-sm text-muted-foreground hover:text-foreground rounded-lg transition-colors">
            <LogOut size={16} /> Çıxış
          </button>
        </div>

        {/* Stats */}
        <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          <div className="rounded-xl border border-border bg-card p-6">
            <Users className="mb-2 h-5 w-5 text-primary" />
            <p className="font-display text-2xl font-bold text-accent">{leads.length}</p>
            <p className="font-body text-xs text-muted-foreground">Leads</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-6">
            <BarChart3 className="mb-2 h-5 w-5 text-primary" />
            <p className="font-display text-2xl font-bold text-accent">{events.length}</p>
            <p className="font-body text-xs text-muted-foreground">Events</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-6 col-span-2">
            <p className="mb-2 font-body text-xs text-muted-foreground">Konversiya</p>
            <p className="font-display text-2xl font-bold text-accent">
              {events.length > 0 ? ((leads.length / events.length) * 100).toFixed(1) : 0}%
            </p>
            <p className="font-body text-xs text-muted-foreground">Events → Leads</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6 flex gap-1 overflow-x-auto border-b border-border">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex items-center gap-1.5 whitespace-nowrap px-4 pb-3 pt-1 font-body text-sm font-medium transition-colors ${
                tab === t.key ? "border-b-2 border-primary text-primary" : "text-muted-foreground hover:text-accent"
              }`}
            >
              {t.icon}
              {t.label}
              {t.count !== undefined && <span className="text-xs opacity-60">({t.count})</span>}
            </button>
          ))}
        </div>

        {/* Export for leads/events */}
        {(tab === "leads" || tab === "events") && (
          <div className="mb-4 flex justify-end">
            <button
              onClick={() => exportCSV(tab === "leads" ? leads : events, tab)}
              className="flex items-center gap-2 border border-primary/30 px-4 py-2 text-sm text-primary hover:bg-primary/5 rounded-lg transition-colors"
            >
              <Download size={14} /> CSV Export
            </button>
          </div>
        )}

        {/* Content */}
        {tab === "campaigns" && <CampaignManager />}
        {tab === "news" && <NewsManager />}
        {tab === "results" && <StudentResultsManager />}
        {tab === "stories" && <SuccessStoriesManager />}
        {tab === "teachers" && <TeachersManager />}
        {tab === "leads" && (
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-left font-body text-sm">
              <thead className="border-b border-border bg-muted/30">
                <tr>
                  <th className="px-4 py-3 text-xs text-muted-foreground">Tarix</th>
                  <th className="px-4 py-3 text-xs text-muted-foreground">Ad</th>
                  <th className="px-4 py-3 text-xs text-muted-foreground">Telefon</th>
                  <th className="px-4 py-3 text-xs text-muted-foreground">Email</th>
                  <th className="px-4 py-3 text-xs text-muted-foreground">Format</th>
                  <th className="px-4 py-3 text-xs text-muted-foreground">Səviyyə</th>
                  <th className="px-4 py-3 text-xs text-muted-foreground">UTM</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((l) => (
                  <tr key={l.id} className="border-b border-border/50 hover:bg-muted/10">
                    <td className="px-4 py-3 text-xs text-muted-foreground">{new Date(l.created_at).toLocaleDateString("az")}</td>
                    <td className="px-4 py-3 text-accent">{l.full_name}</td>
                    <td className="px-4 py-3">{l.phone}</td>
                    <td className="px-4 py-3 text-muted-foreground">{l.email || "—"}</td>
                    <td className="px-4 py-3">{l.interest}</td>
                    <td className="px-4 py-3">{l.level}</td>
                    <td className="px-4 py-3 text-xs text-muted-foreground">{l.utm_source || "—"}</td>
                  </tr>
                ))}
                {!leads.length && (
                  <tr><td colSpan={7} className="px-4 py-8 text-center text-muted-foreground">Hələ lead yoxdur.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
        {tab === "events" && (
          <div className="space-y-6">
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="mb-4 font-display text-lg font-bold text-accent">Mənbəyə görə</h3>
              <div className="space-y-2">
                {Object.entries(eventsBySource)
                  .sort(([, a], [, b]) => b - a)
                  .map(([key, count]) => (
                    <div key={key} className="flex items-center justify-between border-b border-border/30 pb-2">
                      <span className="font-body text-sm">{key}</span>
                      <span className="font-body text-sm font-semibold text-primary">{count}</span>
                    </div>
                  ))}
              </div>
            </div>
            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-left font-body text-sm">
                <thead className="border-b border-border bg-muted/30">
                  <tr>
                    <th className="px-4 py-3 text-xs text-muted-foreground">Tarix</th>
                    <th className="px-4 py-3 text-xs text-muted-foreground">Tip</th>
                    <th className="px-4 py-3 text-xs text-muted-foreground">Src</th>
                    <th className="px-4 py-3 text-xs text-muted-foreground">CTA</th>
                    <th className="px-4 py-3 text-xs text-muted-foreground">UTM</th>
                  </tr>
                </thead>
                <tbody>
                  {events.map((e) => (
                    <tr key={e.id} className="border-b border-border/50 hover:bg-muted/10">
                      <td className="px-4 py-3 text-xs text-muted-foreground">{new Date(e.created_at).toLocaleDateString("az")}</td>
                      <td className="px-4 py-3">{e.event_type}</td>
                      <td className="px-4 py-3">{e.src || "—"}</td>
                      <td className="px-4 py-3">{e.cta || "—"}</td>
                      <td className="px-4 py-3 text-xs text-muted-foreground">{e.utm_source || "—"}</td>
                    </tr>
                  ))}
                  {!events.length && (
                    <tr><td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">Hələ event yoxdur.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default AdminPage;
