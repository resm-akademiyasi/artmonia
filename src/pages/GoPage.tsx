import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { supabase } from "@/integrations/supabase/client";

const GoPage = () => {
  const [params] = useSearchParams();

  useEffect(() => {
    const src = params.get("src") || "unknown";
    const cta = params.get("cta") || "unknown";
    const name = params.get("name") || undefined;

    // Log event to database
    supabase.from("events").insert({
      event_type: "whatsapp_redirect",
      src,
      cta,
      page_path: "/go",
      utm_source: params.get("utm_source") || null,
      utm_campaign: params.get("utm_campaign") || null,
      user_agent: navigator.userAgent,
    }).then(({ error }) => {
      if (error) console.error("Event log error:", error);
    }).catch((err) => console.error("Event log error:", err));

    // Redirect to WhatsApp
    const timer = setTimeout(() => {
      window.location.href = getWhatsAppUrl(name);
    }, 500);
    return () => clearTimeout(timer);
  }, [params]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center">
        <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        <p className="font-body text-sm text-muted-foreground">WhatsApp-a yönləndirilir...</p>
      </div>
    </div>
  );
};

export default GoPage;
