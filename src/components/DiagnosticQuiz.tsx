import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ArrowRight, Sparkles, RotateCcw } from "lucide-react";

const problems = [
  { id: "no-system", label: "Sistemsizəm", icon: "🎯" },
  { id: "no-colors", label: "Rəngləri bilmirəm", icon: "🎨" },
  { id: "no-goal", label: "Məqsədim yoxdur", icon: "🧭" },
  { id: "no-basics", label: "Əsasları bilmirəm", icon: "📐" },
];

const genres = [
  { id: "portrait", label: "Portret", icon: "👤" },
  { id: "landscape", label: "Mənzərə", icon: "🏞️" },
  { id: "abstract", label: "Abstrakt", icon: "🌀" },
  { id: "still-life", label: "Natürmort", icon: "🍎" },
];

type RecommendationMap = Record<string, Record<string, { module: string; package: string; reason: string }>>;

const recommendations: RecommendationMap = {
  "no-system": {
    portrait: { module: "Modul 05: Portret & Fiqur", package: "Standart", reason: "Sistemli portret təlimi üçün tam proqram lazımdır" },
    landscape: { module: "Modul 04: Kompozisiya", package: "Standart", reason: "Mənzərə üçün güclü kompozisiya əsası lazımdır" },
    abstract: { module: "Modul 03: Rəng Nəzəriyyəsi", package: "Standart", reason: "Abstrakt sənət üçün rəng harmoniyası vacibdir" },
    "still-life": { module: "Modul 01: Əsaslar & Proporsiya", package: "Standart", reason: "Natürmort üçün proporsiya əsasları mühümdür" },
  },
  "no-colors": {
    portrait: { module: "Modul 03: Rəng Nəzəriyyəsi", package: "Standart", reason: "Portretdə canlı ton üçün rəng bilgisi şərtdir" },
    landscape: { module: "Modul 03: Rəng Nəzəriyyəsi", package: "Standart", reason: "Mənzərədə atmosfer rənglərlə yaradılır" },
    abstract: { module: "Modul 03: Rəng Nəzəriyyəsi", package: "Premium", reason: "Abstrakt rənglərdə dərinlik üçün fərdi mentorluq" },
    "still-life": { module: "Modul 03: Rəng Nəzəriyyəsi", package: "Standart", reason: "Natürmortda işıq-rəng əlaqəsi kritikdir" },
  },
  "no-goal": {
    portrait: { module: "Modul 05: Portret & Fiqur", package: "Premium", reason: "Məqsəd qurmaq üçün fərdi mentorluq lazımdır" },
    landscape: { module: "Modul 04: Kompozisiya", package: "Premium", reason: "Karyera məsləhəti ilə istiqamətinizi tapın" },
    abstract: { module: "Modul 06: Final Layihə", package: "Premium", reason: "Final layihə ilə öz üslubunuzu kəşf edin" },
    "still-life": { module: "Modul 01: Əsaslar & Proporsiya", package: "Standart", reason: "Əsaslardan başlayıb məqsəd formalaşdırın" },
  },
  "no-basics": {
    portrait: { module: "Modul 01: Əsaslar & Proporsiya", package: "Standart", reason: "Portret çəkməzdən əvvəl əsaslar şərtdir" },
    landscape: { module: "Modul 01: Əsaslar & Proporsiya", package: "Mini", reason: "Əsas formalar mənzərənin təməlidir" },
    abstract: { module: "Modul 01: Əsaslar & Proporsiya", package: "Mini", reason: "Abstrakt belə əsas biliklər tələb edir" },
    "still-life": { module: "Modul 02: İşıq və Kölgə", package: "Standart", reason: "Natürmort üçün işıq-kölgə əsasdır" },
  },
};

