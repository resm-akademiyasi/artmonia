import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { LogIn, ArrowLeft } from "lucide-react";

const AuthPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [forgotMode, setForgotMode] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
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

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setLoading(false);

    if (error) {
      toast({ title: "Xəta", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Uğurlu!", description: "Şifrə sıfırlama linki emailinizə göndərildi." });
    setForgotMode(false);
  };

  if (forgotMode) {
    return (
      <main className="flex min-h-screen items-center justify-center pt-20">
        <div className="mx-auto w-full max-w-sm px-4">
          <div className="rounded-sm border border-border bg-card p-8">
            <div className="mb-6 text-center">
              <h1 className="font-display text-2xl font-bold">Şifrəni sıfırla</h1>
              <p className="mt-1 font-body text-sm text-muted-foreground">
                Email adresinizi daxil edin, sıfırlama linki göndəriləcək.
              </p>
            </div>
            <form onSubmit={handleForgotPassword} className="space-y-4">
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
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-gold py-3 text-sm font-semibold text-primary-foreground rounded-sm transition-all hover:scale-[1.02] disabled:opacity-50"
              >
                {loading ? "Gözləyin..." : "Sıfırlama linki göndər"}
              </button>
            </form>
            <button
              onClick={() => setForgotMode(false)}
              className="mt-4 flex w-full items-center justify-center gap-1 font-body text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" /> Girişə qayıt
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center pt-20">
      <div className="mx-auto w-full max-w-sm px-4">
        <div className="rounded-sm border border-border bg-card p-8">
          <div className="mb-6 text-center">
            <LogIn className="mx-auto mb-3 h-8 w-8 text-primary" />
            <h1 className="font-display text-2xl font-bold">Admin Giriş</h1>
            <p className="mt-1 font-body text-sm text-muted-foreground">
              Panelə daxil olmaq üçün giriş edin.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
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
                minLength={6}
                className="w-full border border-border bg-background px-4 py-3 font-body text-sm text-foreground outline-none transition-colors focus:border-primary rounded-sm"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-gold py-3 text-sm font-semibold text-primary-foreground rounded-sm transition-all hover:scale-[1.02] disabled:opacity-50"
            >
              {loading ? "Gözləyin..." : "Daxil ol"}
            </button>
          </form>
          <button
            onClick={() => setForgotMode(true)}
            className="mt-4 w-full text-center font-body text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Şifrəni unutdum?
          </button>
        </div>
      </div>
    </main>
  );
};

export default AuthPage;
