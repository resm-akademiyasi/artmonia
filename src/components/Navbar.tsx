import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logoImg from "@/assets/logo.png";

const leftLinks = [
  { label: "Proqram", href: "/program" },
  { label: "Haqqımızda", href: "/about" },
];

const rightLinks = [
  { label: "FAQ", href: "/faq" },
  { label: "Əlaqə", href: "/contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const linkClass = (href: string) =>
    `font-body text-sm tracking-widest uppercase transition-colors hover:text-primary ${
      location.pathname === href ? "text-primary" : "text-muted-foreground"
    }`;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl overflow-hidden">
      {/* Flowing gradient accent line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[1px]"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, hsl(33 89% 51% / 0.0) 10%, hsl(33 89% 51% / 0.6) 30%, hsl(263 87% 55% / 0.5) 50%, hsl(33 89% 51% / 0.6) 70%, hsl(33 89% 51% / 0.0) 90%, transparent 100%)",
        }}
      />

      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:h-20">
        {/* Mobile: logo left, menu right */}
        <div className="flex w-full items-center md:hidden">
          <Link to="/" className="flex items-center">
            <div className="relative">
              <div
                className="absolute -inset-2 rounded-full opacity-30 blur-lg"
                style={{
                  background: "radial-gradient(circle, hsl(33 89% 51% / 0.4), hsl(263 87% 55% / 0.2), transparent)",
                }}
              />
              <img
                src={logoImg}
                alt="Artmonia"
                className="relative h-10 w-auto drop-shadow-[0_0_12px_hsl(33_89%_51%_/_0.3)]"
              />
            </div>
          </Link>
          <div className="flex-1" />
          <button onClick={() => setOpen(!open)} className="text-foreground">
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Desktop: links — logo center — links + CTA */}
        <div className="hidden w-full items-center md:flex">
          {/* Left links */}
          <div className="flex flex-1 items-center gap-8">
            {leftLinks.map((l) => (
              <Link key={l.href} to={l.href} className={linkClass(l.href)}>
                {l.label}
              </Link>
            ))}
          </div>

          {/* Center logo with gradient glow */}
          <Link to="/" className="relative mx-8 flex items-center">
            <div
              className="absolute -inset-4 rounded-full opacity-25 blur-xl"
              style={{
                background: "radial-gradient(ellipse at center, hsl(33 89% 51% / 0.5), hsl(263 87% 55% / 0.3), transparent 70%)",
              }}
            />
            <img
              src={logoImg}
              alt="Artmonia"
              className="relative h-12 w-auto drop-shadow-[0_0_16px_hsl(33_89%_51%_/_0.35)]"
            />
          </Link>

          {/* Right links + CTA */}
          <div className="flex flex-1 items-center justify-end gap-8">
            {rightLinks.map((l) => (
              <Link key={l.href} to={l.href} className={linkClass(l.href)}>
                {l.label}
              </Link>
            ))}
            <Link
              to="/#lead-form"
              className="bg-gradient-gold px-5 py-2 text-sm font-semibold tracking-wide text-primary-foreground rounded-sm transition-transform hover:scale-105"
            >
              Qeydiyyat
            </Link>
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
            <div className="container mx-auto flex flex-col gap-4 px-4 py-6">
              {[...leftLinks, ...rightLinks].map((l) => (
                <Link
                  key={l.href}
                  to={l.href}
                  onClick={() => setOpen(false)}
                  className="font-body text-sm tracking-widest uppercase text-muted-foreground hover:text-primary"
                >
                  {l.label}
                </Link>
              ))}
              <Link
                to="/#lead-form"
                onClick={() => setOpen(false)}
                className="bg-gradient-gold px-5 py-2 text-center text-sm font-semibold text-primary-foreground rounded-sm"
              >
                Qeydiyyat
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;