import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logoImg from "@/assets/logo-transparent.png";

const leftLinks = [
  { label: "Proqram", href: "/program" },
  { label: "Müəllimlər", href: "/teachers" },
  { label: "Haqqımızda", href: "/about" },
];

const rightLinks = [
  { label: "FAQ", href: "/faq" },
  { label: "Əlaqə", href: "/contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isHome = location.pathname === "/";
  const navBg = scrolled || !isHome
    ? "bg-background/95 backdrop-blur-xl shadow-sm"
    : "bg-transparent";

  const textColor = (href: string) =>
    `font-body text-[11px] tracking-[0.25em] uppercase transition-all duration-300 hover:text-primary ${
      location.pathname === href
        ? "text-primary"
        : scrolled || !isHome
        ? "text-foreground/70"
        : "text-white/80"
    }`;

  const logoFilter = scrolled || !isHome ? "" : "brightness(0) invert(1)";

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${navBg}`}>
      <div className="container mx-auto flex h-16 items-center justify-between px-6 md:h-20">
        {/* Mobile */}
        <div className="flex w-full items-center md:hidden">
          <Link to="/" className="relative flex items-center">
            {/* Glow */}
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
          <div className="flex flex-1 items-center gap-10">
            {leftLinks.map((l) => (
              <Link key={l.href} to={l.href} className={textColor(l.href)}>
                {l.label}
              </Link>
            ))}
          </div>

          <Link to="/" className="relative mx-10 flex items-center justify-center">
            {/* Radial glow behind logo */}
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
              transition={{
                type: "spring",
                stiffness: 180,
                damping: 16,
                delay: 0.3,
              }}
            />
          </Link>

          <div className="flex flex-1 items-center justify-end gap-10">
            {rightLinks.map((l) => (
              <Link key={l.href} to={l.href} className={textColor(l.href)}>
                {l.label}
              </Link>
            ))}
            <a
              href="#lead-form"
              className="font-body text-[11px] tracking-[0.15em] uppercase bg-primary px-5 py-2.5 text-primary-foreground rounded-full transition-all hover:scale-105 hover:shadow-lg"
            >
              Qeydiyyat
            </a>
          </div>
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
              {[...leftLinks, ...rightLinks].map((l) => (
                <Link
                  key={l.href}
                  to={l.href}
                  onClick={() => setOpen(false)}
                  className="font-body text-sm tracking-widest uppercase text-foreground/70 hover:text-primary"
                >
                  {l.label}
                </Link>
              ))}
              <a
                href="#lead-form"
                onClick={() => setOpen(false)}
                className="bg-primary px-5 py-3 text-center text-sm font-semibold text-primary-foreground rounded-full"
              >
                Qeydiyyat
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
