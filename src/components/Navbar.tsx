import { useState, useEffect, useCallback, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, ArrowRight, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logoImg from "@/assets/logo-transparent.png";

interface NavItem {
  label: string;
  id?: string;
  href?: string;
}

interface NavGroup {
  label: string;
  items: NavItem[];
}

const navGroups: NavGroup[] = [
  {
    label: "Proqram",
    items: [
      { label: "Proqramlar", id: "programs" },
      { label: "Modullar", id: "modules" },
      { label: "Qiymətlər", id: "pricing" },
    ],
  },
  {
    label: "Akademiya",
    items: [
      { label: "Müəllimlər", id: "teachers" },
      { label: "Rəylər", id: "testimonials" },
      { label: "FAQ", id: "faq" },
    ],
  },
];

const directLinks: NavItem[] = [
  { label: "Haqqımızda", href: "/about" },
  { label: "Əlaqə", href: "/contact" },
];

// All section IDs for scroll tracking
const allSectionIds = ["programs", "modules", "pricing", "teachers", "testimonials", "faq"];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout>>();
  const location = useLocation();
  const navigate = useNavigate();

  const isHome = location.pathname === "/";
  const isDark = !scrolled && isHome;

  // Scroll tracking
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);

      if (!isHome) return;

      const scrollY = window.scrollY + 120;
      let current: string | null = null;

      for (const id of allSectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const { top, bottom } = el.getBoundingClientRect();
          const absTop = top + window.scrollY;
          const absBottom = bottom + window.scrollY;
          if (scrollY >= absTop && scrollY < absBottom) {
            current = id;
            break;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  const scrollToSection = useCallback((id: string) => {
    setOpen(false);
    setOpenDropdown(null);
    if (!isHome) {
      navigate("/");
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  }, [isHome, navigate]);

  const handleNavClick = useCallback((item: NavItem) => {
    if (item.href) {
      setOpen(false);
      setOpenDropdown(null);
      navigate(item.href);
    } else if (item.id) {
      scrollToSection(item.id);
    }
  }, [navigate, scrollToSection]);

  const handleDropdownEnter = (label: string) => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setOpenDropdown(label);
  };

  const handleDropdownLeave = () => {
    dropdownTimeout.current = setTimeout(() => setOpenDropdown(null), 200);
  };

  // Check if a group contains the active section
  const groupIsActive = (group: NavGroup) =>
    group.items.some((item) => item.id && item.id === activeSection);

  const navBg = scrolled || !isHome
    ? "bg-background/95 backdrop-blur-xl shadow-sm border-b border-border/50"
    : "bg-transparent";

  const logoFilter = isDark ? "brightness(0) invert(1)" : "";

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${navBg}`}>
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:h-[72px] md:px-6">
        {/* Logo */}
        <Link to="/" className="relative flex items-center flex-shrink-0 z-10">
          <motion.div
            className="absolute rounded-full"
            style={{
              width: 100, height: 100,
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

        {/* Desktop nav */}
        <div className="hidden md:flex items-center">
          <div
            className="flex items-center gap-0.5 rounded-full px-1.5 py-1 transition-all duration-500"
            style={{
              background: isDark ? "rgba(255,255,255,0.08)" : "hsl(var(--muted) / 0.6)",
              backdropFilter: "blur(12px)",
              border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid hsl(var(--border) / 0.5)",
            }}
          >
            {/* Dropdown groups */}
            {navGroups.map((group) => (
              <div
                key={group.label}
                className="relative"
                onMouseEnter={() => handleDropdownEnter(group.label)}
                onMouseLeave={handleDropdownLeave}
              >
                <button
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-full font-body text-[10px] tracking-[0.18em] uppercase transition-all duration-300 ${
                    groupIsActive(group)
                      ? "text-primary bg-primary/10"
                      : isDark
                      ? "text-white/70 hover:text-white hover:bg-white/10"
                      : "text-foreground/60 hover:text-foreground hover:bg-muted"
                  }`}
                >
                  {group.label}
                  <ChevronDown
                    size={10}
                    className={`transition-transform duration-200 ${openDropdown === group.label ? "rotate-180" : ""}`}
                  />
                  {/* Active indicator dot */}
                  {groupIsActive(group) && (
                    <motion.span
                      layoutId="nav-active-dot"
                      className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </button>

                {/* Dropdown panel */}
                <AnimatePresence>
                  {openDropdown === group.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 6, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 4, scale: 0.97 }}
                      transition={{ duration: 0.18 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 rounded-xl overflow-hidden shadow-xl border"
                      style={{
                        background: "hsl(var(--background) / 0.97)",
                        backdropFilter: "blur(20px)",
                        borderColor: "hsl(var(--border) / 0.5)",
                      }}
                      onMouseEnter={() => handleDropdownEnter(group.label)}
                      onMouseLeave={handleDropdownLeave}
                    >
                      <div className="py-1.5">
                        {group.items.map((item) => (
                          <button
                            key={item.label}
                            onClick={() => handleNavClick(item)}
                            className={`w-full flex items-center gap-3 px-4 py-2.5 font-body text-[11px] tracking-[0.12em] uppercase transition-all duration-200 ${
                              item.id && item.id === activeSection
                                ? "text-primary bg-primary/8"
                                : "text-foreground/65 hover:text-primary hover:bg-primary/5"
                            }`}
                          >
                            {/* Active marker */}
                            <span
                              className={`w-1.5 h-1.5 rounded-full flex-shrink-0 transition-all duration-300 ${
                                item.id && item.id === activeSection
                                  ? "bg-primary scale-100"
                                  : "bg-transparent scale-0"
                              }`}
                            />
                            {item.label}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}

            {/* Direct page links */}
            {directLinks.map((l) => (
              <Link
                key={l.label}
                to={l.href!}
                className={`px-3 py-1.5 rounded-full font-body text-[10px] tracking-[0.18em] uppercase transition-all duration-300 ${
                  location.pathname === l.href
                    ? "text-primary bg-primary/10"
                    : isDark
                    ? "text-white/70 hover:text-white hover:bg-white/10"
                    : "text-foreground/60 hover:text-foreground hover:bg-muted"
                }`}
              >
                {l.label}
              </Link>
            ))}

            {/* CTA */}
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
            <div className="container mx-auto px-5 py-5 space-y-4">
              {navGroups.map((group, gi) => (
                <motion.div
                  key={group.label}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: gi * 0.06 }}
                >
                  <p className="font-body text-[9px] tracking-[0.25em] uppercase text-muted-foreground mb-2 px-1">
                    {group.label}
                  </p>
                  <div className="grid grid-cols-3 gap-1.5">
                    {group.items.map((item) => (
                      <button
                        key={item.label}
                        onClick={() => handleNavClick(item)}
                        className={`py-2.5 px-2 rounded-lg border font-body text-[10px] tracking-[0.12em] uppercase transition-all text-center ${
                          item.id && item.id === activeSection
                            ? "border-primary/40 bg-primary/8 text-primary"
                            : "border-border/60 bg-muted/20 text-foreground/65 hover:border-primary/30 hover:text-primary"
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </motion.div>
              ))}

              {/* Page links row */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="grid grid-cols-2 gap-1.5"
              >
                {directLinks.map((l) => (
                  <Link
                    key={l.label}
                    to={l.href!}
                    onClick={() => setOpen(false)}
                    className={`py-2.5 px-2 rounded-lg border font-body text-[10px] tracking-[0.12em] uppercase transition-all text-center ${
                      location.pathname === l.href
                        ? "border-primary/40 bg-primary/8 text-primary"
                        : "border-border/60 bg-muted/20 text-foreground/65 hover:border-primary/30 hover:text-primary"
                    }`}
                  >
                    {l.label}
                  </Link>
                ))}
              </motion.div>

              {/* CTA */}
              <motion.button
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.22 }}
                onClick={() => scrollToSection("lead-form")}
                className="group flex w-full items-center justify-center gap-2 bg-primary py-3 text-sm font-semibold text-primary-foreground rounded-xl transition-all hover:shadow-lg"
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
