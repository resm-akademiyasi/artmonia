import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logoImg from "@/assets/logo.png";

const navLinks = [
  { label: "Proqram", href: "/program" },
  { label: "Haqqımızda", href: "/about" },
  { label: "FAQ", href: "/faq" },
  { label: "Əlaqə", href: "/contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:h-20">
        <Link to="/" className="flex items-center">
          <img src={logoImg} alt="Artmonia" className="h-10 md:h-12 w-auto" />
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              to={l.href}
              className={`font-body text-sm tracking-widest uppercase transition-colors hover:text-primary ${
                location.pathname === l.href ? "text-primary" : "text-muted-foreground"
              }`}
            >
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

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} className="md:hidden text-foreground">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
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
              {navLinks.map((l) => (
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
