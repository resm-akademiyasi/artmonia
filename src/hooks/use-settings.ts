import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

type Settings = Record<string, string>;

let cachedSettings: Settings | null = null;

export const useSettings = () => {
  const [settings, setSettings] = useState<Settings>(cachedSettings || {});
  const [loading, setLoading] = useState(!cachedSettings);

  useEffect(() => {
    if (cachedSettings) return;
    const fetch = async () => {
      try {
        const { data, error } = await supabase.from("site_settings").select("key, value");
        if (error) { console.error("Settings fetch error:", error); return; }
        if (data) {
          const map: Settings = {};
          data.forEach((s: { key: string; value: string }) => { map[s.key] = s.value; });
          cachedSettings = map;
          setSettings(map);
        }
      } catch (e) { console.error("Settings fetch error:", e); }
      finally { setLoading(false); }
    };
    fetch();
  }, []);

  return { settings, loading, getSetting: (key: string, fallback = "") => settings[key] || fallback };
};

export const invalidateSettings = () => { cachedSettings = null; };
