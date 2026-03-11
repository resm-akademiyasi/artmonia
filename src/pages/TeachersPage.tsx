import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";

interface Teacher {
  id: string;
  full_name: string;
  title: string | null;
  bio: string | null;
  photo_url: string | null;
  specialties: string[];
}

const TeachersPage = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeachers = async () => {
      const { data } = await supabase
        .from("teachers")
        .select("*")
        .eq("is_published", true)
        .order("display_order", { ascending: true });
      if (data) setTeachers(data as unknown as Teacher[]);
      setLoading(false);
    };
    fetchTeachers();
  }, []);

  return (
    <main className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-6">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <p className="mb-4 font-body text-[11px] tracking-[0.3em] uppercase text-primary">
            Komandamız
          </p>
          <h1 className="font-display text-4xl font-bold text-accent md:text-5xl lg:text-6xl">
            Müəllim <span className="italic text-primary">heyəti</span>
          </h1>
          <p className="mt-4 font-body text-sm text-muted-foreground">
            Artmonia-nın peşəkar və təcrübəli müəllimləri ilə tanış olun
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-16">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          </div>
        ) : !teachers.length ? (
          <p className="text-center text-muted-foreground py-16">Tezliklə müəllimlər əlavə olunacaq.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {teachers.map((teacher, i) => (
              <motion.div
                key={teacher.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="group"
              >
                <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
                  <div className="relative aspect-[4/5] overflow-hidden">
                    {teacher.photo_url ? (
                      <img
                        src={teacher.photo_url}
                        alt={teacher.full_name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="h-full w-full bg-accent/5 flex items-center justify-center">
                        <span className="font-display text-6xl font-bold text-muted-foreground/20">
                          {teacher.full_name.charAt(0)}
                        </span>
                      </div>
                    )}
                    <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-accent/60 to-transparent" />
                  </div>

                  <div className="p-6">
                    <h3 className="font-display text-xl font-bold text-accent">{teacher.full_name}</h3>
                    {teacher.title && (
                      <p className="font-body text-sm text-primary font-medium mt-1">{teacher.title}</p>
                    )}
                    {teacher.bio && (
                      <p className="font-body text-sm text-muted-foreground mt-3 leading-relaxed">{teacher.bio}</p>
                    )}
                    {teacher.specialties.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-4">
                        {teacher.specialties.map((s) => (
                          <span
                            key={s}
                            className="text-[11px] bg-primary/10 text-primary px-3 py-1 rounded-full font-body font-medium"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default TeachersPage;
