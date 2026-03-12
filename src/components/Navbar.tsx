import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logoImg from "@/assets/logo-transparent.png";

const pageLinks = [
  { label: "Haqqımızda", href: "/about" },
  { label: "Əlaqə", href: "/contact" },
];

const sectionLinks = [
  { label: "Proqramlar", id: "programs" },
  { label: "Modullar", id: "modules" },
  { label: "Qiymətlər", id: "pricing" },
  { label: "Müəllimlər", id: "teachers" },
  { label: "Rəylər", id: "testimonials" },
  { label: "FAQ", id: "faq" },
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
  const navBg = scrolled || !isHome
    ? "bg-background/95 backdrop-blur-xl shadow-sm"
    : "bg-transparent";

  const baseTextClass = (active?: boolean) =>
    `font-body text-[11px] tracking-[0.25em] uppercase transition-all duration-300 hover:text-primary whitespace-nowrap ${
      active
        ? "text-primary"
        : scrolled || !isHome
        ? "text-foreground/70"
        : "text-white/80"
    }`;

  const logoFilter = scrolled || !isHome ? "" : "brightness(0) invert(1)";

  const scrollToSection = (id: string) => {
    setOpen(false);
    if (!isHome) {
      navigate("/");
      // Wait for navigation then scroll
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${navBg}`}>
      <div className="container mx-auto flex h-16 items-center justify-between px-6 md:h-20">
        {/* Mobile */}
        <div className="flex w-full items-center md:hidden">
          <Link to="/" className="relative flex items-center">
            <div
              className="absolute inset-0 -m-4 rounded-full blur-2xl opacity-50 transition-opacity duration-500"
              style={{
                background: scrolled || !isHome
                  ? "radial-gradient(circle, hsl(var(--primary) / 0.2), transparent 70%)"
                  : "radial-gradient(circle, rgba(255,255,255,0.3), transparent 70%)",
              }}
            />
            <motion.img
              src={logoImg}
              alt="Artmonia"
              className="relative h-10 w-auto"
              style={{ filter: logoFilter }}
              initial={{ opacity: 0, scale: 0.3, rotate: -12 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 18, delay: 0.2 }}
            />
          </Link>
          <div className="flex-1" />
          <button onClick={() => setOpen(!open)} className={scrolled || !isHome ? "text-foreground" : "text-white"}>
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Desktop */}
        <div className="hidden w-full items-center md:flex">
          {/* Left - logo */}
          <Link to="/" className="relative mr-8 flex items-center justify-center flex-shrink-0">
            <motion.div
              className="absolute rounded-full"
              style={{
                width: 120,
                height: 120,
                background: scrolled || !isHome
                  ? "radial-gradient(circle, hsl(var(--primary) / 0.15), hsl(var(--secondary) / 0.08) 50%, transparent 70%)"
                  : "radial-gradient(circle, rgba(255,255,255,0.25), rgba(255,255,255,0.08) 50%, transparent 70%)",
                filter: "blur(16px)",
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            />
            <motion.img
              src={logoImg}
              alt="Artmonia"
              className="relative h-12 w-auto"
              style={{ filter: logoFilter }}
              initial={{ opacity: 0, scale: 0.2, rotate: -15, y: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0, y: 0 }}
              transition={{ type: "spring", stiffness: 180, damping: 16, delay: 0.3 }}
            />
          </Link>

          {/* Center - section links */}
          <div className="flex flex-1 items-center justify-center gap-6 lg:gap-8">
            {sectionLinks.map((s) => (
              <button
                key={s.id}
                onClick={() => scrollToSection(s.id)}
                className={baseTextClass(false)}
              >
                {s.label}
              </button>
            ))}
            {pageLinks.map((l) => (
              <Link key={l.href} to={l.href} className={baseTextClass(location.pathname === l.href)}>
                {l.label}
              </Link>
            ))}
          </div>

          {/* Right - CTA */}
          <button
            onClick={() => scrollToSection("lead-form")}
            className="ml-8 flex-shrink-0 font-body text-[11px] tracking-[0.15em] uppercase bg-primary px-5 py-2.5 text-primary-foreground rounded-full transition-all hover:scale-105 hover:shadow-lg"
          >
            Qeydiyyat
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-b border-border bg-background md:hidden"
          >
            <div className="container mx-auto flex flex-col gap-5 px-6 py-8">
              {sectionLinks.map((s) => (
                <button
                  key={s.id}
                  onClick={() => scrollToSection(s.id)}
                  className="text-left font-body text-sm tracking-widest uppercase text-foreground/70 hover:text-primary"
                >
                  {s.label}
                </button>
              ))}
              {pageLinks.map((l) => (
                <Link
                  key={l.href}
                  to={l.href}
                  onClick={() => setOpen(false)}
                  className="font-body text-sm tracking-widest uppercase text-foreground/70 hover:text-primary"
                >
                  {l.label}
                </Link>
              ))}
              <button
                onClick={() => scrollToSection("lead-form")}
                className="bg-primary px-5 py-3 text-center text-sm font-semibold text-primary-foreground rounded-full"
              >
                Qeydiyyat
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
