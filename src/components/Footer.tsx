import { Link } from "react-router-dom";
import { BRAND } from "@/lib/whatsapp";
import logoImg from "@/assets/logo-dark.png";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-background py-16">
      <div className="container mx-auto px-6">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <img src={logoImg} alt={BRAND} className="mb-4 h-14 w-auto" />
            <p className="font-body text-sm leading-relaxed text-muted-foreground">
              Bütün sənətsevərləri peşəkar rəssama çevirən bir rəssamlıq akademiyası.
            </p>
            <p className="mt-3 font-body text-xs italic text-muted-foreground/70">
              "İstək varsa, yol da var." — Leonardo da Vinçi
            </p>
          </div>
          <div>
            <h4 className="mb-4 font-body text-[10px] tracking-[0.2em] uppercase text-muted-foreground">Səhifələr</h4>
            <div className="flex flex-col gap-3">
              <Link to="/program" className="font-body text-sm text-foreground/60 hover:text-primary transition-colors">Proqram</Link>
              <Link to="/about" className="font-body text-sm text-foreground/60 hover:text-primary transition-colors">Haqqımızda</Link>
              <Link to="/faq" className="font-body text-sm text-foreground/60 hover:text-primary transition-colors">FAQ</Link>
              <Link to="/contact" className="font-body text-sm text-foreground/60 hover:text-primary transition-colors">Əlaqə</Link>
            </div>
          </div>
          <div>
            <h4 className="mb-4 font-body text-[10px] tracking-[0.2em] uppercase text-muted-foreground">Əlaqə</h4>
            <div className="flex flex-col gap-3 font-body text-sm text-foreground/60">
              <p>+994 10 383 13 93</p>
              <p>artmoniaacademy@gmail.com</p>
              <p>Nizami kino mərkəzi, 2-ci mərtəbə</p>
            </div>
            <div className="mt-4 flex gap-4">
              <a href="https://instagram.com/artmoniya.academy" target="_blank" rel="noopener noreferrer" className="font-body text-xs text-muted-foreground hover:text-primary transition-colors">Instagram</a>
              <a href="https://facebook.com/artmoniya" target="_blank" rel="noopener noreferrer" className="font-body text-xs text-muted-foreground hover:text-primary transition-colors">Facebook</a>
            </div>
          </div>
        </div>
        <div className="mt-14 border-t border-border pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-muted-foreground">
            © {new Date().getFullYear()} {BRAND}. Bütün hüquqlar qorunur.
          </p>
          <Link to="/privacy" className="font-body text-xs text-muted-foreground hover:text-primary transition-colors">
            Məxfilik Siyasəti
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
