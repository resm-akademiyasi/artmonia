import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { KeyRound } from "lucide-react";

const ResetPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Listen for the PASSWORD_RECOVERY event
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        setReady(true);
      }
    });
    // Also check if already in recovery via hash
    if (window.location.hash.includes("type=recovery")) {
      setReady(true);
    }
    return () => subscription.unsubscribe();
  }, []);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast({ title: "Xəta", description: "Şifrələr uyğun gəlmir.", variant: "destructive" });
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (error) {
      toast({ title: "Xəta", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Uğurlu!", description: "Şifrəniz yeniləndi." });
    navigate("/admin");
  };

  if (!ready) {
    return (
      <main className="flex min-h-screen items-center justify-center pt-20">
        <p className="font-body text-muted-foreground">Sıfırlama linki yoxlanılır...</p>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center pt-20">
      <div className="mx-auto w-full max-w-sm px-4">
        <div className="rounded-sm border border-border bg-card p-8">
          <div className="mb-6 text-center">
            <KeyRound className="mx-auto mb-3 h-8 w-8 text-primary" />
            <h1 className="font-display text-2xl font-bold">Yeni şifrə</h1>
            <p className="mt-1 font-body text-sm text-muted-foreground">
              Yeni şifrənizi daxil edin.
            </p>
          </div>
          <form onSubmit={handleReset} className="space-y-4">
            <div>
              <label className="mb-1 block font-body text-sm text-muted-foreground">Yeni şifrə</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full border border-border bg-background px-4 py-3 font-body text-sm text-foreground outline-none transition-colors focus:border-primary rounded-sm"
              />
            </div>
            <div>
              <label className="mb-1 block font-body text-sm text-muted-foreground">Şifrəni təsdiqlə</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={6}
                className="w-full border border-border bg-background px-4 py-3 font-body text-sm text-foreground outline-none transition-colors focus:border-primary rounded-sm"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-gold py-3 text-sm font-semibold text-primary-foreground rounded-sm transition-all hover:scale-[1.02] disabled:opacity-50"
            >
              {loading ? "Gözləyin..." : "Şifrəni yenilə"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default ResetPasswordPage;
