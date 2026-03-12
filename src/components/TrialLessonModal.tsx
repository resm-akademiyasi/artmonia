import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Palette, ArrowRight, CheckCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface TrialLessonModalProps {
  open: boolean;
  onClose: () => void;
}

const TrialLessonModal = ({ open, onClose }: TrialLessonModalProps) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    setLoading(true);
    try {
      await supabase.from("leads").insert({
        full_name: name,
        phone,
        interest: "Sınaq dərsi",
        page_path: window.location.pathname,
      });
      setSuccess(true);
      toast.success("Sınaq dərsinə qeydiyyat uğurla tamamlandı!");
    } catch {
      toast.error("Xəta baş verdi, yenidən cəhd edin.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setSuccess(false);
    setName("");
    setPhone("");
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={handleClose}
        >
          <div className="absolute inset-0 bg-accent/60 backdrop-blur-sm" />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md rounded-2xl border border-border/50 bg-background p-8 shadow-2xl"
          >
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-1.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              <X size={18} />
            </button>

            {success ? (
              <div className="text-center py-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <CheckCircle size={56} className="mx-auto text-green-500 mb-4" />
                </motion.div>
                <h3 className="font-display text-2xl font-bold text-accent mb-2">Təşəkkürlər!</h3>
                <p className="font-body text-sm text-muted-foreground">
                  Tezliklə sizinlə əlaqə saxlanılacaq.
                </p>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <Palette size={24} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold text-accent">
                      Pulsuz sınaq dərsi
                    </h3>
                    <p className="font-body text-xs text-muted-foreground">
                      İlk dərsini pulsuz sına!
                    </p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="font-body text-xs font-medium text-foreground/70 mb-1.5 block">
                      Ad və soyad
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Adınızı daxil edin"
                      required
                      className="w-full rounded-xl border border-border bg-muted/30 px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                  </div>
                  <div>
                    <label className="font-body text-xs font-medium text-foreground/70 mb-1.5 block">
                      Telefon nömrəsi
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+994 XX XXX XX XX"
                      required
                      className="w-full rounded-xl border border-border bg-muted/30 px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="group flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 font-body text-sm font-semibold text-primary-foreground transition-all hover:shadow-lg hover:scale-[1.02] disabled:opacity-60"
                  >
                    {loading ? "Göndərilir..." : "Sınaq dərsinə yazıl"}
                    {!loading && <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TrialLessonModal;
