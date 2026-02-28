import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { LogIn } from "lucide-react";

const AuthPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);

    if (error) {
      toast({ title: "Giriş xətası", description: error.message, variant: "destructive" });
      return;
    }
    navigate("/admin");
  };

  return (
    <main className="flex min-h-screen items-center justify-center pt-20">
      <div className="mx-auto w-full max-w-sm px-4">
        <div className="rounded-sm border border-border bg-card p-8">
          <div className="mb-6 text-center">
            <LogIn className="mx-auto mb-3 h-8 w-8 text-primary" />
            <h1 className="font-display text-2xl font-bold">Admin Giriş</h1>
            <p className="mt-1 font-body text-sm text-muted-foreground">Panelə daxil olmaq üçün giriş edin.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="mb-1 block font-body text-sm text-muted-foreground">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border border-border bg-background px-4 py-3 font-body text-sm text-foreground outline-none transition-colors focus:border-primary rounded-sm"
              />
            </div>
            <div>
              <label className="mb-1 block font-body text-sm text-muted-foreground">Şifrə</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full border border-border bg-background px-4 py-3 font-body text-sm text-foreground outline-none transition-colors focus:border-primary rounded-sm"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-gold py-3 text-sm font-semibold text-primary-foreground rounded-sm transition-all hover:scale-[1.02] disabled:opacity-50"
            >
              {loading ? "Giriş edilir..." : "Daxil ol"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default AuthPage;
