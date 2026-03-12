import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logoImg from "@/assets/logo-transparent.png";

const navItems = [
  { label: "Proqramlar", id: "programs" },
  { label: "Modullar", id: "modules" },
  { label: "Qiymətlər", id: "pricing" },
  { label: "Müəllimlər", id: "teachers" },
  { label: "Rəylər", id: "testimonials" },
  { label: "FAQ", id: "faq" },
  { label: "Haqqımızda", href: "/about" },
  { label: "Əlaqə", href: "/contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isHome = location.pathname === "/";
  const isDark = !scrolled && isHome;

  const navBg = scrolled || !isHome
    ? "bg-background/95 backdrop-blur-xl shadow-sm border-b border-border/50"
    : "bg-transparent";

  const logoFilter = isDark ? "brightness(0) invert(1)" : "";

  const scrollToSection = (id: string) => {
    setOpen(false);
    if (!isHome) {
      navigate("/");
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleNavClick = (item: typeof navItems[0]) => {
    if ("href" in item && item.href) {
      setOpen(false);
      navigate(item.href);
    } else if ("id" in item && item.id) {
      scrollToSection(item.id);
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${navBg}`}>
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:h-[72px] md:px-6">
        {/* Logo — always visible */}
        <Link to="/" className="relative flex items-center flex-shrink-0 z-10">
          <motion.div
            className="absolute rounded-full"
            style={{
              width: 100,
              height: 100,
              background: isDark
                ? "radial-gradient(circle, rgba(255,255,255,0.2), transparent 70%)"
                : "radial-gradient(circle, hsl(var(--primary) / 0.12), transparent 70%)",
              filter: "blur(14px)",
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          />
          <motion.img
            src={logoImg}
            alt="Artmonia"
            className="relative h-10 w-auto md:h-11"
            style={{ filter: logoFilter }}
            initial={{ opacity: 0, scale: 0.3, rotate: -12 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 18, delay: 0.2 }}
          />
        </Link>

        {/* Desktop — pill container with links */}
        <div className="hidden md:flex items-center">
          <div
            className="flex items-center gap-1 rounded-full px-2 py-1.5 transition-all duration-500"
            style={{
              background: isDark
                ? "rgba(255, 255, 255, 0.08)"
                : "hsl(var(--muted) / 0.6)",
              backdropFilter: "blur(12px)",
              border: isDark
                ? "1px solid rgba(255, 255, 255, 0.1)"
                : "1px solid hsl(var(--border) / 0.5)",
            }}
          >
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item)}
                className={`px-3 py-1.5 rounded-full font-body text-[10px] tracking-[0.18em] uppercase transition-all duration-300 hover:bg-primary/10 hover:text-primary ${
                  isDark ? "text-white/70" : "text-foreground/60"
                } ${"href" in item && item.href && location.pathname === item.href ? "!text-primary bg-primary/10" : ""}`}
              >
                {item.label}
              </button>
            ))}

            {/* CTA inside pill */}
            <button
              onClick={() => scrollToSection("lead-form")}
              className="group flex items-center gap-1.5 ml-1 px-4 py-1.5 rounded-full bg-primary font-body text-[10px] tracking-[0.15em] uppercase text-primary-foreground transition-all duration-300 hover:shadow-[0_4px_20px_hsl(33_89%_51%/0.4)] hover:scale-[1.03]"
            >
              Qeydiyyat
              <ArrowRight size={11} className="transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className={`md:hidden z-10 p-2 rounded-full transition-colors ${
            isDark ? "text-white hover:bg-white/10" : "text-foreground hover:bg-muted"
          }`}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="absolute top-full left-0 right-0 bg-background/98 backdrop-blur-xl border-b border-border shadow-xl md:hidden"
          >
            <div className="container mx-auto px-6 py-6">
              {/* Grid layout for mobile nav items */}
              <div className="grid grid-cols-2 gap-2 mb-4">
                {navItems.map((item, i) => (
                  <motion.button
                    key={item.label}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                    onClick={() => handleNavClick(item)}
                    className="flex items-center justify-center py-3 px-3 rounded-xl border border-border/60 bg-muted/30 font-body text-xs tracking-[0.15em] uppercase text-foreground/70 hover:text-primary hover:border-primary/30 hover:bg-primary/5 transition-all"
                  >
                    {item.label}
                  </motion.button>
                ))}
              </div>

              {/* CTA button */}
              <motion.button
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                onClick={() => scrollToSection("lead-form")}
                className="group flex w-full items-center justify-center gap-2 bg-primary py-3.5 text-sm font-semibold text-primary-foreground rounded-xl transition-all hover:shadow-lg"
              >
                Qeydiyyat
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
