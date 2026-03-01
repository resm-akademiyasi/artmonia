import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Clock, Flame } from "lucide-react";

interface Campaign {
  id: string;
  title: string;
  description: string | null;
  discount_percent: number | null;
  badge_text: string;
  end_date: string;
}

const CampaignBanner = () => {
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const fetchCampaign = async () => {
      const { data } = await supabase
        .from("campaigns")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();
      if (data) setCampaign(data);
    };
    fetchCampaign();
  }, []);

  useEffect(() => {
    if (!campaign) return;
    const update = () => {
      const diff = new Date(campaign.end_date).getTime() - Date.now();
      if (diff <= 0) {
        setTimeLeft("");
        setCampaign(null);
        return;
      }
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setTimeLeft(
        d > 0 ? `${d} gün ${h} saat ${m} dəq` : `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`
      );
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [campaign]);

  if (!campaign || !timeLeft) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] bg-gradient-gold text-primary-foreground">
      <div className="container mx-auto flex items-center justify-center gap-3 px-4 py-2 text-center">
        <Flame className="h-4 w-4 shrink-0 animate-pulse" />
        <span className="font-body text-xs font-semibold sm:text-sm">
          <span className="mr-2 rounded bg-primary-foreground/20 px-2 py-0.5 text-[10px] uppercase tracking-wider">
            {campaign.badge_text}
          </span>
          {campaign.title}
          {campaign.discount_percent && (
            <span className="ml-1 font-bold">−{campaign.discount_percent}%</span>
          )}
        </span>
        <span className="flex items-center gap-1 font-body text-xs font-medium tabular-nums sm:text-sm">
          <Clock className="h-3 w-3" />
          {timeLeft}
        </span>
      </div>
    </div>
  );
};

export default CampaignBanner;
