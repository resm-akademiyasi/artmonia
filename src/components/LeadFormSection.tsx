import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Send, MessageCircle } from "lucide-react";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { getUTMParams } from "@/lib/utm";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const LeadFormSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "",
    phone: "",
    email: "",
    interest: "online",
    level: "beginner",
    goal: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.phone.trim() || !formData.full_name.trim()) {
      toast({ title: "Xəta", description: "Ad və telefon mütləqdir.", variant: "destructive" });
      return;
    }
    setLoading(true);

    const utm = getUTMParams();
    const { error } = await supabase.from("leads").insert({
      full_name: formData.full_name.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim() || null,
      interest: formData.interest,
      level: formData.level,
      goal: formData.goal.trim() || null,
      utm_source: utm.utm_source || null,
      utm_medium: utm.utm_medium || null,
      utm_campaign: utm.utm_campaign || null,
      utm_content: utm.utm_content || null,
      utm_term: utm.utm_term || null,
      page_path: window.location.pathname,
      referrer: document.referrer || null,
    });

    setLoading(false);
    if (error) {
      console.error("Lead insert error:", error);
      toast({ title: "Xəta", description: "Göndərilə bilmədi. Yenidən cəhd edin.", variant: "destructive" });
      return;
    }
    setSubmitted(true);
    toast({ title: "Təşəkkürlər!", description: "Qeydiyyatınız qəbul edildi." });
  };

  if (submitted) {
    return (
      <section id="lead-form" className="section-padding">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-lg rounded-sm border border-primary/20 bg-card p-10 text-center gold-glow">
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Send className="h-7 w-7 text-primary" />
              </div>
              <h3 className="mb-2 font-display text-2xl font-bold">Təşəkkürlər!</h3>
              <p className="mb-6 font-body text-muted-foreground">
                Qeydiyyatınız qəbul edildi. Daha sürətli cavab almaq üçün WhatsApp-da yazın.
              </p>
              <a
                href={getWhatsAppUrl(formData.full_name)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-gold px-6 py-3 text-sm font-semibold text-primary-foreground rounded-sm transition-transform hover:scale-105"
              >
                <MessageCircle size={18} />
                WhatsApp-a keç
              </a>
            </motion.div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} id="lead-form" className="section-padding">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-lg"
        >
          <p className="mb-4 text-center font-body text-xs tracking-[0.3em] uppercase text-primary">
            Ön Qeydiyyat
          </p>
          <h2 className="mb-8 text-center font-display text-3xl font-bold md:text-4xl">
            Yerini <span className="text-gradient-gold">ayır.</span>
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4 rounded-sm border border-border bg-card p-8">
            <div>
              <label className="mb-1 block font-body text-sm text-muted-foreground">Ad, Soyad *</label>
              <input
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                required
                maxLength={100}
                className="w-full border border-border bg-background px-4 py-3 font-body text-sm text-foreground outline-none transition-colors focus:border-primary rounded-sm"
                placeholder="Adınız"
              />
            </div>
            <div>
              <label className="mb-1 block font-body text-sm text-muted-foreground">Telefon *</label>
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                maxLength={20}
                type="tel"
                className="w-full border border-border bg-background px-4 py-3 font-body text-sm text-foreground outline-none transition-colors focus:border-primary rounded-sm"
                placeholder="+994 50 111 22 33"
              />
            </div>
            <div>
              <label className="mb-1 block font-body text-sm text-muted-foreground">Email</label>
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                type="email"
                maxLength={255}
                className="w-full border border-border bg-background px-4 py-3 font-body text-sm text-foreground outline-none transition-colors focus:border-primary rounded-sm"
                placeholder="email@nümunə.az"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1 block font-body text-sm text-muted-foreground">Format</label>
                <select
                  name="interest"
                  value={formData.interest}
                  onChange={handleChange}
                  className="w-full border border-border bg-background px-4 py-3 font-body text-sm text-foreground outline-none transition-colors focus:border-primary rounded-sm"
                >
                  <option value="online">Online</option>
                  <option value="offline">Offline</option>
                </select>
              </div>
              <div>
                <label className="mb-1 block font-body text-sm text-muted-foreground">Səviyyə</label>
                <select
                  name="level"
                  value={formData.level}
                  onChange={handleChange}
                  className="w-full border border-border bg-background px-4 py-3 font-body text-sm text-foreground outline-none transition-colors focus:border-primary rounded-sm"
                >
                  <option value="beginner">Başlayan</option>
                  <option value="intermediate">Orta</option>
                  <option value="advanced">İrəliləmiş</option>
                </select>
              </div>
            </div>
            <div>
              <label className="mb-1 block font-body text-sm text-muted-foreground">Məqsədin nədir?</label>
              <textarea
                name="goal"
                value={formData.goal}
                onChange={handleChange}
                maxLength={500}
                rows={3}
                className="w-full resize-none border border-border bg-background px-4 py-3 font-body text-sm text-foreground outline-none transition-colors focus:border-primary rounded-sm"
                placeholder="Hobim üçün / Peşəkar olmaq istəyirəm..."
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="group flex w-full items-center justify-center gap-2 bg-gradient-gold py-3 text-sm font-semibold tracking-wide text-primary-foreground rounded-sm transition-all hover:scale-[1.02] disabled:opacity-50"
            >
              {loading ? "Göndərilir..." : "Qeydiyyatdan keç"}
              <Send size={16} className="transition-transform group-hover:translate-x-1" />
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default LeadFormSection;
