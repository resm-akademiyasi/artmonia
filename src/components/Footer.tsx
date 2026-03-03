import { Link } from "react-router-dom";
import { BRAND } from "@/lib/whatsapp";
import logoImg from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-background py-16">
      <div className="container mx-auto px-4">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <img src={logoImg} alt={BRAND} className="mb-3 h-12 w-auto" />
            <p className="font-body text-sm leading-relaxed text-muted-foreground">
              Online rəsm akademiyası. Sistem, feedback, nəticə.
            </p>
          </div>
          <div>
            <h4 className="mb-3 font-body text-xs tracking-[0.2em] uppercase text-muted-foreground">Səhifələr</h4>
            <div className="flex flex-col gap-2">
              <Link to="/program" className="font-body text-sm text-foreground/70 hover:text-primary transition-colors">Proqram</Link>
              <Link to="/about" className="font-body text-sm text-foreground/70 hover:text-primary transition-colors">Haqqımızda</Link>
              <Link to="/faq" className="font-body text-sm text-foreground/70 hover:text-primary transition-colors">FAQ</Link>
              <Link to="/contact" className="font-body text-sm text-foreground/70 hover:text-primary transition-colors">Əlaqə</Link>
            </div>
          </div>
          <div>
            <h4 className="mb-3 font-body text-xs tracking-[0.2em] uppercase text-muted-foreground">Hüquqi</h4>
            <div className="flex flex-col gap-2">
              <Link to="/privacy" className="font-body text-sm text-foreground/70 hover:text-primary transition-colors">Məxfilik Siyasəti</Link>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-border pt-6 text-center">
          <p className="font-body text-xs text-muted-foreground">
            © {new Date().getFullYear()} {BRAND}. Bütün hüquqlar qorunur.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
