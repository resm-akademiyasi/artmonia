import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getWhatsAppUrl } from "@/lib/whatsapp";

const GoPage = () => {
  const [params] = useSearchParams();

  useEffect(() => {
    const src = params.get("src") || "unknown";
    const cta = params.get("cta") || "unknown";
    const name = params.get("name") || undefined;

    // Log event (console for now, Supabase later)
    const event = {
      event_type: "whatsapp_redirect",
      src,
      cta,
      page_path: window.location.pathname,
      utm_source: params.get("utm_source") || undefined,
      utm_campaign: params.get("utm_campaign") || undefined,
      user_agent: navigator.userAgent,
      created_at: new Date().toISOString(),
    };
    console.log("Event logged:", event);

    // Redirect to WhatsApp
    window.location.href = getWhatsAppUrl(name);
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