const DiagnosticQuiz = () => {
  const [step, setStep] = useState(0); // 0=intro, 1=problem, 2=genre, 3=result
  const [selectedProblem, setSelectedProblem] = useState<string | null>(null);
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const reset = () => {
    setStep(0);
    setSelectedProblem(null);
    setSelectedGenre(null);
  };

  const result = selectedProblem && selectedGenre
    ? recommendations[selectedProblem]?.[selectedGenre]
    : null;

  return (
    <section ref={ref} className="section-padding relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `radial-gradient(circle at 20% 50%, hsl(var(--primary)) 0%, transparent 50%),
                          radial-gradient(circle at 80% 50%, hsl(var(--accent)) 0%, transparent 50%)`
      }} />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-2xl"
        >
          <div className="text-center mb-12">
            <p className="mb-4 font-body text-[11px] tracking-[0.3em] uppercase text-primary">
              Diaqnostika
            </p>
            <h2 className="font-display text-4xl font-bold text-accent md:text-5xl">
              Sənə uyğun <span className="italic text-primary">yolu tap.</span>
            </h2>
            <p className="mt-4 font-body text-sm text-muted-foreground">
              2 sadə sualda sənin üçün ideal proqramı müəyyənləşdirək
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-background p-8 md:p-10 shadow-xl relative overflow-hidden">
            {/* Progress indicator */}
            <div className="flex items-center gap-2 mb-8">
              {[1, 2].map((s) => (
                <div key={s} className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-display text-sm font-bold transition-all duration-500 ${
                    step >= s ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}>
                    {s}
                  </div>
                  {s < 2 && <div className={`w-12 h-0.5 rounded transition-all duration-500 ${step >= 2 ? "bg-primary" : "bg-border"}`} />}
                </div>
              ))}
              <span className="ml-auto font-body text-xs text-muted-foreground">
                {step === 0 ? "Başla" : step === 3 ? "Nəticə" : `Addım ${step}/2`}
              </span>
            </div>

            <AnimatePresence mode="wait">
              {step === 0 && (
                <motion.div
                  key="intro"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="text-center py-8"
                >
                  <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <Sparkles className="text-primary" size={28} />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-accent mb-3">
                    Hansı proqram sənə uyğundur?
                  </h3>
                  <p className="font-body text-sm text-muted-foreground mb-8 max-w-md mx-auto">
                    2 sadə suala cavab ver, biz sənin üçün ən uyğun modulu və paketi təklif edək.
                  </p>
                  <button
                    onClick={() => setStep(1)}
                    className="group inline-flex items-center gap-2 bg-primary px-8 py-3.5 rounded-full font-body text-sm font-semibold text-primary-foreground transition-all hover:scale-105 hover:shadow-[0_8px_30px_hsl(33_89%_51%/0.35)]"
                  >
                    Testi başla
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </button>
                </motion.div>
              )}

              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="font-display text-xl font-bold text-accent mb-2">
                    Əsas probleminiz nədir?
                  </h3>
                  <p className="font-body text-sm text-muted-foreground mb-6">
                    Sizə ən çox uyğun olan variantı seçin
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {problems.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => { setSelectedProblem(p.id); setStep(2); }}
                        className={`group relative flex flex-col items-center gap-3 p-5 rounded-xl border transition-all duration-300 hover:scale-[1.02] ${
                          selectedProblem === p.id
                            ? "border-primary bg-primary/10 shadow-md"
                            : "border-border hover:border-primary/40 hover:bg-muted/50"
                        }`}
                      >
                        <span className="text-2xl">{p.icon}</span>
                        <span className="font-body text-sm font-medium text-accent">{p.label}</span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="font-display text-xl font-bold text-accent mb-2">
                    Öyrənmək istədiyiniz janr?
                  </h3>
                  <p className="font-body text-sm text-muted-foreground mb-6">
                    Ən çox maraqlandığınız sahəni seçin
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {genres.map((g) => (
                      <button
                        key={g.id}
                        onClick={() => { setSelectedGenre(g.id); setStep(3); }}
                        className="group relative flex flex-col items-center gap-3 p-5 rounded-xl border border-border transition-all duration-300 hover:scale-[1.02] hover:border-primary/40 hover:bg-muted/50"
                      >
                        <span className="text-2xl">{g.icon}</span>
                        <span className="font-body text-sm font-medium text-accent">{g.label}</span>
                      </button>
                    ))}
                  </div>
                  <button onClick={() => setStep(1)} className="mt-4 font-body text-xs text-muted-foreground hover:text-primary transition-colors">
                    ← Geri qayıt
                  </button>
                </motion.div>
              )}

              {step === 3 && result && (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, type: "spring" }}
                  className="text-center py-4"
                >
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/15 flex items-center justify-center">
                    <Sparkles className="text-primary" size={28} />
                  </div>
                  <p className="font-body text-xs tracking-[0.2em] uppercase text-primary mb-3">Sizin üçün tövsiyə</p>
                  
                  <div className="bg-muted/50 rounded-xl p-6 mb-4 border border-primary/20">
                    <h3 className="font-display text-2xl font-bold text-accent mb-2">{result.module}</h3>
                    <p className="font-body text-sm text-muted-foreground mb-4">{result.reason}</p>
                    <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full">
                      <span className="font-body text-sm font-semibold">Uyğun paket: {result.package}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-3 mt-6">
                    <a
                      href="#pricing"
                      className="group inline-flex items-center gap-2 bg-primary px-6 py-3 rounded-full font-body text-sm font-semibold text-primary-foreground transition-all hover:scale-105"
                    >
                      Paketləri gör
                      <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                    </a>
                    <button
                      onClick={reset}
                      className="inline-flex items-center gap-2 border border-border px-5 py-3 rounded-full font-body text-sm font-medium text-muted-foreground hover:text-accent hover:border-primary/30 transition-all"
                    >
                      <RotateCcw size={14} />
                      Yenidən
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DiagnosticQuiz;
